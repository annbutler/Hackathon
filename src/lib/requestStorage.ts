// Simple in-memory storage for submitted requests
// In a real app, this would be a database

interface StoredRequest {
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

class RequestStorage {
  private requests: StoredRequest[] = [];

  addRequest(request: StoredRequest): void {
    this.requests.push(request);
  }

  getRequests(): StoredRequest[] {
    return [...this.requests].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getRequestById(id: string): StoredRequest | undefined {
    return this.requests.find(req => req.id === id);
  }
}

// Create a singleton instance
const requestStorage = new RequestStorage();

export default requestStorage;
export type { StoredRequest };
