import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '@pages/LogIn';
import Signup from '@pages/SignUp';
import Workspace from '@layouts/Workspace';

const App = () => {

    return (
        <>
            <Switch>
                <Redirect exact path="/" to="/login" />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/workspace/:workspace" component={Workspace} />
                <Route path="/workspace/myWorkspace" component={Workspace} />
            </Switch>
        </>
    )
}

export default App;