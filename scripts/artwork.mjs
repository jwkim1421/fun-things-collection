import fs from "node:fs";
import path from "node:path";
import { root, escapeHtml } from "./content.mjs";

// Original flat illustrations. No external images, fonts, filters or gradients.
const palettes = [
  ["#ffdfd5", "#ea6a51", "#fff5d1"], ["#dcecf1", "#458caa", "#fff0bb"],
  ["#f9e8ad", "#dfa13b", "#faf6e8"], ["#e2ecd7", "#6b976d", "#fff2ca"],
  ["#e8dded", "#9d719b", "#fff2d6"], ["#f6dbdf", "#c5768b", "#fff4da"]
];
const box = (x, y, w, h, fill, rx = 12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const line = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none"/>`;
const dot = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const at = (x, y, scale, markup, rotate = 0) => `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">${markup}</g>`;
const face = (fill, smile = true) => `${dot(0, 0, 34, fill)}${dot(-11, -3, 2, "#293b39")}${dot(11, -3, 2, "#293b39")}<path d="${smile ? 'M-9 11Q0 20 9 11' : 'M-8 13H8'}" fill="none"/>`;
const cup = (fill) => `${box(-34, -30, 68, 69, fill, 6)}<path d="M34-19H46Q68 5 34 23M-17-49Q-28-62-13-77M9-49Q-2-62 13-77" fill="none"/>${line(-41, 42, 40, 42)}`;
const plant = (fill) => `<path d="M0 35V-63M0-28Q-68-85-54-30Q-32-5 0-12M0-47Q60-104 56-52Q38-28 0-29" fill="${fill}"/>${box(-34, 28, 68, 57, "#f6bb98", 7)}`;
const book = (fill) => `${box(-54, -70, 108, 140, fill, 6)}${line(-34, -69, -34, 70)}${line(-18, -32, 31, -32)}${line(-18, -14, 22, -14)}${dot(8, 25, 16, "#fff5d1")}`;
const phone = (fill) => `${box(-57, -96, 114, 192, "#fffdf7", 16)}${box(-46, -77, 92, 145, fill, 4)}${line(-14, -85, 14, -85)}${dot(0, 81, 4, "#293b39")}`;
const chat = (fill, flip = false) => `<path d="M-72-45H62Q78-45 78-29V29Q78 45 62 45H-30L-59 65V45H-72Q-88 45-88 29V-29Q-88-45-72-45Z" fill="${fill}" transform="scale(${flip ? -1 : 1} 1)"/>${dot(-35, 0, 5, "#293b39")}${dot(-5, 0, 5, "#293b39")}${dot(25, 0, 5, "#293b39")}`;
const heart = (fill) => `<path d="M0 45C-106-16-26-89 0-37C26-89 106-16 0 45Z" fill="${fill}"/>`;
const battery = (fill, level) => `${box(-104, -61, 199, 122, "#fffdf7", 15)}${box(95, -22, 18, 44, "#293b39", 3)}${box(-90, -47, Math.max(16, 170 * level), 94, fill, 5)}${dot(-16, -7, 3, "#293b39")}${dot(16, -7, 3, "#293b39")}<path d="M-11 14Q0 26 11 14" fill="none"/>`;
const sofa = (fill) => `${box(-127, -36, 254, 100, fill, 22)}${box(-104, -91, 208, 105, fill, 24)}${box(-137, -20, 36, 102, fill, 12)}${box(101, -20, 36, 102, fill, 12)}${line(-91, 83, -91, 99)}${line(91, 83, 91, 99)}${line(-102, 13, 102, 13)}${line(0, -86, 0, 10)}`;
const windowArt = (fill) => `${box(-117, -125, 234, 250, "#fffdf7", 3)}${box(-102, -109, 204, 216, fill, 0)}${dot(51, -57, 26, "#f9cf63")}<path d="M-102 75Q-48-8 10 58Q58 19 102 72V107H-102Z" fill="#8cb29c"/>${line(0, -108, 0, 108)}${line(-102, 0, 102, 0)}`;
const lamp = (fill) => `<path d="M-22-90H22L65-5H-65Z" fill="${fill}"/>${line(0, -3, 0, 91)}${line(-51, 92, 51, 92)}`;
const clock = (fill, hand = 0) => `${dot(0, 0, 76, "#fffdf7")}${dot(0, 0, 63, fill)}${line(0, 0, hand ? -35 : 0, hand ? -25 : -45)}${line(0, 0, 36, 18)}${dot(0, 0, 4, "#293b39")}`;
const train = (fill) => `${box(-135, -74, 270, 142, fill, 16)}${box(-118, -53, 51, 58, "#fff8de", 5)}${box(-53, -53, 51, 58, "#fff8de", 5)}${box(12, -53, 51, 58, "#fff8de", 5)}${box(77, -53, 41, 97, "#fff8de", 5)}${dot(-85, 75, 23, "#fffdf7")}${dot(80, 75, 23, "#fffdf7")}${line(-150, 101, 152, 101)}`;
const camera = (fill) => `${box(-90, -57, 180, 119, fill, 12)}${box(-61, -80, 56, 23, fill, 6)}${dot(8, 1, 43, "#fffdf7")}${dot(8, 1, 27, "#9db7bf")}${dot(61, -32, 5, "#293b39")}`;
const notebook = (fill, check = false) => `${box(-76, -101, 152, 202, "#fffdf7", 6)}${box(-76, -101, 152, 36, fill, 6)}${[-43, 0, 43].map((y) => `${box(-55, y, 20, 20, fill, 1)}${line(-23, y + 10, 52, y + 10)}${check ? `<path d="M-53 ${y + 8}l7 7 17-23" fill="none"/>` : ''}`).join('')}${[-47, -15, 17, 49].map((x) => line(x, -111, x, -90)).join('')}`;
const compass = (fill) => `${dot(0, 0, 97, "#fffdf7")}${dot(0, 0, 78, fill)}<path d="M0-66L24 24 0 62-23-23Z" fill="#f5b88e"/>${line(-69, 0, 69, 0)}${dot(0, 0, 5, "#293b39")}`;
const ticket = (fill) => `${box(-105, -58, 210, 116, fill, 4)}${line(46, -55, 46, 55)}${line(-78, -20, 21, -20)}${line(-78, 3, 8, 3)}${line(-78, 26, 23, 26)}${dot(75, 0, 18, "#fffdf7")}`;
const laptop = (fill) => `${box(-116, -94, 232, 149, fill, 8)}${box(-103, -80, 206, 121, "#fffdf7", 3)}<path d="M-116 55H116L149 85H-149Z" fill="${fill}"/>${line(-34, 73, 34, 73)}`;
const robot = (fill) => `${box(-74, -65, 148, 130, fill, 24)}${dot(-29, -10, 14, "#fffdf7")}${dot(29, -10, 14, "#fffdf7")}${dot(-29, -10, 4, "#293b39")}${dot(29, -10, 4, "#293b39")}${line(-22, 34, 22, 34)}${line(0, -65, 0, -91)}${dot(0, -98, 9, "#f2ac81")}${box(-92, -16, 18, 39, fill, 6)}${box(74, -16, 18, 39, fill, 6)}`;
const pencil = (fill) => `<path d="M-16-92H16V65L0 99-16 65Z" fill="${fill}"/>${line(-16, 65, 16, 65)}<path d="M-5 89H5L0 99Z" fill="#293b39"/>${line(0, -70, 0, 60)}`;
const bulb = (fill) => `<path d="M-32 35C-32 5-62-6-62-43A62 62 0 0 1 62-43C62-6 32 5 32 35Z" fill="${fill}"/>${box(-32, 35, 64, 30, "#fffdf7", 4)}${line(-23, 74, 23, 74)}${line(-88, -44, -110, -44)}${line(88, -44, 110, -44)}${line(0, -121, 0, -140)}`;
const magnifier = (fill) => `${dot(-18, -21, 65, fill)}${dot(-18, -21, 48, "#fffdf7")}<path d="M30 27L84 81L67 98L13 44Z" fill="${fill}"/>`;
const traffic = (fill) => `${box(-40, -115, 80, 220, "#fffdf7", 18)}${dot(0, -68, 23, "#eaa59a")}${dot(0, -4, 23, "#f4d781")}${dot(0, 60, 23, fill)}${line(0, 106, 0, 141)}`;
const piggy = (fill) => `<ellipse cx="0" cy="0" rx="94" ry="65" fill="${fill}"/><path d="M39-51L66-89L82-37" fill="${fill}"/>${box(74, -8, 37, 39, fill, 6)}${dot(56, -19, 4, "#293b39")}${line(-47, 55, -47, 80)}${line(43, 55, 43, 80)}${line(-22, -42, 22, -42)}<path d="M-94-12Q-134-41-127-10Q-123 9-107 0" fill="none"/>`;

function resultScene(id, color, paper, variant) {
  const compose = (main, side, extra = "") => `${at(305, 248, 1.3, main, -5)}${at(528, 309, .82, side, 9)}${extra ? at(539, 127, .48, extra, 12) : ""}`;
  const together = (count = 2) => `${Array.from({ length: count }, (_, index) => at(208 + index * (300 / Math.max(1, count - 1)), index % 2 ? 276 : 223, 1.05, face(index % 2 ? color : paper))).join("")}${at(360, 117, .6, chat("#fffdf7"))}`;
  const scenes = {
    "test-001": [() => compose(train(color), heart(paper)), () => compose(clock(color), train(paper)), () => compose(face(paper), chat(color), heart(color)), () => compose(traffic("#83a98c"), heart(paper))],
    "test-002": [() => compose(laptop(color), clock(paper)), () => compose(cup(color), face(paper)), () => compose(notebook(color, true), cup(paper)), () => compose(battery(color, .1), phone(paper))],
    "test-003": [() => compose(notebook(color, true), compass(paper)), () => compose(compass(color), ticket(paper)), () => compose(sofa(color), cup(paper)), () => compose(windowArt("#b6d8d9"), plant("#7aa586"))],
    "test-004": [() => compose(clock(color), notebook(paper, true)), () => compose(book(color), lamp(paper)), () => compose(lamp(color), cup(paper), clock(paper)), () => compose(bulb(paper), pencil(color))],
    "test-005": [() => compose(notebook(color, true), ticket(paper)), () => compose(face(paper), chat(color)), () => together(3), () => compose(compass(color), cup(paper))],
    "test-006": [() => compose(sofa(color), book(paper)), () => together(3), () => compose(clock(color), plant("#7aa586")), () => compose(compass(color), plant("#7aa586"))],
    "test-007": [() => compose(phone(color), heart(paper)), () => compose(cup(color), chat(paper)), () => compose(chat(color), face(paper)), () => compose(book(color), phone(paper))],
    "test-008": [() => compose(bulb(paper), plant("#7aa586")), () => compose(sofa(color), cup(paper)), () => compose(chat(color), face(paper)), () => compose(book(color), magnifier(paper))],
    "test-009": [() => compose(notebook(color, true), magnifier(paper)), () => compose(compass(color), heart(paper)), () => together(), () => compose(clock(color), ticket(paper))],
    "test-010": [() => compose(notebook(color, true), piggy(paper)), () => compose(cup(color), heart(paper)), () => compose(book(color), ticket(paper)), () => compose(piggy(color), notebook(paper, true))],
    "test-011": [() => compose(notebook(color, true), face(paper)), () => compose(laptop(color), pencil(paper)), () => together(), () => compose(bulb(paper), chat(color))],
    "test-012": [() => compose(book(color), cup(paper)), () => together(), () => together(4), () => compose(sofa(color), battery(paper, .2))],
    "test-013": [() => compose(heart(color), phone(paper)), () => compose(chat(color), face(paper)), () => compose(cup(color), heart(paper)), () => compose(plant("#7aa586"), heart(paper))],
    "test-014": [() => compose(book(color), camera(paper)), () => compose(camera(color), windowArt("#b6d8d9")), () => compose(camera(color), face(paper)), () => compose(notebook(color), camera(paper), pencil(color))],
    "test-015": [() => compose(sofa(color), lamp(paper)), () => `${box(148, 280, 390, 16, paper, 0)}${at(420, 224, .7, lamp(color))}${line(174, 296, 174, 375)}${line(512, 296, 512, 375)}`, () => compose(book(color), book(paper), camera(color)), () => `${at(303, 239, 1.2, windowArt("#b6d8d9"))}${dot(501, 289, 34, color)}${dot(555, 311, 34, paper)}${dot(521, 351, 34, "#86aeba")}`],
    "test-016": [() => compose(clock(color), ticket(paper)), () => compose(compass(color), clock(paper)), () => compose(phone(color), clock(paper)), () => compose(notebook(color, true), compass(paper))],
    "test-017": [() => compose(face(paper), heart(color)), () => compose(battery(color, 1), heart(paper)), () => compose(face(paper, false), book(color)), () => compose(chat(color), face(paper))],
    "test-018": [() => compose(plant("#7aa586"), notebook(paper)), () => compose(windowArt("#acd9dc"), compass(paper)), () => compose(book(color), pencil(paper)), () => compose(cup(color), windowArt("#c6d9e6"))],
    "test-019": [() => compose(compass(color), plant("#7aa586")), () => together(), () => compose(sofa(color), cup(paper)), () => compose(pencil(color), book(paper))],
    "test-022": [() => compose(windowArt("#b6d8d9"), compass(paper)), () => compose(ticket(color), camera(paper)), () => compose(plant("#7aa586"), windowArt("#cad9dc")), () => compose(sofa(color), lamp(paper))],
    "test-023": [() => compose(windowArt("#b6d8d9"), notebook(paper)), () => compose(notebook(color), cup(paper)), () => compose(notebook(color, true), clock(paper)), () => `${at(303, 212, 1.05, notebook(color, true), -12)}${at(408, 283, 1.05, notebook(paper, true), 9)}`],
    "test-024": [() => compose(notebook(color, true), robot(paper)), () => compose(pencil(color), robot(paper), book(color)), () => compose(compass(color), robot(paper)), () => compose(magnifier(color), robot(paper))],
    "test-025": [() => compose(pencil(color), book(paper)), () => compose(compass(color), plant("#7aa586")), () => compose(cup(color), book(paper)), () => together()]
  };
  return scenes[id]?.[variant]?.() || "";
}

function scene(id, color, paper, variant) {
  if (variant >= 0) {
    const result = resultScene(id, color, paper, variant);
    if (result) return result;
  }
  const v = variant < 0 ? 0 : variant;
  const pair = `${at(276, 228, 1.2, face(paper))}${at(444, 228, 1.2, face(color))}${at(360, 128, .55, chat("#fffdf7"))}${line(230, 311, 490, 311)}`;
  const room = `${at(272, 224, .82, windowArt("#b8d9db"))}${at(474, 279, .8, plant("#7aa586"))}${at(362, 346, .72, sofa(color))}`;
  switch (id) {
    case "test-001": return `${at(360, 268, 1.35, train(color))}${at(556, 117, .5, heart(paper), 12)}${at(158, 130, .52, ticket(paper), -12)}`;
    case "test-002": return `${at(297, 256, 1.1, laptop(color))}${at(521, 324, .85, cup(paper))}${at(514, 117, .54, clock(paper, v % 2))}`;
    case "test-003": return v % 2 ? `${at(320, 244, 1.35, windowArt("#b8d9db"))}${at(526, 341, .7, cup(paper))}` : `${at(320, 249, 1.22, compass(color), -12)}${at(527, 327, .8, ticket(paper), 14)}`;
    case "test-004": return `${at(288, 251, 1.25, clock(color, v % 2))}${at(494, 300, .94, book(paper), 13)}`;
    case "test-005": return `${pair}${at(166, 334, .6, cup(paper), -9)}${at(549, 332, .6, cup(color), 9)}`;
    case "test-006": return v === 1 ? pair : `${at(342, 279, 1.38, sofa(color))}${at(569, 232, .75, lamp(paper))}${at(169, 185, .53, book(paper), -12)}`;
    case "test-007": case "test-013": case "chat-temperature": return `${at(323, 244, 1.35, phone(color), -8)}${at(482, 180, .7, chat(paper))}${at(509, 323, .55, heart("#e9958d"))}`;
    case "test-008": case "test-017": return `${at(360, 229, 1.8, face(paper))}${at(525, 161, .6, chat(color), 9)}${at(196, 341, .55, heart(color), -12)}`;
    case "test-009": case "choice-roulette": return `${at(360, 252, 1.5, compass(color), v * 25 - 15)}${at(560, 128, .5, ticket(paper), 15)}`;
    case "test-010": return `${at(299, 248, 1.23, notebook(color, true), -9)}${at(501, 304, .85, ticket(paper), 12)}${dot(507, 134, 34, "#e7b653")}${line(507, 113, 507, 155)}`;
    case "test-011": return `${at(360, 261, 1.05, laptop(color))}${at(204, 145, .8, face(paper))}${at(514, 145, .8, face(color))}${at(360, 127, .7, face("#f5c19f"))}`;
    case "test-012": return v === 1 || v === 2 ? pair : room;
    case "test-014": return `${at(340, 253, 1.5, camera(color), -8)}${at(541, 134, .46, windowArt("#b8d9db"), 12)}`;
    case "test-015": return room;
    case "test-016": return `${at(309, 251, 1.3, notebook(color, v % 2 === 0))}${at(511, 322, .64, clock(paper, v % 2))}`;
    case "test-018": return `${at(295, 234, 1.16, windowArt(v === 3 ? "#c6d9e6" : "#b6d8d9"))}${at(515, 318, .9, plant(v === 2 ? "#cd9875" : "#7aa586"))}`;
    case "test-019": return v === 1 ? pair : v === 2 ? room : `${at(292, 263, 1.15, book(color), -12)}${at(516, 272, .9, plant("#7aa586"))}${at(494, 145, .5, cup(paper))}`;
    case "test-020":
      if (variant === 1) return pair;
      if (variant === 2) return `${at(293, 221, 1.7, face(paper, false))}${at(510, 181, .6, chat(color))}${at(489, 307, .55, chat("#fffdf7"), 12)}`;
      if (variant === 3) return `${at(330, 268, 1.35, sofa(color))}${at(534, 156, .8, battery(paper, .25))}`;
      return `${at(245, 246, 1.3, face(paper))}${at(472, 246, 1.3, face(color))}${at(360, 186, 1.3, face("#f4bb98"))}${at(360, 344, .65, battery(paper, .9))}`;
    case "test-021": case "battery-stop": return `${at(343, 254, 1.7, battery(color, [1, .75, .5, .25, .1][v]))}${at(544, 128, .47, cup(paper))}`;
    case "test-022": return v === 3 ? room : `${at(360, 244, 1.38, windowArt(v === 2 ? "#cad9dc" : "#b6d8d9"))}`;
    case "test-023": case "weekly-energy-budget": return `${at(291, 246, 1.28, notebook(color, true), -8)}${at(521, 318, .8, cup(paper))}${at(513, 145, .59, clock(paper))}`;
    case "test-024": return `${at(313, 253, 1.45, robot(color))}${at(529, 173, .72, chat(paper))}${at(540, 343, .6, notebook(paper, true), 12)}`;
    case "test-025": return v === 1 ? `${at(341, 244, 1.35, compass(color), -12)}` : v === 3 ? pair : `${at(304, 252, 1.15, book(color), -12)}${at(500, 307, .9, cup(paper))}${at(536, 147, .5, plant("#7aa586"))}`;
    case "procrastination-bingo": return `${at(347, 246, 1.5, notebook(color, true), -8)}${at(558, 333, .65, cup(paper))}`;
    case "today-box": return `${box(220, 213, 280, 160, paper, 6)}${box(205, 177, 310, 48, color, 6)}${line(360, 179, 360, 371)}<path d="M360 178C196 123 262 62 360 178C458 62 524 123 360 178Z" fill="${color}"/>`;
    case "relationship-ranking": return `${pair}${at(360, 344, .4, heart(color))}`;
    case "campus-festival-story": return `${at(360, 254, 1.5, ticket(color), -9)}${at(162, 159, .55, face(paper))}${at(563, 335, .55, face(paper))}`;
    case "emotion-trash": return `${box(268, 175, 184, 194, color, 15)}${box(254, 153, 212, 29, paper, 6)}${line(311, 212, 311, 335)}${line(359, 212, 359, 335)}${line(407, 212, 407, 335)}${at(363, 103, .48, chat(paper), -10)}`;
    default: throw new Error(`Missing artwork: ${id}`);
  }
}

export function artworkSvg(id, title, index, variant = -1) {
  const [background, color, paper] = palettes[(index + Math.max(0, variant)) % palettes.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" width="720" height="480"><title>${escapeHtml(title)}</title><rect width="720" height="480" fill="${background}"/><g stroke="#293b39" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${line(110, 399, 609, 399)}${scene(id, color, paper, variant)}</g></svg>\n`;
}

export function generateArtwork(pages, catalog) {
  const directory = path.join(root, "assets/images/covers");
  fs.mkdirSync(directory, { recursive: true });
  catalog.items.forEach((item, index) => {
    fs.writeFileSync(path.join(directory, `${item.id}.svg`), artworkSvg(item.id, item.title, index));
    Object.entries(pages[item.id]?.results || {}).forEach(([key, result], variant) => {
      fs.writeFileSync(path.join(directory, `${item.id}-${key}.svg`), artworkSvg(item.id, result.title, index, variant));
    });
  });
}
