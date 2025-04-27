import { nanoid } from 'nanoid';

// Generate a random short code for URLs
export function generateShortCode(length = 6) {
  return nanoid(length);
}

// Validate URL
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Get client info from request
export function getClientInfo(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('cf-connecting-ip') || 
             '0.0.0.0';
  
  // Basic browser detection
  const browserInfo = {
    browser: 'Unknown',
    os: 'Unknown',
    device: 'Unknown'
  };
  
  if (userAgent.includes('Firefox')) {
    browserInfo.browser = 'Firefox';
  } else if (userAgent.includes('Chrome')) {
    browserInfo.browser = 'Chrome';
  } else if (userAgent.includes('Safari')) {
    browserInfo.browser = 'Safari';
  } else if (userAgent.includes('Edge')) {
    browserInfo.browser = 'Edge';
  }
  
  if (userAgent.includes('Windows')) {
    browserInfo.os = 'Windows';
  } else if (userAgent.includes('Mac OS')) {
    browserInfo.os = 'Mac OS';
  } else if (userAgent.includes('Linux')) {
    browserInfo.os = 'Linux';
  } else if (userAgent.includes('Android')) {
    browserInfo.os = 'Android';
  } else if (userAgent.includes('iOS')) {
    browserInfo.os = 'iOS';
  }
  
  if (userAgent.includes('Mobile')) {
    browserInfo.device = 'Mobile';
  } else {
    browserInfo.device = 'Desktop';
  }
  
  return {
    ...browserInfo,
    ip,
    referer
  };
}

// Attempt to get geolocation info from Cloudflare
export function getGeoInfo(request) {
  // When deployed on Cloudflare, this data will be available
  const country = request.headers.get('cf-ipcountry') || '';
  const city = '';  // Cloudflare doesn't provide city in free tier
  
  return {
    country,
    city
  };
} 