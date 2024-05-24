const ingredientDetails = 'Детали ингредиента';
const bun = 'Краторная булка N-200i';

describe('Проверка добавления ингредиента из списка в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  it('Добавление булок и начинок в заказ', () => {
    cy.get('[data-cy=buns-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

    cy.get('[data-cy=constructor-bun-1]')
      .contains(bun)
      .should('exist');

    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');

    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');

    cy.get('[data-cy=constructor-bun-2]')
      .contains(bun)
      .should('exist');
  });
});

describe('Проверка работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  it('Открытие модального окна ингредиента', () => {
    cy.contains(ingredientDetails).should('not.exist');
    cy.contains(bun).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('#modals').contains(bun).should('exist');
  });

  it('Закрытие модального окна по клику на крестик', () => {
    cy.contains(bun).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('#modals button svg').click();
    cy.contains(ingredientDetails).should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.contains(bun).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains(ingredientDetails).should('not.exist');
  });
});

describe('Проверка создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('', () => {
    cy.get('[data-cy=buns-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-sum] button').click();

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ]
      });

    cy.get('[data-cy=order-number]').contains('123456').should('exist');
    cy.get('#modals button svg').click();
    cy.contains('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]')
      .contains(bun)
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Соус Spicy-X')
      .should('not.exist');
  });
});
