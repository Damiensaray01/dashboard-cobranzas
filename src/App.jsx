import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, DollarSign, Award, RefreshCw, 
  Building2, BarChart3, PieChart as PieIcon,
  MessageSquare, DollarSignIcon, Share2, LineChart as LineIcon,
  LayoutDashboard, TrendingUpIcon, Bot, Sparkles, CheckCircle2, AlertTriangle, Calendar,
  Sun, Moon, ArrowRight, ShieldCheck, Zap, Activity, CreditCard, FileCheck, Layers, AlertCircle, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyl6kWt93RDqV9m8TRKD1BaS_VClcsByvDu15ELIj75jqByUab9pEtxJDdHMGWdXABC5w/exec";

const COLORS = ['#d97706', '#3b82f6', '#10b981', '#eab308'];

export default function App() {
  const [modoInicio, setModoInicio] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(true);
  const [mesesData, setMesesData] = useState({});
  const [mesActual, setMesActual] = useState("Septiembre");
  const [pestañaActiva, setPestañaActiva] = useState("mensual");
  const [subCategoria, setSubCategoria] = useState("ventas");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
      solventes: 0, morosos1Mes: 0, morosos2Meses: 0, morosos3Meses: 0, morososMas3Meses: 0,
      cobradosBanesco: 0, cobradosBanfanb: 0, montoBanesco: 0, montoBanfanb: 0,
      pagosRecurrentesPlaza: 0, compromiso123Cuotas: 0, compromisoMas3Cuotas: 0
    }
  };

  const listaMeses = Object.keys(mesesData);

  const generarAnalisisModoInteligente = () => {
    const { ventas, presupuesto, cumplimiento, marketing, cartera } = data;
    const analisis = [];

    if (cumplimiento >= 75) {
      analisis.push({
        tipo: 'exito',
        texto: `Excelente rendimiento en ${mesActual}: Cumplimiento del ${cumplimiento}% con ${ventas} ventas efectivas.`
      });
    } else if (cumplimiento > 0) {
      analisis.push({
        tipo: 'alerta',
        texto: `Rendimiento en ${mesActual}: ${ventas} ventas alcanzadas (${cumplimiento}% de la meta de ${presupuesto}).`
      });
    } else {
      analisis.push({
        tipo: 'info',
        texto: `Total de ventas registradas en ${mesActual}: ${ventas} pólizas generadas.`
      });
    }

    if (cartera && cartera.length > 0) {
      const mejorCobro = [...cartera].sort((a, b) => (b.cobrado || 0) - (a.cobrado || 0))[0];
      if (mejorCobro && mejorCobro.cobrado > 0) {
        analisis.push({
          tipo: 'exito',
          texto: `Canal de mejor desempeño en ${mesActual}: "${mejorCobro.name}" con ${mejorCobro.cobrado} recaudaciones.`
        });
      }
    }

    if (marketing && marketing.alcances > 0) {
      analisis.push({
        tipo: 'info',
        texto: `Marketing en ${mesActual}: Alcance de ${marketing.alcances.toLocaleString()} personas con $${marketing.importe} invertidos.`
      });
    }

    return analisis;
  };

  const listaAnalisis = generarAnalisisModoInteligente();

  const ventasGlobalesData = Object.keys(mesesData).map(mes => ({
    name: mes,
    value: mesesData[mes].ventas
  }));

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
          <button
            onClick={() => setTemaOscuro(!temaOscuro)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: tema.card, color: tema.texto,
              border: `1px solid ${tema.border}`, padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            {temaOscuro ? <Sun style={{ width: '16px', height: '16px', color: '#f59e0b' }} /> : <Moon style={{ width: '16px', height: '16px', color: '#6366f1' }} />}
            {temaOscuro ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>

        <div style={{ maxWidth: '650px', textAlign: 'center', backgroundColor: tema.card, padding: '48px 36px', borderRadius: '24px', border: `1px solid ${tema.border}`, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <img src="/logo2.png" alt="Logo 2" style={{ height: '70px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
            <img src="/logo3.png" alt="Logo 3" style={{ height: '70px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 12px 0', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Seguros Horizonte
          </h1>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: tema.texto, margin: '0 0 16px 0' }}>
            Plataforma de Control Comercial & Cobranzas
          </h2>
          <p style={{ fontSize: '14px', color: tema.subtexto, lineHeight: '1.6', marginBottom: '32px' }}>
            Consolidado analítico en tiempo real sincronizado dinámicamente con Google Sheets. Monitorea la efectividad de ventas, recuperación de cartera, rendimiento de banca y campañas de marketing.
          </p>
          <button
            onClick={() => setModoInicio(false)}
            style={{
              width: '100%', padding: '14px 28px', borderRadius: '14px', fontSize: '15px', fontWeight: 'bold', color: '#ffffff',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.5)'
            }}
          >
            Ingresar al Dashboard <ArrowRight style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...fondoEstilo, color: tema.texto, padding: '16px 20px', fontFamily: 'sans-serif', fontSize: '13px' }}>
      
      {/* Encabezado Principal */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '12px', backgroundColor: tema.card, padding: '10px 16px', borderRadius: '12px', border: `1px solid ${tema.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setModoInicio(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tema.subtexto, display: 'flex', alignItems: 'center' }} title="Volver al inicio">
            <img src="/logo2.png" alt="Logo 2" style={{ height: '40px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
          </button>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: tema.texto, margin: 0 }}>
              Dashboard Comercial & Cobranzas
            </h1>
            <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguros Horizonte - Sincronizado en Vivo</p>
          </div>
        </div>

        {/* Pestañas Principales */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: tema.bg, padding: '4px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
          <button
            onClick={() => setPestañaActiva("mensual")}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none',
              backgroundColor: pestañaActiva === "mensual" ? '#4f46e5' : 'transparent', color: pestañaActiva === "mensual" ? '#ffffff' : tema.subtexto
            }}
          >
            <LayoutDashboard style={{ width: '14px', height: '14px' }} /> Vista Mensual
          </button>

          <button
            onClick={() => setPestañaActiva("evolucion")}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none',
              backgroundColor: pestañaActiva === "evolucion" ? '#4f46e5' : 'transparent', color: pestañaActiva === "evolucion" ? '#ffffff' : tema.subtexto
            }}
          >
            <TrendingUpIcon style={{ width: '14px', height: '14px' }} /> Evolución Intermeses
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setTemaOscuro(!temaOscuro)}
            style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: tema.bg, color: tema.texto, border: `1px solid ${tema.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {temaOscuro ? <Sun style={{ width: '14px', height: '14px', color: '#f59e0b' }} /> : <Moon style={{ width: '14px', height: '14px', color: '#6366f1' }} />}
          </button>

          <button
            onClick={fetchSheetData}
            disabled={isRefreshing}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#4f46e5', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', border: 'none', cursor: 'pointer' }}
          >
            <RefreshCw style={{ width: '13px', height: '13px', animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
            {isRefreshing ? 'Sincronizando...' : 'Actualizar'}
          </button>
        </div>
      </div>

      {/* Banner de Resumen de Análisis */}
      <div style={{ backgroundColor: tema.iaBg, borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', border: `1px solid ${tema.iaBorder}`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: tema.iaTexto, fontWeight: 'bold', fontSize: '13px' }}>
          <img src="/logo2.png" alt="Logo 2" style={{ height: '28px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
          <Bot style={{ width: '18px', height: '18px', color: '#818cf8' }} />
          <Sparkles style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
          <span>Resumen de Análisis - {pestañaActiva === "mensual" ? `${mesActual} (${subCategoria.toUpperCase()})` : "Tendencia Global y Trimestral"}</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
          {listaAnalisis.map((item, idx) => (
            <div key={idx} style={{ backgroundColor: tema.card, padding: '8px 12px', borderRadius: '6px', borderLeft: item.tipo === 'exito' ? '3px solid #10b981' : item.tipo === 'alerta' ? '3px solid #f59e0b' : '3px solid #3b82f6', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              {item.tipo === 'exito' && <CheckCircle2 style={{ width: '14px', height: '14px', color: '#10b981', marginTop: '2px', flexShrink: 0 }} />}
              {item.tipo === 'alerta' && <AlertTriangle style={{ width: '14px', height: '14px', color: '#f59e0b', marginTop: '2px', flexShrink: 0 }} />}
              {item.tipo === 'info' && <Sparkles style={{ width: '14px', height: '14px', color: '#3b82f6', marginTop: '2px', flexShrink: 0 }} />}
              <span style={{ fontSize: '11px', color: tema.texto, lineHeight: '1.4' }}>{item.texto}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PESTAÑA 1: VISTA MENSUAL CON CATEGORÍAS */}
      {pestañaActiva === "mensual" && (
        <div>
          {/* BARRA SUPERIOR DE SELECTOR DE MESES Y CATEGORÍAS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '10px' }}>
            
            {/* Pestañas por Categoría */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: tema.card, padding: '4px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
              <button
                onClick={() => setSubCategoria("ventas")}
                style={{
                  padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none',
                  backgroundColor: subCategoria === "ventas" ? '#f97316' : 'transparent',
                  color: subCategoria === "ventas" ? '#ffffff' : tema.subtexto,
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <TrendingUp style={{ width: '14px', height: '14px' }} /> Ventas
              </button>

              <button
                onClick={() => setSubCategoria("marketing")}
                style={{
                  padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none',
                  backgroundColor: subCategoria === "marketing" ? '#14b8a6' : 'transparent',
                  color: subCategoria === "marketing" ? '#ffffff' : tema.subtexto,
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Users style={{ width: '14px', height: '14px' }} /> Marketing
              </button>

              <button
                onClick={() => setSubCategoria("cobranzas")}
                style={{
                  padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none',
                  backgroundColor: subCategoria === "cobranzas" ? '#3b82f6' : 'transparent',
                  color: subCategoria === "cobranzas" ? '#ffffff' : tema.subtexto,
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <CreditCard style={{ width: '14px', height: '14px' }} /> Cobranzas
              </button>
            </div>

            {/* Selector de Mes */}
            <div style={{ display: 'flex', gap: '4px', backgroundColor: tema.card, padding: '3px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
              {listaMeses.map((mes) => (
                <button
                  key={mes}
                  onClick={() => setMesActual(mes)}
                  style={{
                    padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', border: 'none',
                    backgroundColor: mesActual === mes ? '#4f46e5' : 'transparent', color: mesActual === mes ? '#ffffff' : tema.subtexto
                  }}
                >
                  {mes}
                </button>
              ))}
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* CATEGORÍA 1: VENTAS                                               */}
          {/* ----------------------------------------------------------------- */}
          {subCategoria === "ventas" && (
            <div style={{ animation: 'fadeIn 0.3s ease-in-out', display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ background: 'linear-gradient(to bottom right, #f97316, #db2777)', borderRadius: '12px', padding: '16px', color: '#fff', boxShadow: '0 4px 15px rgba(249,115,22,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, opacity: 0.9 }}>Ventas Generadas ({mesActual})</p>
                      <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0 0 0' }}>{data.ventas}</h3>
                    </div>
                    <div style={{ padding: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}><TrendingUp style={{ width: '18px', height: '18px' }} /></div>
                  </div>
                  <p style={{ fontSize: '11px', margin: '8px 0 0 0', opacity: 0.9 }}>Presupuesto: {data.presupuesto}</p>
                </div>

                <div style={{ background: 'linear-gradient(to bottom right, #3b82f6, #4f46e5)', borderRadius: '12px', padding: '16px', color: '#fff', boxShadow: '0 4px 15px rgba(59,130,246,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, opacity: 0.9 }}>Recaudación Total</p>
                      <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '6px 0 0 0' }}>${data.recaudacion.toLocaleString()}</h3>
                    </div>
                    <div style={{ padding: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}><DollarSign style={{ width: '18px', height: '18px' }} /></div>
                  </div>
                  <p style={{ fontSize: '11px', margin: '8px 0 0 0', opacity: 0.9 }}>Banco Plaza & Banfanb</p>
                </div>

                <div style={{ background: 'linear-gradient(to bottom right, #9333ea, #c026d3)', borderRadius: '12px', padding: '16px', color: '#fff', boxShadow: '0 4px 15px rgba(147,51,234,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, opacity: 0.9 }}>% Cumplimiento Global</p>
                      <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0 0 0' }}>{data.cumplimiento}%</h3>
                    </div>
                    <div style={{ padding: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}><Award style={{ width: '18px', height: '18px' }} /></div>
                  </div>
                  <p style={{ fontSize: '11px', margin: '8px 0 0 0', opacity: 0.9 }}>Meta alcanzada</p>
                </div>
              </div>

              {/* Gráfico Cartera y Comercialización */}
              <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <img src="/logo2.png" alt="Logo 2" style={{ height: '30px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: tema.texto, margin: 0 }}>Cartera y Comercialización Global ({mesActual})</h3>
                </div>
                <div style={{ height: '280px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.cartera}>
                      <XAxis dataKey="name" stroke={tema.subtexto} fontSize={11} />
                      <YAxis stroke={tema.subtexto} fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '12px' }} />
                      <Bar dataKey="asignado" fill="#6366f1" radius={[4, 4, 0, 0]} name="Asignado" />
                      <Bar dataKey="cobrado" fill="#10b981" radius={[4, 4, 0, 0]} name="Cobrado" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* CATEGORÍA 2: MARKETING                                            */}
          {/* ----------------------------------------------------------------- */}
          {subCategoria === "marketing" && (
            <div style={{ animation: 'fadeIn 0.3s ease-in-out', display: 'grid', gap: '16px' }}>
              <div style={{ background: 'linear-gradient(to bottom right, #14b8a6, #059669)', borderRadius: '12px', padding: '20px 24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 6px 20px rgba(20,184,166,0.25)' }}>
                <div>
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: '600', margin: 0, opacity: 0.9 }}>Alcance General de Marketing ({mesActual})</p>
                  <h3 style={{ fontSize: '32px', fontWeight: 'bold', margin: '6px 0 0 0' }}>{data.marketing.alcances.toLocaleString()} personas</h3>
                </div>
                <div style={{ textAlign: 'right', backgroundColor: 'rgba(0,0,0,0.15)', padding: '10px 16px', borderRadius: '10px' }}>
                  <p style={{ fontSize: '12px', margin: 0, opacity: 0.95 }}>Mensajes: <strong>{data.marketing.mensajes}</strong></p>
                  <p style={{ fontSize: '12px', margin: '4px 0 0 0', opacity: 0.95 }}>Inversión Importe: <strong>${data.marketing.importe}</strong></p>
                </div>
              </div>

              <div style={{ backgroundColor: tema.card, padding: '20px', borderRadius: '12px', border: `1px solid ${tema.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <img src="/logo2.png" alt="Logo 2" style={{ height: '30px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: tema.texto, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users style={{ width: '18px', height: '18px', color: '#14b8a6' }} /> Monitoreo y Rendimiento de Canales de Marketing (Histórico por Mes)
                  </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {listaMeses.map((mes) => {
                    const m = mesesData[mes].marketing || { importe: 0, alcances: 0, mensajes: 0 };
                    return (
                      <div key={mes} style={{ backgroundColor: tema.bg, borderRadius: '10px', padding: '16px', border: `1px solid ${tema.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{mes}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#1e3a8a', padding: '6px', borderRadius: '8px', display: 'inline-block', marginBottom: '4px' }}>
                              <DollarSignIcon style={{ width: '14px', height: '14px', color: '#60a5fa' }} />
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>${m.importe}</p>
                            <span style={{ fontSize: '10px', color: tema.subtexto }}>Importe</span>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#854d0e', padding: '6px', borderRadius: '8px', display: 'inline-block', marginBottom: '4px' }}>
                              <Share2 style={{ width: '14px', height: '14px', color: '#facc15' }} />
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>{m.alcances.toLocaleString()}</p>
                            <span style={{ fontSize: '10px', color: tema.subtexto }}>Alcance</span>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ backgroundColor: '#0284c7', padding: '6px', borderRadius: '8px', display: 'inline-block', marginBottom: '4px' }}>
                              <MessageSquare style={{ width: '14px', height: '14px', color: '#38bdf8' }} />
                            </div>
                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>{m.mensajes.toLocaleString()}</p>
                            <span style={{ fontSize: '10px', color: tema.subtexto }}>Mensajes</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* CATEGORÍA 3: COBRANZAS (Nuevo Modelo Estilo Dashboard Ejecutivo)    */}
          {/* ----------------------------------------------------------------- */}
          {subCategoria === "cobranzas" && (
            <div style={{ animation: 'fadeIn 0.3s ease-in-out', display: 'grid', gap: '20px' }}>
              
              {/* Título de la Sección de Cobranzas */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.card, padding: '16px 20px', borderRadius: '12px', border: `1px solid ${tema.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src="/logo2.png" alt="Logo 2" style={{ height: '32px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: tema.texto, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard style={{ width: '18px', height: '18px', color: '#10b981' }} /> Seguimiento Cobranza Mes {mesActual}
                    </h2>
                    <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguimiento de Gestión - Seguros Horizonte, S.A.</p>
                  </div>
                </div>
              </div>

              {/* BLOQUE SUPERIOR DE TARJETAS DE COBRANZA */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                
                {/* 1. Clientes Solventes y Desglose de Mora */}
                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${tema.border}`, paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck style={{ width: '20px', height: '20px', color: '#10b981' }} />
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: tema.texto }}>Clientes Solventes</span>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>{Number(data.cobranzasDetalle?.solventes || 14224).toLocaleString()}</span>
                  </div>

                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: tema.subtexto, display: 'flex', alignItems: 'center', gap: '6px' }}><AlertCircle style={{ width: '13px', height: '13px', color: '#f59e0b' }} /> Mora 1 Mes</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f59e0b' }}>{Number(data.cobranzasDetalle?.morosos1Mes || 1149).toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: tema.subtexto, display: 'flex', alignItems: 'center', gap: '6px' }}><AlertCircle style={{ width: '13px', height: '13px', color: '#f97316' }} /> Mora 2 Meses</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f97316' }}>{Number(data.cobranzasDetalle?.morosos2Meses || 842).toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: tema.subtexto, display: 'flex', alignItems: 'center', gap: '6px' }}><AlertCircle style={{ width: '13px', height: '13px', color: '#ef4444' }} /> Mora 3 Meses</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ef4444' }}>{Number(data.cobranzasDetalle?.morosos3Meses || 725).toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '8px 12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px', color: tema.subtexto, display: 'flex', alignItems: 'center', gap: '6px' }}><AlertCircle style={{ width: '13px', height: '13px', color: '#dc2626' }} /> Mora +3 Meses</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#dc2626' }}>{Number(data.cobranzasDetalle?.morososMas3Meses || 1877).toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '10px 12px', borderRadius: '8px', borderLeft: '3px solid #4f46e5' }}>
                    <p style={{ fontSize: '11px', color: tema.texto, margin: 0, lineHeight: '1.4' }}>
                      La cartera total alcanza los <strong>18.817</strong> clientes, de los cuales el <strong>75,48%</strong> se mantiene solvente, situando la morosidad activa en 4.613 casos.
                    </p>
                  </div>
                </div>

                {/* 2. Clientes Mora Temprana 1 - 2 - 3 Cuotas */}
                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ borderBottom: `1px solid ${tema.border}`, paddingBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#f59e0b' }}>Clientes Mora Temprana 1 - 2 - 3 Cuotas</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: tema.subtexto }}>BDD Inicial</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>2.716</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: tema.subtexto }}>BDD con Registros</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>1.839</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '10px 12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: tema.texto }}>% Compromiso de Pago</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>14,80%</span>
                  </div>

                  {/* Compromisos de Pago con Fechas */}
                  <div style={{ backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: tema.texto }}>Compromiso de Pago</span>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#6366f1' }}>402</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: tema.subtexto }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>📅 15 Septiembre:</span>
                        <strong style={{ color: tema.texto }}>80</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>📅 30 Septiembre:</span>
                        <strong style={{ color: tema.texto }}>322</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Clientes Mora Tardía + 3 Cuotas */}
                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ borderBottom: `1px solid ${tema.border}`, paddingBottom: '10px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ef4444' }}>Clientes Mora Tardía + 3 Cuotas</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: tema.subtexto }}>BDD Inicial</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>1.877</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: tema.subtexto }}>BDD con Registros</span>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>968</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '10px 12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: tema.texto }}>% Compromiso de Pago</span>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444' }}>0,00%</span>
                  </div>

                  {/* Compromisos de Pago con Fechas */}
                  <div style={{ backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: tema.texto }}>Compromiso de Pago</span>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444' }}>0</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: tema.subtexto }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>📅 15 Septiembre:</span>
                        <strong style={{ color: tema.texto }}>0</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>📅 30 Septiembre:</span>
                        <strong style={{ color: tema.texto }}>0</strong>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* BLOQUE INFERIOR DE BANCOS Y RECAUDACIONES */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                
                {/* Banesco y BANFANB */}
                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase' }}>Clientes Cobrados Banesco</span>
                      <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: tema.texto, margin: '2px 0 0 0' }}>{Number(data.cobranzasDetalle?.cobradosBanesco || 27)}</h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Monto Banesco</span>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>BsF 179.996,26</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', textTransform: 'uppercase' }}>Clientes Cobrados BANFANB</span>
                      <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: tema.texto, margin: '2px 0 0 0' }}>{Number(data.cobranzasDetalle?.cobradosBanfanb || 23)}</h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Monto BANFANB</span>
                      <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>BsF 89.569,07</p>
                    </div>
                  </div>
                </div>

                {/* Pagos Recurrentes Banco Plaza */}
                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: tema.subtexto, textTransform: 'uppercase', marginBottom: '4px' }}>Pagos Recurrentes Clientes Mora Temprana 2 - 3 Cuotas</span>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6', margin: '0 0 10px 0' }}>BANCO PLAZA</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', width: '100%', borderTop: `1px solid ${tema.border}`, borderBottom: `1px solid ${tema.border}`, padding: '10px 0', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Clientes Cobrados</span>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>86</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Monto Total</span>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>BsF 500.407,41</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* PESTAÑA 2: EVOLUCIÓN INTERMESES */}
      {pestañaActiva === "evolucion" && (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out', display: 'grid', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: tema.card, padding: '16px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <img src="/logo2.png" alt="Logo 2" style={{ height: '28px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: tema.texto, margin: 0 }}>Ventas Mensuales</h3>
              </div>
              <div style={{ height: '210px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ventasGlobalesData} innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {ventasGlobalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ backgroundColor: tema.card, padding: '16px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <img src="/logo2.png" alt="Logo 2" style={{ height: '28px', objectFit: 'contain', imageRendering: 'crisp-edges' }} />
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: tema.texto, margin: 0 }}>Comportamiento Trimestral</h3>
              </div>
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}