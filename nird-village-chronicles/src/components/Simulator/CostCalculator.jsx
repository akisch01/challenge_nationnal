// src/components/Simulator/CostCalculator.jsx
import { useState } from 'react';
import { ArrowLeft, Calculator, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CostCalculator = ({ onBack }) => {
  const [numDevices, setNumDevices] = useState(50);

  const calculateCosts = () => {
    const costs = {
      microsoft: {
        initial: numDevices * 300, // Licence Windows + Office
        annual: numDevices * 120, // Maintenance
        total: numDevices * 300 + (numDevices * 120 * 3)
      },
      libre: {
        initial: numDevices * 50, // Formation
        annual: numDevices * 20, // Support
        total: numDevices * 50 + (numDevices * 20 * 3)
      }
    };

    return costs;
  };

  const costs = calculateCosts();
  const savings = costs.microsoft.total - costs.libre.total;
  const savingsPercent = ((savings / costs.microsoft.total) * 100).toFixed(1);

  const chartData = [
    {
      name: 'Année 0',
      'Solution Microsoft': costs.microsoft.initial,
      'Solution Libre': costs.libre.initial,
    },
    {
      name: 'Année 1',
      'Solution Microsoft': costs.microsoft.initial + costs.microsoft.annual,
      'Solution Libre': costs.libre.initial + costs.libre.annual,
    },
    {
      name: 'Année 2',
      'Solution Microsoft': costs.microsoft.initial + costs.microsoft.annual * 2,
      'Solution Libre': costs.libre.initial + costs.libre.annual * 2,
    },
    {
      name: 'Année 3',
      'Solution Microsoft': costs.microsoft.total,
      'Solution Libre': costs.libre.total,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-green-800 text-white p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition"
        >
          <ArrowLeft size={20} />
          Retour au village
        </button>

        <div className="flex items-center gap-2">
          <Calculator size={24} />
          <h1 className="text-xl font-bold">Simulateur de Coûts</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Configuration */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuration</h2>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre d'appareils: {numDevices}
            </label>
            <input
              type="range"
              min="10"
              max="500"
              value={numDevices}
              onChange={(e) => setNumDevices(parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Résultats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Solution Microsoft */}
          <div className="bg-blue-600 text-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Solution Microsoft</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Coût initial:</span>
                <span className="font-mono font-bold">{costs.microsoft.initial.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between">
                <span>Coût annuel:</span>
                <span className="font-mono font-bold">{costs.microsoft.annual.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between border-t border-white border-opacity-30 pt-2 mt-2">
                <span className="text-lg">Total (3 ans):</span>
                <span className="font-mono font-bold text-xl">{costs.microsoft.total.toLocaleString()}€</span>
              </div>
            </div>
          </div>

          {/* Solution Libre */}
          <div className="bg-green-600 text-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Solution Libre</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Coût initial:</span>
                <span className="font-mono font-bold">{costs.libre.initial.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between">
                <span>Coût annuel:</span>
                <span className="font-mono font-bold">{costs.libre.annual.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between border-t border-white border-opacity-30 pt-2 mt-2">
                <span className="text-lg">Total (3 ans):</span>
                <span className="font-mono font-bold text-xl">{costs.libre.total.toLocaleString()}€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Économies */}
        <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl shadow-xl p-8 mb-8 text-center">
          <TrendingDown size={48} className="mx-auto mb-4 text-green-600" />
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Économies réalisées</h3>
          <div className="text-5xl font-bold text-green-600 mb-2">
            {savings.toLocaleString()}€
          </div>
          <div className="text-xl text-gray-700">
            Soit {savingsPercent}% d'économies sur 3 ans
          </div>
        </div>

        {/* Graphique */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Évolution des coûts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Solution Microsoft" fill="#2563eb" />
              <Bar dataKey="Solution Libre" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
