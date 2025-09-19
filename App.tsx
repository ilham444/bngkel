
import React, { useState, useMemo } from 'react';
import { MotorcycleIcon, CogIcon, WrenchIcon, HardHatIcon, ReceiptIcon, PlusIcon, CrossIcon } from './components/icons';
import { SERVICES, DIFFICULTY_LEVELS } from './constants';
import type { SparePart } from './types';

const App: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [newPartName, setNewPartName] = useState<string>('');
  const [newPartPrice, setNewPartPrice] = useState<string>('');
  const [difficultyId, setDifficultyId] = useState<string>(DIFFICULTY_LEVELS[0].id);

  const selectedService = useMemo(() => SERVICES.find(s => s.id === selectedServiceId), [selectedServiceId]);
  const selectedDifficulty = useMemo(() => DIFFICULTY_LEVELS.find(d => d.id === difficultyId), [difficultyId]);

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newPartPrice);
    if (newPartName.trim() && !isNaN(price) && price >= 0) {
      setSpareParts([...spareParts, { id: Date.now(), name: newPartName.trim(), price }]);
      setNewPartName('');
      setNewPartPrice('');
    }
  };

  const handleRemovePart = (id: number) => {
    setSpareParts(spareParts.filter(part => part.id !== id));
  };

  const serviceCost = selectedService ? selectedService.price : 0;
  const partsTotalCost = useMemo(() => spareParts.reduce((acc, part) => acc + part.price, 0), [spareParts]);
  const difficultyCost = useMemo(() => {
    if (!selectedService || !selectedDifficulty) return 0;
    return serviceCost * selectedDifficulty.multiplier;
  }, [serviceCost, selectedDifficulty, selectedService]);

  const totalCost = serviceCost + partsTotalCost + difficultyCost;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg transition-shadow hover:shadow-2xl p-6 sm:p-8 space-y-8">
        {/* Header */}
        <header className="text-center">
          <MotorcycleIcon className="w-20 h-20 mx-auto text-indigo-500 mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Kalkulator Servis Motor</h1>
          <p className="text-gray-600 mt-2">Hitung estimasi biaya servis dan sparepart motor Anda dengan mudah.</p>
        </header>

        {/* Service Selection */}
        <section className="bg-blue-50/50 rounded-2xl p-5">
          <label htmlFor="service-type" className="flex items-center text-lg font-semibold text-gray-700 mb-3">
            <CogIcon className="w-6 h-6 mr-3 text-blue-500" />
            Pilih Jenis Servis
          </label>
          <select
            id="service-type"
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {SERVICES.map(service => (
              <option key={service.id} value={service.id}>{service.name} - {formatCurrency(service.price)}</option>
            ))}
          </select>
        </section>

        {/* Spare Parts */}
        <section className="bg-green-50/50 rounded-2xl p-5 space-y-4">
          <h3 className="flex items-center text-lg font-semibold text-gray-700">
            <WrenchIcon className="w-6 h-6 mr-3 text-green-500" />
            Daftar Sparepart
          </h3>
          <form onSubmit={handleAddPart} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Nama Sparepart"
              value={newPartName}
              onChange={(e) => setNewPartName(e.target.value)}
              className="sm:col-span-2 p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Harga"
              value={newPartPrice}
              onChange={(e) => setNewPartPrice(e.target.value)}
              className="sm:col-span-2 p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              min="0"
            />
            <button type="submit" className="sm:col-span-1 flex items-center justify-center p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-md hover:shadow-lg">
              <PlusIcon className="w-5 h-5" />
            </button>
          </form>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {spareParts.map(part => (
              <div key={part.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                <span className="text-gray-700">{part.name}</span>
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-800">{formatCurrency(part.price)}</span>
                  <button onClick={() => handleRemovePart(part.id)} className="text-red-500 hover:text-red-700">
                    <CrossIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Difficulty Level */}
        <section className="bg-yellow-50/50 rounded-2xl p-5">
           <label htmlFor="difficulty-level" className="flex items-center text-lg font-semibold text-gray-700 mb-3">
            <HardHatIcon className="w-6 h-6 mr-3 text-yellow-500" />
            Tingkat Kesulitan Pemasangan
          </label>
          <select
            id="difficulty-level"
            value={difficultyId}
            onChange={(e) => setDifficultyId(e.target.value)}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
          >
            {DIFFICULTY_LEVELS.map(level => (
              <option key={level.id} value={level.id}>{level.name} (+{level.multiplier * 100}%)</option>
            ))}
          </select>
        </section>

        {/* Cost Details */}
        <section className="border-t-2 border-dashed border-gray-300 pt-6">
          <h2 className="flex items-center text-xl font-bold text-gray-800 mb-4">
            <ReceiptIcon className="w-7 h-7 mr-3 text-indigo-500"/>
            Rincian Biaya Anda
          </h2>
          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Biaya Jasa Servis</span>
              <span className="font-medium text-gray-800">{formatCurrency(serviceCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Sparepart</span>
              <span className="font-medium text-gray-800">{formatCurrency(partsTotalCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Kesulitan</span>
              <span className="font-medium text-gray-800">{formatCurrency(difficultyCost)}</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-300 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">Total Estimasi</span>
            <span className="text-3xl font-extrabold text-green-500 tracking-tight">{formatCurrency(totalCost)}</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
