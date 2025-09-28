'use client';
import { useState } from 'react';
import { Ward } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare,
  Download
} from 'lucide-react';
import Link from 'next/link';
import RequestForm from './RequestForm';
import AdvertisementSection from '@/Components/ads/AdvertisementSection';

interface WardOverviewProps {
  ward: Ward;
}

export default function WardOverview({ ward }: WardOverviewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'alderman' | 'events' | 'requests'>('overview');

  const addToCalendar = (event: any) => {
    const startDate = new Date(event.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">{ward.name}</h1>
        <p className="text-xl text-gray-300">Represented by {ward.alderman.name}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: 'overview', label: 'Overview', icon: MapPin },
          { id: 'alderman', label: 'Alderman', icon: User },
          { id: 'events', label: 'Events', icon: Calendar },
          { id: 'requests', label: 'Submit Request', icon: MessageSquare }
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'default' : 'outline'}
            onClick={() => setActiveTab(id as any)}
            className="flex items-center gap-2"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-800 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Ward Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Population</p>
                  <p className="text-white font-semibold">{ward.demographics.population.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Area</p>
                  <p className="text-white font-semibold">{ward.demographics.area}</p>
                </div>
                <div>
                  <p className="text-gray-400">Median Income</p>
                  <p className="text-white font-semibold">{ward.demographics.medianIncome}</p>
                </div>
                <div>
                  <p className="text-gray-400">Party</p>
                  <p className="text-white font-semibold">{ward.alderman.party}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Quick Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a href={`tel:${ward.alderman.phone}`} className="text-white hover:text-blue-400">
                    {ward.alderman.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href={`mailto:${ward.alderman.email}`} className="text-white hover:text-blue-400">
                    {ward.alderman.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                  <span className="text-white text-sm">{ward.alderman.office}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'alderman' && (
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-600">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6">
                {ward.alderman.image && (
                  <div className="flex-shrink-0">
                    <img 
                      src={ward.alderman.image} 
                      alt={`${ward.alderman.name}, Alderman of ${ward.name}`}
                      className="w-48 h-48 rounded-lg object-cover border-2 border-gray-600"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-white text-2xl">{ward.alderman.name}</CardTitle>
                  <p className="text-gray-400 text-lg">{ward.alderman.party} • {ward.name}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <a href={`tel:${ward.alderman.phone}`} className="text-white hover:text-blue-400">
                        {ward.alderman.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <a href={`mailto:${ward.alderman.email}`} className="text-white hover:text-blue-400">
                        {ward.alderman.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                      <span className="text-white text-sm">{ward.alderman.office}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Biography</h3>
                <p className="text-gray-300 leading-relaxed">{ward.alderman.biography}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {ward.alderman.platforms.map((platform, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-600 text-white">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Committee Memberships</h3>
                <div className="flex flex-wrap gap-2">
                  {ward.alderman.committees.map((committee, index) => (
                    <Badge key={index} variant="outline" className="border-gray-500 text-gray-300">
                      {committee}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Upcoming Events</h2>
          </div>
          
          {ward.events.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {ward.events.map((event) => (
                <Card key={event.id} className="bg-gray-800 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">{event.title}</CardTitle>
                    <p className="text-gray-400">
                      {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                      <span className="text-white text-sm">{event.location}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{event.description}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToCalendar(event)}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-800 border-gray-600">
              <CardContent className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No upcoming events scheduled</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="max-w-4xl mx-auto">
          <RequestForm 
            wardId={ward.id}
            wardName={ward.name}
            aldermanName={ward.alderman.name}
          />
        </div>
      )}

      {/* Advertisements Section */}
      <div className="mt-12">
        <AdvertisementSection 
          title={`Local Services in ${ward.name}`} 
          count={2} 
          variant="compact"
        />
      </div>
    </div>
  );
}
