/*
   ================================================
   DATA BASE (یہاں آپ کے 370 لنکس آئیں گے)
   ================================================
   نوٹ: 'thumb' میں تصویر کا لنک ڈالیں۔ اگر نہ ہو تو خالی چھوڑ دیں، سسٹم خودکار طریقے سے پلیس ہولڈر لگا دے گا۔
   کیٹیگریز کے نام PDF کے مطابق رکھے گئے ہیں:
   1. alamaat-sughra (علامات صغریٰ)
   2. alamaat-kubra (علامات کبریٰ)
   3. islami-taleemat (تعلیمات اسلامی)
   4. tareekh (تاریخ)
   5. taleem (ایجوکیشن)
   6. english-adab (انگلش ادب )
   7. technology ( ٹیکنالوجی)
   8. kids (کڈز سیکشن)
*/

const posts = [
    // --- SAMPLE DATA (یہاں اپنے 370 لنکس اسی فارمیٹ میں پیسٹ کریں) ---
    
    // SLIDER & FEATURED POSTS
    { title: "کیا آپ ﷺ کا دنیا سے تشریف لے جانا قیامت کی نشانی ہے؟", cat: "minor-signs", url: "posts/post1.html", thumb: "https://source.unsplash.com/random/800x600/?mosque", featured: true },
    { title: "فتنہ دجال: وہ 5 واقعات جو اس سے پہلے پیش آئیں گے", cat: "major-signs", url: "posts/post2.html", thumb: "https://source.unsplash.com/random/800x600/?desert", featured: true },
    { title: "سلطنت عثمانیہ کا زوال اور آج کا مسلمان", cat: "history", url: "posts/post3.html", thumb: "https://source.unsplash.com/random/800x600/?turkey", featured: true },

    // Minor Signs
    { title: "چاند کے دو ٹکڑے ہونے کی سائنسی و اسلامی حقیقت", cat: "minor-signs", url: "posts/moon.html", thumb: "" },
    { title: "صحابہ کرام کا دنیا سے رخصت ہونا ہمیں کیا درس دیتا ہے؟", cat: "minor-signs", url: "posts/sahaba.html", thumb: "" },

    // Major Signs
    { title: "مصائب دجال (حصہ اول): ایمان کیسے بچائیں؟", cat: "major-signs", url: "posts/dajjal1.html", thumb: "" },
    { title: "نزول عیسیٰ علیہ السلام اور یاجوج ماجوج", cat: "major-signs", url: "posts/isa.html", thumb: "" },
    { title: "دابہ الارض کا نکلنا: قرآن کی روشنی میں", cat: "major-signs", url: "posts/dabba.html", thumb: "" },

    // Islamic
    { title: "عصر حاضر کے 10 بڑے گناہ جن سے بچنا ضروری ہے", cat: "islamic", url: "posts/sins.html", thumb: "https://source.unsplash.com/random/300x200/?quran" },
    { title: "میں اور آپ اللہ کو کیسے پکاریں؟ دعا کے آداب", cat: "islamic", url: "posts/dua.html", thumb: "https://source.unsplash.com/random/300x200/?pray" },
    
    // History & Education
    { title: "مسلم تاریخ کی 50 اہم شخصیات - ابن سینا", cat: "history", url: "posts/ibn-sina.html", thumb: "" },
    { title: "ٹیپو سلطان: شیر میسور کی ان کہی داستان", cat: "history", url: "posts/tipu.html", thumb: "" },
    { title: "کورونا کی صورت میں بچوں کی تعلیم کیسے ممکن ہے؟", cat: "education", url: "posts/covid-edu.html", thumb: "" },
    { title: "آج کا استاد پریشان کیوں ہے؟ وجوہات اور حل", cat: "education", url: "posts/teacher.html", thumb: "" },

    // Technology
    { title: "آرٹیفیشل انٹیلیجنس کے نقصانات اور فوائد", cat: "tech", url: "posts/ai.html", thumb: "" },
    { title: "انگریزی ادب: شیکسپیئر کے ڈراموں کا تجزیہ", cat: "tech", url: "posts/lit.html", thumb: "" },

    // Kids
    { title: "ایک ننھی چیونٹی اور پیغمبر سلیمانؑ کی ملاقات", cat: "kids", url: "posts/ant.html", thumb: "" },
    { title: "ایمانداری بہترین پالیسی ہے: شیخ سعدی کی حکایت", cat: "kids", url: "posts/honesty.html", thumb: "" },
    { title: "کڈز کوئز: اسلامی معلومات عامہ", cat: "kids", url: "posts/quiz1.html", thumb: "" },
    { title: "جنگل کا بادشاہ کون؟ بچوں کی کہانی", cat: "kids", url: "posts/lion.html", thumb: "" },
];

/* ================= LOGIC START ================= */

// Helper: Get Image or Placeholder
const getImg = (p) => p.thumb ? p.thumb : 'https://placehold.co/600x400/0056b3/ffffff?text=BlogLovers';
const getCatName = (c) => {
    const map = {
        'minor-signs': 'علامات صغریٰ', 'major-signs': 'علامات کبریٰ', 'islamic': 'تعلیمات اسلامی',
        'history': 'تاریخ', 'education': 'تعلیم', 'tech': 'ٹیکنالوجی', 'kids': 'بچوں کی دنیا'
    };
    return map[c] || c;
};

// 1. Initialize Slider
function initSlider() {
    const sliderWrap = document.getElementById('main-slider');
    const featured = posts.filter(p => p.featured).slice(0, 5); // Take first 5 featured
    
    if(featured.length === 0) return; // if no featured posts

    let html = '';
    featured.forEach((p, index) => {
        html += `
        <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${getImg(p)}');">
            <div class="slide-caption">
                <span style="background:var(--gold); color:#000; padding:2px 8px; border-radius:3px;">${getCatName(p.cat)}</span>
                <a href="${p.url}"><h2>${p.title}</h2></a>
            </div>
        </div>`;
    });
    sliderWrap.innerHTML = html;
}

// Auto Move Slider
let currentSlide = 0;
function moveSlide(dir) {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + dir + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(() => moveSlide(1), 5000); // Change every 5 seconds

// 2. Load Categories
function loadSections() {
    // Generate Cards Helper
    const makeCard = (p, style) => {
        const img = getImg(p);
        if (style === 'grid') {
            return `
            <div class="news-card">
                <a href="${p.url}">
                    <div class="thumb" style="background-image: url('${img}')">
                        <span class="cat-tag">${getCatName(p.cat)}</span>
                    </div>
                </a>
                <div class="details">
                    <a href="${p.url}"><h3>${p.title}</h3></a>
                </div>
            </div>`;
        } else if (style === 'list') {
            return `
            <div class="news-card">
                <a href="${p.url}"><div class="thumb" style="background-image: url('${img}')"></div></a>
                <div class="details">
                    <a href="${p.url}"><h3>${p.title}</h3></a>
                    <span style="color:#888; font-size:0.8rem;">${getCatName(p.cat)}</span>
                </div>
            </div>`;
        } else if (style === 'simple') {
            return `<div class="item"><a href="${p.url}">${p.title}</a></div>`;
        }
    };

    // Filter & Render
    const render = (id, cat, style, limit=6) => {
        const items = posts.filter(p => p.cat === cat).slice(0, limit);
        const container = document.getElementById(id);
        if(container) container.innerHTML = items.map(p => makeCard(p, style)).join('');
    };

    render('sec-minor-signs', 'minor-signs', 'grid', 4);
    render('sec-major-signs', 'major-signs', 'grid', 6);
    render('sec-islamic', 'islamic', 'list', 5);
    render('sec-history', 'history', 'simple', 8);
    render('sec-education', 'education', 'simple', 8);
    render('sec-tech', 'tech', 'grid', 4);
    render('sec-kids', 'kids', 'grid', 4);
    
    // Popular in Sidebar (Random)
    const randoms = [...posts].sort(() => 0.5 - Math.random()).slice(0, 5);
    document.getElementById('sidebar-popular').innerHTML = randoms.map(p => makeCard(p, 'list')).join('');

    // Categories Widget
    const cats = [...new Set(posts.map(p => p.cat))];
    document.getElementById('sidebar-cats').innerHTML = cats.map(c => 
        `<li><a href="#">${getCatName(c)}</a> <span>${posts.filter(x=>x.cat===c).length}</span></li>`
    ).join('');

    // Dynamic Menu
    const menu = document.getElementById('main-menu');
    cats.forEach(c => {
        menu.innerHTML += `<li><a href="#">${getCatName(c)}</a></li>`;
    });

    // Ticker
    const ticker = document.getElementById('news-ticker');
    ticker.innerHTML = posts.slice(0,10).map(p => `<a href="${p.url}">${p.title}</a>`).join(' | ');
}

// 3. Search Function
function searchPosts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const box = document.getElementById('searchResultBox');
    if (input.length < 2) { box.style.display = 'none'; return; }
    
    const results = posts.filter(p => p.title.toLowerCase().includes(input));
    if (results.length > 0) {
        box.style.display = 'block';
        box.innerHTML = results.map(p => `<div class="search-item" onclick="location.href='${p.url}'">${p.title}</div>`).join('');
    } else {
        box.style.display = 'none';
    }
}

// Mobile Menu
function toggleMobileMenu() {
    document.querySelector('.menu').classList.toggle('active');
}

// Initialize
window.onload = function() {
    initSlider();
    loadSections();
};

