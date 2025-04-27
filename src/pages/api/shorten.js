import { createShortLink } from '../../utils/links.js';
import { isValidUrl } from '../../utils/url.js';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { originalUrl, customCode } = body;
    
    // Validar la URL
    if (!originalUrl || !isValidUrl(originalUrl)) {
      return new Response(
        JSON.stringify({ error: 'Por favor, introduce una URL válida' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Validar el código personalizado si existe
    if (customCode && !/^[a-zA-Z0-9-_]+$/.test(customCode)) {
      return new Response(
        JSON.stringify({ 
          error: 'El código personalizado solo puede contener letras, números, guiones y guiones bajos' 
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Crear el enlace corto
    const result = await createShortLink(originalUrl, customCode);
    
    if (result.error) {
      return new Response(
        JSON.stringify({ error: result.error }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        id: result.id,
        shortCode: result.shortCode,
        originalUrl: result.originalUrl
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in shorten API:', error);
    
    return new Response(
      JSON.stringify({ error: 'Error al acortar el enlace' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 