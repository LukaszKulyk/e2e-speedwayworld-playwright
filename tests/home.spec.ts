import { test, expect } from '@playwright/test';

test('Home page is being opened by default', async ({ page }) => {
    await page.goto('http://www.speedwayworld.pl/')

    //await expect(page.getByTestId('home-page')).toBeVisible();

    //await expect(page).toHaveProperty('data-test-id', 'home-page');

    const homePageLinkLocator = page.locator("[data-test-id='nav-bar-component'] > a");

    await expect(homePageLinkLocator).toBeVisible();
    await expect(homePageLinkLocator).toBeEnabled();

    const homePageLocator = page.locator("[data-test-id='home-page']");
    await expect(homePageLocator).toBeVisible();

    const navBarSubPagesLocator = page.locator("[data-test-id='nav-bar-subpages'] > li");
    await expect(navBarSubPagesLocator).toHaveCount(6);
    await expect(navBarSubPagesLocator).toContainText(['Home', 'Standings', 'Results', 'Schedule', 'Bets', 'Contact']);
    // const navBarValues = {
    //     a: 'Home',
    //     b: 'Standings',
    //     c: 'Results',
    //     d: 'Schedule',
    //     e: 'Bets',
    //     f: 'Contact'
    // }

    const navBarSubPagesAnchorLocators = page.locator("[data-test-id='nav-bar-subpages'] > li > a");

    //const navBarSubPagesLocator2 = page.locator("[data-test-id='nav-bar-subpages']");
    //await expect(navBarSubPagesLocator2).toHaveProperty(navBarSubPagesLocator[0], 'Home');
    await expect(navBarSubPagesAnchorLocators.first()).toHaveAttribute('href', '/'); //.nth(0)
    await expect(navBarSubPagesAnchorLocators.nth(1)).toHaveAttribute('href', '/standings');
    await expect(navBarSubPagesAnchorLocators.nth(2)).toHaveAttribute('href', '/results');
    await expect(navBarSubPagesAnchorLocators.nth(3)).toHaveAttribute('href', '/schedule');
    await expect(navBarSubPagesAnchorLocators.nth(4)).toHaveAttribute('href', '/bets');
    await expect(navBarSubPagesAnchorLocators.nth(5)).toHaveAttribute('href', '/contact');


    // const languagePickerLocator = page.locator("[data-test-id='language-picker'] > select");
    // await languagePickerLocator.selectOption(["en", "pl", "lem"]);
    // await expect(languagePickerLocator).toHaveValues([/en/, /pl/, /lem/])

    const userInfoLocator = page.locator("[data-test-id='user-info']");
    await expect(userInfoLocator).toBeVisible();
})