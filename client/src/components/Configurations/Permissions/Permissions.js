import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const Permissions = () => {
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(0);
  const [permissions, setPermissions] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3001/admin/users')
      .then(res => res.json())
      .then(adminUsers => setUsers(adminUsers))
      .catch(console.log);
  }, []);

  React.useEffect(() => {
    fetch('http://localhost:3001/admin/users/permissions', {
      method: 'POST',
      body: JSON.stringify({
        userId: selectedUser,
      }),
    })
      .then(res => res.json())
      .then(permissions => {
        console.log(permissions);
        setPermissions(permissions);
      })
      .catch(console.log);
  }, [selectedUser]);

  return (
    <div>
      <Select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
        {users.map(user => (
          <MenuItem key={user.userId} value={user.userId}>
            {user.userName}
          </MenuItem>
        ))}
      </Select>
      <FormControl>
        <Select value={permissions} input={<Input />} multiple renderValue={(selected) => selected.join(', ')}>
          {permissions &&
            permissions.map(permission => {
            console.log(permission);
            return (
              <MenuItem key={permission.permissionsId} value={permission.permissionsId}>
                <Checkbox checked={permission.userId === selectedUser} />
                <ListItemText primary={permission.permissionName} />
              </MenuItem>
            )})}
          )
        </Select>
      </FormControl>
    </div>
  );
};

export default Permissions;
