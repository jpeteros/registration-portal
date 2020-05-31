import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Login} from './components/Login';
import {LoginForm} from './components/LoginForm';
import {Register} from './components/Register';
import {EditRegister} from './components/EditRegister';

import {GlobalProvider} from './context/GlobalState';

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App" style={{maxWidth: "30rem", margin: "4rem auto"}}>
      <GlobalProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route  path="/register" component={Register} />
            <Route  path="/loginForm" component={LoginForm} />
            <Route  path="/edit/:id" component={EditRegister} />
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
