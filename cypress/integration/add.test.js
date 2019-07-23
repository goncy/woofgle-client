function fillForm(image = '//placehold.it/256x256', name = 'Sarlanguito') {
  cy.data('add-form').within(form => {
    cy.get('.image').type(image);
    cy.get('.name').type(name);
    cy.get(form).submit();
  });
}

describe('Agregar', () => {
  beforeEach(() => {
    cy.visit('/add');

    cy.server();
    cy.route('POST', '/dogs**', {});
  });

  it('El boton de agregar esta habilitado solo cuando el formulario es valido', () => {
    cy.data('add-form', 'button').should('be.disabled');

    fillForm();

    cy.data('add-form', 'button').should('be.enabled');
  });

  it('Se muestra un mensaje de confirmacion al agregar un perrito', () => {
    fillForm();

    cy.contains('Tu perrito fue agregado correctamente');
  });

  it('Se muestra un mensaje de error is algo falla', () => {
    cy.route({
      url: '/dogs**',
      method: 'POST',
      status: 500,
      response: {
        error: 'Woof!',
      },
    });

    fillForm();

    cy.contains(
      'Hubo un error agregando tu perrito, intentá de nuevo mas tarde'
    );
  });
});
