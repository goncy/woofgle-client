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

    cy.url().should('include', '/search');
    cy.data('add-link').click();
    cy.url().should('include', '/add');
    cy.data('search-link').click();
    cy.url().should('include', '/search');
  });
});

// search.test.js
function search(criteria) {
  criteria && cy.data('search-form', 'input').type(criteria);
  cy.data('search-form', 'button').click();
}

describe('Busqueda', () => {
  beforeEach(() => {
    cy.server();

    cy.visit('/');
  });

  it('Los resultados se muestran en pantalla luego de hacer una busqueda', () => {
    cy.fixture('dogs.json').then(dogs => {
      cy.route('GET', '/dogs**', dogs);

      search();

      cy.data('result').should('have.lengthOf', dogs.length);
    });
  });

  it('Al buscar por nombre el request contiene el texto buscado', () => {
    cy.route('GET', '/dogs**', []).as('request');

    search('Lola');

    cy.wait('@request')
      .its('url')
      .should('contain', 'Lola');
  });
});

// add.test.js
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
