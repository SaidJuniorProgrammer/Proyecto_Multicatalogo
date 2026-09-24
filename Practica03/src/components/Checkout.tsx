import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [procesando, setProcesando] = useState(false);

  if (cart.length === 0) {
    return <div className="bg-white rounded-xl border border-slate-200 p-8 text-center"><p className="text-slate-600">No tienes productos para comprar.</p><Link to="/catalogo" className="mt-4 inline-block text-indigo-600 font-semibold hover:underline">Volver al catálogo</Link></div>;
  }

  const confirmar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcesando(true);
    window.setTimeout(() => {
      const pedido = {
        numero: `MC-${Date.now().toString().slice(-6)}`,
        total: totalPrice,
        nombre,
        direccion,
        items: cart.map(({ nombre: producto, cantidad, precio }) => ({ producto, cantidad, precio })),
      };
      clearCart();
      navigate("/confirmacion", { state: { pedido } });
    }, 500);
  };

  return <div className="max-w-5xl mx-auto"><h1 className="text-2xl font-bold text-slate-800 mb-6">Finalizar compra</h1><div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><form onSubmit={confirmar} className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 space-y-4"><div><label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label><input required value={nombre} onChange={(event) => setNombre(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3" /></div><div><label className="block text-sm font-medium text-slate-700 mb-1">Dirección de entrega</label><input required value={direccion} onChange={(event) => setDireccion(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3" /></div><button disabled={procesando} className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">{procesando ? "Procesando..." : "Confirmar pedido"}</button></form><div className="h-fit rounded-xl border border-slate-200 bg-white p-6"><h2 className="font-bold text-slate-800 mb-4">Resumen</h2>{cart.map((item) => <div key={item.id} className="flex justify-between gap-3 text-sm mb-3"><span>{item.nombre} x {item.cantidad}</span><span className="font-semibold">${(item.precio * item.cantidad).toFixed(2)}</span></div>)}<div className="border-t border-slate-200 pt-4 flex justify-between font-bold"><span>Total</span><span className="text-indigo-600">${totalPrice.toFixed(2)}</span></div></div></div></div>;
};

export default Checkout;
