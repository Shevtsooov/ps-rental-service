import React from 'react';
import './AccountOrders.scss';
import { useAppSelector } from '../../Redux/store';
import { useGetUserOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { OrderInfo } from '../../components/OrderInfo/OrderInfo';

export const AccountOrders: React.FC = () => {
  const user  = useAppSelector(state => state.user.value);

  const { data: userOrders } = useGetUserOrdersQuery(user!.id);
  
  return (
    <div className="accountOrders">
      <h1 className="accountOrders__title">Мої замовлення</h1>
      {userOrders?.map(order => (
        <OrderInfo order={order} key={order._id} />
      ))}
    </div>
  );
}
