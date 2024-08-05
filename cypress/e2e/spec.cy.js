describe('Final Assessment Testing', () => {
  let api, fixture, url

  beforeEach(() => {
    api = 'http://localhost:3001/api/v1/urls'
    fixture = 'example.json'
    url = 'http://localhost:3000/'
    cy.intercept('GET', api, { fixture: fixture }).as('getData')
    cy.visit(url)
    cy.wait('@getData')
  })

  it('should display page, title, form, and shortened URLs', () => {
    cy.get('header').contains('URL Shortener')
    cy.get('form').should('be.visible')
    cy.get('input[placeholder="Title..."]').should('be.visible')
    cy.get('input[placeholder="URL to Shorten..."]').should('be.visible')
    cy.get('button').contains('Shorten Please!')
    cy.get('.url').should('have.length', 1)
    cy.get('.url').first().within(() => {
      cy.get('h3').contains('Awesome photo')
      cy.get('a').should('have.attr', 'href', 'http://localhost:3001/useshorturl/1')
      cy.get('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    })
  })

  it('should reflect input field values when a user fills out the form', () => {
    const title = 'New Title'
    const longUrl = 'https://newurl.com'
    
    cy.get('input[placeholder="Title..."]').type(title).should('have.value', title)
    cy.get('input[placeholder="URL to Shorten..."]').type(longUrl).should('have.value', longUrl)
  })


  it('should render new shortened URL upon form submission', () => {
    const title = 'New Ttle'
    const longUrl = 'https://newurl.com'
    const shortUrl = 'http://localhost:3001/useshorturl/2'

    cy.intercept('POST', api, {
      statusCode: 201,
      body: {
        id: 2,
        title: title,
        long_url: longUrl,
        short_url: shortUrl
      }
    }).as('postUrl')

    cy.get('input[placeholder="Title..."]').type(title)
    cy.get('input[placeholder="URL to Shorten..."]').type(longUrl)
    cy.get('button').contains('Shorten Please!').click()
    cy.wait('@postUrl')

    cy.get('.url').should('have.length', 2)
    cy.get('.url').last().within(() => {
      cy.get('h3').contains(title)
      cy.get('a').should('have.attr', 'href', shortUrl)
      cy.get('p').contains(longUrl)
    })

  })

})