import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { categorias, type Producto } from "../data/productos";
import { getProductos } from "../services/productosService";

const Catalogo = () => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState(searchParams.get("categoria") ?? "Todas");
  const [orden, setOrden] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    getProductos().then(setProductos).finally(() => setCargando(false));
  }, []);

  const productosFiltrados = useMemo(() => {
    const filtrados = productos.filter((producto) => {
      const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoria === "Todas" || producto.categoria === categoria;
      return coincideBusqueda && coincideCategoria;
    });

    return [...filtrados].sort((a, b) =>
      orden === "asc" ? a.precio - b.precio : b.precio - a.precio
    );
  }, [productos, busqueda, categoria, orden]);

  const cambiarCategoria = (valor: string) => {
    setCategoria(valor);
    setSearchParams(valor === "Todas" ? {} : { categoria: valor });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Catálogo de Productos</h1>

        <div className="flex flex-col lg:flex-row gap-4">
          <label className="relative block flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <select
            value={categoria}
            onChange={(e) => cambiarCategoria(e.target.value)}
            className="px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categorias.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value as "asc" | "desc")}
            className="px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      {cargando && <p className="text-slate-500">Cargando productos...</p>}

      {!cargando && productosFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-600">
          No encontramos productos para esa búsqueda.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {productosFiltrados.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col transition hover:-translate-y-1 hover:shadow-md"
            >
              <img src={prod.img} alt={prod.nombre} className="w-full h-52 object-cover" />

              <div className="p-4 flex flex-col flex-1">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-indigo-600">
                    {prod.categoria}
                  </span>
                  <span className="text-sm text-slate-500">#{prod.id}</span>
                </div>

                <h3 className="font-semibold text-lg text-slate-800">{prod.nombre}</h3>
                <p className="text-slate-600 text-sm mt-2 line-clamp-3">{prod.descripcion}</p>

                <p className="text-indigo-600 font-bold text-xl mt-4">${prod.precio.toFixed(2)}</p>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => addToCart(prod)}
                    className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-600 transition"
                  >
                    Añadir
                  </button>

                  <Link
                    to={`/producto/${prod.id}`}
                    className="flex-1 text-center border border-slate-300 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-100 transition"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalogo;