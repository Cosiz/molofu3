# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scenarios.spec.ts >> N002: Sarah reads a note left by Maria on piano task
- Location: tests/scenarios.spec.ts:134:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.task-note').first()
Expected substring: "N002_read_note"
Received string:    "Maria Santos: Traffic looks bad — may be 10 min late. Is that OK?"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('.task-note').first()
    9 × locator resolved to <div class="task-note">…</div>
      - unexpected value "Maria Santos: Traffic looks bad — may be 10 min late. Is that OK?"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e5]:
    - button "←" [ref=e6] [cursor=pointer]
    - generic [ref=e7]:
      - heading "Task Detail" [level=1] [ref=e8]
      - paragraph [ref=e9]: Tap to go back
  - generic [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e13]: ⚠️ Needs help
      - generic [ref=e14]: Take Lily to piano lesson
      - generic [ref=e15]: Grade 3 exam prep — bring sight-reading book.
    - generic [ref=e16]:
      - generic [ref=e17]:
        - generic [ref=e18]: Who
        - generic [ref=e19]: 👤 Maria Santos
      - generic [ref=e20]:
        - generic [ref=e21]: When
        - generic [ref=e22]: ⏰ 16:00
      - generic [ref=e23]:
        - generic [ref=e24]: Where
        - generic [ref=e25]: 📍 Mrs. Lam Piano Studio, 3/F, 42 Java Rd
      - generic [ref=e26]:
        - generic [ref=e27]: Contact
        - generic [ref=e28]: "📞 Mrs. Lam: 6555 1234"
    - generic [ref=e29]:
      - generic [ref=e30]: Notes
      - generic [ref=e32]:
        - generic [ref=e33]: "Maria Santos:"
        - text: Traffic looks bad — may be 10 min late. Is that OK?
```

# Test source

```ts
  48  |   await page.fill('input[placeholder*="Pick up Tim"]', unique);
  49  |   await page.click('button[type="submit"]');
  50  |   await page.waitForTimeout(300);
  51  |   await expect(page.getByText(unique)).toBeVisible();
  52  | });
  53  | 
  54  | test('C004: Empty title — form validation', async ({ page }) => {
  55  |   await go(page, '/commander');
  56  |   await page.click('.fab');
  57  |   await page.click('button[type="submit"]');
  58  |   await expect(page.locator('.modal h2')).toBeVisible();
  59  | });
  60  | 
  61  | test('C005: Voice input button NOT present on task form', async ({ page }) => {
  62  |   await go(page, '/commander');
  63  |   await page.click('.fab');
  64  |   const voiceBtn = page.locator('button[aria-label*="voice"], button:has-text("🎤"), button:has-text("Mic"), button:has-text("Voice")');
  65  |   await expect(voiceBtn).toHaveCount(0);
  66  | });
  67  | 
  68  | // ─── CATEGORY: Helper Task View ──────────────────────────────
  69  | test('V001: Maria sees her tasks on app open', async ({ page }) => {
  70  |   await go(page, '/helper');
  71  |   await expect(page.locator('h1')).toContainText('Good morning, Maria');
  72  |   const taskCards = page.locator('.task-card');
  73  |   const count = await taskCards.count();
  74  |   expect(count).toBeGreaterThanOrEqual(1);
  75  | });
  76  | 
  77  | test('V002: Maria sees what/when/where on task detail', async ({ page }) => {
  78  |   await go(page, '/helper');
  79  |   // Click first .task-card div (not quick-action-btn)
  80  |   await page.locator('.task-card').first().click();
  81  |   await page.waitForLoadState('networkidle');
  82  |   // Check time field is visible in detail view
  83  |   const timeLabel = page.locator('.detail-label:has-text("When")');
  84  |   await expect(timeLabel).toBeVisible();
  85  | });
  86  | 
  87  | test('V003: Helper view — no keyboard required to review tasks', async ({ page }) => {
  88  |   await go(page, '/helper');
  89  |   // Just verify the task list is visible
  90  |   await expect(page.locator('.scroll-list')).toBeVisible();
  91  | });
  92  | 
  93  | test('V004: Maria sees status badge per task', async ({ page }) => {
  94  |   await go(page, '/helper');
  95  |   const badges = page.locator('.status-badge');
  96  |   const count = await badges.count();
  97  |   expect(count).toBeGreaterThanOrEqual(1);
  98  | });
  99  | 
  100 | test('V005: Tasks sorted — needs_help first', async ({ page }) => {
  101 |   await go(page, '/helper');
  102 |   // Piano (t4, needs_help) should be first in sorted list
  103 |   const firstCard = page.locator('.task-card').first();
  104 |   await expect(firstCard.locator('.task-title')).toContainText('Piano');
  105 | });
  106 | 
  107 | test('V006: Completed tasks NOT shown in main list', async ({ page }) => {
  108 |   await go(page, '/helper');
  109 |   const allTaskCards = await page.locator('.task-title').allTextContents();
  110 |   expect(allTaskCards.join(' ')).not.toContain('groceries');
  111 |   expect(allTaskCards.join(' ')).not.toContain('Wake kids');
  112 | });
  113 | 
  114 | test('V007: Single-day view — no week/date navigation exists', async ({ page }) => {
  115 |   await go(page, '/helper');
  116 |   const navButtons = page.locator('button:has-text("Yesterday"), button:has-text("Tomorrow"), button:has-text("Week"), button:has-text("Next day"), button:has-text("Prev")');
  117 |   const navCount = await navButtons.count();
  118 |   expect(navCount).toBe(0);
  119 | });
  120 | 
  121 | // ─── CATEGORY: Notes ─────────────────────────────────────────
  122 | test('N001: Maria adds a note to piano lesson task', async ({ page }) => {
  123 |   await go(page, '/helper');
  124 |   // Click the piano task card specifically
  125 |   await page.locator('.task-card:has-text("Piano")').click();
  126 |   await page.waitForLoadState('networkidle');
  127 |   const noteInput = page.locator('input[placeholder*="Ask a question"]');
  128 |   await noteInput.fill('N001_note_test_' + Date.now());
  129 |   await page.click('.note-send-btn');
  130 |   await page.waitForTimeout(300);
  131 |   await expect(page.locator('.task-note').first()).toBeVisible();
  132 | });
  133 | 
  134 | test('N002: Sarah reads a note left by Maria on piano task', async ({ page }) => {
  135 |   // First: Maria adds a note
  136 |   await go(page, '/helper');
  137 |   await page.locator('.task-card:has-text("Piano")').click();
  138 |   await page.waitForLoadState('networkidle');
  139 |   const noteInput = page.locator('input[placeholder*="Ask a question"]');
  140 |   const noteText = 'N002_read_note_' + Date.now();
  141 |   await noteInput.fill(noteText);
  142 |   await page.click('.note-send-btn');
  143 |   await page.waitForTimeout(300);
  144 |   // Navigate to Sarah
  145 |   await go(page, '/commander');
  146 |   await page.locator('.task-card:has-text("Piano")').click();
  147 |   await page.waitForLoadState('networkidle');
> 148 |   await expect(page.locator('.task-note').first()).toContainText('N002_read_note');
      |                                                    ^ Error: expect(locator).toContainText(expected) failed
  149 | });
  150 | 
  151 | test('N003: [BUG CONFIRMED] Sarah cannot add a note — input gated to helper only', async ({ page }) => {
  152 |   await go(page, '/commander');
  153 |   await page.locator('.task-card').first().click();
  154 |   await page.waitForLoadState('networkidle');
  155 |   const noteInputWrap = page.locator('.note-input-wrap');
  156 |   // BUG CONFIRMED: Sarah has no note input
  157 |   await expect(noteInputWrap).toHaveCount(0);
  158 | });
  159 | 
  160 | test('N004: Multiple notes visible in thread on piano task', async ({ page }) => {
  161 |   await go(page, '/helper');
  162 |   await page.locator('.task-card:has-text("Piano")').click();
  163 |   await page.waitForLoadState('networkidle');
  164 |   const notes = page.locator('.task-note');
  165 |   const count = await notes.count();
  166 |   // Piano already has a note in mock data + our N001 added another
  167 |   expect(count).toBeGreaterThanOrEqual(1);
  168 | });
  169 | 
  170 | test('N005: Observer can see tasks', async ({ page }) => {
  171 |   await go(page, '/observer');
  172 |   const observerTaskRows = page.locator('.observer-task-row');
  173 |   const count = await observerTaskRows.count();
  174 |   expect(count).toBeGreaterThanOrEqual(1);
  175 | });
  176 | 
  177 | // ─── CATEGORY: Task Completion ────────────────────────────────
  178 | test('K001: Maria quick-completes a task via Quick Complete', async ({ page }) => {
  179 |   await go(page, '/helper');
  180 |   // Use basketball task — hasn't been touched yet
  181 |   const basketballBtn = page.locator('.quick-action-btn:has-text("basketball")');
  182 |   await basketballBtn.click();
  183 |   await page.waitForTimeout(500);
  184 |   // Button should disappear (task completed)
  185 |   await expect(basketballBtn).not.toBeVisible();
  186 | });
  187 | 
  188 | test('K002: Maria completes task via detail view with note', async ({ page }) => {
  189 |   await go(page, '/helper');
  190 |   // Click piano task
  191 |   await page.locator('.task-card:has-text("Piano")').click();
  192 |   await page.waitForLoadState('networkidle');
  193 |   const noteInput = page.locator('input[placeholder*="Ask a question"]');
  194 |   await noteInput.fill('K002_completion_note');
  195 |   await page.click('.note-send-btn');
  196 |   await page.waitForTimeout(200);
  197 |   await page.click('.complete-btn');
  198 |   await page.waitForTimeout(300);
  199 |   // Should navigate back to dashboard
  200 |   await expect(page).not.toHaveURL(/\/task\//);
  201 | });
  202 | 
  203 | test('K003: Sarah sees task marked complete by Maria', async ({ page }) => {
  204 |   // First complete basketball as Maria
  205 |   await go(page, '/helper');
  206 |   await page.locator('.quick-action-btn:has-text("basketball")').click();
  207 |   await page.waitForTimeout(500);
  208 |   // Now switch to Sarah
  209 |   await go(page, '/commander');
  210 |   // Basketball should show completed badge
  211 |   const completedBadge = page.locator('.task-card:has-text("basketball") .badge-completed, .task-card:has-text("basketball") .status-badge:has-text("✓ Done")');
  212 |   await expect(completedBadge.first()).toBeVisible();
  213 | });
  214 | 
  215 | test('K004: [BUG] Sarah cannot see notes on tasks she views', async ({ page }) => {
  216 |   // Maria adds a note to piano task
  217 |   await go(page, '/helper');
  218 |   await page.locator('.task-card:has-text("Piano")').click();
  219 |   await page.waitForLoadState('networkidle');
  220 |   await page.locator('input[placeholder*="Ask a question"]').fill('K004_sarah_read_test');
  221 |   await page.click('.note-send-btn');
  222 |   await page.waitForTimeout(200);
  223 |   await page.click('.complete-btn');
  224 |   await page.waitForTimeout(300);
  225 |   // Sarah tries to see the note
  226 |   await go(page, '/commander');
  227 |   await page.locator('.task-card:has-text("Piano")').click();
  228 |   await page.waitForLoadState('networkidle');
  229 |   // BUG: Sarah can see existing notes in the thread (from mock data) but the note she left as K002 won't be visible
  230 |   // The task is now completed so she sees it... but the key bug is N003
  231 |   await expect(page.locator('.task-note').first()).toBeVisible();
  232 | });
  233 | 
  234 | test('K005: Task detail → mark complete → navigates back', async ({ page }) => {
  235 |   await go(page, '/helper');
  236 |   await page.locator('.task-card').first().click();
  237 |   await page.waitForLoadState('networkidle');
  238 |   await page.click('.complete-btn');
  239 |   await page.waitForTimeout(500);
  240 |   await expect(page).not.toHaveURL(/\/task\//);
  241 | });
  242 | 
  243 | // ─── CATEGORY: Needs Help ─────────────────────────────────────
  244 | test('H001: [GAP] Maria has NO UI to mark task as needs_help', async ({ page }) => {
  245 |   await go(page, '/helper');
  246 |   await page.locator('.task-card').first().click();
  247 |   await page.waitForLoadState('networkidle');
  248 |   const needsHelpBtn = page.locator('button:has-text("Needs Help"), button:has-text("⚠️ Help"), button:has-text("Mark as needs help")');
```