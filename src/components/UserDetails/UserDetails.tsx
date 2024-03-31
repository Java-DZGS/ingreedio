import React from 'react';
import './UserDetails.scss';

interface UserData {
  title: string;
  value: string;
}

interface UserDetailsProps {
  data: UserData[];
}

const UserDetails: React.FC<UserDetailsProps> = ({ data }) => (
  <table className="user-details-table">
    <tbody>
      {data.map((item) => (
        <tr key={item.title.split(' ').join('-')}>
          <th>{item.title}</th>
          <td>{item.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserDetails;
