describe('Testes de Busca de Cidade', () => {
  it('Deve buscar cidade válida e exibir as informações', () => {
    cy.visit('index.html');

    cy.get('.input-cidade').type('Rio de Janeiro');
    cy.get('.botao-busca').click();

    cy.get('.cidade').should('contain', 'Tempo em Rio de Janeiro');
    cy.get('.temp').should('contain', '°C');
    cy.get('.umidade').should('contain', 'Umidade');
  });
});
