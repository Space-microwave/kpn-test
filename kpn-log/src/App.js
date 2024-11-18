// import React, { useState } from 'react';

// function App() {
//   const [klantVraag, setKlantVraag] = useState('');
//   const [klantProbleem, setKlantProbleem] = useState('');
//   const [oorzaak, setOorzaak] = useState('');
//   const [oplossing, setOplossing] = useState('');
//   const [klantActie, setKlantActie] = useState('');
//   const [logs, setLogs] = useState([]);

//   const handleAddLog = () => {
//     if (
//       klantVraag.trim() &&
//       klantProbleem.trim() &&
//       oorzaak.trim() &&
//       oplossing.trim() &&
//       klantActie.trim()
//     ) {
//       const newLog = {
//         vraag: klantVraag,
//         probleem: klantProbleem,
//         oorzaak: oorzaak,
//         oplossing: oplossing,
//         actie: klantActie,
//       };

//       setLogs([...logs, newLog]);

//       // Velden resetten
//       setKlantVraag('');
//       setKlantProbleem('');
//       setOorzaak('');
//       setOplossing('');
//       setKlantActie('');
//     } else {
//       alert('Vul alle velden in!');
//     }
//   };

//   const handleCopyLog = (log) => {
//     const logText = `
//       Klantvraag: ${log.vraag}
//       Klantprobleem: ${log.probleem}
//       Oorzaak: ${log.oorzaak}
//       Oplossing: ${log.oplossing}
//       Actie voor de klant: ${log.actie}
//     `;
//     navigator.clipboard.writeText(logText);
//     alert('Log gekopieerd naar het klembord!');
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>KPN Logsysteem</h1>

//       {/* Inputvelden */}
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           value={klantVraag}
//           onChange={(e) => setKlantVraag(e.target.value)}
//           placeholder="Klantvraag"
//           style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//         />
//         <input
//           type="text"
//           value={klantProbleem}
//           onChange={(e) => setKlantProbleem(e.target.value)}
//           placeholder="Klantprobleem"
//           style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//         />
//         <input
//           type="text"
//           value={oorzaak}
//           onChange={(e) => setOorzaak(e.target.value)}
//           placeholder="Oorzaak"
//           style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//         />
//         <input
//           type="text"
//           value={oplossing}
//           onChange={(e) => setOplossing(e.target.value)}
//           placeholder="Oplossing"
//           style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//         />
//         <input
//           type="text"
//           value={klantActie}
//           onChange={(e) => setKlantActie(e.target.value)}
//           placeholder="Wat moet de klant doen?"
//           style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
//         />
//         <button
//           onClick={handleAddLog}
//           style={{
//             padding: '10px 15px',
//             fontSize: '16px',
//             backgroundColor: '#0078d4',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer',
//           }}
//         >
//           Voeg log toe
//         </button>
//       </div>

//       {/* Logs weergeven */}
//       <div>
//         <h2>Ingevoerde Logs:</h2>
//         {logs.length > 0 ? (
//           logs.map((log, index) => (
//             <div
//               key={index}
//               style={{
//                 border: '1px solid #ddd',
//                 padding: '10px',
//                 marginBottom: '10px',
//                 borderRadius: '5px',
//               }}
//             >
//               <p>
//                 <strong>Klantvraag:</strong> {log.vraag}
//               </p>
//               <p>
//                 <strong>Klantprobleem:</strong> {log.probleem}
//               </p>
//               <p>
//                 <strong>Oorzaak:</strong> {log.oorzaak}
//               </p>
//               <p>
//                 <strong>Oplossing:</strong> {log.oplossing}
//               </p>
//               <p>
//                 <strong>Actie voor de klant:</strong> {log.actie}
//               </p>
//               <button
//                 onClick={() => handleCopyLog(log)}
//                 style={{
//                   padding: '5px 10px',
//                   fontSize: '14px',
//                   backgroundColor: '#28a745',
//                   color: 'white',
//                   border: 'none',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Kopieer log
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>Er zijn nog geen logs toegevoegd.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';

function App() {
  // State voor log-informatie
  const [klantVraag, setKlantVraag] = useState('');
  const [klantProbleem, setKlantProbleem] = useState('');
  const [oorzaak, setOorzaak] = useState('');
  const [oplossing, setOplossing] = useState('');
  const [klantActie, setKlantActie] = useState('');
  const [categorie, setCategorie] = useState('');
  const [prioriteit, setPrioriteit] = useState('');
  const [medewerker, setMedewerker] = useState('');
  const [logs, setLogs] = useState([]);
  const [zoekTerm, setZoekTerm] = useState('');

  // Haal logs op uit localStorage bij het laden van de pagina
  useEffect(() => {
    const opgeslagenLogs = JSON.parse(localStorage.getItem('logs')) || [];
    setLogs(opgeslagenLogs);
  }, []);

  // Sla logs op in localStorage wanneer de logs veranderen
  useEffect(() => {
    localStorage.setItem('logs', JSON.stringify(logs));
  }, [logs]);

  // Voeg een nieuwe log toe
  const handleAddLog = () => {
    if (
      klantVraag.trim() &&
      klantProbleem.trim() &&
      oorzaak.trim() &&
      oplossing.trim() &&
      klantActie.trim() &&
      categorie.trim() &&
      prioriteit.trim() &&
      medewerker.trim()
    ) {
      const timestamp = new Date().toLocaleString();
      const newLog = {
        vraag: klantVraag,
        probleem: klantProbleem,
        oorzaak: oorzaak,
        oplossing: oplossing,
        actie: klantActie,
        categorie,
        prioriteit,
        medewerker,
        tijd: timestamp,
      };

      setLogs([...logs, newLog]);

      // Velden resetten
      setKlantVraag('');
      setKlantProbleem('');
      setOorzaak('');
      setOplossing('');
      setKlantActie('');
      setCategorie('');
      setPrioriteit('');
      setMedewerker('');
    } else {
      alert('Vul alle velden in!');
    }
  };

  // Verwijder een log
  const handleDeleteLog = (index) => {
    const nieuweLogs = logs.filter((_, i) => i !== index);
    setLogs(nieuweLogs);
  };

  // Kopieer log naar klembord
  const handleCopyLog = (log) => {
    const logText = `
      Klantvraag: ${log.vraag}
      Klantprobleem: ${log.probleem}
      Oorzaak: ${log.oorzaak}
      Oplossing: ${log.oplossing}
      Actie voor de klant: ${log.actie}
      Categorie: ${log.categorie}
      Prioriteit: ${log.prioriteit}
      Medewerker: ${log.medewerker}
      Datum & Tijd: ${log.tijd}
    `;
    navigator.clipboard.writeText(logText);
    alert('Log gekopieerd naar het klembord!');
  };

  // Exporteer logs als JSON
  const handleExportLogs = () => {
    const data = JSON.stringify(logs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs.json';
    a.click();
  };

  // Filter logs op zoekterm
  const gefilterdeLogs = logs.filter(
    (log) =>
      log.vraag.toLowerCase().includes(zoekTerm.toLowerCase()) ||
      log.categorie.toLowerCase().includes(zoekTerm.toLowerCase()) ||
      log.medewerker.toLowerCase().includes(zoekTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>KPN Logsysteem</h1>

      {/* Zoekbalk */}
      <input
        type="text"
        value={zoekTerm}
        onChange={(e) => setZoekTerm(e.target.value)}
        placeholder="Zoek in logs..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />

      {/* Inputvelden */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={klantVraag}
          onChange={(e) => setKlantVraag(e.target.value)}
          placeholder="Klantvraag"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          value={klantProbleem}
          onChange={(e) => setKlantProbleem(e.target.value)}
          placeholder="Klantprobleem"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          value={oorzaak}
          onChange={(e) => setOorzaak(e.target.value)}
          placeholder="Oorzaak"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          value={oplossing}
          onChange={(e) => setOplossing(e.target.value)}
          placeholder="Oplossing"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          value={klantActie}
          onChange={(e) => setKlantActie(e.target.value)}
          placeholder="Wat moet de klant doen?"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        >
          <option value="" disabled>
            {' '}
            Selecteer een categorie{' '}
          </option>
          <option value="Technisch">Technisch</option>
          <option value="Facturering">Facturering</option>
          <option value="Anders">Anders</option>
        </select>
        <select
          value={prioriteit}
          onChange={(e) => setPrioriteit(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        >
          <option value="" disabled>
            {' '}
            Selecteer prioriteit{' '}
          </option>
          <option value="Hoog">Hoog</option>
          <option value="Middel">Middel</option>
          <option value="Laag">Laag</option>
        </select>
        <input
          type="text"
          value={medewerker}
          onChange={(e) => setMedewerker(e.target.value)}
          placeholder="Medewerker naam"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button
          onClick={handleAddLog}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            backgroundColor: '#0078d4',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Voeg log toe
        </button>
      </div>

      {/* Logs weergeven */}
      <div>
        <h2>Ingevoerde Logs:</h2>
        {gefilterdeLogs.length > 0 ? (
          gefilterdeLogs.map((log, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <p>
                <strong>Klantvraag:</strong> {log.vraag}
              </p>
              <p>
                <strong>Klantprobleem:</strong> {log.probleem}
              </p>
              <p>
                <strong>Oorzaak:</strong> {log.oorzaak}
              </p>
              <p>
                <strong>Oplossing:</strong> {log.oplossing}
              </p>
              <p>
                <strong>Actie voor de klant:</strong> {log.actie}
              </p>
              <p>
                <strong>Categorie:</strong> {log.categorie}
              </p>
              <p>
                <strong>Prioriteit:</strong> {log.prioriteit}
              </p>
              <p>
                <strong>Medewerker:</strong> {log.medewerker}
              </p>
              <p>
                <strong>Datum & Tijd:</strong> {log.tijd}
              </p>
              <button
                onClick={() => handleCopyLog(log)}
                style={{
                  padding: '5px 10px',
                  fontSize: '14px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Kopieer log
              </button>
              <button
                onClick={() => handleDeleteLog(index)}
                style={{
                  padding: '5px 10px',
                  fontSize: '14px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Verwijder log
              </button>
            </div>
          ))
        ) : (
          <p>Geen logs gevonden</p>
        )}
      </div>

      {/* Exporteer-knop */}
      <button
        onClick={handleExportLogs}
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Exporteer Logs
      </button>
    </div>
  );
}

export default App;
