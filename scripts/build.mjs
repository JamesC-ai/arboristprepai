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
  {
    slug: "arborist-plant-identification-study-guide",
    title: "Arborist plant identification study guide",
    description: "Build a plant identification review process around observable features, seasonal limits, site context, and verified regional references.",
    headline: "Make plant identification practice more systematic.",
    intent: "Candidates who need a repeatable way to study tree identification without memorizing one narrow photo set.",
    actions: ["Start with leaf arrangement and form.", "Compare bark, buds, fruit, and habit.", "Record seasonal uncertainty.", "Verify species with current regional references."],
  },
  {
    slug: "arborist-diagnosis-treatment-study-guide",
    title: "Arborist diagnosis and treatment study guide",
    description: "Review diagnosis as an evidence process that separates symptoms, signs, site history, likely causes, testing, and treatment limits.",
    headline: "Practice diagnosis before jumping to treatment.",
    intent: "Candidates strengthening the reasoning used for tree disorders, pests, abiotic stress, and responsible recommendations.",
    actions: ["Describe symptoms and signs separately.", "Gather site and management history.", "Rank plausible causes.", "Verify diagnosis and treatment guidance before field use."],
  },
  {
    slug: "tree-installation-establishment-study-guide",
    title: "Tree installation and establishment study guide",
    description: "Review species selection, root flare, planting depth, root defects, backfill, mulch, watering, staking, and establishment monitoring.",
    headline: "Connect tree installation details to establishment outcomes.",
    intent: "Candidates reviewing why planting-site assessment and early aftercare affect long-term tree performance.",
    actions: ["Match the tree to site constraints.", "Inspect roots and locate the flare.", "Review planting and support decisions.", "Plan watering and follow-up observations."],
  },
  {
    slug: "urban-forestry-study-guide",
    title: "Urban forestry study guide for arborist candidates",
    description: "Organize urban forestry review around inventory, canopy goals, species diversity, budgets, community needs, maintenance, and risk priorities.",
    headline: "Place individual tree decisions inside an urban forest plan.",
    intent: "Candidates who need to connect field arboriculture with municipal planning, public benefits, constraints, and long-term management.",
    actions: ["Define the inventory question.", "Connect data to canopy and service goals.", "Balance diversity, maintenance, and risk.", "Review communication and implementation constraints."],
  },
  {
    slug: "tree-protection-during-construction-study-guide",
    title: "Tree protection during construction study guide",
    description: "Review tree protection zones, root and soil impacts, grade changes, access routes, monitoring, communication, and documentation around construction.",
    headline: "Study construction impacts before damage reaches the tree.",
    intent: "Candidates reviewing how planning, site controls, monitoring, and communication reduce avoidable construction damage.",
    actions: ["Identify retained trees and site constraints.", "Map likely root and soil impacts.", "Plan protection and access boundaries.", "Document changes and verify current standards."],
  },
  {
    slug: "arborist-pest-identification-study-guide",
    title: "Arborist pest identification study guide",
    description: "Review pest identification as a process that combines symptoms, signs, host species, season, site history, and verified references.",
    headline: "Study pest identification without jumping to a treatment answer.",
    intent: "Candidates who need to separate insect, disease, abiotic, and site-stress clues before choosing a likely cause.",
    actions: ["Record host, season, and site conditions.", "Separate symptoms from signs.", "Compare likely pests with verified references.", "Check current local guidance before field recommendations."],
  },
  {
    slug: "abiotic-tree-stress-study-guide",
    title: "Abiotic tree stress study guide",
    description: "Organize study around drought, compaction, grade changes, heat, salt, mechanical damage, nutrient issues, and construction stress.",
    headline: "Practice spotting non-living stress factors in tree scenarios.",
    intent: "Candidates reviewing how site conditions can mimic pests or diseases and change diagnosis priorities.",
    actions: ["List site changes and exposure.", "Connect symptoms to likely stress pathways.", "Rule out management and soil factors.", "Verify treatment limits before recommending action."],
  },
  {
    slug: "arborist-cabling-bracing-study-guide",
    title: "Arborist cabling and bracing study guide",
    description: "Review support-system concepts around objectives, inspection, defects, documentation, limitations, and referral boundaries.",
    headline: "Study cabling and bracing as a decision process.",
    intent: "Candidates who need conceptual understanding without treating a study tool as installation instruction.",
    actions: ["State the support objective.", "Identify the defect and risk context.", "Review inspection and documentation needs.", "Verify current standards and qualified supervision before field use."],
  },
  {
    slug: "tree-appraisal-basics-study-guide",
    title: "Tree appraisal basics study guide",
    description: "Review tree appraisal concepts around purpose, site context, condition, functional value, documentation, and professional limits.",
    headline: "Understand the reasoning behind tree appraisal basics.",
    intent: "Candidates who need a study-level map of appraisal terms and documentation without replacing a qualified valuation.",
    actions: ["Define the appraisal purpose.", "Record species, condition, site, and constraints.", "Separate observations from conclusions.", "Verify methods with current professional references."],
  },
  {
    slug: "arborist-watering-irrigation-study-guide",
    title: "Arborist watering and irrigation study guide",
    description: "Study water movement, establishment watering, drought response, overwatering signs, irrigation checks, and root-zone monitoring.",
    headline: "Connect watering decisions to roots, soil, and establishment.",
    intent: "Candidates reviewing how water management affects tree performance and diagnosis.",
    actions: ["Assess soil and root-zone conditions.", "Match watering to establishment stage.", "Compare drought and excess-water clues.", "Verify local restrictions and site-specific recommendations."],
  },
  {
    slug: "utility-arboriculture-safety-study-guide",
    title: "Utility arboriculture safety study guide",
    description: "Review utility arboriculture concepts around electrical awareness, work zones, communication, clearance objectives, and referral boundaries.",
    headline: "Keep utility arboriculture study anchored in safety boundaries.",
    intent: "Candidates who need conceptual review while respecting employer procedures, regulations, and qualified-line-clearance requirements.",
    actions: ["Identify electrical and access hazards first.", "State communication and exclusion-zone needs.", "Separate study concepts from field authorization.", "Verify current regulations, employer rules, and qualified training."],
  },
  {
    slug: "tree-preservation-plan-study-guide",
    title: "Tree preservation plan study guide",
    description: "Study preservation planning around retained trees, root zones, access routes, monitoring, documentation, and construction communication.",
    headline: "Turn tree preservation into a practical study checklist.",
    intent: "Candidates reviewing how pre-construction planning protects trees and reduces preventable site damage.",
    actions: ["Inventory retained trees and constraints.", "Map root-zone and access conflicts.", "Define monitoring and documentation steps.", "Communicate changes before damage occurs."],
  },
  {
    slug: "arborist-client-communication-scenario-quiz",
    title: "Arborist client communication scenario quiz",
    description: "Practice explaining arborist observations, risk limits, maintenance options, and uncertainty without overpromising outcomes.",
    headline: "Practice clear arborist communication under uncertainty.",
    intent: "Candidates who know concepts but need to communicate recommendations, limits, and next steps clearly.",
    actions: ["State observations in plain language.", "Separate certainty from uncertainty.", "Offer practical next steps and referral boundaries.", "Avoid guarantees about survival, safety, or outcomes."],
  },
  {
    slug: "tree-inventory-study-guide",
    title: "Tree inventory study guide",
    description: "Review tree inventory concepts around data fields, condition ratings, maintenance priorities, mapping, and quality control.",
    headline: "Study tree inventory as a data-quality workflow.",
    intent: "Candidates connecting individual tree observations to management plans, budgets, and communication.",
    actions: ["Define the inventory purpose.", "Choose consistent fields and rating rules.", "Check data quality and missing observations.", "Connect inventory outputs to maintenance priorities."],
  },
  {
    slug: "arborist-emergency-storm-damage-study-guide",
    title: "Arborist storm damage study guide",
    description: "Review storm damage scenarios around immediate hazards, access limits, defect observations, documentation, and qualified response boundaries.",
    headline: "Study storm-damage response with safety first.",
    intent: "Candidates reviewing how to triage visible damage without treating a study guide as emergency response instruction.",
    actions: ["Identify immediate hazards and access limits.", "Document visible defects and targets.", "Separate urgent referral from routine pruning.", "Follow local emergency, utility, and employer procedures."],
  },
  {
    slug: "arborist-tree-disease-study-guide",
    title: "Arborist tree disease study guide",
    description: "Review tree disease concepts around hosts, symptoms, signs, environmental stress, sampling limits, and verified references.",
    headline: "Study tree disease diagnosis as an evidence process.",
    intent: "Candidates who need to separate disease clues from pests, abiotic stress, and site history before choosing likely causes.",
    actions: ["Record host species, season, symptoms, and signs.", "Compare disease clues with abiotic and pest possibilities.", "Note when lab testing or qualified review is needed.", "Verify current local guidance before making field recommendations."],
  },
  {
    slug: "arborist-roots-and-soil-compaction-review",
    title: "Arborist roots and soil compaction review",
    description: "Study root growth, compaction, pore space, construction impacts, grade changes, and root-zone protection for arborist exams.",
    headline: "Connect root-zone limits to tree performance.",
    intent: "Candidates reviewing why soil structure and root protection shape diagnosis, establishment, preservation, and risk decisions.",
    actions: ["Map the likely root zone before reviewing symptoms.", "Connect compaction to water, oxygen, and root growth.", "Separate visible symptoms from site causes.", "Check current references before recommending mitigation."],
  },
  {
    slug: "arborist-mulching-study-guide",
    title: "Arborist mulching study guide",
    description: "Review mulch objectives, depth, placement, moisture, root flare visibility, volcano mulch risks, and establishment context.",
    headline: "Study mulch as a root-zone management decision.",
    intent: "Candidates who need concise review of how mulch supports or harms trees depending on placement, depth, and site conditions.",
    actions: ["State the purpose of mulch for the site.", "Check root flare visibility and trunk contact.", "Compare moisture, temperature, and weed-control effects.", "Verify current best-practice guidance before field use."],
  },
  {
    slug: "arborist-fertilization-study-guide",
    title: "Arborist fertilization study guide",
    description: "Study fertilization concepts around soil testing, deficiency clues, site limits, timing, expectations, and recommendation boundaries.",
    headline: "Review fertilization without guessing at treatments.",
    intent: "Candidates strengthening the reasoning behind nutrient decisions while avoiding one-size-fits-all prescriptions.",
    actions: ["Start with site history, symptoms, and soil context.", "Separate deficiency suspicion from confirmed need.", "Review how timing and application method affect outcomes.", "Verify recommendations with current local and professional references."],
  },
  {
    slug: "arborist-tree-selection-study-guide",
    title: "Arborist tree selection study guide",
    description: "Review right-tree-right-place concepts around site constraints, mature size, utilities, soil, climate, pests, and maintenance goals.",
    headline: "Practice tree selection as a constraint-matching workflow.",
    intent: "Candidates connecting species traits, site assessment, client goals, and long-term maintenance in practical scenarios.",
    actions: ["List site constraints before choosing species.", "Match mature size, roots, utilities, soil, and exposure.", "Consider diversity, pests, and maintenance load.", "Verify regional suitability with current references."],
  },
  {
    slug: "arborist-plant-health-care-study-guide",
    title: "Arborist plant health care study guide",
    description: "Organize plant health care review around monitoring, diagnosis, thresholds, cultural care, documentation, and referral boundaries.",
    headline: "Study plant health care as an ongoing monitoring process.",
    intent: "Candidates who need a structured way to connect observation, prevention, client communication, and responsible intervention.",
    actions: ["Define the monitoring objective and tree value context.", "Record symptoms, signs, site factors, and trend changes.", "Prioritize cultural and site corrections before interventions.", "Verify treatment decisions with current qualified guidance."],
  },
  {
    slug: "arborist-equipment-safety-study-guide",
    title: "Arborist equipment safety study guide",
    description: "Review study-level equipment safety around inspection, PPE, communication, work zones, maintenance records, and training boundaries.",
    headline: "Keep equipment safety study tied to procedures and authorization.",
    intent: "Candidates reviewing safety concepts while respecting employer rules, manufacturer instructions, and hands-on training requirements.",
    actions: ["Identify equipment purpose and hazards before use.", "Review inspection, PPE, communication, and work-zone basics.", "Separate exam concepts from field authorization.", "Follow current employer, manufacturer, and regulatory guidance."],
  },
  {
    slug: "arborist-aerial-lift-safety-study-guide",
    title: "Arborist aerial lift safety study guide",
    description: "Review aerial-lift safety concepts around site setup, inspection, fall protection, communication, electrical awareness, and qualified operation.",
    headline: "Study aerial-lift scenarios with safety boundaries first.",
    intent: "Candidates who need conceptual review without treating a study page as operational lift instruction.",
    actions: ["Assess site, access, slope, overhead, and traffic hazards.", "Review inspection and fall-protection concepts.", "State communication and exclusion-zone needs.", "Use only qualified training, employer procedures, and current regulations for field work."],
  },
  {
    slug: "arborist-ethics-professional-practice-study-guide",
    title: "Arborist ethics and professional practice study guide",
    description: "Study professional-practice concepts around scope, documentation, client communication, conflicts, referrals, and uncertainty.",
    headline: "Review professional judgment, scope, and communication.",
    intent: "Candidates practicing how to explain limits, document observations, and refer specialized work without overpromising outcomes.",
    actions: ["Separate observation, opinion, and recommendation.", "Name scope limits and referral needs.", "Document assumptions and uncertainty.", "Avoid guarantees about tree survival, safety, legal results, or exam outcomes."],
  },
  {
    slug: "arborist-final-week-review-checklist",
    title: "Arborist final week review checklist",
    description: "Plan a final week of Certified Arborist review around weak domains, original concept checks, rest, logistics, and official policy verification.",
    headline: "Use the final week for focused review, not panic cramming.",
    intent: "Candidates close to exam day who need a calm sequence for review, logistics, and confidence checks without a pass guarantee.",
    actions: ["Prioritize the weakest high-value domains.", "Use original concept checks and explanations.", "Confirm exam logistics and policies with official sources.", "Protect sleep, travel time, and the final 24 hours from new material."],
  },
  {
    slug: "arborist-decay-fungi-study-guide",
    title: "Arborist decay fungi study guide",
    description: "Review decay fungi concepts around host context, visible signs, wood strength limits, risk language, documentation, and qualified assessment boundaries.",
    headline: "Study decay fungi as clues, not automatic conclusions.",
    intent: "Candidates practicing how fungal signs fit into diagnosis, risk assessment, communication, and referral decisions.",
    actions: ["Record host, location, fruiting body, defects, and site context.", "Separate visible signs from conclusions about strength or risk.", "Connect uncertainty to documentation and referral needs.", "Verify current references before field recommendations."],
  },
  {
    slug: "arborist-tree-worker-safety-scenario-quiz",
    title: "Arborist tree worker safety scenario quiz",
    description: "Use original scenarios to review hazard recognition, job briefing, PPE, drop zones, traffic control, electrical awareness, and stop-work decisions.",
    headline: "Practice safety reasoning before choosing a work method.",
    intent: "Candidates who need active recall around safe work concepts without replacing employer training or jobsite procedures.",
    actions: ["Identify hazards before tools or techniques.", "State crew communication and stop-work triggers.", "Review PPE, traffic, weather, and electrical concerns.", "Use qualified training, employer procedures, and current regulations for field work."],
  },
  {
    slug: "arborist-ipm-study-guide",
    title: "Arborist IPM study guide",
    description: "Organize integrated pest management review around monitoring, thresholds, pest life cycles, host stress, cultural care, documentation, and treatment limits.",
    headline: "Study IPM as monitoring and decision thresholds.",
    intent: "Candidates connecting pest diagnosis with prevention, site correction, responsible intervention, and client communication.",
    actions: ["Define monitoring objective and acceptable damage level.", "Connect pest life cycle to timing and host condition.", "Review cultural controls before intervention assumptions.", "Verify current local and label guidance before treatment decisions."],
  },
  {
    slug: "arborist-young-tree-training-study-guide",
    title: "Arborist young tree training study guide",
    description: "Review young tree structure, competing leaders, branch spacing, temporary branches, objectives, timing, and communication boundaries.",
    headline: "Connect young tree training to long-term structure.",
    intent: "Candidates reviewing why early structural pruning decisions differ from mature tree pruning and restoration work.",
    actions: ["Name the structural objective before choosing cuts.", "Identify leaders, branch spacing, and temporary branches.", "Connect timing to species, age, and site context.", "Check current pruning standards before field use."],
  },
  {
    slug: "arborist-mature-tree-pruning-study-guide",
    title: "Arborist mature tree pruning study guide",
    description: "Review mature tree pruning concepts around objectives, dose, defects, clearance, deadwood, client expectations, and long-term response.",
    headline: "Study mature tree pruning as objective-led risk management.",
    intent: "Candidates comparing pruning goals, tree response, and communication limits for established trees.",
    actions: ["State the pruning objective and reason.", "Match dose and cuts to tree condition and species response.", "Separate clearance, deadwood, risk, and aesthetics.", "Avoid guarantees about survival, safety, or future failure."],
  },
  {
    slug: "arborist-palm-care-study-guide",
    title: "Arborist palm care study guide",
    description: "Review palm biology, pruning limits, nutrient issues, planting depth, storm response, pests, and region-specific reference needs.",
    headline: "Study palm care without treating palms like broadleaf trees.",
    intent: "Candidates in palm regions who need conceptual review of palm-specific biology, maintenance, and safety boundaries.",
    actions: ["Review palm growth form and pruning limits.", "Connect symptoms to nutrition, site stress, pests, or damage.", "Use regional references for species and care guidance.", "Avoid field prescriptions without qualified local review."],
  },
  {
    slug: "arborist-tree-report-writing-study-guide",
    title: "Arborist tree report writing study guide",
    description: "Practice study-level tree report structure with scope, observations, limitations, photos, recommendations, uncertainty, and referral language.",
    headline: "Turn observations into clear, bounded tree reports.",
    intent: "Candidates practicing professional communication without treating a study draft as a legal, risk, or engineering report.",
    actions: ["Define scope, audience, and limitations.", "Separate observations from opinions and recommendations.", "Use photos, dates, and site context to support notes.", "Avoid guarantees about safety, legal results, tree survival, or exam outcomes."],
  },
  {
    slug: "arborist-municipal-tree-policy-study-guide",
    title: "Arborist municipal tree policy study guide",
    description: "Review municipal tree policy concepts around ordinances, permits, inventories, risk priorities, public communication, equity, and budget tradeoffs.",
    headline: "Place arborist decisions inside public tree policy.",
    intent: "Candidates connecting urban forestry, public communication, maintenance priorities, and policy constraints.",
    actions: ["Identify the policy goal and responsible authority.", "Connect inventory and risk data to maintenance priorities.", "Review permit, communication, and budget constraints.", "Verify local ordinances and official procedures before action."],
  },
  {
    slug: "arborist-tree-ordinance-review-checklist",
    title: "Arborist tree ordinance review checklist",
    description: "Study tree ordinance review concepts around protected trees, permits, replacement rules, pruning limits, documentation, and referral boundaries.",
    headline: "Review ordinance concepts without giving legal advice.",
    intent: "Candidates who need to understand how local rules affect arborist communication and planning.",
    actions: ["Identify protected-tree triggers and permit questions.", "Separate general study concepts from local legal requirements.", "Document who owns the decision and approval path.", "Refer clients to official municipal sources and qualified review."],
  },
  {
    slug: "arborist-exam-day-logistics-checklist",
    title: "Arborist exam day logistics checklist",
    description: "Prepare exam-day logistics around appointment confirmation, allowed materials, ID, travel buffer, rest, pacing, and official policy verification.",
    headline: "Keep exam day boring, verified, and calm.",
    intent: "Candidates close to test day who need a practical logistics checklist without new study overload or pass guarantees.",
    actions: ["Confirm time, location, ID, allowed items, and current policies with official sources.", "Plan travel, meals, rest, and backup timing.", "Use light recall instead of new material.", "Avoid treating readiness scores as a guarantee."],
  },
  {
    slug: "arborist-tree-identification-field-notes",
    title: "Arborist tree identification field notes",
    description: "Practice tree identification field notes around observable traits, uncertainty, seasonal clues, photos, and verified regional references.",
    headline: "Turn tree identification practice into better field notes.",
    intent: "Candidates who need a repeatable study routine for tree ID without treating photos or memory as final species confirmation.",
    actions: ["Record leaf arrangement, buds, bark, fruit, habit, and site context.", "Label uncertainty instead of forcing a species name.", "Compare notes against current regional references.", "Avoid using study notes as a diagnosis, treatment, or legal record."],
  },
  {
    slug: "arborist-pruning-cuts-study-guide",
    title: "Arborist pruning cuts study guide",
    description: "Review pruning-cut concepts around collars, branch unions, objectives, dose, timing, and standards without prescribing field work.",
    headline: "Study pruning cuts as concepts, not prescriptions.",
    intent: "Candidates reviewing pruning vocabulary and reasoning before confirming current standards and qualified field procedures.",
    actions: ["Name the pruning objective before naming a cut.", "Identify branch collar, bark ridge, included bark, and response growth.", "Separate study examples from site-specific work direction.", "Verify current standards and qualified supervision before field use."],
  },
  {
    slug: "arborist-soil-texture-study-guide",
    title: "Arborist soil texture study guide",
    description: "Review soil texture, structure, pore space, drainage, compaction, organic matter, and sampling limits for arborist study.",
    headline: "Connect soil texture to root-zone reasoning.",
    intent: "Candidates who need a clearer study framework for soil observations without replacing lab testing or local professional review.",
    actions: ["Compare texture, structure, drainage, and compaction as separate observations.", "Connect pore space and water movement to root health concepts.", "Use test results and local references before amendment decisions.", "Avoid treatment guarantees or site-specific prescriptions."],
  },
  {
    slug: "arborist-tree-risk-language-practice",
    title: "Arborist tree risk language practice",
    description: "Practice bounded tree-risk language around observations, targets, likelihood, consequences, limitations, and referral wording.",
    headline: "Make tree-risk language clear, cautious, and bounded.",
    intent: "Candidates learning how to discuss risk concepts without turning study notes into a formal risk assessment or safety guarantee.",
    actions: ["Separate observations, assumptions, limitations, and recommendations.", "Describe targets, likelihood, and consequences in plain language.", "Use referral language for formal assessment needs.", "Avoid guarantees about safety, failure, legal results, or future conditions."],
  },
  {
    slug: "arborist-root-collar-study-guide",
    title: "Arborist root collar study guide",
    description: "Review root collar concepts around planting depth, mulch, girdling roots, soil grade, inspection limits, and referral boundaries.",
    headline: "Study root collar clues without overreaching.",
    intent: "Candidates reviewing root flare and establishment concepts while keeping diagnosis and correction decisions within qualified review.",
    actions: ["Define root collar, root flare, grade, mulch depth, and visible root clues.", "Connect planting depth and soil cover to establishment concepts.", "Document uncertainty when the root system is not visible.", "Avoid excavation, correction, or treatment instructions without qualified local review."],
  },
  {
    slug: "arborist-construction-protection-scenario-quiz",
    title: "Arborist construction protection scenario quiz",
    description: "Use original construction-protection scenarios to review root zones, access paths, grade changes, communication, monitoring, and documentation.",
    headline: "Practice construction-protection reasoning from scenarios.",
    intent: "Candidates studying construction impacts and communication without replacing project-specific professional plans or authority review.",
    actions: ["Identify likely root-zone, soil, and grade-change impacts.", "Separate study recommendations from formal protection plans.", "Name documentation, monitoring, and communication needs.", "Verify local requirements and qualified professional direction before action."],
  },
  {
    slug: "arborist-utility-line-clearance-study-guide",
    title: "Arborist utility line clearance study guide",
    description: "Review utility arboriculture concepts around electrical awareness, clearance work boundaries, communication, and qualified training.",
    headline: "Study utility-line clearance with strict safety boundaries.",
    intent: "Candidates reviewing utility arboriculture concepts without attempting electrical, line-clearance, or jobsite procedures from a study page.",
    actions: ["Identify electrical-awareness concepts and jobsite communication needs.", "Separate general study vocabulary from employer and utility procedures.", "Defer clearance, access, and work-method decisions to qualified training.", "Avoid any instruction to approach, prune, or work near energized conductors."],
  },
  {
    slug: "arborist-lightning-protection-study-guide",
    title: "Arborist lightning protection study guide",
    description: "Review lightning-protection study concepts around risk factors, components, inspection questions, standards, and referral boundaries.",
    headline: "Study lightning protection as a referral-heavy topic.",
    intent: "Candidates who need conceptual familiarity with lightning protection without installation, inspection, engineering, or safety promises.",
    actions: ["Review common system components and decision factors at a high level.", "Identify when standards, inspection, or specialist referral matter.", "Separate maintenance observations from installation instructions.", "Avoid safety guarantees, wiring guidance, or engineering advice."],
  },
  {
    slug: "arborist-tree-inventory-data-checklist",
    title: "Arborist tree inventory data checklist",
    description: "Study tree-inventory data fields for species, size, condition notes, location, maintenance priority, photos, and uncertainty flags.",
    headline: "Make tree inventory study notes easier to compare.",
    intent: "Candidates connecting tree inventory concepts to urban forestry planning, communication, and bounded recommendations.",
    actions: ["Define the inventory purpose before choosing fields.", "Keep species, size, condition, location, and photo notes consistent.", "Flag uncertainty and missing access instead of hiding it.", "Avoid treating inventory notes as legal, risk, or compliance conclusions."],
  },
  {
    slug: "arborist-client-report-review-checklist",
    title: "Arborist client report review checklist",
    description: "Review client-facing arborist report drafts for scope, observations, limitations, photos, recommendations, referrals, and prohibited guarantees.",
    headline: "Check study-level arborist reports before sharing them.",
    intent: "Candidates practicing professional writing while keeping study drafts distinct from formal legal, risk, engineering, or compliance documents.",
    actions: ["Confirm the scope, audience, date, site limits, and purpose.", "Separate observations, opinions, recommendations, and referrals.", "Check that photos and limitations support the wording.", "Remove guarantees about safety, survival, legal results, compliance, or exam outcomes."],
  },
  {
    slug: "arborist-tree-support-systems-study-guide",
    title: "Arborist tree support systems study guide",
    description: "Review tree support system concepts around objectives, inspection questions, limitations, documentation, and qualified supervision boundaries.",
    headline: "Study support systems without turning notes into installation advice.",
    intent: "Candidates who need conceptual review of support-system decisions while avoiding engineering, installation, or safety promises.",
    actions: ["State the support objective and defect context.", "Separate inspection observations from installation decisions.", "Document limitations, follow-up, and referral needs.", "Verify current standards and qualified supervision before field use."],
  },
  {
    slug: "arborist-invasive-species-study-guide",
    title: "Arborist invasive species study guide",
    description: "Study invasive species concepts around identification clues, spread pathways, reporting, local rules, and referral boundaries.",
    headline: "Keep invasive species review tied to local verification.",
    intent: "Candidates reviewing invasive species concepts without turning study notes into treatment, quarantine, or regulatory advice.",
    actions: ["Record host, location, symptoms, and season.", "Compare observations with current local references.", "Identify official reporting or referral pathways.", "Avoid treatment, transport, quarantine, or legal instructions without authority review."],
  },
  {
    slug: "arborist-nursery-stock-selection-study-guide",
    title: "Arborist nursery stock selection study guide",
    description: "Review nursery stock selection around root defects, structure, caliper, species fit, handling, and documentation before planting decisions.",
    headline: "Study nursery stock selection as a quality review.",
    intent: "Candidates connecting planting success with stock quality, site fit, and visible defects.",
    actions: ["Define site constraints and intended tree function.", "Review visible roots, structure, wounds, and form.", "Separate quality observations from purchase approval.", "Verify species suitability and nursery standards with current references."],
  },
  {
    slug: "arborist-tree-wound-response-study-guide",
    title: "Arborist tree wound response study guide",
    description: "Study tree wound response concepts around compartmentalization, decay pathways, pruning impacts, site stress, and communication limits.",
    headline: "Connect wound response concepts to cautious recommendations.",
    intent: "Candidates reviewing tree biology and decay reasoning without promising recovery, safety, or future condition.",
    actions: ["Review wound location, size, timing, and surrounding tissue.", "Connect compartmentalization concepts to decay risk at a study level.", "Avoid predicting safety or survival from one observation.", "Verify diagnosis and recommendations with qualified review."],
  },
  {
    slug: "arborist-chainsaw-safety-concept-review",
    title: "Arborist chainsaw safety concept review",
    description: "Review chainsaw safety concepts around hazard recognition, PPE, communication, maintenance, and training boundaries without operating instruction.",
    headline: "Study chainsaw safety concepts without procedural instruction.",
    intent: "Candidates reviewing safety vocabulary while keeping hands-on skills within employer procedures, manufacturer instructions, and qualified training.",
    actions: ["Identify hazards, exclusion zones, PPE, and communication needs.", "Separate study concepts from operating steps.", "Follow manufacturer, employer, and regulatory guidance.", "Avoid using study pages as jobsite authorization or training."],
  },
  {
    slug: "arborist-planting-specification-review",
    title: "Arborist planting specification review",
    description: "Study planting specification review around site prep, root flare visibility, soil handling, support, watering, and inspection documentation.",
    headline: "Review planting specifications with documentation in mind.",
    intent: "Candidates practicing how planting details connect to establishment and client communication.",
    actions: ["Identify specification purpose, site constraints, and responsible parties.", "Review depth, root flare, support, mulch, and watering language.", "Separate study observations from contract or compliance approval.", "Verify local specifications and qualified direction before action."],
  },
  {
    slug: "arborist-pesticide-label-study-boundary",
    title: "Arborist pesticide label study boundary",
    description: "Review pesticide label study boundaries around legal label language, PPE, target pests, local rules, and licensed applicator referral.",
    headline: "Treat pesticide labels as authority, not study-page suggestions.",
    intent: "Candidates needing high-level awareness while avoiding application, dosage, legal, or safety instructions.",
    actions: ["Recognize that the current label and local law control use.", "Separate pest identification from treatment authorization.", "Refer application decisions to licensed or qualified professionals.", "Avoid dosage, mixing, timing, or application instructions in study notes."],
  },
  {
    slug: "arborist-tree-mapping-study-guide",
    title: "Arborist tree mapping study guide",
    description: "Study tree mapping concepts around location accuracy, IDs, photos, attributes, uncertainty, data quality, and maintenance handoff.",
    headline: "Make tree mapping study notes consistent and auditable.",
    intent: "Candidates connecting field observations with inventories, maintenance planning, and communication.",
    actions: ["Define the mapping purpose and required accuracy.", "Use consistent IDs, locations, photos, and field names.", "Flag uncertainty and access limits.", "Avoid treating maps as legal boundaries, engineering records, or risk guarantees."],
  },
  {
    slug: "arborist-tree-benefits-communication-guide",
    title: "Arborist tree benefits communication guide",
    description: "Practice communicating tree benefits with caveats around assumptions, local context, maintenance costs, equity, and no outcome guarantees.",
    headline: "Explain tree benefits without overselling outcomes.",
    intent: "Candidates preparing plain-language communication for clients, communities, or study scenarios.",
    actions: ["Name the specific benefit and the assumptions behind it.", "Balance benefits with maintenance, risk, access, and site limits.", "Avoid guaranteed savings, health, safety, property, or legal outcomes.", "Use current local data sources when available."],
  },
  {
    slug: "arborist-continuing-education-plan",
    title: "Arborist continuing education plan",
    description: "Prepare a continuing education plan around weak domains, credential maintenance, official requirements, field learning, and documentation.",
    headline: "Turn post-exam learning into a documented plan.",
    intent: "Candidates and newly certified arborists organizing next study steps without replacing official credential-maintenance requirements.",
    actions: ["Identify weak domains and work responsibilities.", "Check current official continuing education requirements.", "Mix reading, field mentorship, safety training, and documentation.", "Avoid treating the plan as credential approval or employer authorization."],
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
