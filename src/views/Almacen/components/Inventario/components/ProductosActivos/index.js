import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useGet } from '../../../../../../services/useService';

const ProductosActivos = () => {
  const [columns] = useState([
    { title: 'Cod. Producto', field: 'cod_producto' },
    { title: 'Stock', field: 'stock' },
    { title: 'Precio Unitario', field: 'precio_uni' }
  ]);

  const [data, setRefresh, setData] = useGet(
    'https://pacific-mesa-11643.herokuapp.com/api/products/ventas/list'
  );

  if (!data) {
    return <div>cargando..</div>;
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
      title="Listado de productos Activos"
    />
  );
};

export default ProductosActivos;
