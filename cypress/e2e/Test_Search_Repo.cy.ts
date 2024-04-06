const localhost = 'http://localhost:5173/'

describe("Search Repo", () => {
    it("Search Repo", () => {
        cy.visit(localhost);
        cy.get('[data-cy=input-search-repo]').type("https://github.com/facebook/react");
        cy.get('[data-cy=btn-search-repo]').click();
        cy.get('[data-cy=issues-list]').should('have.length', 3);
    })

    it("Checking repo details", () => {
        cy.visit(localhost);
        cy.get('[data-cy=input-search-repo]').type("https://github.com/angular/angular");
        cy.get('[data-cy=btn-search-repo]').click().then(() => {
            cy.get('[data-cy=link-owner]').should('have.text', 'angular');
            cy.get('[data-cy=link-repo]').should('have.text', 'angular');
        })
    })

    it('Caching repo issues', () => {
        cy.visit(localhost);
        cy.get('[data-cy=input-search-repo]').type("https://github.com/facebook/react");
        cy.get('[data-cy=btn-search-repo]').click().then(() => {
            cy.get('[data-cy=link-owner]').should('have.text', 'facebook');
            cy.get('[data-cy=link-repo]').should('have.text', 'react');
        })

        cy.get('[data-cy=input-search-repo]').clear();
        cy.get('[data-cy=input-search-repo]').type("https://github.com/facebook/react-native");
        cy.get('[data-cy=btn-search-repo]').click();

        cy.get('[data-cy=input-search-repo]').clear();
        cy.get('[data-cy=input-search-repo]').type("https://github.com/facebook/react");
        cy.get('[data-cy=btn-search-repo]').click();
    })

    it("Сhecking the same request", () => {
        cy.visit(localhost);
        cy.get('[data-cy=input-search-repo]').type("https://github.com/facebook/react");
        cy.get('[data-cy=btn-search-repo]').click();
        cy.get('[data-cy=btn-search-repo]').click();
        cy.get('[data-status=info]');
        cy.get('#toast-1-title').should('have.text', 'You have already got information from this repository.');
    })

    it('Сhecking host name is not "github.com"', () => {
        cy.visit(localhost);
        cy.get('[data-cy=input-search-repo]').type("https://git.com/facebook/react");
        cy.get('[data-cy=btn-search-repo]').click();
        cy.get('[data-status=warning]');
        cy.get('#toast-1-title').should('have.text', 'You should enter URL from github.com!');
    })

    it('Сhecking empty search field', () => {
        cy.visit(localhost);
        cy.get('[data-cy=input-search-repo]');
        cy.get('[data-cy=btn-search-repo]').click();
        cy.get('[data-status=error]');
        cy.get('#toast-1-title').should('have.text', 'Enter repo URL!');
    })

    it('No data from request', () => {
        cy.visit(localhost);
        cy.get('[data-cy=input-search-repo]').type('https://github.com/facebook/r');
        cy.get('[data-cy=btn-search-repo]').click();
        cy.get('p').should('have.text', 'No data for this query.');
    })
})

describe('Change status', () => {
    it("Change status", () => {
        cy.visit(localhost);
        cy.get('[data-cy=input-search-repo]').type("https://github.com/facebook/react");
        cy.get('[data-cy=btn-search-repo]').click();
        cy.get('[data-cy=issues-list]').should('have.length', 3);
        cy.get('[data-cy=issues-list]').first().children().should('exist');
        cy.get('[data-cy=issues-list]').last().children().should('not.exist');
        cy.get('[data-cy=issues-list-item]:first').drag('[data-cy=issues-list]:last');
    })
})