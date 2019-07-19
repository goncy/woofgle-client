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
