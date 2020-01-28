import React, { useContext } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import Inventario from './views/Inventario/';

import {Clientes,InventarioTienda,Pedidos,Ventas} from './views/tienda/';



import {
  SignIn as SignInView,
  SignUp as SignUpView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  const { state } = useContext(StoreContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            state.login ? (
              <MainLayout>
                <Inventario />
              </MainLayout>
            ) : (
              <SignInView />
            )
          }
        />
        <Route
          path="/not-found"
          render={() => (
            <MinimalLayout>
              <NotFoundView />
            </MinimalLayout>
          )}
        />

        <Route
          path="/register-user"
          render={() => (
            <MainLayout>
              <SignUpView />
            </MainLayout>
          )}
        />
        <Route
          path="/inventory"
          render={() =>
            state.login ? (
              <MainLayout>
                <Inventario />
              </MainLayout>
            ) : (
              <SignInView />
            )
          }
        />
        {/*rutas de tienda */}
        <Route
          exact
          path="/inventory-shop"
          render={() =>
            state.login ? (
              <MainLayout>
                <InventarioTienda />
              </MainLayout>
            ) : (
              <SignInView />
            )
          }
        />
        <Route
          exact
          path="/sales"
          render={() =>
            state.login ? (
              <MainLayout>
                <Ventas />
              </MainLayout>
            ) : (
              <SignInView />
            )
          }
        />
        <Route
          exact
          path="/orders"
          render={() =>
            state.login ? (
              <MainLayout>
                <Pedidos />
              </MainLayout>
            ) : (
              <SignInView />
            )
          }
        />
        <Route
          exact
          path="/clients"
          render={() =>
            state.login ? (
              <MainLayout>
                <Clientes />
              </MainLayout>
            ) : (
              <SignInView />
            )
          }
        />
        {/*fin rutas de tienda */}
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
