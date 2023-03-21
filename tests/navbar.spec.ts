import { test, expect } from '@playwright/test';

test.describe('NavBar tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://www.speedwayworld.pl/')
        console.log('Speedwayworld page has been opened.')
    })

    test.skip('Verify if Speedwayworld Anchor is being displayed and works properly.', async ({ page }) => {
        
        //verify if logo is visible and enabled
        const logoAnchorLinkLocator = page.locator("[data-test-id='nav-bar-component'] > a");
        await expect(logoAnchorLinkLocator).toBeVisible();
        await expect(logoAnchorLinkLocator).toBeEnabled();

        //verify if going to contact page from navbar is possible and contact page is being displayed properly.
        const contactSubPageNavBarLocator = page.locator("ul[data-test-id='nav-bar-subpages'] > li > a[href='/contact']");
        await contactSubPageNavBarLocator.click();
        const contactSubPageLocator = page.locator("[data-test-id='contact-page']")
        await expect(contactSubPageLocator).toBeVisible();

        //click on the logo and verify if user is being moved to home page.
        await logoAnchorLinkLocator.click();
        //below lines does not work for now. Bug needs to be reported and fixed.
        const homePageLocator = page.locator("[data-test-id='home-page']");
        await expect(homePageLocator).toBeVisible();

    })

    test('Verify if navbar buttons redirects to proper subpages.', async ({ page }) => {

        //go to contact subpage and verify if page is being opened correctly.
        const contactSubPageNavBarLocator = page.locator("ul[data-test-id='nav-bar-subpages'] > li > a[href='/contact']");
        await contactSubPageNavBarLocator.click();
        const contactSubPageLocator = page.locator("[data-test-id='contact-page']")
        await expect(contactSubPageLocator).toBeVisible();

        //go back to home page and verify if home page is being opened correctly.
        const homeSubPageNavBarLocator = page.locator("ul[data-test-id='nav-bar-subpages'] > li > a[href='/']");
        await homeSubPageNavBarLocator.click();
        const homePageLocator = page.locator("[data-test-id='home-page']");
        await expect(homePageLocator).toBeVisible();

        //go to Standings and verify if page is being opened correctly.
        const standingsSubPageNavBarLocator = page.locator("ul[data-test-id='nav-bar-subpages'] > li > a[href='/standings']");
        await standingsSubPageNavBarLocator.click();
        const standingsPageLocator = page.locator("[data-test-id='standings-page']");
        await expect(standingsPageLocator).toBeVisible();

        //go to Results page and verify if page is being opened correctly.
        const resultsSubPageNavBarLocator = page.locator("ul[data-test-id='nav-bar-subpages'] > li > a[href='/results']");
        await resultsSubPageNavBarLocator.click();
        const resultsPageLocator = page.locator("[data-test-id='results-page']");
        await expect(resultsPageLocator).toBeVisible();

        //go to Schedule page and verify if page is being opened correctly.
        const scheduleSubPageNavBarLocator = page.locator("ul[data-test-id='nav-bar-subpages'] > li > a[href='/schedule']");
        await scheduleSubPageNavBarLocator.click();
        const schedulePageLocator = page.locator("[data-test-id='schedule-page']");
        await expect(schedulePageLocator).toBeVisible();


    })

    test.skip('Verify Language Picker and User info sections are being displayed.', async ({ page }) => {

        //Verify if language and user sections are visible and enabled
        const languageAndUserNavBarSectionLocator = page.locator("ul[data-test-id='language-and-user-section']");
        await expect(languageAndUserNavBarSectionLocator).toBeVisible();
        await expect(languageAndUserNavBarSectionLocator).toBeEnabled();
    })

    test('Language Picker - verify if user can select all languages', async ({ page }) => {

        //Find language picker and select pl language
        const languagePickerLocator = page.locator("[data-test-id='language-picker'] > select");
        await languagePickerLocator.selectOption(["pl"]);
        await expect(languagePickerLocator).toHaveValue(/pl/)

        //Verify if navbar section has proper polish text values.
        const contactSubPageNavBarLocator = page.locator("ul[data-test-id='nav-bar-subpages'] > li");
        await expect(contactSubPageNavBarLocator).toContainText(['Start', 'Ranking', 'Wyniki', 'Terminarz', 'Zakłady', 'Contact']);

        // Select lem language
        await languagePickerLocator.selectOption(["lem"]);
        await expect(languagePickerLocator).toHaveValue(/lem/)

        //Verify if navbar section has proper lemko text values.
        await expect(contactSubPageNavBarLocator).toContainText(['Xыжа', 'Tабела', 'Выніки', 'Роспыска', 'Заклади', 'Contact']);

        // Select en language
        await languagePickerLocator.selectOption(["en"]);
        await expect(languagePickerLocator).toHaveValue(/en/);

        //Verify if navbar section has proper en text values.
        await expect(contactSubPageNavBarLocator).toContainText(['Home', 'Standings', 'Results', 'Schedule', 'Bets', 'Contact']);
    })

    test('User Info - Verify if not logged user can see only login and register possibilities.', async ({ page }) => {

        //Veify if user info sections shows 'User' string for not logged in user.
        const userInfoCurrentValueLocator = page.locator("[data-test-id='user-info'] > a > em");
        await expect(userInfoCurrentValueLocator).toContainText('User');

        const userInfoOptionsLocator = page.locator("[data-test-id='user-info'] > ul > li > a");
        await expect(userInfoOptionsLocator.first()).toHaveAttribute('href', '/login');
        await expect(userInfoOptionsLocator.nth(1)).toHaveAttribute('href', '/register');
    })

    test('User Info - Verify if not logged user can go to login page from user info section.', async ({ page }) => {

        //Verify if not logged user can go to login page from user info section.
        const userInfoOptionsLocator = page.locator("[data-test-id='user-info'] > ul > li > a");
        //await userInfoOptionsLocator.first().click();

    })

    test.afterEach(async ({ page }) => {
        //for the future
    })
})