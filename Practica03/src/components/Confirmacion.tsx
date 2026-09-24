import { Link, useLocation } from "react-router-dom";

type Pedido = { numero: string; total: number; nombre: string; direccion: string; items: { producto: string; cantidad: number; precio: number }[] };

const Confirmacion = () => {
  const location = useLocation();
  const pedido = (location.state as { pedido?: Pedido } | null)?.pedido;

  if (!pedido) return <div className="bg-white rounded-xl border border-slate-200 p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">No hay una confirmación disponible</h1><Link to="/catalogo" className="mt-4 inline-block text-indigo-600 font-semibold hover:underline">Ir al catálogo</Link></div>;

  return <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-8"><div className="text-center"><div className="text-5xl">✓</div><h1 className="mt-3 text-2xl font-bold text-slate-800">¡Pedido confirmado!</h1><p className="mt-2 text-slate-600">Número de pedido: <strong>{pedido.numero}</strong></p></div><div className="mt-8 space-y-2 text-sm text-slate-600"><p>Cliente: <strong className="text-slate-800">{pedido.nombre}</strong></p><p>Entrega: <strong className="text-slate-800">{pedido.direccion}</strong></p></div><div className="mt-6 border-t border-slate-200 pt-4 space-y-2">{pedido.items.map((item) => <div key={item.producto} className="flex justify-between text-sm"><span>{item.producto} x {item.cantidad}</span><span>${(item.precio * item.cantidad).toFixed(2)}</span></div>)}<div className="flex justify-between border-t border-slate-200 pt-4 font-bold"><span>Total pagado</span><span className="text-green-600">${pedido.total.toFixed(2)}</span></div></div><Link to="/tienda" className="mt-8 block rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white hover:bg-indigo-700">Volver a la tienda</Link></div>;
};

export default Confirmacion;
