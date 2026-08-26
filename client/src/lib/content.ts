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
  method?: {
    purpose: string;
    inputs: { label: string; detail: string }[];
    steps: { label: string; detail: string }[];
    reviewBoundary: string;
    sources: { publisher: string; title: string; href: string; role: string }[];
    caseStudy: { label: "Public-source walkthrough" | "Illustrative composite — not a client case"; title: string; description: string; record: { label: string; detail: string }[]; boundary: string };
    artifact: { title: string; description: string; copyText: string };
  };
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
    dek: "Create a decision-facing brief with a source register, claim boundaries, and a visible review trail—before anyone treats a summary as a recommendation.",
    category: "Research", readingTime: "14 min read", level: "Deep dive", updated: "26 Aug 2026", publishedAt: "2026-08-14T09:00:00+08:00", updatedAt: "2026-08-26T09:00:00+08:00", topics: ["research brief", "AI research workflow", "source checking", "research prompt", "evidence register"],
    image: "/images/research-brief-workflow.webp", imageAlt: "Research materials arranged around a concise paper outline on a warm desk",
    takeaway: "Ask for a traceable decision record, not a confident-sounding summary.",
    prompt: `Prepare a one-page research brief from the source register and notes below.\n\nDecision question: [one choice, not a broad topic]\nAudience and decision owner: [who will review and decide]\nSource register: [source label | publisher | link or file | publication/access date | scope or limitation]\nNotes by source: [paste only labeled excerpts or observations]\n\nReturn these blocks in order: (1) decision question and scope, (2) findings with source labels, (3) conflicting or limited evidence, (4) open questions and next verification step, and (5) a recommendation only if the supplied record supports it. For each material statement, keep the source label. Mark unsupported claims “Not supported in supplied record” and dated material “Needs freshness check.” Do not invent facts, citations, users, results, or certainty.`,
    steps: ["Write one decision question that can be answered, deferred, or narrowed.", "Build a source register before drafting prose; include the link, date, and a scope note for every decision-relevant source.", "Keep observations, interpretations, and recommendations in separate lines so AI cannot silently promote one into another.", "Ask for contradictions and freshness risks before asking for a conclusion.", "Open the original source for every claim that could change the decision."],
    sections: [
      { title: "Start with a decision, not a topic", body: "“Research our support problem” produces an endless collection exercise. “Should we investigate one support category before changing the help flow?” gives the brief a stopping rule. The decision question should identify the choice, the person or group who owns it, and the consequence of being wrong. If none is known, the brief can still map the evidence, but it should say that it is exploratory rather than decision-ready." },
      { title: "Build a source register before writing prose", body: "A source label alone is not enough when a reader needs to reopen the record. Record the publisher or author, a stable link or file location, the publication or access date, the part you used, and one limitation. That small ledger exposes mismatched time periods, vendor claims presented as neutral evidence, and notes that cannot be found again. It also gives an AI draft something concrete to preserve instead of encouraging it to smooth the sources into anonymous statements." },
      { title: "Keep observations, interpretations, and recommendations apart", body: "An observation reports what a source says. An interpretation explains what that might mean for the question. A recommendation asks someone to choose or act. These are different kinds of sentences, and they deserve different labels. When they share a paragraph, an AI system can make the transition between them look natural even when the source never supported it. A useful brief leaves the hand-off visible." },
      { title: "Public-source walkthrough: read the dataset notes before counting", body: "New York City’s public 311 dataset is a useful example of why metadata belongs in the brief. Its documentation says the data covers requests that can be directed to specific agencies, is updated daily, and contains fields such as problem type, responding agency, and location. A careful brief can record those facts, the access date, and a narrow question such as whether a category deserves further review. It cannot claim that a category is rising, that a service is failing, or why residents are reporting it unless a reproducible analysis and appropriate interpretation support those claims." },
      { title: "Use AI to expose conflicts before it drafts a conclusion", body: "Give the model a constrained task: list claims that disagree, facts that are too old for the decision window, and source labels missing from material statements. This is more valuable than asking it to resolve the contradiction. A conflict may reflect different definitions, different periods, or a genuine uncertainty that the decision owner needs to accept. Preserve both sides and name the exact next check rather than letting fluent prose select a winner." },
      { title: "Make the one-page shape do real work", body: "A compact brief can use five fixed blocks: decision question; supported findings; limitations or counterevidence; open verification work; and a proposed next move. The constraint is intentional. It forces the writer to choose what changes the decision and stops background context from disguising an unsupported recommendation. A source register can sit below the page or be linked as the working record, but decision-critical claims should still retain their short labels in the body." },
      { title: "Know when the brief is not ready to recommend", body: "Do not add a recommendation merely because the document has a recommendation heading. Stop at “not ready to decide” when the source is missing, the data period is mismatched, a key term is undefined, or the owner has not stated the trade-off they are willing to make. That is a useful result: it converts vague uncertainty into a small verification task with a person responsible for reviewing it." }
    ],
    checks: ["Can each material statement be traced to a source label and an openable record?", "Does the source register show date, scope, and limitation rather than just a title?", "Does the brief separate observations, interpretations, and a recommendation?", "Are contradictions and freshness risks shown instead of silently resolved?", "Would a decision owner know the smallest next verification step and who must review it?"],
    method: {
      purpose: "Create a brief that a decision owner can audit without rereading every source first.",
      inputs: [
        { label: "Decision boundary", detail: "One choice, its owner, and the consequence of being wrong or delaying." },
        { label: "Source register", detail: "A label, publisher, stable location, date, scope, and limitation for each material source." },
        { label: "Labeled notes", detail: "Short observations or quotations kept beside their source labels—not a merged narrative." }
      ],
      steps: [
        { label: "Map", detail: "Group notes by claim without deciding whether the claim is true." },
        { label: "Challenge", detail: "Surface source conflicts, stale evidence, undefined terms, and missing source labels." },
        { label: "Brief", detail: "Write only the decision-relevant findings, limits, and next verification work." },
        { label: "Verify", detail: "Reopen original records for decision-critical claims before sharing the brief." }
      ],
      reviewBoundary: "This workflow structures supplied material. It does not validate data, establish causation, replace domain review, or authorize a decision.",
      sources: [
        { publisher: "NYC Open Data", title: "311 Service Requests from 2020 to Present", href: "https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2020-to-Present/erm2-nwe9", role: "Public-source walkthrough: dataset scope, fields, and update caveat." }
      ],
      caseStudy: {
        label: "Public-source walkthrough",
        title: "A dataset note is evidence about scope—not proof of a trend",
        description: "This walkthrough uses the published dataset documentation to model an evidence register. It does not reproduce a city analysis or report a result.",
        record: [
          { label: "Question", detail: "Does one public service-request category warrant a separately scoped review?" },
          { label: "Recordable source facts", detail: "Agency-directed request scope; daily updates; fields include problem type, agency, and location." },
          { label: "Not established", detail: "Volume, trend, cause, service quality, or a recommended intervention." },
          { label: "Human next step", detail: "Define a date range and method, reproduce the query, and review the interpretation with the accountable owner." }
        ],
        boundary: "The example shows provenance discipline only. It is not a client case, an NYC performance finding, or a claimed analysis result."
      },
      artifact: {
        title: "Research brief evidence ledger",
        description: "Copy this original working record before drafting; it keeps the source trail and decision boundary visible.",
        copyText: `# Research brief evidence ledger\n\n## Decision boundary\n- Decision question:\n- Decision owner / reviewer:\n- What changes if we are wrong:\n\n## Source register\n| Label | Publisher / author | Link or file | Published / accessed | Scope used | Limitation / freshness risk |\n| --- | --- | --- | --- | --- | --- |\n| [S1] |  |  |  |  |  |\n| [S2] |  |  |  |  |  |\n\n## Claim record\n| Claim or observation | Source label | Interpretation (separate from source) | Counterevidence / gap | Next verification |\n| --- | --- | --- | --- | --- |\n|  |  |  |  |  |\n\n## One-page brief\n1. Supported findings:\n2. Limitations or conflicts:\n3. Open question and next verification:\n4. Recommendation only if the record supports it:`
      }
    }
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
    category: "Meetings", readingTime: "7 min read", level: "Starter", updated: "21 Aug 2026", publishedAt: "2026-08-14T10:00:00+08:00", updatedAt: "2026-08-21T09:00:00+08:00", topics: ["meeting follow-up email", "meeting notes prompt", "action items", "AI meeting workflow"],
    takeaway: "A follow-up email should confirm a shared record, not manufacture agreement.",
    prompt: `Draft a short meeting follow-up email from these notes.\n\nAudience: [people who attended]\nConfirmed decisions: [list]\nActions with stated owners and dates: [list]\nOpen questions or details to confirm: [list]\n\nUse these sections only when they are needed: Decisions, Actions, To confirm. Keep every owner and date exactly as supplied. If a task lacks an owner or due date, label it clearly instead of guessing. End with one sentence inviting corrections to the record.`,
    steps: ["Separate confirmed decisions from ideas that were only discussed.", "Copy names and dates exactly as the group stated them.", "Put missing owners or dates in a visible confirmation section.", "Send the draft while participants can still correct the record."],
    sections: [
      { title: "Treat the email as a shared record", body: "A useful follow-up helps everyone compare their memory with the same small set of facts. It should make the next action easier, not add a polished version of the conversation that hides uncertainty." },
      { title: "Do not convert silence into agreement", body: "A transcript can sound conclusive even when the group did not make a decision. Keep unresolved questions separate, and use a direct request for confirmation rather than assigning meaning to an ambiguous remark." },
      { title: "Make corrections easy to give", body: "The best follow-up creates a low-effort way to say a name, date, owner, or decision is wrong. That is how the note becomes reliable enough to use after the meeting fades." },
      { title: "A worked example: a kickoff follow-up", body: "After a project kickoff, the notes may list a decision and one action with an owner, but leave the timeline unstated. The email should state the decision, list the action with its owner, and end with “please confirm the date you can share a draft” instead of guessing a deadline. The recipient can correct one line rather than rewrite the message." },
      { title: "Keep the record and the message aligned", body: "If the email and the meeting record disagree, the record loses trust. Copy the owners and dates exactly from the confirmed notes, and treat anything missing as a confirmation request. That keeps the follow-up a shared record instead of a second, different version of events." },
      { title: "Use the right output for the right audience", body: "A follow-up email is for people who need to confirm what was said and what happens next. If the material is intended to preserve the full conversation, use the meeting notes workflow; if it must explain a choice and its trade-offs to someone absent, use a decision brief instead. Keeping those outputs separate prevents one polished message from pretending to serve every purpose." },
      { title: "A three-line confirmation pattern", body: "For a meeting with one confirmed decision, one action, and one missing date, write the decision first, list the action with its stated owner, then ask one named person to confirm the date. This small structure makes the missing fact visible without making the recipient reconstruct the meeting." }
    ],
    checks: ["Are decisions limited to points the group actually confirmed?", "Does every action keep its stated owner and date—or clearly say what is missing?", "Can a recipient correct the record without rewriting the email?", "Did the draft avoid treating a suggestion as a commitment?", "Would meeting notes or a decision brief be a better output for any part of this material?"]
  },
  {
    slug: "decision-log-from-project-notes",
    title: "Create a decision log from project notes without hiding the trade-offs",
    dek: "Use AI to turn scattered project notes into an inspectable decision record with options, evidence, owners, and unresolved questions.",
    category: "Research", readingTime: "8 min read", level: "Everyday", updated: "21 Aug 2026", publishedAt: "2026-08-14T10:10:00+08:00", updatedAt: "2026-08-21T09:00:00+08:00", topics: ["decision log template", "project decision record", "AI research workflow", "decision prompt"],
    takeaway: "A decision log is useful when it preserves what was chosen and what still needs proof.",
    prompt: `Create a decision log from these project notes.\n\nDecision question: [state it]\nNotes and source labels: [paste notes]\nKnown constraints: [time, budget, policy, or technical limits]\n\nReturn: (1) decision question, (2) options mentioned, (3) evidence or source labels for each option, (4) confirmed decision if one exists, (5) owner and date if stated, and (6) unresolved questions. Do not claim a decision has been made unless the notes explicitly say so. Flag assumptions and missing evidence.`,
    steps: ["Name one decision question rather than a broad project subject.", "Keep source labels beside claims and option descriptions.", "Ask the model to separate confirmed choices from proposals.", "Have the actual decision owner confirm the final record."],
    sections: [
      { title: "A project note is not automatically a decision", body: "Projects collect partial conclusions, proposals, and constraints in the same place. A decision log is useful because it asks which of those points was actually chosen, who owns it, and what evidence supports it." },
      { title: "Keep trade-offs beside the choice", body: "A record that only states the final option can be impossible to revisit later. Preserve alternatives and constraints so a future reader can understand why a choice made sense at the time." },
      { title: "Let the owner close the record", body: "AI can create a clearer draft, but it cannot confirm authority. The person accountable for the decision should review the wording, evidence, and status before the entry is treated as final." },
      { title: "A worked example: choosing a vendor", body: "A team choosing between two email platforms has notes from demos, a security review, and a price sheet. The log should record the decision question — “which platform do we standardize on?” — the options mentioned, the evidence labels for each, and the confirmed choice only if the group actually decided. Keeping the rejected option’s trade-offs in the log is what lets the decision be revisited honestly next quarter." },
      { title: "Entries are for the future reader", body: "The person who will use the log is usually someone who was not in the room. Include the constraint that mattered — budget, policy, deadline — and the owner who confirmed it. A log that only records the chosen option is a summary; a log that records why and who is a usable record." },
      { title: "Use a stable decision-log row", body: "For each decision, keep the same fields: question, options considered, evidence labels, confirmed choice, owner, date, and review trigger. A stable row makes later comparisons easier and exposes which fields are still missing instead of allowing a fluent paragraph to hide them." },
      { title: "When a decision log should become a memo", body: "Use a decision log when the priority is preserving several decisions over time. Use a decision memo when one choice needs a reader-ready explanation, recommendation, or approval request. Linking the two lets the memo explain the choice while the log preserves its history and trade-offs." }
    ],
    checks: ["Is the decision question specific enough to answer?", "Are options and evidence tied to the notes that support them?", "Does the record distinguish a confirmed choice from a proposal?", "Has the appropriate owner reviewed the final wording?", "Are the owner, date, and review trigger visible for future readers?"]
  },
  {
    slug: "weekly-priorities-from-project-list",
    title: "Plan weekly priorities from a crowded project list",
    dek: "Use AI to sort a long project list into a modest weekly focus while keeping dependencies, risks, and human trade-offs visible.",
    category: "Planning", readingTime: "8 min read", level: "Everyday", updated: "21 Aug 2026", publishedAt: "2026-08-14T10:20:00+08:00", updatedAt: "2026-08-21T09:00:00+08:00", topics: ["weekly priorities", "project planning", "AI task prioritization", "weekly planning prompt"],
    takeaway: "A weekly plan is credible when it names what will not fit as clearly as what will.",
    prompt: `Help me choose a realistic weekly priority plan from this project list.\n\nOutcome for the week: [state it]\nAvailable time and people: [constraints]\nTasks with known deadlines or dependencies: [paste list]\nRisks or decisions that need an owner: [paste list]\n\nGroup tasks into: must move this week, useful if capacity remains, blocked or dependent, and not for this week. For each proposed priority, explain the dependency or reason using only supplied information. Do not estimate effort or promise dates that are not in the notes. End with questions a human owner must answer.`,
    steps: ["Define one outcome that makes the week meaningful.", "List hard deadlines and dependencies separately from preferences.", "Let the model group work without pretending it can choose trade-offs for you.", "Confirm the final priorities with the person who owns the trade-off."],
    sections: [
      { title: "Priorities need a limit", body: "A crowded list becomes useful only when someone decides what will not be attempted. Asking the model to label work as blocked, optional, or out of scope makes the limit visible instead of turning every task into a vague priority." },
      { title: "Dependencies change the sequence", body: "A task may sound urgent but still depend on a decision, source, or person. Put those dependencies in the input so the first draft can surface why an apparently simple sequence may not be credible." },
      { title: "Keep trade-offs with the owner", body: "AI can help compare options and state constraints, but it cannot decide which relationship, risk, or opportunity matters most this week. Use the output to prepare that conversation, not to avoid it." },
      { title: "A worked example: a support engineer's week", body: "A list with a vendor incident, a long-open ticket, a documentation task, and two review requests is crowded. Grouping by “must move”, “if capacity remains”, and “blocked” shows that the incident and the review requests depend on other people. The weekly plan then names one outcome — keep the incident moving — instead of claiming all four are priorities." },
      { title: "Treat “blocked” as information, not failure", body: "A blocked task with a named dependency is more useful than a vague “pending”. When the list marks what is waiting on whom, the weekly plan can surface the real question: do we wait, escalate, or drop it? That is a human decision, not something a model should decide for you." },
      { title: "Make the weekly plan reviewable", body: "A useful weekly plan shows the chosen outcome, the work that supports it, the work that will not fit, and the next review question. Add one sentence explaining why each must-move item belongs in the week; this turns a sorted list into a plan another person can challenge or confirm." },
      { title: "Start with evidence from the current record", body: "Before prioritizing, link each task to a deadline, dependency, decision, or stated outcome. If the list contains only vague labels such as “improve onboarding”, first use a brief or decision workflow to clarify the task rather than asking the model to rank ambiguity." }
    ],
    checks: ["Does the plan name one outcome rather than a long list of activities?", "Are blocked tasks and missing dependencies visible?", "Did the draft avoid creating new dates or effort estimates?", "Has the person who owns the trade-off confirmed the final focus?", "Can each must-move item be traced to a stated outcome, dependency, or deadline?"]
  },
  {
    slug: "meeting-agenda-from-notes",
    title: "Create a meeting agenda from last week’s decisions and open questions",
    dek: "Use AI to prepare a focused agenda from a confirmed record, without reviving settled items or hiding the decisions that need an owner.",
    category: "Meetings", readingTime: "8 min read", level: "Everyday", updated: "21 Aug 2026", publishedAt: "2026-08-15T09:00:00+08:00", updatedAt: "2026-08-21T09:00:00+08:00", topics: ["AI meeting agenda prompt", "meeting agenda from notes", "meeting preparation", "AI meeting workflow"],
    takeaway: "A useful agenda makes the next decision easier, rather than replaying the last conversation.",
    prompt: `Prepare a working agenda for the next [meeting name] from the confirmed record below.\n\nLast meeting: [date and participants]\nConfirmed decisions: [list]\nOpen questions: [list]\nActions and stated owners: [list]\nNew context since the meeting: [notes]\n\nReturn: (1) meeting purpose, (2) the 3–5 items that need discussion or decision, (3) what participants should review beforehand, (4) the owner or input needed for each item, and (5) items that do not belong on this agenda. Do not reopen a confirmed decision unless the new context explicitly requires it. Do not assign an owner, date, or outcome that is not stated.`,
    steps: ["Start from a confirmed meeting record rather than a raw transcript.", "Separate decisions that are settled from questions that still need work.", "Name the person or input needed for each agenda item when that information is known.", "Have the meeting owner confirm the agenda before sending it."],
    sections: [
      { title: "An agenda is a decision surface", body: "A long list of topics tells people where to look. A strong agenda tells them what needs to move. Give each item a purpose: decide, unblock, align, or prepare. The distinction makes it easier to protect the meeting from status updates that can happen asynchronously." },
      { title: "Carry forward uncertainty, not every sentence", body: "Meeting notes often contain details that are useful only as context. Keep the question, dependency, or missing input that prevents progress, then link back to the record if more background is needed. That gives participants enough to prepare without turning the agenda into a transcript." },
      { title: "Do not turn preparation into a new commitment", body: "AI can suggest a neat sequence, but it cannot know who has authority or capacity. If an owner, deadline, or decision status is not in the record, leave it visibly unresolved for the meeting owner to confirm." },
      { title: "A worked example: a monthly planning meeting", body: "From last month’s record, the agenda might have three items: confirm the Q3 scope, decide who owns the onboarding checklist, and review the blocked hiring request. Each gets a purpose — decide, unblock, align — and a note about what to read beforehand. Items that were settled, like the approved budget, are left off so the meeting protects its time." },
      { title: "Protect preparation time", body: "If the agenda requires reading a full transcript to prepare, it has not done its job. Keep the link to the record for detail, but make the pre-reading short and specific. An agenda that can be reviewed in ten minutes is more likely to be read than one that reopens everything." },
      { title: "Choose the next record before the meeting starts", body: "For every agenda item, decide whether the meeting should leave an action, a decision, or an open question. This gives the facilitator a clear closing check and makes the next page in the workflow obvious: action items can become a confirmed list, while a contested choice may need a decision brief." },
      { title: "A practical agenda input", body: "The minimum useful input is last meeting date, confirmed decisions, open questions, current context, and any named owners. If one of those is missing, label the gap in the prompt and ask the meeting owner to fill it instead of allowing the agenda to manufacture a purpose." }
    ],
    checks: ["Does every agenda item have a reason to exist now?", "Are settled decisions excluded unless new evidence requires review?", "Are missing owners or inputs visible rather than guessed?", "Could a participant prepare from the agenda without reading a full transcript?", "Does each item state whether the desired outcome is an action, decision, or open question?"]
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
    dek: "Build a decision-facing record that preserves the exact status of a choice, its rationale, unresolved objections, and the confirmation still required.",
    category: "Meetings", readingTime: "14 min read", level: "Deep dive", updated: "26 Aug 2026", publishedAt: "2026-08-17T14:00:00+08:00", updatedAt: "2026-08-26T09:00:00+08:00", topics: ["AI meeting notes", "meeting decision brief", "meeting summary template", "decision tracking", "decision record"],
    takeaway: "A decision brief is trustworthy when readers can distinguish the status of a choice from the energy of the discussion around it.",
    prompt: `Create a decision brief from this meeting record. Treat every line as unconfirmed unless the supplied record gives a clear basis for its status.

Decision question: [the choice the meeting addressed]
Meeting source: [link, document title, or dated note]
Participants and decision role: [only what the record states]
Decision statements with source labels or timestamps: [paste]
Rationale or evidence with source labels: [paste]
Objections, alternatives, and unresolved questions: [paste]
Actions, owners, and dates: [only explicitly stated commitments]

Return: (1) decision question, (2) decision status using only Confirmed / Proposed / Deferred / Not confirmed, (3) confirmed rationale and source labels, (4) alternatives or objections, (5) actions with explicit owner/date status, (6) the exact confirmation request and accountable decision role, and (7) a concise follow-up message. Keep minutes, discussion, and the decision brief distinct. Do not infer consensus from silence, a strong recommendation, attendance, an action item, or a summary sentence. Do not invent commitments, citations, owners, dates, or next steps.`,
    steps: ["Keep the original record open and label the exact line, timestamp, or document that supports each material item.", "Classify every decision-related statement by status before writing prose: Confirmed, Proposed, Deferred, or Not confirmed.", "Write the rationale separately from the decision so a reader can see which evidence was considered without treating it as unanimous agreement.", "Preserve objections, alternatives, and missing authority as first-class parts of the brief.", "Send the brief as a confirmation request to the person or group that actually holds the decision, then record the reply."],
    sections: [
      { title: "A decision brief is not meeting minutes with fewer words", body: "Minutes aim to preserve a meeting record. An action list captures stated commitments. A decision brief answers a narrower need: what choice is at stake, what status does it have, what rationale is on record, what could still change it, and who must confirm it. A one-page brief may point to the minutes, but it should never replace the source record when wording, authority, or objections matter." },
      { title: "Make decision status a required field", body: "Use a small closed vocabulary: Confirmed, Proposed, Deferred, or Not confirmed. “Confirmed” needs an explicit basis in the supplied record, such as a stated resolution or a recorded decision owner’s approval. “Proposed” marks an option someone put forward. “Deferred” marks an intentional delay. “Not confirmed” is the default for a claim that sounds decisive but lacks a verifiable basis. This prevents a polished summary from manufacturing agreement." },
      { title: "Separate rationale from agreement", body: "A team can decide something while disagreeing about why; it can also hear strong reasons without deciding. Put the decision statement, rationale, objections, and source references in different rows. This makes it possible to correct one element without rewriting the entire brief. It also helps a future reader see whether an action was tied to a settled choice or merely prepared for a possible one." },
      { title: "Public-source walkthrough: a formal record still needs a clear rationale", body: "The W3C Process Document says groups should retain meeting minutes and must record official group decisions made during discussions. It also says discussion detail is not required when the rationale for the decision is clear. That distinction is a useful public example: a decision brief does not need a transcript, but it needs an accountable decision status, a clear rationale, and a path back to the underlying record when the wording is contested." },
      { title: "Do not use action items as evidence of a decision", body: "“I can investigate option B” is an action; it does not prove that option B was selected. “Please draft an estimate” may be preparation for a decision rather than authorization to spend. Keep these statements in an action section with their stated owner and date, then keep the decision status separate. If ownership or timing is absent, write “Not confirmed” rather than assigning it to the most active participant." },
      { title: "A compact illustrative composite: a migration discussion", body: "Imagine a fictional internal record containing three lines: a participant proposes moving a migration into the next quarter; another participant names a release risk; and the meeting chair asks for an estimate before deciding. The decision brief should classify the option as Proposed, record the risk as an objection or constraint, and classify the choice as Deferred. The next confirmation request goes to the documented decision role. This is an illustrative composite, not a client meeting or an account of a real project." },
      { title: "Close the record with a precise confirmation request", body: "The best follow-up does not ask “Does this look right?” It asks a narrow question: “Can the decision owner confirm whether the migration is approved, deferred, or still proposed, and correct the stated rationale by [date if one was explicitly agreed]?” This turns review into a small, answerable task. Store the confirmation with the brief so the document’s status changes because of a record, not because time passed." }
    ],
    checks: ["Can a reader see Confirmed, Proposed, Deferred, and Not confirmed without interpreting tone?", "Does each material decision or rationale point to a record location or visible missing-evidence marker?", "Are actions, decision status, and rationale in separate fields?", "Are owners and dates included only when explicitly stated?", "Does the confirmation request name the exact decision and accountable role?", "Has the documented decision owner or authorized group reviewed the brief before it becomes the project record?"],
    method: {
      purpose: "Create a reviewable decision record from a meeting without converting discussion into authority.",
      inputs: [
        { label: "Primary meeting record", detail: "Minutes, notes, transcript, or recording reference with enough location detail to reopen it." },
        { label: "Decision question", detail: "The choice being made—not merely the topic discussed." },
        { label: "Decision authority", detail: "The role or group that may confirm, defer, or reject the choice, only if the record states it." }
      ],
      steps: [
        { label: "Extract", detail: "Pull decision statements, rationale, objections, and actions into separate rows." },
        { label: "Classify", detail: "Assign a status based on the record, not speaker confidence or attendance." },
        { label: "Trace", detail: "Keep a timestamp, source link, or note reference for every material row." },
        { label: "Confirm", detail: "Ask the authority to confirm the decision status and material wording." }
      ],
      reviewBoundary: "This workflow prepares a confirmation surface. It does not determine governance authority, resolve disagreements, or create commitments.",
      sources: [
        { publisher: "World Wide Web Consortium (W3C)", title: "W3C Process Document — Meeting Minutes", href: "https://www.w3.org/policies/process/", role: "Public-source walkthrough: record retention, official decisions, and clear rationale." }
      ],
      caseStudy: {
        label: "Public-source walkthrough",
        title: "From meeting record to decision status, without replaying every discussion detail",
        description: "The W3C process is used only as a public illustration of the distinction between minutes, official decisions, and rationale.",
        record: [
          { label: "Source principle", detail: "Minutes are retained; official decisions are recorded; rationale remains clear even when full discussion detail is not reproduced." },
          { label: "Brief implication", detail: "Record decision status and rationale separately, then link back to the full meeting record." },
          { label: "Not implied", detail: "That every discussion has consensus, that silence equals approval, or that a working group’s procedure governs your organization." },
          { label: "Human next step", detail: "Confirm the organization’s actual decision authority and request correction from that authority." }
        ],
        boundary: "This is a public-method walkthrough, not a claim about a W3C meeting outcome or a client case."
      },
      artifact: {
        title: "Decision-status confirmation card",
        description: "Copy this original record beside meeting notes before an AI summary is shared.",
        copyText: `# Decision-status confirmation card\n\n## Source record\n- Meeting / document link:\n- Date and record location:\n- Decision question:\n- Decision authority stated in record:\n\n## Decision record\n| Item | Status: Confirmed / Proposed / Deferred / Not confirmed | Source location | Rationale on record | Objection or alternative |\n| --- | --- | --- | --- | --- |\n|  |  |  |  |  |\n\n## Actions (not evidence of a decision)\n| Action | Explicit owner | Explicit date | Source location | Missing confirmation |\n| --- | --- | --- | --- | --- |\n|  |  |  |  |  |\n\n## Confirmation request\n- Please confirm or correct the decision status:\n- Please confirm or correct the rationale / objections:\n- Reviewer and response record:`
      }
    }
  },
  {
    slug: "evidence-to-priority-plan",
    title: "Turn a research brief into a priority plan without hiding uncertainty",
    dek: "Turn a reviewed evidence record into one reversible next move, while preserving the dependency, disconfirming condition, and decision owner that can still change the plan.",
    category: "Planning", readingTime: "15 min read", level: "Deep dive", updated: "26 Aug 2026", publishedAt: "2026-08-25T09:00:00+08:00", updatedAt: "2026-08-26T09:00:00+08:00", topics: ["research to planning", "evidence-based priorities", "decision-ready plan", "AI planning workflow", "reversible planning"],
    takeaway: "A credible priority is a bounded next move with a named review condition—not a task list made to look certain.",
    prompt: `Turn the reviewed evidence record below into a priority plan. Preserve uncertainty and do not treat a proposed plan as an approved commitment.

Decision to support: [one decision]
Decision owner and approval status: [known / unknown]
Evidence that is sufficient for a next check: [claim | source label | date | limitation]
Evidence gaps that could change the choice: [paste]
Options considered and trade-offs: [paste]
Constraints and dependencies: [capacity, approvals, access, timing]

Return: (1) decision and current approval status, (2) one smallest reversible priority, (3) evidence supporting that next move with labels, (4) disconfirming condition or evidence gap, (5) dependency and explicit owner status, (6) review checkpoint and what it decides, (7) work to defer, and (8) a confirmation question for the decision owner. Do not invent priority, urgency, capacity, owners, dates, approval, evidence, or results.`,
    steps: ["Start with the decision and current approval status, not a backlog.", "Carry forward the evidence labels, source dates, and limitations that make the next move defensible.", "Choose a first move that can be reviewed, paused, or reversed before wider work starts.", "Name the disconfirming condition: the observation or missing evidence that would change the priority.", "Record the dependency, checkpoint, and decision owner as fields—not optimistic assumptions."],
    sections: [
      { title: "A research brief is an input, not a commitment", body: "A brief explains what is known, limited, and worth deciding. A priority plan adds a different contract: what is the smallest move justified now, what would change that choice, and who may approve broader work? If the plan begins with tasks, it can hide the fact that the decision has not been made. Keep the decision and approval status at the top of the record so a reader can see whether the plan is exploratory, proposed, or authorized." },
      { title: "Carry evidence forward as a planning constraint", body: "Evidence does not become stronger because it appears in a plan. Preserve the source label, date, and limitation beside each claim that supports the next move. A reported issue can justify a scoped verification; it does not establish its cause, prevalence, or priority over every other problem. If the limitation could alter the move, it belongs in the plan’s disconfirming-condition field, not in a footnote." },
      { title: "Choose a reversible move instead of an impressive roadmap", body: "A reversible move has a defined scope, a low-cost stopping point, and a result that informs the decision. Examples include reproducing an issue with a defined sample, checking an access dependency, or validating a required approval. It is not automatically a pilot, an experiment, or a release. The useful test is whether a reviewer can name what will be learned, what will not be decided yet, and how the work can stop if the premise fails." },
      { title: "Name the condition that would change the priority", body: "Every credible plan should include a disconfirming condition. It might be “access to the required record is not granted,” “the reported issue cannot be reproduced using the agreed method,” or “the decision owner does not accept the trade-off.” The condition is not pessimism. It protects the team from continuing because a draft made a path feel inevitable. If no condition could change the plan, the task may be too vague or may already be a commitment that needs explicit approval." },
      { title: "Public-source walkthrough: plan, build evidence, use it, then learn", body: "The U.S. Government Accountability Office’s public guide groups 13 evidence and performance-management practices across planning for results, assessing and building evidence, using evidence, and fostering continuous learning. That is a useful method boundary for a small planning record: write the intended result, state what evidence exists, use only enough evidence for the next bounded move, and include a review point. The guide is not an endorsement of any private-team priority or a prediction that a proposed action will succeed." },
      { title: "Illustrative composite: verify before promising a fix", body: "Consider a fictional record in which two labeled support notes mention slow exports, but no engineer has reviewed the relevant path and capacity has not been approved. A plan can propose one bounded check: reproduce the issue against a defined sample with an engineer who is explicitly available. The plan carries the two notes as limited evidence, names access to the record as a dependency, and sets a checkpoint to decide whether a scoped fix is warranted. It must not say “ship export performance work this week.” This is an illustrative composite, not a customer case or a reported test result." },
      { title: "Use AI to test the plan’s missing fields", body: "Ask an AI system to identify missing owner status, unsupported urgency, tasks that imply approval, and sentences that lack a disconfirming condition. Do not ask it to choose which trade-off the organization should accept. The model can make plan ingredients inspectable; a person with authority must decide the trade-off, capacity, and scope." },
      { title: "End at a review gate, not an unearned due date", body: "A checkpoint is not a vague “follow up later.” It names the evidence to review, the decision it will inform, the role that will review it, and the condition under which the work pauses. If a date was not agreed, do not manufacture one. The plan is useful precisely because it gives a decision owner enough structure to confirm, defer, or revise the next move without confusing a planning draft with a promise." }
    ],
    checks: ["Does the plan state the decision and approval status rather than merely list activity?", "Can a reader trace each decision-critical planning claim back to a labeled evidence record?", "Is the first move small enough to pause or reverse before wider work starts?", "Is a disconfirming condition named and genuinely capable of changing the priority?", "Are dependencies, owner status, and review gate visible rather than assumed?", "Has the accountable person confirmed the trade-off before the plan becomes a commitment?"],
    method: {
      purpose: "Translate a reviewed evidence record into a smallest credible move while making the conditions that could change it visible.",
      inputs: [
        { label: "Reviewed evidence record", detail: "A brief or matrix with source labels, dates, and limitations—not an untraceable summary." },
        { label: "Decision and authority", detail: "The choice supported and the role that may approve, defer, or redirect it." },
        { label: "Operational constraints", detail: "Known capacity, dependencies, access, approvals, and boundaries for a reversible first move." }
      ],
      steps: [
        { label: "Bound", detail: "State the decision and distinguish proposed work from approved work." },
        { label: "Select", detail: "Choose one move that reduces a decision-critical uncertainty or verifies a dependency." },
        { label: "Challenge", detail: "Record the evidence gap or observation that would change the priority." },
        { label: "Gate", detail: "Define who reviews which evidence at the checkpoint and what decision follows." }
      ],
      reviewBoundary: "This workflow organizes a planning proposal. It does not approve spend, estimate capacity, validate evidence, or promise a business outcome.",
      sources: [
        { publisher: "U.S. Government Accountability Office (GAO)", title: "Evidence-Based Policymaking: Practices to Help Manage and Assess the Results of Federal Efforts", href: "https://www.gao.gov/products/gao-23-105460", role: "Public-source walkthrough: planning, evidence-building, evidence use, and continuous learning." }
      ],
      caseStudy: {
        label: "Illustrative composite — not a client case",
        title: "A verification step can be a priority without pretending to be a product commitment",
        description: "This fictional record models a reversible first move and deliberately contains no user metrics, product result, or claimed outcome.",
        record: [
          { label: "Limited evidence", detail: "Two labeled support notes report the same friction; technical cause and frequency are unknown." },
          { label: "Smallest move", detail: "Reproduce the issue against an agreed sample with explicitly available technical review." },
          { label: "Disconfirming condition", detail: "The issue cannot be reproduced using the agreed method, or required access is not available." },
          { label: "Review gate", detail: "The decision owner reviews the reproduction record before approving, deferring, or redefining broader work." }
        ],
        boundary: "This is a fictional composite for method illustration. It is not a customer report, a test result, or a promised delivery plan."
      },
      artifact: {
        title: "Reversible-priority card",
        description: "Copy this original decision record alongside the downloadable priority-plan workbook; it makes the review gate explicit before work expands.",
        copyText: `# Reversible-priority card\n\n## Decision and status\n- Decision this supports:\n- Decision owner:\n- Approval status: proposed / approved / unknown\n\n## Evidence carried forward\n| Claim | Source label and date | Limitation | Why it supports only this next move |\n| --- | --- | --- | --- |\n|  |  |  |  |\n\n## One bounded priority\n- Smallest next move:\n- Scope boundary:\n- Dependency and owner status:\n- Disconfirming condition:\n- Work to defer:\n\n## Review gate\n- Evidence to review:\n- Who reviews it:\n- Decision after review: continue / pause / redefine\n- Date only if explicitly agreed:`
      }
    }
  },
  {
    slug: "evidence-matrix-from-source-notes",
    title: "Build an evidence matrix from source notes before making a decision",
    dek: "Construct a claim-by-claim inspection table that keeps source type, direct support, limitations, and verification work separate before a brief or recommendation is written.",
    category: "Research", readingTime: "15 min read", level: "Deep dive", updated: "26 Aug 2026", publishedAt: "2026-08-16T11:00:00+08:00", updatedAt: "2026-08-26T09:00:00+08:00", topics: ["evidence matrix", "evidence review", "AI research workflow", "decision support template", "claim verification"],
    takeaway: "An evidence matrix earns its space when a reader can challenge one claim at a time without mistaking a tidy table for a verdict.",
    prompt: `Build an evidence matrix from the labeled record below. Preserve the distinction between what a source says, how directly it supports a claim, and what still must be checked.

Decision question: [specific choice]
Decision owner / reviewer: [if known]
Source register: [label | publisher / author | link or file | date | source type | scope]
Claim notes: [paste each observation with its source label]

Create one row per claim using these columns: claim; exact source label; source type; direct support in supplied record; limitation or counterevidence; freshness / scope risk; impact if wrong; verification step; reviewer status. Use only “Direct”, “Partial”, “Context only”, or “Not supported in supplied record” for the support field. Do not create numeric confidence, citations, owners, dates, evidence, or conclusions. After the table, name the three rows most likely to change the decision and say what exact record would change them.`,
    steps: ["State the decision question and what a wrong answer would affect before creating rows.", "Create a source register with publisher, date, type, scope, and location before you rate any claim.", "Use one atomic claim per row; split a sentence when it combines a fact, an inference, and a recommendation.", "Classify directness of support without turning it into a made-up confidence score.", "Prioritize verification by decision impact, then reopen the original material for the highest-impact rows."],
    sections: [
      { title: "A matrix has a different job from a research brief", body: "A research brief compresses the decision-relevant record for a reader. A matrix slows the work down before that compression. It gives each claim a row, preserves its source type and limitation, and names the verification work. Use it when multiple sources conflict, when a claim could reverse a choice, or when a summary would hide where the conclusion began. Do not use it merely to make a thin record look rigorous." },
      { title: "Write atomic claims before you score support", body: "“The policy applies to our use and blocks launch this quarter” contains at least three claims: what the policy says, whether it applies, and whether it affects timing. Put those in separate rows. An atomic claim lets a reviewer challenge the correct thing instead of accepting a broad sentence because one part is true. It also stops an AI system from using evidence for one proposition as though it proved the next." },
      { title: "Classify source type before evaluating directness", body: "A primary standard, a publisher’s implementation guide, an internal observation, and an unverified assertion do different jobs. First record what kind of source you have and its scope. Then state whether the supplied record directly supports the claim, partially supports it, provides context only, or does not support it. This is deliberately plainer than a numeric confidence score: a number can look objective while concealing why the row is weak." },
      { title: "Public-source walkthrough: voluntary guidance is not a compliance finding", body: "NIST describes its AI Risk Management Framework Playbook as voluntary guidance with suggested actions and related references across Govern, Map, Measure, and Manage. A matrix can record that primary public source, then separately record an implementation guide or an internal policy claim. The rows make visible that the NIST material describes a voluntary framework; it does not by itself prove legal compliance, a product’s safety, or what a specific organization must do." },
      { title: "Use support labels that explain their limit", body: "“Direct” means the source speaks to the exact claim within its stated scope. “Partial” means the source supports a related part but leaves a material leap. “Context only” means it informs background but does not establish the claim. “Not supported in supplied record” is a valid result. Attach the next verification step to the gap: open a primary document, check the applicable date, reproduce a calculation, or ask a named reviewer to define the term. Do not let “medium confidence” substitute for this explanation." },
      { title: "Prioritize rows by the cost of being wrong", body: "A missing comma in background context may not change a choice; a wrong assumption about scope, authority, cost, or timing can. Mark the rows whose reversal would alter the decision, a dependency, or the responsible owner. Verify those first, even if they are inconvenient. The matrix should help allocate attention, not encourage the team to fill every cell before anyone is allowed to think." },
      { title: "Illustrative composite: three sources, three different roles", body: "Consider a fictional AI-use review with a primary public framework, a vendor implementation article, and an unlabeled internal note. The framework row can be Direct for the statement that the framework is voluntary guidance; the vendor article may be Context only for a claim about the framework’s intent; the unlabeled note may be Not supported in supplied record until its author and date are known. This is an illustrative composite, not a compliance assessment or a claim about any organization’s controls." },
      { title: "Stop the matrix where judgment begins", body: "A matrix can make the record reviewable, but it cannot decide the acceptable trade-off or remove the need for qualified review. Move to a research brief when the highest-impact rows are understood. Move to a decision record when someone with authority has selected an option. If the matrix still contains a decision-critical “Not supported” row, its correct output may be a verification request rather than a recommendation." }
    ],
    checks: ["Does every material claim have an exact source label or a visible “Not supported in supplied record” status?", "Is each claim atomic rather than a fact, inference, and recommendation fused together?", "Are source type, directness of support, scope/freshness risk, and limitation kept distinct?", "Which three rows could change the decision, and does each have a specific verification step?", "Has a human reopened the original source for decision-critical rows before the matrix supports a recommendation?", "Did the draft avoid inventing citations, dates, owners, numeric confidence, or certainty?"],
    method: {
      purpose: "Create a claim-level inspection surface before a reader compresses evidence into a brief or recommendation.",
      inputs: [
        { label: "Specific decision", detail: "A choice that makes it possible to judge which claims are decision-critical." },
        { label: "Source register", detail: "Source label, publisher or author, date, location, type, scope, and access context." },
        { label: "Atomic claim notes", detail: "One proposition per row, kept separate from inferred meaning and recommended action." }
      ],
      steps: [
        { label: "Split", detail: "Turn compound statements into atomic claims." },
        { label: "Classify", detail: "Record source type and directness of support without false numeric precision." },
        { label: "Challenge", detail: "Add limitation, counterevidence, scope risk, and freshness risk to every material row." },
        { label: "Verify", detail: "Investigate the rows whose reversal could change the decision before drafting a brief." }
      ],
      reviewBoundary: "This workflow organizes supplied evidence. It is not legal, technical, scientific, or compliance validation and does not determine an acceptable risk level.",
      sources: [
        { publisher: "National Institute of Standards and Technology (NIST)", title: "NIST AI RMF Playbook", href: "https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook", role: "Public-source walkthrough: voluntary guidance, suggested actions, and source-type classification." }
      ],
      caseStudy: {
        label: "Public-source walkthrough",
        title: "One public framework can support a narrow claim while leaving other claims open",
        description: "The record uses NIST’s published description only to demonstrate claim boundaries and source classification.",
        record: [
          { label: "Direct support", detail: "NIST describes the Playbook as voluntary guidance with suggested actions and references for four AI RMF functions." },
          { label: "Context only", detail: "A secondary implementation guide can explain how one organization interprets the framework, but does not replace the primary source." },
          { label: "Not established", detail: "Legal compliance, a product’s safety, or an organization’s adoption status." },
          { label: "Human next step", detail: "Check the applicable rule or internal control directly with the appropriate qualified reviewer." }
        ],
        boundary: "This is a public-source walkthrough, not legal advice, compliance validation, or a finding about any system."
      },
      artifact: {
        title: "Claim-level evidence matrix",
        description: "Copy this original matrix before drafting a brief; it is intentionally structured to show why a row is weak rather than assign a decorative score.",
        copyText: `# Claim-level evidence matrix\n\n## Decision boundary\n- Decision question:\n- Decision owner / reviewer:\n- Consequence if this decision is wrong:\n\n## Source register\n| Label | Publisher / author | Link or file | Date | Source type | Scope / limitation |\n| --- | --- | --- | --- | --- | --- |\n| [S1] |  |  |  |  |  |\n\n## Claim rows\n| Atomic claim | Exact source label | Direct support: Direct / Partial / Context only / Not supported | Limitation or counterevidence | Freshness / scope risk | Impact if wrong | Next verification | Reviewer status |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n|  |  |  |  |  |  |  |  |\n\n## Decision-critical rows\n1. Row and exact record needed to change it:\n2. Row and exact record needed to change it:\n3. Row and exact record needed to change it:`
      }
    }
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
  { slug: "research-and-decisions", number: "01", shortTitle: "Research & decisions", title: "Research notes that lead to a clear next decision.", seoTitle: "AI research workflow and decision log templates", description: "Practical AI workflows for research briefs, evidence checks, and decision records that keep source labels and unresolved questions visible.", useWhen: "You have notes, source links, or project context, but need to separate evidence, assumptions, and a decision that still needs an owner.", introTitle: "Keep the trail back to what supports the claim.", intro: "This collection is for work where a tidy summary is not enough. Use it to make the question, evidence, options, and missing information easier for a person to inspect.", guideSlugs: ["research-brief-from-scattered-sources", "project-notes-to-decision-memo", "decision-log-from-project-notes", "customer-feedback-theme-map", "evidence-matrix-from-source-notes", "evidence-to-priority-plan", "brief-first-prompt-pattern"] },
  { slug: "writing-and-updates", number: "02", shortTitle: "Writing & updates", title: "Work updates that say what changed, what matters, and what happens next.", seoTitle: "AI prompts for project updates and clear work writing", description: "Practical AI writing workflows for project updates, first drafts, and follow-up messages that preserve context, ownership, and open questions.", useWhen: "You have raw notes and need a reader-ready draft without inflating progress, guessing dates, or hiding the one action that matters.", introTitle: "Write toward a reader’s next decision.", intro: "These guides help turn working notes into clear communication. They keep the difference between a draft, an agreement, a request, and a confirmed next step visible.", guideSlugs: ["clear-project-update-prompt", "brief-first-prompt-pattern", "meeting-follow-up-email", "turn-rough-notes-into-decision-email"] },
  { slug: "meetings-and-follow-up", number: "03", shortTitle: "Meetings & follow-up", title: "Meeting records that become useful follow-up, not forgotten transcripts.", seoTitle: "AI meeting notes and follow-up email workflow", description: "AI workflows for turning meeting notes into confirmed action items, clear follow-up emails, and visible decisions without inventing commitments.", useWhen: "You have rough notes or a transcript and need to separate decisions, actions, owners, dates, and questions that still need confirmation.", introTitle: "A useful record makes ambiguity visible.", intro: "AI can help sort a long conversation. It should not turn an unassigned idea into a promised task or invent a due date that the group never agreed to.", guideSlugs: ["meeting-notes-to-action-list", "meeting-agenda-from-notes", "meeting-follow-up-email", "meeting-notes-to-decision-brief", "clear-project-update-prompt"] },
  { slug: "planning-and-priorities", number: "04", shortTitle: "Planning & priorities", title: "Plans small enough to start and clear enough to review.", seoTitle: "AI project planning and weekly priorities workflows", description: "Practical AI planning workflows for choosing weekly priorities, creating a credible first project step, and building content plans from real audience questions.", useWhen: "You have more possible tasks than useful attention, and need a modest plan that makes risks, assumptions, and the next decision easier to see.", introTitle: "Make the next move credible before making the plan bigger.", intro: "These workflows favor the smallest useful plan over a credible starting point while reserving trade-offs for a human owner.", guideSlugs: ["evidence-to-priority-plan", "weekly-priorities-from-project-list", "project-handoff-brief", "thirty-minute-project-starting-plan", "one-week-content-plan-from-questions", "weekly-review-from-completed-and-blocked-work"] }
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

export type GuideRecommendation = { guide: Guide; reason: string };

/** Rank only existing library guides by task proximity; no popularity or behavioral data is invented. */
export const getRecommendedGuideRecords = (current: Guide, limit = 3): GuideRecommendation[] => {
  const clusters = topicClusters as ReadonlyArray<{ slug: string; guideSlugs: readonly string[] }>;
  const sharedClusters = clusters.filter(cluster => cluster.guideSlugs.includes(current.slug)).map(cluster => cluster.slug);
  return guides.filter(candidate => candidate.slug !== current.slug).map(candidate => {
    const candidateClusters = clusters.filter(cluster => cluster.guideSlugs.includes(candidate.slug)).map(cluster => cluster.slug);
    const sharedTopics = candidate.topics.filter(topic => current.topics.includes(topic));
    const sharesCluster = candidateClusters.some(cluster => sharedClusters.includes(cluster));
    const sharedTopicCount = sharedTopics.length;
    const score = (candidate.category === current.category ? 7 : 0) + (candidate.level === current.level ? 1 : 0) + (candidateClusters.some(cluster => sharedClusters.includes(cluster)) ? 5 : 0) + sharedTopicCount * 3;
    const reason = sharedTopics[0]
      ? `Shared focus: ${sharedTopics[0]}`
      : sharesCluster
        ? "Part of the same reading path"
        : candidate.category === current.category
          ? `More ${current.category.toLowerCase()} practice`
          : "A connected next move";
    return { candidate, score, reason };
  }).sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title)).slice(0, limit).map(({ candidate, reason }) => ({ guide: candidate, reason }));
};

export const getRecommendedGuides = (current: Guide, limit = 3) => getRecommendedGuideRecords(current, limit).map(record => record.guide);
