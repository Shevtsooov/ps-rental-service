import React, { useEffect, useState } from 'react';
import './ClientsPage.scss';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import { ClientInfo } from '../../components/ClientInfo/ClientInfo';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';
import { useAppSelector } from '../../Redux/store';
import { refreshTokenService } from '../../helpers/refreshTokenService';
import { useNavigate } from 'react-router-dom';


export const ClientsPage: React.FC = () => {
  const { data: allTheClients } = useGetAllUsersQuery();
  const user = useAppSelector(state => state.user.value);

  const [paginationPage, setPaginationPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const navigate = useNavigate();

  const clientsToShow = allTheClients?.slice(start, end);

  useEffect(() => {
    document.title = 'Клієнти';
  }, []);

  useEffect(() => {
    if (allTheClients) {
      setStart(perPage * paginationPage - perPage);

      const end = perPage * paginationPage <= allTheClients?.length
        ? perPage * paginationPage
        : allTheClients.length;

      setEnd(end)
    }
  }, [paginationPage, allTheClients, perPage]);

  const showPagination = (allTheClients && allTheClients.length <= perPage) 
  || allTheClients?.length === 0;

  useEffect(() => {
    if (!refreshTokenService.get() || (user && user?.role === 'user')) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      {user
        ? (
          <div className="clientsPage">
            <h1>Список клієнтів</h1>


            {allTheClients
              ? (
                <>
                  <p className="clientsPage__amount">
                    {`Кількість клієнтів: ${allTheClients?.length}`}
                  </p>

                  <div className="clientsPage__list">
                    {clientsToShow?.map(client => (
                      <ClientInfo client={client} key={client.email}/>
                    ))}
                  </div>
                </>

              )
              : (
                <div className="clientsPage__loader">
                  <Loader />
                </div>
              )
            }

            {!showPagination && allTheClients && (
              <Pagination
                paginationPage={paginationPage}
                setPaginationPage={setPaginationPage}
                total={allTheClients.length}
                perPage={perPage}
              />
            )}
          </div>
        )
      : (
        <div className="orders__loader">
          <Loader />
        </div>
      )}
    </>
    
  );
}
