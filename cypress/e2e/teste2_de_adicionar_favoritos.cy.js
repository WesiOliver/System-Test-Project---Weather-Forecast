describe('Testes de Favoritos', () => {
  it('Deve adicionar cidade aos favoritos', () => {
    cy.visit('index.html');  

    cy.get('.input-cidade').type('Rio de Janeiro');
    cy.get('.botao-busca').click(); 

    cy.wait(1000);  

    cy.get('.botao-favorito').click();

    cy.get('.lista-favoritos').should('contain', 'Rio de Janeiro');
  });
});
