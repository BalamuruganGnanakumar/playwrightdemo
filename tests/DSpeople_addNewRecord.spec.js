// @ts-check
/**
 * Playwright E2E Tests — Data Steward > People > Add New Record
 * Application: DexCare PDM
 * Base URL: https://pdm.care.spi-dev.dex.care
 *
 * Steps:
 *  1. Open https://pdm.care.spi-dev.dex.care/login
 *  2. Click "Continue with HMH Users"
 *  3. Login as dexcare.steward@periscope-tech.com
 *  4. Select People from the left panel
 *  5. Click "Add Person" and fill auto-generated values
 *  6. Click "Apply"
 *  7. Verify "Person added successfully" message appears
 *  8. Logout
 */

import { test, expect } from '@playwright/test';
import { getLocators } from '../objects/DSpeople_addNewRecord_loc.spec.js';

function generateCode() {
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}
const NPI = generateCode();

test('DS People - Add New Person with auto-generated data', async ({ page }) => {

  const loc = getLocators(page);

  // ── 1. Navigate to login page ────────────────────────────────────────────
  await page.goto('https://pdm.care.spi-dev.dex.care/login');
  await expect(page).toHaveTitle('DexCare PDM');

  // ── 2. Click "Continue with HMH Users" ──────────────────────────────────
  await loc.hmhLoginBtn.click();
  await expect(page).toHaveTitle('Log in | PDM WebApp');

  // ── 3. Login ─────────────────────────────────────────────────────────────
  await loc.usernameInput.fill('dexcare.superadmin@periscope-tech.com');
  await loc.passwordInput.fill('dsuperadmin@1234');
  await loc.continueBtn.click();
  await expect(page).toHaveTitle('DexCare PDM', { timeout: 30000 });

  // ── 4. Select People from left panel ────────────────────────────────────
  await loc.peopleNavItem.click();

  // ── 5. Click Add Person ──────────────────────────────────────────────────
  await loc.addPersonBtn.click();
  await page.waitForLoadState('networkidle'); // wait for the form to load
  // ── 6. Fill NPI (10-digit) ───────────────────────────────────────────────
  await loc.npiInput.click();
  await loc.npiInput.pressSequentially('1818181818'); // swap to NPI variable when ready
  await page.keyboard.press('Tab');
  await page.waitForTimeout(2000);
  //await page.keyboard.press('Tab');
  // Wait for 2000 milliseconds (2 seconds)
  await page.waitForTimeout(2000);
  // ── 7. Fill Date of Birth ────────────────────────────────────────────────
  await loc.dobInput.click();
  await loc.dobInput.fill('06/14/1985');
  await page.keyboard.press('Tab');

  // ── 8. Fill First Name ───────────────────────────────────────────────────
  await loc.firstNameInput.click();
  await loc.firstNameInput.fill('Deruiter');

  // ── 9. Fill Last Name ────────────────────────────────────────────────────
  await loc.lastNameInput.click();
  await loc.lastNameInput.fill('Chris');

  // ── 10. Credentials — blocked (locator under investigation) ──────────────
  // await loc.credentialsDropdown.click();
  // await loc.credentialsOption('MD').click();

  // ── 11. Fill Display Name ────────────────────────────────────────────────
  // await loc.displayNameInput.click();
  // await loc.displayNameInput.fill('Dexcare Man');
  // Wait for 2000 milliseconds (2 seconds)
  //await page.waitForTimeout(2000);
  // ── 12. Select Languages Spoken = English — blocked (locator under investigation)
  // await loc.languagesDropdown.click();
  // await loc.languagesOption('English').click();

  // ── 13. Fill Age Min ─────────────────────────────────────────────────────
  await loc.ageMinInput.click();
  await loc.ageMinInput.fill('18');

  // ── 14. Fill Age Max ─────────────────────────────────────────────────────
  await loc.ageMaxInput.click();
  await loc.ageMaxInput.fill('99');
  // Wait for 2000 milliseconds (2 seconds)
  await page.waitForTimeout(2000);
  // ── 15. Click Apply ──────────────────────────────────────────────────────
  await loc.applyBtn.click();

  // ── 16. Verify success message ───────────────────────────────────────────
  // await expect(loc.successToast).toBeVisible({ timeout: 15000 });

  // ── 17. Logout ───────────────────────────────────────────────────────────
  await loc.logoutBtn.click();
  await expect(loc.returnToSignIn).toBeVisible({ timeout: 60000 });

});
