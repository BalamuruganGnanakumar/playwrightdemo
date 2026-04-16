// @ts-check
/**
 * Locator Repository — DS People > Add New Person
 * Application : DexCare PDM
 * Base URL    : https://pdm.care.spi-dev.dex.care
 * Paired test : tests/DSpeople_addNewRecord.spec.js
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
    // SECTION 1 — Login Page
    // URL: https://pdm.care.spi-dev.dex.care/login
    // =========================================================================
    URL: page.locator('https://pdm.care.spi-dev.dex.care/login'),
    hmhLoginBtn: page.locator("//button[normalize-space()='Continue with HMH Users']//*[name()='svg']"),
    usernameInput: page.locator("//*[@id='username']"),
    passwordInput: page.locator("//*[@id='password']"),
    continueBtn: page.getByText('Continue', { exact: true }),
    peopleNavItem: page.locator("//li[contains(normalize-space(),'People')]"),
    addPersonBtn: page.locator("//button[contains(normalize-space(),'Add Person')]"),
    npiInput: page.locator("//label[contains(normalize-space(),'NPI')]/following::input[1]"),
    dobInput: page.locator("//label[contains(normalize-space(),'Date of Birth')]/following::input[1]"),
    firstNameInput: page.locator("//label[contains(normalize-space(),'First Name')]/following::input[1]"),
    lastNameInput: page.locator("//label[contains(normalize-space(),'Last Name')]/following::input[1]"),
    credentialsDropdown: page.locator("//label[contains(normalize-space(),'Credentials')]/following::*[@role='combobox' or self::select][1]"),


    /**
     * A single option inside the open Credentials dropdown list.
     * @param {string} value — visible option text, e.g. 'MD', 'DO', 'NP'
     * @returns {import('@playwright/test').Locator}
     */
    credentialsOption: (/** @type {string} */ value) =>
      page.locator(`//*[@role='option' and contains(normalize-space(),'${value}')]`),

    /**
     * Display Name text input field.
     * Finds the first <input> after the "Display Name" label.
     * Typically auto-filled as "<First> <Last>" but can be overridden.
     */
    displayNameInput: page.locator("//label[contains(normalize-space(),'Display Name')]/following::input[1]"),
    languagesDropdown: page.locator("//label[contains(normalize-space(),'Languages Spoken')]/following::*[@role='combobox' or self::select][1]"),

    /**
     * A single option inside the open Languages Spoken dropdown list.
     * @param {string} value — visible option text, e.g. 'English', 'Spanish'
     * @returns {import('@playwright/test').Locator}
     */
    languagesOption: (/** @type {string} */ value) =>
      page.locator(`//*[@role='option' and contains(normalize-space(),'${value}')]`),

    ageMinInput: page.locator("//label[contains(normalize-space(),'Age Min')]/following::input[1]"),
    ageMaxInput: page.locator("//label[contains(normalize-space(),'Age Max')]/following::input[1]"),

    applyBtn: page.locator("//button[contains(normalize-space(),'Apply')]"),

    successToast: page.getByText('Person added successfully'),
    logoutBtn: page.getByText('Logout'),
    returnToSignIn: page.getByText('Return to Sign in'),

  };
}
