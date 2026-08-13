const allowedOrigins = new Set([
  "https://coocooing.kro.kr",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
]);

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://coocooing.kro.kr",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(request, value, status = 200) {
  return Response.json(value, { status, headers: corsHeaders(request) });
}

function validId(value, maxLength = 100) {
  return typeof value === "string" && value.length >= 3 && value.length <= maxLength && /^[0-9A-Za-z_-]+$/.test(value);
}

async function readBody(request) {
  const length = Number(request.headers.get("Content-Length") || 0);
  if (length > 4096) throw new Error("PAYLOAD_TOO_LARGE");
  return request.json();
}

function emptyStat(contentId) {
  return { contentId, participationCount: 0, funCount: 0, relatableCount: 0, viewer: { fun: false, relatable: false } };
}

async function getStats(request, env, url) {
  const ids = [...new Set((url.searchParams.get("ids") || "").split(",").filter((id) => validId(id, 80)))].slice(0, 50);
  const anonymousId = url.searchParams.get("anonymous_id") || "";
  if (!ids.length) return json(request, { stats: {} });

  const placeholders = ids.map(() => "?").join(",");
  const statements = [env.DB.prepare(`SELECT content_id, participation_count, fun_count, relatable_count FROM content_stats WHERE content_id IN (${placeholders})`).bind(...ids)];
  if (validId(anonymousId)) {
    statements.push(env.DB.prepare(`SELECT content_id, reaction_type FROM content_reactions WHERE anonymous_id = ? AND content_id IN (${placeholders})`).bind(anonymousId, ...ids));
  }

  const results = await env.DB.batch(statements);
  const stats = Object.fromEntries(ids.map((id) => [id, emptyStat(id)]));
  for (const row of results[0].results || []) {
    stats[row.content_id] = {
      contentId: row.content_id,
      participationCount: row.participation_count,
      funCount: row.fun_count,
      relatableCount: row.relatable_count,
      viewer: { fun: false, relatable: false }
    };
  }
  for (const row of results[1]?.results || []) stats[row.content_id].viewer[row.reaction_type] = true;
  return json(request, { stats });
}

async function addParticipation(request, env) {
  const body = await readBody(request);
  if (!validId(body.contentId, 80) || !validId(body.attemptId)) return json(request, { error: "INVALID_REQUEST" }, 400);
  await env.DB.prepare("INSERT OR IGNORE INTO participation_attempts (attempt_id, content_id) VALUES (?, ?)").bind(body.attemptId, body.contentId).run();
  const stat = await env.DB.prepare("SELECT participation_count FROM content_stats WHERE content_id = ?").bind(body.contentId).first();
  return json(request, { participationCount: stat?.participation_count || 0 }, 201);
}

async function setReaction(request, env) {
  const body = await readBody(request);
  if (!validId(body.contentId, 80) || !validId(body.anonymousId) || !["fun", "relatable"].includes(body.reaction) || typeof body.active !== "boolean") {
    return json(request, { error: "INVALID_REQUEST" }, 400);
  }

  const statement = body.active
    ? env.DB.prepare("INSERT OR IGNORE INTO content_reactions (anonymous_id, content_id, reaction_type) VALUES (?, ?, ?)")
    : env.DB.prepare("DELETE FROM content_reactions WHERE anonymous_id = ? AND content_id = ? AND reaction_type = ?");
  await statement.bind(body.anonymousId, body.contentId, body.reaction).run();

  const [stat, viewer] = await env.DB.batch([
    env.DB.prepare("SELECT participation_count, fun_count, relatable_count FROM content_stats WHERE content_id = ?").bind(body.contentId),
    env.DB.prepare("SELECT reaction_type FROM content_reactions WHERE anonymous_id = ? AND content_id = ?").bind(body.anonymousId, body.contentId)
  ]);
  const row = stat.results?.[0] || {};
  const viewerState = { fun: false, relatable: false };
  for (const reaction of viewer.results || []) viewerState[reaction.reaction_type] = true;
  return json(request, { stats: { contentId: body.contentId, participationCount: row.participation_count || 0, funCount: row.fun_count || 0, relatableCount: row.relatable_count || 0, viewer: viewerState } });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request) });
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/health") return json(request, { ok: true });

    try {
      if (request.method === "POST") {
        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        const allowed = await env.API_RATE_LIMITER.limit({ key: `${ip}:${url.pathname}` });
        if (!allowed.success) return json(request, { error: "RATE_LIMITED" }, 429);
      }
      if (request.method === "GET" && url.pathname === "/api/stats") return await getStats(request, env, url);
      if (request.method === "POST" && url.pathname === "/api/participations") return await addParticipation(request, env);
      if (request.method === "POST" && url.pathname === "/api/reactions") return await setReaction(request, env);
      return json(request, { error: "NOT_FOUND" }, 404);
    } catch (error) {
      console.error(JSON.stringify({ message: "request_failed", path: url.pathname, error: error instanceof Error ? error.message : String(error) }));
      return json(request, { error: error instanceof Error && error.message === "PAYLOAD_TOO_LARGE" ? "PAYLOAD_TOO_LARGE" : "INTERNAL_ERROR" }, error instanceof Error && error.message === "PAYLOAD_TOO_LARGE" ? 413 : 500);
    }
  }
};
