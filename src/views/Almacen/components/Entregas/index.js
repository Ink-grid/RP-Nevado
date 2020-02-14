import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { database } from 'utils/firebase';
import { StoreContext } from 'context/StoreContext';
import AddSalidas from './addSalida';
import Typography from '@material-ui/core/Typography';
import './style.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 200
    //height: 100
  },
  media: {
    height: 100
  }
});

const Pedidos = props => {
  const classes = useStyles();
  const { state } = useContext(StoreContext);
  const [salidas, setSalidas] = React.useState({
    status: false,
    data: null,
    codigo: null
  });

  const showSalidas = (data, cod_tienda) => {
    setSalidas({ status: true, data: data, codigo: cod_tienda });
  };
  const handleCloseSalidads = () => {
    setSalidas({ status: false, data: null });
  };

  const updateEstatePedido = async cod_tienda => {
    let keyPedido = await database
      .ref('NevadoStore/Pedidos')
      .orderByChild('cod_tienda')
      .equalTo(cod_tienda)
      .once('value');

    if (keyPedido.val()) {
      const data = {
        status: true
      };

      let key = Object.keys(keyPedido.val());
      key.forEach(async element => {
        await database.ref(`NevadoStore/Pedidos/${element}`).update(data);
      });
    }

    try {
      state.refresh(Math.random());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: '1em' }}>
      <AddSalidas
        cod_tienda={salidas.codigo}
        data={salidas.data}
        handleClose={handleCloseSalidads}
        open={salidas.status}
      />

      <Paper
        elevation={3}
        style={{ padding: '1em' }}
      >
        <Grid
          container
          spacing={2}
        >
          {state.pedido.length !== 0 &&
            state.pedido.map((element, index) => (
              <Grid
                item
                key={index}
                xs={3}
              >
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://images-na.ssl-images-amazon.com/images/I/71FipM80%2BaL._SX500_.jpg"
                      title="nevado store"
                    />
                    <CardContent>
                      <Typography
                        component="h2"
                        gutterBottom
                        variant="h5"
                      >
                        Total: {element.total}
                      </Typography>

                      {element.productos.map((eleme, index) => (
                        <Typography
                          className="codigos"
                          color="textSecondary"
                          component="p"
                          key={index}
                          onClick={() => showSalidas(eleme, element.cod_tienda)}
                          variant="body2"
                        >
                          {eleme.cod_producto} ({eleme.order})
                        </Typography>
                      ))}
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      color="primary"
                      onClick={() => updateEstatePedido(element.cod_tienda)}
                      size="small"
                    >
                      Entregado
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default Pedidos;
