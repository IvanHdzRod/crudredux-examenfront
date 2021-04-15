import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProducto = ({ history }) => {


    // state del componente
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');


    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch()

    // acceder al state del store
    const cargando = useSelector(state => state.orders.loading)
    const error = useSelector(state => state.orders.error)
    const alerta = useSelector(state => state.alerta.alerta)

    // mandar llamar el action de productoAction
    const agregarProducto = (item) => dispatch(crearNuevoProductoAction(item))


    // cuando el usuario haga submit
    const submitNuevoProduto = e => {
        e.preventDefault();

        // validar formulario
        if (sku.trim() === ''|| name.trim() === '' || quantity.trim() === '' || price.trim() === '') {

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));
            return;
        }

        // si no hay errores
        dispatch(ocultarAlertaAction());

        // crear el nuevo producto
        agregarProducto({
                    sku,
                    name,
                    quantity,
                    price 
        });

        // redireccionar
        history.push('/')
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">
                            Agregar Nuevo Producto
                        </h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form
                            onSubmit={submitNuevoProduto}
                        >
                            <div className="form-group">
                                <label>SKU del Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="sku Producto"
                                    name="sku"
                                    value={sku}
                                    onChange={e => setSku(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Cantidad de Productos</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cantidad de Productos"
                                    name="quantity"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="price"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>
                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p-2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;