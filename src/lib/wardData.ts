import { Ward } from './types';

export async function loadWardData(): Promise<Ward[]> {
  try {
    // Use fetch for both client and server-side
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/data/wards.json`);
    const data = await response.json();
    return data.wards;
  } catch (error) {
    console.error('Error loading ward data:', error);
    return [];
  }
}

export async function getWardById(id: number): Promise<Ward | null> {
  const wards = await loadWardData();
  return wards.find(ward => ward.id === id) || null;
}

export async function searchWards(query: string): Promise<Ward[]> {
  const wards = await loadWardData();
  const lowercaseQuery = query.toLowerCase();
  
  return wards.filter(ward => 
    ward.name.toLowerCase().includes(lowercaseQuery) ||
    ward.alderman.name.toLowerCase().includes(lowercaseQuery) ||
    ward.alderman.platforms.some(platform => 
      platform.toLowerCase().includes(lowercaseQuery)
    )
  );
}
