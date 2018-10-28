import {search} from "../utils/search";

describe("Search", () => {
  beforeEach(() => {
    cy.server();

    cy.visit("/");
  });

  it("Show all results on search", () => {
    cy.fixture("dogs.json").then(dogs => {
      cy.route("GET", "/dogs**", dogs);

      search();

      cy.get('[data-test="result"]').should("have.lengthOf", dogs.length);
    });
  });

  it("Search for a given criteria", () => {
    cy.route("GET", "/dogs**", []).as("request");

    search("Lola");

    cy.wait("@request")
      .its("url")
      .should("include", "Lola");
  });
});
