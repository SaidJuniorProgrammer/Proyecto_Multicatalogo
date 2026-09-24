import { productosMock, type Producto } from "../data/productos";

export const getProductos = (): Promise<Producto[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(productosMock), 200);
  });

export const getProductoById = (id: number): Promise<Producto | undefined> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(productosMock.find((producto) => producto.id === id)), 150);
  });
