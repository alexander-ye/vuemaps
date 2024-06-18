import { logError } from './logger';

export async function fetchAsync(url: string) {
  try {
    return await fetch(url);
  } catch (err) {
    logError(err);
  }
}

export async function fetchJsonAsync(url: string) {
  try {
    const response = await fetchAsync(url);
    const data = await response?.json();
    return data;
  } catch (err) {
    logError(err);
  }
}
