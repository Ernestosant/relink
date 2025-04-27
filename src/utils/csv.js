import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define paths to CSV files
const dataFolder = path.join(__dirname, '..', '..', 'data');
const linksFilePath = path.join(dataFolder, 'links.csv');
const clicksFilePath = path.join(dataFolder, 'clicks.csv');

// Ensure data directory exists
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

// Initialize CSV files if they don't exist
export function initCSVFiles() {
  // Create links.csv if it doesn't exist
  if (!fs.existsSync(linksFilePath)) {
    fs.writeFileSync(linksFilePath, 'id,shortCode,originalUrl,createdAt\n');
  }
  
  // Create clicks.csv if it doesn't exist
  if (!fs.existsSync(clicksFilePath)) {
    fs.writeFileSync(clicksFilePath, 'id,linkId,timestamp,country,city,browser,os,device,referrer,ip\n');
  }
}

// Helper function to parse CSV
export function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
  });
}

// Helper function to serialize object to CSV row
export function serializeToCSV(obj, headers) {
  return headers.map(header => {
    const value = obj[header] || '';
    // Escape commas in the value
    return value.toString().includes(',') ? `"${value}"` : value;
  }).join(',');
}

// Read links from CSV
export function readLinks() {
  try {
    if (!fs.existsSync(linksFilePath)) {
      return [];
    }
    
    const csvContent = fs.readFileSync(linksFilePath, 'utf-8');
    return parseCSV(csvContent);
  } catch (error) {
    console.error('Error reading links from CSV:', error);
    return [];
  }
}

// Add a new link to CSV
export function addLink(link) {
  try {
    const headers = ['id', 'shortCode', 'originalUrl', 'createdAt'];
    const newLink = {
      ...link,
      createdAt: link.createdAt || new Date().toISOString()
    };
    
    const newRow = serializeToCSV(newLink, headers);
    fs.appendFileSync(linksFilePath, `${newRow}\n`);
    
    return newLink;
  } catch (error) {
    console.error('Error adding link to CSV:', error);
    return null;
  }
}

// Find a link by short code
export function findLinkByShortCode(shortCode) {
  try {
    const links = readLinks();
    return links.find(link => link.shortCode === shortCode);
  } catch (error) {
    console.error('Error finding link by short code:', error);
    return null;
  }
}

// Find a link by ID
export function findLinkById(id) {
  try {
    const links = readLinks();
    return links.find(link => link.id === id);
  } catch (error) {
    console.error('Error finding link by ID:', error);
    return null;
  }
}

// Read clicks from CSV
export function readClicks() {
  try {
    if (!fs.existsSync(clicksFilePath)) {
      return [];
    }
    
    const csvContent = fs.readFileSync(clicksFilePath, 'utf-8');
    return parseCSV(csvContent);
  } catch (error) {
    console.error('Error reading clicks from CSV:', error);
    return [];
  }
}

// Add a new click to CSV
export function addClick(click) {
  try {
    const headers = ['id', 'linkId', 'timestamp', 'country', 'city', 'browser', 'os', 'device', 'referrer', 'ip'];
    const newClick = {
      ...click,
      timestamp: click.timestamp || new Date().toISOString()
    };
    
    const newRow = serializeToCSV(newClick, headers);
    fs.appendFileSync(clicksFilePath, `${newRow}\n`);
    
    return newClick;
  } catch (error) {
    console.error('Error adding click to CSV:', error);
    return null;
  }
}

// Get clicks for a specific link
export function getClicksByLinkId(linkId) {
  try {
    const clicks = readClicks();
    return clicks.filter(click => click.linkId === linkId);
  } catch (error) {
    console.error('Error getting clicks by link ID:', error);
    return [];
  }
}

// Initialize CSV files on module import
initCSVFiles(); 