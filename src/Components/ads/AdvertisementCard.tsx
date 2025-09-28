'use client';
import { Advertisement } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { 
  Star, 
  Phone, 
  MapPin, 
  DollarSign, 
  Tag,
  Users,
  Wrench,
  TreePine
} from 'lucide-react';

interface AdvertisementCardProps {
  ad: Advertisement;
  variant?: 'default' | 'compact';
}

export default function AdvertisementCard({ ad, variant = 'default' }: AdvertisementCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lawn-care':
        return <TreePine className="w-4 h-4" />;
      case 'child-care':
        return <Users className="w-4 h-4" />;
      case 'plumbing':
        return <Wrench className="w-4 h-4" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lawn-care':
        return 'bg-green-600';
      case 'child-care':
        return 'bg-blue-600';
      case 'plumbing':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="bg-gray-800 border-gray-600 hover:bg-gray-700 transition-colors h-full">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1 rounded flex-shrink-0 ${getTypeColor(ad.type)}`}>
                {getTypeIcon(ad.type)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-semibold text-sm leading-tight">{ad.businessName}</h3>
                <p className="text-gray-400 text-xs leading-tight">{ad.serviceArea}</p>
              </div>
            </div>
            <div className="flex justify-start">
              <Badge variant="secondary" className="bg-green-600 text-white text-xs">
                {ad.discount}
              </Badge>
            </div>
          </div>
          
          <p className="text-gray-300 text-xs mb-3 flex-1 leading-relaxed">{ad.description}</p>
          
          <div className="flex items-center justify-between mt-auto gap-2">
            <div className="flex items-center gap-1 min-w-0">
              <Star className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0" />
              <span className="text-white text-xs">{ad.rating}</span>
              <span className="text-gray-400 text-xs">({ad.reviewCount})</span>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 flex-shrink-0">
              <Phone className="w-3 h-3 mr-1" />
              Call
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-600 hover:bg-gray-700 transition-colors h-full">
      <CardHeader className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg flex-shrink-0 ${getTypeColor(ad.type)}`}>
              {getTypeIcon(ad.type)}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-white text-lg leading-tight">{ad.businessName}</CardTitle>
            </div>
          </div>
          <div className="flex justify-start">
            <Badge variant="secondary" className="bg-green-600 text-white">
              {ad.discount}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 flex flex-col h-full">
        <p className="text-gray-300 text-sm leading-relaxed flex-1">{ad.description}</p>
        
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="text-gray-300 leading-tight">{ad.serviceArea}</span>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <DollarSign className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-gray-300 leading-tight">{ad.priceRange}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
          <span className="text-white font-semibold">{ad.rating}</span>
          <span className="text-gray-400">({ad.reviewCount} reviews)</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {ad.services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="outline" className="border-gray-500 text-gray-300 text-xs">
              {service}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-col gap-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Phone className="w-4 h-4 mr-2" />
            Call {ad.phone}
          </Button>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 text-xs leading-relaxed">
            Use code <span className="text-white font-semibold">{ad.promoCode}</span> for discount
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
