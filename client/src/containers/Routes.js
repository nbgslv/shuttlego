import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Signin from './Forms/Signin/Signin';
import Register from './Forms/Register/Register';
import AdminContainer from './Admin/AdminContainer';
import DBTableContainer from './Admin/DBTables/DBTablesContainer';
import { withAuthUserWrapped } from '../components/ProtectedRouteUser';
import { withAuthSessWrapped } from '../components/ProtectedRouteSession';
import Logout from '../components/Logout/Logout';
import Shuttles from './Shuttles/Shuttles';
import ShuttleDelete from '../components/ShuttleDelete/ShuttleDelete';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route path="/users/shuttle" component={withAuthUserWrapped(withAuthSessWrapped(Register))} />
      <Route path="/users/deleteshuttle" component={withAuthUserWrapped(ShuttleDelete)} />
      <Route path="/users/shuttles" component={withAuthUserWrapped(Shuttles)} />
      <Route path="/admin/register" component={DBTableContainer} />
      <Route path="/admin" component={AdminContainer} />
      <Route path="/logout" component={Logout} />
      <Route path="/admin/tables/:table" component={DBTableContainer} />
    </Switch>
  );
}

export default Routes;
