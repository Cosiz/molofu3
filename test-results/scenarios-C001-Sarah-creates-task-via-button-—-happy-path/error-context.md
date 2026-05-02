# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scenarios.spec.ts >> C001: Sarah creates task via + button — happy path
- Location: tests/scenarios.spec.ts:17:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.task-title').first()
Expected substring: "CT1_create_task"
Received string:    "Take Lily to piano lesson"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('.task-title').first()
    9 × locator resolved to <div class="task-title">Take Lily to piano lesson</div>
      - unexpected value "Take Lily to piano lesson"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "Good morning, Sarah" [level=1] [ref=e5]
    - paragraph [ref=e6]: Chen Family
    - generic [ref=e7]: Commander
  - generic [ref=e8]:
    - generic [ref=e10]:
      - button "‹" [ref=e11] [cursor=pointer]
      - button "Sun 26" [ref=e12] [cursor=pointer]:
        - generic [ref=e13]: Sun
        - generic [ref=e14]: "26"
      - button "Mon 27" [ref=e15] [cursor=pointer]:
        - generic [ref=e16]: Mon
        - generic [ref=e17]: "27"
      - button "Tue 28" [ref=e18] [cursor=pointer]:
        - generic [ref=e19]: Tue
        - generic [ref=e20]: "28"
      - button "Wed 29" [ref=e21] [cursor=pointer]:
        - generic [ref=e22]: Wed
        - generic [ref=e23]: "29"
      - button "Thu 30" [ref=e24] [cursor=pointer]:
        - generic [ref=e25]: Thu
        - generic [ref=e26]: "30"
      - button "Fri 1" [ref=e27] [cursor=pointer]:
        - generic [ref=e28]: Fri
        - generic [ref=e29]: "1"
      - button "Sat 2" [ref=e30] [cursor=pointer]:
        - generic [ref=e31]: Sat
        - generic [ref=e32]: "2"
      - button "›" [ref=e33] [cursor=pointer]
    - generic [ref=e35]: 📍 GPS tracking — coming soon
    - generic [ref=e37]:
      - generic [ref=e38]:
        - generic [ref=e39]: 2/5
        - generic [ref=e40]: Done today
      - generic [ref=e41]:
        - generic [ref=e42]: "3"
        - generic [ref=e43]: In progress
      - generic [ref=e44]:
        - generic [ref=e45]: "1"
        - generic [ref=e46]: Needs help
    - generic [ref=e47]:
      - generic [ref=e48]: Today's Tasks
      - generic [ref=e49]:
        - generic [ref=e50] [cursor=pointer]:
          - generic [ref=e51]:
            - generic [ref=e53]: Take Lily to piano lesson
            - generic [ref=e54]: ⚠️ Help
          - generic [ref=e55]:
            - generic [ref=e56]: ⏰ 16:00
            - generic [ref=e57]: 👤 Maria Santos
          - generic [ref=e58]: 📍 Mrs. Lam Piano Studio, 3/F, 42 Java Rd
          - generic [ref=e60]:
            - generic [ref=e61]: "Maria Santos:"
            - text: Traffic looks bad — may be 10 min late. Is that OK?
        - generic [ref=e62] [cursor=pointer]:
          - generic [ref=e63]:
            - generic [ref=e65]: Pick up Tim from basketball
            - generic [ref=e66]: ○ Pending
          - generic [ref=e67]:
            - generic [ref=e68]: ⏰ 17:00
            - generic [ref=e69]: 👤 Maria Santos
          - generic [ref=e70]: 📍 Kowloon Cricket Club, Gate B
        - generic [ref=e71] [cursor=pointer]:
          - generic [ref=e72]:
            - generic [ref=e74]: CT1_create_task_playwright_1777714048255
            - generic [ref=e75]: ○ Pending
          - generic [ref=e76]:
            - generic [ref=e77]: ⏰ 16:00
            - generic [ref=e78]: 👤 Maria Santos
        - generic [ref=e79] [cursor=pointer]:
          - generic [ref=e80]:
            - generic [ref=e82]: Buy groceries for dinner
            - generic [ref=e83]: ✓ Done
          - generic [ref=e84]:
            - generic [ref=e85]: ⏰ 09:00
            - generic [ref=e86]: 👤 Maria Santos
          - generic [ref=e87]: 📍 Kowloon Wet Market
        - generic [ref=e88] [cursor=pointer]:
          - generic [ref=e89]:
            - generic [ref=e91]: Wake kids for school
            - generic [ref=e92]: ✓ Done
          - generic [ref=e93]:
            - generic [ref=e94]: ⏰ 07:00
            - generic [ref=e95]: 👤 Maria Santos
          - generic [ref=e96]: 📍 Home
  - button "+" [ref=e97] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect, Page } from '@playwright/test';
  2   | 
  3   | const BASE = 'http://localhost:5173';
  4   | 
  5   | // ─── Fresh page helper ────────────────────────────────────────
  6   | async function freshPage(page: Page) {
  7   |   // Already using 1 worker — use new context per test
  8   | }
  9   | 
  10  | // ─── Route helper ─────────────────────────────────────────────
  11  | async function go(page: Page, path: string) {
  12  |   await page.goto(BASE + path);
  13  |   await page.waitForLoadState('networkidle');
  14  | }
  15  | 
  16  | // ─── CATEGORY: Create Task ───────────────────────────────────
  17  | test('C001: Sarah creates task via + button — happy path', async ({ page }) => {
  18  |   await go(page, '/commander');
  19  |   await expect(page.locator('h1')).toContainText('Good morning, Sarah');
  20  |   await page.click('.fab');
  21  |   await expect(page.locator('.modal h2')).toContainText('New Task');
  22  |   // Use unique title to avoid state pollution
  23  |   await page.fill('input[placeholder*="Pick up Tim"]', 'CT1_create_task_playwright_' + Date.now());
  24  |   await page.selectOption('select', 'u2');
  25  |   await page.fill('input[type="time"]', '16:00');
  26  |   await page.click('button[type="submit"]');
  27  |   await page.waitForTimeout(300);
> 28  |   await expect(page.locator('.task-title').first()).toContainText('CT1_create_task');
      |                                                     ^ Error: expect(locator).toContainText(expected) failed
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
  128 |   await noteInput.fill('N001_note_test_' + Date.now());
```