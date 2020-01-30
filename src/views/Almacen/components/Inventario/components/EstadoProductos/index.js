import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { useGet } from 'services';
import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  status: {
    marginRight: theme.spacing(1)
  }
}));

const EstadoProductos = () => {
  const classes = useStyles();
  const [data, setRefresh] = useGet(
    'https://pacific-mesa-11643.herokuapp.com/api/products/ventas/list'
  );

  const statusColors = obje => {
    if (obje.stock > obje.min && obje.stock < obje.min + 100) {
      return 'info';
    }
    if (obje.stock >= obje.min + 100) {
      return 'success';
    }
    return 'danger';
  };

  // const statusColors = {
  //   delivered: 'success', comprar
  //   pending: 'info',       normal
  //   refunded: 'danger'     no comprar
  // };
  const [columns] = useState([
    {
      title: 'Cod. Producto',
      field: 'cod_producto'
    },
    {
      title: 'Estado',
      field: 'status',
      render: rowData => {
        console.log(rowData);
        return (
          <div style={{ textAlign: 'center' }}>
            <StatusBullet
              className={classes.status}
              color={statusColors(rowData)}
              size="sm"
            />
          </div>
        );
      }
    }
  ]);

  console.log(data);

  if (!data) {
    return <div>cargdndo... </div>;
  }

  return (
    <MaterialTable
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => setRefresh(Math.random())
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
