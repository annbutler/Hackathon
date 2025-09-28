'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { 
  Send, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  FileText
} from 'lucide-react';
import requestStorage from '@/lib/requestStorage';

interface RequestFormProps {
  wardId: number;
  wardName: string;
  aldermanName: string;
}

interface SubmittedRequest {
  id: string;
  type: string;
  title: string;
  description: string;
  wardId: number;
  wardName: string;
  aldermanName: string;
  status: string;
  createdAt: string;
  estimatedResponseTime: string;
}

export default function RequestForm({ wardId, wardName, aldermanName }: RequestFormProps) {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitted' | 'error'>('idle');
  const [submittedRequest, setSubmittedRequest] = useState<SubmittedRequest | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  const submitRequest = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, this would submit to your backend
      const requestData = {
        id: `REQ-${Date.now()}`,
        ...formData,
        wardId,
        wardName,
        aldermanName,
        status: 'submitted',
        createdAt: new Date().toISOString(),
        estimatedResponseTime: '3-5 business days'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store the request
      requestStorage.addRequest(requestData);
      
      console.log('Request submitted:', requestData);
      setSubmittedRequest(requestData);
      setStatus('submitted');
    } catch (error) {
      console.error('Error submitting request:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'submitted' && submittedRequest) {
    return (
      <div className="space-y-6">
        {/* Success Header */}
        <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
          <CardContent className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <CheckCircle className="w-20 h-20 text-green-500" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Request Successfully Submitted!</h2>
            <p className="text-lg text-gray-300 mb-4">
              Your request has been sent to <span className="text-blue-400 font-semibold">{submittedRequest.aldermanName}</span>
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <p className="text-gray-400">
                <span className="text-white font-semibold">Request ID:</span> {submittedRequest.id}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Request Details */}
        <Card className="bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Request Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-400">Request Type</label>
                  <p className="text-white capitalize">{submittedRequest.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Ward</label>
                  <p className="text-white">{submittedRequest.wardName}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-400">Submitted To</label>
                  <p className="text-white">{submittedRequest.aldermanName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Submitted On</label>
                  <p className="text-white">{new Date(submittedRequest.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-400">Status</label>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Submitted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-white font-medium">Request Received</p>
                  <p className="text-gray-400 text-sm">Your request has been logged and assigned a tracking number.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-white font-medium">Review Process</p>
                  <p className="text-gray-400 text-sm">The alderman&apos;s office will review your request within {submittedRequest.estimatedResponseTime}.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-white font-medium">Response & Updates</p>
                  <p className="text-gray-400 text-sm">You&apos;ll receive email updates on the progress and any actions taken.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-400" />
              Stay Connected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <p className="text-gray-300 text-sm mb-3">
                Questions about your request? Contact the alderman&apos;s office directly:
              </p>
              <div className="space-y-2">
                <p className="text-white">
                  <span className="text-gray-400">Email:</span> alderman.office@cityofchicago.org
                </p>
                <p className="text-white">
                  <span className="text-gray-400">Phone:</span> (312) 744-3062
                </p>
                <p className="text-white">
                  <span className="text-gray-400">Reference ID:</span> {submittedRequest.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => {
              setStatus('idle');
              setFormData({ type: '', title: '', description: '' });
              setSubmittedRequest(null);
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Submit Another Request
          </Button>
          <Button 
            onClick={() => window.print()}
            variant="outline"
            className="flex-1"
          >
            <FileText className="w-4 h-4 mr-2" />
            Print Confirmation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Submit a Request to {aldermanName}</CardTitle>
          <p className="text-gray-400">Report issues or request services in {wardName}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Request Type *
            </label>
            <select 
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full p-3 bg-gray-700 border-2 border-gray-500 rounded-lg text-white shadow-lg hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer"
            >
              <option value="">Select a type...</option>
              <option value="infrastructure">Infrastructure (potholes, street lights)</option>
              <option value="safety">Public Safety</option>
              <option value="environment">Environment</option>
              <option value="housing">Housing</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Brief Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Pothole on Main Street"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder="Describe your request or concern in detail..."
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={submitRequest}
              disabled={isSubmitting || !formData.type || !formData.description}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>


      {status === 'error' && (
        <Card className="bg-red-900/20 border-red-600">
          <CardContent className="flex items-center gap-3 py-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-300">There was an error processing your request. Please try again.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
