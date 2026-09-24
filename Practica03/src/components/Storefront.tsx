import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categorias, productosMock } from "../data/productos";

const Storefront = () => (
  <div className="space-y-8">
    <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-sky-950 to-indigo-900 text-white flex items-center">
      <div className="relative z-10 max-w-3xl px-8 py-16 md:px-14">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-200">MultiCatálogo</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">Belleza que se comparte, ganancias que crecen.</h1>
        <p className="mt-6 max-w-xl text-lg text-slate-200">Explora cosméticos premium y construye una red de ventas con productos que tus clientes quieren volver a comprar.</p>
        <Link to="/catalogo" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-slate-900 hover:bg-sky-100 transition">
          Ver catálogo <ArrowRight size={18} />
        </Link>
      </div>
      <img src="https://picsum.photos/seed/multicatalogo-store/1200/900" alt="Productos de belleza" className="absolute inset-0 h-full w-full object-cover opacity-35" />
    </section>

    <section>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Explora por categoría</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categorias.filter((categoria) => categoria !== "Todas").map((categoria) => (
          <Link key={categoria} to={`/catalogo?categoria=${encodeURIComponent(categoria)}`} className="rounded-xl border border-slate-200 bg-white p-4 text-center font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition">
            {categoria}
          </Link>
        ))}
      </div>
    </section>

    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Productos destacados</h2>
        <Link to="/catalogo" className="text-sm font-semibold text-indigo-600 hover:underline">Ver todos</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {productosMock.slice(0, 4).map((producto) => (
          <Link key={producto.id} to={`/producto/${producto.id}`} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition">
            <img src={producto.img} alt={producto.nombre} className="h-48 w-full object-cover" />
            <div className="p-4"><p className="text-xs uppercase text-indigo-600">{producto.categoria}</p><h3 className="mt-1 font-bold text-slate-800">{producto.nombre}</h3><p className="mt-2 font-bold text-indigo-600">${producto.precio.toFixed(2)}</p></div>
          </Link>
        ))}
      </div>
    </section>
  </div>
);

export default Storefront;
