import { comisionDeReferido, contarRed, nivelAlcanzado, redInicial, sumarComisiones, sumarVentasRed, type Referido } from "../data/red";

const NodoReferido = ({ nodo }: { nodo: Referido }) => (
  <li className="border-l-2 border-slate-200 pl-4">
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <div><p className="font-semibold text-slate-800">{nodo.nombre}</p><span className="text-xs text-indigo-600">Nivel {nodo.nivel}</span></div>
      <div className="text-right text-sm"><p>Ventas: ${nodo.ventas.toLocaleString()}</p><p className="font-semibold text-green-600">Comisión: ${comisionDeReferido(nodo).toFixed(2)}</p></div>
    </div>
    {nodo.hijos && nodo.hijos.length > 0 && <ul className="mt-3 space-y-3">{nodo.hijos.map((hijo) => <NodoReferido key={hijo.id} nodo={hijo} />)}</ul>}
  </li>
);

const MiRed = () => {
  const referidos = contarRed(redInicial);
  const ventas = sumarVentasRed(redInicial);
  const comisiones = sumarComisiones(redInicial);
  const nivel = nivelAlcanzado(redInicial.hijos?.length ?? 0);
  const indicadores = [["Referidos", referidos.toString()], ["Ventas de la red", `$${ventas.toLocaleString()}`], ["Comisiones", `$${comisiones.toFixed(2)}`], ["Nivel", nivel]];

  return <div><h1 className="text-2xl font-bold text-slate-800 mb-6">Mi Red de Referidos</h1><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">{indicadores.map(([label, value]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-indigo-600">{value}</p></div>)}</div><div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><ul className="space-y-3">{redInicial.hijos?.map((hijo) => <NodoReferido key={hijo.id} nodo={hijo} />)}</ul></div></div>;
};

export default MiRed;
