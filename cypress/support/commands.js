Cypress.Commands.add('verificandoCarrinho', (nome, tamanho, cor, quantidade, loop) => {
    cy.get(`:nth-child(${loop+1}) > .product-name > a`).should('have.text', `${nome} - ${tamanho}, ${cor}`)
    cy.get(`:nth-child(${loop+1}) > .product-quantity > .quantity > .input-text`).should('have.value', quantidade)
});
Cypress.Commands.add('checkout', (nome, sobrenome, endereco, cidade, cep, telefone, email) => {
    cy.get('#billing_first_name').type(nome)
    cy.get('#billing_last_name').type(sobrenome)
    cy.get('#billing_address_1').type(endereco)
    cy.get('#billing_city').type(cidade)
    cy.get('#billing_postcode').type(cep)
    cy.get('#billing_phone').type(telefone)
    cy.get('#billing_email').type(email)
    cy.get('#terms').click()
    cy.get('#place_order').click()

})