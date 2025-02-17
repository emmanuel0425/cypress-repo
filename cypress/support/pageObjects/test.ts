import { Locators } from '../locators/test';

class Test {
  /**
   * @description Searh for the word 'android'.
   * @param word The word to type in search bar.
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
   * @description Click on Search button.
   * @author Emmanuel
   */
  clickOnSearchButton(): void {
    cy.get(Locators.SEARCH_BUTTON).should('be.visible').and('be.enabled').click();
  }

  /**
   * @description Verify that each title in the results page contains the word 'Android'.
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
   * @description Verify all regions dropdown values is greater than 10.
   * @author Emmanuel
   */
  verifyAllRegionsTotalAmount(): void {
    cy.get(Locators.ALL_REGIONS_BUTTON).should('be.visible').click();

    cy.get(Locators.REGIONS_OPTIONS).then(($elements) => {
      const regionsTotal = $elements.length;
      cy.log(`Total amount of regions is: ${regionsTotal}`);
      expect(regionsTotal).to.be.greaterThan(10);

      // More simple solution in case no if-statement is needed
      // cy.wrap($elements).contains('Korea').click();

      cy.wrap($elements).each(($element) => {
        if ($element.text() === 'Korea') {
          cy.wrap($element).click();
        }
      });
    });

    // cy.get(Locators.REGIONS_OPTIONS).its('length').should('be.greaterThan', 10);
  }

  /**
   * @description Verify if icon URL value in response it's not null and print the value.
   * @author Emmanuel
   */
  verifyIconUrlIsNotNull(): void {
    cy.request('GET', 'https://api.duckduckgo.com/?q=android&format=json').then((response) => {
      expect(response.status).to.eq(200);

      const responseBody = JSON.parse(response.body);

      let arrayLength: number = responseBody.RelatedTopics.length;
      cy.log(`Array length for RelatedTopics is: ${arrayLength}`);

      let iconURL: string = '';
      let strippedIconURL: string = '';
      const iconsURLArray: string[] = [];

      for (let i = 0; i < arrayLength; i++) {
        iconURL = responseBody.RelatedTopics[i].Icon?.URL;

        if (iconURL != '' && iconURL != undefined) {
          strippedIconURL = this.printIconUrl(iconURL, i);
          iconsURLArray.push(strippedIconURL);
        }

        if (i === 3) {
          const arrayLength3 = responseBody.RelatedTopics[i].Topics.length;
          cy.log(`Array length for object ${i} is: ${arrayLength3}`);

          for (let j = 0; j < arrayLength3; j++) {
            iconURL = responseBody.RelatedTopics[i].Topics[j].Icon.URL;

            if (iconURL != '' && iconURL != undefined) {
              strippedIconURL = this.printIconUrl(iconURL, j);
              iconsURLArray.push(strippedIconURL);
            }
          }
        } else if (i === 4) {
          const arrayLength4 = responseBody.RelatedTopics[i].Topics.length;
          cy.log(`Array length for object ${i} is: ${arrayLength4}`);

          for (let j = 0; j < arrayLength4; j++) {
            iconURL = responseBody.RelatedTopics[i].Topics[j].Icon.URL;

            if (iconURL != '' && iconURL != undefined) {
              strippedIconURL = this.printIconUrl(iconURL, j);
              iconsURLArray.push(strippedIconURL);
            }
          }
        } else if (i > 4) {
          const arrayLength5 = responseBody.RelatedTopics[i].Topics.length;
          cy.log(`Array length for object ${i} is: ${arrayLength5}`);

          for (let j = 0; j < arrayLength5; j++) {
            iconURL = responseBody.RelatedTopics[i].Topics[j].Icon.URL;

            if (iconURL != '' && iconURL != undefined) {
              strippedIconURL = this.printIconUrl(iconURL, j);
              iconsURLArray.push(strippedIconURL);
            }
          }
        }
      }

      cy.log('The sorted list of iconURL is:');

      iconsURLArray.sort().forEach((iconURL) => {
        cy.log(iconURL);
      });
    });
  }

  /**
   * @description Print icon Url and return its value.
   * @param iconURL - The iconURL to be printed.
   * @param index - The index of the iconURL being printed in the array.
   * @returns The iconURL string value without the /i/ and the extension.
   * @author Emmanuel
   */
  printIconUrl(iconURL: string, index: number): string {
    const strippedIconURL = iconURL.replace(/\/i\/|\.[^/.]+$/g, '');
    cy.log(`${index}: ${strippedIconURL}`);

    return strippedIconURL;
  }
}

export const test: Test = new Test();
