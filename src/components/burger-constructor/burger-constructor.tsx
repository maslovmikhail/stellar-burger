import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructorBurger
} from '../../services/slices/constructorSlice';
import {
  clearOrder,
  fetchOrderBurgerApi,
  selectOrder,
  selectOrderIsLoading
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor: FC = () => {
  const items = useSelector(selectConstructorBurger).constructorItems;
  const orderRequest = useSelector(selectOrderIsLoading);
  const orderModalData = useSelector(selectOrder);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser).name;

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }

    const { bun, ingredients } = items;
    if (!bun) {
      alert('Сначала соберите свой вкуснейший бургер!');
      return;
    }

    const order: string[] = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    dispatch(fetchOrderBurgerApi(order));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (items.bun ? items.bun.price * 2 : 0) +
      items.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [items]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={items}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
