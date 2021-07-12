it('should display the navigation bar correctly', () => {
    cy.visit('/')
      .then(() => {
        cy.get('div.mobile.hidden.row > div.ui.menu')
          .toMatchImageSnapshot();
    });
});