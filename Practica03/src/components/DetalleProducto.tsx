import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { productosMock } from "../data/productos";

const DetalleProducto = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const producto = productosMock.find((item) => item.id === Number(id)) ?? null;
  const [imagenActiva, setImagenActiva] = useState<string | null>(producto?.img ?? null);
  const [lightboxAbierto, setLightboxAbierto] = useState(false);

  const imagenes = producto ? [producto.img, ...producto.galeria] : [];

  useEffect(() => {
    if (!lightboxAbierto) return;
    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxAbierto(false);
    };
    window.addEventListener("keydown", cerrarConEscape);
    return () => window.removeEventListener("keydown", cerrarConEscape);
  }, [lightboxAbierto]);

  if (!producto) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <p className="text-slate-600">Producto no encontrado.</p>
        <Link
          to="/catalogo"
          className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline"
        >
          <ArrowLeft size={18} />
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/catalogo"
        className="mb-6 inline-flex items-center gap-2 text-indigo-600 font-medium hover:underline"
      >
        <ArrowLeft size={18} />
        Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <button
            type="button"
            onClick={() => setLightboxAbierto(true)}
            className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
          >
            <img
              src={imagenActiva ?? producto.img}
              alt={producto.nombre}
              className="w-full h-[420px] object-cover cursor-pointer transition duration-200 hover:scale-[1.01]"
            />
          </button>

          <div className="grid grid-cols-3 gap-3 mt-4">
            {[producto.img, ...producto.galeria].map((img, index) => (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => setImagenActiva(img)}
                className={`overflow-hidden rounded-lg border-2 ${
                  imagenActiva === img ? "border-indigo-600" : "border-slate-200"
                }`}
              >
                <img src={img} alt={`${producto.nombre} ${index + 1}`} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-indigo-600">
            {producto.categoria}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">{producto.nombre}</h1>

          <p className="text-3xl font-bold text-slate-900 mt-5">${producto.precio.toFixed(2)}</p>

          <p className="text-slate-600 mt-5 leading-7">{producto.descripcion}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(producto)}
              className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Añadir al carrito
            </button>
            <Link
              to="/catalogo"
              className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3 rounded-lg font-semibold transition"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>

      {lightboxAbierto && imagenActiva && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setImagenActiva(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              type="button"
              onClick={() => setImagenActiva(null)}
              className="absolute -top-12 right-0 text-white bg-black/30 hover:bg-black/50 rounded-full p-2"
              aria-label="Cerrar vista previa"
            >
              <X size={22} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                const indice = imagenes.indexOf(imagenActiva);
                setImagenActiva(imagenes[(indice - 1 + imagenes.length) % imagenes.length]);
              }}
              className="absolute left-2 top-1/2 text-white text-4xl"
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <img
              src={imagenActiva}
              alt={producto.nombre}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                const indice = imagenes.indexOf(imagenActiva);
                setImagenActiva(imagenes[(indice + 1) % imagenes.length]);
              }}
              className="absolute right-2 top-1/2 text-white text-4xl"
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleProducto;
