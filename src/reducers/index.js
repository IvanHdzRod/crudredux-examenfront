import { combineReducers } from 'redux';
import alertaReducer from './alertaReducer';
import productoReducer from './productoReducer';

export default combineReducers({
    orders: productoReducer,
    alerta: alertaReducer
});