# Playwright - Test Project

## Project Description

A test project for the Trainee Program using the [Playwright](https://playwright.dev/) framework.  
It includes automated end-to-end UI tests with support for multiple browsers, Allure reporting, and HTML reports.

## How to Install and Run the Project

1. Clone the repository to your local machine:

```bash
git clone https://github.com/anavoro/test_project_playwright.git
cd test_project_playwright
```

2. Install the necessary dependencies:

```bash
npm install
npx playwright install
npm install -g allure-commandline --save-dev
```

3. To run the tests:

```bash
npm test
npm run test:ui
```

4. Run tests with a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

4. To generate the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

## How to Use the Project

Tests are located in the ./tests directory.
Page Object Model (POM) is used to organize reusable UI interactions.
Reporters configured:
HTML (playwright-report/)
Allure (allure-results/)
You can view test reports by opening the HTML or Allure report after test execution.

## License

This project is for training purposes and does not require a license.
