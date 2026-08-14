/** Style note: Field Notes for Better Work — clear tasks, visible limits, no generic tool-directory copy. */
export type Guide = {
  slug: string;
  title: string;
  dek: string;
  category: "Research" | "Writing" | "Planning" | "Meetings";
  readingTime: string;
  level: "Starter" | "Everyday" | "Deep dive";
  updated: string;
  publishedAt: string;
  updatedAt: string;
  topics: string[];
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
    category: "Research", readingTime: "8 min read", level: "Everyday", updated: "14 Aug 2026", publishedAt: "2026-08-14T09:00:00+08:00", updatedAt: "2026-08-14T09:00:00+08:00", topics: ["research brief", "AI research workflow", "source checking", "research prompt"],
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
    category: "Writing", readingTime: "6 min read", level: "Starter", updated: "14 Aug 2026", publishedAt: "2026-08-14T09:10:00+08:00", updatedAt: "2026-08-14T09:10:00+08:00", topics: ["project update", "AI writing workflow", "status update prompt", "clear communication"],
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
    category: "Meetings", readingTime: "7 min read", level: "Everyday", updated: "14 Aug 2026", publishedAt: "2026-08-14T09:20:00+08:00", updatedAt: "2026-08-14T09:20:00+08:00", topics: ["meeting notes", "action items", "AI meeting workflow", "meeting summary prompt"],
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
    category: "Planning", readingTime: "8 min read", level: "Deep dive", updated: "14 Aug 2026", publishedAt: "2026-08-14T09:30:00+08:00", updatedAt: "2026-08-14T09:30:00+08:00", topics: ["content plan", "audience questions", "AI content planning", "content workflow"],
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
    category: "Writing", readingTime: "5 min read", level: "Starter", updated: "14 Aug 2026", publishedAt: "2026-08-14T09:40:00+08:00", updatedAt: "2026-08-14T09:40:00+08:00", topics: ["ChatGPT prompts for work", "prompt framework", "AI first draft", "brief-first prompt"],
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
    category: "Planning", readingTime: "6 min read", level: "Everyday", updated: "14 Aug 2026", publishedAt: "2026-08-14T09:50:00+08:00", updatedAt: "2026-08-14T09:50:00+08:00", topics: ["project planning", "AI planning workflow", "next steps", "project start"],
    takeaway: "A start plan works when it reduces uncertainty, not when it looks comprehensive.",
    prompt: `Help me make a 30-minute starting plan for this project.\n\nOutcome I want: [outcome]\nWhat I know: [facts]\nConstraints: [time, people, tools, risks]\nWhat feels unclear: [uncertainties]\n\nGive me: a five-minute setup, one focused first task, a checkpoint question, and a stop condition. List risks or decisions that need a human owner. Do not create tasks that depend on facts I have not supplied.`,
    steps: ["Describe the outcome, not just the subject.", "Write down what is unclear.", "Ask for a stop condition.", "Assign risky decisions to a human owner."],
    sections: [
      { title: "Plans should earn their length", body: "When a project feels messy, detailed planning can feel like progress. A better first move is small enough to execute today, with a question that tells you whether the next step is worth taking." },
      { title: "Give uncertainty a place to go", body: "A model can suggest routes, but it cannot decide which trade-offs your team should accept. Asking it to list assumptions, risks, and owner decisions keeps useful structure while showing where judgment belongs." }
    ],
    checks: ["Can the first task be started in the time available?", "Is there a clear question that determines the next step?", "Are decisions and risks assigned to a human owner?", "Does the plan avoid pretending unknown facts are settled?"]
  },
  {
    slug: "meeting-follow-up-email",
    title: "Write a meeting follow-up email without inventing commitments",
    dek: "Turn confirmed notes into a short follow-up that distinguishes decisions, action owners, and details the group still needs to verify.",
    category: "Meetings", readingTime: "6 min read", level: "Starter", updated: "14 Aug 2026", publishedAt: "2026-08-14T10:00:00+08:00", updatedAt: "2026-08-14T10:00:00+08:00", topics: ["meeting follow-up email", "meeting notes prompt", "action items", "AI meeting workflow"],
    takeaway: "A follow-up email should confirm a shared record, not manufacture agreement.",
    prompt: `Draft a short meeting follow-up email from these notes.\n\nAudience: [people who attended]\nConfirmed decisions: [list]\nActions with stated owners and dates: [list]\nOpen questions or details to confirm: [list]\n\nUse these sections only when they are needed: Decisions, Actions, To confirm. Keep every owner and date exactly as supplied. If a task lacks an owner or due date, label it clearly instead of guessing. End with one sentence inviting corrections to the record.`,
    steps: ["Separate confirmed decisions from ideas that were only discussed.", "Copy names and dates exactly as the group stated them.", "Put missing owners or dates in a visible confirmation section.", "Send the draft while participants can still correct the record."],
    sections: [
      { title: "Treat the email as a shared record", body: "A useful follow-up helps everyone compare their memory with the same small set of facts. It should make the next action easier, not add a polished version of the conversation that hides uncertainty." },
      { title: "Do not convert silence into agreement", body: "A transcript can sound conclusive even when the group did not make a decision. Keep unresolved questions separate, and use a direct request for confirmation rather than assigning meaning to an ambiguous remark." },
      { title: "Make corrections easy to give", body: "The best follow-up creates a low-effort way to say a name, date, owner, or decision is wrong. That is how the note becomes reliable enough to use after the meeting fades." }
    ],
    checks: ["Are decisions limited to points the group actually confirmed?", "Does every action keep its stated owner and date—or clearly say what is missing?", "Can a recipient correct the record without rewriting the email?", "Did the draft avoid treating a suggestion as a commitment?"]
  },
  {
    slug: "decision-log-from-project-notes",
    title: "Create a decision log from project notes without hiding the trade-offs",
    dek: "Use AI to turn scattered project notes into an inspectable decision record with options, evidence, owners, and unresolved questions.",
    category: "Research", readingTime: "7 min read", level: "Everyday", updated: "14 Aug 2026", publishedAt: "2026-08-14T10:10:00+08:00", updatedAt: "2026-08-14T10:10:00+08:00", topics: ["decision log template", "project decision record", "AI research workflow", "decision prompt"],
    takeaway: "A decision log is useful when it preserves what was chosen and what still needs proof.",
    prompt: `Create a decision log from these project notes.\n\nDecision question: [state it]\nNotes and source labels: [paste notes]\nKnown constraints: [time, budget, policy, or technical limits]\n\nReturn: (1) decision question, (2) options mentioned, (3) evidence or source labels for each option, (4) confirmed decision if one exists, (5) owner and date if stated, and (6) unresolved questions. Do not claim a decision has been made unless the notes explicitly say so. Flag assumptions and missing evidence.`,
    steps: ["Name one decision question rather than a broad project subject.", "Keep source labels beside claims and option descriptions.", "Ask the model to separate confirmed choices from proposals.", "Have the actual decision owner confirm the final record."],
    sections: [
      { title: "A project note is not automatically a decision", body: "Projects collect partial conclusions, proposals, and constraints in the same place. A decision log is useful because it asks which of those points was actually chosen, who owns it, and what evidence supports it." },
      { title: "Keep trade-offs beside the choice", body: "A record that only states the final option can be impossible to revisit later. Preserve alternatives and constraints so a future reader can understand why a choice made sense at the time." },
      { title: "Let the owner close the record", body: "AI can create a clearer draft, but it cannot confirm authority. The person accountable for the decision should review the wording, evidence, and status before the entry is treated as final." }
    ],
    checks: ["Is the decision question specific enough to answer?", "Are options and evidence tied to the notes that support them?", "Does the record distinguish a confirmed choice from a proposal?", "Has the appropriate owner reviewed the final wording?"]
  },
  {
    slug: "weekly-priorities-from-project-list",
    title: "Plan weekly priorities from a crowded project list",
    dek: "Use AI to sort a long project list into a modest weekly focus while keeping dependencies, risks, and human trade-offs visible.",
    category: "Planning", readingTime: "7 min read", level: "Everyday", updated: "14 Aug 2026", publishedAt: "2026-08-14T10:20:00+08:00", updatedAt: "2026-08-14T10:20:00+08:00", topics: ["weekly priorities", "project planning", "AI task prioritization", "weekly planning prompt"],
    takeaway: "A weekly plan is credible when it names what will not fit as clearly as what will.",
    prompt: `Help me choose a realistic weekly priority plan from this project list.\n\nOutcome for the week: [state it]\nAvailable time and people: [constraints]\nTasks with known deadlines or dependencies: [paste list]\nRisks or decisions that need an owner: [paste list]\n\nGroup tasks into: must move this week, useful if capacity remains, blocked or dependent, and not for this week. For each proposed priority, explain the dependency or reason using only supplied information. Do not estimate effort or promise dates that are not in the notes. End with questions a human owner must answer.`,
    steps: ["Define one outcome that makes the week meaningful.", "List hard deadlines and dependencies separately from preferences.", "Let the model group work without pretending it can choose trade-offs for you.", "Confirm the final priorities with the person who owns the trade-off."],
    sections: [
      { title: "Priorities need a limit", body: "A crowded list becomes useful only when someone decides what will not be attempted. Asking the model to label work as blocked, optional, or out of scope makes the limit visible instead of turning every task into a vague priority." },
      { title: "Dependencies change the sequence", body: "A task may sound urgent but still depend on a decision, source, or person. Put those dependencies in the input so the first draft can surface why an apparently simple sequence may not be credible." },
      { title: "Keep trade-offs with the owner", body: "AI can help compare options and state constraints, but it cannot decide which relationship, risk, or opportunity matters most this week. Use the output to prepare that conversation, not to avoid it." }
    ],
    checks: ["Does the plan name one outcome rather than a long list of activities?", "Are blocked tasks and missing dependencies visible?", "Did the draft avoid creating new dates or effort estimates?", "Has the person who owns the trade-off confirmed the final focus?"]
  }
];

export const categories = ["All", "Research", "Writing", "Planning", "Meetings"] as const;
export const getGuide = (slug: string | undefined) => guides.find((guide) => guide.slug === slug);

export const topicClusters = [
  { slug: "research-and-decisions", number: "01", shortTitle: "Research & decisions", title: "Research notes that lead to a clear next decision.", seoTitle: "AI research workflow and decision log templates", description: "Practical AI workflows for research briefs, evidence checks, and decision records that keep source labels and unresolved questions visible.", useWhen: "You have notes, source links, or project context, but need to separate evidence, assumptions, and a decision that still needs an owner.", introTitle: "Keep the trail back to what supports the claim.", intro: "This collection is for work where a tidy summary is not enough. Use it to make the question, evidence, options, and missing information easier for a person to inspect.", guideSlugs: ["research-brief-from-scattered-sources", "decision-log-from-project-notes", "brief-first-prompt-pattern"] },
  { slug: "writing-and-updates", number: "02", shortTitle: "Writing & updates", title: "Work updates that say what changed, what matters, and what happens next.", seoTitle: "AI prompts for project updates and clear work writing", description: "Practical AI writing workflows for project updates, first drafts, and follow-up messages that preserve context, ownership, and open questions.", useWhen: "You have raw notes and need a reader-ready draft without inflating progress, guessing dates, or hiding the one action that matters.", introTitle: "Write toward a reader’s next decision.", intro: "These guides help turn working notes into clear communication. They keep the difference between a draft, an agreement, a request, and a confirmed next step visible.", guideSlugs: ["clear-project-update-prompt", "brief-first-prompt-pattern", "meeting-follow-up-email"] },
  { slug: "meetings-and-follow-up", number: "03", shortTitle: "Meetings & follow-up", title: "Meeting records that become useful follow-up, not forgotten transcripts.", seoTitle: "AI meeting notes and follow-up email workflow", description: "AI workflows for turning meeting notes into confirmed action items, clear follow-up emails, and visible decisions without inventing commitments.", useWhen: "You have rough notes or a transcript and need to separate decisions, actions, owners, dates, and questions that still need confirmation.", introTitle: "A useful record makes ambiguity visible.", intro: "AI can help sort a long conversation. It should not turn an unassigned idea into a promised task or invent a due date that the group never agreed to.", guideSlugs: ["meeting-notes-to-action-list", "meeting-follow-up-email", "clear-project-update-prompt"] },
  { slug: "planning-and-priorities", number: "04", shortTitle: "Planning & priorities", title: "Plans small enough to start and clear enough to review.", seoTitle: "AI project planning and weekly priorities workflows", description: "Practical AI planning workflows for choosing weekly priorities, creating a credible first project step, and building content plans from real audience questions.", useWhen: "You have more possible tasks than useful attention, and need a modest plan that makes risks, assumptions, and the next decision easier to see.", introTitle: "Make the next move credible before making the plan bigger.", intro: "These workflows favor the smallest useful plan over a confident-looking backlog. They turn loose tasks into an inspectable starting point while reserving trade-offs for a human owner.", guideSlugs: ["weekly-priorities-from-project-list", "thirty-minute-project-starting-plan", "one-week-content-plan-from-questions"] }
] as const;
