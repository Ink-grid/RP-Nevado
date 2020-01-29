import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useGet } from '../../../../../../services/useService';

const useStyles = makeStyles({
  status: {
    color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
});

const EstadoProductos = () => {
  const classes = useStyles();
  const [columns] = useState([
    {
      title: 'Cod. Producto',
      field: 'cod_producto'
    },
    {
      title: 'Estado',
      field: 'status',
      render: rowData => (
        <LinearProgress
          className={classes.status}
          value={rowData.status}
          variant="determinate"
        />
      )
    }
  ]);

  const [data, setRefresh, setData] = useGet(
    'https://pacific-mesa-11643.herokuapp.com/api/products/ventas/list'
  );

  if(!data){
      return <div>cargdndo... </div>
  }
 
  return (
    <MaterialTable
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => alert('hola')
        }
      ]}
      columns={columns}
      data={data.data}
      localization={{
        pagination: {
          labelRowsSelect: 'filas'
        }
      }}
      title="Estado"
    />
  );
};

export default EstadoProductos;
