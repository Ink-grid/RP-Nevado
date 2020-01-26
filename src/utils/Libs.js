import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getIcons = name => {
  switch (name) {
    case 'inventario':
      return <AssignmentIcon />;
    case 'ventas':
      return <AddShoppingCartIcon />;

    case 'pedidos':
      return <LocalMallIcon />;

    case 'clientes':
      return <PeopleIcon />;

    case 'compras':
      return <ShoppingCartIcon />;

    case 'entregas':
      return <MotorcycleIcon />;

    case 'usuarios':
      return <AddCircleIcon />;

    default:
      break;
  }
};

export { timeout, getIcons };
