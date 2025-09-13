Feature: Demoblaze User Registration and Login

  Scenario: Open homepage and check title
    Given I open Demoblaze homepage
    Then The page title should contain "STORE"

  Scenario: User signup and login
    Given I open Demoblaze homepage
    When I signup with a new username
    Then I should see a successful signup popup
    When I login with the same username
    Then I should be logged in and see "Welcome <username>"
