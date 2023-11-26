import React, { useEffect, useState } from 'react';
import './AccountOrders.scss';
import { useAppSelector } from '../../Redux/store';
import { useGetUserOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { OrderInfo } from '../../components/OrderInfo/OrderInfo';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';

export const AccountOrders: React.FC = () => {
  const user  = useAppSelector(state => state.user.value);

  const { data: userOrders } = useGetUserOrdersQuery(user!.id);

  const [paginationPage, setPaginationPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  const ordersToShow = userOrders?.slice(start, end);

  useEffect(() => {
    if (userOrders) {
      setStart(perPage * paginationPage - perPage);

      const end = perPage * paginationPage <= userOrders?.length
        ? perPage * paginationPage
        : userOrders.length;

      setEnd(end)
    }
  }, [paginationPage, userOrders, perPage]);

  console.log('start - ', start);

  const showPagination = (userOrders && userOrders.length <= perPage) 
  || userOrders?.length === 0;

  if (!user) {
    return <Loader />
  }
  
  return (
    <div className="accountOrders">
      <h1 className="accountOrders__title">Мої замовлення</h1>

      {userOrders
        ? (
          <>
            <p className="accountOrders__amount">
              {`Кількість замовлень: ${userOrders?.length}`}
            </p>

            <div className='accountOrders__list'>
              {ordersToShow?.map(order => (
                <OrderInfo order={order} key={order._id} />
              ))}
            </div>
          </>
        )
        : <Loader />
      }

      {!showPagination && userOrders && (
        <Pagination
          paginationPage={paginationPage}
          setPaginationPage={setPaginationPage}
          total={userOrders.length}
          perPage={perPage}
        />
      )}
    </div>
  );
}
