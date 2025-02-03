import { Locators } from '../locators/test';

class Test {
  /**
   * @description Searh for the word 'android'
   * @param word The word to type in search bar
   * @author Emmanuel
   */
  searchForTheWordAndroid(word: string): void {
    cy.get(Locators.SEARCH_TEXTBOX).type(word);

    cy.get(Locators.DROPDOWN_OPTION).then(($text) => {
      cy.wrap($text).should('have.length', 8);
      cy.wrap($text).each(($element) => {
        expect($element).to.contain.text(word);
      });
    });
  }

  /**
   * @description Click on Search button
   * @author Emmanuel
   */
  clickOnSearchButton(): void {
    cy.get(Locators.SEARCH_BUTTON).should('be.visible').and('be.enabled').click();
  }

  /**
   * @description Verify that each title in the results page contains the word 'Android'
   * @author Emmanuel
   */
  verifyEachTitleContainsWordAndroid(): void {
    cy.get(Locators.SEARCH_RESULTS_SECTION)
      .find(Locators.SEARCH_RESULTS_OL)
      .children()
      .filter(Locators.SEARCH_RESULTS_LI)
      .then(($element) => {
        for (let i = 0; i < $element.length; i++) {
          cy.wrap($element)
            .get(`[id="r1-${i}"]`)
            .children()
            .eq(2)
            .find(Locators.TITLE_A)
            .children()
            .then(($element) => {
              expect($element.text()).to.contain('Android');
            });
        }
      });
  }

  /**
   * @description Verify all regions dropdown values is greater than 10
   * @author Emmanuel
   */
  verifyAllRegionsTotalAmount(): void {
    cy.get(Locators.ALL_REGIONS_BUTTON).should('be.visible').click();

    cy.get(Locators.REGIONS_OPTIONS).then(($elements) => {
      const regionsTotal = $elements.length;
      cy.log(`Total amount of regions is: ${regionsTotal}`);
      expect(regionsTotal).to.be.greaterThan(10);
    });

    // cy.get(Locators.REGIONS_OPTIONS).its('length').should('be.greaterThan', 10);
  }

  /**
   * @description Verify if icon URL value in response it's not null and print the value
   * @author Emmanuel
   */
  verifyIconUrlIsNotNull(): void {
    cy.request('GET', 'https://api.duckduckgo.com/?q=android&format=json').then((response) => {
      expect(response.status).to.eq(200);
      const iconURL: string = JSON.parse(response.body).RelatedTopics[0].Icon.URL;
      if (JSON.stringify(iconURL) != null) {
        cy.log(iconURL);
      }
    });
  }
}

export const test: Test = new Test();
