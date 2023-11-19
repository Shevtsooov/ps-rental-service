import React from 'react';
import './Orders.scss';
import { useGetAllOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { OrderInfo } from '../../components/OrderInfo/OrderInfo';


export const Orders: React.FC = () => {
  const {data: AllTheOrders} = useGetAllOrdersQuery();

  return (
    <div className="orders">
      <h1 className="orders__title">Замовлення</h1>
      {AllTheOrders?.map(order => (
        <OrderInfo order={order} key={order._id} />
      ))}
    </div>
  );
}
