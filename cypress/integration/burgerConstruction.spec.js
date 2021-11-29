describe('Build burger', () => {
    Cypress.Cookies.debug(true)

    before(() => {
        cy.visit('http://localhost:3000')
    })

    it('should open main page', () => {
        cy.contains('Войти')
        cy.contains('Соберите бургер')
    })

    it('should go to the login page', () => {
        cy.get('a').contains('Войти').click()
        cy.contains('Вход')
    })

    it('should be logged in', () => {
        Cypress.Cookies.debug(true)
        cy.get('input[type=email]').type('vmuratov19@gmail.com')
        cy.get('input[type=password]').type('123456')
        cy.get('button').contains('Войти').click()
        cy.contains('Личный кабинет')
        cy.contains('Соберите бургер')
    })

    it('must transfer items to constructor', () => {
        // price 1255 * 2 = 2510
        cy.get('[class*=card_wrapper]').contains('Краторная булка N-200i').trigger('dragstart')
        cy.get('[class*=bunUp]').contains('Перетащите сюда булку').trigger('drop')

        // price 15 + 15 = 30
        cy.get('[class*=card_wrapper]').contains('Соус традиционный галактический').trigger('dragstart')
        cy.get('[class*=container_ingredients]').contains('Перетащите сюда ингредиенты').trigger('drop')

        cy.get('[class*=card_wrapper]').contains('Соус традиционный галактический').trigger('dragstart')
        cy.get('[class*=container_ingredients]').trigger('drop')

        // price 988
        cy.get('[class*=card_wrapper]').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart')
        cy.get('[class*=container_ingredients').contains('Соус традиционный галактический').trigger('drop')

        // price 4400
        cy.get('[class*=card_wrapper]').contains('Мини-салат Экзо-Плантаго').trigger('dragstart')
        cy.get('[class*=container_ingredients').contains('Филе Люминесцентного тетраодонтимформа').trigger('drop')

        // total price
        cy.get('[class*=totalPrice').contains('7928')
    })

    it('have to send the order', () => {
        cy.get('[class*=buttonBlock] button').contains('Оформить заказ').click()
        cy.contains('идентификатор заказа', {timeout: 5000})
        cy.get('[class*=modal_close]').click()
    })

    it('should close the order modal', () => {
        cy.get('[class*=modal_close]').click()
    })

    it('should open feed page', () => {
        cy.get('[class*=feed_wrapper]').contains('Лента заказов', {timeout: 5000}).click()
    })

    it('should open profile page', () => {
        cy.get('[class*=account_wrapper]').contains('Личный кабинет').click()
    })
})