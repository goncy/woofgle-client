import {fillForm} from "../utils/add";

describe("Add", () => {
  beforeEach(() => {
    cy.server();

    cy.visit("/add");

    cy.get("[data-test=add-form] button").as("submit");
  });

  it("Enables the submit only when the form is valid", () => {
    cy.get("@submit").should("be.disabled");

    fillForm("Chiquita", "//placehold.it/256/256");

    cy.get("@submit").should("not.be.disabled");
  });

  it("Show confirmation on add", () => {
    const dog = {
      name: "Chiquita",
      image: "//placehold.it/256/256",
    };

    cy.route("POST", "/dogs**", dog).as("request");

    fillForm(dog.name, dog.image, true);

    cy.wait("@request")
      .its("requestBody")
      .should("be", dog);

    cy.contains("Tu perrito fue agregado correctamente");
  });

  it("Show error on fail", () => {
    cy.route({
      method: "POST",
      url: "/dogs**",
      status: 500,
      response: {
        error: "Woof",
      },
    });

    fillForm("This will", "fail", true);

    cy.contains(
      "Hubo un error agregando tu perrito, intentá de nuevo mas tarde"
    );
  });
});
