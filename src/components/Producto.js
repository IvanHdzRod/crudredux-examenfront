import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';


//Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductosEditar } from '../actions/productoActions';

const Producto = ({ order }) => {

    const {id, items } = order;

    const dispatch = useDispatch();
    const history = useHistory();

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {

        // preguntar al usuario
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un producto no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                dispatch(borrarProductoAction(id));
            }
        })
    }


    return (
        <tbody>
            {items.map(item => (
                        <tr key={item.id}>
                        <td>{item.sku}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td><span className="font-weight-bold">$ {item.price}</span></td>
                        <td className="acciones">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => confirmarEliminarProducto(id)}
                            >
                                Eliminar
                        </button>
                        </td>
                    </tr>
                    ))}
           
        </tbody>
    );
}

export default Producto;
