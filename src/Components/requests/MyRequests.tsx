'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { 
  FileText, 
  Calendar, 
  MapPin, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
  Mail,
  Phone
} from 'lucide-react';
import requestStorage, { StoredRequest } from '@/lib/requestStorage';

export default function MyRequests() {
  const [requests, setRequests] = useState<StoredRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<StoredRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load requests from storage
    const storedRequests = requestStorage.getRequests();
    setRequests(storedRequests);
    setLoading(false);
  }, []);

  const handleViewDetails = (request: StoredRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] text-white pt-20">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-400">Loading your requests...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white pt-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Requests</h1>
          <p className="text-xl text-gray-300">
            Track and manage your submitted requests to aldermen
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{requests.length}</p>
                  <p className="text-sm text-gray-400">Total Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {requests.filter(r => r.status === 'submitted').length}
                  </p>
                  <p className="text-sm text-gray-400">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {requests.filter(r => r.status === 'in-progress').length}
                  </p>
                  <p className="text-sm text-gray-400">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {requests.filter(r => r.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-400">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <Card className="bg-gray-800 border-gray-600">
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Requests Yet</h3>
              <p className="text-gray-400 mb-6">
                You haven&apos;t submitted any requests yet. Start by finding your ward and submitting a request.
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Find Your Ward
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="bg-gray-800 border-gray-600 hover:bg-gray-700 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-2">
                        {request.title || `${request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request`}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {request.wardName}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {request.aldermanName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(request.status)} flex items-center gap-1`}>
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {request.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Request ID:</span> {request.id}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => handleViewDetails(request)}
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Request Details Modal */}
        {isModalOpen && selectedRequest && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-600 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-600">
                <h2 className="text-2xl font-bold text-white">Request Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Request Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {selectedRequest.title || `${selectedRequest.type.charAt(0).toUpperCase() + selectedRequest.type.slice(1)} Request`}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(selectedRequest.status)} flex items-center gap-1`}>
                        {getStatusIcon(selectedRequest.status)}
                        {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Request ID</p>
                    <p className="text-white font-mono">{selectedRequest.id}</p>
                  </div>
                </div>

                {/* Request Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Request Type</label>
                      <p className="text-white capitalize">{selectedRequest.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Ward</label>
                      <p className="text-white">{selectedRequest.wardName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Submitted To</label>
                      <p className="text-white">{selectedRequest.aldermanName}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Submitted On</label>
                      <p className="text-white">{new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Estimated Response Time</label>
                      <p className="text-white">{selectedRequest.estimatedResponseTime}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Status</label>
                      <div className="mt-1">
                        <Badge className={`${getStatusColor(selectedRequest.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(selectedRequest.status)}
                          {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-400">Description</label>
                  <div className="mt-2 p-4 bg-gray-900 rounded-lg">
                    <p className="text-white leading-relaxed">{selectedRequest.description}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t border-gray-600 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">alderman.office@cityofchicago.org</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white">(312) 744-3062</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium">Reference ID:</span> {selectedRequest.id}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Include this ID when contacting the alderman&apos;s office about this request.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-600">
                  <Button 
                    onClick={closeModal}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => window.print()}
                    variant="outline"
                    className="flex-1"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Print Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
