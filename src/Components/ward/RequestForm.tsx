'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { 
  MessageSquare, 
  Sparkles, 
  Send, 
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface RequestFormProps {
  wardId: number;
  wardName: string;
  aldermanName: string;
}

export default function RequestForm({ wardId, wardName, aldermanName }: RequestFormProps) {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    location: ''
  });
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'generated' | 'submitted' | 'error'>('idle');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateWithAI = async () => {
    if (!formData.type || !formData.description || !formData.location) {
      alert('Please fill in the type, description, and location fields first.');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          description: formData.description,
          location: formData.location
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setGeneratedText(data.generatedText);
        setStatus('generated');
      } else {
        throw new Error(data.error || 'Failed to generate text');
      }
    } catch (error) {
      console.error('Error generating request:', error);
      setStatus('error');
    } finally {
      setIsGenerating(false);
    }
  };

  const submitRequest = async () => {
    setIsSubmitting(true);
    try {
      // In a real app, this would submit to your backend
      const requestData = {
        ...formData,
        wardId,
        generatedText: generatedText || formData.description,
        status: 'submitted',
        createdAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Request submitted:', requestData);
      setStatus('submitted');
    } catch (error) {
      console.error('Error submitting request:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'submitted') {
    return (
      <Card className="bg-gray-800 border-gray-600">
        <CardContent className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Request Submitted!</h3>
          <p className="text-gray-400 mb-4">
            Your request has been sent to {aldermanName} for {wardName}.
          </p>
          <p className="text-sm text-gray-500">
            You'll receive email updates on the status of your request.
          </p>
          <Button 
            onClick={() => {
              setStatus('idle');
              setFormData({ type: '', title: '', description: '', location: '' });
              setGeneratedText('');
            }}
            className="mt-4"
            variant="outline"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
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
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Location *
            </label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Specific address or intersection..."
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={generateWithAI}
              disabled={isGenerating || !formData.type || !formData.description || !formData.location}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedText && (
        <Card className="bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              AI-Generated Request
            </CardTitle>
            <p className="text-gray-400">Review and edit the generated text below</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300 whitespace-pre-wrap">{generatedText}</p>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={submitRequest}
                disabled={isSubmitting}
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
              <Button 
                onClick={generateWithAI}
                variant="outline"
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
