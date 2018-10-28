describe("Navigation", () => {
  it("navigates from search to add and back", () => {
    cy.visit("/");

    cy.url().should("include", "/search");
    cy.navigate("add");
    cy.url().should("include", "/add");
    cy.navigate("search");
    cy.url().should("include", "/search");
  });
});
