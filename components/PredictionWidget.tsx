'use client';

import { useState } from 'react';
import PriceForm from './PriceForm';
import HighLowForm from './HighLowForm';

export default function PredictionWidget() {
  const [activeTab, setActiveTab] = useState<'price' | 'classify'>('price');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative z-10 -mt-24">
        <div className="flex items-end gap-2 ml-4 mb-[-1px] relative z-20">
            <button
                onClick={() => setActiveTab('price')}
                className={`px-8 py-3 text-sm font-medium rounded-t-2xl transition-all duration-200 ${
                    activeTab === 'price' 
                    ? 'bg-white text-gray-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]' 
                    : 'bg-white/60 text-gray-600 hover:bg-white/80 backdrop-blur-md'
                }`}
            >
                House Price
            </button>
            <button
                onClick={() => setActiveTab('classify')}
                className={`px-8 py-3 text-sm font-medium rounded-t-2xl transition-all duration-200 ${
                    activeTab === 'classify' 
                    ? 'bg-white text-gray-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]' 
                    : 'bg-white/60 text-gray-600 hover:bg-white/80 backdrop-blur-md'
                }`}
            >
                Value Rating
            </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 relative z-20">
            {activeTab === 'price' ? <PriceForm /> : <HighLowForm />}
        </div>
    </div>
  );
}

