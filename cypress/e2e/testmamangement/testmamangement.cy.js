describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/');
        cy.get('#email').type('xuanvuong@gmail.com');
        cy.get('#password').type('Vuong123');
        cy.get('[type="submit"]').click();
        cy.wait(1000);
    })
    it('Verify adding test', () => {
        cy.get('[class="sidebar__button"]').click();
        cy.contains('Test');
    })
})