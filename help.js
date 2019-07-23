// navigation.test.js
describe('Navegacion', () => {
  it.skip('La url cambia al navegar entre rutas', () => {});
});

// search.test.js
describe('Busqueda', () => {
  beforeEach(() => {});

  it.skip('Los resultados se muestran en pantalla luego de hacer una busqueda', () => {});

  it.skip('Al buscar por nombre el request contiene el texto buscado', () => {});
});

// add.test.js
describe('Agregar', () => {
  beforeEach(() => {});

  it.skip('El boton de agregar esta habilitado solo cuando el formulario es valido', () => {});

  it.skip('Se muestra un mensaje de confirmacion al agregar un perrito', () => {});

  it.skip('Se muestra un mensaje de error is algo falla', () => {});
});

// support/commands.js
Cypress.Commands.add('data', (attribute, element = '') =>
  cy.get(`[data-test=${attribute}] ${element}`)
);

// navigation.test.js
describe('Navegacion', () => {
  it('La url cambia al navegar entre rutas', () => {
    cy.visit('/');

    cy.url().should('contain', '/search');
    cy.data('add-link').click();
    cy.url().should('contain', '/add');
    cy.data('search-link').click();
    cy.url().should('contain', '/search');
  });
});

// search.test.js
describe('Busqueda', () => {
  beforeEach(() => {
    cy.server();

    cy.visit('/');
  });

  it('Los resultados se muestran en pantalla luego de hacer una busqueda', () => {
    cy.fixture('dogs').then(dogs => {
      cy.route('GET', '/dogs**', dogs);

      cy.data('search-form', 'button').click();

      cy.data('result').should('have.length', dogs.length);
    });
  });

  it('Al buscar por nombre el request contiene el texto buscado', () => {
    cy.route('GET', '/dogs**', []).as('search');

    cy.data('search-form', 'input').type('Lola{enter}');

    cy.wait('@search')
      .its('url')
      .should('contain', 'Lola');
  });
});

// add.test.js
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
