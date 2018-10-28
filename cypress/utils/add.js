export function fillForm(name, image, submit) {
  cy.get("[data-test=add-form] .name").type(name);
  cy.get("[data-test=add-form] .image").type(image);

  cy.get("@submit").click(submit);
}
