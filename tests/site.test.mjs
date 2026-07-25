import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

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
  assert.match(sitemap, /certified-arborist-study-plan/);
  assert.match(sitemap, /arborist-safe-work-practices-quiz/);
  assert.match(sitemap, /certified-arborist-exam-readiness-check/);
  assert.match(robots, /Sitemap:/);
  assert.match(support, /KDW9M2B4N5S2A/);
  assert.match(support, /S3T8ZQSJD689G/);
});

test("hosts the IndexNow key at the site root", async () => {
  const key = await read("dist/e8126d98dca197b3cbcb885cacac678c.txt");
  assert.equal(key.trim(), "e8126d98dca197b3cbcb885cacac678c");
});
