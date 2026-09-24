import { Link } from "react-router-dom";
import { contarRed, nivelAlcanzado, redInicial, sumarComisiones, sumarVentasRed } from "../data/red";

const Dashboard = () => {
  const referidos = contarRed(redInicial);
  const ventas = sumarVentasRed(redInicial);
  const comisiones = sumarComisiones(redInicial);
  const nivel = nivelAlcanzado(redInicial.hijos?.length ?? 0);
  const indicadores = [["Ventas de la red", `$${ventas.toLocaleString()}`], ["Referidos activos", referidos.toString()], ["Comisiones del mes", `$${comisiones.toFixed(2)}`], ["Nivel actual", nivel]];

  return <div className="space-y-8"><section className="relative min-h-[calc(100vh-8rem)] overflow-hidden rounded-3xl bg-slate-950 text-white flex items-center p-8 md:p-14"><img src="https://picsum.photos/seed/dashboard-cosmetics/1200/900" alt="Productos de belleza" className="absolute inset-0 h-full w-full object-cover opacity-40" /><div className="relative max-w-2xl"><p className="text-sm uppercase tracking-[0.2em] text-sky-200">Panel MultiCatálogo</p><h1 className="mt-4 text-4xl md:text-6xl font-black">Belleza que se comparte, ganancias que crecen.</h1><p className="mt-5 text-lg text-slate-200">Administra tu catálogo y revisa el rendimiento de tu red multinivel.</p><Link to="/catalogo" className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-bold text-slate-900 hover:bg-sky-100">Explorar catálogo</Link></div></section><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">{indicadores.map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm uppercase font-semibold text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold text-indigo-600">{value}</p></div>)}</div><section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-800">Resumen del negocio</h2><p className="mt-2 text-slate-600">Los indicadores se calculan desde la estructura jerárquica compartida con Mi Red.</p><Link to="/mi-red" className="mt-4 inline-block font-semibold text-indigo-600 hover:underline">Ver árbol de referidos</Link></section></div>;
};

export default Dashboard;
