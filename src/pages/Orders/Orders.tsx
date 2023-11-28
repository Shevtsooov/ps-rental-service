import React, { useEffect, useState } from 'react';
import './Orders.scss';
import { useGetAllOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { OrderInfo } from '../../components/OrderInfo/OrderInfo';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';


export const Orders: React.FC = () => {
  const {data: allTheOrders} = useGetAllOrdersQuery();  
  const [paginationPage, setPaginationPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  const ordersToShow = allTheOrders?.slice(start, end);

  useEffect(() => {
    if (allTheOrders) {
      setStart(perPage * paginationPage - perPage);

      const end = perPage * paginationPage <= allTheOrders?.length
        ? perPage * paginationPage
        : allTheOrders.length;

      setEnd(end)
    }
  }, [paginationPage, allTheOrders, perPage]);

  const showPagination = (allTheOrders && allTheOrders.length <= perPage) 
  || allTheOrders?.length === 0;

  return (
    <div className="orders">
      <h1 className="orders__title">Замовлення</h1>

      {allTheOrders
        ? (
          <>
            <p className="orders__amount">
              {`Кількість замовлень: ${allTheOrders?.length}`}
            </p>

            <div className='orders__list'>
              {ordersToShow?.map(order => (
                <OrderInfo order={order} key={order._id} />
              ))}
            </div>
          </>
        )
        : <Loader />
      }
      

      {!showPagination && allTheOrders && (
        <Pagination
          paginationPage={paginationPage}
          setPaginationPage={setPaginationPage}
          total={allTheOrders.length}
          perPage={perPage}
        />
      )}
        
    </div>
  );
}
