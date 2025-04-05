describe('Testes de Busca com o Campo de Pesquisa Vazio', () => {
    it('Deve exibir uma mensagem de erro ao pesquisar com o campo de pesquisa vazio', () => {
      cy.visit('index.html');
  
      cy.get('.input-cidade').clear();
      cy.get('.botao-busca').click();
  
      cy.wait(1000);
  
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.eq('Digite uma cidade!');
      });
    });
  });
  