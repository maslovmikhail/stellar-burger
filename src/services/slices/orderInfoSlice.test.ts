import { TOrder } from '@utils-types';
import {
  fetchOrderByNumber,
  initialState,
  orderNuNumberReducer
} from '../../services/slices/orderInfoSlice';
import { TOrderResponse } from '../../utils/burger-api';

const userOrders: TOrder[] = [
  {
    _id: '643d69a5c3f7b9001cfa0940',
    status: 'new',
    name: 'test order 1',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 1,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'df0670f4-6435-4384-b75a-3ee0fa49a29a',
      'b097fe74-75a2-4fa2-b193-86f97909b839',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    status: 'ready',
    name: 'test order 2',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 2,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'df0670f4-6435-4384-b75a-3ee0fa49a29a',
      'b097fe74-75a2-4fa2-b193-86f97909b839',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    status: 'done',
    name: 'test order 3',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 3,
    ingredients: [
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e',
      'df0670f4-6435-4384-b75a-3ee0fa49a29a',
      'b097fe74-75a2-4fa2-b193-86f97909b839',
      '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
    ]
  }
];

describe('Проверка экшенов получения информации о заказе', () => {
  test('Проверка pending', () => {
    const actualState = orderNuNumberReducer(
      {
        ...initialState
      },
      fetchOrderByNumber.pending('pending', 2)
    );

    expect(actualState).toEqual({
      orders: [],
      orderIsLoading: true,
      error: undefined
    });
  });

  test('Проверка fulfilled', () => {
    const orders: TOrderResponse = {
      orders: userOrders,
      success: true
    };

    const actualState = orderNuNumberReducer(
      {
        ...initialState,
        orderIsLoading: true
      },
      fetchOrderByNumber.fulfilled(orders, 'fulfilled', 0)
    );

    expect(actualState).toEqual({
      orders: userOrders,
      orderIsLoading: false,
      error: undefined
    });
  });

  test('Проверка rejected', () => {
    const testError = new Error('Test Error');

    const expectedState = {
      ...initialState,
      error: testError.message
    };

    const actualState = orderNuNumberReducer(
      {
        ...initialState,
        orderIsLoading: true
      },
      fetchOrderByNumber.rejected(testError, 'rejected', 2)
    );

    expect(actualState).toMatchObject(expectedState);
  });
});
