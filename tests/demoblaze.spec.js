// @ts-check
const { test, expect } = require('@playwright/test');
const { getTestData } = require('./test-data');

const testData = getTestData();

// Run all tests serially in this file
test.describe.configure({ mode: 'serial' }); // To run tests one after the other

// Reusable XPaths
const signupBtnXPath = 'xpath=//button[contains(@onclick,"register") and normalize-space(.)="Sign up"]';
const loginBtnXPath  = 'xpath=//button[contains(@onclick,"logIn") and normalize-space(.)="Log in"]';

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoblaze.com/');
}); // using beforeEach so that before every test runs, first this url is opened

test('Open Demoblaze and display title', async ({ page }) => {
    const title = await page.title();
    console.log('Page title is:', title);
    await expect(page).toHaveTitle(/STORE/);
});

test('Signup', async ({ page }) => {
    await page.click('#signin2'); // open modal
    await page.waitForSelector('#signInModal', { state: 'visible' });
    console.log('✅ Sign up modal displayed.');

    await page.locator('#sign-username').fill(testData.username);
    console.log('Username inserted:', testData.username);

    await page.locator('#sign-password').fill(testData.password);
    console.log('Password inserted:', testData.password);

    // Handle popup alert
    page.once('dialog', async (dialog) => {
        console.log('⚠️ Dialog says:', dialog.message());
        await dialog.accept();
        console.log('Popup accepted.');
    });

    await page.locator(signupBtnXPath).click();
    console.log('Signup button clicked');

    // Wait until modal closes
    await page.waitForSelector('#signInModal', { state: 'hidden' });
    console.log('✅ Signup completed for:', testData.username);
});

test('Login with same user', async ({ page }) => {
    await page.click('#login2'); // open login modal
    await page.waitForSelector('#logInModal', { state: 'visible' });
    console.log('✅ Login modal opened.');

    await page.locator('#loginusername').fill(testData.username);
    console.log('Login Username:', testData.username);

    await page.locator('#loginpassword').fill(testData.password);
    console.log('Login Password:', testData.password);

    await page.locator(loginBtnXPath).click();
    console.log('Login button clicked');

    // Wait for login modal to close
    await page.waitForSelector('#logInModal', { state: 'hidden' });

    // Assertion: wait until #nameofuser is populated
    const welcomeUser = page.locator('#nameofuser');
    await expect(welcomeUser).toHaveText(`Welcome ${testData.username}`, { timeout: 15000 });

    console.log('✅ Successfully logged in as:', testData.username);
});
