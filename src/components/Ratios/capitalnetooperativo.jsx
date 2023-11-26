import React, { useState } from 'react';

const CapitalTrabajoNeto = () => {
  const [activosCorrientes, setActivosCorrientes] = useState('');
  const [pasivosCorrientes, setPasivosCorrientes] = useState('');
  const [capitalTrabajoNeto, setCapitalTrabajoNeto] = useState(null);
  const [error, setError] = useState('');
  const [comentario, setComentario] = useState('');

  const handleActivosCorrientesChange = (e) => {
    setActivosCorrientes(e.target.value);
  };

  const handlePasivosCorrientesChange = (e) => {
    setPasivosCorrientes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!activosCorrientes.trim() || !pasivosCorrientes.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setError('');

    // Calcular el Capital de Trabajo Neto Operativo (CTNO)
    const activosCorrientesFloat = parseFloat(activosCorrientes);
    const pasivosCorrientesFloat = parseFloat(pasivosCorrientes);

    const capitalTrabajoNetoCalculado = activosCorrientesFloat - pasivosCorrientesFloat;
    setCapitalTrabajoNeto(capitalTrabajoNetoCalculado.toFixed(2));

    // Establecer comentario según el resultado
    if (capitalTrabajoNetoCalculado > 0) {
      setComentario('El Capital de Trabajo Neto Operativo es positivo. Buen indicador.');
    } else if (capitalTrabajoNetoCalculado === 0) {
      setComentario('El Capital de Trabajo Neto Operativo es cero. Equilibrio.');
    } else {
      setComentario('El Capital de Trabajo Neto Operativo es negativo. Riesgo de liquidez.');
    }
  };

  const handleReset = () => {
    setActivosCorrientes('');
    setPasivosCorrientes('');
    setCapitalTrabajoNeto(null);
    setError('');
    setComentario('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">Capital de Trabajo Neto Operativo</h1>
        <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Activos Corrientes:
              <input
                type="text"
                value={activosCorrientes}
                onChange={handleActivosCorrientesChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ingrese el monto de activos corrientes"
              />
            </label>
            <label className="block mb-2">
              Pasivos Corrientes:
              <input
                type="text"
                value={pasivosCorrientes}
                onChange={handlePasivosCorrientesChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ingrese el monto de pasivos corrientes"
              />
            </label>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Calcular
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Limpiar
              </button>
            </div>

            {capitalTrabajoNeto !== null && (
              <div className="mt-4">
                <p>
                  Capital de Trabajo Neto Operativo: <strong>{capitalTrabajoNeto}</strong>
                </p>
                <p className="mt-2">
                  Comentario: {comentario}
                </p>
              </div>
            )}

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CapitalTrabajoNeto;