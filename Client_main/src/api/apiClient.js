import axios from 'axios';

const getBaseUrl = () => {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || 
                      hostname === '127.0.0.1' ||
                      hostname === '' ||
                      hostname.startsWith('192.168.') ||
                      hostname.startsWith('10.') ||
                      hostname.startsWith('172.') || hostname === '0.0.0.0';
  const isProduction = !isLocalhost;
  const isHttps = window.location.protocol === 'https:';
  
  // Check for environment variable first (works in both dev and production)
  if (import.meta.env.VITE_API_BASE_URL) {
    let apiUrl = import.meta.env.VITE_API_BASE_URL.trim().replace(/\/$/, '');
    
    // 🔒 CRITICAL: Convert HTTP to HTTPS in production to avoid mixed content blocking
    if (isProduction && isHttps && apiUrl.startsWith('http://')) {
      console.warn('[API] ⚠️ Converting HTTP to HTTPS to avoid mixed content blocking');
      apiUrl = apiUrl.replace('http://', 'https://');
    }
    
    console.log('[API] Using env var:', apiUrl);
    return apiUrl;
  }
  
  
  // 🔑 PRODUCTION: Use proxy if no env var is set
  console.warn('[API] No VITE_API_BASE_URL set, using /api proxy');
  return '/api';
};

const PUBLIC_BASE_URL = getBaseUrl();

console.log('🌐 API Base URL:', PUBLIC_BASE_URL);
console.log('🏠 Hostname:', window.location.hostname);

const publicClient = axios.create({
  baseURL: PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor
publicClient.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method?.toUpperCase(), config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
publicClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    // Helpful debugging
    if (error.code === 'ERR_NETWORK') {
      console.error('💡 Network error - possible causes:');
      console.error('   - CORS issue');
      console.error('   - API server down');
      console.error('   - Wrong URL');
    }
    
    return Promise.reject(error);
  }
);

export { publicClient };
