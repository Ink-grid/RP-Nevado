import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useGet } from 'services';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
//modal
import { DirectionSnackbar } from 'utils/Libs';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CartList from './ListaPedidos';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const Pedidos = () => {
  const [data, setRefresh, setData] = useGet(
    'https://pacific-mesa-11643.herokuapp.com/api/products'
  );

  const [confirm, setConfirm] = React.useState({
    status: false,
    message: null,
    position: 'left'
  });

  const handleCloseconfir = () => {
    setConfirm(prevs => ({ ...prevs, status: false }));
  };

  const responseModalconfirm = message => {
    setConfirm(prevs => ({ ...prevs, status: true, message: message }));
  };

  const [total, setTotal] = useState(0);

  const agregarProd = () => {
    setTotal(total + 1);
  };

  const set_pedido = () => {
    setTotal(0);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    if (total !== 0) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [columns] = useState([
    {
      title: 'Imagen',
      field: 'image',
      type: 'numeric',
      cellStyle: { padding: '10px' },
      editable: 'never',
      render: rowData => (
        <img
          src={rowData.image}
          style={{ height: 36, borderRadius: '50%' }}
        />
      )
    },
    {
      title: 'Codigo',
      field: 'cod_producto',
      type: 'string',
      cellStyle: { padding: '10px' },
      editable: 'never'
    },
    {
      title: 'Categoria',
      field: 'categoria',
      type: 'string',
      cellStyle: { padding: '10px' },
      editable: 'never'
    },
    { title: 'Color', field: 'color', type: 'string', editable: 'never' },
    { title: 'Cantidad', field: 'cantidad', type: 'numeric' }
  ]);
  const handlerClearCart = () => {
    setData(prevState => ({
      ...prevState,
      cart: [],
      total: 0
    }));
  };

  const sumTotal = array => {
    var sum = 0;
    array.forEach(product => (sum += product.order));
    setData(prevState => ({ ...prevState, total: sum }));
  };

  const handlerAddProduct = (indexCart, indexProduct) => {
    var statusCopy = Object.assign({}, data);

    statusCopy.cart[indexCart].order += parseInt(
      statusCopy.data[indexProduct].cantidad
    );
    setData(statusCopy);
    sumTotal(statusCopy.cart);
  };

  const handleSaveProduct = productId => {
    agregarProd();
    let product = data.data.find(p => p.cod_producto === productId);

    let indexProduct = data.data.findIndex(
      x => x.cod_producto === product.cod_producto
    );

    var productCart = {
      cod_producto: product.cod_producto,
      name: product.cod_producto,
      img: product.image,
      order: parseInt(product.cantidad)
    };

    var exist = data.cart.find(p => p.cod_producto === productId);

    if (undefined !== exist && exist !== null) {
      let indexCart = data.cart.findIndex(
        x => x.cod_producto === exist.cod_producto
      );
      handlerAddProduct(indexCart, indexProduct);
    } else {
      var statusCopy = Object.assign({}, data);
      statusCopy.data[indexProduct].stock -= parseInt(
        statusCopy.data[indexProduct].cantidad
      );

      sumTotal(statusCopy.cart);
      setData(prevState => ({
        ...prevState,
        total: parseInt(statusCopy.data[indexProduct].cantidad),
        cart: statusCopy.cart.concat([productCart])
      }));
    }
  };

  const handlerOpenOrder = event => {
    event.preventDefault();
    setData(prevState => ({ ...prevState, openOrder: true }));
    //this.setState({ openOrder: true });
  };

  if (!data) {
    return <div>Cargando</div>;
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <Modal
        aria-describedby="spring-modal-description"
        aria-labelledby="spring-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        //reponse={responseModalconfirm}
        className={classes.modal}
        closeAfterTransition
        onClose={handleClose}
        open={open}
      >
        <div className={classes.paper}>
          <CartList
            clearNumPedidos={set_pedido}
            clearPedidos={handlerClearCart}
            closeModal={handleClose}
            items={data.cart}
            onOpenOrder={handlerOpenOrder}
            reponse={responseModalconfirm}
            total={data.total}
          />
        </div>
      </Modal>
      <DirectionSnackbar
        handleClose={handleCloseconfir}
        message={confirm.message}
        open={confirm.status}
        position={confirm.position}
      />
      <MaterialTable
        actions={[
          {
            icon: () => <AddCircleIcon />,
            tooltip: 'Pedir',
            onClick: (event, rowData) => handleSaveProduct(rowData.cod_producto)
          },
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => setRefresh(Math.random())
          },
          {
            icon: () => (
              <div className={classes.root}>
                <Badge
                  badgeContent={total}
                  color="secondary"
                >
                  <ShoppingBasketIcon />
                </Badge>
              </div>
            ),

            tooltip: 'Cesta de pedidos',
            isFreeAction: true,
            onClick: () => handleOpen()
          }
        ]}
        columns={columns}
        data={data.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            })
        }}
        style={{ padding: '3em' }}
        title="CATALOGO DE PEDIDOS"
      />
    </div>
  );
};

export default Pedidos;
