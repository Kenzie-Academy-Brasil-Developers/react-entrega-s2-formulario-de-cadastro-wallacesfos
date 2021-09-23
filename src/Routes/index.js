import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import Sucesso from '../pages/Sucesso';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/home/:id/user/:name/email/:email">
                    <Home />
                </Route>
                <Route path="/sucesso/:name">
                    <Sucesso />
                </Route>
                <Route>
                    
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes