import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { post } from 'services';
import Tabs from '@material-ui/core/Tabs';
import { StoreContext } from 'context/StoreContext';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Cart from './Cart';

const CartList = props => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState({
    isValid: false,
    isLoading: false
  });
  const { state } = useContext(StoreContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        aria-labelledby={`scrollable-auto-tab-${index}`}
        component="div"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        role="tabpanel"
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  const savePedidos = async () => {
    setLoading({ isValid: true, isLoading: true });
    const data = {
      productos: props.items,
      total: props.total,
      cod_tienda: state.user.uid
    };
    try {
      const result = await post(
        'https://pacific-mesa-11643.herokuapp.com/api/pedidos',
        data
      );
      if (result.status) {
        setLoading({ isValid: false, isLoading: false });
        //alert(result.message);
        props.clearPedidos();
        props.clearNumPedidos();
        props.closeModal();
        props.reponse(result.message)
      } else {
        setLoading({ isValid: false, isLoading: false });
        //alert(result.message);
        props.reponse(result.message)
      }
    } catch (error) {
      console.log(error);
      setLoading({ isValid: false, isLoading: false });
    }
  };

  return (
    <div>
      <div>
        {loading.isLoading && (
          <div>
            <LinearProgress />
            <br />
          </div>
        )}
        <div>
          <Typography
            align="center"
            component="h2"
            variant="h1"
          >
            Cesta de pedidos
          </Typography>
        </div>
        <div>
          <Typography
            align="center"
            component="h6"
            variant="h5"
          >
            total: {props.total}
          </Typography>
        </div>
      </div>
      <div style={{ padding: '2em' }}>
        <div>
          {props.items.map((p, index) => {
            return (
              <TabPanel
                index={index}
                value={value}
              >
                <div style={{ padding: '1em' }}>
                  <Cart
                    img={p.img}
                    key={p.cod_producto}
                    name={p.name}
                    order={p.order}
                  />
                </div>
              </TabPanel>
            );
          })}
        </div>
        <div
          style={{ width: '600px', display: 'flex', justifyContent: 'center' }}
        >
          <Tabs
            aria-label="scrollable auto tabs example"
            indicatorColor="primary"
            onChange={handleChange}
            scrollButtons="auto"
            textColor="primary"
            value={value}
            variant="scrollable"
          >
            {props.items.map((e, index) => (
              <Tab label={index + 1} />
            ))}
          </Tabs>
        </div>
      </div>

      <Button
        color="primary"
        disabled={loading.isValid}
        fullWidth
        onClick={() => savePedidos()}
        type="submit"
        variant="contained"
      >
        Guardar
      </Button>
    </div>
  );
};

export default CartList;
