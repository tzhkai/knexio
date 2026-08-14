/** Style note: Field Notes for Better Work — clear tasks, visible limits, no generic tool-directory copy. */
export type Guide = {
  slug: string;
  title: string;
  dek: string;
  category: "Research" | "Writing" | "Planning" | "Meetings";
  readingTime: string;
  level: "Starter" | "Everyday" | "Deep dive";
  updated: string;
  image?: string;
  imageAlt?: string;
  takeaway: string;
  prompt: string;
  steps: string[];
  sections: { title: string; body: string }[];
  checks: string[];
};

export const heroImage = "/manus-storage/workflow-library-hero_9395f16b.png";

export const guides: Guide[] = [
  {
    slug: "research-brief-from-scattered-sources",
    title: "Turn scattered sources into a one-page research brief",
    dek: "Use AI to create a starting structure without losing the sources and questions that make research trustworthy.",
    category: "Research", readingTime: "8 min read", level: "Everyday", updated: "August 2026",
    image: "/manus-storage/research-brief-workflow_69715abb.png", imageAlt: "Research materials arranged around a concise paper outline on a warm desk",
    takeaway: "Ask for a traceable brief, not a confident-sounding summary.",
    prompt: `You are helping me prepare a one-page research brief.\n\nGoal: [state the decision or question]\nAudience: [who will read it]\nSource notes: [paste labeled notes and links]\n\nFirst, group the notes by claim. Preserve the source label beside each claim. Then produce: (1) the question, (2) three evidence-backed findings, (3) open questions, and (4) a short recommendation only if the notes support one. Flag claims that lack a source, are dated, or need verification. Do not invent facts or citations.`,
    steps: ["Name the decision before collecting anything.", "Label each pasted note with its source and date.", "Ask AI to organize claims and expose gaps.", "Open original sources for decision-critical claims."],
    sections: [
      { title: "Why a brief beats a summary", body: "A summary compresses material. A useful brief helps someone make a next decision. It needs a concrete question, the evidence that matters, what is still unknown, and the confidence behind any recommendation." },
      { title: "Give the model source labels it can preserve", body: "Instead of pasting a wall of text, add short labels such as [Interview A, 12 Aug]. The output can keep claims tied to the source that supports them, making a later human check much faster." },
      { title: "Use the output as a review surface", body: "The useful moment is not when the first draft appears. It is when the draft lets you notice what is missing: an old number, a weak comparison, or a conclusion that reaches farther than the evidence." }
    ],
    checks: ["Can each factual claim be traced to a note or source link?", "Does the brief separate observations from a recommendation?", "Are dates and limitations visible where they matter?", "Would a reader know what to verify next?"]
  },
  {
    slug: "clear-project-update-prompt",
    title: "Draft a clear project update without sounding robotic",
    dek: "Transform raw progress notes into an update with context, decisions, risks, and one specific ask.",
    category: "Writing", readingTime: "6 min read", level: "Starter", updated: "August 2026",
    takeaway: "A useful update tells people what changed and what they need to do next.",
    prompt: `Turn the notes below into a concise project update for [audience].\n\nProject context: [one sentence]\nRaw notes: [paste notes]\nTone: calm, direct, and specific\n\nUse these headings only when needed: Progress, Decision, Risk, Next step. Keep each item concrete. Do not claim work is complete unless the notes say so. End with one clear request, owner, or date if available. Then list information I should confirm before sending.`,
    steps: ["Write one sentence of project context.", "Include decisions and risks, not just completed tasks.", "Specify the audience and tone.", "Check names, dates, commitments, and status words yourself."],
    sections: [
      { title: "Start with the reader’s question", body: "Most readers want to know whether the project is moving, whether anything changed, and whether they need to act. Shape the source notes around those questions before you use a prompt." },
      { title: "Keep status language honest", body: "Words such as “complete”, “on track”, and “blocked” carry meaning. If a note only says a draft exists, the output should not imply final approval. Ask the tool to surface missing information." },
      { title: "One clear ask prevents update fatigue", body: "If a decision is required, name the decision, the owner, and the date. If no action is required, say that instead. This distinction makes routine communication easier to scan and trust." }
    ],
    checks: ["Could a busy reader explain the status after one pass?", "Are commitments attributed to a real owner or date?", "Did the draft add certainty the notes did not contain?", "Is there only one primary ask?"]
  },
  {
    slug: "meeting-notes-to-action-list",
    title: "Turn meeting notes into an action list people can use",
    dek: "Move from a rough transcript to clear tasks without letting decisions, owners, or due dates disappear.",
    category: "Meetings", readingTime: "7 min read", level: "Everyday", updated: "August 2026",
    image: "/manus-storage/meeting-to-action-workflow_5633d357.png", imageAlt: "Loose meeting notes visually organized into clean action cards",
    takeaway: "A meeting action list is a record of commitments, not a cleaned-up transcript.",
    prompt: `Convert these meeting notes into an action list.\n\nNotes: [paste notes]\n\nCreate a table with: action, owner, due date, supporting context, and confidence. Keep a separate section for decisions and unresolved questions. If an owner or date is not stated, write “Unassigned” or “Not stated”; do not guess. End by listing the three details I should confirm with the group.`,
    steps: ["Capture enough context to distinguish an idea from a decision.", "Ask the model to preserve uncertainty instead of filling gaps.", "Review the output while the meeting is fresh.", "Store the confirmed list where the team tracks work."],
    sections: [
      { title: "Separate the four things meetings produce", body: "Good notes distinguish discussion, decisions, actions, and open questions. A conversation can contain all four in the same paragraph. AI can sort them, but a participant still needs to confirm that sorting." },
      { title: "Make ambiguity visible", body: "If someone said “we should look into it” but did not volunteer, the note should say it is unassigned. This protects the team from the fiction that every spoken idea became a commitment." },
      { title: "Close the loop quickly", body: "Send a compact draft while participants can correct it from memory. A one-line confirmation request is enough: “Please reply if an owner, decision, or due date is wrong.”" }
    ],
    checks: ["Does every action have an explicit owner or an “Unassigned” label?", "Are decisions separated from ideas merely discussed?", "Are dates copied exactly rather than inferred?", "Has the list been confirmed by participants?"]
  },
  {
    slug: "one-week-content-plan-from-questions",
    title: "Build a one-week content plan from real audience questions",
    dek: "Create a modest publishing plan by starting with questions people already ask instead of a pile of generic trends.",
    category: "Planning", readingTime: "8 min read", level: "Deep dive", updated: "August 2026",
    image: "/manus-storage/ai-content-plan-workflow_8d2ce05c.png", imageAlt: "A paper-based weekly planning layout with workflow notes on a warm desk",
    takeaway: "AI can help cluster questions; only your audience can tell you which ones matter.",
    prompt: `Help me make a one-week content plan from these real audience questions.\n\nAudience: [who they are]\nGoal: [the outcome the content should help with]\nQuestions and feedback: [paste source questions]\nCapacity: [number of pieces and available time]\n\nGroup the questions into themes. Propose a realistic weekly plan with one primary piece and supporting pieces. For each item, state the reader question, the promise the page can honestly make, the needed original input from us, and a suggested internal link. Do not suggest topics unrelated to the supplied questions.`,
    steps: ["Collect questions from places you can actually inspect.", "Choose the one outcome the week should help a reader achieve.", "Use AI to cluster language and reveal recurring frustrations.", "Add your own examples, evidence, and review before publishing."],
    sections: [
      { title: "Questions are stronger than trend lists", body: "A popular phrase can be a clue, but it is not a publishing strategy by itself. A real question carries context: who is stuck, what they are trying to do, and what a satisfying answer would change." },
      { title: "Match the plan to actual capacity", body: "One complete, sourced guide with two useful companions is more valuable than seven thin posts. Tell the model how much time and original material you have so its suggestions fit the work you can finish." },
      { title: "Make internal links part of the idea", body: "Each supporting piece should either prepare a reader for the primary guide or help them apply it. Write that connection before drafting; it is useful navigation for people, not just a mechanical SEO tactic." }
    ],
    checks: ["Is each proposed page connected to a real audience question?", "Do you have original examples or expertise to add?", "Is the scope realistic for the time available?", "Can readers move naturally from one piece to the next?"]
  },
  {
    slug: "brief-first-prompt-pattern",
    title: "Use the brief-first prompt pattern for better first drafts",
    dek: "A compact framework for stating the task, context, constraints, and output shape before you ask AI to write.",
    category: "Writing", readingTime: "5 min read", level: "Starter", updated: "August 2026",
    takeaway: "The quality of a draft rises when the task is specific enough to review.",
    prompt: `Task: [what you need]\nContext: [relevant background and audience]\nConstraints: [what to include, avoid, or verify]\nOutput: [format, length, and structure]\n\nBefore drafting, tell me what information is missing or ambiguous. Then create a first draft and label any assumptions you made.`,
    steps: ["State the task in one verb-led line.", "Add only context that changes the answer.", "Name constraints a reviewer would care about.", "Ask for assumptions to be labeled so you can inspect them."],
    sections: [
      { title: "A prompt is a working brief", body: "The useful part of prompting is not clever wording. It is the act of making a task reviewable. When you define reader, context, constraints, and useful output, you create a draft a person can assess with confidence." },
      { title: "Constraints protect the result", body: "Constraints keep the model from doing work you never asked for. Examples include “do not invent citations,” “use only supplied notes,” or “leave facts uncertain if they are missing.” Put the important ones near the task." }
    ],
    checks: ["Can someone else understand the task from the prompt alone?", "Does the output format match how you will use it?", "Are important constraints explicit?", "Were assumptions identified and reviewed?"]
  },
  {
    slug: "thirty-minute-project-starting-plan",
    title: "Break a messy project into a 30-minute starting plan",
    dek: "Use AI as a planning partner to identify the smallest credible first move, rather than a giant plan you will not use.",
    category: "Planning", readingTime: "6 min read", level: "Everyday", updated: "August 2026",
    takeaway: "A start plan works when it reduces uncertainty, not when it looks comprehensive.",
    prompt: `Help me make a 30-minute starting plan for this project.\n\nOutcome I want: [outcome]\nWhat I know: [facts]\nConstraints: [time, people, tools, risks]\nWhat feels unclear: [uncertainties]\n\nGive me: a five-minute setup, one focused first task, a checkpoint question, and a stop condition. List risks or decisions that need a human owner. Do not create tasks that depend on facts I have not supplied.`,
    steps: ["Describe the outcome, not just the subject.", "Write down what is unclear.", "Ask for a stop condition.", "Assign risky decisions to a human owner."],
    sections: [
      { title: "Plans should earn their length", body: "When a project feels messy, detailed planning can feel like progress. A better first move is small enough to execute today, with a question that tells you whether the next step is worth taking." },
      { title: "Give uncertainty a place to go", body: "A model can suggest routes, but it cannot decide which trade-offs your team should accept. Asking it to list assumptions, risks, and owner decisions keeps useful structure while showing where judgment belongs." }
    ],
    checks: ["Can the first task be started in the time available?", "Is there a clear question that determines the next step?", "Are decisions and risks assigned to a human owner?", "Does the plan avoid pretending unknown facts are settled?"]
  }
];

export const categories = ["All", "Research", "Writing", "Planning", "Meetings"] as const;
export const getGuide = (slug: string | undefined) => guides.find((guide) => guide.slug === slug);
