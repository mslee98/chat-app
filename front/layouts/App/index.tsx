import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '@pages/LogIn';
import Signup from '@pages/SignUp';
import Workspace from '@layouts/Workspace';

const App = () => {

    return (
        <>
            <Switch>
                <Redirect exact path="/" to="/Login" />
                <Route path="/Login" component={Login} />
                <Route path="/Signup" component={Signup} />
                <Route path="/Workspace" component={Workspace} />
            </Switch>
        </>
    )
}

export default App;