import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { test } from '../../support/pageObjects/test';

// Test Case #1
Given('User navigates to the web page', () => {
  cy.visit('/');
});

When('User searches for the word android {string}', (word: string) => {
  test.searchForTheWordAndroid(word);
});

When('User clicks on the search button', () => {
  test.clickOnSearchButton();
});

Then('User should be presented with a page containing the word android in the title', () => {
  test.verifyEachTitleContainsWordAndroid();
});

// Test Case #2
Then('User clicks on All Regions to confirm total count is greater than 10', () => {
  test.verifyAllRegionsTotalAmount();
});

// Test Case #3
Given('User handles API Response', () => {
  test.verifyIconUrlIsNotNull();
});
