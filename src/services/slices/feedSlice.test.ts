import { feedReducer, fetchFeedsApi, initialState } from './feedSlice';
import { TFeedsResponse } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

const userOrders: TOrder[] = [
  {
    _id: '1',
    status: 'new',
    name: 'test order 1',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 1,
    ingredients: [
      'ingredients 1',
      'ingredients 2',
      'ingredients 3',
      'ingredients 4'
    ]
  },
  {
    _id: '2',
    status: 'ready',
    name: 'test order 2',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 2,
    ingredients: [
      'ingredients 1',
      'ingredients 2',
      'ingredients 3',
      'ingredients 4'
    ]
  },
  {
    _id: '3',
    status: 'done',
    name: 'test order 3',
    createdAt: 'now()',
    updatedAt: 'now()',
    number: 3,
    ingredients: [
      'ingredients 1',
      'ingredients 2',
      'ingredients 3',
      'ingredients 4'
    ]
  }
];

describe('Проверка экшенов получения общего списка заказов', () => {
  test('Проверка fetchFeedsApi pending', () => {
    const actualState = feedReducer(
      {
        ...initialState
      },
      fetchFeedsApi.pending('pending')
    );

    expect(actualState).toEqual({
      feeds: [],
      feedIsLoading: true,
      total: 0,
      totalToday: 0,
      error: undefined
    });
  });

  test('Проверка fetchFeedsApi fulfilled', () => {
    const feeds: TFeedsResponse = {
      orders: userOrders,
      total: initialState.total,
      totalToday: initialState.totalToday,
      success: true
    };

    const actualState = feedReducer(
      {
        ...initialState,
        feedIsLoading: true
      },
      fetchFeedsApi.fulfilled(feeds, 'fulfilled')
    );

    expect(actualState).toEqual({
      feeds: userOrders,
      feedIsLoading: false,
      total: 0,
      totalToday: 0,
      error: undefined
    });
  });

  test('Проверка fetchFeedsApi rejected', () => {
    const testError = new Error('Test Error');

    const expectedState = {
      ...initialState,
      feedIsLoading: false,
      error: testError.message
    };

    const actualState = feedReducer(
      {
        ...initialState,
        feedIsLoading: true
      },
      fetchFeedsApi.rejected(testError, 'rejected')
    );

    expect(actualState).toMatchObject(expectedState);
  });
});
