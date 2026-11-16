const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const page = await fetch('https://commons.wikimedia.org/wiki/File:Saudi_Riyal_Symbol.svg');
    const matches = page.match(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[a-z0-9\/%._-]+\.svg/gi);
    console.log('Matches:', matches);
    if (matches && matches.length > 0) {
      const svgUrl = matches[0];
      console.log('Fetching SVG from:', svgUrl);
      const svgContent = await fetch(svgUrl);
      console.log('SVG Length:', svgContent.length);
      fs.writeFileSync('C:/Users/Ahmad/.gemini/antigravity/scratch/wateerah/official_saudi_riyal.svg', svgContent);
      console.log('Saved SVG!');
      console.log('First 500 chars:', svgContent.slice(0, 500));
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
