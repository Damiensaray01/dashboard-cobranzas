import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

export default function DashboardCobranzasVentas() {
  const [selectedMonth, setSelectedMonth] = useState('Octubre');

  // Datos de ejemplo para los gráficos superiores e inferiores basados en los meses
  const dataVentas = {
    Octubre: [
      { name: 'Marketing', Ventas: 230, Marketing: 75 },
      { name: 'BDD Abierta', Ventas: 28, Marketing: 12 },
      { name: 'BDD General', Ventas: 22, Marketing: 8 },
      { name: 'BDD +3M', Ventas: 30, Marketing: 10 },
      { name: 'BDD -M', Ventas: 1, Marketing: 0 },
    ],
    Septiembre: [
      { name: 'Marketing', Ventas: 190, Marketing: 60 },
      { name: 'BDD Abierta', Ventas: 20, Marketing: 10 },
      { name: 'BDD General', Ventas: 18, Marketing: 6 },
      { name: 'BDD +3M', Ventas: 25, Marketing: 8 },
      { name: 'BDD -M', Ventas: 0, Marketing: 0 },
    ]
  };

  // Datos para la Tabla Interactiva de Cobranzas
  const tablaCobranzasData = [
    { estatus: 'Clientes Solventes', vol1: '14.224', vol2: '7.358', detalle: 'Al día' },
    { estatus: 'Mora 1 Mes', vol1: '1.149', vol2: '5.381', detalle: 'Seguimiento temprano' },
    { estatus: 'Mora 2 Meses', vol1: '342', vol2: '369', detalle: 'Gestión preventiva' },
    { estatus: 'Mora 3 Meses', vol1: '725', vol2: '602', detalle: 'Gestión avanzada' },
    { estatus: 'Mora +3 Meses', vol1: '1.877', vol2: '4.484', detalle: 'Cartera pesada / judicial' },
    { estatus: 'Cobrados Banesco', vol1: '27 clientes', vol2: '—', detalle: '$179.996,26 (Monto Cobrado)' },
    { estatus: 'Cobrados BANFANB', vol1: '23 clientes', vol2: '—', detalle: '$89.569,07 (Monto Cobrado)' },
    { estatus: 'Pagos Recurrentes Banco Plaza', vol1: '—', vol2: '—', detalle: '$500.407,41 (2-3 Cuotas)' },
    { estatus: 'Compromisos de Pago', vol1: '402 (1-3 Cuotas)', vol2: '0 (+3 Cuotas)', detalle: 'En proceso de cumplimiento' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Selector de Meses Superior */}
      <div className="flex justify-end gap-2 mb-6">
        {['Julio', 'Agosto', 'Septiembre', 'Octubre'].map((mes) => (
          <button
            key={mes}
            onClick={() => setSelectedMonth(mes)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedMonth === mes 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {mes}
          </button>
        ))}
      </div>

      {/* SECCIÓN 1: SEGUIMIENTO VENTAS (Tarjetas KPI + Gráfico Superior) */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-indigo-400 flex items-center gap-2">
          <span>📈</span> Seguimiento Ventas ({selectedMonth})
        </h2>

        {/* Tarjetas KPI Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-rose-600 to-pink-700 p-5 rounded-2xl shadow-xl">
            <p className="text-xs uppercase tracking-wider font-semibold opacity-80">Ventas Generadas</p>
            <h3 className="text-3xl font-extrabold mt-1">305</h3>
            <p className="text-xs mt-2 opacity-90">Presupuesto: 400</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-2xl shadow-xl">
            <p className="text-xs uppercase tracking-wider font-semibold opacity-80">Recaudación</p>
            <h3 className="text-2xl font-extrabold mt-1">$58.569.137,01</h3>
            <p className="text-xs mt-2 opacity-90">Banco Plaza & Banfanb</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-violet-700 p-5 rounded-2xl shadow-xl">
            <p className="text-xs uppercase tracking-wider font-semibold opacity-80">% Cumplimiento</p>
            <h3 className="text-3xl font-extrabold mt-1">76.25%</h3>
            <p className="text-xs mt-2 opacity-90">Meta alcanzada</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-5 rounded-2xl shadow-xl">
            <p className="text-xs uppercase tracking-wider font-semibold opacity-80">Alcances Marketing</p>
            <h3 className="text-3xl font-extrabold mt-1">1170</h3>
            <p className="text-xs mt-2 opacity-90">Mensajes: 1346</p>
          </div>
        </div>

        {/* Gráfico Principal de Ventas / Cartera General */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-md font-semibold mb-4 text-slate-300">Cartera y Comercialización ({selectedMonth})</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataVentas[selectedMonth] || dataVentas['Octubre']}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }} 
                />
                <Legend />
                <Bar dataKey="Ventas" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Marketing" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <hr className="border-slate-800 my-8" />

      {/* SECCIÓN 2: SEGUIMIENTO COBRANZAS (Debajo de los gráficos) */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-emerald-400 flex items-center gap-2">
          <span>💳</span> Seguimiento Cobranzas y Cartera
        </h2>

        {/* Tabla Interactiva de Cobranzas */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Desglose de Cartera y Recuperación Financiera</h3>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
              Datos actualizados de Excel
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                  <th className="p-4">Estatus de Cartera / Métrica</th>
                  <th className="p-4">Volumen / Fila 1</th>
                  <th className="p-4">Volumen / Fila 2</th>
                  <th className="p-4">Detalle / Monto Asociado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {tablaCobranzasData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-medium text-slate-200">{row.estatus}</td>
                    <td className="p-4 text-slate-300 font-semibold">{row.vol1}</td>
                    <td className="p-4 text-slate-300 font-semibold">{row.vol2}</td>
                    <td className="p-4 text-emerald-400 font-mono">{row.detalle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}