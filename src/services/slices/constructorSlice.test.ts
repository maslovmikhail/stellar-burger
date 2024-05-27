import {
  TBurgerConstructorSliceState,
  addIngredients,
  removeIngredient,
  burgerConstructorReducer,
  ingredientsToUp,
  ingredientsToDown,
  clearConstructor
} from './constructorSlice';
import { data } from '../../../cypress/fixtures/ingredients.json';

const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
};

const main = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'df0670f4-6435-4384-b75a-3ee0fa49a29a'
};

const sauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  id: 'b097fe74-75a2-4fa2-b193-86f97909b839'
};

describe('Проверка редьюсера слайса constructor', () => {
  const initialState: TBurgerConstructorSliceState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    isIngredientsLoading: false,
    error: null
  };

  test('Добавление ингредиента', () => {
    const actualState = burgerConstructorReducer(
      {
        ...initialState
      },
      addIngredients(main)
    );
    const result = actualState.constructorItems;
    expect(result.ingredients[0]._id).toEqual(main._id);
  });

  test('Добавление булки', () => {
    const actualState = burgerConstructorReducer(
      {
        ...initialState
      },
      addIngredients(data[0])
    );
    const result = actualState.constructorItems;
    expect(result.bun?._id).toEqual(bun._id);
  });

  test('Удаление игредиента', () => {
    const initialState: TBurgerConstructorSliceState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const actualState = burgerConstructorReducer(
      {
        ...initialState
      },
      removeIngredient(sauce)
    );

    const result = actualState.constructorItems;

    expect(result.ingredients).toEqual([main]);
  });

  test('Передвижение ингредиентов вверх', () => {
    const initialState: TBurgerConstructorSliceState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const stateForMoveUp = burgerConstructorReducer(
      {
        ...initialState
      },
      ingredientsToUp(1)
    );

    const result = stateForMoveUp.constructorItems;

    expect(result.ingredients).toEqual([sauce, main]);
  });

  test('Передвигание ингредиентов вниз', () => {
    const initialState: TBurgerConstructorSliceState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce, main]
      },
      isIngredientsLoading: false,
      error: null
    };

    const stateForMoveDown = burgerConstructorReducer(
      {
        ...initialState
      },
      ingredientsToDown(1)
    );

    const result = stateForMoveDown.constructorItems;

    expect(result.ingredients).toEqual([main, main, sauce]);
  });

  test('Очистка конструктора', () => {
    const initialState: TBurgerConstructorSliceState = {
      constructorItems: {
        bun: bun,
        ingredients: [main, sauce]
      },
      isIngredientsLoading: false,
      error: null
    };

    const actualState = burgerConstructorReducer(
      initialState,
      clearConstructor()
    );

    const result = actualState.constructorItems;

    expect(result).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
