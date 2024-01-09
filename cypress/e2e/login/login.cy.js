describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')
    })
    it('Login sucessfully', () => {
        cy.get('#email').type('xuanvuong@gmail.com');
        cy.get('#password').type('Vuong123');
        cy.get('[type="submit"]').click();
        cy.contains('Admin');
    })
    it('Login failed since email wrong', () => {
        cy.get('#email').type('xng@gmail.com');
        cy.get('#password').type('Vuong123');
        cy.get('[type="submit"]').click();
        cy.contains('Login Error');
    })
    it('Login failed since password wrong', () => {
        cy.get('#email').type('xng@gmail.com');
        cy.get('#password').type('Vuong3.');
        cy.get('[type="submit"]').click();
        cy.contains('Login Error');
    })
    it('Verify UI validation - empty email', () => {
        cy.get('#password').type('Vuong123');
        cy.get('[type="submit"]').click();
        cy.contains('Email is required!');
    })
    it('Verify UI validation - empty password', () => {
        cy.get('#email').type('xng@gmail.com');
        cy.get('[type="submit"]').click();
        cy.contains('Password is required!');
    })
})