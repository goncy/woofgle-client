function fillForm(nombre, image, submit) {
  cy.data('add-form', '.name').type(nombre);
  cy.data('add-form', '.image').type(image);
  submit && cy.data('add-form', 'button').click();
}

describe('Agregar', () => {
  beforeEach(() => {
    cy.visit('/add');

    cy.server();
  });

  it('El boton de agregar esta habilitado solo cuando el formulario es valido', () => {
    cy.data('add-form', 'button').should('be.disabled');

    fillForm('Mongo', '//placehold.it/256/256');

    cy.data('add-form', 'button').should('not.be.disabled');
  });

  it('Se muestra un mensaje de confirmacion al agregar un perrito', () => {
    cy.route({
      method: 'POST',
      url: '/dogs**',
      status: 200,
      response: {
        name: 'Mongo',
        image: '//placehold.it/256/256',
      },
    });

    fillForm('Mongo', '//placehold.it/256/256', true);

    cy.contains('Tu perrito fue agregado correctamente');
  });

  it('Se muestra un mensaje de error is algo falla', () => {
    cy.route({
      method: 'POST',
      url: '/dogs**',
      status: 500,
      response: {
        error: 'Woof',
      },
    });

    fillForm('Mongo', '//placehold.it/256/256', true);

    cy.contains(
      'Hubo un error agregando tu perrito, intentá de nuevo mas tarde'
    );
  });
});
