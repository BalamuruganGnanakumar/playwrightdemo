// @ts-check
/**
 * Locator Repository — HMH Login / Logout
 * Application : DexCare PDM
 * Base URL    : https://pdm.care.spi-dev.dex.care
 * Paired test : tests/Loginlogout.spec.js
 *
 * Convention  : export a factory function `getLocators(page)` that returns live
 *               Playwright Locator instances. Never use raw ID strings — dynamic
 *               React IDs break on re-render.
 *
 * @param {import('@playwright/test').Page} page
 * @returns {ReturnType<typeof buildLocators>}
 */
export function getLocators(page) {
  return buildLocators(page);
}

/** @param {import('@playwright/test').Page} page */
function buildLocators(page) {
  return {

    // =========================================================================
    // SECTION 1 — PDM Landing / Login Page
    // URL: https://pdm.care.spi-dev.dex.care/login
    // =========================================================================
    hmhLoginBtn: page.locator("//button[normalize-space()='Continue with HMH Users']//*[name()='svg']"),
    usernameInput: page.locator('#username'),
    passwordInput: page.locator('#password'),
    continueBtn: page.getByText('Continue', { exact: true }),
    logoutBtn: page.getByText('Logout'),
    wrongCredentialsError: page.getByText('Wrong email or password'),

  };
}