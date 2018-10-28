export function search(criteria = "") {
  criteria && cy.get("[data-test=search-form] input").type(criteria);
  cy.get("[data-test=search-form] button").click();
}
