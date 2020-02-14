import React from 'react';
import Magnifier from 'react-magnifier';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    minHeight: 100
  },
  media: {
    maxWidth: 200,
    height: 100
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));
const Descripcion = props => {
  const classes = useStyles();

  return (
    <Modal
      aria-describedby="transition-modal-description"
      aria-labelledby="transition-modal-title"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      className={classes.modal}
      closeAfterTransition
      onClose={props.handleClose}
      open={props.open}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <Magnifier
            src={props.img ? props.img.imgheader : null}
            width={500}
          />
          <Divider />
          <Grid
            container
            spacing={2}
            style={{ padding: '1em' }}
          >
            {props.img
              ? props.img.imgconteiner.map((ele, index) => (
                <Grid
                  item
                  key={index}
                  xs={4}
                >
                  <Paper
                    elevation={3}
                    onClick={() => props.setHeaderimg(ele)}
                  >
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={ele}
                          title="Nevado Store"
                        />
                      </CardActionArea>
                    </Card>
                  </Paper>
                </Grid>
              ))
              : null}
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default Descripcion;
