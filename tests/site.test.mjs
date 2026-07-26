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
  assert.equal(sitemapUrls.length, 29);
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

test("hosts the IndexNow key at the site root", async () => {
  const key = await read("dist/e8126d98dca197b3cbcb885cacac678c.txt");
  assert.equal(key.trim(), "e8126d98dca197b3cbcb885cacac678c");
});
