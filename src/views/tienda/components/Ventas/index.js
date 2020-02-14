import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
/*Grid material UI*/
import { FormGroup, FormControlLabel, Checkbox, TextField, InputAdornment } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CreateIcon from '@material-ui/icons/Create';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InputLabel from '@material-ui/core/InputLabel';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
/**formulario */

import { Alert } from '@material-ui/lab';

import { Button } from '@material-ui/core';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '1em'
  },
  formControl: {
    minWidth: 140,
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Ventas = () => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [documento, setDocumento] = React.useState('');

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    checkedF: false,
    checkedG: false
  });

  const handleChange = event => {
    setDocumento(event.target.value);
  };

  const [columns] = useState([
    { title: 'Codigo', field: 'codigo' },
    { title: 'Precio', field: 'precio', type: 'numeric' },
    {
      title: 'Stock',
      field: 'stock',
      type: 'numeric',
      sellStyle: { width: 20, maxWidth: 20 }
    },
    {
      title: 'Cantidad',
      field: 'cantidad',
      type: 'numeric',
      sellStyle: { width: 10, maxWidth: 10 }
    }
  ]);
  
  
  const [columns1] = useState([
	{ title: 'Codigo', field: 'codigo', headerStyle: {
		backgroundColor: '#C9CDD0'} },
	{ title: 'Descripcion', field: 'descripcion', type: 'numeric', headerStyle: {
		backgroundColor: '#C9CDD0'}},
	{ title: 'Precio', field: 'precio', type: 'numeric',  headerStyle: {
		backgroundColor: '#C9CDD0'} },
    { title: 'Cantidad', field: 'cantidad', type: 'numeric', headerStyle: {
		backgroundColor: '#C9CDD0'} },
	{ title: 'Sub. Total', field: 'stock', type: 'numeric', headerStyle: {
		backgroundColor: '#C9CDD0', } },
	{ title: 'IGV', field: 'stock', type: 'numeric', headerStyle: {
		backgroundColor: '#C9CDD0'}  },
	{ title: 'importe', field: 'stock', type: 'numeric', headerStyle: {
		backgroundColor: '#C9CDD0'}},
  ]);

  const [data, setData] = useState([
    { codigo: 'producto1', precio: '20.5', stock: 10, cantidad: 20 },
    { codigo: 'producto2', precio: '10.5', stock: 11, cantidad: 61 },
    { codigo: 'producto3', precio: '11', stock: 10, cantidad: 63 },
    { codigo: 'producto4', precio: '15.5.', stock: 12, cantidad: 63 },
    { codigo: 'producto5', precio: '10.2', stock: 15, cantidad: 68 },
    { codigo: 'producto6', precio: '23.5', stock: 16, cantidad: 25 },
    { codigo: 'producto7', precio: '2.99', stock: 18, cantidad: 15 },
    { codigo: 'product8', precio: '9.99', stock: 10, cantidad: 10 }
  ]);

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Typography
          component="div"
          style={{ paddingLeft: '1em', paddingTop: "1em", paddingRight: "1em" }}
        >
          <Box
            fontFamily="Monospace"
            fontWeight="fontWeightBold"
            m={1}
            textAlign="left"
          >
            TIPO DE COMPROBANTE:
          </Box>
          <Divider />

          <FormGroup
            row
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1em'
            }}
          >
            <FormControlLabel
              control={<Checkbox
                checked={state.checkedA}
                value="checkedA"
                       />}
              label="Factura"
            />

            <FormControlLabel
              control={<Checkbox
                checked={state.checkedB}
                value="checkedA"
                       />}
              label="Boleta"
            />

            <FormControlLabel
              control={<Checkbox
                checked={state.checkedF}
                value="checkedA"
                       />}
              label="Nota de Crédito"
            />
            <FormControlLabel
              control={<Checkbox
                checked={state.checkedG}
                value="checkedA"
                       />}
              label="Nota de Débito"
            />
          </FormGroup>
        </Typography>

		{/* formulario de envio de las ventas */}

		<form>
				
		<Typography
          component="div"
          style={{ paddingLeft: '1em', paddingRight: "1em" }}
        >
          <Box
            fontFamily="Monospace"
            fontWeight="fontWeightBold"
            m={1}
            textAlign="left"
          >
            FACTURA:
          </Box>
          <Divider />

          <FormGroup
			row
			style={{paddingTop: "2em", paddingRight: "1em", paddingLeft: "1em"}}
          >

<Grid container justify="center" spacing={2}>
<Grid item xs={3}> 
            <TextField
          id="filled-required"
          label="Serie"
          defaultValue="F001"
		  variant="outlined"
		  InputProps={{
			startAdornment: (
			  <InputAdornment position="start">
				<ViewWeekIcon />
			  </InputAdornment>
			),
		  }}
        />
		</Grid>
		<Grid item xs={3}> 
		<TextField
          id="filled-required"
          label="Número (6 números)"
          defaultValue="658043"
		  variant="outlined"
		  InputProps={{
			startAdornment: (
			  <InputAdornment position="start">
				<DescriptionIcon />
			  </InputAdornment>
			),
		  }}
        />
		</Grid>
		<Grid item xs={3}> 
<TextField
          id="filled-required"
          label="Fecha.Doc"
          defaultValue="2020-02-05"
		  variant="outlined"
		  InputProps={{
			startAdornment: (
			  <InputAdornment position="start">
				<DateRangeIcon />
			  </InputAdornment>
			),
		  }}
        />
	</Grid>
	<Grid item xs={3}> 
<TextField
          id="filled-required"
          label="Moneda *"
          defaultValue="soles"
		  variant="outlined"
		  InputProps={{
			startAdornment: (
			  <InputAdornment position="start">
				<LocalAtmIcon />
			  </InputAdornment>
			),
		  }}
        />
		</Grid>
		 </Grid>
          </FormGroup>
		 
        </Typography>

		<Typography
          component="div"
          style={{ paddingLeft: '1em', paddingRight: "1em", paddingTop: "1em" }}
        >
          <Box
            fontFamily="Monospace"
            fontWeight="fontWeightBold"
            m={1}
            textAlign="left"
          >
            CLIENTE:
          </Box>
          <Divider />

          <FormGroup
			row
			style={{paddingTop: "2em", paddingRight: "1em", paddingLeft: "1em"}}
          >

<Grid container justify="center" spacing={2}>
<Grid item xs={2}> 
<FormControl className={classes.formControl} >
<InputLabel id="demo-simple-select-label">Tipo de Documento * </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
		  onChange={handleChange}
		  defaultValue={'RUC'}
        >
          <MenuItem value={10}>RUC</MenuItem>
        </Select>
		</FormControl>
		</Grid>

		<Grid item xs={5}> 
		<Grid container spacing={2}>
			<Grid item xs={8}>
		<TextField
          id="filled-required"
		  label=" N° de RUC *"
		  variant="outlined"
		  placeholder="Número de RUC"
		  InputProps={{
			startAdornment: (
			  <InputAdornment position="start">
				<CreateIcon />
			  </InputAdornment>
			),
		  }}
        />
		</Grid>
		<Grid item xs={4}>
		 <Button variant="contained" style={{height: "100%"}} color="primary">
		 <SearchIcon/>
      </Button>
	  </Grid>
	  </Grid>
		</Grid>
		<Grid item xs={5}> 
<TextField
          id="filled-required"
		  label="Razón Social *"
		  placeholder="Razón Social "
		  fullWidth
		  variant="outlined"
		  InputProps={{
			startAdornment: (
			  <InputAdornment position="start">
				<AssignmentIndIcon />
			  </InputAdornment>
			),
		  }}
        />
	</Grid>
	<Grid item xs={12}> 
<TextField
          id="filled-required"
		  label="Dirección *"
		  placeholder="Escribe aqui la direccion completa"
		  fullWidth
		  variant="outlined"
		  InputProps={{
			startAdornment: (
			  <InputAdornment position="start">
				<HomeIcon />
			  </InputAdornment>
			),
		  }}
        />
		</Grid>
		 </Grid>
          </FormGroup>
		 
        </Typography>

		{/* productos activos */}

		<Typography
          component="div"
          style={{ paddingLeft: '1em', paddingRight: "1em", paddingTop: "1em" }}
        >
          <Box
            fontFamily="Monospace"
            fontWeight="fontWeightBold"
            m={1}
            textAlign="left"
          >
            PRODUCTOS ACTIVOS EN INVENTARIO:
          </Box>
          <Divider />

		  <div style={{padding: "1em"}}>
          <MaterialTable
              actions={[
                {
                  icon: () => <AddShoppingCartIcon />,
                  tooltip: 'Save User',
                  onClick: (event, rowData) => (
                    <Alert severity="success">
                      This is a success alert — check it out!
                    </Alert>
                  )
                }
              ]}
              columns={columns}
              data={data}
              elevation={2}
              title="Productos"
            />
		 </div>
        </Typography>

		{/* DETALLE DOCUMENTO */}


		<Typography
          component="div"
          style={{ paddingLeft: '1em', paddingRight: "1em", paddingTop: "1em" }}
        >
          <Divider />

		  <div style={{padding: "1em"}}>
          <MaterialTable
              actions={[
                {
                  icon: () => <AddShoppingCartIcon />,
                  tooltip: 'Save User',
                  onClick: (event, rowData) => (
                    <Alert severity="success">
                      This is a success alert — check it out!
                    </Alert>
                  )
                }
              ]}
              columns={columns1}
              data={[]}
              elevation={2}
			  title='DETALLE DOCUMENTO:'
			  options={{
				search: false
			  }}
            />
		 </div>
        </Typography>

		</form>		


      </Paper>

      <Grid
        container
        spacing={1}
      >
        <Grid
          item
          xs={6}
        >
          <Paper
            className={classes.paper}
            elevation={0}
          >
            
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Ventas;
