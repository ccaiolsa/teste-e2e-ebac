class SelecionarProdutos {

    buscarProdutos(nomeProduto){
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('[type="submit"]').eq(1).click()
    }

    especificacoesProdutos(tamanhoProduto, corProduto, quantidadeProduto){
        cy.get('.button-variable-item-'+ tamanhoProduto).click()
        cy.get('.button-variable-item-'+ corProduto).click()
        cy.get('.input-text').clear().type(quantidadeProduto)
        cy.get('.single_add_to_cart_button').click()
    }

}


export default new SelecionarProdutos()
