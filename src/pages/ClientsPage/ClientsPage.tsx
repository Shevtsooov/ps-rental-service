import React from 'react';
import './ClientsPage.scss';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import { ClientInfo } from '../../components/ClientInfo/ClientInfo';


export const ClientsPage: React.FC = () => {
  const { data: clients } = useGetAllUsersQuery();

  return (
    <div className="clientsPage">
      <h1>Список клієнтів</h1>
      <p className="clientsPage__amount">{`Кількість клієнтів: ${clients?.length}`}</p>
      <div>
        {clients?.map(client => (
          <ClientInfo client={client} key={client.email}/>
        ))}
      </div>
    </div>
  );
}
