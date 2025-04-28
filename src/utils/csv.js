import { nanoid } from 'nanoid';

// Variables para almacenamiento en memoria durante la ejecución
let inMemoryLinks = [];
let inMemoryClicks = [];

// Helper function to parse CSV (sigue siendo útil para importación/exportación)
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

// Read links 
export function readLinks() {
  try {
    // Para una aplicación real, deberíamos obtener esto de Cloudflare D1 o KV
    // Esta implementación en memoria es solo para desarrollo
    
    // En producción real sería algo como:
    // const { results } = await env.DB.prepare('SELECT * FROM links').all();
    // return results;
    
    return inMemoryLinks;
  } catch (error) {
    console.error('Error reading links:', error);
    return [];
  }
}

// Add a new link
export function addLink(link) {
  try {
    const newLink = {
      ...link,
      createdAt: link.createdAt || new Date().toISOString()
    };
    
    // Almacenar en memoria para desarrollo
    inMemoryLinks.push(newLink);
    
    // En producción sería algo como:
    // await env.DB.prepare(
    //   'INSERT INTO links (id, shortCode, originalUrl, createdAt) VALUES (?, ?, ?, ?)'
    // ).bind(newLink.id, newLink.shortCode, newLink.originalUrl, newLink.createdAt).run();
    
    return newLink;
  } catch (error) {
    console.error('Error adding link:', error);
    return null;
  }
}

// Find a link by short code
export function findLinkByShortCode(shortCode) {
  try {
    // Para un entorno de producción:
    // const link = await env.DB.prepare('SELECT * FROM links WHERE shortCode = ?').bind(shortCode).first();
    // return link;
    
    return inMemoryLinks.find(link => link.shortCode === shortCode);
  } catch (error) {
    console.error('Error finding link by short code:', error);
    return null;
  }
}

// Find a link by ID
export function findLinkById(id) {
  try {
    // Para un entorno de producción:
    // const link = await env.DB.prepare('SELECT * FROM links WHERE id = ?').bind(id).first();
    // return link;
    
    return inMemoryLinks.find(link => link.id === id);
  } catch (error) {
    console.error('Error finding link by ID:', error);
    return null;
  }
}

// Read clicks
export function readClicks() {
  try {
    // Para un entorno de producción:
    // const { results } = await env.DB.prepare('SELECT * FROM clicks').all();
    // return results;
    
    return inMemoryClicks;
  } catch (error) {
    console.error('Error reading clicks:', error);
    return [];
  }
}

// Add a new click
export function addClick(click) {
  try {
    const newClick = {
      ...click,
      timestamp: click.timestamp || new Date().toISOString()
    };
    
    // Almacenar en memoria para desarrollo
    inMemoryClicks.push(newClick);
    
    // En producción sería algo como:
    // await env.DB.prepare(
    //   'INSERT INTO clicks (id, linkId, timestamp, browser, os, device, country, ...) VALUES (?, ?, ?, ?, ?, ?, ?, ...)'
    // ).bind(newClick.id, newClick.linkId, ...).run();
    
    return newClick;
  } catch (error) {
    console.error('Error adding click:', error);
    return null;
  }
}

// Get clicks for a specific link
export function getClicksByLinkId(linkId) {
  try {
    // Para un entorno de producción:
    // const { results } = await env.DB.prepare('SELECT * FROM clicks WHERE linkId = ?').bind(linkId).all();
    // return results;
    
    return inMemoryClicks.filter(click => click.linkId === linkId);
  } catch (error) {
    console.error('Error getting clicks by link ID:', error);
    return [];
  }
}

// No es necesario inicializar archivos CSV ya que usamos almacenamiento en memoria o DB
// Para inicializar datos de demo
export function initData() {
  if (inMemoryLinks.length === 0) {
    // Añadir algunos enlaces de demo si es necesario
    // inMemoryLinks.push({ id: 'demo1', shortCode: 'demo', originalUrl: 'https://example.com', createdAt: new Date().toISOString() });
  }
} 