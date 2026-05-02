# Molofu3 — Product Design (Phase 1)

## Product Vision

**Molofu3 = "管理負擔" (Manage the Burden)**

A calm command centre for Hong Kong families. One place where the commander assigns, the helper receives, and everyone knows what happens next — without group chats, without chasing, without 3 hours of daily coordination overhead.

**The single promise:** A family coordinator can hand off a task in under 30 seconds and trust it will be done, without thinking about it again.

**Target:** Hong Kong dual-income families with domestic helpers. Kids in tuition/activities. Two WhatsApp groups minimum (family + helper). Commanders are busy professionals who cannot be the single point of failure.

---

## Design Principles

**1. Calm over comprehensive.** The app should feel like a well-organized desk, not a war room. Only show what needs action now.

**2. Frictionless handoff.** The commander should create a task in ≤30 seconds, one-handed, while in a meeting. Not a form — a quick capture.

**3. Structured accountability.** Helpers see exactly what to do, by when, with context. No guessing, no "I wasn't sure."

**4. Failure is visible, not hidden.** If something is late or blocked, it surfaces immediately — not 30 minutes later when it's too late.

**5. One app, not five.** Family WhatsApp, helper WhatsApp, school group, classroom app, shared calendar — collapsed into one feed.

---

## Target Customer

**Hong Kong Working Families**
- Dual-income parents (commander role, typically mother)
- Domestic helper (helper role)
- Extended family (observer role — grandparents checking in)
- Kids: 5-15 years old, enrolled in multiple tuition/activities
- Household has: 2+ WhatsApp groups, shared family calendar, school communication app

**Where they are:** Commuting MTR, at office, in meetings, cooking, sending kids to activities.

**When they need this:** 7-8am (morning coordination), 3-4pm (pickup coordination), 8-9pm (evening planning).

---

## Personas

### Persona 1: Sarah Chen (Commander)

**Who:** 38-year-old marketing director. Mother of 2 (Tim, 9; Lily, 6). Employs helper Maria. Lives in a 800 sq ft apartment in Kowloon Tong.

**Context:** Works 5 days a week, often in meetings until 6-7pm. Coordinates everything for the household — groceries, kids' activities, helper instructions, school communication. She is the default "commander" and the single point of failure.

**Constraints:**
- 30 seconds to act while in a meeting
- One hand occupied (holding phone or coffee)
- Stressed, distracted, context-switching
- Speaks Cantonese and English; helper speaks limited English
- Phone: iPhone 14, primarily used one-handed

**Goal:** Hand off a task and trust it will be done. Free her mind for actual work.

**Frustrations:**
- WhatsApp messages get buried under 200 other messages
- "Seen" doesn't mean "understood" — helper arrives at school 30 minutes late because the message wasn't clear
- Chasing Maria for status updates is a daily job
- When she forgets to send a morning instruction, the whole day is disrupted
- Sunday planning session for the week ahead takes 90 minutes of mental load

**Success looks like:** Sarah opens the app, sees her 3 priority tasks for today, knows Maria is on track, and closes the app in 20 seconds.

**Failure looks like:** Sarah spends her 15-minute coffee break chasing Maria via WhatsApp, then has to call the school to apologize for the late pickup.

---

### Persona 2: Maria Santos (Helper)

**Who:** 32-year-old Filipino domestic helper. Has worked for the Chen family for 2 years. Speaks Tagalog at home, English at work, understands basic Cantonese. Takes kids to school and activities.

**Context:** Carries kids to school, wet market, tuition centres. Uses phone primarily standing, outdoors, in bright sunlight. Sometimes in noisy environments. Limited English reading comprehension.

**Constraints:**
- Limited English — labels must be simple or have icons
- Bright sunlight, wet hands, noisy environment
- Needs to see tasks without scrolling through chat history
- No access to WhatsApp during work hours (employer policy)
- Phone: Budget Android, 2-3 years old, sometimes slow

**Goal:** Know exactly what to do, by when, without guessing or asking. Feel competent and trusted.

**Frustrations:**
- Long WhatsApp messages buried under other messages
- Instructions like "pick up Tim from basketball at 4pm" arrive without enough context — where exactly? which gate?
- When confused, Maria feels embarrassed asking — so she guesses and sometimes gets it wrong
- No way to tell Sarah "I'm running late" without calling (which interrupts meetings)
- Sunday is her day off — tasks assigned Saturday night for Monday appear without warning

**Success looks like:** Maria opens the app at 7am, sees her task list for the day, knows the pickup location from the app, and completes everything without calling Sarah once.

**Failure looks like:** Maria calls Sarah 3 times today because instructions were unclear, disrupting her meeting twice.

---

### Persona 3: David Chen (Husband/Observer)

**Who:** 40-year-old finance director. Sarah's husband. Travels frequently for work (50% of the time in Singapore/Shanghai). Wants to stay informed about the family but can't actively coordinate.

**Context:** Laptop browser, different timezone, limited time to check in. Feels guilty about not being present. Relies on Sarah for everything.

**Constraints:**
- Laptop browser (not mobile)
- Different timezone (may be asleep when things happen)
- Wants read-only visibility, not more tasks
- Limited time — checks in 2-3x per day, 30 seconds each

**Goal:** In 30 seconds, know if the family is on track today. Feel connected without adding to Sarah's burden.

**Frustrations:**
- WhatsApp groups are noise — 500 messages he doesn't need to read
- Sarah texts him updates when he's in a meeting, adding to his stress
- He has no way to help from a different city

**Success looks like:** David opens his laptop, sees a one-line status: "Kids: on track. Maria: 3 tasks done, 1 in progress. Sarah: all clear." He closes the laptop.

**Failure looks like:** Sarah sends him a stressful voice memo at midnight about a coordination failure. He couldn't have helped anyway, but he feels guilty.

---

## User Journeys

### Journey 1: Sarah Creates a Task (In a Meeting)

**Setup:** Sarah is in a quarterly review meeting. It's 3:47pm. She just remembered Tim's basketball practice ends at 5pm and Maria needs to pick him up. She can't leave the meeting.

**Emotional state:** Stressed, rushed, one hand holding phone under the table.

**Steps:**
1. Sarah taps the app — sees the home screen (one thing: "What's next?")
2. Sarah taps "+" — form opens immediately (no navigation)
3. Sarah types "Basketball pickup" — field auto-suggests Tim
4. Sarah taps "Tim Chen" — assignee auto-filled as Maria
5. Sarah taps "Time" — picker shows 5:00pm, one tap
6. Sarah taps "Done" — task appears in the timeline

**Success:** Task assigned in 22 seconds, Maria received it. Sarah doesn't think about it again.

**Failure modes:**
- If the "+" button is buried → Sarah gives up and sends a WhatsApp
- If the form has more than 4 fields → Sarah abandons and WhatsApps Maria
- If the confirmation doesn't clearly show "Sent to Maria" → Sarah sends WhatsApp anyway to confirm

---

### Journey 2: Maria Checks Her Day (Morning, 7:15am)

**Setup:** Maria wakes up at 6:30am. Kids are not up yet. She has 30 minutes before the morning rush.

**Emotional state:** Calm, purposeful, wants to be ready for the day.

**Steps:**
1. Maria opens app — sees her task list for today
2. Each task shows: what, when, where, who
3. She swipes the first task — it expands with full details: school gate B, Tim's basketball bag is in the blue cubby, contact number if late
4. She swipes the next — grocery list for dinner, wet market opens at 8am
5. She completes "Wake kids for school" — taps checkmark, task moves to "Done"
6. Maria feels confident about today

**Success:** Maria knows her day. She completed a task. She feels trusted and informed.

**Failure modes:**
- If tasks are buried in a chat feed → she misses something and Sarah has to chase
- If the location is vague ("basketball") → she doesn't know which venue
- If she has to read a long message to understand → she skims and misses details

---

### Journey 3: Sarah Checks Family Status (Evening, 9pm)

**Setup:** Sarah is on the couch after kids are in bed. 5 minutes to herself. She wants to know if today went well and what tomorrow looks like.

**Emotional state:** Tired, wants reassurance, doesn't want to do mental math.

**Steps:**
1. Sarah opens app — sees "Tonight's Status"
2. Tasks completed today: 7/8 — the basketball pickup was 20 minutes late (traffic)
3. Tomorrow: 5 tasks scheduled, 2 with conflicts (Lily's piano at same time as Tim's swimming)
4. Sarah sees the conflict — taps it — sees a suggested resolution: "Ask David to pick up Tim from swimming at 4:30?"
5. Sarah taps "Ask David" — message sent to David's app

**Success:** Sarah saw a problem, solved it in 30 seconds, went back to relaxing.

**Failure modes:**
- If the app shows a wall of statistics → Sarah doesn't engage
- If the conflict is surfaced too late (5 minutes before) → can't be fixed
- If the suggested resolution is wrong → Sarah loses trust in the app

---

### Journey 4: Sarah Delegated Something Wrong (Maria Can't Do It)

**Setup:** Sarah assigned "Pick up Tim from basketball" but forgot to mention the gear bag. Maria arrives, Tim has no gear, practice is ruined.

**Emotional state:** Sarah feels guilty, frustrated with herself.

**Steps:**
1. Maria sees the task — doesn't know about the gear bag
2. Maria completes the task (pickup done) but leaves a note: "No gear bag today?"
3. Sarah sees the note at 6pm — she forgot the gear bag
4. Sarah adds a note to future basketball pickups: "ALWAYS check blue cubby for gear bag"
5. Next time: Maria sees the note, checks the cubby, success

**Success:** The system self-corrects. Sarah's mistake becomes institutional knowledge.

**Failure modes:**
- If Maria has no way to leave a note → she gets blamed for "forgetting"
- If Sarah can't add notes to tasks → same mistake happens next week
- If the mistake isn't visible → Sarah thinks Maria is incompetent

---

### Journey 5: David Checks In (From Singapore, 11pm HKT)

**Setup:** David is in a hotel in Singapore. It's 11pm HKT. Kids are asleep. He has 30 seconds before sleep.

**Emotional state:** Worried he's missing things, wants reassurance.

**Steps:**
1. David opens his laptop — sees the family dashboard
2. Status: "All tasks completed. Tomorrow: 4 tasks, no conflicts."
3. He scrolls down — sees a note from Maria: "Tim's school called — he left his reading folder"
4. David taps "Message Sarah" — sends a quick note
5. Sarah sees it in the morning, handles it

**Success:** David felt connected. He caught something Sarah might have missed. No stress.

**Failure modes:**
- If the dashboard shows everything → he panics at normal activity level
- If he has to dig for information → he gives up and texts Sarah (disrupts her)
- If the information is wrong → he makes a decision based on bad data

---

## Scenario Matrix

For each core feature, scenarios across different personas, contexts, and constraints.

### Feature 1: Create Task

| # | Persona | Context | Constraint | Emotional State | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|-----------------|---------------------|------------------|
| 1 | Sarah | In quarterly meeting | 30 seconds, one hand, can't leave | Stressed, rushing | Form too complex → abandons, WhatsApps instead | Creates task in ≤30s, ≤4 taps |
| 2 | Sarah | Walking to school pickup | Bright sunlight, phone in pocket | Distracted | Can't read small text, misses confirmation | Large buttons, high contrast, clear confirmation |
| 3 | Sarah | Late night, half-asleep | One hand, dark room | Tired, low attention | Wrong task created, forgets to assign | Auto-saves draft, assignee is obvious |
| 4 | Maria | Asks Sarah to create | Helper doesn't create — only receives | — | Sarah forgets to create → task not in app | Sarah can create from a note without opening full app |
| 5 | David | From laptop, different TZ | 30 seconds, read-only intent | Guilty, anxious | Tries to create task but interface is mobile-only | David's view shows "Sarah manages tasks" not a full create form |
| 6 | Sarah | Adding detail to existing task | After creating quickly, wants to add location | Less rushed now | Adding detail requires re-opening the whole task | One-tap "add detail" from task card |

### Feature 2: View My Tasks (Helper)

| # | Persona | Context | Constraint | Emotional State | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|-----------------|---------------------|------------------|
| 1 | Maria | Morning, 7:15am | Standing, bright sunlight, one hand | Calm, purposeful | Tasks buried in scroll → misses pickup | Tasks visible immediately, no scroll needed for today's priority |
| 2 | Maria | Wet market, noisy | One hand, wet fingers | Overwhelmed | Keyboard won't open, too many steps | Task cards tap-only, no text input required |
| 3 | Maria | Noon, school gate | Waiting for Tim, 3 minutes | Anxious about timing | No time to read long instructions | "What to do now" is one glance |
| 4 | Maria | Sunday evening | Planning Monday, at home | Reflective | Doesn't see tasks assigned for Monday yet | Sunday evening shows Monday's full schedule |
| 5 | Maria | Confused about a task | Doesn't understand instruction | Embarrassed, hesitant to call | App has no "Ask Sarah" button → calls Sarah | One-tap "Question" sends note to Sarah without calling |

### Feature 3: Family Timeline (Commander Dashboard)

| # | Persona | Context | Constraint | Emotional State | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|-----------------|---------------------|------------------|
| 1 | Sarah | 7:30am, coffee break | 30 seconds | Needs to know today | Too much information → skims, misses important | Top 3 priority tasks visible in one glance |
| 2 | Sarah | 5pm, just left meeting | Rushing to leave | Stressed, needs fast check | Page is slow to load → gives up, calls Maria | Dashboard loads in ≤2 seconds |
| 3 | Sarah | Sunday night | Planning the week | Thoughtful, methodical | Tasks for next week not visible → forgotten | Week view shows all 7 days, tasks visible without tapping |
| 4 | Sarah | Checking if Maria is on track | Glancing during meeting | Distracted | Status unclear → texts Maria "are you done?" | Status badge: "On track" / "Running late" / "Needs help" |

### Feature 4: Task Completion & Confirmation

| # | Persona | Context | Constraint | Emotional State | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|-----------------|---------------------|------------------|
| 1 | Maria | Completed a task | Just finished, one hand | Satisfied, wants recognition | No way to mark done → app feels useless | One-tap checkmark, confirmation shown immediately |
| 2 | Maria | Completed but something missing | Task done but gear forgotten | Anxious, doesn't want blame | Can't leave a note → Sarah blames her next time | "Add note" on completion, note visible to Sarah |
| 3 | Sarah | Receives completion notification | In meeting, glances at phone | Relieved | Notification buried under 100 other notifications | Completion appears in timeline, clearly visible |
| 4 | Sarah | Sees task marked done but wrong | Maria completed but forgot gear | Frustrated, guilty | Has to chase via WhatsApp to find out what happened | Completion note visible in timeline, no chasing needed |

### Feature 5: Conflict / Escalation Detection

| # | Persona | Context | Constraint | Emotional State | What Could Go Wrong | Success Criteria |
|---|---------|---------|------------|-----------------|---------------------|------------------|
| 1 | Sarah | 4pm — two pickups at same time | 5 minutes to fix | Panic | Doesn't notice until it's too late | Conflict detected 2 hours in advance, notification sent |
| 2 | Sarah | Maria is 30 minutes late | No information | Anxiety | Calling Maria disrupts her, not calling leaves kids waiting | App shows "Maria is running late (30 min)" — no calling needed |
| 3 | David | Wants to help from Singapore | Laptop, no mobile app | Helpless, guilty | App shows nothing he can do → feels excluded | David can "help" a task — sends suggestion to Sarah |

---

## Gap Analysis

### 1. Does each journey end with the persona achieving their goal AND feeling good?

- Journey 1 (Sarah creates task): Task created, but does Sarah feel confident Maria understood it? **Gap: confirmation clarity**
- Journey 2 (Maria checks tasks): She knows her day. Does she feel trusted or monitored? **Opportunity: language of agency, not surveillance**
- Journey 3 (Sarah checks status): She solved a conflict in 30 seconds. Does she feel in control? **Opportunity: proactive conflict detection**
- Journey 4 (Mistake caught): The system self-corrects. Does Sarah trust it more or feel embarrassed? **Opportunity: "lessons learned" framing**

### 2. If a persona abandons at any step — why?

- Journey 1, Step 3: If Sarah can't type quickly, she abandons → **Gap: voice input for task creation**
- Journey 2, Step 3: If task details are vague, Maria calls Sarah → **Gap: mandatory location/contact for each task**
- Journey 3, Step 4: If suggested resolution is wrong, Sarah loses trust → **Gap: AI suggestions must be obviously correct or opt-in**

### 3. Are there journeys for unhappy cases?

- **Network offline:** Maria is at the wet market with no data → **Scenario needed: offline task list**
- **Sarah forgot to assign:** Sunday night planning missed a Monday task → **Scenario needed: "Unassigned tasks" reminder**
- **Helper goes dark:** Maria's phone died → **Scenario needed: escalation after X hours of silence**
- **Wrong person assigned:** Sarah meant to assign David, not Maria → **Scenario needed: reassign flow**

### 4. Does each persona see DIFFERENT content?

- Sarah sees: full command centre, all tasks, all family members
- Maria sees: her tasks only, simple language, icons not text
- David sees: family status summary, can't create tasks (read-only)

**Gap:** David's observer role needs a distinct UI — not just "Sarah's view with fewer buttons."

### 5. UX Delight Check

- At each step: would the user feel **capable and confident**? Or **overwhelmed and anxious**?
- Maria's view should feel like a **personal assistant**, not a surveillance dashboard
- Sarah's view should feel like a **command centre**, not a to-do list
- David's view should feel like **reassurance**, not information overload

### 6. Empathy Check

Imagine you ARE Sarah: 38, running a household and a career, your helper's performance reflects on you, your kids' wellbeing is your responsibility. You're reading this app on a Sunday night planning the week.

**Would you want to use this product?**

The answer determines everything.

---

## Core Features (Prioritized)

### P0 — Must Have (Phase 1 MVP)
1. **Quick Task Capture** — Sarah creates a task in ≤30 seconds, one-handed
2. **Helper Task View** — Maria sees today's tasks, one screen, clear and simple
3. **Task Completion** — One-tap done, confirmation to Sarah
4. **Family Timeline** — Sarah sees all tasks, statuses, in one view

### P1 — Essential (Before Phase 2)
5. **Task Notes** — Maria can ask a question or leave a note on any task
6. **Conflict Detection** — System flags scheduling conflicts automatically
7. **Status Badges** — "On track" / "Late" / "Needs help" visible at a glance

### P2 — Important (Before Ship)
8. **Offline Mode** — Maria sees cached tasks without data
9. **Push Notifications** — When task assigned, when deadline approaches
10. **Week View** — Full week at a glance for Sunday planning

---

## Verification Criteria

*To be derived from journey steps and scenario matrix. This section expanded in docs/verification-criteria.md after Phase 1b gate.*
