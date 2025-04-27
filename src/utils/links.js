import { nanoid } from 'nanoid';
import { generateShortCode, getClientInfo, getGeoInfo } from './url.js';
import { 
  addLink, 
  findLinkByShortCode, 
  findLinkById, 
  addClick, 
  getClicksByLinkId,
  readLinks
} from './csv.js';

// Create a new short link
export async function createShortLink(originalUrl, customCode = null) {
  try {
    const shortCode = customCode || generateShortCode();
    const id = nanoid();
    
    // Check if custom code already exists
    if (customCode) {
      const existingLink = findLinkByShortCode(customCode);
      if (existingLink) {
        return { error: 'Custom code already in use' };
      }
    }
    
    // Insert the new link
    const newLink = addLink({
      id,
      shortCode,
      originalUrl,
      createdAt: new Date().toISOString()
    });
    
    return newLink || { error: 'Failed to create short link' };
  } catch (error) {
    console.error('Error creating short link:', error);
    return { error: 'Failed to create short link' };
  }
}

// Find a link by its short code
export async function findLinkByCode(shortCode) {
  try {
    return findLinkByShortCode(shortCode);
  } catch (error) {
    console.error('Error finding link:', error);
    return null;
  }
}

// Record a click on a link
export async function recordClick(linkId, request) {
  try {
    const clientInfo = getClientInfo(request);
    const geoInfo = getGeoInfo(request);
    
    const id = nanoid();
    
    const newClick = addClick({
      id,
      linkId,
      timestamp: new Date().toISOString(),
      browser: clientInfo.browser,
      os: clientInfo.os,
      device: clientInfo.device,
      ip: clientInfo.ip,
      referrer: clientInfo.referer,
      country: geoInfo.country,
      city: geoInfo.city,
    });
    
    return newClick !== null;
  } catch (error) {
    console.error('Error recording click:', error);
    return false;
  }
}

// Get statistics for a link
export async function getLinkStats(linkId) {
  try {
    // Get all clicks for this link
    const clicks = getClicksByLinkId(linkId);
    
    if (!clicks || clicks.length === 0) {
      return {
        totalClicks: 0,
        clicksByCountry: [],
        clicksByBrowser: [],
        clicksByDevice: []
      };
    }
    
    // Get total clicks
    const totalClicks = clicks.length;
    
    // Get clicks by country
    const countryMap = new Map();
    clicks.forEach(click => {
      const country = click.country || 'Unknown';
      countryMap.set(country, (countryMap.get(country) || 0) + 1);
    });
    const clicksByCountry = Array.from(countryMap.entries()).map(([country, count]) => ({
      country,
      count
    }));
    
    // Get clicks by browser
    const browserMap = new Map();
    clicks.forEach(click => {
      const browser = click.browser || 'Unknown';
      browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
    });
    const clicksByBrowser = Array.from(browserMap.entries()).map(([browser, count]) => ({
      browser,
      count
    }));
    
    // Get clicks by device
    const deviceMap = new Map();
    clicks.forEach(click => {
      const device = click.device || 'Unknown';
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    });
    const clicksByDevice = Array.from(deviceMap.entries()).map(([device, count]) => ({
      device,
      count
    }));
    
    return {
      totalClicks,
      clicksByCountry,
      clicksByBrowser,
      clicksByDevice
    };
  } catch (error) {
    console.error('Error getting link stats:', error);
    return null;
  }
}

// Get all links
export async function getAllLinks() {
  try {
    return readLinks();
  } catch (error) {
    console.error('Error getting all links:', error);
    return [];
  }
} 