Feature: Test

    # Scenario Outline: Verify each entry in the results has the word android in the title
    #     Given User navigates to the web page
    #     When User searches for the word android "<word>"
    #     When User clicks on the search button
    #     Then User should be presented with a page containing the word android in the title
    #     Then User clicks on All Regions to confirm total count is greater than 10

    #     Examples:
    #         | word    |
    #         | android |

    Scenario: Print URL if it is not null
        Given User handles API Response