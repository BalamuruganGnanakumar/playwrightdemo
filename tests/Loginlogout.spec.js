// @ts-check
/**
 * Playwright E2E Tests — HMH Login Scenarios
 * Application: DexCare PDM
 * Base URL: https://pdm.care.spi-dev.dex.care
 */

import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";
import { getLocators } from '../objects/Loginlogout_loc.spec.js';

/**
 * Test: Successful login with valid HMH credentials.
 * Steps:
 *   1. Navigate to the departments page.
 *   2. Click the "Continue with HMH Users" button.
 *   3. Enter valid username and password.
 *   4. Submit the login form.
 *   5. Verify the app title returns to 'DexCare PDM'.
 *   6. Log out.
 */
test('Login with HMH Users with right credentials', async ({ page }) => {
  const loc = getLocators(page);

  // Navigate to the login page and verify the app title
  //await allure.severity('Major');
  await page.goto('https://pdm.care.spi-dev.dex.care/login');
  await expect(page).toHaveTitle('DexCare PDM');

  // Click the HMH login provider button
  await loc.hmhLoginBtn.click();

  // Verify redirect to the HMH login page
  await expect(page).toHaveTitle('Log in | PDM WebApp');

  // Enter valid credentials and submit
  await loc.usernameInput.fill(process.env.TEST_USERNAME || 'dexcare.team@periscope-tech.com');
  await loc.passwordInput.fill(process.env.TEST_PASSWORD || 'devtest@1234');
  await loc.continueBtn.click();

  // Verify successful login by checking the app title
  await expect(page).toHaveTitle('DexCare PDM');

  // Log out to clean up session
  await loc.logoutBtn.click();
});

/**
 * Test: Login attempt with an incorrect username.
 * Steps:
 *   1. Navigate to the departments page.
 *   2. Click the "Continue with HMH Users" button.
 *   3. Enter a wrong username with a valid password.
 *   4. Submit the login form.
 *   5. Verify that an error message is displayed.
 */
test('Login with HMH Wrong Username', async ({ page }) => {
  const loc = getLocators(page);

  //await allure.severity('Medium');
  // Navigate to the login page and verify the app title
  await page.goto('https://pdm.care.spi-dev.dex.care/login');
  await expect(page).toHaveTitle('DexCare PDM');

  // Click the HMH login provider button
  await loc.hmhLoginBtn.click();

  // Verify redirect to the HMH login page
  await expect(page).toHaveTitle('Log in | PDM WebApp');

  // Enter an invalid username and a valid password, then submit
  await loc.usernameInput.fill('wrong.username@periscope-tech.com');
  await loc.passwordInput.fill(process.env.TEST_PASSWORD || 'devtest@1234');
  await loc.continueBtn.click();

  // Verify that the error message is visible
  await expect(loc.wrongCredentialsError).toBeVisible();

  await page.close();
});

/**
 * Test: Login attempt with an incorrect password.
 * Steps:
 *   1. Navigate to the departments page.
 *   2. Click the "Continue with HMH Users" button.
 *   3. Enter a valid username with a wrong password.
 *   4. Submit the login form.
 *   5. Verify that an error message is displayed.
 */
test('Login with HMH Wrong password', async ({ page }) => {
  const loc = getLocators(page);

  //await allure.severity('Minor');
  // Navigate to the login page and verify the app title
  await page.goto('https://pdm.care.spi-dev.dex.care/login');
  await expect(page).toHaveTitle('DexCare PDM');

  // Click the HMH login provider button
  await loc.hmhLoginBtn.click();

  // Verify redirect to the HMH login page
  await expect(page).toHaveTitle('Log in | PDM WebApp');

  // Enter a valid username and an invalid password, then submit
  await loc.usernameInput.fill(process.env.TEST_USERNAME || 'dexcare.team@periscope-tech.com');
  await loc.passwordInput.fill('wrongpassword');
  await loc.continueBtn.click();

  // Verify that the error message is visible
  await expect(loc.wrongCredentialsError).toBeVisible();

  await page.close();
});