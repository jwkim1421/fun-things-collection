// Offline reproduction of the report's rendering comparison. Does not run or deploy the site.
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';

const currentRevision = 'e7b165cbb6b989095d6f69c2f9f01878e6874178';
const previousRevision = 'bc5aa50a5f6865c56263e57012c31e8761e5d7a0';
const names = ['site-config', 'content-data', 'extra-content-data', 'catalog', 'playground'];
const source = (revision, name) => execFileSync('git', ['-c', 'core.excludesFile=.git/info/exclude', 'show', `${revision}:assets/js/${name}.js`], {encoding:'utf8'});
const hash = value => createHash('sha256').update(value).digest('hex');
const sources = Object.fromEntries(names.map(name => [name, source(currentRevision, name)]));
const renderer = {previous:source(previousRevision,'test-page'), current:source(currentRevision,'test-page')};
const contexts = Object.fromEntries(Object.entries(renderer).map(([version, code]) => {
  const context = vm.createContext({window:{location:{search:''}}, document:{addEventListener(){}, querySelector(){return{};}, body:{dataset:{}}}, URLSearchParams, console});
  for (const name of names) vm.runInContext(sources[name], context);
  vm.runInContext(code, context);
  return [version,context];
}));
const {pages,cards} = contexts.current.window.SITE_CONTENT;
const report = {currentRevision,previousRevision,sourceSha256:Object.fromEntries(Object.entries(sources).map(([name,text])=>[name,hash(text)])),rendererSha256:Object.fromEntries(Object.entries(renderer).map(([name,text])=>[name,hash(text)])),method:'UTF-16 string length excluding whitespace in summary/traits/comment/match; hidden means inside a closed details element; same current data in both renderers',results:[]};
const browser = await chromium.launch({channel:'msedge',headless:true});
try {
  const context = await browser.newContext();
  await context.route('**/*',route=>route.abort());
  const page = await context.newPage();
  for (const [id,data] of Object.entries(pages)) {
    if (Number(id.slice(-3))>23) continue;
    for (const key of Object.keys(data.results)) {
      const row = {id,key,title:data.title,result:data.results[key].title};
      for (const [version,ctx] of Object.entries(contexts)) {
        ctx.document.body.dataset.testId=id;
        await page.setContent(ctx.renderResultScreen(data,key,cards));
        row[version] = await page.evaluate(()=>{
          const nodes=['.result-summary-copy','.result-traits','.result-kuku-comment p','.result-match-board'].flatMap(selector=>[...document.querySelectorAll(selector)]);
          const length=node=>node.textContent.replace(/\s/g,'').length;
          return {explanationChars:nodes.reduce((sum,node)=>sum+length(node),0),visibleExplanationChars:nodes.filter(node=>!node.closest('details:not([open])')).reduce((sum,node)=>sum+length(node),0),paragraphs:nodes.reduce((sum,node)=>sum+(node.matches('p')?1:node.querySelectorAll('p').length),0)};
        });
      }
      report.results.push(row);
    }
  }
  report.averages=Object.fromEntries(['previous','current'].map(version=>[version,Object.fromEntries(['explanationChars','visibleExplanationChars','paragraphs'].map(field=>[field,report.results.reduce((sum,row)=>sum+row[version][field],0)/report.results.length]))]));
} finally { await browser.close(); }
if (process.argv[2]) {
  fs.writeFileSync(process.argv[2],JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({cases:report.results.length,averages:report.averages,output:process.argv[2]}));
} else console.log(JSON.stringify(report,null,2));
