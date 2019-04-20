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
