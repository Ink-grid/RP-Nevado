import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import { useGet } from "services";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

//modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

import CartList from './ListaPedidos';

import { Button } from '@material-ui/core';



import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Pedidos = () => {

    const [data, setRefresh, setData] = useGet("https://pacific-mesa-11643.herokuapp.com/api/products");

    const [total, setTotal] = useState(0);

    const agregarProd = () => {
        setTotal(total + 1)
    }

    console.log(data);

    //modal
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const [columns] = useState(

        [
            {
                title: "Imagen", field: "image", type: "numeric", cellStyle: { padding: '10px' }, editable: 'never', render: rowData => (
                    <img
                        style={{ height: 36, borderRadius: '50%' }}
                        src={rowData.image}
                    />
                ),
            },
            { title: "Codigo", field: "cod_producto", type: "string", cellStyle: { padding: '10px' }, editable: 'never' },
            { title: "Categoria", field: "categoria", type: "string", cellStyle: { padding: '10px' }, editable: 'never' },
            { title: "Color", field: "color", type: "string", editable: 'never' },
            { title: "Cantidad", field: "cantidad", type: "numeric" }

        ]
    )
    const handlerClearCart = () => {
        setData(prevState => ({
            ...prevState,
            cart: [],
            suma: 0,
            total: 0
        }));
    };

    /* const sumProducts = array => {
       let total = 0;
       array.forEach(product => (total += product.order));
       setData(prevState => ({ ...prevState, total: total }));
     };*/

    const sumTotal = array => {
        var sum = 0;
        array.forEach(product => (sum += product.total));
        setData(prevState => ({ ...prevState, suma: sum }));
    };

    const handlerAddProduct = (indexCart, indexProduct) => {
        var statusCopy = Object.assign({}, data);
        let stock_status =
            statusCopy.data[indexProduct].stock -
            parseInt(statusCopy.data[indexProduct].cantidad);
        if (parseInt(stock_status) < 0) {
            alert('producto agotado o stock insuficiente');
            return;
        }

        statusCopy.cart[indexCart].total += statusCopy.cart[indexCart].price;
        statusCopy.cart[indexCart].order += parseInt(
            statusCopy.data[indexProduct].cantidad
        );
        statusCopy.data[indexProduct].stock -= parseInt(
            statusCopy.data[indexProduct].cantidad
        );
        setData(statusCopy);
        //sumProducts(statusCopy.cart);
        sumTotal(statusCopy.cart);
    };

    const handleSaveProduct = productId => {
        agregarProd()
        let product = data.data.find(p => p.cod_producto === productId);

        let indexProduct = data.data.findIndex(
            x => x.cod_producto === product.cod_producto
        );

        var productCart = {
            id: product.cod_producto,
            name: product.cod_producto,
            img: product.picture,
            price: product.precio_uni,
            order: parseInt(product.cantidad),
            total: product.precio_uni
        };

        var exist = data.cart.find(p => p.id === productId);

        if (undefined !== exist && exist !== null) {
            let indexCart = data.cart.findIndex(x => x.id === exist.id);
            //console.log(indexCart)
            handlerAddProduct(indexCart, indexProduct);
        } else {
            var statusCopy = Object.assign({}, data);
            statusCopy.data[indexProduct].stock -= parseInt(
                statusCopy.data[indexProduct].cantidad
            );

            //sumProducts(statusCopy.cart);
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
        return <div>Cargando</div>
    }

    return (
        <div style={{ maxWidth: "100%" }}>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div>
                    <CartList
                        items={data.cart}
                        onOpenOrder={handlerOpenOrder}
                        total={data.total}
                    />


                    <div>
                        <div>cantidad a pagar</div>
                        <div>total: {data.suma} </div>
                        <button>pagar</button>
                    </div>
                    <div>
                        <Button variant="contained" color="secondary">
                            Proceder
                        </Button>
                    </div>



                </div>


            </Modal>

            <MaterialTable
                style={{ padding: "3em" }}
                columns={columns}
                data={data.data}
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
                        icon: () =>
                            <div className={classes.root}>
                                <Badge color="secondary" badgeContent={total}>
                                    <ShoppingBasketIcon />
                                </Badge>
                            </div>

                        ,

                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => handleOpen()
                    }

                ]}
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
                                resolve()
                            }, 1000)
                        }),
                }}

                title="CATALOGO DE PEDIDOS"
            />
        </div>


    );
}

export default Pedidos;