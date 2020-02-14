import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearIndeterminate } from 'components/UtilsModel/';
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
import { post } from 'services/'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2)
    }
  },
  paper: {
    position: 'absolute',
    width: 500,
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

const AddSalidas = props => {

    console.log(props)

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
      cod_producto: props.data.cod_producto,
      fecha: form.get('data'),
      descripcion: form.get('Descripcion'),
      cod_tienda: (form.get('cod_tienda')),
      cantidad: parseInt(form.get('cantidad'))
    };
    setProgress(true);
    try {
      const response = await post('https://pacific-mesa-11643.herokuapp.com/api/ventas',Data)
      if (response.status) {
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
          <Alert severity="info">REGISTRO DE ENTREGA — {props.data ? props.data.cod_producto : null}</Alert>
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
          defaultValue={props.data ? props.data.cod_producto : null}
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
                  label="Codigo Tienda"
                  variant='outlined'
                  fullWidth
                  defaultValue={props.cod_tienda}
                  name="cod_tienda"
                  required
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
                  defaultValue={props.data ? props.data.order : null}
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
            Se registro con exito la entrega del pedido
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
          >
            Ocurrio un error al ingresar el pedido
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default AddSalidas;