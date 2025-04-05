describe('Testes de Adicionar a Cidade Duas Vezes aos Favoritos', () => {
  it('Deve adicionar cidade aos favoritos e impedir duplicatas', () => {
    cy.visit('index.html');

    cy.get('.input-cidade').type('Rio de Janeiro');
    cy.get('.botao-busca').click();

    cy.wait(1000);

    cy.get('.botao-favorito').click();
    cy.get('.lista-favoritos').should('contain', 'Rio de Janeiro');

    cy.get('.botao-favorito').click();
    cy.get('.lista-favoritos').should('contain', 'Rio de Janeiro'); 
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.eq('Essa cidade já está nos favoritos!');
    });
  });
});
