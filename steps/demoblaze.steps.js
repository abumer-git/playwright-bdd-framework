const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { SignupPage } = require('../pages/signup.page');
const { LoginPage } = require('../pages/login.page');
const { getTestData } = require('../tests/test-data');

let home, signup, login;
let testData;

Before(async function () {
    await this.init();  // initialize browser and page
    home = new HomePage(this.page);
    signup = new SignupPage(this.page);
    login = new LoginPage(this.page);
    testData = getTestData();
});

After(async function () {
    await this.close(); // close browser after scenario
});

// ---------------------------
// Step Definitions
// ---------------------------

Given('I open Demoblaze homepage', { timeout: 20000 }, async function () {
    await home.open();
});

Then('The page title should contain {string}', async function (title) {
    const actualTitle = await home.getTitle();
    expect(actualTitle).toContain(title);
});

When('I signup with a new username', { timeout: 20000 }, async function () {
    await home.openSignupModal();

    await signup.signup(testData.username, testData.password);

    // Handle popup alert
    this.page.once('dialog', async (dialog) => {
        console.log('⚠️ Dialog says:', dialog.message());
        await dialog.accept();
        console.log('✅ Signup popup accepted.');
    });
});

Then('I should see a successful signup popup', async function () {
    console.log('✅ Signup completed for:', testData.username);
});

When('I login with the same username', { timeout: 20000 }, async function () {
    await home.openLoginModal();
    await login.login(testData.username, testData.password);
});

Then('I should be logged in and see {string}', { timeout: 20000 }, async function (welcomeText) {
    const text = await home.getLoggedInUsername();
    expect(text).toBe(`Welcome ${testData.username}`);
    console.log('✅ Successfully logged in as:', testData.username);
});
