import React, { useEffect, useState } from 'react';
import './Orders.scss';
import { useGetAllOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { OrderInfo } from '../../components/OrderInfo/OrderInfo';
import { Pagination } from '../../components/Pagination/Pagination';


export const Orders: React.FC = () => {
  const {data: allTheOrders} = useGetAllOrdersQuery();
  // const [perPage, setPerPage] = useState(10);
  // // const [OrderPage, OrderPage] = useState(1);

  // const start = perPage * paginationPage - perPage;
  // const end = perPage * paginationPage <= games.length
  //   ? perPage * paginationPage
  //   : allTheOrders.length;

  // const ordersToShow = allTheOrders.slice(start, end);

  return (
    <div className="orders">
      <h1 className="orders__title">Замовлення</h1>
      {allTheOrders?.map(order => (
        <OrderInfo order={order} key={order._id} />
      ))}

      {/* {allTheOrders && (
        <Pagination 
          total={allTheOrders?.length}
          perPage={perPage}
        />
      )} */}
        
    </div>
  );
}
