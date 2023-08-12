describe('clip',() =>  {
    it('should play clip',() =>{
        cy.visit('/');
        cy.wait(1000);

        cy.get('app-clips-list > .grid a:first').click();
        cy.wait(1000);
        cy.get('.video-js').click(); //start video
        cy.wait(5000);
        cy.get('.video-js').click(); // stop video
        cy.get('.vjs-play-progress').invoke('width').should('gte', 0);

    })
})