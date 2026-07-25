import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const siteUrl = "https://arborist.pagecheckai.com";
const pages = [
  {
    slug: "certified-arborist-study-plan",
    title: "Certified Arborist study plan",
    description: "Build a weekly Certified Arborist study plan around your exam date, available hours, and weakest knowledge domains.",
    headline: "Build a Certified Arborist study plan that fits your calendar.",
    intent: "Candidates who have study materials but need a realistic sequence for biology, pruning, risk, soil, diagnosis, and safe work review.",
    actions: ["Set the exam date and weekly hours.", "Rate confidence across ten domains.", "Verify weak concepts with current official materials.", "Re-test after spaced review."],
  },
  {
    slug: "arborist-exam-practice-questions",
    title: "Arborist exam practice questions",
    description: "Use original arborist concept checks without relying on recalled or official certification exam questions.",
    headline: "Practice arborist concepts without using recalled questions.",
    intent: "Candidates who want short original checks with explanations and a clear boundary around protected exam content.",
    actions: ["Answer from first principles.", "Read why the distractors fail.", "Verify technical guidance.", "Turn each miss into a study note."],
  },
  {
    slug: "arborist-exam-study-schedule",
    title: "Arborist exam study schedule",
    description: "Create a four-, six-, or eight-week arborist exam review schedule based on weak domains and available study time.",
    headline: "Turn your exam date into a weekly arborist review schedule.",
    intent: "Working arborists balancing field schedules, family time, and certification preparation.",
    actions: ["Reserve repeatable study blocks.", "Front-load weak domains.", "Use field scenarios for recall.", "Protect the final 48 hours from new material."],
  },
  {
    slug: "tree-risk-assessment-study-guide",
    title: "Tree risk assessment study guide",
    description: "Organize tree risk study around targets, likelihood, consequences, defects, site context, and communication.",
    headline: "Structure your tree risk assessment review.",
    intent: "Candidates who need a clear review sequence for basic tree-risk concepts before deeper credential-specific study.",
    actions: ["Separate defect from risk.", "Identify targets and consequences.", "Practice concise observations.", "Verify current terminology and standards."],
  },
  {
    slug: "arborist-pruning-practice-quiz",
    title: "Arborist pruning practice quiz",
    description: "Review pruning objectives, branch unions, collar placement, response growth, and decision boundaries with original prompts.",
    headline: "Check the pruning concepts that support sound decisions.",
    intent: "Candidates reviewing pruning vocabulary and the reasoning behind common field choices.",
    actions: ["Name the pruning objective.", "Identify branch features.", "Explain cut placement.", "Check current standards before field use."],
  },
  {
    slug: "arborist-soil-management-review",
    title: "Arborist soil management review",
    description: "Review compaction, aeration, water movement, organic matter, roots, testing, and amendment decisions.",
    headline: "Focus your arborist soil-management review.",
    intent: "Candidates who understand tree work but need a stronger soil and root-zone framework.",
    actions: ["Map soil limits on site.", "Connect pore space to roots.", "Base treatment on evidence.", "Review construction impacts."],
  },
  {
    slug: "arborist-tree-biology-study-guide",
    title: "Arborist tree biology study guide",
    description: "Plan tree biology study around roots, transport, growth, energy, wood, defense, and environmental stress.",
    headline: "Build a practical tree biology review sequence.",
    intent: "Candidates who need to connect biological processes to pruning, diagnosis, establishment, and risk decisions.",
    actions: ["Review structures first.", "Explain processes in plain language.", "Connect biology to field decisions.", "Use spaced recall."],
  },
  {
    slug: "arborist-safe-work-practices-quiz",
    title: "Arborist safe work practices quiz",
    description: "Use original scenario prompts to review site checks, communication, PPE, electrical awareness, and equipment inspection.",
    headline: "Review safe-work decisions before certification day.",
    intent: "Candidates who need active recall around safety without replacing employer procedures or hands-on training.",
    actions: ["Identify hazards before methods.", "State crew communication.", "Check equipment and PPE.", "Use current regulations and standards."],
  },
  {
    slug: "arborist-exam-flashcard-plan",
    title: "Arborist exam flashcard plan",
    description: "Create a manageable arborist flashcard plan for terminology, comparisons, processes, and field scenarios.",
    headline: "Use fewer, better arborist flashcards.",
    intent: "Candidates overwhelmed by large decks or passive rereading.",
    actions: ["Write one fact per card.", "Prefer explanations over definitions.", "Retire mastered cards.", "Verify uncertain wording before memorizing it."],
  },
  {
    slug: "certified-arborist-exam-readiness-check",
    title: "Certified Arborist exam readiness check",
    description: "Estimate readiness across ten arborist domains and generate a final review sequence without a pass guarantee.",
    headline: "Check readiness before you add more study material.",
    intent: "Candidates deciding whether to review broadly or focus on a few weak domains.",
    actions: ["Rate confidence honestly.", "Complete original concept checks.", "Rank weak domains.", "Confirm eligibility and policies with official sources."],
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pageHtml(page) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(page.title)} - ArboristPrepAI</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <link rel="canonical" href="${siteUrl}/${page.slug}/" />
    <meta property="og:title" content="${escapeHtml(page.title)} - ArboristPrepAI" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />
    <meta property="og:image" content="${siteUrl}/arborist-field.jpg" />
    <link rel="stylesheet" href="/styles.css" />
    <link rel="icon" href="/favicon.svg" />
  </head>
  <body>
    <main class="legal">
      <a href="/">Open ArboristPrepAI</a>
      <p class="eyebrow">Independent certification prep</p>
      <h1>${escapeHtml(page.headline)}</h1>
      <p>${escapeHtml(page.description)}</p>
      <h2>Best fit</h2>
      <p>${escapeHtml(page.intent)}</p>
      <h2>Review sequence</h2>
      <ol>${page.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ol>
      <p><a class="primary-button" href="/#diagnostic">Run the free diagnostic</a></p>
      <h2>Independent-use boundary</h2>
      <p>ArboristPrepAI is not affiliated with or endorsed by ISA. It does not reproduce official or recalled exam questions and does not guarantee a passing result. Verify current requirements and technical guidance with official sources.</p>
      <p><a href="/support.html">Support</a> · <a href="https://tools.pagecheckai.com">More PageCheckAI tools</a></p>
    </main>
  </body>
</html>`;
}

await rm("dist", { force: true, recursive: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });

for (const page of pages) {
  await mkdir(`dist/${page.slug}`, { recursive: true });
  await writeFile(`dist/${page.slug}/index.html`, pageHtml(page));
}

await writeFile(
  "dist/robots.txt",
  `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`,
);

const staticUrls = ["/", "/privacy.html", "/terms.html", "/support.html"];
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...pages.map((page) => `/${page.slug}/`)]
  .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
  .join("\n")}
</urlset>
`,
);

console.log(`Built ArboristPrepAI with ${pages.length} SEO pages.`);
