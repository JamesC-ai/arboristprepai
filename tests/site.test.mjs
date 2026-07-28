import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const seoRoutes = [
  "certified-arborist-study-plan",
  "arborist-exam-practice-questions",
  "arborist-exam-study-schedule",
  "tree-risk-assessment-study-guide",
  "arborist-pruning-practice-quiz",
  "arborist-soil-management-review",
  "arborist-tree-biology-study-guide",
  "arborist-safe-work-practices-quiz",
  "arborist-exam-flashcard-plan",
  "certified-arborist-exam-readiness-check",
  "arborist-plant-identification-study-guide",
  "arborist-diagnosis-treatment-study-guide",
  "tree-installation-establishment-study-guide",
  "urban-forestry-study-guide",
  "tree-protection-during-construction-study-guide",
  "arborist-pest-identification-study-guide",
  "abiotic-tree-stress-study-guide",
  "arborist-cabling-bracing-study-guide",
  "tree-appraisal-basics-study-guide",
  "arborist-watering-irrigation-study-guide",
  "utility-arboriculture-safety-study-guide",
  "tree-preservation-plan-study-guide",
  "arborist-client-communication-scenario-quiz",
  "tree-inventory-study-guide",
  "arborist-emergency-storm-damage-study-guide",
  "arborist-tree-disease-study-guide",
  "arborist-roots-and-soil-compaction-review",
  "arborist-mulching-study-guide",
  "arborist-fertilization-study-guide",
  "arborist-tree-selection-study-guide",
  "arborist-plant-health-care-study-guide",
  "arborist-equipment-safety-study-guide",
  "arborist-aerial-lift-safety-study-guide",
  "arborist-ethics-professional-practice-study-guide",
  "arborist-final-week-review-checklist",
  "arborist-decay-fungi-study-guide",
  "arborist-tree-worker-safety-scenario-quiz",
  "arborist-ipm-study-guide",
  "arborist-young-tree-training-study-guide",
  "arborist-mature-tree-pruning-study-guide",
  "arborist-palm-care-study-guide",
  "arborist-tree-report-writing-study-guide",
  "arborist-municipal-tree-policy-study-guide",
  "arborist-tree-ordinance-review-checklist",
  "arborist-exam-day-logistics-checklist",
  "arborist-tree-identification-field-notes",
  "arborist-pruning-cuts-study-guide",
  "arborist-soil-texture-study-guide",
  "arborist-tree-risk-language-practice",
  "arborist-root-collar-study-guide",
  "arborist-construction-protection-scenario-quiz",
  "arborist-utility-line-clearance-study-guide",
  "arborist-lightning-protection-study-guide",
  "arborist-tree-inventory-data-checklist",
  "arborist-client-report-review-checklist",
];

test("ships the study diagnostic and launch offers", async () => {
  const html = await read("dist/index.html");
  assert.match(html, /ArboristPrepAI/);
  assert.match(html, /Confidence by domain/);
  assert.match(html, /Concept check/);
  assert.match(html, /\$19/);
  assert.match(html, /\$49/);
  assert.match(html, /KDW9M2B4N5S2A/);
  assert.match(html, /S3T8ZQSJD689G/);
  assert.match(html, /not affiliated with or endorsed by/);
  assert.match(html, /Plant identification/);
  assert.match(html, /Construction protection/);
  assert.match(html, /Pest identification/);
  assert.match(html, /Storm damage/);
  assert.match(html, /Decay fungi/);
  assert.match(html, /Exam logistics/);
});

test("runs locally without transmitting diagnostic answers", async () => {
  const app = await read("dist/app.js");
  assert.match(app, /buildPlan/);
  assert.match(app, /correctAnswers/);
  assert.match(app, /navigator\.clipboard/);
  assert.doesNotMatch(app, /fetch\(/);
});

test("generates policy, discovery, and SEO pages", async () => {
  const sitemap = await read("dist/sitemap.xml");
  const robots = await read("dist/robots.txt");
  const support = await read("dist/support.html");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(sitemapUrls.length, 59);
  for (const route of seoRoutes) {
    assert.ok(sitemapUrls.includes(`https://arborist.pagecheckai.com/${route}/`), `missing sitemap route: ${route}`);
  }
  assert.match(robots, /Sitemap:/);
  assert.match(support, /KDW9M2B4N5S2A/);
  assert.match(support, /S3T8ZQSJD689G/);
});

test("renders all study pages with independent-use boundaries", async () => {
  for (const route of seoRoutes) {
    const html = await read(`dist/${route}/index.html`);
    assert.match(html, /ArboristPrepAI/);
    assert.match(html, /Run the free diagnostic/);
    assert.match(html, /not affiliated with or endorsed by ISA/);
    assert.match(html, /does not reproduce official or recalled exam questions/);
    assert.match(html, /does not guarantee a passing result/);
  }
});

test("new study guides avoid unsafe instruction and guarantees", async () => {
  const disease = await read("dist/arborist-tree-disease-study-guide/index.html");
  const lift = await read("dist/arborist-aerial-lift-safety-study-guide/index.html");
  const ethics = await read("dist/arborist-ethics-professional-practice-study-guide/index.html");
  const finalWeek = await read("dist/arborist-final-week-review-checklist/index.html");
  const combined = `${disease}\n${lift}\n${ethics}\n${finalWeek}`;

  assert.match(combined, /not affiliated with or endorsed by ISA/);
  assert.match(combined, /does not reproduce official or recalled exam questions/);
  assert.match(combined, /does not guarantee a passing result/);
  assert.match(combined, /qualified training, employer procedures, and current regulations/);
  assert.match(combined, /Avoid guarantees about tree survival, safety, legal results, or exam outcomes/);
  assert.doesNotMatch(combined.toLowerCase(), /official exam questions|recalled exam answers|guaranteed pass|guaranteed safe/);
});

test("new advanced study pages keep safety, legal, and exam boundaries", async () => {
  const safety = await read("dist/arborist-tree-worker-safety-scenario-quiz/index.html");
  const ordinance = await read("dist/arborist-tree-ordinance-review-checklist/index.html");
  const report = await read("dist/arborist-tree-report-writing-study-guide/index.html");
  const logistics = await read("dist/arborist-exam-day-logistics-checklist/index.html");
  const combined = `${safety}\n${ordinance}\n${report}\n${logistics}`;

  assert.match(combined, /not affiliated with or endorsed by ISA/);
  assert.match(combined, /does not reproduce official or recalled exam questions/);
  assert.match(combined, /does not guarantee a passing result/);
  assert.match(safety, /qualified training, employer procedures, and current regulations/);
  assert.match(ordinance, /without giving legal advice/i);
  assert.match(report, /Avoid guarantees about safety, legal results, tree survival, or exam outcomes/);
  assert.match(logistics, /Avoid treating readiness scores as a guarantee/);
}
);

test("second-pass field study pages keep referral and no-guarantee boundaries", async () => {
  const pruning = await read("dist/arborist-pruning-cuts-study-guide/index.html");
  const rootCollar = await read("dist/arborist-root-collar-study-guide/index.html");
  const construction = await read("dist/arborist-construction-protection-scenario-quiz/index.html");
  const utility = await read("dist/arborist-utility-line-clearance-study-guide/index.html");
  const lightning = await read("dist/arborist-lightning-protection-study-guide/index.html");
  const report = await read("dist/arborist-client-report-review-checklist/index.html");
  const combined = `${pruning}\n${rootCollar}\n${construction}\n${utility}\n${lightning}\n${report}`;

  assert.match(combined, /not affiliated with or endorsed by ISA/);
  assert.match(combined, /does not reproduce official or recalled exam questions/);
  assert.match(combined, /does not guarantee a passing result/);
  assert.match(pruning, /Verify current standards and qualified supervision before field use/);
  assert.match(rootCollar, /without qualified local review/);
  assert.match(construction, /qualified professional direction before action/);
  assert.match(utility, /Avoid any instruction to approach, prune, or work near energized conductors/);
  assert.match(lightning, /Avoid safety guarantees, wiring guidance, or engineering advice/);
  assert.match(report, /Remove guarantees about safety, survival, legal results, compliance, or exam outcomes/);
  assert.doesNotMatch(combined.toLowerCase(), /guaranteed pass|guaranteed safe|official exam questions|recalled exam answers/);
});

test("hosts the IndexNow key at the site root", async () => {
  const key = await read("dist/e8126d98dca197b3cbcb885cacac678c.txt");
  assert.equal(key.trim(), "e8126d98dca197b3cbcb885cacac678c");
});
