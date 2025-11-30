'use client';

import { useState } from 'react';
import { predictPrice } from '@/lib/api';
import { HouseInputs, PredictPriceResponse } from '@/lib/types';
import { TOWNS, HOUSE_TYPES } from '@/lib/constants';

// Helper type to allow empty strings in form state while typing
type FormInputs = {
  [K in keyof HouseInputs]: HouseInputs[K] extends number ? number | '' : HouseInputs[K];
};

export default function PriceForm() {
  const [inputs, setInputs] = useState<FormInputs>({
    Beds: 3,
    Baths: 2,
    Sqft_home: 1500,
    Sqft_lot: 5000,
    Age: 10,
    Type: HOUSE_TYPES[0],
    Town: TOWNS[0],
  });

  const [result, setResult] = useState<PredictPriceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'number' 
        ? (value === '' ? '' : parseFloat(value))
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Convert empty strings to 0 or handle validation before submitting
    const submitData: HouseInputs = {
      ...inputs,
      Beds: inputs.Beds === '' ? 0 : inputs.Beds,
      Baths: inputs.Baths === '' ? 0 : inputs.Baths,
      Sqft_home: inputs.Sqft_home === '' ? 0 : inputs.Sqft_home,
      Sqft_lot: inputs.Sqft_lot === '' ? 0 : inputs.Sqft_lot,
      Age: inputs.Age === '' ? 0 : inputs.Age,
    };

    try {
      const data = await predictPrice(submitData);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to predict price');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 flex-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Beds</label>
            <input
              type="number"
              name="Beds"
              value={inputs.Beds}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Baths</label>
            <input
              type="number"
              name="Baths"
              value={inputs.Baths}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Sqft Home</label>
            <input
              type="number"
              name="Sqft_home"
              value={inputs.Sqft_home}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Sqft Lot</label>
            <input
              type="number"
              name="Sqft_lot"
              value={inputs.Sqft_lot}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Age</label>
            <input
              type="number"
              name="Age"
              value={inputs.Age}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Type</label>
            <select
              name="Type"
              value={inputs.Type}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500"
            >
              {HOUSE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">Town</label>
            <select
              name="Town"
              value={inputs.Town}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-3 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-500 truncate"
            >
              {TOWNS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="lg:w-48 flex-shrink-0">
            <button
            type="submit"
            disabled={loading}
            className="w-full h-[46px] bg-[#0088FF] hover:bg-[#0077EE] text-white rounded-full font-medium shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
            {loading ? 'Calculating...' : 'Discover Price'}
            </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-sm flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          {error}
        </div>
      )}

      {result && result.predicted_price && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center justify-between p-6 bg-blue-50 rounded-3xl border border-blue-100">
                <div>
                    <p className="text-sm text-blue-600 font-medium mb-1">Estimated Market Value</p>
                    <h3 className="text-4xl font-bold text-gray-900 tracking-tight">
                        ${result.predicted_price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </h3>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-xs text-blue-400 font-medium uppercase tracking-widest mb-1">Log Prediction</p>
                    <p className="text-xl font-mono text-blue-700">{result.predicted_log_price?.toFixed(4)}</p>
                </div>
           </div>
        </div>
      )}
    </div>
  );
}
