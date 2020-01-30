import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';

/*Grid material UI*/
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

/**formulario */
import { FormGroup, InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';

import { Button } from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		padding: "1em"
	},
	paper: {
		margin: theme.spacing(2, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
}));

const Ventas = () => {
	const classes = useStyles();

	const [columns] = useState(
		[
			{ title: "Codigo", field: "codigo" },
			{ title: "Precio", field: "precio", type: "numeric" },
			{ title: "Stock", field: "stock", type: "numeric", sellStyle: { width: 20, maxWidth: 20 } },
			{ title: "Cantidad", field: "cantidad", type: "numeric", sellStyle: { width: 10, maxWidth: 10 } }

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

			<Grid container spacing={1}>
				<Grid item xs={6}>
					<div className={classes.paper} style={{ marginTop: '10px' }}>
						<form className={classes.form} noValidate>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<TextField
									variant='outlined'
									margin='dense'
									id='serie'
									label='Serie de documento'
									name='serie'
									autoComplete='serie'>
								</TextField>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant='outlined'
									margin='dense'
									id='documento'
									label='Documento N°'
									name='documento'
									autoComplete='documento'>
								</TextField>
							</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={6}>
									<TextField
										variant='outlined'
										margin='dense'
										fullWidth
										id='tipo_doc'
										label='Tipo de documento'
										name='tipo_doc'
										autoComplete='tipoDocumento'>
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant='outlined'
										margin='dense'
										fullWidth
										id='ruc'
										label='RUC de la empresa'
										name='ruc'
										autoComplete='ruc'
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant='outlined'
										margin='dense'
										fullWidth
										id='cliente'
										label='cliente'
										name='cliente'
										autoComplete='cliente'
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant='outlined'
										margin='dense'
										fullWidth
										id='vendedor'
										label='Vendedor'
										name='vendedor'
										autoComplete='vendedor'
									/>
								</Grid>
							</Grid>
							<br />
							
							<Grid container spacing={1}>
								<Paper className={classes.paper} elevation={0}>
									Productos
								</Paper>
							</Grid>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}>
								Guardar
							</Button>
						</form>
					</div>

				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={0}>
						<MaterialTable
							columns={columns}
							data={data}
							elevation={2}
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
							title="Productos"

							actions={[
								{
									icon: () => <AddShoppingCartIcon />,
									tooltip: 'Save User',
									onClick: (event, rowData) => <Alert severity="success">This is a success alert — check it out!</Alert>
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