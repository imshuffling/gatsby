// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// copied from here - https://github.com/cypress-io/cypress/issues/1212#issuecomment-360395261
Cypress.Commands.add(`getTestElement`, selector =>
  cy.get(`[data-testid="${selector}"]`)
)

Cypress.Commands.add(
  `waitForRouteChange`,
  {
    prevSubject: `optional`,
  },
  subject =>
    cy.window({ log: false }).then({ timeout: 9999 }, win =>
      win.___waitForRouteChange().then(location => {
        Cypress.log({
          name: `wait for route change`,
          message: location.pathname,
          type: `parent`,
          consoleProps: () => {
            return {
              pathname: location.pathname,
              search: location.search,
              hash: location.hash,
            }
          },
        })
        return subject
      })
    )
)