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

// Get geolocation info from IP using a free service
export async function getGeoInfo(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('cf-connecting-ip') || 
              '0.0.0.0';
    
    // Try Cloudflare headers first (only when deployed on Cloudflare)
    const cfCountry = request.headers.get('cf-ipcountry');
    if (cfCountry) {
      return {
        country: cfCountry,
        city: ''  // Cloudflare free tier doesn't provide city
      };
    }
    
    // If not on Cloudflare or header not available, use a free API
    // Note: In a production app, you might want to add rate limiting or caching
    if (ip && ip !== '0.0.0.0') {
      try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        if (response.ok) {
          const data = await response.json();
          return {
            country: data.country_name || data.country || '',
            city: data.city || ''
          };
        }
      } catch (apiError) {
        console.error('Error fetching geolocation data:', apiError);
      }
    }
    
    // Default fallback
    return {
      country: '',
      city: ''
    };
  } catch (error) {
    console.error('Error in getGeoInfo:', error);
    return {
      country: '',
      city: ''
    };
  }
} 