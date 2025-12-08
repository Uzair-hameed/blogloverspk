// sitemap-generator.js
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://bloglovers.pk';
const DATE_TODAY = '2024-12-09'; // آج کی تاریخ

// 14 categories کے URLs
const categories = [
  { name: 'alamaat-sughra', priority: '0.9' },
  { name: 'alamaat-kubra', priority: '0.9' },
  { name: 'islami-taleemat', priority: '0.9' },
  { name: 'azkar', priority: '0.9' },
  { name: 'taleem', priority: '0.9' },
  { name: 'mazameen', priority: '0.9' },
  { name: 'english-adab', priority: '0.9' },
  { name: 'technology', priority: '0.9' },
  { name: 'kids', priority: '0.9' },
  { name: 'aqwal', priority: '0.9' },
  { name: 'islami-sawalat', priority: '0.9' },
  { name: 'motivation', priority: '0.9' },
  { name: 'tareekh', priority: '0.9' },
  { name: 'shakhsiyat', priority: '0.9' }
];

// Static pages
const staticPages = [
  { url: '/', name: 'Home', priority: '1.0', changefreq: 'daily' },
  { url: '/about.html', name: 'About', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact.html', name: 'Contact', priority: '0.7', changefreq: 'monthly' }
];

// Redirects سے تمام posts کے URLs extract کریں
function extractUrlsFromRedirects() {
  const urls = [];
  
  try {
    // پہلے vercel.json سے
    const vercelContent = fs.readFileSync('vercel.json', 'utf8');
    const vercelData = JSON.parse(vercelContent);
    
    if (vercelData.redirects && Array.isArray(vercelData.redirects)) {
      vercelData.redirects.forEach(redirect => {
        if (redirect.destination && redirect.destination.startsWith('/')) {
          const date = extractDateFromSource(redirect.source);
          urls.push({
            url: redirect.destination,
            date: date,
            priority: '0.7',
            changefreq: 'monthly'
          });
        }
      });
    }
    
    // پھر _redirects.txt سے
    if (fs.existsSync('_redirects')) {
      const redirectsContent = fs.readFileSync('_redirects', 'utf8');
      const lines = redirectsContent.split('\n');
      
      lines.forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#') && line.includes('301')) {
          const parts = line.split(/\s+/);
          if (parts.length >= 3 && parts[2].startsWith('/')) {
            const date = extractDateFromSource(parts[0]);
            urls.push({
              url: parts[2],
              date: date,
              priority: '0.7',
              changefreq: 'monthly'
            });
          }
        }
      });
    }
  } catch (error) {
    console.log('⚠️ Redirects نہیں ملے، static URLs استعمال کر رہا ہوں');
  }
  
  // Remove duplicates
  const uniqueUrls = [];
  const seen = new Set();
  
  urls.forEach(item => {
    if (!seen.has(item.url)) {
      seen.add(item.url);
      uniqueUrls.push(item);
    }
  });
  
  return uniqueUrls;
}

// Source URL سے تاریخ extract کریں
function extractDateFromSource(source) {
  const dateMatch = source.match(/\/(\d{4})\/(\d{2})\//);
  if (dateMatch) {
    return `${dateMatch[1]}-${dateMatch[2]}-01`;
  }
  return DATE_TODAY;
}

// XML generate کریں
function generateXML() {
  console.log('🚀 Complete sitemap generator چل رہا ہے...');
  
  const posts = extractUrlsFromRedirects();
  const totalPosts = posts.length;
  
  console.log(`✅ ${totalPosts} posts مل گئے`);
  console.log(`✅ ${categories.length} categories`);
  console.log(`✅ ${staticPages.length} static pages`);
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  // 1. Static pages
  console.log('📄 Static pages شامل کر رہا ہوں...');
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${DATE_TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });
  
  // 2. Categories pages
  console.log('📂 Categories شامل کر رہا ہوں...');
  categories.forEach(cat => {
    xml += `  <url>
    <loc>${DOMAIN}/${cat.name}</loc>
    <lastmod>${DATE_TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${cat.priority}</priority>
  </url>
`;
  });
  
  // 3. All posts
  console.log(`📝 ${totalPosts} posts شامل کر رہا ہوں...`);
  let count = 0;
  posts.forEach(post => {
    xml += `  <url>
    <loc>${DOMAIN}${post.url}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>${post.changefreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>
`;
    count++;
    if (count % 50 === 0) {
      console.log(`   ✅ ${count}/${totalPosts} posts شامل ہو چکے`);
    }
  });
  
  xml += `</urlset>`;
  
  return { xml, stats: { totalPosts, categories: categories.length, staticPages: staticPages.length } };
}

// Main function
function main() {
  const { xml, stats } = generateXML();
  
  // public folder میں save کریں
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  
  // Summary بنائیں
  const summary = `# SITEMAP SUMMARY

Generated on: ${new Date().toLocaleString()}
Total URLs: ${stats.totalPosts + stats.categories + stats.staticPages}
- Static pages: ${stats.staticPages}
- Categories: ${stats.categories}
- Posts: ${stats.totalPosts}

Sitemap URL: ${DOMAIN}/sitemap.xml
XML Size: ${Math.round(xml.length / 1024)} KB

📊 CATEGORIES INCLUDED:
${categories.map(c => `  • ${c.name}`).join('\n')}

✅ Sitemap successfully generated!`;
  
  console.log('\n' + summary);
  console.log(`\n🔗 Sitemap URL: ${DOMAIN}/sitemap.xml`);
  console.log(`📁 Location: ${path.join(publicDir, 'sitemap.xml')}`);
}

// Run the script
main();
