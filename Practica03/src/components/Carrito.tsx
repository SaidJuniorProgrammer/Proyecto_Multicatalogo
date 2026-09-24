import { useState } from "react";
import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [confirmado, setConfirmado] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const handleConfirmarCompra = () => {
    clearCart();
    setCheckout(false);
    setConfirmado(true);
  };

  if (confirmado) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
        <CheckCircle2 className="mx-auto text-green-600" size={48} />
        <h1 className="text-2xl font-bold text-slate-800 mt-4">¡Compra confirmada!</h1>
        <p className="text-slate-600 mt-3">
          Tu pedido ha sido registrado correctamente. Gracias por comprar con MultiCatálogo.
        </p>
        <button
          type="button"
          onClick={() => setConfirmado(false)}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Seguir comprando
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
        Tu Carrito de Compras
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm text-center">
          <p className="text-slate-500">Tu carrito está vacío actualmente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded-md shrink-0"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-800">{item.nombre}</h3>
                    <p className="text-sm text-slate-500">Precio unitario: ${item.precio.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-slate-100 sm:border-0 pt-3 sm:pt-0">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-slate-100 text-slate-700"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold">{item.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-slate-100 text-slate-700"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="font-bold text-indigo-600 min-w-[80px] text-right">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition p-2 bg-red-50 rounded-md sm:bg-transparent"
                    title="Eliminar producto"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Resumen del Pedido</h2>

            <div className="flex justify-between border-b border-slate-100 pb-4 mb-4">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-800 font-bold">Total a Pagar</span>
              <span className="text-2xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
            </div>

            {!checkout ? (
              <button
                type="button"
                onClick={() => setCheckout(true)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition active:scale-95"
              >
                Proceder al Pago
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  Confirmar pedido por un total de <span className="font-semibold text-slate-800">${totalPrice.toFixed(2)}</span>.
                </p>
                <button
                  type="button"
                  onClick={handleConfirmarCompra}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Confirmar compra
                </button>
                <button
                  type="button"
                  onClick={() => setCheckout(false)}
                  className="w-full border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;