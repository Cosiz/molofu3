# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scenarios.spec.ts >> N001: Maria adds a note to piano lesson task
- Location: tests/scenarios.spec.ts:122:1

# Error details

```
Test timeout of 15000ms exceeded.
```

```
Error: locator.fill: Test timeout of 15000ms exceeded.
Call log:
  - waiting for locator('input[placeholder*="Ask a question"]')

```

# Test source

```ts
  28  |   await expect(page.locator('.task-title').first()).toContainText('CT1_create_task');
  29  | });
  30  | 
  31  | test('C002: Task creation with description and location', async ({ page }) => {
  32  |   await go(page, '/commander');
  33  |   await page.click('.fab');
  34  |   const unique = 'CT2_desc_loc_' + Date.now();
  35  |   await page.fill('input[placeholder*="Pick up Tim"]', unique);
  36  |   await page.fill('textarea[placeholder*="Gate B"]', 'Test description');
  37  |   await page.fill('input[placeholder*="Kowloon Cricket"]', 'Test Location XYZ');
  38  |   await page.click('button[type="submit"]');
  39  |   await page.waitForTimeout(300);
  40  |   // Task visible in list
  41  |   await expect(page.getByText(unique)).toBeVisible();
  42  | });
  43  | 
  44  | test('C003: Task creates with default assignee (Maria)', async ({ page }) => {
  45  |   await go(page, '/commander');
  46  |   await page.click('.fab');
  47  |   const unique = 'CT3_default_assignee_' + Date.now();
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
> 128 |   await noteInput.fill('N001_note_test_' + Date.now());
      |                   ^ Error: locator.fill: Test timeout of 15000ms exceeded.
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
  148 |   await expect(page.locator('.task-note').first()).toContainText('N002_read_note');
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
```