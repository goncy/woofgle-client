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
