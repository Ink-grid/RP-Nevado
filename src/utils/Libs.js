import React from 'react';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider, useSnackbar } from 'notistack';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

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

const dialogConfirm = props => {
  return (
    <Dialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={props.handleClose}
      open={props.open}
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="primary"
          onClick={props.handleClose}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DirectionSnackbar = (props) => {
  // const [open, setOpen] = React.useState(true);
  // const [transition, setTransition] = React.useState(undefined);
  
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const TransitioPosition = position => {
    switch (position) {
      case 'left':
        return function TransitionLeft(props) {
          return <Slide
            {...props}
            
            direction="left"
          />;
        };

      case 'up':
        return function TransitionUp(props) {
          return <Slide
            {...props}
           
            direction="up"
                 />;
        };

      case 'right':
        return function TransitionRight(props) {
          return <Slide
            {...props}
            
            direction="right"
                 />;
        };

      case 'down':
        return function TransitionDown(props) {
          return <Slide
            {...props}
           
            direction="down"
          />;
        };

      default:
        break;
    }
  };

  return (
    <div>
      <Snackbar
        message={props.message}
        onClose={props.handleClose}
        open={props.open}
        autoHideDuration={2000}
        TransitionComponent={TransitioPosition(props.position)}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={props.handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};



function Mynotes() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = variant => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
    </React.Fragment>
  );
}

function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Mynotes />
    </SnackbarProvider>
  );
}

export { timeout, getIcons, dialogConfirm, DirectionSnackbar };
