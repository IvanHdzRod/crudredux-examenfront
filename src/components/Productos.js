import React, { Fragment, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions'
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        // Consultar la api
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
        // eslint-disable-next-line
    }, [])

    // obteniendo el state
    const orders = useSelector(state => state.orders.orders)
    console.log(orders);
    const error = useSelector(state => state.orders.error)
    const cargando = useSelector(state => state.orders.loading)

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos Ordenados</h2>

            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            {cargando ? <p className="text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">SKU</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                {orders.length === 0 ? 'No hay Productos' : (
                    orders.map(order => (
                        <Producto
                            key={order.id}
                            order={order}
                        />
                    ))
                )}
            </table>
        </Fragment>
    );
}

export default Productos;