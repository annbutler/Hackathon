import { Advertisement } from './types';

export async function loadAdData(): Promise<Advertisement[]> {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/data/advertisements.json`);
    const data = await response.json();
    return data.advertisements;
  } catch (error) {
    console.error('Error loading ad data:', error);
    return [];
  }
}

export async function getAdsByType(type: 'lawn-care' | 'child-care' | 'plumbing'): Promise<Advertisement[]> {
  const ads = await loadAdData();
  return ads.filter(ad => ad.type === type);
}

export async function getRandomAds(count: number = 3): Promise<Advertisement[]> {
  const ads = await loadAdData();
  const shuffled = ads.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
