import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeedsApi, selectFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeeds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedsApi());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeedsApi());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
