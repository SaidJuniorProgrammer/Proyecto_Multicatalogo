const MiRed = () => {
  const referidos = [
    { id: 1, nombre: "Ana García", nivel: "Nivel 1", ventas: "$1,200" },
    { id: 2, nombre: "Luis Poveda", nivel: "Nivel 1", ventas: "$850" },
    { id: 3, nombre: "Marta Sánchez", nivel: "Nivel 2", ventas: "$430" },
  ];

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
        Mi Red de Referidos
      </h1>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-600 whitespace-nowrap">Nombre</th>
              <th className="p-4 font-semibold text-slate-600 whitespace-nowrap">Jerarquía</th>
              <th className="p-4 font-semibold text-slate-600 whitespace-nowrap">
                Ventas Mensuales
              </th>
            </tr>
          </thead>

          <tbody>
            {referidos.map((ref) => (
              <tr
                key={ref.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="p-4 text-slate-700">{ref.nombre}</td>
                <td className="p-4 text-slate-500">
                  <span className="bg-sky-100 text-sky-800 py-1 px-2 rounded-full text-xs font-medium">
                    {ref.nivel}
                  </span>
                </td>
                <td className="p-4 text-indigo-600 font-medium">{ref.ventas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MiRed;