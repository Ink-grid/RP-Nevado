import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';

/*Grid material UI*/
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

/**formulario */
import { FormGroup, InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { Button } from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: "1em"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "100%"
    },
}));

const Ventas = () => {
    const classes = useStyles();

    const [columns] = useState(
        [
            { title: "Codigo", field: "codigo" },
            { title: "Precio", field: "precio", type: "numeric" },
            { title: "Stock", field: "stock", type: "numeric" },
            { title: "Cantidad", field: "cantidad", type: "numeric" }

        ]
    )
    const [columns1] = useState(
        [
            { title: "CODIGO", field: "codigo" },
            { title: "CANT", field: "precio", type: "numeric" },
            { title: "UNIDAD", field: "stock", type: "numeric" },
            { title: "DESCRIPCION", field: "cantidad", type: "numeric" },
            { title: "PRECIO UNIT.", field: "cantidad", type: "numeric" },
            { title: "PRECIO TOTAL", field: "cantidad", type: "numeric" }


        ]
    )
    const [data, setData] = useState(
        [
            { codigo: "producto1", precio: "20.5", stock: 10, cantidad: 20 },
            { codigo: "producto2", precio: "10.5", stock: 11, cantidad: 61 },
            { codigo: "producto3", precio: "11", stock: 10, cantidad: 63 },
            { codigo: "producto4", precio: "15.5.", stock: 12, cantidad: 63 },
            { codigo: "producto5", precio: "10.2", stock: 15, cantidad: 68 },
            { codigo: "producto6", precio: "23.5", stock: 16, cantidad: 25 },
            { codigo: "producto7", precio: "2.99", stock: 18, cantidad: 15 },
            { codigo: "product8", precio: "9.99", stock: 10, cantidad: 10 }
        ]
    )

    return (


        <div className={classes.root}>

            <Grid container spacing={3}>
                <Grid item xs={6}>

                    <FormGroup className={FormGroup}>

                        <Paper className={classes.paper}>
                            <h2>NUEVA VENTA</h2>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <Paper className={classes.paper}>

                                                    <TextField
                                                        id="outlined-read-only-input"
                                                        label="Serie de documento"
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        id="outlined-read-only-input"
                                                        label="Tipo de documento"
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        id="outlined-read-only-input"
                                                        label="Cliente"
                                                        variant="outlined"
                                                    />
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={6}>
                                                            <InputLabel htmlFor="age-native-required">Forma de pago(*)</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"

                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value={10}>Ten</MenuItem>
                                                                <MenuItem value={20}>Twenty</MenuItem>
                                                                <MenuItem value={30}>Thirty</MenuItem>
                                                            </Select>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <InputLabel htmlFor="age-native-required">Tipo de pago(*)</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"

                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value={10}>Ten</MenuItem>
                                                                <MenuItem value={20}>Twenty</MenuItem>
                                                                <MenuItem value={30}>Thirty</MenuItem>
                                                            </Select>
                                                        </Grid>

                                                    </Grid>

                                                    <Grid container spacing={3}>
                                                        <Grid item xs={6}>

                                                        </Grid>
                                                        <Grid item xs={6}>

                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper className={classes.paper}>
                                                    <TextField
                                                        id="outlined-read-only-input"
                                                        label="Documento No"
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        id="outlined-read-only-input"
                                                        label="RUC | Empresa"
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        id="outlined-read-only-input"
                                                        label="Vendedor"
                                                        variant="outlined"
                                                    />
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} style={{paddingBottom:"2em"}}>
                                    <Paper className={classes.paper}>

                                    </Paper>
                                </Grid>
                            </Grid>
                            <Button  variant="contained" color="primary">
                                Facturar 
                            </Button>
                        </Paper>

                    </FormGroup>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <MaterialTable
                            columns={columns1}
                            data={data}
                            editable={{
                                onRowAdd: newData => {
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            console.log(newData)
                                        }, 600)

                                    })
                                    return (newData)
                                }
                            }}
                            title="Listado de productos"
                            actions={[
                                {
                                  icon: () => <AddShoppingCartIcon />,
                                  tooltip: 'Save User',
                                  onClick: (event, rowData) => alert("You saved " + rowData.name)
                                }
                              ]}
                        />
                    </Paper>

                </Grid>
            </Grid>
        </div>





    );
}

export default Ventas;