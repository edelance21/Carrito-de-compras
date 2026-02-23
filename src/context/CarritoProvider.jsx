import { useReducer } from "react";
import { CarritoContext } from "./CarritoContext";

const initialState = [];

// 🔹 Primero definimos el reducer (para evitar el error de hoisting)
const comprasReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case "[Carrito] Agregar Compra": {
      const existe = state.find(item => item.id === action.payload.id);

      if (existe) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, cantidad: 1 }];
    }

    case "[Carrito] Aumentar Cantidad Compra":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

    case "[Carrito] Disminuir Cantidad Compra":
      return state
        .map(item =>
          item.id === action.payload
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0);

    case "[Carrito] Eliminar Compra":
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
};

export const CarritoProvider = ({ children }) => {

  const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

  const agregarCompra = (compra) => {
    compra.cantidad = 1
    dispatch({
      type: "[Carrito] Agregar Compra",
      payload: compra
    });
  };

  const aumentarCantidad = (id) => {
    dispatch({
      type: "[Carrito] Aumentar Cantidad Compra",
      payload: id
    });
  };

  const disminuirCantidad = (id) => {
    dispatch({
      type: "[Carrito] Disminuir Cantidad Compra",
      payload: id
    });
  };

  const eliminarCompra = (id) => {
    dispatch({
      type: "[Carrito] Eliminar Compra",
      payload: id
    });
  };

  return (
    <CarritoContext.Provider
      value={{
        listaCompras,
        agregarCompra,
        aumentarCantidad,
        disminuirCantidad,
        eliminarCompra
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};