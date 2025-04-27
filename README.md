# ReLink - URL Shortener with Statistics

ReLink is a simple URL shortener that stores link data and click statistics in CSV files.

## Features

- Shorten URLs with custom or random codes
- Track click statistics:
  - Total clicks
  - Clicks by country
  - Clicks by device
  - Clicks by browser
- CSV data storage without requiring a database

## How it Works

### Data Storage

All data is stored in CSV files located in the `data/` directory:

- `links.csv`: Stores information about shortened links
- `clicks.csv`: Stores click data with geolocation and device information

### Geolocation

The system uses a free API service (ipapi.co) to determine the country and city of visitors based on their IP address. When deployed on Cloudflare, it will also utilize Cloudflare's country headers when available.

## Development

### Prerequisites

- Node.js 14 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```

### Project Structure

- `src/`
  - `pages/`: Astro pages
  - `components/`: UI components
  - `utils/`: Utility functions
    - `csv.js`: CSV data handling
    - `links.js`: Link management functions
    - `url.js`: URL and request processing utils
  - `layouts/`: Page layouts
  - `data/`: CSV data files (created automatically)

## Deployment

The application can be deployed on any platform that supports Astro, such as Vercel, Netlify, or Cloudflare Pages.

When deployed on Cloudflare, the application will utilize Cloudflare's country headers for better geolocation accuracy.

## Licencia

Este proyecto está bajo la Licencia MIT. 