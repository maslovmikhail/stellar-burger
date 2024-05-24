import { TOrder } from '@utils-types';
import {
  clearOrder,
  fetchOrderBurgerApi,
  initialState,
  orderReducer
} from '../../services/slices/orderSlice';
import { TNewOrderResponse } from '../../utils/burger-api';

const order: TOrder = {
  _id: '1',
  status: 'new',
  name: 'test order',
  createdAt: 'now()',
  updatedAt: 'now()',
  number: 1,
  ingredients: ['ingredient 1', 'ingredient 2', 'ingredient 3', 'ingredient 4']
};

describe('Проверка экшенов отправки заказа', () => {
  test('Очистка заказа', () => {
    const actualState = orderReducer(initialState, clearOrder());

    expect(actualState).toEqual({
      order: null,
      orderIsLoading: false,
      error: undefined
    });
  });

  test('Проверка pending', () => {
    const newState = orderReducer(
      {
        ...initialState,
        order: order
      },
      fetchOrderBurgerApi.pending('pending', [])
    );

    expect(newState).toEqual({
      order: order,
      orderIsLoading: true,
      error: undefined
    });
  });

  test('Проверка fulfilled', () => {
    const newOrder: TNewOrderResponse = {
      order: order,
      name: 'some order',
      success: true
    };

    const actualState = orderReducer(
      {
        ...initialState,
        orderIsLoading: true
      },
      fetchOrderBurgerApi.fulfilled(newOrder, 'fulfilled', [])
    );

    expect(actualState).toEqual({
      order: order,
      orderIsLoading: false,
      error: undefined
    });
  });

  test('Проверка rejected', () => {
    const testError = new Error('Test Error');

    const expectedState = {
      ...initialState,
      order: order,
      error: testError.message
    };

    const actualState = orderReducer(
      {
        ...initialState,
        order: order,
        orderIsLoading: true
      },
      fetchOrderBurgerApi.rejected(testError, 'rejected', [])
    );

    expect(actualState).toMatchObject(expectedState);
  });
});
