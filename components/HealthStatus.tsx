'use client';

import { useEffect, useState } from 'react';
import { getHealth } from '@/lib/api';
import { HealthResponse } from '@/lib/types';

export default function HealthStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await getHealth();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError('Offline');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-white/80 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />
        Connecting...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-white/90 bg-red-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-red-500/30">
        <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
        {error}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-xs text-white/90 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10 shadow-sm">
        <div className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
        Online
      </div>
    </div>
  );
}
