import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';


const Inventario = () => {

    const [columns] = useState(
        [
            { title: "Imagen", field: "name", render: rowData => (
                <img
                  style={{ height: 36, borderRadius: '50%' }}
                  src="https://mott.pe/noticias/wp-content/uploads/2019/03/los-50-paisajes-maravillosos-del-mundo-para-tomar-fotos.jpg"
                />
              )},
            { title: "Codigo", field: "name" },
            { title: "Precio unitario", field: "surname", type: "numeric" },
            { title: "Stock", field: "birthYear", type: "numeric" },
            { title: "Cantidad", field: "birthYear", type: "numeric" }

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
                editable={{
                    onRowAdd: newData => {
                        new Promise(resolve => {
                            setTimeout(() => {
                                console.log(newData)
                            }, 600)

                        })
                        return (newData)
                    }
                }}
                title="Demo Title"
            />
        </div>
    );


}

export default Inventario;