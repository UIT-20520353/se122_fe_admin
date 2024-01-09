describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/');
        cy.get('#email').type('xuanvuong@gmail.com');
        cy.get('#password').type('Vuong123');
        cy.get('[type="submit"]').click();
        cy.wait(1000);
    })
    it('Verify searching feature', () => {
        cy.get('#search__name').type('Anh');
        cy.get('#search__email').type('quynhanh@gmail.com');
        cy.get('#search-btn').click();
        cy.wait(500);
        cy.get('[data-row-key="User 12"]>td');
    })
})