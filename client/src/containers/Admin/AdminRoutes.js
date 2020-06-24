import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DBTableContainer from './DBTables/DBTablesContainer';
import Guests from './Guests/Guests';
import Sessions from './Sessions/Sessions';
import AddGuest from './Forms/AddGuest/AddGuest';
import AddSession from './Forms/AddSession/AddSession';
import { General } from './Configuration/General/General';

function AdminRoutes() {
  return (
    <Switch>
      <Route path="/admin/tables/:table" component={DBTableContainer} />
      <Route path="/admin/guests" component={Guests} />
      <Route path="/admin/addguest" component={AddGuest} />
      <Route path="/admin/addsession" component={AddSession} />
      <Route path="/admin/sessions" component={Sessions} />
      <Route path="/admin/config/general" component={General} />
    </Switch>
  );
}

export default AdminRoutes;
