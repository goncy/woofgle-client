function fillForm(image, name) {
  cy.data('add-form').within(form$ => {
    cy.get('.image').type(image);
    cy.get('.name').type(name);
    cy.get(form$).submit();
  });
}

describe('Agregar', () => {
  beforeEach(() => {
    cy.visit('/add');
  });

  it('El boton de agregar esta habilitado solo cuando el formulario es valido', () => {
    cy.data('add-form', 'button').should('be.disabled');

    fillForm('//placehold.it/256x256', 'Lola');

    cy.data('add-form', 'button').should('be.enabled');
  });

  it('Se muestra un mensaje de confirmacion al agregar un perrito', () => {
    cy.server();

    cy.route({
      method: 'POST',
      url: '/dogs**',
      status: 200,
      response: {
        id: 'loli',
        name: 'Lola',
        image: '//placehold.it/256x256',
      },
    });

    fillForm('//placehold.it/256x256', 'Lola');

    cy.contains('Tu perrito fue agregado correctamente');
  });

  it('Se muestra un mensaje de error is algo falla', () => {
    cy.server();

    cy.route({
      method: 'POST',
      url: '/dogs**',
      status: 500,
      response: {
        error: 'woof',
      },
    });

    fillForm('//placehold.it/256x256', 'Lola');

    cy.contains(
      'Hubo un error agregando tu perrito, intentá de nuevo mas tarde'
    );
  });
});
