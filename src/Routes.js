import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import { Clientes, InventarioTienda, Pedidos, Ventas } from './views/tienda/';
import { useRouter } from 'services/';
import { Inventario, Compras, Entregas } from './views/Almacen/';
import CatalogoVirtual from './views/CatalogoVirtual/';
import Descripcion from './views/CatalogoVirtual/Descripcion/';
import {
  SignIn as SignInView,
  SignUp as SignUpView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  const { state } = useContext(StoreContext);

  const [route] = useRouter(
    `https://pacific-mesa-11643.herokuapp.com/api/users/${
      state.user ? state.user.displayName : null
    }`
  );

  const returnComponente = name => {
    switch (name) {
      case 'InventarioTienda':
        return (
          <MainLayout>
            <InventarioTienda />
          </MainLayout>
        );
      case 'Ventas':
        return (
          <MainLayout>
            <Ventas />
          </MainLayout>
        );
      case 'Pedidos':
        return (
          <MainLayout>
            <Pedidos />
          </MainLayout>
        );
      case 'Clientes':
        return (
          <MainLayout>
            <Clientes />
          </MainLayout>
        );
      case 'Inventario':
        return (
          <MainLayout>
            <Inventario />
          </MainLayout>
        );
      case 'Entregas':
        return (
          <MainLayout>
            <Entregas />
          </MainLayout>
        );

      case 'usarios':
        return (
          <MainLayout>
            <SignUpView />
          </MainLayout>
        );

      case 'catalogo':
        return <CatalogoVirtual />;

      case 'descripcion-catalogo':
        return (
          <MinimalLayout>
            <Descripcion />
          </MinimalLayout>
        );
      default:
        break;
    }
  };

  if (!route) {
    if (!state.user) {
      return <SignInView />;
    }

    if (!state.login) {
      return <SignInView />;
    }
    return <div>cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Switch>
        {/* <Redirect
          exact
          from="/"
          to="/catalogo-virtual"
        /> */}

        {route.map((eleme, index) => {
          return (
            <Route
              exact
              key={index}
              path={eleme.href}
              render={() =>
                state.login ? returnComponente(eleme.component) : <SignInView />
              }
            />
          );
        })}
        {/* <Route
          exact
          path="/"
          render={() => {
            if (state.login) {
              switch (state.user.displayName) {
                case 'almacen':
                  return (
                    <MainLayout>
                      <Inventario />
                    </MainLayout>
                  );

                case 'tienda01':
                  return (
                    <MainLayout>
                      <InventarioTienda />
                    </MainLayout>
                  );

                default:
                  return (
                    <MainLayout>
                      <Inventario />
                    </MainLayout>
                  );
              }
            } else {
              return <SignInView />;
            }
          }}
        /> */}
        {/* /* // state.login && state.user.displayName === 'almacen' ? ( // ) : ( //
        // ) } /> */}
        <Route
          path="/not-found"
          render={() => (
            <MinimalLayout>
              <NotFoundView />
            </MinimalLayout>
          )}
        />

        {/* <Route
          path="/catalogo-virtual"
          render={() => <CatalogoVirtual />}
        /> */}
        {/* 
        <Route
          path="/register-user"
          render={() => (
            <MainLayout>
              <SignUpView />
            </MainLayout>
          )}
        /> */}
        {/* <Route
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
        /> */}
        {/* rutas de almacen */}
        {/* <Route
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

        <Route
          path="/sales"
          render={() =>
            state.login ? (
              <MainLayout>
                <Compras />
              </MainLayout>
            ) : (
              <SignInView />
            )
          }
        />

        <Route
          path="/deliveries"
          render={() =>
            state.login ? (
              <MainLayout>
                <Entregas />
              </MainLayout>
            ) : (
              <SignInView />
            )
          }
        /> */}
        {/* fin rutas almacen */}
        {/*rutas de tienda */}
        {/* <Route
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
          path="/sales-shop"
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
        /> */}
        {/*fin rutas de tienda */}
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
