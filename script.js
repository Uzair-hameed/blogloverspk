/* 
   =========================================================
   DATA SOURCE
   =========================================================
*/
const rawData = `
source: alamaat-sughra
https://www.bloglovers.pk/2020/06/blog-post.html,https://www.bloglovers.pk/alamaat-sughra/aap-ka-is-dnya-main-tshryf-lana,آپ ﷺ کا اس دنیا میں تشریف لانا
https://www.bloglovers.pk/2020/06/2.html,https://www.bloglovers.pk/alamaat-sughra/ap-saw-ka-is-dunya-se-rukhasat-ho-jana,آپ ﷺ کا اس دنیا سے رخصت ہو جانا
https://www.bloglovers.pk/2020/06/3.html,https://www.bloglovers.pk/alamaat-sughra/chand-ke-do-tukre-ho-ne-ki-haqeeqat-kya-hai,چاند کے دو ٹکڑے ہونے کی حقیقت کیا ہے؟
https://www.bloglovers.pk/2020/06/4.html,https://www.bloglovers.pk/alamaat-sughra/shabh-kram-rzi-allah-anhm-ka-is-dnya-se-rkhst-ho-jana-hmyn-kya-drs-dyta-hai,صحابہ کرام کا اس دنیا سے رخصت ہو جانا ہمیں کیا درس دیتا ہے؟
https://www.bloglovers.pk/2020/06/blog-post_5.html,https://www.bloglovers.pk/alamaat-sughra/qblh-aol-byt-almqds-ki-fth-aur-is-ki-hqyqt,قبلہ اول (بیت المقدس) کی فتح اور اس کی حقیقت
source: alamaat-kubra
https://www.bloglovers.pk/2021/05/5.html,https://www.bloglovers.pk/alamaat-kubra/5-ese-kon-se-waqeat-pesh-aeen-ge-ftna-dajjal-se-qabl,5 ایسے کون سے واقعات پیش آئیں گے فتنہ دجال سے قبل
https://www.bloglovers.pk/2021/05/blog-post.html,https://www.bloglovers.pk/alamaat-kubra/msab-djal-hsh-aol,مصائب دجال (حصہ اول)
https://www.bloglovers.pk/2021/05/blog-post_11.html,https://www.bloglovers.pk/alamaat-kubra/msab-djal-hsh-dom,مصائب دجال (حصہ دوم)
https://www.bloglovers.pk/2021/05/blog-post_18.html,https://www.bloglovers.pk/alamaat-kubra/msab-djal-hsh-som,مصائب دجال (حصہ سوم)
source: islami-taleemat
https://www.bloglovers.pk/2021/08/blog-post_31.html,https://www.bloglovers.pk/islami-taleemat/ahkamat-e-sharai-libas-w-ahmiyat,احکامات شرعی لباس و اہمیت
https://www.bloglovers.pk/2022/06/10-1.html,https://www.bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-1-ghair-allah-ki-pukar,عصر حاضر کے 10 بڑے گناہ: 1- غیر اللہ کی پکار
https://www.bloglovers.pk/2022/06/10-2.html,https://www.bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-2-butt-parasti,عصر حاضر کے 10 بڑے گناہ: 2- بت پرستی
https://www.bloglovers.pk/2022/06/10-3.html,https://www.bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-3-murda-parasti,عصر حاضر کے 10 بڑے گناہ: 3- مردہ پرستی
source: azkar
https://www.bloglovers.pk/2022/06/blog-post.html,https://www.bloglovers.pk/azkar/main-aur-aap-allah-ko-kaise-na-pukareen,میں اور آپ اللہ کو کیسے نہ پکاریں
https://www.bloglovers.pk/2022/06/7.html,https://www.bloglovers.pk/azkar/7-aysi-rkaotyn-jn-se-daa-qbol-nahi-hoti,7 ایسی رکاوٹیں جن سے دعا قبول نہیں ہوتی
https://www.bloglovers.pk/2022/07/8.html,https://www.bloglovers.pk/azkar/8-ese-azkar-jin-ke-parhne-se-har-murad-puri-hoti-hai,8 ایسے اذکار جن کے پڑھنے سے ہر مراد پوری ہوتی ہے
https://www.bloglovers.pk/2025/06/blog-post.html,https://www.bloglovers.pk/azkar/hum-dua-mangne-mein-sust-kyun-ho-gaye-hain,ہم دعا مانگنے میں سست کیوں ہو گئے ہیں؟
source: taleem
https://www.bloglovers.pk/2020/06/blog-post_22.html,https://www.bloglovers.pk/taleem/krona-ki-sort-main-kmyonti-bysd-skolz-ke-bchon-ko-kaise-snbhalyn,کرونا کی صورت میں کمیونٹی سکولز کے بچوں کو کیسے سنبھالیں؟
https://www.bloglovers.pk/2020/07/blog-post.html,https://www.bloglovers.pk/taleem/door-e-hazir-ke-asatza-ko-kaisa-hona-chahiye,دورِ حاضر کے اساتذہ کو کیسا ہونا چاہیے؟
https://www.bloglovers.pk/2020/07/blog-post_16.html,https://www.bloglovers.pk/taleem/islam-mein-ustaad-ka-miyar-kya-hai,اسلام میں استاد کا معیار کیا ہے؟
source: english-adab
https://www.bloglovers.pk/2021/01/1837-1913.html,https://www.bloglovers.pk/english-adab/wktoryn-dor-part-wn-1837-1913,وکٹورین دور (حصہ اول) 1837-1913
https://www.bloglovers.pk/2021/01/1837-1914.html,https://www.bloglovers.pk/english-adab/wktoryn-dor-1837-1914-dosra-hsh,وکٹورین دور (حصہ دوم) 1837-1913
https://www.bloglovers.pk/2021/02/1837-1914.html,https://www.bloglovers.pk/english-adab/wktoryn-dor-1837-1914-hsh-som,وکٹورین دور (حصہ سوم) 1837-1913
source: technology
https://www.bloglovers.pk/2025/09/10.html,https://www.bloglovers.pk/technology/har-talib-e-ilm-ke-pas-ye-10-muft-tools-zaroor-hone-chahiye,ہر طالب علم کے پاس یہ 10 مفت ٹولز ضرور ہونے چاہئیں
https://www.bloglovers.pk/2025/09/blog-post_7.html,https://www.bloglovers.pk/technology/masnoi-zehnat-ka-ghalat-istemal-khatray-challenge-aur-rok-thaam-ki-jame-hikmat-amli,مصنوعی ذہانت کا غلط استعمال: خطرات، چیلنجز اور روک تھام
https://www.bloglovers.pk/2025/09/blog-post_13.html,https://www.bloglovers.pk/technology/tyknaloji-ki-dor-main-kya-pakstan-pychhe-rh-jae-ga,ٹیکنالوجی کی دوڑ میں کیا پاکستان پیچھے رہ جائے گا
source: tareekh
https://www.bloglovers.pk/2025/09/blog-post_4.html,https://www.bloglovers.pk/tareekh/taxila-se-nalanda-tak-ilm-ki-woh-shahrah-jis-par-chal-kar-dunya-bad-gai,ٹیکسلا سے نالندہ تک علم کی وہ شاہراہ
https://www.bloglovers.pk/2025/09/blog-post_6.html,https://www.bloglovers.pk/tareekh/suqoot-dhaka-woh-kon-si-ghaltiyan-thin-jinhon-ne-pakistan-ko-do-lakht-kiya,سقوط ڈھاکہ: وہ کون سی غلطیاں تھیں جنہوں نے پاکستان کو دولخت کیا؟
source: shakhsiyat
https://www.bloglovers.pk/2024/10/50-1-avicenna.html,https://www.bloglovers.pk/shakhsiyat/muslim-tareekh-ki-50-eham-shakhsiyat-1-ibn-e-sina-avicenna,مسلم تاریخ کی 50 اہم شخصیات: 1- ابن سینا
https://www.bloglovers.pk/2024/10/50-2_26.html,https://www.bloglovers.pk/shakhsiyat/mslm-tarykh-ki-50-ahm-shkhsyat-2-abn-alnfys,مسلم تاریخ کی 50 اہم شخصیات: 2- ابن النفیس
source: mazameen
https://www.bloglovers.pk/2020/12/blog-post_10.html,https://www.bloglovers.pk/mazameen/musalmanon-ne-apna-waqar-kaise-khoya,مسلمانوں نے اپنا وقار کیسے کھویا؟
https://www.bloglovers.pk/2021/04/blog-post_2.html,https://www.bloglovers.pk/mazameen/ek-jhalak-aflatoon-aur-arastoo-ke-falsafa-par,ایک جھلک افلاطون اور ارسطو کے فلسفہ پر
source: aqwal
https://www.bloglovers.pk/2024/10/50.html,https://www.bloglovers.pk/aqwal/taleem-ki-roshni-par-50-aqwal-zareen,تعلیم کی روشنی پر 50 اقوال زریں
https://www.bloglovers.pk/2025/09/10_10.html,https://www.bloglovers.pk/aqwal/dyjytl-gmrahi-aur-aqbal-ki-rhnmai-aaj-ke-nojoan-ke-lye-10-bhtryn-hkmt-amlyantxt,ڈیجیٹل گمراہی اور اقبال کی رہنمائی: آج کے نوجوان کے لئے 10 حکمت عملی
source: kids
https://www.bloglovers.pk/2022/12/10.html,https://www.bloglovers.pk/kids/bachchon-ke-liye-akbar-birbal-ki-10-behtareen-kahaniyan,بچوں کے لیے اکبر بیربل کی 10 بہترین کہانیاں
https://www.bloglovers.pk/2024/07/blog-post.html,https://www.bloglovers.pk/kids/billi-khala-ki-aakhri-maham,بلی خالہ کی آخری مہم
source: islami-sawalat
https://www.bloglovers.pk/2024/10/50_25.html,https://www.bloglovers.pk/islami-sawalat/quran-majeed-par-50-dilchasp-sawalat,قرآن مجید پر 50 دلچسپ سوالات
https://www.bloglovers.pk/2024/10/50_29.html,https://www.bloglovers.pk/islami-sawalat/namaz-ki-ahmiyat-par-mabni-50-sawalat,نماز کی اہمیت پر 50 سوالات
source: motivation
https://www.bloglovers.pk/2024/10/50_56.html,https://www.bloglovers.pk/motivation/hausla-afzai-ke-50-paighamaat,حوصلہ افزائی کے 50 پیغامات
`;

/* 
   =========================================================
   LOGIC & CONFIGURATION
   =========================================================
*/

const sectionsConfig = [
    { key: 'alamaat-sughra', title: 'علامات صغریٰ', type: 'grid', color: '#e67e22' },
    { key: 'alamaat-kubra', title: 'علامات کبریٰ', type: 'grid', color: '#c0392b' },
    { key: 'islami-taleemat', title: 'اسلامی تعلیمات', type: 'list', color: '#27ae60' },
    { key: 'azkar', title: 'اذکار نافعہ', type: 'list', color: '#16a085' },
    { key: 'taleem', title: 'ایجوکیشن', type: 'list', color: '#2980b9' },
    { key: 'english-adab', title: 'انگریزی ادب', type: 'list', color: '#8e44ad' },
    { key: 'technology', title: 'ٹیکنالوجی', type: 'grid', color: '#f1c40f' },
    { key: 'tareekh', title: 'تاریخ', type: 'list', color: '#d35400' },
    { key: 'shakhsiyat', title: 'اہم شخصیات', type: 'list', color: '#7f8c8d' },
    { key: 'mazameen', title: 'جنرل ڈسکشن', type: 'list', color: '#34495e' },
    { key: 'aqwal', title: 'اقوال زریں', type: 'list', color: '#9b59b6' },
    { key: 'kids', title: 'کڈز سیکشن', type: 'grid', color: '#e91e63' },
    { key: 'islami-sawalat', title: 'اسلامی سوالات گیم', type: 'grid', color: '#e74c3c' },
    { key: 'motivation', title: 'موٹیویشنل تحریریں', type: 'grid', color: '#2ecc71' }
];

// 1. Parsing Data
const posts = [];
let currentCategoryKey = '';

rawData.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return;
    if (line.toLowerCase().startsWith('source:')) {
        currentCategoryKey = line.split(':')[1].trim();
    } else {
        const parts = line.split(',');
        if (parts.length >= 3 && currentCategoryKey) {
            posts.push({
                oldUrl: parts[0],
                newUrl: parts[1],
                title: parts.slice(2).join(','),
                categoryKey: currentCategoryKey
            });
        }
    }
});

// 2. Generate Menu (Fixed Dropdown Logic)
const menuContainer = document.getElementById('mainMenu');
const dropdownLimit = 6;
const menuItems = sectionsConfig.map(s => ({ key: s.key, title: s.title }));

// Add initial items
menuItems.forEach((item, index) => {
    if (index < dropdownLimit) {
        menuContainer.innerHTML += `<li><a href="#sec-${item.key}">${item.title}</a></li>`;
    }
});

// Add Dropdown for "More"
if (menuItems.length > dropdownLimit) {
    // Note the class "dropdown" on the LI
    let dropHtml = `
    <li class="dropdown">
        <a href="javascript:void(0)">مزید <i class="fas fa-caret-down"></i></a>
        <ul class="dropdown-content">
    `;
    
    for (let i = dropdownLimit; i < menuItems.length; i++) {
        dropHtml += `<li><a href="#sec-${menuItems[i].key}">${menuItems[i].title}</a></li>`;
    }
    dropHtml += `</ul></li>`;
    menuContainer.innerHTML += dropHtml;
}

// 3. Generate Slider (Random 5)
const sliderContainer = document.getElementById('slider');
const randomPosts = [...posts].sort(() => 0.5 - Math.random()).slice(0, 5);

randomPosts.forEach((post, index) => {
    const config = sectionsConfig.find(c => c.key === post.categoryKey) || {title:'General', color:'#333'};
    const slide = document.createElement('div');
    slide.className = index === 0 ? 'slide active' : 'slide';
    slide.innerHTML = `
        <div style="width:100%; height:100%; background:${config.color}; display:flex; justify-content:center; align-items:center;">
            <i class="fas fa-newspaper" style="font-size:80px; color:rgba(255,255,255,0.3)"></i>
        </div>
        <div class="slide-content">
            <span class="cat-badge">${config.title}</span>
            <h2><a href="${post.newUrl}" style="color:#fff">${post.title}</a></h2>
        </div>
    `;
    sliderContainer.appendChild(slide);
});

// Slider Auto Move
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
if(slides.length > 0) {
    setInterval(() => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    }, 4000);
}

// 4. Generate Main Content (14 Sections)
const mainContentArea = document.getElementById('mainContentArea');

sectionsConfig.forEach((section) => {
    const sectionPosts = posts.filter(p => p.categoryKey === section.key).slice(0, 4);
    
    const sectionDiv = document.createElement('section');
    sectionDiv.id = `sec-${section.key}`;
    
    let html = `
        <div class="section-header">
            <h2>${section.title}</h2>
            <a href="#" style="font-size:0.8em; color:#fff;">مزید دیکھیں</a>
        </div>
    `;

    if (section.type === 'grid') {
        html += `<div class="grid-style">`;
        sectionPosts.forEach(post => {
            html += `
                <div class="post-card">
                    <div class="thumb-placeholder" style="background:${section.color}">
                        <i class="fas fa-book-open" style="opacity:0.5; font-size:40px;"></i>
                    </div>
                    <div class="post-info">
                        <a href="${post.newUrl}" class="post-title">${post.title}</a>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += `<div class="list-style">`;
        sectionPosts.forEach(post => {
            html += `
                <div class="list-item">
                    <div class="list-thumb" style="background:${section.color}">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="list-info" style="flex:1; padding-left:10px;">
                        <a href="${post.newUrl}"><h3 style="font-size:15px; font-weight:bold;">${post.title}</h3></a>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    }

    sectionDiv.innerHTML = html;
    mainContentArea.appendChild(sectionDiv);
});

// 5. Sidebar & Footer Populators

// Fixed Ticker Populator
const ticker = document.getElementById('tickerContent');
// Taking latest 10 posts
posts.slice(0, 10).forEach(post => {
    // Add spaces for ticker separation
    const span = document.createElement('span');
    span.className = 'ticker-item';
    span.innerHTML = `<a href="${post.newUrl}">${post.title}</a> &nbsp;&nbsp;&bull;&nbsp;&nbsp; `;
    ticker.appendChild(span);
});

// Popular Posts
const popContainer = document.getElementById('popularPosts');
posts.slice(0, 5).forEach(post => {
    const config = sectionsConfig.find(c => c.key === post.categoryKey);
    popContainer.innerHTML += `
        <div style="display:flex; gap:10px; margin-bottom:10px; align-items:center;">
            <div style="width:50px; height:40px; background:${config ? config.color : '#333'}; border-radius:3px;"></div>
            <a href="${post.newUrl}" style="font-size:13px; font-weight:bold; line-height:1.2;">${post.title}</a>
        </div>
    `;
});

// Labels
const labelsContainer = document.getElementById('labelsCloud');
sectionsConfig.forEach(s => {
    labelsContainer.innerHTML += `<a href="#sec-${s.key}">${s.title}</a>`;
});

// Footer Best
const footerBest = document.getElementById('footerBestPosts');
posts.slice(5, 9).forEach(post => {
    footerBest.innerHTML += `<div style="border-bottom:1px solid #333; padding:5px 0;"><a href="${post.newUrl}">${post.title}</a></div>`;
});

// 6. Functionality (Dark Mode, Date, Mobile Menu)
document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.querySelector('#theme-toggle i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('mainMenu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
    }
});

const d = new Date();
const months = ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"];
const days = ["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"];
document.getElementById('dateDisplay').innerText = `${days[d.getDay()]}، ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
