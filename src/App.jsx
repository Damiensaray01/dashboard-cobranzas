import React, { useState, useEffect } from 'react';
import { 
  Users, RefreshCw, MessageSquare, DollarSignIcon, Share2, 
  Sparkles, Sun, Moon, ArrowRight, ShieldCheck, CreditCard, AlertCircle, BarChart3, LineChart as LineChartIcon, RefreshCw as RefreshIcon, Award, TrendingUp, Target, Lock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid, LabelList, Legend
} from 'recharts';

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyl6kWt93RDqV9m8TRKD1BaS_VClcsByvDu15ELIj75jqByUab9pEtxJDdHMGWdXABC5w/exec";

// Datos iniciales idénticos a tu Google Sheets (Septiembre y Octubre con bancos exactos)
const ASESORES_DATA_DEFAULT = [
  { mes: 'Julio', asesor: 'Berenice troconiz', ventas: 8, cobradas: 8, plaza: 0, banesco: 0, banfanb: 0, pct: '100,00%', status: 'Activo' },
  { mes: 'Julio', asesor: 'Carlos Argort', ventas: 38, cobradas: 36, plaza: 0, banesco: 0, banfanb: 0, pct: '94,74%', status: 'Activo' },
  { mes: 'Julio', asesor: 'Carolina Rojas', ventas: 26, cobradas: 20, plaza: 0, banesco: 0, banfanb: 0, pct: '76,92%', status: 'Activo' },
  { mes: 'Julio', asesor: 'Duvan moreno', ventas: 38, cobradas: 25, plaza: 0, banesco: 0, banfanb: 0, pct: '65,79%', status: 'Activo' },
  { mes: 'Julio', asesor: 'Gabriela Barrios', ventas: 28, cobradas: 24, plaza: 0, banesco: 0, banfanb: 0, pct: '85,71%', status: 'Activo' },
  { mes: 'Julio', asesor: 'Jose Mendoza', ventas: 24, cobradas: 23, plaza: 0, banesco: 0, banfanb: 0, pct: '95,83%', status: 'Egreso' },
  { mes: 'Julio', asesor: 'Kariosqui Gomez', ventas: 35, cobradas: 30, plaza: 0, banesco: 0, banfanb: 0, pct: '85,71%', status: 'Activo' },
  { mes: 'Julio', asesor: 'Leidy Jaime', ventas: 19, cobradas: 19, plaza: 0, banesco: 0, banfanb: 0, pct: '100,00%', status: 'Egreso' },
  { mes: 'Julio', asesor: 'Roikel Suniaga', ventas: 21, cobradas: 16, plaza: 0, banesco: 0, banfanb: 0, pct: '76,19%', status: 'Activo' },
  { mes: 'Julio', asesor: 'Alejandra Mujica', ventas: 5, cobradas: 5, plaza: 0, banesco: 0, banfanb: 0, pct: '100,00%', status: 'Activo' },
  
  { mes: 'Agosto', asesor: 'Carlos Argort', ventas: 66, cobradas: 29, plaza: 0, banesco: 0, banfanb: 0, pct: '43,94%', status: 'Activo' },
  { mes: 'Agosto', asesor: 'Duvan moreno', ventas: 53, cobradas: 22, plaza: 0, banesco: 0, banfanb: 0, pct: '41,51%', status: 'Activo' },
  { mes: 'Agosto', asesor: 'Gabriela Barrios', ventas: 41, cobradas: 27, plaza: 0, banesco: 0, banfanb: 0, pct: '65,85%', status: 'Activo' },
  { mes: 'Agosto', asesor: 'Kariosqui Gomez', ventas: 37, cobradas: 19, plaza: 0, banesco: 0, banfanb: 0, pct: '51,35%', status: 'Activo' },
  { mes: 'Agosto', asesor: 'Carolina Rojas', ventas: 31, cobradas: 19, plaza: 0, banesco: 0, banfanb: 0, pct: '61,29%', status: 'Activo' },
  { mes: 'Agosto', asesor: 'Roikel Suniaga', ventas: 29, cobradas: 19, plaza: 0, banesco: 0, banfanb: 0, pct: '65,52%', status: 'Activo' },
  
  // SEPTIEMBRE CARGADO DIRECTAMENTE CON TUS CIFRAS DEL SHEETS
  { mes: 'Septiembre', asesor: 'Carlos Argort', ventas: 49, cobradas: 26, plaza: 23, banesco: 0, banfanb: 3, pct: '53,06%', status: 'Egreso' },
  { mes: 'Septiembre', asesor: 'Duvan moreno', ventas: 49, cobradas: 31, plaza: 31, banesco: 0, banfanb: 0, pct: '63,27%', status: 'Egreso' },
  { mes: 'Septiembre', asesor: 'Gabriela Barrios', ventas: 23, cobradas: 10, plaza: 10, banesco: 0, banfanb: 0, pct: '43,48%', status: 'Egreso' },
  { mes: 'Septiembre', asesor: 'Kariosqui Gomez', ventas: 44, cobradas: 32, plaza: 31, banesco: 1, banfanb: 0, pct: '72,73%', status: 'Activo' },
  { mes: 'Septiembre', asesor: 'Carolina Rojas', ventas: 35, cobradas: 13, plaza: 14, banesco: 0, banfanb: 0, pct: '37,14%', status: 'Activo' },
  { mes: 'Septiembre', asesor: 'Roikel Suniaga', ventas: 31, cobradas: 11, plaza: 10, banesco: 0, banfanb: 1, pct: '35,48%', status: 'Activo' },
  { mes: 'Septiembre', asesor: 'Evelyn La Rosa', ventas: 18, cobradas: 2, plaza: 2, banesco: 0, banfanb: 0, pct: '11,11%', status: 'Egreso' },
  { mes: 'Septiembre', asesor: 'Yanfran Sanchez', ventas: 8, cobradas: 3, plaza: 2, banesco: 0, banfanb: 0, pct: '37,50%', status: 'Egreso' },
  
  // OCTUBRE CARGADO DIRECTAMENTE CON TUS CIFRAS DEL SHEETS
  { mes: 'Octubre', asesor: 'Kariosqui Gomez', ventas: 84, cobradas: 43, plaza: 34, banesco: 3, banfanb: 6, pct: '51,19%', status: 'Activo' },
  { mes: 'Octubre', asesor: 'Kismar Hernandez', ventas: 53, cobradas: 18, plaza: 11, banesco: 1, banfanb: 6, pct: '33,96%', status: 'Activo' },
  { mes: 'Octubre', asesor: 'Roikel Suniaga', ventas: 45, cobradas: 21, plaza: 13, banesco: 2, banfanb: 6, pct: '46,67%', status: 'Activo' },
  { mes: 'Octubre', asesor: 'Danielis Villegas', ventas: 39, cobradas: 18, plaza: 15, banesco: 1, banfanb: 2, pct: '46,15%', status: 'Activo' },
  { mes: 'Octubre', asesor: 'Carolina Rojas', ventas: 36, cobradas: 17, plaza: 12, banesco: 4, banfanb: 1, pct: '47,22%', status: 'Activo' },
  { mes: 'Octubre', asesor: 'Luisiana Nacero', ventas: 26, cobradas: 0, plaza: 0, banesco: 0, banfanb: 0, pct: '0,00%', status: 'Egreso' },
  { mes: 'Octubre', asesor: 'Cindy Suarez', ventas: 18, cobradas: 10, plaza: 3, banesco: 2, banfanb: 5, pct: '55,56%', status: 'Activo' },
  { mes: 'Octubre', asesor: 'Angi Torres', ventas: 3, cobradas: 0, plaza: 0, banesco: 0, banfanb: 0, pct: '0,00%', status: 'Egreso' },
  { mes: 'Octubre', asesor: 'Daniel Diaz', ventas: 1, cobradas: 0, plaza: 0, banesco: 0, banfanb: 0, pct: '0,00%', status: 'Egreso' }
];

const RESUMEN_ASESORES_DEFAULT = [
  { mes: 'Julio', ventas: 242, cobradas: 206, pct: '85,12%' },
  { mes: 'Agosto', ventas: 257, cobradas: 135, pct: '52,53%' },
  { mes: 'Septiembre', ventas: 257, cobradas: 128, pct: '49,81%' },
  { mes: 'Octubre', ventas: 305, cobradas: 127, pct: '41,64%' },
  { mes: 'Noviembre', ventas: 0, cobradas: 0, pct: '0,00%' },
  { mes: 'Diciembre', ventas: 0, cobradas: 0, pct: '0,00%' }
];

const formatearNumero = (valor) => {
  const num = Number(valor) || 0;
  return new Intl.NumberFormat('es-ES', { 
    minimumFractionDigits: num % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2 
  }).format(num);
};

export default function App() {
  const [modoInicio, setModoInicio] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(true);
  const [mesesData, setMesesData] = useState({});
  const [asesoresData, setAsesoresData] = useState({ ranking: ASESORES_DATA_DEFAULT, resumen: RESUMEN_ASESORES_DEFAULT });
  const [mesActual, setMesActual] = useState("Septiembre");
  const [subCategoria, setSubCategoria] = useState("asesores");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [asesorSeleccionado, setAsesorSeleccionado] = useState("TODOS");

  // Estados para la contraseña de acceso blindado
  const [passwordInput, setPasswordInput] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const manejarAcceso = (e) => {
    e.preventDefault();
    if (passwordInput === "ADMB2027*1") {
      setErrorPassword(false);
      setModoInicio(false);
    } else {
      setErrorPassword(true);
    }
  };

  const fetchSheetData = async () => {
    setIsRefreshing(true);
    try {
      // Parámetro anticanché para que lea los cambios al instante
      const response = await fetch(`${APPS_SCRIPT_URL}?t=${new Date().getTime()}`);
      const res = await response.json();
      
      const datosMeses = res.meses ? res.meses : Object.keys(res).reduce((acc, k) => {
        if (k !== 'asesoresData') acc[k] = res[k];
        return acc;
      }, {});

      setMesesData(datosMeses || {});

      if (res.asesoresData && res.asesoresData.ranking && res.asesoresData.ranking.length > 0) {
        setAsesoresData(res.asesoresData);
      }

      const mesesDisponibles = Object.keys(datosMeses || {});
      if (mesesDisponibles.length > 0 && !datosMeses[mesActual]) {
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

  const data = mesesData[mesActual] || {};
  const cobD = data.cobranzasDetalle || {};

  const ventasGeneradasActual = Number(data.ventasGeneradas ?? data.ventas ?? 0);
  const montoPlazaActual = Number(cobD.pagosRecurrentesPlaza ?? 0);
  const montoBanfanbActual = Number(cobD.montoBanfanb ?? 0);
  const montoBanescoActual = Number(cobD.montoBanesco ?? 0);

  const listaMeses = Object.keys(mesesData);

  const obtenerNombreMes = (key) => {
    const mapaMeses = {
      "6": "Junio", "7": "Julio", "8": "Agosto", "9": "Septiembre", "10": "Octubre",
      "Junio": "Junio", "Julio": "Julio", "Agosto": "Agosto", "Septiembre": "Septiembre", "Octubre": "Octubre",
      "Noviembre": "Noviembre", "Diciembre": "Diciembre"
    };
    return mapaMeses[String(key).trim()] || `Mes ${key}`;
  };

  const solventesMes = Number(cobD.solventes ?? 0);
  const mora1Mes = Number(cobD.morosos1Mes ?? 0);
  const mora2Meses = Number(cobD.morosos2Meses ?? 0);
  const mora3Meses = Number(cobD.morosos3Meses ?? 0);
  const moraMas3Meses = Number(cobD.morososMas3Meses ?? 0);
  const moraTempranaMes = mora1Mes + mora2Meses + mora3Meses;

  const cobradosBanescoActual = Number(cobD.cobradosBanesco ?? 0);
  const cobradosBanfanbActual = Number(cobD.cobradosBanfanb ?? 0);
  const bddRegistros123Actual = Number(cobD.bddRegistros123 ?? 0);
  const bddRegistrosMas3Actual = Number(cobD.bddRegistrosMas3 ?? 0);
  const compromiso123Actual = Number(cobD.compromiso123Cuotas ?? 0);
  const compromisoMas3Actual = Number(cobD.compromisoMas3Cuotas ?? 0);

  const clientesRenovaciones = Number(cobD.clientesRenovaciones ?? 0);
  const renovacionesPendientes = Number(cobD.renovacionesPendientes ?? 0);
  const renovacionesCobradas = Number(cobD.renovacionesCobradas ?? 0);
  const porcentajeImpactoRenovaciones = clientesRenovaciones > 0 ? ((renovacionesCobradas / clientesRenovaciones) * 100).toFixed(1) : "0.0";

  const dataGraficoRenovacionesGeneral = listaMeses.map(m => {
    const itemMes = mesesData[m] || {};
    const cdItem = itemMes.cobranzasDetalle || {};
    return {
      mes: obtenerNombreMes(m),
      "Total Clientes": Number(cdItem.clientesRenovaciones ?? 0),
      "Pendientes": Number(cdItem.renovacionesPendientes ?? 0),
      "Cobradas": Number(cdItem.renovacionesCobradas ?? 0)
    };
  });

  const obtenerCompromisosQuincena = (mesKey) => {
    const k = String(mesKey).trim();
    if (k === "10" || k === "Octubre") return { q15: 187, q30: 236 };
    if (k === "9" || k === "Septiembre") return { q15: 79, q30: 322 };
    if (k === "8" || k === "Agosto") return { q15: 45, q30: 327 };
    return { q15: Math.round(compromiso123Actual * 0.2), q30: compromiso123Actual - Math.round(compromiso123Actual * 0.2) };
  };

  const quincenaInfo = obtenerCompromisosQuincena(mesActual);

  const totalImporteMarketing = listaMeses.reduce((acc, m) => acc + Number(mesesData[m]?.marketing?.importe ?? 0), 0);
  const totalAlcanceMarketing = listaMeses.reduce((acc, m) => acc + Number(mesesData[m]?.marketing?.alcances ?? 0), 0);
  const totalMensajesMarketing = listaMeses.reduce((acc, m) => acc + Number(mesesData[m]?.marketing?.mensajes ?? 0), 0);

  const dataGraficoGlobal = listaMeses.map(m => {
    const item = mesesData[m] || {};
    const cd = item.cobranzasDetalle || {};
    return {
      mes: obtenerNombreMes(m),
      Ventas: Number(item.ventasGeneradas ?? item.ventas ?? 0),
      Plaza: Number(cd.pagosRecurrentesPlaza ?? 0),
      Banfanb: Number(cd.montoBanfanb ?? 0),
      Banesco: Number(cd.montoBanesco ?? 0)
    };
  });

  const dataEvolucionMontosPlaza = listaMeses.map(m => {
    const item = mesesData[m] || {};
    const cd = item.cobranzasDetalle || {};
    return {
      mes: obtenerNombreMes(m),
      Monto: Number(cd.montoCobradoBancoPlazaVentas ?? 0)
    };
  });

  const dataEvolucionMontosBanesco = listaMeses.map(m => {
    const item = mesesData[m] || {};
    const cd = item.cobranzasDetalle || {};
    return {
      mes: obtenerNombreMes(m),
      Monto: Number(cd.montoCobradoBanescoVentas ?? 0)
    };
  });

  const dataEvolucionMontosBanfanb = listaMeses.map(m => {
    const item = mesesData[m] || {};
    const cd = item.cobranzasDetalle || {};
    return {
      mes: obtenerNombreMes(m),
      Monto: Number(cd.montoCobradoBanfanbVentas ?? 0)
    };
  });

  const listaAsesoresUnicos = Array.from(
    new Set((asesoresData.ranking || []).map(a => String(a.asesor).trim()))
  ).sort();

  const rankingFiltrado = (asesoresData.ranking || []).filter(a => 
    String(a.mes).trim().toLowerCase() === obtenerNombreMes(mesActual).toLowerCase()
  );

  const mesesEvolucion = ["Julio", "Agosto", "Septiembre", "Octubre"];
  const dataEvolucionAsesores = mesesEvolucion.map(m => {
    const registrosMes = (asesoresData.ranking || []).filter(a => String(a.mes).toLowerCase() === m.toLowerCase());
    
    if (asesorSeleccionado === "TODOS") {
      const totalV = registrosMes.reduce((acc, r) => acc + Number(r.ventas || 0), 0);
      const totalC = registrosMes.reduce((acc, r) => acc + Number(r.cobradas || 0), 0);
      return {
        mes: m,
        "Ventas Generadas": totalV,
        "Ventas Cobradas": totalC,
        "% Cobro": totalV > 0 ? Number(((totalC / totalV) * 100).toFixed(1)) : 0
      };
    } else {
      const reg = registrosMes.find(r => String(r.asesor).toLowerCase() === asesorSeleccionado.toLowerCase());
      const v = reg ? Number(reg.ventas || 0) : 0;
      const c = reg ? Number(reg.cobradas || 0) : 0;
      return {
        mes: m,
        "Ventas Generadas": v,
        "Ventas Cobradas": c,
        "% Cobro": v > 0 ? Number(((c / v) * 100).toFixed(1)) : 0
      };
    }
  });

  const totalVentasResumen = (asesoresData.resumen || []).reduce((acc, item) => acc + Number(item.ventas || 0), 0);
  const totalCobradasResumen = (asesoresData.resumen || []).reduce((acc, item) => acc + Number(item.cobradas || 0), 0);
  const efectividadGlobalResumen = totalVentasResumen > 0 ? ((totalCobradasResumen / totalVentasResumen) * 100).toFixed(2) + '%' : '0,00%';

  const totalPlazaMes = rankingFiltrado.reduce((acc, a) => acc + Number(a.plaza || 0), 0);
  const totalBanescoMes = rankingFiltrado.reduce((acc, a) => acc + Number(a.banesco || 0), 0);
  const totalBanfanbMes = rankingFiltrado.reduce((acc, a) => acc + Number(a.banfanb || 0), 0);

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

  if (modoInicio) {
    const entradaEstilo = {
      width: '100vw',
      minHeight: '100vh',
      backgroundImage: `url('/Logo6.png')`,
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: temaOscuro ? '#0b0f19' : '#f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      fontFamily: 'sans-serif'
    };

    return (
      <div style={entradaEstilo}>
        <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10 }}>
          <button onClick={() => setTemaOscuro(!temaOscuro)} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(30, 41, 59, 0.85)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', backdropFilter: 'blur(6px)' }}>
            {temaOscuro ? <Sun style={{ width: '16px', height: '16px', color: '#f59e0b' }} /> : <Moon style={{ width: '16px', height: '16px', color: '#6366f1' }} />}
            {temaOscuro ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
        
        <div style={{ maxWidth: '650px', width: '100%', textAlign: 'center', backgroundColor: temaOscuro ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)', padding: '45px 35px', borderRadius: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 25px 50px rgba(0,0,0,0.4)', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            <img src="/logo2.png" alt="Logo Biartet" style={{ height: '60px', objectFit: 'contain' }} />
            <div style={{ width: '1px', height: '45px', backgroundColor: tema.border }}></div>
            <img src="/logo3.png" alt="Logo Seguros Horizonte" style={{ height: '60px', objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'inline-block', backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#eab308', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
            Presidencia & Junta Directiva — Acceso Blindado
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 10px 0', color: tema.texto, letterSpacing: '-0.5px' }}>
            Biartet & Seguros Horizonte
          </h1>
          <h2 style={{ fontSize: '14px', fontWeight: '500', color: tema.subtexto, margin: '0 0 28px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Plataforma Ejecutiva de Control Comercial & Cobranzas
          </h2>

          <form onSubmit={manejarAcceso} style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock style={{ position: 'absolute', left: '16px', width: '18px', height: '18px', color: tema.subtexto }} />
              <input 
                type="password" 
                placeholder="Ingrese la contraseña de acceso..." 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '12px',
                  border: `1px solid ${errorPassword ? '#ef4444' : tema.border}`,
                  backgroundColor: temaOscuro ? '#0f172a' : '#f8fafc',
                  color: tema.texto,
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {errorPassword && (
              <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600', textAlign: 'left', paddingLeft: '4px' }}>
                ⚠️ Contraseña incorrecta. Acceso denegado.
              </div>
            )}

            <button type="submit" style={{ width: '100%', padding: '15px 24px', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', color: '#0f172a', background: 'linear-gradient(135deg, #eab308, #ca8a04)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 25px rgba(234, 179, 8, 0.3)', transition: 'transform 0.2s' }}>
              Acceder al Dashboard Ejecutiva <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  const fondoDashboardEstilo = {
    width: '100vw',
    minHeight: '100vh',
    backgroundImage: `url('/logo5.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{ ...fondoDashboardEstilo, color: tema.texto, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'sans-serif', fontSize: '13px' }}>
      <div style={{ padding: '16px 20px', flex: 1, boxSizing: 'border-box', width: '100%', maxWidth: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '12px', backgroundColor: tema.card, padding: '10px 16px', borderRadius: '12px', border: `1px solid ${tema.border}`, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => { setModoInicio(true); setPasswordInput(""); setErrorPassword(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tema.subtexto }} title="Bloquear / Volver a Inicio">
              <img src="/logo2.png" alt="Logo 2" style={{ height: '40px', objectFit: 'contain' }} />
            </button>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: tema.texto, margin: 0 }}>Dashboard Comercial & Cobranzas</h1>
              <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguros Horizonte - Sincronizado en Vivo</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setTemaOscuro(!temaOscuro)} style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: tema.bg, color: tema.texto, border: `1px solid ${tema.border}`, cursor: 'pointer' }}>
              {temaOscuro ? <Sun style={{ width: '14px', height: '14px', color: '#f59e0b' }} /> : <Moon style={{ width: '14px', height: '14px', color: '#1e3a8a' }} />}
            </button>
            <button onClick={fetchSheetData} disabled={isRefreshing} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#1e3a8a', color: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
              <RefreshCw style={{ width: '13px', height: '13px', animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} /> {isRefreshing ? 'Sincronizando...' : 'Actualizar'}
            </button>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '6px', backgroundColor: tema.card, padding: '4px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
              <button onClick={() => setSubCategoria("ventas")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: subCategoria === "ventas" ? '#1e3a8a' : 'transparent', color: subCategoria === "ventas" ? '#ffffff' : tema.subtexto }}>📈 Ventas</button>
              <button onClick={() => setSubCategoria("marketing")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: subCategoria === "marketing" ? '#1e3a8a' : 'transparent', color: subCategoria === "marketing" ? '#ffffff' : tema.subtexto }}>📢 Marketing</button>
              <button onClick={() => setSubCategoria("cobranzas")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: subCategoria === "cobranzas" ? '#1e3a8a' : 'transparent', color: subCategoria === "cobranzas" ? '#ffffff' : tema.subtexto }}>💳 Cobranzas</button>
              <button onClick={() => setSubCategoria("asesores")} style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: subCategoria === "asesores" ? '#1e3a8a' : 'transparent', color: subCategoria === "asesores" ? '#ffffff' : tema.subtexto }}>👥 Asesores</button>
            </div>

            <div style={{ display: 'flex', gap: '4px', backgroundColor: tema.card, padding: '3px', borderRadius: '8px', border: `1px solid ${tema.border}`, flexWrap: 'wrap' }}>
              {listaMeses.map((mes) => (
                <button key={mes} onClick={() => setMesActual(mes)} style={{ padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', border: 'none', backgroundColor: mesActual === mes ? '#1e3a8a' : 'transparent', color: mesActual === mes ? '#ffffff' : tema.subtexto }}>{obtenerNombreMes(mes)}</button>
              ))}
            </div>
          </div>

          {/* 1. SECCIÓN VENTAS */}
          {subCategoria === "ventas" && (
            <div style={{ display: 'grid', gap: '20px', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #0f172a)', borderRadius: '12px', padding: '18px', color: '#fff', borderLeft: '4px solid #eab308' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, color: '#93c5fd' }}>Ventas Generadas ({obtenerNombreMes(mesActual)})</p>
                  <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0 0 0' }}>{formatearNumero(ventasGeneradasActual)}</h3>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #0f172a)', borderRadius: '12px', padding: '18px', color: '#fff', borderLeft: '4px solid #3b82f6' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, color: '#93c5fd' }}>Montos Banco Plaza</p>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '6px 0 0 0' }}>BsF {formatearNumero(Number(data.montoBancoPlaza ?? 0))}</h3>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #0f172a)', borderRadius: '12px', padding: '18px', color: '#fff', borderLeft: '4px solid #10b981' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, color: '#93c5fd' }}>Montos Banfanb Ventas</p>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '6px 0 0 0' }}>BsF {formatearNumero(Number(data.montoBanfanbVentas ?? 0))}</h3>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #0f172a)', borderRadius: '12px', padding: '18px', color: '#fff', borderLeft: '4px solid #eab308' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, color: '#93c5fd' }}>Monto Banesco Ventas</p>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: '6px 0 0 0' }}>BsF {formatearNumero(Number(data.montoBanescoVentas ?? 0))}</h3>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}` }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: tema.texto, margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BarChart3 style={{ width: '16px', height: '16px', color: '#eab308' }} /> Comportamiento Global de Ventas (Unidades)
                  </h4>
                  <div style={{ height: '210px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dataGraficoGlobal} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                        <XAxis dataKey="mes" stroke={tema.subtexto} fontSize={10} />
                        <YAxis stroke={tema.subtexto} fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '12px' }} />
                        <Bar dataKey="Ventas" fill="#eab308" radius={[4, 4, 0, 0]} name="Ventas Generadas">
                          <LabelList dataKey="Ventas" position="top" fill={tema.texto} fontSize={11} fontWeight="bold" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ backgroundColor: tema.card, padding: '18px', borderRadius: '12px', border: `1px solid ${tema.border}` }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: tema.texto, margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <LineChartIcon style={{ width: '16px', height: '16px', color: '#3b82f6' }} /> Comportamiento Independiente por Canales (BsF)
                  </h4>
                  <div style={{ height: '210px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dataGraficoGlobal} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={tema.border} />
                        <XAxis dataKey="mes" stroke={tema.subtexto} fontSize={10} />
                        <YAxis stroke={tema.subtexto} fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '12px' }} />
                        <Line type="monotone" dataKey="Plaza" stroke="#3b82f6" strokeWidth={2.5} name="Banco Plaza" />
                        <Line type="monotone" dataKey="Banfanb" stroke="#eab308" strokeWidth={2.5} name="BANFANB" />
                        <Line type="monotone" dataKey="Banesco" stroke="#10b981" strokeWidth={2.5} name="Banesco" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* CONSOLIDADO DE VENTAS Y RECAUDACIÓN (MONTOS) */}
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: tema.texto, textAlign: 'center', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>
                  CONSOLIDADO DE VENTAS Y RECAUDACIÓN (MONTOS BSF)
                </h3>
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${tema.border}`, color: tema.subtexto }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>MES</th>
                        <th style={{ padding: '10px' }}>VENTAS GENERADAS</th>
                        <th style={{ padding: '10px', color: '#eab308' }}>COBRADAS VENTAS</th>
                        <th style={{ padding: '10px', color: '#10b981' }}>% IMPACTO VENTAS</th>
                        <th style={{ padding: '10px' }}>BANCO PLAZA</th>
                        <th style={{ padding: '10px' }}>BANFANB VENTAS</th>
                        <th style={{ padding: '10px' }}>BANESCO VENTAS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaMeses.map((mes) => {
                        const item = mesesData[mes] || {};
                        const cd = item.cobranzasDetalle || {};
                        const vGen = Number(item.ventasGeneradas ?? item.ventas ?? 0);
                        const cobVentas = Number(cd.cobradasVentas ?? 0);
                        
                        let pctImpacto = cd.porcentajeImpacto ?? 0;
                        if (typeof pctImpacto === 'number') {
                          pctImpacto = (pctImpacto > 1 ? pctImpacto : pctImpacto * 100).toFixed(2).replace('.', ',') + '%';
                        }

                        const mPlaza = Number(item.montoBancoPlaza ?? 0);
                        const mBanfanb = Number(item.montoBanfanbVentas ?? 0);
                        const mBanesco = Number(item.montoBanescoVentas ?? 0);

                        return (
                          <tr key={mes} onClick={() => setMesActual(mes)} style={{ cursor: 'pointer', borderBottom: `1px solid ${tema.border}`, backgroundColor: mes === mesActual ? (temaOscuro ? 'rgba(30, 58, 138, 0.25)' : 'rgba(30, 58, 138, 0.08)') : 'transparent' }}>
                            <td style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 'bold', color: mes === mesActual ? '#eab308' : tema.texto }}>{obtenerNombreMes(mes).toUpperCase()} {mes === mesActual && '⭐'}</td>
                            <td style={{ padding: '12px 10px', fontWeight: '600' }}>{formatearNumero(vGen)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#eab308' }}>{formatearNumero(cobVentas)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#10b981' }}>{pctImpacto}</td>
                            <td style={{ padding: '12px 10px' }}>BsF {formatearNumero(mPlaza)}</td>
                            <td style={{ padding: '12px 10px' }}>BsF {formatearNumero(mBanfanb)}</td>
                            <td style={{ padding: '12px 10px' }}>BsF {formatearNumero(mBanesco)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CONSOLIDADO DE VENTAS COBRADAS POR BANCO */}
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: tema.texto, textAlign: 'center', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>
                  CONSOLIDADO DE VENTAS COBRADAS POR BANCO (CANTIDAD Y MONTOS)
                </h3>
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${tema.border}`, color: tema.subtexto }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>MES</th>
                        <th style={{ padding: '10px' }}>VENTAS GENERADAS</th>
                        <th style={{ padding: '10px', color: '#eab308' }}>COBRADAS VENTAS</th>
                        <th style={{ padding: '10px', color: '#3b82f6' }}>PLAZA (CLI)</th>
                        <th style={{ padding: '10px', color: '#eab308' }}>BANFANB (CLI)</th>
                        <th style={{ padding: '10px', color: '#0284c7' }}>BANESCO (CLI)</th>
                        <th style={{ padding: '10px', color: '#10b981' }}>% IMPACTO VENTAS</th>
                        <th style={{ padding: '10px' }}>MONTO PLAZA</th>
                        <th style={{ padding: '10px' }}>MONTO BANFANB</th>
                        <th style={{ padding: '10px' }}>MONTO BANESCO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaMeses.map((mes) => {
                        const item = mesesData[mes] || {};
                        const cd = item.cobranzasDetalle || {};
                        const vGen = Number(item.ventasGeneradas ?? item.ventas ?? 0);
                        const cobVentas = Number(cd.cobradasVentas ?? 0);
                        
                        let pctImpacto = cd.porcentajeImpacto ?? 0;
                        if (typeof pctImpacto === 'number') {
                          pctImpacto = (pctImpacto > 1 ? pctImpacto : pctImpacto * 100).toFixed(2).replace('.', ',') + '%';
                        }

                        const cliPlaza = Number(cd.clientesCobradosBancoPlazaVentas ?? 0);
                        const cliBanfanb = Number(cd.clientesCobradosBanfanbVentas ?? 0);
                        const cliBanesco = Number(cd.clientesCobradosBanescoVentas ?? 0);

                        const mPlaza = Number(item.montoBancoPlaza ?? 0);
                        const mBanfanb = Number(item.montoBanfanbVentas ?? 0);
                        const mBanesco = Number(item.montoBanescoVentas ?? 0);

                        return (
                          <tr key={mes} onClick={() => setMesActual(mes)} style={{ cursor: 'pointer', borderBottom: `1px solid ${tema.border}`, backgroundColor: mes === mesActual ? (temaOscuro ? 'rgba(30, 58, 138, 0.25)' : 'rgba(30, 58, 138, 0.08)') : 'transparent' }}>
                            <td style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 'bold', color: mes === mesActual ? '#eab308' : tema.texto }}>{obtenerNombreMes(mes).toUpperCase()} {mes === mesActual && '⭐'}</td>
                            <td style={{ padding: '12px 10px', fontWeight: '600' }}>{formatearNumero(vGen)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#eab308' }}>{formatearNumero(cobVentas)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#3b82f6' }}>{formatearNumero(cliPlaza)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#eab308' }}>{formatearNumero(cliBanfanb)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#0284c7' }}>{formatearNumero(cliBanesco)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#10b981' }}>{pctImpacto}</td>
                            <td style={{ padding: '12px 10px' }}>BsF {formatearNumero(mPlaza)}</td>
                            <td style={{ padding: '12px 10px' }}>BsF {formatearNumero(mBanfanb)}</td>
                            <td style={{ padding: '12px 10px' }}>BsF {formatearNumero(mBanesco)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SEGMENTACIÓN DE VENTAS POR BANCO */}
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '24px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto, textAlign: 'center', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>
                  SEGMENTACIÓN DE VENTAS POR BANCO — {obtenerNombreMes(mesActual).toUpperCase()}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  
                  {/* BANCO PLAZA */}
                  <div style={{ backgroundColor: tema.bg, borderRadius: '14px', border: `1px solid ${tema.border}`, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src="/LogoPlaza.png" alt="Banco Plaza" style={{ height: '32px', objectFit: 'contain' }} />
                        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '15px', letterSpacing: '0.5px' }}>Banco Plaza</span>
                      </div>
                      <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px' }}>Activo</span>
                    </div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ backgroundColor: tema.card, borderRadius: '10px', border: `1px solid ${tema.border}`, overflow: 'hidden' }}>
                        <div style={{ padding: '10px 14px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderBottom: `1px solid ${tema.border}`, fontSize: '11px', fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase' }}>
                          CLIENTES PLAZA (CONSOLIDADO MENSUAL)
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {listaMeses.map((mKey) => {
                            const itemMes = mesesData[mKey] || {};
                            const cdItem = itemMes.cobranzasDetalle || {};
                            const cantClientes = Number(cdItem.clientesCobradosBancoPlazaVentas ?? 0);
                            const nombreM = obtenerNombreMes(mKey);
                            const esActual = mKey === mesActual;

                            return (
                              <div key={mKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: `1px solid ${tema.border}`, backgroundColor: esActual ? (temaOscuro ? 'rgba(30, 58, 138, 0.3)' : 'rgba(30, 58, 138, 0.08)') : 'transparent' }}>
                                <span style={{ fontSize: '12px', fontWeight: esActual ? 'bold' : 'normal', color: esActual ? '#3b82f6' : tema.texto }}>
                                  {nombreM.toUpperCase()} {esActual && '⭐'}
                                </span>
                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: esActual ? '#3b82f6' : tema.texto }}>
                                  {formatearNumero(cantClientes)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div style={{ backgroundColor: tema.card, padding: '14px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '10px', color: tema.subtexto, textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: 'bold' }}>MONTO PLAZA (BSF) - {obtenerNombreMes(mesActual).toUpperCase()}</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                          BsF {formatearNumero(data.cobranzasDetalle?.montoCobradoBancoPlazaVentas ?? 0)}
                        </span>
                      </div>

                      <div style={{ backgroundColor: tema.card, padding: '12px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: tema.texto, display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>📈 EVOLUCIÓN MONTOS (BSF) POR MES</span>
                        <div style={{ height: '170px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataEvolucionMontosPlaza} margin={{ top: 18, right: 5, left: -20, bottom: 0 }}>
                              <XAxis dataKey="mes" stroke={tema.subtexto} fontSize={10} />
                              <YAxis stroke={tema.subtexto} fontSize={10} />
                              <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '11px' }} />
                              <Bar dataKey="Monto" fill="#10b981" radius={[4, 4, 0, 0]} name="Monto BsF">
                                <LabelList dataKey="Monto" position="top" fill={tema.texto} fontSize={9} fontWeight="bold" formatter={(val) => formatearNumero(val)} />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BANESCO */}
                  <div style={{ backgroundColor: tema.bg, borderRadius: '14px', border: `1px solid ${tema.border}`, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <div style={{ background: 'linear-gradient(135deg, #0f172a, #0284c7)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src="/LogoBanesco.png" alt="Banesco" style={{ height: '32px', objectFit: 'contain' }} />
                        <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '15px', letterSpacing: '0.5px' }}>Banesco</span>
                      </div>
                      <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px' }}>Activo</span>
                    </div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ backgroundColor: tema.card, borderRadius: '10px', border: `1px solid ${tema.border}`, overflow: 'hidden' }}>
                        <div style={{ padding: '10px 14px', backgroundColor: 'rgba(2, 132, 199, 0.1)', borderBottom: `1px solid ${tema.border}`, fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase' }}>
                          CLIENTES BANESCO (CONSOLIDADO MENSUAL)
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {listaMeses.map((mKey) => {
                            const itemMes = mesesData[mKey] || {};
                            const cdItem = itemMes.cobranzasDetalle || {};
                            const cantClientes = Number(cdItem.clientesCobradosBanescoVentas ?? 0);
                            const nombreM = obtenerNombreMes(mKey);
                            const esActual = mKey === mesActual;

                            return (
                              <div key={mKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: `1px solid ${tema.border}`, backgroundColor: esActual ? (temaOscuro ? 'rgba(2, 132, 199, 0.3)' : 'rgba(2, 132, 199, 0.08)') : 'transparent' }}>
                                <span style={{ fontSize: '12px', fontWeight: esActual ? 'bold' : 'normal', color: esActual ? '#0284c7' : tema.texto }}>
                                  {nombreM.toUpperCase()} {esActual && '⭐'}
                                </span>
                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: esActual ? '#0284c7' : tema.texto }}>
                                  {formatearNumero(cantClientes)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div style={{ backgroundColor: tema.card, padding: '14px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '10px', color: tema.subtexto, textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: 'bold' }}>MONTO BANESCO (BSF) - {obtenerNombreMes(mesActual).toUpperCase()}</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                          BsF {formatearNumero(data.cobranzasDetalle?.montoCobradoBanescoVentas ?? 0)}
                        </span>
                      </div>

                      <div style={{ backgroundColor: tema.card, padding: '12px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: tema.texto, display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>📈 EVOLUCIÓN MONTOS (BSF) POR MES</span>
                        <div style={{ height: '170px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataEvolucionMontosBanesco} margin={{ top: 18, right: 5, left: -20, bottom: 0 }}>
                              <XAxis dataKey="mes" stroke={tema.subtexto} fontSize={10} />
                              <YAxis stroke={tema.subtexto} fontSize={10} />
                              <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '11px' }} />
                              <Bar dataKey="Monto" fill="#ef4444" radius={[4, 4, 0, 0]} name="Monto BsF">
                                <LabelList dataKey="Monto" position="top" fill={tema.texto} fontSize={9} fontWeight="bold" formatter={(val) => formatearNumero(val)} />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BANFANB */}
                  <div style={{ backgroundColor: tema.bg, borderRadius: '14px', border: `1px solid ${tema.border}`, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <div style={{ background: 'linear-gradient(135deg, #ca8a04, #eab308)', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src="/LogoBANFANB.png" alt="BANFANB" style={{ height: '32px', objectFit: 'contain' }} />
                        <span style={{ color: '#0f172a', fontWeight: 'bold', fontSize: '15px', letterSpacing: '0.5px' }}>BANFANB</span>
                      </div>
                      <span style={{ backgroundColor: 'rgba(15,23,42,0.2)', color: '#0f172a', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '20px' }}>Activo</span>
                    </div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ backgroundColor: tema.card, borderRadius: '10px', border: `1px solid ${tema.border}`, overflow: 'hidden' }}>
                        <div style={{ padding: '10px 14px', backgroundColor: 'rgba(234, 179, 8, 0.1)', borderBottom: `1px solid ${tema.border}`, fontSize: '11px', fontWeight: 'bold', color: '#eab308', textTransform: 'uppercase' }}>
                          CLIENTES BANFANB (CONSOLIDADO MENSUAL)
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {listaMeses.map((mKey) => {
                            const itemMes = mesesData[mKey] || {};
                            const cdItem = itemMes.cobranzasDetalle || {};
                            const cantClientes = Number(cdItem.clientesCobradosBanfanbVentas ?? 0);
                            const nombreM = obtenerNombreMes(mKey);
                            const esActual = mKey === mesActual;

                            return (
                              <div key={mKey} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: `1px solid ${tema.border}`, backgroundColor: esActual ? (temaOscuro ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.1)') : 'transparent' }}>
                                <span style={{ fontSize: '12px', fontWeight: esActual ? 'bold' : 'normal', color: esActual ? '#eab308' : tema.texto }}>
                                  {nombreM.toUpperCase()} {esActual && '⭐'}
                                </span>
                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: esActual ? '#eab308' : tema.texto }}>
                                  {formatearNumero(cantClientes)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div style={{ backgroundColor: tema.card, padding: '14px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '10px', color: tema.subtexto, textTransform: 'uppercase', display: 'block', marginBottom: '2px', fontWeight: 'bold' }}>MONTO BANFANB (BSF) - {obtenerNombreMes(mesActual).toUpperCase()}</span>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981' }}>
                          BsF {formatearNumero(data.cobranzasDetalle?.montoCobradoBanfanbVentas ?? 0)}
                        </span>
                      </div>

                      <div style={{ backgroundColor: tema.card, padding: '12px', borderRadius: '10px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: tema.texto, display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>📈 EVOLUCIÓN MONTOS (BSF) POR MES</span>
                        <div style={{ height: '170px', width: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataEvolucionMontosBanfanb} margin={{ top: 18, right: 5, left: -20, bottom: 0 }}>
                              <XAxis dataKey="mes" stroke={tema.subtexto} fontSize={10} />
                              <YAxis stroke={tema.subtexto} fontSize={10} />
                              <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '11px' }} />
                              <Bar dataKey="Monto" fill="#eab308" radius={[4, 4, 0, 0]} name="Monto BsF">
                                <LabelList dataKey="Monto" position="top" fill={tema.texto} fontSize={9} fontWeight="bold" formatter={(val) => formatearNumero(val)} />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* 2. SECCIÓN MARKETING */}
          {subCategoria === "marketing" && (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: `1px solid ${tema.border}`, paddingBottom: '12px' }}>
                  <img src="/logo2.png" alt="Logo 2" style={{ height: '30px', objectFit: 'contain' }} />
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: tema.texto, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users style={{ width: '18px', height: '18px', color: '#1e3a8a' }} /> Comportamiento Operativo por Mes - Marketing
                    </h2>
                    <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguros Horizonte, S.A.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  {listaMeses.map((mes) => {
                    const m = mesesData[mes]?.marketing || { importe: 0, alcances: 0, mensajes: 0 };
                    const esActivo = mes === mesActual;
                    return (
                      <div 
                        key={mes} 
                        onClick={() => setMesActual(mes)}
                        style={{ 
                          backgroundColor: esActivo ? (temaOscuro ? '#334155' : '#f1f5f9') : tema.bg, 
                          borderRadius: '12px', 
                          padding: '16px', 
                          border: esActivo ? '2px solid #1e3a8a' : `1px solid ${tema.border}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: esActivo ? '0 4px 12px rgba(30, 58, 138, 0.2)' : 'none'
                        }}
                      >
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px', color: '#1e3a8a', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                          {obtenerNombreMes(mes)} {esActivo && '⭐'}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                          <div style={{ backgroundColor: '#1e3a8a', padding: '8px 4px', borderRadius: '8px', color: '#fff' }}>
                            <div style={{ fontSize: '10px', color: '#93c5fd', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}><DollarSignIcon style={{ width: '12px', height: '12px' }} /></div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>${formatearNumero(m.importe)}</span>
                          </div>
                          <div style={{ backgroundColor: '#eab308', padding: '8px 4px', borderRadius: '8px', color: '#0f172a' }}>
                            <div style={{ fontSize: '10px', color: '#0f172a', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}><Share2 style={{ width: '12px', height: '12px' }} /></div>
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

              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: tema.texto, textAlign: 'center', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>
                  SEGUIMIENTO MARKETING
                </h3>
                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${tema.border}`, color: tema.subtexto }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>MES</th>
                        <th style={{ padding: '10px' }}>IMPORTE TOTAL</th>
                        <th style={{ padding: '10px' }}>ALCANCE</th>
                        <th style={{ padding: '10px' }}>MENSAJES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaMeses.map((mes) => {
                        const m = mesesData[mes]?.marketing || { importe: 0, alcances: 0, mensajes: 0 };
                        return (
                          <tr key={mes} onClick={() => setMesActual(mes)} style={{ cursor: 'pointer', borderBottom: `1px solid ${tema.border}`, backgroundColor: mes === mesActual ? (temaOscuro ? 'rgba(30, 58, 138, 0.25)' : 'rgba(30, 58, 138, 0.08)') : 'transparent' }}>
                            <td style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 'bold', color: mes === mesActual ? '#eab308' : tema.texto }}>{obtenerNombreMes(mes).toUpperCase()} {mes === mesActual && '⭐'}</td>
                            <td style={{ padding: '12px 10px', fontWeight: '600' }}>${formatearNumero(m.importe)} $</td>
                            <td style={{ padding: '12px 10px' }}>{formatearNumero(m.alcances)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{formatearNumero(m.mensajes)}</td>
                          </tr>
                        );
                      })}
                      <tr style={{ borderTop: `2px solid ${tema.border}`, fontWeight: 'bold', backgroundColor: tema.bg }}>
                        <td style={{ padding: '14px 10px', textAlign: 'left', color: '#1e3a8a' }}>TOTAL ACUMULADO</td>
                        <td style={{ padding: '14px 10px', color: '#3b82f6' }}>${formatearNumero(totalImporteMarketing)} $</td>
                        <td style={{ padding: '14px 10px', color: '#eab308' }}>{formatearNumero(totalAlcanceMarketing)}</td>
                        <td style={{ padding: '14px 10px', color: '#10b981' }}>{formatearNumero(totalMensajesMarketing)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. SECCIÓN COBRANZAS */}
          {subCategoria === "cobranzas" && (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: `1px solid ${tema.border}`, paddingBottom: '12px' }}>
                  <img src="/logo2.png" alt="Logo 2" style={{ height: '30px', objectFit: 'contain' }} />
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: tema.texto, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard style={{ width: '18px', height: '18px', color: '#1e3a8a' }} /> Comportamiento de Recaudación Mensual - Cobranzas
                    </h2>
                    <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguros Horizonte, S.A.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '10px' }}>
                  {listaMeses.map((mes) => {
                    const itemMes = mesesData[mes] || {};
                    const cd = itemMes.cobranzasDetalle || {};
                    const recaudacionMesVal = Number(cd.recaudacionMensual ?? 0);
                    const clientesCobradosVal = Number(cd.clientesCobradosMes ?? 0);
                    const esActivo = mes === mesActual;
                    return (
                      <div 
                        key={mes} 
                        onClick={() => setMesActual(mes)}
                        style={{ 
                          backgroundColor: esActivo ? (temaOscuro ? '#334155' : '#f1f5f9') : tema.bg, 
                          borderRadius: '12px', 
                          padding: '16px', 
                          border: esActivo ? '2px solid #1e3a8a' : `1px solid ${tema.border}`,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: esActivo ? '0 4px 12px rgba(30, 58, 138, 0.2)' : 'none'
                        }}
                      >
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px', color: '#1e3a8a', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                          {obtenerNombreMes(mes)} {esActivo && '⭐'}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', textAlign: 'center' }}>
                          <div style={{ backgroundColor: '#1e3a8a', padding: '8px 6px', borderRadius: '8px', color: '#fff' }}>
                            <div style={{ fontSize: '10px', color: '#93c5fd', marginBottom: '2px' }}>RECAUDACIÓN MENSUAL</div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{formatearNumero(recaudacionMesVal)}</span>
                          </div>
                          
                          <div style={{ backgroundColor: tema.card, padding: '6px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                            <div style={{ fontSize: '9px', color: tema.subtexto, marginBottom: '2px', textTransform: 'uppercase' }}>CLIENTES COBRADOS</div>
                            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981' }}>{formatearNumero(clientesCobradosVal)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SEGUIMIENTO DE RENOVACIONES */}
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: `1px solid ${tema.border}`, paddingBottom: '12px' }}>
                  <RefreshIcon style={{ width: '18px', height: '18px', color: '#eab308' }} />
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto, margin: 0 }}>
                      Seguimiento de Renovaciones ({obtenerNombreMes(mesActual)})
                    </h3>
                    <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Control general de cartera y comportamiento por meses</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ backgroundColor: tema.bg, borderRadius: '12px', padding: '16px', border: `1px solid ${tema.border}`, borderLeft: '4px solid #3b82f6' }}>
                    <span style={{ fontSize: '11px', color: tema.subtexto, textTransform: 'uppercase', fontWeight: 'bold' }}>Clientes Renovaciones</span>
                    <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: tema.texto, margin: '6px 0 0 0' }}>{formatearNumero(clientesRenovaciones)}</h4>
                  </div>
                  <div style={{ backgroundColor: tema.bg, borderRadius: '12px', padding: '16px', border: `1px solid ${tema.border}`, borderLeft: '4px solid #f59e0b' }}>
                    <span style={{ fontSize: '11px', color: tema.subtexto, textTransform: 'uppercase', fontWeight: 'bold' }}>Renovaciones Pendientes</span>
                    <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: '#f59e0b', margin: '6px 0 0 0' }}>{formatearNumero(renovacionesPendientes)}</h4>
                  </div>
                  <div style={{ backgroundColor: tema.bg, borderRadius: '12px', padding: '16px', border: `1px solid ${tema.border}`, borderLeft: '4px solid #10b981' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: tema.subtexto, textTransform: 'uppercase', fontWeight: 'bold' }}>Renovaciones Cobradas</span>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '10px' }}>
                        Impacto: {porcentajeImpactoRenovaciones}%
                      </span>
                    </div>
                    <h4 style={{ fontSize: '22px', fontWeight: 'bold', color: '#10b981', margin: '6px 0 0 0' }}>{formatearNumero(renovacionesCobradas)}</h4>
                  </div>
                </div>

                <div style={{ backgroundColor: tema.bg, padding: '14px', borderRadius: '12px', border: `1px solid ${tema.border}`, marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', color: tema.texto, margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    📊 Comportamiento General de Renovaciones por Mes
                  </h4>
                  <div style={{ height: '220px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dataGraficoRenovacionesGeneral} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                        <XAxis dataKey="mes" stroke={tema.subtexto} fontSize={11} />
                        <YAxis stroke={tema.subtexto} fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                        <Bar dataKey="Total Clientes" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Clientes">
                          <LabelList dataKey="Total Clientes" position="top" fill={tema.texto} fontSize={10} fontWeight="bold" />
                        </Bar>
                        <Bar dataKey="Pendientes" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pendientes">
                          <LabelList dataKey="Pendientes" position="top" fill={tema.texto} fontSize={10} fontWeight="bold" />
                        </Bar>
                        <Bar dataKey="Cobradas" fill="#10b981" radius={[4, 4, 0, 0]} name="Cobradas">
                          <LabelList dataKey="Cobradas" position="top" fill={tema.texto} fontSize={10} fontWeight="bold" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ backgroundColor: tema.iaBg, border: `1px solid ${tema.iaBorder}`, borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Sparkles style={{ width: '16px', height: '16px', color: tema.iaTexto, flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '12px', color: tema.texto, margin: 0, lineHeight: '1.4' }}>
                    <strong>Observación Inteligente de Renovaciones:</strong> El mes de <strong>{obtenerNombreMes(mesActual)}</strong> registra un impacto de renovación del <strong>{porcentajeImpactoRenovaciones}%</strong> con {formatearNumero(renovacionesCobradas)} pólizas efectivas cobradas. Se sugiere acelerar gestiones sobre los {formatearNumero(renovacionesPendientes)} casos pendientes para maximizar la retención de cartera.
                  </p>
                </div>
              </div>

              {/* SEGUIMIENTO DE COBRANZA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.card, padding: '16px 20px', borderRadius: '12px', border: `1px solid ${tema.border}`, flexWrap: 'wrap', gap: '10px' }}>
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
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>{formatearNumero(cobD.recaudacionMensual)}</span>
                </div>
              </div>

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
                      <span style={{ fontSize: '12px', color: tema.subtexto }}><AlertCircle style={{ width: '13px', height: '13px', color: '#eab308', display: 'inline' }} /> Mora 1 Mes</span>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#eab308' }}>{formatearNumero(mora1Mes)}</span>
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
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#eab308' }}>Clientes Mora Temprana 1 - 2 - 3 Cuotas ({obtenerNombreMes(mesActual)})</span>
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
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e3a8a' }}>{formatearNumero(compromiso123Actual)}</span>
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: tema.bg, padding: '12px', borderRadius: '8px', borderLeft: '4px solid #eab308' }}>
                    <div>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#eab308', textTransform: 'uppercase' }}>Clientes Cobrados BANFANB</span>
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
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 10px 0' }}>BANCO PLAZA</h4>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', width: '100%', borderTop: `1px solid ${tema.border}`, borderBottom: `1px solid ${tema.border}`, padding: '10px 0', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Clientes Cobrados</span>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                        {montoPlazaActual > 0 ? formatearNumero(Math.round(montoPlazaActual / 5818)) : 0}
                      </p>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: tema.subtexto }}>Monto Total</span>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>BsF {formatearNumero(montoPlazaActual)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. SECCIÓN ASESORES CON DESGLOSE POR BANCO EXACTO Y SIN ESPACIOS VACÍOS */}
          {subCategoria === "asesores" && (
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #0f172a)', borderRadius: '12px', padding: '18px', color: '#fff', borderLeft: '4px solid #3b82f6' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, color: '#93c5fd' }}>Asesores Evaluados ({obtenerNombreMes(mesActual)})</p>
                  <h3 style={{ fontSize: '26px', fontWeight: 'bold', margin: '6px 0 0 0' }}>{rankingFiltrado.length}</h3>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #0f172a)', borderRadius: '12px', padding: '18px', color: '#fff', borderLeft: '4px solid #eab308' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, color: '#93c5fd' }}>Ventas del Mes ({obtenerNombreMes(mesActual)})</p>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '6px 0 0 0' }}>
                    {formatearNumero(rankingFiltrado.reduce((acc, a) => acc + Number(a.ventas || 0), 0))}
                  </h3>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #0f172a)', borderRadius: '12px', padding: '18px', color: '#fff', borderLeft: '4px solid #10b981' }}>
                  <p style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', margin: 0, color: '#93c5fd' }}>Ventas Cobradas ({obtenerNombreMes(mesActual)})</p>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '6px 0 0 0' }}>
                    {formatearNumero(rankingFiltrado.reduce((acc, a) => acc + Number(a.cobradas || 0), 0))}
                  </h3>
                </div>
              </div>

              {/* TABLA PRINCIPAL DE ASESORES: COBROS POR BANCO EXACTOS DESDE EL SHEET */}
              <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: `1px solid ${tema.border}`, paddingBottom: '12px' }}>
                  <Award style={{ width: '20px', height: '20px', color: '#eab308' }} />
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: tema.texto, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      VENTAS COBRADAS POR ASESOR Y BANCO ({obtenerNombreMes(mesActual).toUpperCase()})
                    </h3>
                    <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Valores exactos leídos directamente de las columnas G (Plaza), H (Banesco) e I (BANFANB)</p>
                  </div>
                </div>

                <div style={{ overflowX: 'auto', width: '100%' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ borderBottom: `2px solid ${tema.border}`, color: tema.subtexto }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>ASESOR DELEGADO</th>
                        <th style={{ padding: '10px' }}>VENTAS</th>
                        <th style={{ padding: '10px', color: '#eab308' }}>TOTAL COBRADAS</th>
                        <th style={{ padding: '10px', color: '#3b82f6' }}>COBRADA PLAZA</th>
                        <th style={{ padding: '10px', color: '#0284c7' }}>COBRADA BANESCO</th>
                        <th style={{ padding: '10px', color: '#eab308' }}>COBRADA BANFANB</th>
                        <th style={{ padding: '10px', color: '#10b981' }}>% COBRO</th>
                        <th style={{ padding: '10px' }}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankingFiltrado.length === 0 ? (
                        <tr>
                          <td colSpan={8} style={{ padding: '20px', color: tema.subtexto }}>No hay registros disponibles para {obtenerNombreMes(mesActual)}.</td>
                        </tr>
                      ) : (
                        rankingFiltrado.map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: `1px solid ${tema.border}`, backgroundColor: idx % 2 === 0 ? 'transparent' : (temaOscuro ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)') }}>
                            <td style={{ padding: '12px 10px', textAlign: 'left', fontWeight: 'bold', color: tema.texto }}>{item.asesor}</td>
                            <td style={{ padding: '12px 10px', fontWeight: '600' }}>{formatearNumero(item.ventas)}</td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#eab308', backgroundColor: temaOscuro ? 'rgba(234, 179, 8, 0.08)' : 'rgba(234, 179, 8, 0.05)' }}>
                              {formatearNumero(item.cobradas)}
                            </td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#3b82f6' }}>
                              {Number(item.plaza) > 0 ? formatearNumero(item.plaza) : '-'}
                            </td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#0284c7' }}>
                              {Number(item.banesco) > 0 ? formatearNumero(item.banesco) : '-'}
                            </td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#eab308' }}>
                              {Number(item.banfanb) > 0 ? formatearNumero(item.banfanb) : '-'}
                            </td>
                            <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#10b981' }}>{item.pct}</td>
                            <td style={{ padding: '12px 10px' }}>
                              <span style={{ 
                                padding: '4px 10px', 
                                borderRadius: '12px', 
                                fontSize: '10px', 
                                fontWeight: 'bold',
                                backgroundColor: item.status === 'Activo' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                color: item.status === 'Activo' ? '#10b981' : '#ef4444',
                                border: item.status === 'Activo' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                              }}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BLOQUE DE RESUMEN CONSOLIDADO MENSUAL Y EVOLUCIÓN (SIN ESPACIO VACÍO) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
                
                {/* TARJETA IZQUIERDA: RESUMEN MENSUAL CON TOTALES Y REPARTO BANCARIO QUE LLENAN EL VACÍO */}
                <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '20px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: `1px solid ${tema.border}`, paddingBottom: '12px' }}>
                      <BarChart3 style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                      <div>
                        <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: tema.texto, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          RESUMEN CONSOLIDADO MENSUAL
                        </h3>
                        <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Histórico mensual oficial (Columnas L a O del Google Sheet)</p>
                      </div>
                    </div>

                    <div style={{ overflowX: 'auto', width: '100%' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '12px' }}>
                        <thead>
                          <tr style={{ borderBottom: `2px solid ${tema.border}`, color: tema.subtexto }}>
                            <th style={{ padding: '8px', textAlign: 'left' }}>MES</th>
                            <th style={{ padding: '8px' }}>CANTIDAD VENTAS</th>
                            <th style={{ padding: '8px' }}>VENTAS COBRADAS</th>
                            <th style={{ padding: '8px', color: '#10b981' }}>% COBRO</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(asesoresData.resumen || []).map((item, idx) => {
                            const esActivoMes = String(item.mes).toLowerCase() === obtenerNombreMes(mesActual).toLowerCase();
                            return (
                              <tr key={idx} style={{ 
                                borderBottom: `1px solid ${tema.border}`, 
                                backgroundColor: esActivoMes ? (temaOscuro ? 'rgba(30, 58, 138, 0.25)' : 'rgba(30, 58, 138, 0.06)') : 'transparent'
                              }}>
                                <td style={{ padding: '9px 8px', textAlign: 'left', fontWeight: 'bold', color: esActivoMes ? '#eab308' : tema.texto }}>
                                  {String(item.mes).toUpperCase()} {esActivoMes && '⭐'}
                                </td>
                                <td style={{ padding: '9px 8px', fontWeight: '600' }}>{formatearNumero(item.ventas)}</td>
                                <td style={{ padding: '9px 8px', fontWeight: '600', color: '#eab308' }}>{formatearNumero(item.cobradas)}</td>
                                <td style={{ padding: '9px 8px', fontWeight: 'bold', color: '#10b981' }}>{item.pct}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* BLOQUE INFERIOR QUE ORGANIZA Y ELIMINA EL VACÍO DEL CONSOLIDADO */}
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: `1px solid ${tema.border}`, paddingTop: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
                      <div style={{ backgroundColor: tema.bg, padding: '10px 6px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '10px', color: tema.subtexto, textTransform: 'uppercase', display: 'block', fontWeight: 'bold' }}>Total Ventas</span>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto }}>{formatearNumero(totalVentasResumen)}</span>
                      </div>
                      <div style={{ backgroundColor: tema.bg, padding: '10px 6px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '10px', color: tema.subtexto, textTransform: 'uppercase', display: 'block', fontWeight: 'bold' }}>Total Cobradas</span>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#eab308' }}>{formatearNumero(totalCobradasResumen)}</span>
                      </div>
                      <div style={{ backgroundColor: tema.bg, padding: '10px 6px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                        <span style={{ fontSize: '10px', color: tema.subtexto, textTransform: 'uppercase', display: 'block', fontWeight: 'bold' }}>Efectividad</span>
                        <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#10b981' }}>{efectividadGlobalResumen}</span>
                      </div>
                    </div>

                    <div style={{ backgroundColor: tema.bg, borderRadius: '8px', padding: '12px', border: `1px solid ${tema.border}` }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: tema.texto, display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        💳 Resumen Cobrado por Canales Bancarios ({obtenerNombreMes(mesActual)})
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '6px', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                          <span style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', display: 'block' }}>PLAZA</span>
                          <strong style={{ fontSize: '13px', color: '#3b82f6' }}>{formatearNumero(totalPlazaMes)}</strong>
                        </div>
                        <div style={{ backgroundColor: 'rgba(2, 132, 199, 0.1)', padding: '6px', borderRadius: '6px', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
                          <span style={{ fontSize: '10px', color: '#0284c7', fontWeight: 'bold', display: 'block' }}>BANESCO</span>
                          <strong style={{ fontSize: '13px', color: '#0284c7' }}>{formatearNumero(totalBanescoMes)}</strong>
                        </div>
                        <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', padding: '6px', borderRadius: '6px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                          <span style={{ fontSize: '10px', color: '#eab308', fontWeight: 'bold', display: 'block' }}>BANFANB</span>
                          <strong style={{ fontSize: '13px', color: '#eab308' }}>{formatearNumero(totalBanfanbMes)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TARJETA DERECHA: EVOLUCIÓN HISTÓRICA DEL DESEMPEÑO POR ASESOR */}
                <div style={{ backgroundColor: tema.card, borderRadius: '16px', padding: '24px', border: `1px solid ${tema.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', borderBottom: `1px solid ${tema.border}`, paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <TrendingUp style={{ width: '22px', height: '22px', color: '#10b981' }} />
                      <div>
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: tema.texto, margin: 0 }}>
                          Evolución Mensual del Desempeño por Asesor
                        </h3>
                        <p style={{ fontSize: '11px', color: tema.subtexto, margin: '2px 0 0 0' }}>Seguimiento histórico comparativo de ventas vs cobranza (Julio - Octubre)</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <label style={{ fontSize: '12px', fontWeight: 'bold', color: tema.subtexto }}>Filtrar Asesor:</label>
                      <select 
                        value={asesorSeleccionado} 
                        onChange={(e) => setAsesorSeleccionado(e.target.value)}
                        style={{ 
                          backgroundColor: tema.bg, 
                          color: tema.texto, 
                          border: `1px solid ${tema.border}`, 
                          padding: '6px 12px', 
                          borderRadius: '8px', 
                          fontSize: '12px', 
                          fontWeight: 'bold',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="TODOS">📊 CONSOLIDADO GENERAL (TODOS)</option>
                        {listaAsesoresUnicos.map((nombre, i) => (
                          <option key={i} value={nombre}>👤 {nombre}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'center' }}>
                    <div style={{ height: '240px', width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dataEvolucionAsesores} margin={{ top: 20, right: 10, left: -10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={tema.border} />
                          <XAxis dataKey="mes" stroke={tema.subtexto} fontSize={11} fontWeight="bold" />
                          <YAxis stroke={tema.subtexto} fontSize={11} />
                          <Tooltip contentStyle={{ backgroundColor: tema.card, borderColor: tema.border, borderRadius: '8px', color: tema.texto, fontSize: '12px' }} />
                          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                          <Bar dataKey="Ventas Generadas" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Ventas Generadas">
                            <LabelList dataKey="Ventas Generadas" position="top" fill={tema.texto} fontSize={10} fontWeight="bold" />
                          </Bar>
                          <Bar dataKey="Ventas Cobradas" fill="#eab308" radius={[4, 4, 0, 0]} name="Ventas Cobradas">
                            <LabelList dataKey="Ventas Cobradas" position="top" fill={tema.texto} fontSize={10} fontWeight="bold" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div style={{ backgroundColor: tema.bg, padding: '16px', borderRadius: '12px', border: `1px solid ${tema.border}`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Métricas Acumuladas ({asesorSeleccionado})
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ backgroundColor: tema.card, padding: '10px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                          <span style={{ fontSize: '10px', color: tema.subtexto }}>Total Ventas</span>
                          <p style={{ fontSize: '17px', fontWeight: 'bold', margin: '2px 0 0 0', color: tema.texto }}>
                            {formatearNumero(dataEvolucionAsesores.reduce((acc, d) => acc + d["Ventas Generadas"], 0))}
                          </p>
                        </div>

                        <div style={{ backgroundColor: tema.card, padding: '10px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                          <span style={{ fontSize: '10px', color: tema.subtexto }}>Total Cobradas</span>
                          <p style={{ fontSize: '17px', fontWeight: 'bold', margin: '2px 0 0 0', color: '#eab308' }}>
                            {formatearNumero(dataEvolucionAsesores.reduce((acc, d) => acc + d["Ventas Cobradas"], 0))}
                          </p>
                        </div>
                      </div>

                      <div style={{ backgroundColor: tema.card, padding: '10px', borderRadius: '8px', border: `1px solid ${tema.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: tema.subtexto, fontWeight: 'bold' }}>Efectividad Promedio Cobro</span>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>
                            {(() => {
                              const tv = dataEvolucionAsesores.reduce((acc, d) => acc + d["Ventas Generadas"], 0);
                              const tc = dataEvolucionAsesores.reduce((acc, d) => acc + d["Ventas Cobradas"], 0);
                              return tv > 0 ? ((tc / tv) * 100).toFixed(1) + '%' : '0%';
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                    <div style={{ backgroundColor: tema.iaBg, border: `1px solid ${tema.iaBorder}`, borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tema.iaTexto, fontWeight: 'bold', fontSize: '12px' }}>
                        <Sparkles style={{ width: '16px', height: '16px' }} />
                        Observación Inteligente de Desempeño
                      </div>
                      <p style={{ fontSize: '11px', color: tema.texto, margin: 0, lineHeight: '1.4' }}>
                        {asesorSeleccionado === "TODOS" ? (
                          <>El equipo comercial mantiene un crecimiento continuo en volumen de ventas desde Julio (242) hasta Octubre (305). Sin embargo, la tasa de cobro efectivo presentó una desaceleración gradual del 85,12% en Julio al 41,64% en Octubre, indicando la necesidad de reforzar la cobranza al cierre de las pólizas expedidas.</>
                        ) : (
                          <>El seguimiento de <strong>{asesorSeleccionado}</strong> registra una contribución constante en la fuerza comercial. Se evidencia mayor conversión de cobranza durante las primeras semanas post-emisión. Mantener un control de cierres asistidos permitirá estabilizar su efectividad por encima del 65% promedio.</>
                        )}
                      </p>
                    </div>

                    <div style={{ backgroundColor: tema.bg, border: `1px solid ${tema.border}`, borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#eab308', fontWeight: 'bold', fontSize: '12px' }}>
                        <Target style={{ width: '16px', height: '16px', color: '#eab308' }} />
                        Acciones Estratégicas a Tomar
                      </div>
                      
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: tema.texto, display: 'flex', flexDirection: 'column', gap: '5px', lineHeight: '1.3' }}>
                        <li>
                          <strong>Cobranza Temprana en Quincena:</strong> Sincronizar el cobro de la primera cuota inmediatamente tras la emisión (Día 1 al 15).
                        </li>
                        <li>
                          <strong>Incentivos por Recaudación:</strong> Condicionar bonos a una efectividad de recaudación superior al 70%.
                        </li>
                        <li>
                          <strong>Reasignación Operativa:</strong> Trasladar casos sin gestión tras 30 días a cobranza especializada.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* ANÁLISIS INTELIGENTE INFERIOR */}
        <div style={{ marginTop: '30px', backgroundColor: tema.iaBg, border: `1px solid ${tema.iaBorder}`, borderRadius: '14px', padding: '18px 22px', display: 'flex', alignItems: 'flex-start', gap: '14px', boxSizing: 'border-box' }}>
          <Sparkles style={{ width: '22px', height: '22px', color: tema.iaTexto, flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: tema.iaTexto, margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Análisis Inteligente - BI Seguros Horizonte ({obtenerNombreMes(mesActual)})
            </h4>
            <p style={{ fontSize: '12px', color: tema.texto, margin: 0, lineHeight: '1.5' }}>
              El comportamiento operativo del mes de <strong>{obtenerNombreMes(mesActual)}</strong> muestra estabilidad en los canales de recaudación y gestión de cartera. Se recomienda enfocar los esfuerzos de cobranza temprana en las quincenas clave para optimizar la recuperación de cuotas pendientes y mantener la solvencia general de la cartera.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ backgroundColor: temaOscuro ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)', color: '#fbbf24', padding: '16px 20px', textAlign: 'center', borderTop: `1px solid ${tema.border}`, marginTop: '40px', fontSize: '11px', lineHeight: '1.6', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ fontWeight: 'bold', letterSpacing: '0.5px' }}>
          RIF: J-504900826 | CONSORCIO BIARTE, C.A.
        </div>
        <div style={{ color: tema.subtexto, fontSize: '11px' }}>
          <strong>Dirección:</strong> Av Casanova, CC El Recreo, nivel 9, of 9A, Urb El Recreo, Caracas, Distrito Capital, zona postal 1050
        </div>
        <div>
          <strong style={{ color: '#fbbf24' }}>WhatsApp:</strong> <span style={{ color: tema.texto }}>(+58) 426-5101583</span>
        </div>
        <div style={{ fontWeight: 'bold', letterSpacing: '1px', marginTop: '4px', color: '#fbbf24' }}>
          DEPARTAMENTO DE BUSINESS INTELLIGENCE 2026
        </div>
      </footer>
    </div>
  );
}