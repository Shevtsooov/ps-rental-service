import React, { useEffect, useState } from 'react';
import './Orders.scss';
import { useGetAllOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { OrderInfo } from '../../components/OrderInfo/OrderInfo';
import { Order } from '../../types/Order';


export const Orders: React.FC = () => {
  const {data: allTheOrders} = useGetAllOrdersQuery();
  // const [orders, setOrders] = useState<Order[]>([]);

  // useEffect(() => {
  //   if (allTheOrders) {
  //     const sortedOrders = allTheOrders?.sort((orderA, orderB) => {
  //       const dateA = new Date(orderA.createdAt);
  //       const dateB = new Date(orderB.createdAt);
    
  //       return dateB.getTime() - dateA.getTime()
  //     });
  
  //     setOrders(sortedOrders);
  //   }
  // }, [allTheOrders]);


  return (
    <div className="orders">
      <h1 className="orders__title">Замовлення</h1>
      {allTheOrders?.map(order => (
        <OrderInfo order={order} key={order._id} />
      ))}
    </div>
  );
}
