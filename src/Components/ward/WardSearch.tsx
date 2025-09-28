'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Ward, searchWards } from '@/lib/wardData';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Search, MapPin, User, Star, Loader2 } from 'lucide-react';
import AdvertisementSection from '@/Components/ads/AdvertisementSection';

export default function WardSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    
    setLoading(true);
    setHasSearched(true);
    try {
      const searchResults = await searchWards(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleWardClick = (wardId: number) => {
    router.push(`/ward/${wardId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Welcome to PoliTalk
            </h1>
            <p className="text-xl text-gray-300">
              Your comprehensive ward information hub
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Get informed about your Chicago ward, connect with your alderman, and stay engaged with local government. 
              Find ward information, submit requests, and discover local events happening in your community.
            </p>
          </div>

      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search by ward number, alderman name, or issue..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-gray-800 border-gray-600 text-white"
        />
        <Button 
          onClick={() => handleSearch()}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Search className="w-4 h-4 mr-2" />
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-4" />
          <p className="text-gray-400">Searching for wards...</p>
        </div>
      )}

      {/* Search Results */}
      {!loading && results.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Search Results</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((ward) => (
              <Card 
                key={ward.id}
                className="bg-gray-800 border-gray-600 cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={() => handleWardClick(ward.id)}
              >
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    {ward.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <User className="w-4 h-4" />
                    <span>{ward.alderman.name}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    <p>Population: {ward.demographics.population.toLocaleString()}</p>
                    <p>Area: {ward.demographics.area}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ward.alderman.platforms.slice(0, 2).map((platform, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Advertisements in Search Results */}
          <div className="mt-8">
            <AdvertisementSection 
              title="Local Services in Your Area" 
              count={3} 
              variant="compact"
            />
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!loading && hasSearched && results.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p className="text-lg">No wards found matching "{query}"</p>
          <p className="text-sm mt-2">Try searching by ward number (1-50) or alderman name</p>
        </div>
      )}

      {/* Advertisements Section */}
      <div className="mt-12">
        <AdvertisementSection 
          title="Local Chicago Businesses" 
          count={2} 
          variant="default"
        />
      </div>

      {/* Supporting Local Businesses Tagline */}
      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          <Star className="w-4 h-4 inline mr-1" />
          Supporting local Chicago businesses
        </p>
      </div>
    </div>
  );
}
