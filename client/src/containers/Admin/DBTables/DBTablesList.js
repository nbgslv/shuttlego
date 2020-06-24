import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
  Button,
  ListSubheader,
  ListItem,
  ListItemIcon, Divider
} from '@material-ui/core';
import DBTables from './tables';

function DBTableList () {
  const tables = DBTables.tables.map((table, i) => (
    <>
      <ListItem key={i} button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <Button
          variant="button"
          href={`/admin/tables/${table.name}`}
        >
          {table.title}
        </Button>
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <Button
          variant="button"
          href="/admin/addguest"
        >
          Add Guest
        </Button>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <Button
          variant="button"
          href="/admin/addSession"
        >
          Add Session
        </Button>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <Button
          variant="button"
          href="/admin/config/general"
        >
          General Configuration
        </Button>
      </ListItem>
    </>
  ));
  return (
    <div>
      <ListSubheader inset>Data Tables</ListSubheader>
      {tables}
    </div>
  );
}

export default DBTableList;
