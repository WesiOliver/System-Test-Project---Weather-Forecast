describe('Testes de Busca Cidade Inexistente', () => {
    it('Deve exibir uma mensagem de erro ao buscar uma cidade inexistente', () => {
      cy.visit('index.html');
  
      cy.get('.input-cidade').type('CidadeInexistente');
      cy.get('.botao-busca').click();
  
      cy.wait(1000);
  
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.eq('Cidade não encontrada!');
      });
    });
  });
  