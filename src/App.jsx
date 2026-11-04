import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, DollarSign, Award, RefreshCw, 
  MessageSquare, DollarSignIcon, Share2, 
  LayoutDashboard, TrendingUpIcon, Bot, Sparkles, CheckCircle2, AlertTriangle, 
  Sun, Moon, ArrowRight, ShieldCheck, CreditCard, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyl6kWt93RDqV9m8TRKD1BaS_VClcsByvDu15ELIj75jqByUab9pEtxJDdHMGWdXABC5w/exec";

const COLORS = ['#d97706', '#3b82f6', '#10b981', '#eab308'];

const formatearNumero = (valor) => {
  const num = Number(valor) || 0;
  return new Intl.NumberFormat('es-ES').format(num);
};

export default function App() {
  const [modoInicio, setModoInicio] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(true);
  const [mesesData, setMesesData] = useState({});
  const [mesActual, setMesActual] = useState("9");
  const [pestañaActiva, setPestañaActiva] = useState("mensual");
  const [subCategoria, setSubCategoria] = useState("marketing");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSheetData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(APPS_SCRIPT_URL);
      const data = await response.json();
      setMesesData(data);
      const mesesDisponibles = Object.keys(data);
      if (mesesDisponibles.length > 0 && !data[mesActual]) {
        setMesActual(mesesDisponibles[mesesDisponibles.length - 1]);
      }
    } catch (error) {
      console.error("Error cargando datos de Google Sheets:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSheetData();
  }, []);

  const data = mesesData[mesActual] || {
    ventas: 0, recaudacion: 0, presupuesto: 0, cumplimiento: 0,
    marketing: { importe: 0, alcances: 0, mensajes: 0 },
    cartera: [],
    cobranzasDetalle: {
      recaudacionMensual: 0,
      solventes: 0, morosos1Mes: 0, morosos2Meses: 0, morosos3Meses: 0, morososMas3Meses: 0,
      cobradosBanesco: 0, cobradosBanfanb: 0, montoBanesco: 0, montoBanfanb: 0,
      pagosRecurrentesPlaza: 0, compromiso123Cuotas: 0, compromisoMas3Cuotas: 0,
      bddRegistros123: 0, bddRegistrosMas3: 0
    }
  };

  const listaMeses = Object.keys(mesesData);

  const obtenerNombreMes = (key) => {
    const mapaMeses = {
      "7": "Julio",
      "8": "Agosto",
      "9": "Septiembre",
      "10": "Octubre",
      "Julio": "Julio",
      "Agosto": "Agosto",
      "Septiembre": "Septiembre",
      "Octubre": "Octubre"
    };
    return mapaMeses[String(key).trim()] || `Mes ${key}`;
  };

  const cobranzasMes = data.cobranzasDetalle || {};
  const recaudacionMensualActual = Number(cobranzasMes.recaudacionMensual || 0);
  const solventesMes = Number(cobranzasMes.solventes || 0);
  const mora1Mes = Number(cobranzasMes.morosos1Mes || 0);
  const mora2Meses = Number(cobranzasMes.morosos2Meses || 0);
  const mora3Meses = Number(cobranzasMes.morosos3Meses || 0);
  const moraMas3Meses = Number(cobranzasMes.morososMas3Meses || 0);
  const moraTempranaMes = mora1Mes + mora2Meses + mora3Meses;

  const cobradosBanescoActual = Number(cobranzasMes.cobradosBanesco || 0);
  const montoBanescoActual = Number(cobranzasMes.montoBanesco || 0);
  const cobradosBanfanbActual = Number(cobranzasMes.cobradosBanfanb || 0);
  const montoBanfanbActual = Number(cobranzasMes.montoBanfanb || 0);
  const pagosRecurrentesPlazaActual = Number(cobranzasMes.pagosRecurrentesPlaza || 0);
  const bddRegistros123Actual = Number(cobranzasMes.bddRegistros123 || 0);
  const bddRegistrosMas3Actual = Number(cobranzasMes.bddRegistrosMas3 || 0);
  const compromiso123Actual = Number(cobranzasMes.compromiso123Cuotas || 0);
  const compromisoMas3Actual = Number(cobranzasMes.compromisoMas3Cuotas || 0);

  // Valores personalizados de compromisos por quincena según el mes
  const obtenerCompromisosQuincena = (mesKey) => {
    const k = String(mesKey).trim();
    if (k === "10" || k === "Octubre") {
      return { q15: 187, q30: 236 };
    } else if (k === "9" || k === "Septiembre") {
      return { q15: Math.round(79322 * 0.3), q30: Math.round(79322 * 0.7) }; // O ajustado con el monto exacto global 79,322
    } else if (k === "8" || k === "Agosto") {
      return { q15: Math.round(45327 * 0.3), q30: Math.round(45327 * 0.7) }; // Monto exacto global 45,327
    }
    return { q15: Math.round(compromiso123Actual * 0.2), q30: compromiso123Actual - Math.round(compromiso123Actual * 0.2) };
  };

  const quincenaInfo = obtenerCompromisosQuincena(mesActual);

  const totalImporteMarketing = listaMeses.reduce((acc, m) => acc + Number(mesesData[m]?.marketing?.importe || 0), 0);
  const totalAlcanceMarketing = listaMeses.reduce((acc, m) => acc + Number(mesesData[m]?.marketing?.alcances || 0), 0);
  const totalMensajesMarketing = listaMeses.reduce((acc, m) => acc + Number(mesesData[m]?.marketing?.mensajes || 0), 0);

  const ventasGlobalesData = Object.keys(mesesData).map(mes => ({ name: obtenerNombreMes(mes), value: mesesData[mes].ventas }));
  const trimestralData = [
    { trimestre: "T3 (Jul - Sep)", Ventas: (mesesData["Julio"]?.ventas || 0) + (mesesData["Agosto"]?.ventas || 0) + (mesesData["Septiembre"]?.ventas || 0) },
    { trimestre: "T4 (Oct - Dic)", Ventas: (mesesData["Octubre"]?.ventas || 0) }
  ];

  const tema = {
    bg: temaOscuro ? 'rgba(15, 23, 42, 0.92)' : 'rgba(248, 250, 252, 0.92)',
    card: temaOscuro ? '#1e293b' : '#ffffff',
    border: temaOscuro ? '#334155' : '#e2e8f0',
    texto: temaOscuro ? '#f8fafc' : '#0f172a',
    subtexto: temaOscuro ? '#94a3b8' : '#64748b',
    iaBg: temaOscuro ? '#1e1b4b' : '#e0e7ff',
    iaBorder: temaOscuro ? '#4338ca' : '#c7d2fe',
    iaTexto: temaOscuro ? '#a5b4fc' : '#3730a3'
  };

  const fondoEstilo = {
    minHeight: '100vh',
    backgroundImage: `url('/logo5.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    transition: 'all 0.3s ease'
  };

  if (modoInicio) {
    return (
      <div style={{ ...fondoEstilo, color: tema.texto, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif' }}>
        <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
          <button onClick={() => setTemaOscuro(!temaOscuro)} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: tema.card, color: tema.texto, border: `1px solid ${tema.border}`, padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600' }}>
            {temaOscuro ? <Sun style={{ width: '16px', height: '16px', color: '#f59e0b' }} /> : <Moon style={{ width: '16px', height: '16px', color: '#6366f1' }} />}
            {temaOscuro ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
        <div style={{ maxWidth: '650px', textAlign: 'center', backgroundColor: tema.card, padding: '48px 36px', borderRadius: '24px', border: `1px solid ${tema.border}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <img src="/logo2.png" alt="Logo 2" style={{ height: '70px', objectFit: 'contain' }} />
            <img src="/logo3.png" alt="Logo 3" style={{ height: '70px', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 12px 0', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Seguros Horizonte
          </h1>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: tema.texto, margin: '0 0 16px 0' }}>Plataforma de Control Comercial & Cobranzas</h2>
          <button onClick={() => setModoInicio(false)} style={{ width: '100%', padding: '14px 28px', borderRadius: '14px', fontSize: '15px', fontWeight: 'bold', color: '#ffffff', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            Ingresar al Dashboard <ArrowRight style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...fondoEstilo, color: tema.texto, padding: '16px 20px', fontFamily: 'sans-serif', fontSize: '13px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '12px', backgroundColor: tema.card, padding: '10px 16px', borderRadius: '12px', border: `1px solid ${tema.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setModoInicio(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tema.subtexto }} title="Volver">
            <img src="/logo2.png" alt="Logo 2" style={{ height: '40px', objectFit: 'contain' }} />
          </button>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: tema.texto, margin: 0 }}>Dashboard Comercial & Cobranzas</h1>
            <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguros Horizonte - Sincronizado en Vivo</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', backgroundColor: tema.bg, padding: '4px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
          <button onClick={() => setPestañaActiva("mensual")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: pestañaActiva === "mensual" ? '#4f46e5' : 'transparent', color: pestañaActiva === "mensual" ? '#ffffff' : tema.subtexto }}>Vista Mensual</button>
          <button onClick={() => setPestañaActiva("evolucion")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: pestañaActiva === "evolucion" ? '#4f46e5' : 'transparent', color: pestañaActiva === "evolucion" ? '#ffffff' : tema.subtexto }}>Evolución Intermeses</button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setTemaOscuro(!temaOscuro)} style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: tema.bg, color: tema.texto, border: `1px solid ${tema.border}`, cursor: 'pointer' }}>
            {temaOscuro ? <Sun style={{ width: '14px', height: '14px', color: '#f59e0b' }} /> : <Moon style={{ width: '14px', height: '14px', color: '#6366f1' }} />}
          </button>
          <button onClick={fetchSheetData} disabled={isRefreshing} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#4f46e5', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
            <RefreshCw style={{ width: '13px', height: '13px', animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} /> {isRefreshing ? 'Sincronizando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {pestañaActiva === "mensual" && (
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '6px', backgroundColor: tema.card, padding: '4px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
              <button onClick={() => setSubCategoria("ventas")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: subCategoria === "ventas" ? '#f97316' : 'transparent', color: subCategoria === "ventas" ? '#ffffff' : tema.subtexto }}>📈 Ventas</button>
              <button onClick={() => setSubCategoria("marketing")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: subCategoria === "marketing" ? '#14b8a6' : 'transparent', color: subCategoria === "marketing" ? '#ffffff' : tema.subtexto }}>📢 Marketing</button>
              <button onClick={() => setSubCategoria("cobranzas")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: subCategoria === "cobranzas" ? '#3b82f6' : 'transparent', color: subCategoria === "cobranzas" ? '#ffffff' : tema.subtexto }}>💳 Cobranzas</button>
            </div>
            <div style={{ display: 'flex', gap: '4px', backgroundColor: tema.card, padding: '3px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
              {listaMeses.map((mes) => (
                <button key={mes} onClick={() => setMesActual(mes)} style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', border: 'none', backgroundColor: mesActual === mes ? '#4f46e5' : 'transparent', color: mesActual === mes ? '#ffffff' : tema.subtexto }}>{obtenerNombreMes(mes)}</button>
              ))}
            </div>
          </div>

          {subCategoria === "ventas" && (
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ background: 'linear-gradient(to bottom right, #f97316, #db2777)', borderRadius: '12px', padding: '16px', color: '#fff' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0 }}>Ventas Generadas ({obtenerNombreMes(mesActual)})</p>
                  <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0 0 0' }}>{formatearNumero(data.ventas)}</h3>
                  <p style={{ fontSize: '11px', margin: '8px 0 0 0' }}>Presupuesto: {formatearNumero(data.presupuesto)}</p>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #3b82f6, #4f46e5)', borderRadius: '12px', padding: '16px', color: '#fff' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0 }}>Recaudación Total</p>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '6px 0 0 0' }}>${formatearNumero(data.recaudacion)}</h3>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #9333ea, #c026d3)', borderRadius: '12px', padding: '16px', color: '#fff' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0 }}>% Cumplimiento Global</p>
                  <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0 0 0' }}>{formatearNumero(data.cumplimiento)}%</h3>
                </div>
              </div>
            </div>
          )}

          {subCategoria === "marketing" && (
            <div style={{ display: 'grid', gap: '20px', animation: 'fadeIn 0.3s ease-in-out' }}>
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: `1px solid ${tema.border}`, paddingBottom: '12px' }}>
                  <img src="/logo2.png" alt="Logo 2" style={{ height: '30px', objectFit: 'contain' }} />
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: tema.texto, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users style={{ width: '18px', height: '18px', color: '#14b8a6' }} /> Comportamiento Operativo por Mes - Marketing
                    </h2>
                    <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguros Horizonte, S.A.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  {listaMeses.map((mes) => {
                    const m = mesesData[mes].marketing || { importe: 0, alcances: 0, mensajes: 0 };
                    const esActivo = mes === mesActual;
                    return (
                      <div 
                        key={mes} 
                        onClick={() => setMesActual(mes)}
                        style={{ 
                          backgroundColor: esActivo ? (temaOscuro ? '#334155' : '#f1f5f9') : tema.bg, 
                          borderRadius: '12px', 
                          padding: '16px', 
                          border: esActivo ? '2px solid #14b8a6' : `1px solid ${tema.border}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: esActivo ? '0 4px 12px rgba(20, 184, 166, 0.2)' : 'none'
                        }}
                      >
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px', color: '#14b8a6', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                          {obtenerNombreMes(mes)} {esActivo && '⭐'}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                          <div style={{ backgroundColor: '#1e3a8a', padding: '8px 4px', borderRadius: '8px', color: '#fff' }}>
                            <div style={{ fontSize: '10px', color: '#93c5fd', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}><DollarSignIcon style={{ width: '12px', height: '12px' }} /></div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>${formatearNumero(m.importe)}</span>
                          </div>
                          <div style={{ backgroundColor: '#854d0e', padding: '8px 4px', borderRadius: '8px', color: '#fff' }}>
                            <div style={{ fontSize: '10px', color: '#fde047', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}><Share2 style={{ width: '12px', height: '12px' }} /></div>
                            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{formatearNumero(m.alcances)}</span>
                          </div>
                          <div style={{ backgroundColor: '#0f172a', padding: '8px 4px', borderRadius: '8px', color: '#fff', border: '1px solid #475569' }}>
                            <div style={{ fontSize: '10px', color: '#38bdf8', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}><MessageSquare style={{ width: '12px', height: '12px' }} /></div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{formatearNumero(m.mensajes)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {subCategoria === "cobranzas" && (
            <div style={{ display: 'grid', gap: '20px' }}>
              
              {/* Tarjetas interactivas de Cobranzas por Mes */}
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: `1px solid ${tema.border}`, paddingBottom: '12px' }}>
                  <img src="/logo2.png" alt="Logo 2" style={{ height: '30px', objectFit: 'contain' }} />
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: tema.texto, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard style={{ width: '18px', height: '18px', color: '#3b82f6' }} /> Comportamiento de Recaudación Mensual - Cobranzas BANFANB
                    </h2>
                    <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguros Horizonte, S.A.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '10px' }}>
                  {listaMeses.map((mes) => {
                    const c = mesesData[mes].cobranzasDetalle || {};
                    const esActivo = mes === mesActual;
                    return (
                      <div 
                        key={mes} 
                        onClick={() => setMesActual(mes)}
                        style={{ 
                          backgroundColor: esActivo ? (temaOscuro ? '#334155' : '#f1f5f9') : tema.bg, 
                          borderRadius: '12px', 
                          padding: '16px', 
                          border: esActivo ? '2px solid #3b82f6' : `1px solid ${tema.border}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: esActivo ? '0 4px 12px rgba(59, 130, 246, 0.2)' : 'none'
                        }}
                      >
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                          {obtenerNombreMes(mes)} {esActivo && '⭐'}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', textAlign: 'center' }}>
                          <div style={{ backgroundColor: '#1e3a8a', padding: '8px 6px', borderRadius: '8px', color: '#fff' }}>
                            <div style={{ fontSize: '10px', color: '#93c5fd', marginBottom: '2px' }}>RECAUDACIÓN MENSUAL</div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{formatearNumero(c.recaudacionMensual)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Encabezado del mes activo seleccionado */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.card, padding: '16px 20px', borderRadius: '12px', border: `1px solid ${tema.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="/logo2.png" alt="Logo 2" style={{ height: '32px', objectFit: 'contain' }} />
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: tema.texto, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard style={{ width: '18px', height: '18px', color: '#10b981' }} /> Seguimiento de Cobranza Mes {obtenerNombreMes(mesActual)}
                    </h2>
                    <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguimiento de Gestión - Seguros Horizonte, S.A.</p>
                  </div>
                </div>
                <div style={{ backgroundColor: tema.bg, padding: '10px 16px', borderRadius: '8px', border: `1px solid ${tema.border}`, textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: tema.subtexto, textTransform: 'uppercase', display: 'block', fontWeight: 'bold' }}>Recaudación Mensual</span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>{formatearNumero(recaudacionMensualActual)}</span>
                </div>
              </div>

              {/* Tarjetas de métricas de cobranza */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${tema.border}`, paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck style={{ width: '20px', height: '20px', color: '#10b981' }} />
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: tema.texto }}>Clientes Solventes ({obtenerNombreMes(mesActual)})</span>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>{formatearNumero(solventesMes)}</span>
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: tema.bg, padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: tema.subtexto }}><AlertCircle style={{ width: '13px', height: '13px', color: '#f59e0b', display: 'inline' }} /> Mora 1 Mes</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f59e0b' }}>{formatearNumero(mora1Mes)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: tema.bg, padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: tema.subtexto }}><AlertCircle style={{ width: '13px', height: '13px', color: '#f97316', display: 'inline' }} /> Mora 2 Meses</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f97316' }}>{formatearNumero(mora2Meses)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: tema.bg, padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: tema.subtexto }}><AlertCircle style={{ width: '13px', height: '13px', color: '#ef4444', display: 'inline' }} /> Mora 3 Meses</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ef4444' }}>{formatearNumero(mora3Meses)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: tema.bg, padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: tema.subtexto }}><AlertCircle style={{ width: '13px', height: '13px', color: '#dc2626', display: 'inline' }} /> Mora +3 Meses</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#dc2626' }}>{formatearNumero(moraMas3Meses)}</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ borderBottom: `1px solid ${tema.border}`, paddingBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f59e0b' }}>Clientes Mora Temprana 1 - 2 - 3 Cuotas ({obtenerNombreMes(mesActual)})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: tema.subtexto }}>Total BDD Mes</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>{formatearNumero(moraTempranaMes)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: tema.subtexto }}>BDD con Registros</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>{formatearNumero(bddRegistros123Actual)}</span>
                  </div>
                  <div style={{ backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: tema.texto }}>Compromiso de Pago</span>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#6366f1' }}>{formatearNumero(compromiso123Actual)}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: tema.subtexto }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>📅 15 Quincena:</span><strong>{formatearNumero(quincenaInfo.q15)}</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>📅 30 Fin de Mes:</span><strong>{formatearNumero(quincenaInfo.q30)}</strong></div>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ borderBottom: `1px solid ${tema.border}`, paddingBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ef4444' }}>Clientes Mora Tardía + 3 Cuotas ({obtenerNombreMes(mesActual)})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: tema.subtexto }}>Total BDD Mes</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>{formatearNumero(moraMas3Meses)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: tema.subtexto }}>BDD con Registros</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>{formatearNumero(bddRegistrosMas3Actual)}</span>
                  </div>
                  <div style={{ backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: tema.texto }}>Compromiso de Pago</span>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444' }}>{formatearNumero(compromisoMas3Actual)}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: tema.subtexto }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>📅 15 Quincena:</span><strong>0</strong></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>📅 30 Fin de Mes:</span><strong>0</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase' }}>Clientes Cobrados Banesco</span>
                      <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: tema.texto, margin: '2px 0 0 0' }}>{formatearNumero(cobradosBanescoActual)}</h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Monto Banesco</span>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>BsF {formatearNumero(montoBanescoActual)}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', textTransform: 'uppercase' }}>Clientes Cobrados BANFANB</span>
                      <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: tema.texto, margin: '2px 0 0 0' }}>{formatearNumero(cobradosBanfanbActual)}</h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Monto BANFANB</span>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>BsF {formatearNumero(montoBanfanbActual)}</p>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: tema.subtexto, textTransform: 'uppercase', marginBottom: '4px' }}>Pagos Recurrentes Clientes Mora Temprana 2 - 3 Cuotas</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6', margin: '0 0 10px 0' }}>BANCO PLAZA</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', width: '100%', borderTop: `1px solid ${tema.border}`, borderBottom: `1px solid ${tema.border}`, padding: '10px 0', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Clientes Cobrados</span>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>{formatearNumero(Math.round(pagosRecurrentesPlazaActual / 5818) || 86)}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Monto Total</span>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>BsF {formatearNumero(pagosRecurrentesPlazaActual)}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {pestañaActiva === "evolucion" && (
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: tema.card, padding: '16px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: tema.texto, margin: '0 0 10px 0' }}>Ventas Mensuales</h3>
              <div style={{ height: '210px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ventasGlobalesData} innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {ventasGlobalesData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{ backgroundColor: tema.card, padding: '16px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: tema.texto, margin: '0 0 10px 0' }}>Comportamiento Trimestral</h3>
              <div style={{ height: '200px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trimestralData}>
                    <XAxis dataKey="trimestre" stroke={tema.subtexto} fontSize={11} />
                    <YAxis stroke={tema.subtexto} fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '12px' }} />
                    <Bar dataKey="Ventas" fill="#6366f1" radius={[4, 4, 0, 0]} name="Ventas Totales" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}