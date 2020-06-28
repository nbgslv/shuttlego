import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Permissions = () => {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:3001/admin/users')
      .then(res => res.json())
      .then(adminUsers => setUsers(adminUsers))
      .catch(console.log);
  });
  return (
    <div>
      <Select>
        {users.map(user =>
          <MenuItem key={user.user_id} value={user.user_id}>{user.user_name}</MenuItem>
        )}
      </Select>
    </div>
  );
};

export default Permissions;
