import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

// La interfaz refleja exactamente tu struct Producto en Go
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  img: string;
}

const Catalogo = () => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos. Verifica que el backend esté encendido.");
        setCargando(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
        Catálogo de Productos
      </h1>

      {cargando && <p className="text-slate-500">Cargando productos...</p>}
      
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {!cargando && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm flex flex-col"
            >
              <img
                src={prod.img}
                alt={prod.nombre}
                className="w-full h-40 sm:h-48 object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-slate-700">{prod.nombre}</h3>
                <p className="text-indigo-600 font-bold mt-2 mb-4">
                  ${prod.precio.toFixed(2)}
                </p>

                <button
                  onClick={() => addToCart(prod)}
                  className="mt-auto w-full bg-slate-900 text-white py-2.5 rounded text-sm font-medium hover:bg-indigo-600 transition active:scale-95"
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalogo;