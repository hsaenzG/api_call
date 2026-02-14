import { useState } from 'react';
import './App.css';

const POTTER_API = 'https://potterapi-fedeperin.vercel.app/es';

// Componente de flujo reutilizable
function FlujoVisualizacion({ flujo, visible }) {
  if (!visible) return null;

  return (
    <div className="flow-wrapper-inline">
      <h3 style={{ color: '#ffd700', textAlign: 'center', marginBottom: '15px', fontSize: '1rem', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
        📡 Flujo de la Petición
      </h3>
      <div className="flow-row">
        <div className={`flow-card-small ${flujo.frontend ? 'active' : ''}`}>
          <div className="flow-icon-small">💻</div>
          <div className="flow-title-small">Frontend</div>
          <div className="flow-content-small">{flujo.frontend || 'Esperando...'}</div>
        </div>
        
        <div className="flow-arrow-small">→</div>
        
        <div className={`flow-card-small ${flujo.redRequest ? 'active' : ''}`}>
          <div className="flow-icon-small">📤</div>
          <div className="flow-title-small">Request</div>
          <div className="flow-content-small">
            {flujo.redRequest || 'Esperando...'}
          </div>
        </div>
        
        <div className="flow-arrow-small">→</div>
        
        <div className={`flow-card-small ${flujo.servidor ? 'active' : ''}`}>
          <div className="flow-icon-small">🖥️</div>
          <div className="flow-title-small">API Externa</div>
          <div className="flow-content-small">{flujo.servidor || 'Esperando...'}</div>
        </div>
      </div>
      
      <div className="flow-divider-small"></div>
      
      <div className="flow-row flow-row-reverse">
        <div className={`flow-card-small ${flujo.respuesta ? 'active' : ''}`}>
          <div className="flow-icon-small">💻</div>
          <div className="flow-title-small">Frontend</div>
          <div className="flow-content-small">{flujo.respuesta || 'Esperando...'}</div>
        </div>
        
        <div className="flow-arrow-small">←</div>
        
        <div className={`flow-card-small ${flujo.red && flujo.red.includes('←') ? 'active' : ''}`}>
          <div className="flow-icon-small">📥</div>
          <div className="flow-title-small">Response</div>
          <div className="flow-content-small">
            {flujo.red && flujo.red.includes('←') ? flujo.red : 'Esperando...'}
          </div>
        </div>
        
        <div className="flow-arrow-small">←</div>
        
        <div className={`flow-card-small ${flujo.red && flujo.red.includes('←') ? 'active' : ''}`}>
          <div className="flow-icon-small">🖥️</div>
          <div className="flow-title-small">API Externa</div>
          <div className="flow-content-small">
            {flujo.red && flujo.red.includes('←') ? '✅ Datos listos' : 'Esperando...'}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [personajeRandom, setPersonajeRandom] = useState(null);
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [personajeBuscado, setPersonajeBuscado] = useState(null);
  const [personaje1, setPersonaje1] = useState('');
  const [personaje2, setPersonaje2] = useState('');
  const [resultadoDuelo, setResultadoDuelo] = useState(null);
  const [hechizoRandom, setHechizoRandom] = useState(null);
  const [cargando, setCargando] = useState({});
  
  const [flujoRandom, setFlujoRandom] = useState({
    frontend: null, red: null, redRequest: null, servidor: null, respuesta: null
  });
  
  const [flujoBuscar, setFlujoBuscar] = useState({
    frontend: null, red: null, redRequest: null, servidor: null, respuesta: null
  });
  
  const [flujoDuelo, setFlujoDuelo] = useState({
    frontend: null, red: null, redRequest: null, servidor: null, respuesta: null
  });

  const [flujoHechizo, setFlujoHechizo] = useState({
    frontend: null, red: null, redRequest: null, servidor: null, respuesta: null
  });
  
  const [bgColor, setBgColor] = useState('linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%)');

  const cambiarColorFondo = () => {
    const colores = [
      'linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%)',
      'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #0d1b2a 100%)',
      'linear-gradient(135deg, #2d1b00 0%, #5c3d00 50%, #2d1b00 100%)',
      'linear-gradient(135deg, #1a0000 0%, #4d0000 50%, #1a0000 100%)',
      'linear-gradient(135deg, #001a1a 0%, #003333 50%, #001a1a 100%)',
      'linear-gradient(135deg, #1a001a 0%, #4d004d 50%, #1a001a 100%)'
    ];
    const random = colores[Math.floor(Math.random() * colores.length)];
    setBgColor(random);
  };

  const obtenerPersonajeRandom = async () => {
    setCargando(prev => ({ ...prev, random: true }));
    setFlujoRandom({ frontend: null, red: null, redRequest: null, servidor: null, respuesta: null });
    
    setFlujoRandom(prev => ({ ...prev, frontend: `📤 GET ${POTTER_API}/characters/random` }));
    await new Promise(r => setTimeout(r, 500));
    
    const requestText = `🌐 → Request\n\nGET ${POTTER_API}/characters/random\n\n(sin payload)`;
    setFlujoRandom(prev => ({ ...prev, red: requestText, redRequest: requestText }));
    await new Promise(r => setTimeout(r, 500));
    
    try {
      setFlujoRandom(prev => ({ ...prev, servidor: '🖥️ Consultando API de Harry Potter...' }));
      
      const response = await fetch(`${POTTER_API}/characters/random`);
      const data = await response.json();
      
      setFlujoRandom(prev => ({ ...prev, red: `🌐 ← Response\n\n${JSON.stringify(data, null, 2)}` }));
      await new Promise(r => setTimeout(r, 700));
      
      setFlujoRandom(prev => ({ ...prev, respuesta: '✅ Personaje recibido!' }));
      await new Promise(r => setTimeout(r, 500));
      
      setPersonajeRandom(data);
      cambiarColorFondo();
    } catch (error) {
      console.error('Error:', error);
      setFlujoRandom(prev => ({ ...prev, respuesta: '❌ Error en la petición' }));
    } finally {
      setCargando(prev => ({ ...prev, random: false }));
    }
  };

  const buscarPersonaje = async () => {
    if (!busquedaNombre.trim()) return;
    
    setCargando(prev => ({ ...prev, buscar: true }));
    setFlujoBuscar({ frontend: null, red: null, redRequest: null, servidor: null, respuesta: null });
    setPersonajeBuscado(null);
    
    setFlujoBuscar(prev => ({ ...prev, frontend: `📤 GET ${POTTER_API}/characters?search=${busquedaNombre}` }));
    await new Promise(r => setTimeout(r, 500));
    
    const requestText = `🌐 → Request\n\nGET ${POTTER_API}/characters?search=${busquedaNombre}\n\n(sin payload)`;
    setFlujoBuscar(prev => ({ ...prev, red: requestText, redRequest: requestText }));
    await new Promise(r => setTimeout(r, 500));
    
    try {
      setFlujoBuscar(prev => ({ ...prev, servidor: `🖥️ Buscando "${busquedaNombre}"...` }));
      
      const response = await fetch(`${POTTER_API}/characters?search=${encodeURIComponent(busquedaNombre)}`);
      const data = await response.json();
      
      setFlujoBuscar(prev => ({ ...prev, red: `🌐 ← Response\n\n${JSON.stringify(data, null, 2)}` }));
      await new Promise(r => setTimeout(r, 700));
      
      if (data && data.length > 0) {
        setFlujoBuscar(prev => ({ ...prev, respuesta: '✅ Búsqueda completada!' }));
        await new Promise(r => setTimeout(r, 500));
        setPersonajeBuscado(data[0]);
        cambiarColorFondo();
      } else {
        setFlujoBuscar(prev => ({ ...prev, respuesta: '❌ Personaje no encontrado' }));
      }
    } catch (error) {
      console.error('Error:', error);
      setFlujoBuscar(prev => ({ ...prev, respuesta: '❌ Error en la petición' }));
    } finally {
      setCargando(prev => ({ ...prev, buscar: false }));
    }
  };

  const obtenerHechizoRandom = async () => {
    setCargando(prev => ({ ...prev, hechizo: true }));
    setFlujoHechizo({ frontend: null, red: null, redRequest: null, servidor: null, respuesta: null });
    
    setFlujoHechizo(prev => ({ ...prev, frontend: `📤 GET ${POTTER_API}/spells/random` }));
    await new Promise(r => setTimeout(r, 500));
    
    const requestText = `🌐 → Request\n\nGET ${POTTER_API}/spells/random\n\n(sin payload)`;
    setFlujoHechizo(prev => ({ ...prev, red: requestText, redRequest: requestText }));
    await new Promise(r => setTimeout(r, 500));
    
    try {
      setFlujoHechizo(prev => ({ ...prev, servidor: '🖥️ Consultando hechizos...' }));
      
      const response = await fetch(`${POTTER_API}/spells/random`);
      const data = await response.json();
      
      setFlujoHechizo(prev => ({ ...prev, red: `🌐 ← Response\n\n${JSON.stringify(data, null, 2)}` }));
      await new Promise(r => setTimeout(r, 700));
      
      setFlujoHechizo(prev => ({ ...prev, respuesta: '✅ Hechizo recibido!' }));
      await new Promise(r => setTimeout(r, 500));
      
      setHechizoRandom(data);
      cambiarColorFondo();
    } catch (error) {
      console.error('Error:', error);
      setFlujoHechizo(prev => ({ ...prev, respuesta: '❌ Error en la petición' }));
    } finally {
      setCargando(prev => ({ ...prev, hechizo: false }));
    }
  };

  const iniciarDuelo = async () => { 
    if (!personaje1 || !personaje2) return;
    
    setCargando(prev => ({ ...prev, duelo: true }));
    setFlujoDuelo({ frontend: null, red: null, redRequest: null, servidor: null, respuesta: null });
    setResultadoDuelo(null);
    
    setFlujoDuelo(prev => ({ ...prev, frontend: `📤 GET ${POTTER_API}/characters (x2)` }));
    await new Promise(r => setTimeout(r, 500));
    
    const requestText = `🌐 → Request\n\nGET ${POTTER_API}/characters?index=${personaje1}\nGET ${POTTER_API}/characters?index=${personaje2}\n\n(sin payload)`;
    setFlujoDuelo(prev => ({ ...prev, red: requestText, redRequest: requestText }));
    await new Promise(r => setTimeout(r, 500));
    
    try {
      setFlujoDuelo(prev => ({ ...prev, servidor: '🖥️ ¡Calculando duelo mágico!' }));
      
      const [response1, response2] = await Promise.all([
        fetch(`${POTTER_API}/characters?index=${personaje1}`),
        fetch(`${POTTER_API}/characters?index=${personaje2}`)
      ]);
      
      const p1 = await response1.json();
      const p2 = await response2.json();
      
      const poder1 = p1.fullName ? p1.fullName.length * 10 : 50;
      const poder2 = p2.fullName ? p2.fullName.length * 10 : 50;
      
      const random1 = Math.floor(Math.random() * 50);
      const random2 = Math.floor(Math.random() * 50);
      
      const poderTotal1 = poder1 + random1;
      const poderTotal2 = poder2 + random2;
      
      const ganador = poderTotal1 > poderTotal2 ? p1 : (poderTotal2 > poderTotal1 ? p2 : null);
      
      const resultado = {
        personaje1: p1,
        personaje2: p2,
        ganador: ganador ? ganador.fullName : 'Empate',
        poderTotal1,
        poderTotal2,
        mensaje: ganador ? `¡${ganador.fullName} gana el duelo mágico!` : '¡Es un empate mágico!'
      };
      
      setFlujoDuelo(prev => ({ ...prev, red: `🌐 ← Response\n\n${JSON.stringify(resultado, null, 2)}` }));
      await new Promise(r => setTimeout(r, 700));
      
      setFlujoDuelo(prev => ({ ...prev, respuesta: '✅ ¡Duelo finalizado!' }));
      await new Promise(r => setTimeout(r, 500));
      
      setResultadoDuelo(resultado);
      cambiarColorFondo();
    } catch (error) {
      console.error('Error:', error);
      setFlujoDuelo(prev => ({ ...prev, respuesta: '❌ Error en el duelo' }));
    } finally {
      setCargando(prev => ({ ...prev, duelo: false }));
    }
  };

  return (
    <div className="app" style={{ background: bgColor }}>
      <h1>🪄 API de Harry Potter</h1>
      <p style={{ color: '#ffd700', textAlign: 'center', fontSize: '18px', marginTop: '-15px', marginBottom: '30px', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
        Base URL: <code style={{ background: 'rgba(255,215,0,0.2)', padding: '4px 12px', borderRadius: '6px', border: '1px solid rgba(255,215,0,0.3)' }}>{POTTER_API}</code>
      </p>
      
      <div className="card">
        <h2>GET /characters/random</h2>
        <button onClick={obtenerPersonajeRandom} disabled={cargando.random}>
          {cargando.random ? '⏳ Invocando...' : '✨ Personaje Aleatorio'}
        </button>
        {personajeRandom && (
          <div className="result personaje-card">
            {personajeRandom.image && <img src={personajeRandom.image} alt={personajeRandom.fullName} className="personaje-img" />}
            <h3>{personajeRandom.fullName}</h3>
            {personajeRandom.nickname && <p className="nickname">"{personajeRandom.nickname}"</p>}
            {personajeRandom.hogwartsHouse && <p className="casa">{personajeRandom.hogwartsHouse}</p>}
            {personajeRandom.interpretedBy && <p>Interpretado por: {personajeRandom.interpretedBy}</p>}
            {personajeRandom.birthdate && <p>Nacimiento: {personajeRandom.birthdate}</p>}
          </div>
        )}
        
        <FlujoVisualizacion 
          flujo={flujoRandom} 
          visible={flujoRandom.frontend !== null}
        />
      </div>

      <div className="card">
        <h2>GET /characters?search=:nombre</h2>
        <input
          type="text"
          value={busquedaNombre}
          onChange={(e) => setBusquedaNombre(e.target.value)}
          placeholder="Buscar personaje (ej: Harry)..."
          onKeyPress={(e) => e.key === 'Enter' && buscarPersonaje()}
        />
        <button onClick={buscarPersonaje} disabled={cargando.buscar || !busquedaNombre.trim()}>
          {cargando.buscar ? '⏳ Buscando...' : '🔮 Buscar'}
        </button>
        {personajeBuscado && (
          <div className="result personaje-card">
            {personajeBuscado.image && <img src={personajeBuscado.image} alt={personajeBuscado.fullName} className="personaje-img" />}
            <h3>{personajeBuscado.fullName}</h3>
            {personajeBuscado.nickname && <p className="nickname">"{personajeBuscado.nickname}"</p>}
            {personajeBuscado.hogwartsHouse && <p className="casa">{personajeBuscado.hogwartsHouse}</p>}
            {personajeBuscado.interpretedBy && <p>Interpretado por: {personajeBuscado.interpretedBy}</p>}
            {personajeBuscado.birthdate && <p>Nacimiento: {personajeBuscado.birthdate}</p>}
          </div>
        )}
        
        <FlujoVisualizacion 
          flujo={flujoBuscar} 
          visible={flujoBuscar.frontend !== null}
        />
      </div>

      <div className="card">
        <h2>GET /spells/random</h2>
        <button onClick={obtenerHechizoRandom} disabled={cargando.hechizo}>
          {cargando.hechizo ? '⏳ Conjurando...' : '⚡ Hechizo Aleatorio'}
        </button>
        {hechizoRandom && (
          <div className="result hechizo-card">
            <h3 className="hechizo-nombre">{hechizoRandom.spell}</h3>
            <p className="hechizo-uso">{hechizoRandom.use}</p>
          </div>
        )}
        
        <FlujoVisualizacion 
          flujo={flujoHechizo} 
          visible={flujoHechizo.frontend !== null}
        />
      </div>

      <div className="card">
        <h2>GET /characters (Duelo)</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <select value={personaje1} onChange={(e) => setPersonaje1(e.target.value)}>
            <option value="">Personaje 1</option>
            <option value="0">Harry Potter</option>
            <option value="1">Hermione Granger</option>
            <option value="2">Ron Weasley</option>
            <option value="3">Draco Malfoy</option>
            <option value="4">Albus Dumbledore</option>
            <option value="5">Severus Snape</option>
            <option value="10">Lord Voldemort</option>
            <option value="15">Sirius Black</option>
          </select>
          <span style={{ color: '#ffd700', fontSize: '24px', textShadow: '0 0 10px rgba(255, 215, 0, 0.8)' }}>⚡</span>
          <select value={personaje2} onChange={(e) => setPersonaje2(e.target.value)}>
            <option value="">Personaje 2</option>
            <option value="0">Harry Potter</option>
            <option value="1">Hermione Granger</option>
            <option value="2">Ron Weasley</option>
            <option value="3">Draco Malfoy</option>
            <option value="4">Albus Dumbledore</option>
            <option value="5">Severus Snape</option>
            <option value="10">Lord Voldemort</option>
            <option value="15">Sirius Black</option>
          </select>
        </div>
        <button onClick={iniciarDuelo} disabled={cargando.duelo || !personaje1 || !personaje2}>
          {cargando.duelo ? '⏳ Duelando...' : '⚡ Iniciar Duelo'}
        </button>
        {resultadoDuelo && (
          <div className="result duelo-result">
            <div className="duelo-personaje">
              {resultadoDuelo.personaje1.image && <img src={resultadoDuelo.personaje1.image} alt={resultadoDuelo.personaje1.fullName} className="duelo-img" />}
              <p className="personaje-nombre">{resultadoDuelo.personaje1.fullName}</p>
              <p>Poder Total: {resultadoDuelo.poderTotal1}</p>
            </div>
            <div className="duelo-vs">⚡VS⚡</div>
            <div className="duelo-personaje">
              {resultadoDuelo.personaje2.image && <img src={resultadoDuelo.personaje2.image} alt={resultadoDuelo.personaje2.fullName} className="duelo-img" />}
              <p className="personaje-nombre">{resultadoDuelo.personaje2.fullName}</p>
              <p>Poder Total: {resultadoDuelo.poderTotal2}</p>
            </div>
            <div className="duelo-ganador">
              <h3>🏆 {resultadoDuelo.mensaje}</h3>
            </div>
          </div>
        )}
        
        <FlujoVisualizacion 
          flujo={flujoDuelo} 
          visible={flujoDuelo.frontend !== null}
        />
      </div>
    </div>
  );
}

export default App;
