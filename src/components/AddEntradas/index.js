import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearIndeterminate } from '../UtilsModel/';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2)
    }
  },
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
   // boxShadow: theme.shadows[5]
  },
  paperform: {
		margin: theme.spacing(4, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
  // padding: {
  //   padding: theme.spacing(2, 4, 3)
  // }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      isNumericString
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      prefix="S/. "
      thousandSeparator
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
  };
}

const AddEntradas = props => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [progress, setProgress] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');


  const getDates = () => {
      let n =  new Date();
      //Año
      let y = n.getFullYear();
      //Mes
      let m = n.getMonth() + 1;
      //Día
      let d = n.getDate();
      if(m < 10){
      let fecha = y + "-" + '0'+m + "-" + d;
      return fecha
      }

      return y + "-" + m + '-' + d
  }

  const [selectedDate, setSelectedDate] = React.useState(
    getDates()
  );  

  const replaceString = str => {
    let res = str.replace(/S\/\./g, '');
    let nuevo = res.replace(/,/g, '').replace(/ /g, '');
    return nuevo;
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function Alert(props) {
    return <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
    />;
  }

  const onchange = async e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const Data = {
      cod_producto: props.codigo,
      fecha: form.get('data'),
      descripcion: form.get('Descripcion'),
      fabricante: form.get('fabricante') ,
      ruc_fabricante: form.get('rucfabricante'),
      procedencia: form.get('procedencia'),
      valor_uni: parseInt(replaceString(form.get('valor_uni'))),
      cantidad: parseInt(form.get('cantidad'))
    };
    setProgress(true);
    try {
      const response = await fetch('https://pacific-mesa-11643.herokuapp.com/api/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
      });
      const data = await response.json();
      console.log(data);
      if (data.status) {
        setProgress(false);
        setSeverity('success');
        setOpen(true);
        props.handleClose()
      } else {
        setProgress(false);
        setSeverity('error');
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [values, setValues] = React.useState(0);

  const handleChange = name => event => {
    setValues(event.target.value);
  };

  return (
    <div>
      <Modal
        aria-describedby="simple-modal-description"
        aria-labelledby="simple-modal-title"
        onClose={props.handleClose}
        open={props.open}
      >
        <div
          className={classes.paper}
          style={modalStyle}
        >
           {progress && <LinearIndeterminate />}
          <Paper style={{padding: "1em"}} elevation={3} > 
          <Alert severity="info">REGISTRO DE COMPRA — {props.codigo}</Alert>
          <br></br>
          <Paper style={{padding: "1em"}} elevation={3}> 
          <form
                autoComplete="off"
                onSubmit={onchange}
              >
          <Grid container spacing={2}>
         
            <Grid item xs={6}>
            <TextField
              id="fecha"
              label="Fecha:"
              fullWidth
              variant="outlined"
              type="date"
              name="data"
              defaultValue={selectedDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              />
            </Grid>

          <Grid item xs={6}>
          <TextField
          id="outlined-number"
          label="Codigo Producto:"
          fullWidth
          disabled
          defaultValue={props.codigo}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
          </Grid> 

          <Grid item xs={12}>

          <TextField
						variant='outlined'
						fullWidth
						id='descripcion'
						label='Descripcion'
						name='Descripcion'
						required
					/>
          </Grid>

          
        
        <Grid item xs={12}>
        <Divider />
        </Grid>

        <Grid item xs={6}>
          <TextField
          id="outlined-number"
          label="FABRICANTE"
          fullWidth
          name="fabricante"
          placeholder="Nombre del fabricante"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        </Grid>
        <Grid item xs={6}>
          <TextField
          id="outlined-number"
          label="RUC"
          name="rucfabricante"
          fullWidth
          placeholder="RUC del proveedor"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        </Grid>

        <Grid item xs={12}>
          <TextField
          id="outlined-number"
          fullWidth
          label="PROCEDENCIA"
          name="procedencia"
          placeholder="Lugar de procedencia"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        </Grid>
          
        <Grid item xs={12}>
        <Divider />
        </Grid>

        <Grid item xs={6}>
        <TextField
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                  label="valor unitario"
                  variant='outlined'
                  fullWidth
                  name="valor_uni"
                  onChange={handleChange('numberformat')}
                  required
                  value={values}
                />
        </Grid>

        <Grid item xs={6}>
        <TextField
                  id="standard-number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label="Cantidad"
                  name="cantidad"
                  required
                  variant='outlined'
                  type="number"
                />
         
         </Grid>

         <Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Guardar
					</Button>

         </Grid>
         </form>
          </Paper>
          </Paper>
        </div>
      </Modal>
      <Snackbar
        autoHideDuration={4000}
        onClose={handleClose}
        open={open}
      >
        {severity === 'success' ? (
          <Alert
            onClose={handleClose}
            severity="success"
          >
            se ingreso con exito la compra
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
          >
            ocurrio un error al ingresar la compra
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default AddEntradas;
