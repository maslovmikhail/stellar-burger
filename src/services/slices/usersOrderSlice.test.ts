import { TOrder } from '@utils-types';
import {
  fetchUserOrdersApi,
  initialState,
  userOrderReducer
} from '../../services/slices/usersOrderSlice';

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

describe('Проверка экшенов получения пользовательских заказов', () => {
  test('Проверка pending', () => {
    const actualState = userOrderReducer(
      {
        ...initialState
      },
      fetchUserOrdersApi.pending('pending')
    );

    expect(actualState).toEqual({
      userOrders: [],
      userOrdersIsLoading: true,
      error: undefined
    });
  });

  test('Проверка fulfilled', () => {
    const actualState = userOrderReducer(
      {
        ...initialState,
        userOrdersIsLoading: true
      },
      fetchUserOrdersApi.fulfilled(userOrders, 'fulfilled')
    );

    expect(actualState).toEqual({
      userOrders: userOrders,
      userOrdersIsLoading: false,
      error: undefined
    });
  });

  test('Проверка rejected', () => {
    const testError = new Error('Test Error');

    const expectedState = {
      ...initialState,
      error: testError.message
    };

    const actualState = userOrderReducer(
      {
        ...initialState,
        userOrdersIsLoading: true
      },
      fetchUserOrdersApi.rejected(testError, 'rejected')
    );

    expect(actualState).toMatchObject(expectedState);
  });
});
