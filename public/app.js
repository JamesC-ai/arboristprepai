const questions = [
  {
    domain: "Soil management",
    prompt: "What is the most direct soil effect of repeated heavy equipment traffic near a tree?",
    answers: ["More pore space", "Compaction and reduced oxygen", "Immediate root grafting", "Higher organic matter"],
    correct: 1,
    explanation: "Compaction reduces pore space, limiting oxygen and water movement in the root zone.",
  },
  {
    domain: "Pruning",
    prompt: "Where should a typical branch-removal cut be placed?",
    answers: ["Flush with the trunk", "Outside the branch collar", "Through the branch bark ridge", "At any convenient internode"],
    correct: 1,
    explanation: "A cut just outside the branch collar preserves the tree's natural wound-response area.",
  },
  {
    domain: "Tree risk",
    prompt: "Why does a target matter during a basic tree-risk assessment?",
    answers: ["It determines leaf color", "It establishes what could be struck", "It identifies the tree species", "It replaces defect inspection"],
    correct: 1,
    explanation: "Risk depends on consequences as well as likelihood; a target is the person or property that could be affected.",
  },
  {
    domain: "Installation and establishment",
    prompt: "At planting, where should the trunk flare generally be positioned?",
    answers: ["Well below grade", "Near the finished soil grade", "Covered by deep mulch", "Inside the wire basket"],
    correct: 1,
    explanation: "The trunk flare should remain visible near grade rather than being buried.",
  },
  {
    domain: "Safe work practices",
    prompt: "What should happen before an aerial tree-work system is used?",
    answers: ["Only the saw is inspected", "The site, tree, equipment, and communication plan are checked", "The climber starts before the crew arrives", "Ropes are selected by color"],
    correct: 1,
    explanation: "A pre-work inspection covers site hazards, tree condition, equipment, crew roles, and communication.",
  },
  {
    domain: "Identification and selection",
    prompt: "Which factor best supports 'right tree, right place' selection?",
    answers: ["Nursery discount only", "Mature size and site constraints", "Fastest first-year growth", "One preferred species for every site"],
    correct: 1,
    explanation: "Mature dimensions, utilities, soil, climate, and site use should guide selection.",
  },
  {
    domain: "Tree biology",
    prompt: "Where are many absorbing fine roots commonly concentrated?",
    answers: ["Only directly beneath the trunk", "In the upper, oxygenated soil profile", "Inside heartwood", "Above the root flare"],
    correct: 1,
    explanation: "Many fine absorbing roots occupy relatively shallow, oxygenated soil and extend beyond the canopy edge.",
  },
  {
    domain: "Diagnosis and treatment",
    prompt: "What is a sound first step when diagnosing tree decline?",
    answers: ["Apply fertilizer immediately", "Collect site history and inspect symptoms and signs", "Remove every affected branch", "Assume one pest is responsible"],
    correct: 1,
    explanation: "Diagnosis starts with evidence: site history, patterns, symptoms, signs, and environmental conditions.",
  },
  {
    domain: "Trees and construction",
    prompt: "When is tree-protection fencing most useful on a construction site?",
    answers: ["After grading is complete", "Before equipment enters the site", "Only after roots are cut", "During final landscaping"],
    correct: 1,
    explanation: "Protection zones need to be established before traffic, storage, excavation, and grade changes begin.",
  },
  {
    domain: "Urban forestry",
    prompt: "Why is species diversity valuable in an urban tree population?",
    answers: ["It eliminates all maintenance", "It reduces exposure to one pest or disease", "It guarantees faster growth", "It removes the need for inventory"],
    correct: 1,
    explanation: "Diversity reduces the chance that one pest, disease, or stressor affects a large share of the population.",
  },
  {
    domain: "Tree risk",
    prompt: "A codominant union with included bark should be treated as what?",
    answers: ["Proof the union is strong", "A condition requiring closer assessment", "A species identifier", "A reason to top the tree"],
    correct: 1,
    explanation: "Included bark can reduce wood connection and deserves closer inspection in context.",
  },
  {
    domain: "Soil management",
    prompt: "What is the best basis for deciding whether a mature tree needs fertilizer?",
    answers: ["A fixed annual schedule", "Evidence from site assessment and testing", "Leaf color alone", "The largest available dose"],
    correct: 1,
    explanation: "Fertilizer decisions should follow observed need, site conditions, and appropriate soil or tissue information.",
  },
];

const planForm = document.querySelector("#planForm");
const examDate = document.querySelector("#examDate");
const weeklyHours = document.querySelector("#weeklyHours");
const studyStyle = document.querySelector("#studyStyle");
const domainInputs = [...document.querySelectorAll("[data-domain]")];
const dateStatus = document.querySelector("#dateStatus");
const quizForm = document.querySelector("#quizForm");
const questionText = document.querySelector("#questionText");
const answerList = document.querySelector("#answerList");
const quizProgress = document.querySelector("#quizProgress");
const answerFeedback = document.querySelector("#answerFeedback");
const nextQuestion = document.querySelector("#nextQuestion");
const readinessScore = document.querySelector("#readinessScore");
const priorityList = document.querySelector("#priorityList");
const planOutput = document.querySelector("#planOutput");
const copyPlan = document.querySelector("#copyPlan");
const downloadPlan = document.querySelector("#downloadPlan");
const emailPlan = document.querySelector("#emailPlan");

let currentQuestion = 0;
let correctAnswers = 0;
let answeredQuestions = 0;
let lastPlanText = "";

const defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 42);
examDate.value = defaultDate.toISOString().slice(0, 10);

function daysUntilExam() {
  const selected = new Date(`${examDate.value}T12:00:00`);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Math.max(1, Math.ceil((selected - today) / 86400000));
}

function updateDateStatus() {
  const days = daysUntilExam();
  dateStatus.textContent = `${days} days available for focused review.`;
}

function domainScores() {
  return domainInputs.map((input) => ({
    name: input.dataset.domain,
    score: Number(input.value),
  }));
}

function renderQuestion() {
  const question = questions[currentQuestion];
  quizProgress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = question.prompt;
  answerList.innerHTML = question.answers
    .map(
      (answer, index) => `
        <label>
          <input type="radio" name="answer" value="${index}" />
          <span>${answer}</span>
        </label>`,
    )
    .join("");
  answerFeedback.textContent = "Select one answer.";
  answerFeedback.className = "answer-feedback";
  nextQuestion.disabled = true;
}

function buildPlan() {
  const scores = domainScores();
  const priorities = [...scores].sort((a, b) => a.score - b.score).slice(0, 3);
  const confidence = scores.reduce((sum, item) => sum + item.score, 0) / scores.length / 5;
  const quizRatio = answeredQuestions ? correctAnswers / answeredQuestions : 0.5;
  const readiness = Math.round((confidence * 0.55 + quizRatio * 0.45) * 100);
  const days = daysUntilExam();
  const weeks = Math.max(1, Math.ceil(days / 7));
  const hours = Number(weeklyHours.value);
  const style = studyStyle.options[studyStyle.selectedIndex].text;

  readinessScore.textContent = readiness;
  priorityList.innerHTML = priorities.map((item) => `<li>${item.name} <span>${item.score}/5</span></li>`).join("");

  const phases = [
    {
      title: "Verify the baseline",
      body: `Spend ${Math.max(1, Math.round(hours * 0.45))} hours on ${priorities[0].name} and verify every missed concept against current study references.`,
    },
    {
      title: "Connect field scenarios",
      body: `Split ${hours} hours between ${priorities[0].name}, ${priorities[1].name}, and short written explanations.`,
    },
    {
      title: "Timed recall",
      body: `Use ${style.toLowerCase()} in 25-minute blocks. Re-test only after reviewing why each distractor is wrong.`,
    },
    {
      title: "Final safety check",
      body: `Review ${priorities[2].name}, safety decisions, terminology, and the current official candidate requirements. Stop adding new material in the final 48 hours.`,
    },
  ];

  planOutput.innerHTML = phases
    .map((phase, index) => {
      const startWeek = Math.min(index + 1, weeks);
      return `<article><span>Phase ${index + 1} · week ${startWeek}</span><h3>${phase.title}</h3><p>${phase.body}</p></article>`;
    })
    .join("");

  lastPlanText = [
    "ArboristPrepAI readiness plan",
    `Target date: ${examDate.value} (${days} days)`,
    `Study time: ${hours} hours/week`,
    `Current readiness: ${readiness}/100`,
    `Priority domains: ${priorities.map((item) => `${item.name} (${item.score}/5)`).join(", ")}`,
    "",
    ...phases.map((phase, index) => `Phase ${index + 1}: ${phase.title}\n${phase.body}`),
    "",
    "Independent practice only. Verify current requirements and technical guidance with official sources.",
  ].join("\n");
  emailPlan.href = `mailto:support@pagecheckai.com?subject=${encodeURIComponent("ArboristPrepAI plan")}&body=${encodeURIComponent(lastPlanText)}`;
}

domainInputs.forEach((input) => {
  const output = input.parentElement.querySelector("output");
  input.addEventListener("input", () => {
    output.value = input.value;
  });
});

examDate.addEventListener("change", updateDateStatus);
planForm.addEventListener("submit", (event) => {
  event.preventDefault();
  buildPlan();
  document.querySelector(".results-panel").scrollIntoView({ behavior: "smooth", block: "start" });
});

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected || nextQuestion.disabled === false) return;

  const question = questions[currentQuestion];
  const isCorrect = Number(selected.value) === question.correct;
  correctAnswers += isCorrect ? 1 : 0;
  answeredQuestions += 1;
  answerFeedback.textContent = `${isCorrect ? "Correct." : "Review this."} ${question.explanation}`;
  answerFeedback.className = `answer-feedback ${isCorrect ? "correct" : "review"}`;
  nextQuestion.disabled = false;
  answerList.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
  buildPlan();
});

nextQuestion.addEventListener("click", () => {
  currentQuestion = (currentQuestion + 1) % questions.length;
  renderQuestion();
});

copyPlan.addEventListener("click", async () => {
  if (!lastPlanText) buildPlan();
  await navigator.clipboard.writeText(lastPlanText);
  copyPlan.textContent = "Copied";
  setTimeout(() => {
    copyPlan.textContent = "Copy plan";
  }, 1200);
});

downloadPlan.addEventListener("click", () => {
  if (!lastPlanText) buildPlan();
  const url = URL.createObjectURL(new Blob([lastPlanText], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "arboristprepai-study-plan.txt";
  link.click();
  URL.revokeObjectURL(url);
});

updateDateStatus();
renderQuestion();
buildPlan();
