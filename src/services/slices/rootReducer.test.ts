import { rootReducer } from '../store';
import { ingredientsReducer } from './ingredientSlice';
import { burgerConstructorReducer } from './constructorSlice';
import { orderReducer } from './orderSlice';
import { feedReducer } from './feedSlice';
import { orderNuNumberReducer } from './orderInfoSlice';
import { userOrderReducer } from './usersOrderSlice';
import { userReducer } from './userSlice';

describe('rootReducer', () => {
  it('Проверка правильной инициализации rootReducer', () => {
    const initAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, initAction),
      burgerConstructor: burgerConstructorReducer(undefined, initAction),
      order: orderReducer(undefined, initAction),
      feed: feedReducer(undefined, initAction),
      orderByNumber: orderNuNumberReducer(undefined, initAction),
      userOrders: userOrderReducer(undefined, initAction),
      auth: userReducer(undefined, initAction)
    });
  });
});
