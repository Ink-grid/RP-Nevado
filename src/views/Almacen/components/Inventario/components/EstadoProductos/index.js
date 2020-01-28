import React, { useState } from 'react';
import MaterialTable from 'material-table';

const EstadoProductos = () => {
  const [columns] = useState([
    { title: 'Cod. Producto', field: 'cod_producto' },
    { title: 'Estado', field: 'status' }
  ]);

  const [data, setData] = useState([]);
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
      data={data}
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
