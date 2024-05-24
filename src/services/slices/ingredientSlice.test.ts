import {
  fetchIngredients,
  getIngredientsAdded,
  ingredientsReducer,
  initialState
} from '../../services/slices/ingredientSlice';

const main = {
  calories: 2674,
  carbohydrates: 300,
  fat: 800,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  name: 'Говяжий метеорит (отбивная)',
  price: 3000,
  proteins: 800,
  type: 'main',
  _id: '643d69a5c3f7b9001cfa0940',
  id: 'df0670f4-6435-4384-b75a-3ee0fa49a29a'
};

describe('Проверка экшенов загрузки ингредиентов', () => {
  test('Проверка pending', () => {
    const actualState = ingredientsReducer(
      {
        ...initialState
      },
      fetchIngredients.pending('pending')
    );

    expect(actualState).toEqual({
      ingredients: [],
      isIngredientsLoading: true,
      error: undefined
    });
  });

  test('Проверка fulfilled', () => {
    const testData = [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ];

    const actualState = ingredientsReducer(
      {
        ...initialState,
        isIngredientsLoading: true
      },
      fetchIngredients.fulfilled(testData, 'fulfilled')
    );

    expect(actualState).toEqual({
      ingredients: testData,
      isIngredientsLoading: false,
      error: undefined
    });
  });

  test('Проверка reject', () => {
    const testError = new Error('Test Error');

    const expectedState = {
      ...initialState,
      error: testError.message
    };

    const actualState = ingredientsReducer(
      {
        ...initialState,
        isIngredientsLoading: true
      },
      fetchIngredients.rejected(testError, 'reject')
    );

    expect(actualState).toMatchObject(expectedState);
  });

  test('Получение добавленных ингредиентов', () => {
    const actualState = ingredientsReducer(
      {
        ...initialState
      },
      getIngredientsAdded(main)
    );

    expect(actualState).toEqual({
      ingredients: [main],
      isIngredientsLoading: false,
      error: undefined
    });
  });
});
