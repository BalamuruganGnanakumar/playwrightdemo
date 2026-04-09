# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Loginlogout.spec.js >> Login with HMH Wrong password
- Location: tests\Loginlogout.spec.js:86:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://pdm.care.spi-dev.dex.care/departments", waiting until "load"

```

# Test source

```ts
  1   | // @ts-check
  2   | /**
  3   |  * Playwright E2E Tests — HMH Login Scenarios
  4   |  * Application: DexCare PDM
  5   |  * Base URL: https://pdm.care.spi-dev.dex.care
  6   |  */
  7   | 
  8   | import { test, expect } from '@playwright/test';
  9   | import * as allure from "allure-js-commons";
  10  | 
  11  | /**
  12  |  * Test: Successful login with valid HMH credentials.
  13  |  * Steps:
  14  |  *   1. Navigate to the departments page.
  15  |  *   2. Click the "Continue with HMH Users" button.
  16  |  *   3. Enter valid username and password.
  17  |  *   4. Submit the login form.
  18  |  *   5. Verify the app title returns to 'DexCare PDM'.
  19  |  *   6. Log out.
  20  |  */
  21  | test('Login with HMH Users with right credentials', async ({ page }) => {
  22  |   // Navigate to the departments page and verify the app title
  23  |   //await allure.severity('Major');
  24  |   await page.goto('https://pdm.care.spi-dev.dex.care/departments');
  25  |   await expect(page).toHaveTitle('DexCare PDM');
  26  | 
  27  |   // Click the HMH login provider button
  28  |   await page.locator("//button[normalize-space()='Continue with HMH Users']//*[name()='svg']").click();
  29  | 
  30  |   // Verify redirect to the HMH login page
  31  |   await expect(page).toHaveTitle('Log in | PDM WebApp');
  32  | 
  33  |   // Enter valid credentials and submit
  34  |   await page.locator('#username').fill('dexcare.team@periscope-tech.com');
  35  |   await page.locator('#password').fill('devtest@1234');
  36  |   await page.getByText('Continue', { exact: true }).click();
  37  | 
  38  |   // Verify successful login by checking the app title
  39  |   await expect(page).toHaveTitle('DexCare PDM');
  40  | 
  41  |   // Log out to clean up session
  42  |   await page.getByText('Logout').click();
  43  | });
  44  | 
  45  | /**
  46  |  * Test: Login attempt with an incorrect username.
  47  |  * Steps:
  48  |  *   1. Navigate to the departments page.
  49  |  *   2. Click the "Continue with HMH Users" button.
  50  |  *   3. Enter a wrong username with a valid password.
  51  |  *   4. Submit the login form.
  52  |  *   5. Verify that an error message is displayed.
  53  |  */
  54  | test('Login with HMH Wrong Username', async ({ page }) => {
  55  |   //await allure.severity('Medium');
  56  |   // Navigate to the departments page and verify the app title
  57  |   await page.goto('https://pdm.care.spi-dev.dex.care/departments');
  58  |   await expect(page).toHaveTitle('DexCare PDM');
  59  | 
  60  |   // Click the HMH login provider button
  61  |   await page.locator("//button[normalize-space()='Continue with HMH Users']//*[name()='svg']").click();
  62  | 
  63  |   // Verify redirect to the HMH login page
  64  |   await expect(page).toHaveTitle('Log in | PDM WebApp');
  65  | 
  66  |   // Enter an invalid username and a valid password, then submit
  67  |   await page.locator('#username').fill('wrong.username@periscope-tech.com');
  68  |   await page.locator('#password').fill('devtest@1234');
  69  |   await page.getByText('Continue', { exact: true }).click();
  70  | 
  71  |   // Verify that the error message is visible
  72  |   await expect(page.getByText('Wrong email or password')).toBeVisible();
  73  | 
  74  |   await page.close();
  75  | });
  76  | 
  77  | /**
  78  |  * Test: Login attempt with an incorrect password.
  79  |  * Steps:
  80  |  *   1. Navigate to the departments page.
  81  |  *   2. Click the "Continue with HMH Users" button.
  82  |  *   3. Enter a valid username with a wrong password.
  83  |  *   4. Submit the login form.
  84  |  *   5. Verify that an error message is displayed.
  85  |  */
  86  | test('Login with HMH Wrong password', async ({ page }) => {
  87  |   //await allure.severity('Minor');
  88  |   // Navigate to the departments page and verify the app title
> 89  |   await page.goto('https://pdm.care.spi-dev.dex.care/departments');
      |              ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  90  |   await expect(page).toHaveTitle('DexCare PDM');
  91  | 
  92  |   // Click the HMH login provider button
  93  |   await page.locator("//button[normalize-space()='Continue with HMH Users']//*[name()='svg']").click();
  94  | 
  95  |   // Verify redirect to the HMH login page
  96  |   await expect(page).toHaveTitle('Log in | PDM WebApp');
  97  | 
  98  |   // Enter a valid username and an invalid password, then submit
  99  |   await page.locator('#username').fill('dexcare.team@periscope-tech.com');
  100 |   await page.locator('#password').fill('wrongpassword');
  101 |   await page.getByText('Continue', { exact: true }).click();
  102 | 
  103 |   // Verify that the error message is visible
  104 |   await expect(page.getByText('Wrong email or password')).toBeVisible();
  105 | 
  106 |   await page.close();
  107 | });
  108 | 
  109 | 
```