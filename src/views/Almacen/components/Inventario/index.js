import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
  FloatingActionButtons
} from '../../../../components/ModuleInventario';
import { storage } from '../../../../utils/firebase';
import Backdrop from '@material-ui/core/Backdrop';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGet, post, patch, deleted } from '../../../../services/useService';
import {EstadoProductos, ProductosActivos } from './components/'


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Inventario = () => {

  const classes = useStyles();

  const getUrlImage =  (data) => {
    let url = [];
    const saveImage = async () => {
      let storageRef = storage.ref();
      let file = data
      const uploadFile = await storageRef.child(`nevado/products/${data.name.replace(/.png/i, '.')}`).put(file);
      const geturl = await uploadFile.ref.getDownloadURL()
      url.push(geturl)
    }
    saveImage()
    return url
    
  }

  
 
  const [data, setRefresh, setData] = useGet(
    'https://pacific-mesa-11643.herokuapp.com/api/products'
  );

  const [open, setOpen] = useState({
    open: false,
    severity: 'success',
    message: ''
  });
  const [cod_prodcu, setCodigo] = useState(null);
  const [entrada, setEntrada] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'Imagen', field: 'imagen', editComponent: props => (
        <input
          type="file"
          onChange={e => props.onChange(getUrlImage(e.target.files[0]))}
        />
      ), render: rowData => (
        <img
          alt="ink-grid"
          style={{ height: 36, borderRadius: '50%' }}
          src={rowData.image}
        />
      ), },
      {
        title: 'Codigo Producto',
        field: 'cod_producto',
        editable: 'onUpdate' 
      },
     
      { title: 'Marca', field: 'marca', initialEditValue: 'NEVADO' },
      
      {
        title: 'Tipo de producto',
        field: 'tipo_producto',
        initialEditValue: 'ZAPATO CUERO'
      },
      { title: 'Categoria', field: 'categoria', initialEditValue: 'BOTIN' },
      { title: 'Modelo', field: 'modelo', initialEditValue: 'VARON_ADULTO' },
      { title: 'Color', field: 'color' },
      { title: 'Planta', field: 'planta', initialEditValue: 'CAT' },
      { title: 'Talla', field: 'talla', type: 'numeric' },
      { title: 'Min', field: 'min', type: 'numeric', initialEditValue: 100 },
      { title: 'Max', field: 'max', type: 'numeric', initialEditValue: 500 }
    ]
  });

  const activeEntrada = cod => {
    setCodigo(cod);
    setEntrada(true);
  };

  function generateSku(data) {
    let sku = '';
    for(let item in data) {

      if(item === "marca"){
        let tama = data[item].length - 1 
        let marca = data[item].slice(0, -tama)
        sku += marca
      }
      if(item === 'tipo_producto'){
        let tama = data[item].length - 3
        let tipo_pro = data[item].slice(0 , -tama)
        sku += tipo_pro
      }
      if(item === 'planta'){
        let planta = data[item]
        sku += planta
      }
      if(item === 'categoria'){
        let tama = data[item].length - 1
        let categoria = data[item].slice(0, -tama)
        sku += categoria
      }

      if(item === 'color'){
        if(data[item].includes(' ') || data[item].includes('-')){
          let color = data[item].replace(/-/i , ' ').split(" ")
          let tama = color[0].length - 1
          sku += '-'+ color[0].slice(0, -tama)+ '-' + color[1]
        }else{
          let color2 = data[item]
          sku += '-'+color2
        }      
      }

      if(item === 'talla'){
        let talla = data[item]
        sku += '-'+talla
      }
      
    }

    return sku.toUpperCase()
  } 

  function Alert(props) {
    return <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
    />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(prevState => ({...prevState, open: false}) );
  };

  if (data === null) {
    return (
      <div style={{ height: '100%' }}>
        <Backdrop
          style={{color: "#fff", justifyContent: "center" }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  return (
    <div>
      {entrada && (
        <div style={{padding: "1em"}}>
          {/* <ModuleInventario codigo={cod_prodcu} /> */}
          <FloatingActionButtons codigo={cod_prodcu} />
        </div>
      )}
      <MaterialTable
        columns={state.columns}
        data={data.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              if(!newData.cod_producto){
              newData.cod_producto = generateSku(newData)
              }
              // console.log(newData)
              setTimeout(async () => {
                resolve();
              const result =  await post('https://pacific-mesa-11643.herokuapp.com/api/products', newData)
                
               if (result.status) {
                  setOpen({severity: 'success', open: true, message: result.message});
                  setData(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                } else {
                  setOpen({open: true, message: result.message, severity: 'error'});
                }
              }, 600);
             }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout( async () => {
                resolve();
                if (oldData) {
                  setData(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                  const response = await patch('https://pacific-mesa-11643.herokuapp.com/api/products', newData)
                  if(response.status){
                    setOpen({severity: 'success', open: true, message: response.message});
                  }else{
                    setOpen({open: true, message: response.message, severity: 'error'});
                  }
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout( async () => {
                resolve();
                const respo = await deleted(`https://pacific-mesa-11643.herokuapp.com/api/product/${oldData.cod_producto}`)
                if(respo.status){
                  setOpen({severity: 'success', open: true, message: respo.message});
                }else{
                  setOpen({open: true, message: respo.message, severity: 'error'});
                }
                setData(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
        localization={{
          pagination: {
            labelRowsSelect: 'filas'
          }
        }}
        onRowClick={(e, rowData) => {
          console.log(rowData.cod_producto);
          activeEntrada(rowData.cod_producto);
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => setRefresh(Math.random()) ,
          },
          {
            icon: () => <VpnKeyIcon/>,
            tooltip: 'Activar codigo personalizado',
            isFreeAction: true,
            onClick: () => setState({
              columns: [
                { title: 'Imagen', field: 'imagen', editComponent: props => (
                  // <input type="file" name="myFile"></input>
                  <input
                    type="file"
                    // value={props.value}
                    onChange={e => props.onChange(getUrlImage(e.target.files[0]))}
                  />
                ), render: rowData => (
                  <img
                    alt="ink-grid"
                    style={{ height: 36, borderRadius: '50%' }}
                    src={rowData.image}
                  />
                ), },
                {
                  title: 'Codigo Producto',
                  field: 'cod_producto',
                },
               
                { title: 'Marca', field: 'marca', initialEditValue: 'NEVADO' },
                
                {
                  title: 'Tipo de producto',
                  field: 'tipo_producto',
                  initialEditValue: 'ZAPATO CUERO'
                },
                { title: 'Categoria', field: 'categoria', initialEditValue: 'BOTIN' },
                { title: 'Modelo', field: 'modelo', initialEditValue: 'VARON_ADULTO' },
                { title: 'Color', field: 'color' },
                { title: 'Planta', field: 'planta', initialEditValue: 'CAT' },
                { title: 'Talla', field: 'talla', type: 'numeric' },
                { title: 'Min', field: 'min', type: 'numeric', initialEditValue: 100 },
                { title: 'Max', field: 'max', type: 'numeric', initialEditValue: 500 }
              ]
            })
          },
          {
            tooltip: 'Eliminar todos los productos selecionados',
            icon: 'delete',
            onClick: async (evt, data) => {
                    let arra = []
                    data.map(eleme => {
                      arra.push(eleme.cod_producto)
                    })
                    const respo = await deleted(`https://pacific-mesa-11643.herokuapp.com/api/product/${arra}`)
                    if(respo.status){
                      setOpen({severity: 'success', open: true, message: respo.message});
                      setRefresh(Math.random())
                    }else{
                      setOpen({open: true, message: respo.message, severity: 'error'});
                    }
            }
          }
        ]}
        options={{
          exportButton: true,
          selection: true
        }}
        title="Listado de productos inactivos en inventario"
      />
  <div style={{padding: "1em"}}>
<Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
          <ProductosActivos/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
          <EstadoProductos/>
          </Paper>
        </Grid>
        </Grid>
        </div>

      <Snackbar
        autoHideDuration={6000}
        onClose={handleClose}
        open={open.open}
      >
        {open.severity === 'success' ? (
          <Alert
            onClose={handleClose}
            severity="success"
          >
            {open.message}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
          >
             {open.message}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default Inventario;
