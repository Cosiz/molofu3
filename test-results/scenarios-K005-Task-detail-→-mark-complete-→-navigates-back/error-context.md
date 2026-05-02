# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scenarios.spec.ts >> K005: Task detail → mark complete → navigates back
- Location: tests/scenarios.spec.ts:234:1

# Error details

```
Error: page.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('.complete-btn')

```

```
Error: write EPIPE
```

# Test source

```ts
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
  229 |   // BUG: Sarah can see existing notes in the thread (from mock data) but the note she left as K002 won't be visible
  230 |   // The task is now completed so she sees it... but the key bug is N003
  231 |   await expect(page.locator('.task-note').first()).toBeVisible();
  232 | });
  233 | 
  234 | test('K005: Task detail → mark complete → navigates back', async ({ page }) => {
  235 |   await go(page, '/helper');
  236 |   await page.locator('.task-card').first().click();
  237 |   await page.waitForLoadState('networkidle');
> 238 |   await page.click('.complete-btn');
      |   ^ Error: write EPIPE
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
  249 |   await expect(needsHelpBtn).toHaveCount(0);
  250 | });
  251 | 
  252 | test('H002: Sarah sees needs_help count > 0 in dashboard stats', async ({ page }) => {
  253 |   await go(page, '/commander');
  254 |   // Needs help stat is the 3rd stat card
  255 |   const statNums = await page.locator('.stat-num').allTextContents();
  256 |   expect(parseInt(statNums[2])).toBeGreaterThanOrEqual(1);
  257 | });
  258 | 
  259 | test('H003: t4 Piano lesson shows ⚠️ Needs help badge', async ({ page }) => {
  260 |   await go(page, '/commander');
  261 |   await expect(page.locator('.status-badge:has-text("⚠️ Help")').first()).toBeVisible();
  262 | });
  263 | 
  264 | // ─── CATEGORY: Week View / Calendar ───────────────────────────
  265 | test('W001: [GAP] Commander has NO week view / calendar strip', async ({ page }) => {
  266 |   await go(page, '/commander');
  267 |   const weekNav = page.locator('.week-strip, .calendar-nav, .date-picker, [class*="calendar"]');
  268 |   await expect(weekNav).toHaveCount(0);
  269 | });
  270 | 
  271 | test('W002: [GAP] Cannot create task for tomorrow via UI (no date picker)', async ({ page }) => {
  272 |   await go(page, '/commander');
  273 |   await page.click('.fab');
  274 |   const datePicker = page.locator('input[type="date"]');
  275 |   await expect(datePicker).toHaveCount(0);
  276 | });
  277 | 
  278 | test('W003: [GAP] No conflict detection for overlapping times', async ({ page }) => {
  279 |   await go(page, '/commander');
  280 |   await page.click('.fab');
  281 |   await page.fill('input[placeholder*="Pick up Tim"]', 'W003_conflict_1');
  282 |   await page.fill('input[type="time"]', '16:00');
  283 |   await page.click('button[type="submit"]');
  284 |   await page.waitForTimeout(300);
  285 |   await page.click('.fab');
  286 |   await page.fill('input[placeholder*="Pick up Tim"]', 'W003_conflict_2');
  287 |   await page.fill('input[type="time"]', '16:00');
  288 |   await page.click('button[type="submit"]');
  289 |   await page.waitForTimeout(300);
  290 |   const warning = page.locator('.conflict-warning, [class*="conflict"], .alert-warning:has-text("conflict")');
  291 |   await expect(warning).toHaveCount(0);
  292 | });
  293 | 
  294 | // ─── CATEGORY: GPS / Location ─────────────────────────────────
  295 | test('G001: Commander enters location as free text', async ({ page }) => {
  296 |   await go(page, '/commander');
  297 |   await page.click('.fab');
  298 |   const unique = 'G001_loc_test_' + Date.now();
  299 |   await page.fill('input[placeholder*="Pick up Tim"]', unique);
  300 |   await page.fill('input[placeholder*="Kowloon Cricket"]', 'G001 Test Location');
  301 |   await page.click('button[type="submit"]');
  302 |   await page.waitForTimeout(300);
  303 |   await expect(page.getByText(unique)).toBeVisible();
  304 | });
  305 | 
  306 | test('G002: [GAP] NO GPS auto-detect button in location field', async ({ page }) => {
  307 |   await go(page, '/commander');
  308 |   await page.click('.fab');
  309 |   const gpsBtn = page.locator('button[aria-label*="location"], button:has-text("📍"), button:has-text("GPS"), button:has-text("Detect"), button:has-text("Current location")');
  310 |   await expect(gpsBtn).toHaveCount(0);
  311 | });
  312 | 
  313 | test('G003: Maria sees location on her task list', async ({ page }) => {
  314 |   await go(page, '/helper');
  315 |   const location = page.locator('.task-location');
  316 |   const count = await location.count();
  317 |   expect(count).toBeGreaterThanOrEqual(1);
  318 | });
  319 | 
  320 | test('G004: [GAP] No map/tap-to-open in Maps from TaskDetail', async ({ page }) => {
  321 |   await go(page, '/helper');
  322 |   await page.locator('.task-card').first().click();
  323 |   await page.waitForLoadState('networkidle');
  324 |   const mapsBtn = page.locator('button:has-text("Map"), button:has-text("Maps"), a[href*="maps"], button:has-text("📍 Open"), button:has-text("Open in")');
  325 |   await expect(mapsBtn).toHaveCount(0);
  326 | });
  327 | 
  328 | // ─── CATEGORY: Observer ──────────────────────────────────────
  329 | test('O001: David sees family status summary', async ({ page }) => {
  330 |   await go(page, '/observer');
  331 |   await expect(page.locator('h1')).toContainText('David');
  332 |   const statCards = page.locator('.stat-card');
  333 |   await expect(statCards).toHaveCount(3);
  334 | });
  335 | 
  336 | test('O002: David sees needs_help banner when Maria has escalated tasks', async ({ page }) => {
  337 |   await go(page, '/observer');
  338 |   const bannerText = await page.locator('.alert-banner').textContent();
```