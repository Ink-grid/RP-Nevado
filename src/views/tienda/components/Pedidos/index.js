import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';

const Pedidos = () => {
    const [columns] = useState(
        [
            { title: "RUC/DNI", field: "surname", type: "numeric", cellStyle: { padding: '10px' } },
            { title: "Nombre", field: "birthYear", type: "numeric", cellStyle: { padding: '10px' } },
            { title: "Email", field: "birthYear", type: "numeric", cellStyle: { padding: '10px' } },
            { title: "Direccion", field: "birthYear", type: "numeric" },
            { title: "Celular", field: "birthYear", type: "numeric" },
            { title: "Fecha de Registro", field: "birthYear", type: "numeric" }

        ]
    )
    const [data, setData] = useState(
        [
            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
            { name: "Mehmet1", surname: "Baran0", birthYear: 1987, birthCity: 63 },
            { name: "Mehmet2", surname: "Baran0", birthYear: 1987, birthCity: 63 },
            { name: "Mehmet3", surname: "Baran.", birthYear: 1987, birthCity: 63 },
            { name: "Mehmet4", surname: "Baran4", birthYear: 1987, birthCity: 63 },
            { name: "Mehmet5", surname: "Baran5", birthYear: 1987, birthCity: 63 },
            { name: "Mehmet6", surname: "Baran6", birthYear: 1987, birthCity: 63 },
            { name: "Mehmet7", surname: "Baran7", birthYear: 1987, birthCity: 63 }
        ]
    )

    return (
        <div style={{ maxWidth: "100%" }}>
            <MaterialTable

                columns={columns}
                data={data}
                editable={
                    {
                        onRowAdd: newData => {
                            new Promise(resolve => {
                                setTimeout(() => {
                                    console.log(newData)
                                }, 600)

                            })
                            return (newData)
                        },
                        onRowDelete: oldData => {

                        },
                        onRowUpdate: (newData, oldData) => {

                        }
                    }




                }

                title="Listado de Pedidos"
            />
        </div>


    );
}

export default Pedidos;