import { Ward } from './types';
import fs from 'fs';
import path from 'path';

export async function loadWardDataServer(): Promise<Ward[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'wards.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.wards;
  } catch (error) {
    console.error('Error loading ward data:', error);
    return [];
  }
}

export async function getWardByIdServer(id: number): Promise<Ward | null> {
  const wards = await loadWardDataServer();
  return wards.find(ward => ward.id === id) || null;
}
