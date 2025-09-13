// @ts-check
const { test, expect } = require('@playwright/test');
const { getTestData } = require('./test-data');
const { HomePage } = require('../pages/home.page');
const { SignupPage } = require('../pages/signup.page');
const { LoginPage } = require('../pages/login.page');

const testData = getTestData();

test.describe.configure({ mode: 'serial' });

test('Open Demoblaze and display title', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const title = await home.getTitle();
    console.log('Page title:', title);
    await expect(page).toHaveTitle(/STORE/);
});

test('Signup', async ({ page }) => {
    const home = new HomePage(page);
    const signup = new SignupPage(page);

    await home.open();
    await home.openSignupModal();
    await signup.signup(testData.username, testData.password);

    console.log('✅ Signup completed for:', testData.username);
});

test('Login with same user', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.open();
    await home.openLoginModal();
    await login.login(testData.username, testData.password);

    const loggedInText = await home.getLoggedInUsername();
    await expect(loggedInText).toBe(`Welcome ${testData.username}`);
    console.log('✅ Successfully logged in as:', testData.username);
});
