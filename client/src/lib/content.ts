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

export const heroImage = "/images/workflow-library-hero.webp";

/** Public tools are listed once so navigation, SEO metadata, and sitemaps cannot drift apart. */
export const toolRoutes = [
  { slug: "ai-prompt-word-counter", path: "/tools/ai-prompt-word-counter/", title: "AI Prompt Word Counter — Count Words and Characters", description: "Count words, characters, and lines in an AI prompt locally in your browser before you send it." },
  { slug: "markdown-preview", path: "/tools/markdown-preview/", title: "Markdown Preview — Preview Notes and Prompts Locally", description: "Preview Markdown notes, prompts, and first drafts locally in your browser with a simple, safe writing surface." },
] as const;

export const guides: Guide[] = [
  {
    slug: "research-brief-from-scattered-sources",
    title: "Turn scattered sources into a one-page research brief",
    dek: "Use AI to create a starting structure without losing the sources and questions that make research trustworthy.",
    category: "Research", readingTime: "9 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-14T09:00:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["research brief", "AI research workflow", "source checking", "research prompt"],
    image: "/images/research-brief-workflow.webp", imageAlt: "Research materials arranged around a concise paper outline on a warm desk",
    takeaway: "Ask for a traceable brief, not a confident-sounding summary.",
    prompt: `You are helping me prepare a one-page research brief.\n\nGoal: [state the decision or question]\nAudience: [who will read it]\nSource notes: [paste labeled notes and links]\n\nFirst, group the notes by claim. Preserve the source label beside each claim. Then produce: (1) the question, (2) three evidence-backed findings, (3) open questions, and (4) a short recommendation only if the notes support one. Flag claims that lack a source, are dated, or need verification. Do not invent facts or citations.`,
    steps: ["Name the decision before collecting anything.", "Label each pasted note with its source and date.", "Ask AI to organize claims and expose gaps.", "Open original sources for decision-critical claims."],
    sections: [
      { title: "Why a brief beats a summary", body: "A summary compresses material. A useful brief helps someone make a next decision. It needs a concrete question, the evidence that matters, what is still unknown, and the confidence behind any recommendation." },
      { title: "Give the model source labels it can preserve", body: "Instead of pasting a wall of text, add short labels such as [Interview A, 12 Aug]. The output can keep claims tied to the source that supports them, making a later human check much faster." },
      { title: "Use the output as a review surface", body: "The useful moment is not when the first draft appears. It is when the draft lets you notice what is missing: an old number, a weak comparison, or a conclusion that reaches farther than the evidence." },
      { title: "A worked example: sizing a service decision", body: "Suppose the question is whether a support team should move to a new ticketing tool. Labels such as [Vendor demo, 09 Aug], [IT security review, 11 Aug], and [Support lead interview, 12 Aug] keep every claim traceable. The draft brief can then group cost, migration, and security claims separately, so the person deciding sees which parts rest on a live demo and which rest on a price sheet from May." },
      { title: "What to do when the brief looks confident", body: "Confidence in a brief is not the same as certainty in the sources. If the draft states a number without a label, ask for the label before treating it as fact. If two notes conflict, keep both visible instead of letting the model pick one. A brief that still has visible open questions is working correctly; a brief that reads smoothly may have hidden the seams." }
    ],
    checks: ["Can each factual claim be traced to a note or source link?", "Does the brief separate observations from a recommendation?", "Are dates and limitations visible where they matter?", "Would a reader know what to verify next?"]
  },
  {
    slug: "clear-project-update-prompt",
    title: "Draft a clear project update without sounding robotic",
    dek: "Transform raw progress notes into an update with context, decisions, risks, and one specific ask.",
    category: "Writing", readingTime: "7 min read", level: "Starter", updated: "19 Aug 2026", publishedAt: "2026-08-14T09:10:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["project update", "AI writing workflow", "status update prompt", "clear communication"],
    takeaway: "A useful update tells people what changed and what they need to do next.",
    prompt: `Turn the notes below into a concise project update for [audience].\n\nProject context: [one sentence]\nRaw notes: [paste notes]\nTone: calm, direct, and specific\n\nUse these headings only when needed: Progress, Decision, Risk, Next step. Keep each item concrete. Do not claim work is complete unless the notes say so. End with one clear request, owner, or date if available. Then list information I should confirm before sending.`,
    steps: ["Write one sentence of project context.", "Include decisions and risks, not just completed tasks.", "Specify the audience and tone.", "Check names, dates, commitments, and status words yourself."],
    sections: [
      { title: "Start with the reader’s question", body: "Most readers want to know whether the project is moving, whether anything changed, and whether they need to act. Shape the source notes around those questions before you use a prompt." },
      { title: "Keep status language honest", body: "Words such as “complete”, “on track”, and “blocked” carry meaning. If a note only says a draft exists, the output should not imply final approval. Ask the tool to surface missing information." },
      { title: "One clear ask prevents update fatigue", body: "If a decision is required, name the decision, the owner, and the date. If no action is required, say that instead. This distinction makes routine communication easier to scan and trust." },
      { title: "A worked example: a Friday ops update", body: "For a weekly support update, the raw notes might say “deploy failed, retried, still flaky, customer reports up”. The shaped version should say what changed, what is being monitored, and who owns the follow-up. Writing the reader question first — “is the platform stable this week?” — stops the draft from becoming a list of every ticket touched." },
      { title: "Keep the update inside the record", body: "Updates age quickly. When the draft includes a date, a build number, or a customer name, keep the source note beside it so a reader can check the record instead of trusting memory. If a status word like “almost done” appears, decide whether the notes actually support it or whether it should say “in review”. Precision here is what keeps a project update from becoming a story." }
    ],
    checks: ["Could a busy reader explain the status after one pass?", "Are commitments attributed to a real owner or date?", "Did the draft add certainty the notes did not contain?", "Is there only one primary ask?"]
  },
  {
    slug: "meeting-notes-to-action-list",
    title: "Turn meeting notes into an action list people can use",
    dek: "Move from a rough transcript to clear tasks without letting decisions, owners, or due dates disappear.",
    category: "Meetings", readingTime: "8 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-14T09:20:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["meeting notes", "action items", "AI meeting workflow", "meeting summary prompt"],
    image: "/images/meeting-to-action-workflow.webp", imageAlt: "Loose meeting notes visually organized into clean action cards",
    takeaway: "A meeting action list is a record of commitments, not a cleaned-up transcript.",
    prompt: `Convert these meeting notes into an action list.\n\nNotes: [paste notes]\n\nCreate a table with: action, owner, due date, supporting context, and confidence. Keep a separate section for decisions and unresolved questions. If an owner or date is not stated, write “Unassigned” or “Not stated”; do not guess. End by listing the three details I should confirm with the group.`,
    steps: ["Capture enough context to distinguish an idea from a decision.", "Ask the model to preserve uncertainty instead of filling gaps.", "Review the output while the meeting is fresh.", "Store the confirmed list where the team tracks work."],
    sections: [
      { title: "Separate the four things meetings produce", body: "Good notes distinguish discussion, decisions, actions, and open questions. A conversation can contain all four in the same paragraph. AI can sort them, but a participant still needs to confirm that sorting." },
      { title: "Make ambiguity visible", body: "If someone said “we should look into it” but did not volunteer, the note should say it is unassigned. This protects the team from the fiction that every spoken idea became a commitment." },
      { title: "Close the loop quickly", body: "Send a compact draft while participants can correct it from memory. A one-line confirmation request is enough: “Please reply if an owner, decision, or due date is wrong.”" },
      { title: "A worked example: a sprint review", body: "In a sprint review, someone says “the export job should be finished by Thursday” and a developer says “I can look at it”. Without a record, those are two different commitments. The action list should say what task, which owner, which date, and which discussion it came from. If Thursday was a hope rather than a plan, label the due date as unconfirmed so the team does not plan around it." },
      { title: "Protect against the tidy list", body: "A list where every row has an owner and a date can look complete and still be wrong. Check whether each row came from a stated commitment or from an inference the model made. The safest list keeps a short context column and marks anything inferred, so the team confirms the gaps rather than trusting the table." }
    ],
    checks: ["Does every action have an explicit owner or an “Unassigned” label?", "Are decisions separated from ideas merely discussed?", "Are dates copied exactly rather than inferred?", "Has the list been confirmed by participants?"]
  },
  {
    slug: "one-week-content-plan-from-questions",
    title: "Build a one-week content plan from real audience questions",
    dek: "Create a modest publishing plan by starting with questions people already ask instead of a pile of generic trends.",
    category: "Planning", readingTime: "9 min read", level: "Deep dive", updated: "19 Aug 2026", publishedAt: "2026-08-14T09:30:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["content plan", "audience questions", "AI content planning", "content workflow"],
    image: "/images/ai-content-plan-workflow.webp", imageAlt: "A paper-based weekly planning layout with workflow notes on a warm desk",
    takeaway: "AI can help cluster questions; only your audience can tell you which ones matter.",
    prompt: `Help me make a one-week content plan from these real audience questions.\n\nAudience: [who they are]\nGoal: [the outcome the content should help with]\nQuestions and feedback: [paste source questions]\nCapacity: [number of pieces and available time]\n\nGroup the questions into themes. Propose a realistic weekly plan with one primary piece and supporting pieces. For each item, state the reader question, the promise the page can honestly make, the needed original input from us, and a suggested internal link. Do not suggest topics unrelated to the supplied questions.`,
    steps: ["Collect questions from places you can actually inspect.", "Choose the one outcome the week should help a reader achieve.", "Use AI to cluster language and reveal recurring frustrations.", "Add your own examples, evidence, and review before publishing."],
    sections: [
      { title: "Questions are stronger than trend lists", body: "A popular phrase can be a clue, but it is not a publishing strategy by itself. A real question carries context: who is stuck, what they are trying to do, and what a satisfying answer would change." },
      { title: "Match the plan to actual capacity", body: "One complete, sourced guide with two useful companions is more valuable than seven thin posts. Tell the model how much time and original material you have so its suggestions fit the work you can finish." },
      { title: "Make internal links part of the idea", body: "Each supporting piece should either prepare a reader for the primary guide or help them apply it. Write that connection before drafting; it is useful navigation for people, not just a mechanical SEO tactic." },
      { title: "A worked example: a newsletter plan", body: "A small team running a weekly newsletter has a folder of reader replies. Clustering the actual questions — “how do I export?”, “does the free tier count?”, “what changed in the latest release?” — produces a more honest plan than a list of trending phrases. The week’s primary piece could answer the export question directly, with a supporting piece covering the free tier. Capacity of two pieces, not five, keeps the plan finishable." },
      { title: "Where to store the evidence", body: "The plan is only as honest as the questions behind it. Keep the source question, the channel, and the date beside each proposed piece. When the plan is reviewed next week, the team can check whether the questions changed rather than re-running the same topics on autopilot." }
    ],
    checks: ["Is each proposed page connected to a real audience question?", "Do you have original examples or expertise to add?", "Is the scope realistic for the time available?", "Can readers move naturally from one piece to the next?"]
  },
  {
    slug: "brief-first-prompt-pattern",
    title: "Use the brief-first prompt pattern for better first drafts",
    dek: "A compact framework for stating the task, context, constraints, and output shape before you ask AI to write.",
    category: "Writing", readingTime: "6 min read", level: "Starter", updated: "19 Aug 2026", publishedAt: "2026-08-14T09:40:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["ChatGPT prompts for work", "prompt framework", "AI first draft", "brief-first prompt"],
    takeaway: "The quality of a draft rises when the task is specific enough to review.",
    prompt: `Task: [what you need]\nContext: [relevant background and audience]\nConstraints: [what to include, avoid, or verify]\nOutput: [format, length, and structure]\n\nBefore drafting, tell me what information is missing or ambiguous. Then create a first draft and label any assumptions you made.`,
    steps: ["State the task in one verb-led line.", "Add only context that changes the answer.", "Name constraints a reviewer would care about.", "Ask for assumptions to be labeled so you can inspect them."],
    sections: [
      { title: "A prompt is a working brief", body: "The useful part of prompting is not clever wording. It is the act of making a task reviewable. When you define reader, context, constraints, and useful output, you create a draft a person can assess with confidence." },
      { title: "Constraints protect the result", body: "Constraints keep the model from doing work you never asked for. Examples include “do not invent citations,” “use only supplied notes,” or “leave facts uncertain if they are missing.” Put the important ones near the task." },
      { title: "A worked example: an internal memo", body: "For a one-page memo on whether to change a pricing page, the brief might be: task, “draft the first section and a recommendation”; context, “readers are product and finance, decision by Friday”; constraints, “use only the attached usage data, no new numbers”. The model now has enough to draft something reviewable instead of a generic essay." },
      { title: "Write the brief before you prompt", body: "The act of writing the brief is where most of the value appears. Naming the reader and the constraint forces the real questions to surface before any output exists. If you cannot write the brief in a few lines, the task itself probably needs clarifying first." }
    ],
    checks: ["Can someone else understand the task from the prompt alone?", "Does the output format match how you will use it?", "Are important constraints explicit?", "Were assumptions identified and reviewed?"]
  },
  {
    slug: "thirty-minute-project-starting-plan",
    title: "Break a messy project into a 30-minute starting plan",
    dek: "Use AI as a planning partner to identify the smallest credible first move, rather than a giant plan you will not use.",
    category: "Planning", readingTime: "7 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-14T09:50:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["project planning", "AI planning workflow", "next steps", "project start"],
    takeaway: "A start plan works when it reduces uncertainty, not when it looks comprehensive.",
    prompt: `Help me make a 30-minute starting plan for this project.\n\nOutcome I want: [outcome]\nWhat I know: [facts]\nConstraints: [time, people, tools, risks]\nWhat feels unclear: [uncertainties]\n\nGive me: a five-minute setup, one focused first task, a checkpoint question, and a stop condition. List risks or decisions that need a human owner. Do not create tasks that depend on facts I have not supplied.`,
    steps: ["Describe the outcome, not just the subject.", "Write down what is unclear.", "Ask for a stop condition.", "Assign risky decisions to a human owner."],
    sections: [
      { title: "Plans should earn their length", body: "When a project feels messy, detailed planning can feel like progress. A better first move is small enough to execute today, with a question that tells you whether the next step is worth taking." },
      { title: "Give uncertainty a place to go", body: "A model can suggest routes, but it cannot decide which trade-offs your team should accept. Asking it to list assumptions, risks, and owner decisions keeps useful structure while showing where judgment belongs." },
      { title: "A worked example: starting a docs project", body: "Suppose the project is “publish setup guides for three integrations”. The uncertainty is which integrations readers actually need. A 30-minute plan might be: five minutes to list the integrations and who asked for them, one focused task to check analytics or tickets for demand, a checkpoint question — “is integration A worth the effort?” — and a stop condition if the evidence is thin. That is a plan you can start today." },
      { title: "Beware the plan that plans forever", body: "When a project feels messy, it is tempting to ask for a detailed plan. If the output keeps adding phases, owners, and dependencies you have not confirmed, cut it back. A starting plan should reduce uncertainty, not create a document that pretends the unknown is settled." }
    ],
    checks: ["Can the first task be started in the time available?", "Is there a clear question that determines the next step?", "Are decisions and risks assigned to a human owner?", "Does the plan avoid pretending unknown facts are settled?"]
  },
  {
    slug: "meeting-follow-up-email",
    title: "Write a meeting follow-up email without inventing commitments",
    dek: "Turn confirmed notes into a short follow-up that distinguishes decisions, action owners, and details the group still needs to verify.",
    category: "Meetings", readingTime: "7 min read", level: "Starter", updated: "19 Aug 2026", publishedAt: "2026-08-14T10:00:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["meeting follow-up email", "meeting notes prompt", "action items", "AI meeting workflow"],
    takeaway: "A follow-up email should confirm a shared record, not manufacture agreement.",
    prompt: `Draft a short meeting follow-up email from these notes.\n\nAudience: [people who attended]\nConfirmed decisions: [list]\nActions with stated owners and dates: [list]\nOpen questions or details to confirm: [list]\n\nUse these sections only when they are needed: Decisions, Actions, To confirm. Keep every owner and date exactly as supplied. If a task lacks an owner or due date, label it clearly instead of guessing. End with one sentence inviting corrections to the record.`,
    steps: ["Separate confirmed decisions from ideas that were only discussed.", "Copy names and dates exactly as the group stated them.", "Put missing owners or dates in a visible confirmation section.", "Send the draft while participants can still correct the record."],
    sections: [
      { title: "Treat the email as a shared record", body: "A useful follow-up helps everyone compare their memory with the same small set of facts. It should make the next action easier, not add a polished version of the conversation that hides uncertainty." },
      { title: "Do not convert silence into agreement", body: "A transcript can sound conclusive even when the group did not make a decision. Keep unresolved questions separate, and use a direct request for confirmation rather than assigning meaning to an ambiguous remark." },
      { title: "Make corrections easy to give", body: "The best follow-up creates a low-effort way to say a name, date, owner, or decision is wrong. That is how the note becomes reliable enough to use after the meeting fades." },
      { title: "A worked example: a kickoff follow-up", body: "After a project kickoff, the notes may list a decision and one action with an owner, but leave the timeline unstated. The email should state the decision, list the action with its owner, and end with “please confirm the date you can share a draft” instead of guessing a deadline. The recipient can correct one line rather than rewrite the message." },
      { title: "Keep the record and the message aligned", body: "If the email and the meeting record disagree, the record loses trust. Copy the owners and dates exactly from the confirmed notes, and treat anything missing as a confirmation request. That keeps the follow-up a shared record instead of a second, different version of events." }
    ],
    checks: ["Are decisions limited to points the group actually confirmed?", "Does every action keep its stated owner and date—or clearly say what is missing?", "Can a recipient correct the record without rewriting the email?", "Did the draft avoid treating a suggestion as a commitment?"]
  },
  {
    slug: "decision-log-from-project-notes",
    title: "Create a decision log from project notes without hiding the trade-offs",
    dek: "Use AI to turn scattered project notes into an inspectable decision record with options, evidence, owners, and unresolved questions.",
    category: "Research", readingTime: "8 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-14T10:10:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["decision log template", "project decision record", "AI research workflow", "decision prompt"],
    takeaway: "A decision log is useful when it preserves what was chosen and what still needs proof.",
    prompt: `Create a decision log from these project notes.\n\nDecision question: [state it]\nNotes and source labels: [paste notes]\nKnown constraints: [time, budget, policy, or technical limits]\n\nReturn: (1) decision question, (2) options mentioned, (3) evidence or source labels for each option, (4) confirmed decision if one exists, (5) owner and date if stated, and (6) unresolved questions. Do not claim a decision has been made unless the notes explicitly say so. Flag assumptions and missing evidence.`,
    steps: ["Name one decision question rather than a broad project subject.", "Keep source labels beside claims and option descriptions.", "Ask the model to separate confirmed choices from proposals.", "Have the actual decision owner confirm the final record."],
    sections: [
      { title: "A project note is not automatically a decision", body: "Projects collect partial conclusions, proposals, and constraints in the same place. A decision log is useful because it asks which of those points was actually chosen, who owns it, and what evidence supports it." },
      { title: "Keep trade-offs beside the choice", body: "A record that only states the final option can be impossible to revisit later. Preserve alternatives and constraints so a future reader can understand why a choice made sense at the time." },
      { title: "Let the owner close the record", body: "AI can create a clearer draft, but it cannot confirm authority. The person accountable for the decision should review the wording, evidence, and status before the entry is treated as final." },
      { title: "A worked example: choosing a vendor", body: "A team choosing between two email platforms has notes from demos, a security review, and a price sheet. The log should record the decision question — “which platform do we standardize on?” — the options mentioned, the evidence labels for each, and the confirmed choice only if the group actually decided. Keeping the rejected option’s trade-offs in the log is what lets the decision be revisited honestly next quarter." },
      { title: "Entries are for the future reader", body: "The person who will use the log is usually someone who was not in the room. Include the constraint that mattered — budget, policy, deadline — and the owner who confirmed it. A log that only records the chosen option is a summary; a log that records why and who is a usable record." }
    ],
    checks: ["Is the decision question specific enough to answer?", "Are options and evidence tied to the notes that support them?", "Does the record distinguish a confirmed choice from a proposal?", "Has the appropriate owner reviewed the final wording?"]
  },
  {
    slug: "weekly-priorities-from-project-list",
    title: "Plan weekly priorities from a crowded project list",
    dek: "Use AI to sort a long project list into a modest weekly focus while keeping dependencies, risks, and human trade-offs visible.",
    category: "Planning", readingTime: "8 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-14T10:20:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["weekly priorities", "project planning", "AI task prioritization", "weekly planning prompt"],
    takeaway: "A weekly plan is credible when it names what will not fit as clearly as what will.",
    prompt: `Help me choose a realistic weekly priority plan from this project list.\n\nOutcome for the week: [state it]\nAvailable time and people: [constraints]\nTasks with known deadlines or dependencies: [paste list]\nRisks or decisions that need an owner: [paste list]\n\nGroup tasks into: must move this week, useful if capacity remains, blocked or dependent, and not for this week. For each proposed priority, explain the dependency or reason using only supplied information. Do not estimate effort or promise dates that are not in the notes. End with questions a human owner must answer.`,
    steps: ["Define one outcome that makes the week meaningful.", "List hard deadlines and dependencies separately from preferences.", "Let the model group work without pretending it can choose trade-offs for you.", "Confirm the final priorities with the person who owns the trade-off."],
    sections: [
      { title: "Priorities need a limit", body: "A crowded list becomes useful only when someone decides what will not be attempted. Asking the model to label work as blocked, optional, or out of scope makes the limit visible instead of turning every task into a vague priority." },
      { title: "Dependencies change the sequence", body: "A task may sound urgent but still depend on a decision, source, or person. Put those dependencies in the input so the first draft can surface why an apparently simple sequence may not be credible." },
      { title: "Keep trade-offs with the owner", body: "AI can help compare options and state constraints, but it cannot decide which relationship, risk, or opportunity matters most this week. Use the output to prepare that conversation, not to avoid it." },
      { title: "A worked example: a support engineer's week", body: "A list with a vendor incident, a long-open ticket, a documentation task, and two review requests is crowded. Grouping by “must move”, “if capacity remains”, and “blocked” shows that the incident and the review requests depend on other people. The weekly plan then names one outcome — keep the incident moving — instead of claiming all four are priorities." },
      { title: "Treat “blocked” as information, not failure", body: "A blocked task with a named dependency is more useful than a vague “pending”. When the list marks what is waiting on whom, the weekly plan can surface the real question: do we wait, escalate, or drop it? That is a human decision, not something a model should decide for you." }
    ],
    checks: ["Does the plan name one outcome rather than a long list of activities?", "Are blocked tasks and missing dependencies visible?", "Did the draft avoid creating new dates or effort estimates?", "Has the person who owns the trade-off confirmed the final focus?"]
  },
  {
    slug: "meeting-agenda-from-notes",
    title: "Create a meeting agenda from last week’s decisions and open questions",
    dek: "Use AI to prepare a focused agenda from a confirmed record, without reviving settled items or hiding the decisions that need an owner.",
    category: "Meetings", readingTime: "8 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-15T09:00:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["AI meeting agenda prompt", "meeting agenda from notes", "meeting preparation", "AI meeting workflow"],
    takeaway: "A useful agenda makes the next decision easier, rather than replaying the last conversation.",
    prompt: `Prepare a working agenda for the next [meeting name] from the confirmed record below.\n\nLast meeting: [date and participants]\nConfirmed decisions: [list]\nOpen questions: [list]\nActions and stated owners: [list]\nNew context since the meeting: [notes]\n\nReturn: (1) meeting purpose, (2) the 3–5 items that need discussion or decision, (3) what participants should review beforehand, (4) the owner or input needed for each item, and (5) items that do not belong on this agenda. Do not reopen a confirmed decision unless the new context explicitly requires it. Do not assign an owner, date, or outcome that is not stated.`,
    steps: ["Start from a confirmed meeting record rather than a raw transcript.", "Separate decisions that are settled from questions that still need work.", "Name the person or input needed for each agenda item when that information is known.", "Have the meeting owner confirm the agenda before sending it."],
    sections: [
      { title: "An agenda is a decision surface", body: "A long list of topics tells people where to look. A strong agenda tells them what needs to move. Give each item a purpose: decide, unblock, align, or prepare. The distinction makes it easier to protect the meeting from status updates that can happen asynchronously." },
      { title: "Carry forward uncertainty, not every sentence", body: "Meeting notes often contain details that are useful only as context. Keep the question, dependency, or missing input that prevents progress, then link back to the record if more background is needed. That gives participants enough to prepare without turning the agenda into a transcript." },
      { title: "Do not turn preparation into a new commitment", body: "AI can suggest a neat sequence, but it cannot know who has authority or capacity. If an owner, deadline, or decision status is not in the record, leave it visibly unresolved for the meeting owner to confirm." },
      { title: "A worked example: a monthly planning meeting", body: "From last month’s record, the agenda might have three items: confirm the Q3 scope, decide who owns the onboarding checklist, and review the blocked hiring request. Each gets a purpose — decide, unblock, align — and a note about what to read beforehand. Items that were settled, like the approved budget, are left off so the meeting protects its time." },
      { title: "Protect preparation time", body: "If the agenda requires reading a full transcript to prepare, it has not done its job. Keep the link to the record for detail, but make the pre-reading short and specific. An agenda that can be reviewed in ten minutes is more likely to be read than one that reopens everything." }
    ],
    checks: ["Does every agenda item have a reason to exist now?", "Are settled decisions excluded unless new evidence requires review?", "Are missing owners or inputs visible rather than guessed?", "Could a participant prepare from the agenda without reading a full transcript?"]
  },
  {
    slug: "customer-feedback-theme-map",
    title: "Turn customer feedback into a theme map without losing the original voices",
    dek: "Organize interviews, support notes, and survey comments into reviewable themes while keeping source labels, counter-examples, and unanswered questions visible.",
    category: "Research", readingTime: "10 min read", level: "Deep dive", updated: "19 Aug 2026", publishedAt: "2026-08-15T09:10:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["AI customer feedback analysis", "customer feedback analysis template", "voice of customer", "feedback theme map"],
    takeaway: "A feedback theme is a hypothesis to inspect, not a fact created by a tidy chart.",
    prompt: `Help me create a reviewable theme map from customer feedback.\n\nResearch question: [what we are trying to learn]\nFeedback records: [paste records with source labels, dates, and customer segment if known]\nKnown limits: [sample size, source bias, missing groups]\n\nFirst, preserve each source label. Then return: (1) a small set of possible themes, (2) the records that support each theme, (3) counter-examples or disagreements, (4) wording that is directly quoted versus paraphrased, (5) what cannot be concluded from this sample, and (6) questions to verify next. Do not invent sentiment scores, counts, personas, or customer quotes.`,
    steps: ["State the decision or research question before clustering comments.", "Label every record with a source, date, and segment when available.", "Ask for counter-examples and gaps alongside each proposed theme.", "Review the original records before presenting a theme as a finding."],
    sections: [
      { title: "Themes need a trail back to the record", body: "A useful theme map lets a reader move from a concise label back to the comments that support it. Keep source labels and a short evidence trail near the theme so a later decision does not depend on a persuasive but untraceable summary." },
      { title: "Absence is not agreement", body: "A small sample cannot prove that people who did not respond agree. Notes from one channel can also over-represent a particular moment or customer type. Make those boundaries visible before comparing the loudest comments with the largest opportunity." },
      { title: "Look for the counter-example before naming the pattern", body: "The fastest way to weaken an attractive theme is to ask what does not fit it. A different segment, a contrary comment, or an unclear source may change whether the next step is research, a product decision, or simply a better question." },
      { title: "A worked example: nine support interviews", body: "Nine interviews mention “the search is slow” in different words. A theme map that labels each comment with its source and date can show that six complaints come from one heavy-usage segment, while three come from new users. That changes the next step from “make search faster for everyone” to a specific question about that segment’s queries." },
      { title: "Keep the sample visible", body: "A theme map built from nine interviews is not a market verdict. Show the sample size, the channels, and the missing groups in the map itself. When a theme looks strong, the counter-examples and the boundaries of the sample are what keep a decision honest instead of convenient." }
    ],
    checks: ["Can each theme be traced to labeled feedback records?", "Are direct quotations distinguished from paraphrases?", "Did the output avoid invented counts, sentiment scores, or personas?", "Are counter-examples and sampling limits visible to the decision owner?"]
  },
  {
    slug: "project-handoff-brief",
    title: "Write a project handoff brief that preserves decisions, risks, and next steps",
    dek: "Use AI to organize a project transition record that tells the next owner what is true, what is uncertain, and where the original evidence lives.",
    category: "Planning", readingTime: "9 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-15T09:20:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["project handoff template", "AI project handoff", "project documentation", "handoff checklist"],
    takeaway: "A handoff works when the next owner can find the decision, the risk, and the source behind each claim.",
    prompt: `Create a project handoff brief from the records below.\n\nProject purpose: [one sentence]\nCurrent status: [confirmed facts]\nKey decisions and sources: [paste notes or links]\nOpen risks, dependencies, and assumptions: [list]\nAccess, tools, or stakeholders: [only what is safe to share]\nNext known milestone: [if stated]\n\nReturn: (1) current objective, (2) confirmed status, (3) key decisions with source links or labels, (4) active work and stated owners, (5) risks and dependencies, (6) unanswered questions, and (7) a first-week checklist for the next owner. Label missing information. Do not fabricate access permissions, timelines, approvals, or completion status.`,
    steps: ["Collect the project record before you ask for a summary.", "Separate confirmed status from assumptions and informal updates.", "Include links or source labels for decisions the next owner may need to revisit.", "Review access, stakeholder names, and sensitive information before sharing the brief."],
    sections: [
      { title: "A transition is a record, not a confidence exercise", body: "A polished handoff can be less useful than an honest one if it hides missing approvals, unresolved risks, or incomplete access. Let the next owner see what is known, who said it, and what must be checked before work continues." },
      { title: "Keep decisions with their evidence", body: "A future reader may need to understand why a choice was made. Preserve the decision, its stated constraints, and the note or link that supports it. That is more helpful than rewriting the rationale as a certainty after the fact." },
      { title: "Treat access as a security boundary", body: "Do not paste credentials, private keys, personal information, or restricted records into a prompt. A handoff can point to the approved location or the responsible person without turning a useful document into an unsafe inventory." },
      { title: "A worked example: handing off a feature", body: "When a feature moves to a new owner, the brief should answer three questions from the record: what is the current confirmed status, which decisions were made and who approved them, and what risks are still open. If the record says the API contract is agreed but the migration is untested, the brief should say exactly that. The next owner can then plan a first week around verification instead of rediscovery." },
      { title: "Check the boundary of the brief", body: "A handoff that lists every conversation becomes a dump, not a brief. Keep the decision, the risk, and the next step per topic, and point to the record for detail. If a claim would change the first week of work, it belongs in the brief; otherwise it can stay behind the link." }
    ],
    checks: ["Can the next owner distinguish confirmed status from assumptions?", "Does each important decision point back to a source or record?", "Are risks, dependencies, and missing access details explicit?", "Has sensitive information been removed or replaced with an approved reference?"]
  },
  {
    slug: "project-notes-to-decision-memo",
    title: "Turn project notes into a decision memo without hiding what is unknown",
    dek: "Use AI to shape scattered project notes into a one-page decision memo that keeps evidence, options, recommendations, and unresolved questions separate.",
    category: "Research", readingTime: "10 min read", level: "Deep dive", updated: "19 Aug 2026", publishedAt: "2026-08-16T10:00:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["decision memo template", "project decision memo", "AI decision support", "decision making prompt"],
    takeaway: "A decision memo earns trust when a reader can tell what is established, what is recommended, and what still needs an owner’s judgment.",
    prompt: `Help me turn these project notes into a one-page decision memo.

Decision to make: [state one decision question]
Decision owner and audience: [who will decide and who will read]
Source notes: [paste notes with source labels and dates]
Known constraints: [time, budget, policy, technical, or relationship limits]

First, separate the notes into evidence, assumptions, options, and unresolved questions. Then draft a memo with: (1) decision question, (2) relevant context, (3) evidence with source labels, (4) options and trade-offs, (5) recommendation only where the evidence supports it, (6) risks and unanswered questions, and (7) the next confirmation needed from the decision owner. Do not invent facts, source links, costs, approvals, owners, or dates. Label any inference as an inference.`,
    steps: ["Name one decision that an accountable person can actually make.", "Paste notes with their source labels and dates, rather than a polished summary.", "Ask AI to separate what is known from assumptions before it recommends anything.", "Have the decision owner verify the evidence, trade-offs, and next step before sending."],
    sections: [
      { title: "Begin with the decision, not the document", body: "A memo becomes vague when it starts with a broad project recap. Write the exact choice the reader needs to make first. That gives every later section a test: does this fact, option, or question help the owner decide? If it does not, move it to an appendix or leave it out." },
      { title: "Give each claim a trail back to the note", body: "Use short labels such as [Budget call, 12 Aug] or [Customer interview 04]. The model can then retain a trace beside important claims instead of converting several notes into a confident paragraph with no visible origin. This makes the memo much faster for a decision owner to verify." },
      { title: "Keep options and recommendations separate", body: "An option describes a possible path and its stated trade-offs. A recommendation states which path appears best and why. The difference matters when the notes are incomplete: AI can organize options, but it should not turn a partial preference into an approved recommendation." },
      { title: "End with the question that unlocks the next move", body: "A useful memo does not pretend every uncertainty is solved. Close with the smallest confirmation, evidence check, or owner decision that would allow work to move. A visible unresolved question is more useful than a made-up deadline or approval." },
      { title: "A worked example: build or buy", body: "A product team deciding whether to build or buy a reporting component has notes from a spike, a vendor trial, and a finance conversation. The memo keeps the decision question at the top, groups the spike evidence under “options”, and leaves the recommendation conditional: “buy if the trial data confirms the query limit”. The owner can then act on one check instead of re-reading the notes." },
      { title: "Keep the memo a decision aid, not a record", body: "The memo exists to make one decision easier. Every paragraph should survive the test “does this help the owner decide?”. Facts that only provide background belong in an appendix or the source notes. If the evidence is thin, say so and name the check that would settle it rather than forcing a confident recommendation." }
    ],
    checks: ["Can the reader identify one decision owner and one decision question?", "Does every material claim retain a source label, date, or clear “needs verification” marker?", "Are options described separately from any recommendation?", "Did the draft avoid inventing a cost, date, approval, owner, or source?", "Is the next confirmation specific enough for the decision owner to act on?"]
    },
  {
    slug: "turn-rough-notes-into-decision-email",
    title: "Turn rough notes into a decision-ready email",
    dek: "Use AI to organize a messy update into context, options, a clear request, and the details a recipient still needs to confirm.",
    category: "Writing", readingTime: "8 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-16T11:20:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["AI email prompt", "decision-ready email", "project communication", "email writing workflow"],
    takeaway: "A decision-ready email makes the requested response easier without pretending that a draft is already agreement.",
    prompt: `Turn these rough notes into a decision-ready email.

Recipient and role: [who will read it]
Context: [why this matters now]
Notes: [paste labeled notes]
Decision or response needed: [what the recipient may need to decide]
Tone: [direct, warm, concise, or other]

Use this structure only if the information supports it: context, what changed, options or recommendation, request, and details to confirm. Preserve names, dates, costs, and commitments exactly as supplied. If the notes do not support a recommendation, present the options and write “recommendation not established.” End with one specific response requested from the recipient. List any missing information before the email body.`,
    steps: ["Name the recipient’s decision or response before drafting.", "Separate confirmed facts from suggestions in the notes.", "Ask AI to expose missing details before it writes the email.", "Check every name, date, amount, and commitment against the source notes before sending."],
    sections: [
      { title: "Start with the response you need", body: "Many work emails become long because the writer begins with a full history. Start by naming what the recipient needs to decide, approve, answer, or simply know. That gives the draft a useful boundary and helps the reader scan for the next move." },
      { title: "Keep options distinct from a recommendation", body: "A list of possible paths is not the same as a recommendation. Ask the model to keep those sections separate, especially when the notes contain preferences but no confirmed decision. This prevents a polished email from making an informal suggestion sound approved." },
      { title: "Use a confirmation line as a safety rail", body: "When a detail is missing, a visible confirmation request is more useful than a plausible guess. Keep questions concrete: which date, which owner, which amount, or which option should be recorded? A short verification line protects the accuracy of the entire message." },
      { title: "A worked example: a budget question", body: "Rough notes about a tool upgrade might say “costs are fine, need approval”. The email should ask the specific question — “can you approve the annual license?” — state the amount only if the notes state it, and put the missing renewal date in a “to confirm” line. That turns an ambiguous note into a decision the recipient can answer in one reply." },
      { title: "Trim the history to the decision", body: "Recipients rarely need the full timeline. Keep the context to one or two sentences that change the answer, then move to the request. If the notes contain a long investigation, keep it out of the email and offer the record as a link. A shorter message is more likely to get the decision you need." }
    ],
    checks: ["Can the recipient tell what response is needed within the first few lines?", "Are facts, options, recommendations, and open questions separated?", "Did the draft preserve supplied names, dates, amounts, and commitments exactly?", "Are missing details visible before the email is sent?", "Does the email end with one specific next response?"]
  },
  {
    slug: "weekly-review-from-completed-and-blocked-work",
    title: "Create a weekly review from completed and blocked work",
    dek: "Turn a task list into a short review that shows progress, blockers, carryover work, and the next priority without inflating what got done.",
    category: "Planning", readingTime: "8 min read", level: "Everyday", updated: "19 Aug 2026", publishedAt: "2026-08-16T11:30:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["weekly review template", "AI weekly planning", "blocked tasks", "productivity review"],
    takeaway: "A weekly review is valuable when it makes unfinished work and the reason for carryover easier to act on.",
    prompt: `Create a factual weekly review from the work log below.

Review period: [date range]
Goal for the period: [goal]
Completed work: [list with evidence or links]
In progress: [list]
Blocked or waiting: [list and stated dependency]
New requests: [list]

Produce four sections: completed, carryover, blockers, and next priority. For each carryover item, state why it remains open only when the log says why. Mark missing reasons as “Not stated.” Do not infer productivity, urgency, ownership, or completion. Finish with three questions a human owner should answer before setting next week’s priorities.`,
    steps: ["Set the review period and intended outcome.", "Separate completed, in-progress, blocked, and new work before summarizing.", "Include evidence or links for completed work where available.", "Choose next priorities only after a human reviews dependencies and capacity."],
    sections: [
      { title: "A review is not a performance story", body: "A weekly review should help the next planning conversation, not make a task list sound better. Keep completed work tied to observable evidence and let unfinished work retain its real status. This makes the record useful even when the week did not go to plan." },
      { title: "Carryover needs a reason or an explicit gap", body: "When a task moves forward, the next person needs to know whether it is blocked, deprioritized, waiting for input, or simply unfinished. If the work log does not say, label the reason as unknown rather than asking AI to fill it in." },
      { title: "Let dependencies shape next week", body: "A review becomes a plan only after someone considers time, people, decisions, and external dependencies. Ask the model to surface those questions, then let the accountable person decide what deserves attention and what should leave the list." },
      { title: "A worked example: an operations week", body: "A week with three completed fixes, two blocked tickets, and a new compliance request produces a short review: completed items tied to their ticket links, blockers with the named dependency — “waiting on security review since Monday” — and one next priority. The review keeps unfinished work visible instead of making the week sound cleaner than it was." },
      { title: "Make the review reusable", body: "If the review is read again next week, it should still make sense. Keep dates, links, and dependency names in the text rather than assuming memory. A review that stands alone is easier to turn into next week’s starting list, and harder for anyone to misread as a claim of completion." }
    ],
    checks: ["Can completed work be traced to a stated result or link?", "Are carryover reasons taken from the log rather than inferred?", "Are blocked items tied to an explicit dependency or marked as unknown?", "Does the review distinguish a summary from a new priority decision?", "Are next-week questions assigned to a human owner?"]
  },
  {
    slug: "meeting-notes-to-decision-brief",
    title: "Turn meeting notes into a decision brief without inventing agreement",
    dek: "Separate confirmed decisions, open questions, evidence, and requests so a meeting record can support the next decision without creating commitments.",
    category: "Meetings", readingTime: "9 min read", level: "Deep dive", updated: "19 Aug 2026", publishedAt: "2026-08-17T14:00:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["AI meeting notes", "meeting decision brief", "meeting summary template", "decision tracking"],
    takeaway: "A decision brief is trustworthy when readers can see what the group confirmed, what remains open, and who must decide next.",
    prompt: `Turn the meeting record below into a decision brief.

Meeting purpose: [why the meeting took place]
Participants and roles: [only what is known]
Confirmed decisions: [paste decisions with source labels]
Open questions and disagreements: [paste unresolved items]
Actions, owners, and dates: [only if explicitly stated]
Relevant evidence or links: [paste labeled sources]

Return: (1) decision question, (2) confirmed decisions, (3) evidence and source labels, (4) unresolved questions or disagreements, (5) stated actions with owners and dates, (6) requests for a decision owner, and (7) a short follow-up message. Keep agreement separate from discussion. If an owner, date, approval, or decision is not explicitly stated, mark it “Not confirmed.” Do not invent commitments, consensus, citations, or next steps.`,
    steps: ["Start from the meeting record and preserve source labels rather than summarizing from memory.", "Separate confirmed decisions from suggestions, questions, and disagreements.", "Keep only explicitly stated owners and dates in the action section.", "Ask the decision owner to verify the brief before it becomes the project record."],
    sections: [
      { title: "A brief should expose the decision boundary", body: "Meeting conversations mix context, proposals, concerns, and conclusions. A useful decision brief makes the boundary visible: what the group actually confirmed, what it discussed without deciding, and what question still needs an accountable person." },
      { title: "Do not confuse a strong suggestion with agreement", body: "A participant may recommend an option without the group accepting it. Preserve the difference between a proposal, an objection, a question, and a confirmed decision so the follow-up does not create consensus that was never recorded." },
      { title: "Keep actions tied to stated ownership", body: "A clean action list is not permission to assign work. Include an owner or date only when the meeting record states it. Otherwise, make the missing confirmation visible in the brief and follow-up message." },
      { title: "Use the brief as a review surface", body: "The first draft should help the meeting owner check the record, not replace that check. Invite corrections to decisions, sources, disagreements, and next requests before the brief is shared as an official account." },
      { title: "A worked example: a roadmap decision", body: "A roadmap meeting produced a strong suggestion — “move the migration to Q1” — but no confirmed vote. The brief lists that as an open question with the supporting comment labeled by speaker, and keeps the confirmed items separate. The follow-up then asks the decision owner to confirm or defer the migration, instead of treating a suggestion as agreement." },
      { title: "Link the brief to the record", body: "A decision brief is a view over the meeting record, not a replacement for it. Keep the source note or timestamp beside contested claims so the meeting owner can verify wording quickly. When the brief points back to the record, corrections are easier to make and the brief stays trustworthy." }
    ],
    checks: ["Can a reader distinguish confirmed decisions from proposals and unresolved questions?", "Does every material claim retain a source label or a visible missing-evidence marker?", "Are owners and dates included only when explicitly stated?", "Does the follow-up ask for a specific confirmation instead of implying consensus?", "Has the meeting owner reviewed the brief before it becomes the project record?"]
  },
  {
    slug: "evidence-matrix-from-source-notes",
    title: "Build an evidence matrix from source notes before making a decision",
    dek: "Turn scattered claims into a reviewable matrix that shows support, gaps, confidence, and the next verification step.",
    category: "Research", readingTime: "10 min read", level: "Deep dive", updated: "19 Aug 2026", publishedAt: "2026-08-16T11:00:00+08:00", updatedAt: "2026-08-19T09:00:00+08:00", topics: ["evidence matrix", "evidence review", "AI research workflow", "decision support template"],
    takeaway: "An evidence matrix is useful when it makes weak support and missing checks visible before a recommendation is written.",
    prompt: `Build an evidence matrix from the labeled notes below.

Decision question: [what must be decided]
Audience: [who will review it]
Source notes: [paste each note with source label and date]

Create a table with these columns: claim, supporting source, source date, evidence type, strength of support, counter-evidence or limitation, confidence, and next verification step. Keep claims separate instead of merging similar statements. If a claim is not supported by the supplied notes, mark it “Not supported in supplied notes.” Do not invent facts, citations, dates, owners, or confidence. After the table, list the three claims most likely to change the decision and explain what would verify them.`,
    steps: ["State the decision question before collecting claims.", "Label every note with its source and date.", "Ask AI to keep claims, support, and limitations in separate columns.", "Review the highest-impact gaps against the original sources before recommending an option."],
    sections: [
      { title: "Use a matrix when a summary would hide the gaps", body: "A summary is designed to read smoothly. An evidence matrix is designed to be challenged. It keeps a claim beside the source that supports it, the limit that weakens it, and the check that could change your view. That makes it useful before a decision memo or recommendation." },
      { title: "Separate evidence type from evidence strength", body: "A direct measurement, a participant observation, a reported opinion, and an assumption are not interchangeable. Ask the model to name the evidence type first, then describe how strongly the supplied record supports the claim. This avoids turning a neat label into false precision." },
      { title: "Prioritize gaps by decision impact", body: "Not every missing detail deserves the same research effort. Mark the claims that could reverse the preferred option, change a constraint, or alter the responsible owner. Verify those first; leave low-impact uncertainty visible rather than spending time making the whole table look complete." },
      { title: "Keep the original record close", body: "The matrix is a navigation layer, not a replacement for the source. Preserve short source labels and dates, open the original record for important claims, and let the decision owner correct the matrix before it becomes part of a formal recommendation." },
      { title: "A worked example: claims about a competitor feature", body: "Notes claim a competitor “ships export in Q3”. The matrix rows might be: claim, source (“Product blog, 05 Aug”), evidence type (reported announcement), strength (medium — no confirmed release date), and counter-evidence (a customer Q&A saying the timeline is not firm). The decision owner can then see that the claim changes a scope decision only if confirmed, and the next verification step is named." },
      { title: "Know when the matrix is overkill", body: "If the decision is small and the sources are few, a matrix adds ceremony rather than clarity. Use it when a summary would hide the gaps — several claims, mixed evidence, or a choice that depends on which source to trust. When the record is thin, the matrix should say so in the confidence column instead of looking complete." }
    ],
    checks: ["Does every material claim have a source label or a visible unsupported status?", "Are evidence type, strength, confidence, and limitation kept distinct?", "Which three gaps could change the decision, and is each verification step specific?", "Has a human reviewed the original sources before the matrix supports a recommendation?", "Did the draft avoid inventing citations, dates, owners, or certainty?"]
  }
];
export const categories = ["All", "Research", "Writing", "Planning", "Meetings"] as const;
export const getGuide = (slug: string | undefined) => guides.find((guide) => guide.slug === slug);

/** Follow the library's real publication order; this does not infer popularity or user behavior. */
export const getAdjacentGuides = (current: Guide) => {
  const ordered = [...guides].sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
  const currentIndex = ordered.findIndex(guide => guide.slug === current.slug);
  return { previous: currentIndex > 0 ? ordered[currentIndex - 1] : null, next: currentIndex >= 0 && currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : null };
};

export const topicClusters = [
  { slug: "research-and-decisions", number: "01", shortTitle: "Research & decisions", title: "Research notes that lead to a clear next decision.", seoTitle: "AI research workflow and decision log templates", description: "Practical AI workflows for research briefs, evidence checks, and decision records that keep source labels and unresolved questions visible.", useWhen: "You have notes, source links, or project context, but need to separate evidence, assumptions, and a decision that still needs an owner.", introTitle: "Keep the trail back to what supports the claim.", intro: "This collection is for work where a tidy summary is not enough. Use it to make the question, evidence, options, and missing information easier for a person to inspect.", guideSlugs: ["research-brief-from-scattered-sources", "project-notes-to-decision-memo", "decision-log-from-project-notes", "customer-feedback-theme-map", "evidence-matrix-from-source-notes", "brief-first-prompt-pattern"] },
  { slug: "writing-and-updates", number: "02", shortTitle: "Writing & updates", title: "Work updates that say what changed, what matters, and what happens next.", seoTitle: "AI prompts for project updates and clear work writing", description: "Practical AI writing workflows for project updates, first drafts, and follow-up messages that preserve context, ownership, and open questions.", useWhen: "You have raw notes and need a reader-ready draft without inflating progress, guessing dates, or hiding the one action that matters.", introTitle: "Write toward a reader’s next decision.", intro: "These guides help turn working notes into clear communication. They keep the difference between a draft, an agreement, a request, and a confirmed next step visible.", guideSlugs: ["clear-project-update-prompt", "brief-first-prompt-pattern", "meeting-follow-up-email", "turn-rough-notes-into-decision-email"] },
  { slug: "meetings-and-follow-up", number: "03", shortTitle: "Meetings & follow-up", title: "Meeting records that become useful follow-up, not forgotten transcripts.", seoTitle: "AI meeting notes and follow-up email workflow", description: "AI workflows for turning meeting notes into confirmed action items, clear follow-up emails, and visible decisions without inventing commitments.", useWhen: "You have rough notes or a transcript and need to separate decisions, actions, owners, dates, and questions that still need confirmation.", introTitle: "A useful record makes ambiguity visible.", intro: "AI can help sort a long conversation. It should not turn an unassigned idea into a promised task or invent a due date that the group never agreed to.", guideSlugs: ["meeting-notes-to-action-list", "meeting-agenda-from-notes", "meeting-follow-up-email", "meeting-notes-to-decision-brief", "clear-project-update-prompt"] },
  { slug: "planning-and-priorities", number: "04", shortTitle: "Planning & priorities", title: "Plans small enough to start and clear enough to review.", seoTitle: "AI project planning and weekly priorities workflows", description: "Practical AI planning workflows for choosing weekly priorities, creating a credible first project step, and building content plans from real audience questions.", useWhen: "You have more possible tasks than useful attention, and need a modest plan that makes risks, assumptions, and the next decision easier to see.", introTitle: "Make the next move credible before making the plan bigger.", intro: "These workflows favor the smallest useful plan over a credible starting point while reserving trade-offs for a human owner.", guideSlugs: ["weekly-priorities-from-project-list", "project-handoff-brief", "thirty-minute-project-starting-plan", "one-week-content-plan-from-questions", "weekly-review-from-completed-and-blocked-work"] }
] as const;

/** A curated learning path uses existing records only; it is a reading order, not a claim of a completed curriculum. */
export const learningPath = {
  stages: [
    { slug: "frame-the-work", number: "01", shortTitle: "Frame the work", label: "Give the task a usable brief", title: "Frame the work before you ask for output.", description: "Start with a task, its reader, its constraints, and the information you still need. This stage keeps a first prompt from becoming an ungrounded request for certainty.", outcome: "Outcome: a task with enough context to inspect.", guideSlugs: ["brief-first-prompt-pattern", "research-brief-from-scattered-sources", "customer-feedback-theme-map"], closing: "Before moving on, make sure important claims still point back to a source or record rather than a polished summary." },
    { slug: "make-decisions-visible", number: "02", shortTitle: "Make decisions visible", label: "Show the choice and its limits", title: "Make the decisions and trade-offs visible.", description: "Turn project notes into a decision record, then make a modest plan that acknowledges dependencies, capacity, and the questions a human owner still has to answer.", outcome: "Outcome: a visible decision and a credible next move.", guideSlugs: ["project-notes-to-decision-memo", "decision-log-from-project-notes", "thirty-minute-project-starting-plan", "weekly-priorities-from-project-list"], closing: "A decision record should show what was chosen, what evidence supports it, and what may require another review." },
    { slug: "run-the-conversation", number: "03", shortTitle: "Run the conversation", label: "Prepare, meet, and follow up", title: "Run the conversation without losing the record.", description: "Use the work you have already framed to prepare a focused agenda, separate discussion from decisions, and send a follow-up that preserves stated owners and dates.", outcome: "Outcome: a conversation that leaves a usable trail.", guideSlugs: ["meeting-agenda-from-notes", "meeting-notes-to-action-list", "meeting-notes-to-decision-brief", "meeting-follow-up-email", "clear-project-update-prompt"], closing: "Do not turn an ambiguous comment into an assignment. Keep unconfirmed owners and dates visible until the group confirms them." },
    { slug: "carry-the-record-forward", number: "04", shortTitle: "Carry it forward", label: "Handoff or turn insight into a plan", title: "Carry the record into the next period of work.", description: "When a project changes hands or a question becomes a publishing plan, preserve decisions, risks, source paths, and the smallest useful next action.", outcome: "Outcome: a record another person can continue from.", guideSlugs: ["project-handoff-brief", "one-week-content-plan-from-questions"], closing: "A useful handoff or plan tells the next person what is true, what is uncertain, and where to find the record behind it." }
  ]
} as const;

/** Rank only existing library guides by task proximity; no popularity or behavioral data is invented. */
export const getRecommendedGuides = (current: Guide, limit = 3) => {
  const clusters = topicClusters as ReadonlyArray<{ slug: string; guideSlugs: readonly string[] }>;
  const sharedClusters = clusters.filter(cluster => cluster.guideSlugs.includes(current.slug)).map(cluster => cluster.slug);
  return guides.filter(candidate => candidate.slug !== current.slug).map(candidate => {
    const candidateClusters = clusters.filter(cluster => cluster.guideSlugs.includes(candidate.slug)).map(cluster => cluster.slug);
    const sharedTopicCount = candidate.topics.filter(topic => current.topics.includes(topic)).length;
    const score = (candidate.category === current.category ? 7 : 0) + (candidate.level === current.level ? 1 : 0) + (candidateClusters.some(cluster => sharedClusters.includes(cluster)) ? 5 : 0) + sharedTopicCount * 3;
    return { candidate, score };
  }).sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title)).slice(0, limit).map(({ candidate }) => candidate);
};
