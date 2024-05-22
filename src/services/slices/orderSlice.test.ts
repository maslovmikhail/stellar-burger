import { TOrder } from '@utils-types';
import {
  TOrderSliceState,
  clearOrder,
  fetchOrderBurgerApi,
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
  const initialState: TOrderSliceState = {
    order: order,
    orderIsLoading: false,
    error: undefined
  };

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
        ...initialState
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

    const expectedState: TOrderSliceState = {
      order: order,
      orderIsLoading: false,
      error: testError.message
    };

    const actualState = orderReducer(
      {
        ...initialState,
        orderIsLoading: true
      },
      fetchOrderBurgerApi.rejected(testError, 'rejected', [])
    );

    expect(actualState).toMatchObject(expectedState);
  });
});
