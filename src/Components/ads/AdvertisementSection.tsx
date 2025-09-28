'use client';
import { useState, useEffect } from 'react';
import { Advertisement } from '@/lib/types';
import { getRandomAds } from '@/lib/adData';
import AdvertisementCard from './AdvertisementCard';
import { Badge } from '@/Components/ui/badge';
import { Building2, Star } from 'lucide-react';

interface AdvertisementSectionProps {
  title?: string;
  count?: number;
  variant?: 'default' | 'compact';
  showHeader?: boolean;
}

export default function AdvertisementSection({ 
  title = "Local Chicago Businesses", 
  count = 3, 
  variant = 'default',
  showHeader = true 
}: AdvertisementSectionProps) {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAds() {
      try {
        const randomAds = await getRandomAds(count);
        setAds(randomAds);
      } catch (error) {
        console.error('Error loading ads:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAds();
  }, [count]);

  if (loading) {
    return (
      <div className="space-y-4">
        {showHeader && (
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <Badge variant="secondary" className="bg-blue-600 text-white">
              Sponsored
            </Badge>
          </div>
        )}
        <div className={`grid gap-6 ${variant === 'compact' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2'}`}>
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg p-4 animate-pulse h-64">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <Badge variant="secondary" className="bg-blue-600 text-white">
            Sponsored
          </Badge>
        </div>
      )}
      
      <div className={`grid gap-6 ${variant === 'compact' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2'}`}>
        {ads.map((ad) => (
          <AdvertisementCard key={ad.id} ad={ad} variant={variant} />
        ))}
      </div>
    </div>
  );
}
