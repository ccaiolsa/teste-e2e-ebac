/// <reference types="cypress" />
import {faker} from '@faker-js/faker/locale/pt_BR';
import SelecionarProdutos from "../support/page_objects/funcionliada.page";
const produtos = require ('../fixtures/produtos.json')
describe("Exercicio - Testes End-to-end - Fluxo de pedido", () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    cy.visit("produtos");
  });

  it("Selecionar produtos pela barra de pesquisa", () => {
    let i
    for(i=0; i<produtos.length; i++){
      SelecionarProdutos.buscarProdutos (produtos[i].nome)
      SelecionarProdutos.especificacoesProdutos (produtos[i].tamanho, produtos[i].cor, produtos[i].quantidade)
      cy.get('.woocommerce-message').should('contain', `${produtos[i].nome}`)
    }
    cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
    cy.get(' .view-cart').eq(1).click()
    for(i=0; i<produtos.length; i++){
          cy.verificandoCarrinho(
            produtos[i].nome, 
            produtos[i].tamanho, 
            produtos[i].cor, 
            produtos[i].quantidade,
            i
          )
    }
    cy.get('.button').eq(4).click()
    cy.checkout(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.streetAddress(),
      faker.location.city(),
      faker.location.zipCode(),
      faker.phone.number(),
      faker.internet.email(),
    )
    cy.get('.woocommerce-notice').should('contain','Seu pedido foi recebido.')
  });
});