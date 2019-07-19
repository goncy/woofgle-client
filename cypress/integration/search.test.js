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
