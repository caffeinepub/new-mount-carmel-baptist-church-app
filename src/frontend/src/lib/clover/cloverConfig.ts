export interface CloverConfig {
  merchantId: string;
  apiBaseUrl: string;
  environment: 'sandbox' | 'production';
}

const STORAGE_KEY = 'clover_config';

const DEFAULT_CONFIG: CloverConfig = {
  merchantId: '',
  apiBaseUrl: 'https://api.clover.com',
  environment: 'sandbox',
};

export function loadCloverConfig(): CloverConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
      };
    }
  } catch (error) {
    console.warn('Failed to load Clover config:', error);
  }
  return DEFAULT_CONFIG;
}

export function saveCloverConfig(config: CloverConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.warn('Failed to save Clover config:', error);
  }
}
