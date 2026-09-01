<!DOCTYPE html>
<html lang="ur" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>بلاگ لوورز.pk - اردو علمی پلیٹ فارم</title>
    <meta name="description" content="بلاگ لوورز.pk - 380+ مفت اردو مضامین، اسلامی تعلیمات، تاریخ، ادب، ٹیکنالوجی اور بچوں کی کہانیاں" />
    <meta name="keywords" content="اردو بلاگ, اسلامی مضامین, علامات صغری, علامات کبری, اذکار, تعلیم, تاریخ, بچوں کی کہانیاں, بلاگ لوورز" />
    <meta name="author" content="Uzair Hameed" />
    <meta property="og:title" content="بلاگ لوورز.pk - اردو علمی پلیٹ فارم" />
    <meta property="og:description" content="380+ مفت اردو مضامین - اسلامی تعلیمات، تاریخ، ادب، ٹیکنالوجی اور بچوں کی کہانیاں" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bloglovers.pk" />

    <!-- صرف اردو فونٹس -->
    <style>
        /* ===== RESET & BASE ===== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Alvi Nastaleeq', 'Arial', serif;
            background: #0a0e17;
            color: #e8edf3;
            line-height: 2.2;
            padding: 1.5rem;
            font-size: 1.1rem;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border-radius: 32px;
            padding: 2.5rem 2rem;
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
        }

        /* ===== TYPOGRAPHY ===== */
        h1, h2, h3 {
            font-weight: 700;
            letter-spacing: -0.02em;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
        }

        a {
            color: #00e676;
            text-decoration: none;
            transition: 0.3s;
        }
        a:hover {
            color: #ff6b35;
            text-shadow: 0 0 25px rgba(255, 107, 53, 0.3);
        }

        /* ===== HEADER ===== */
        .header {
            text-align: center;
            padding: 1.5rem 0 0.5rem;
        }

        .header h1 {
            font-size: 3.8rem;
            background: linear-gradient(135deg, #00e676, #ff6b35);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
            animation: glowPulse 3s ease-in-out infinite;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
        }

        @keyframes glowPulse {
            0%, 100% { filter: drop-shadow(0 0 15px rgba(0, 230, 118, 0.25)); }
            50% { filter: drop-shadow(0 0 40px rgba(255, 107, 53, 0.5)); }
        }

        .header .subtitle {
            font-size: 1.3rem;
            color: #94a3b8;
            margin-top: 0.3rem;
        }

        /* ===== TYPEWRITER ===== */
        .typewriter-container {
            text-align: center;
            font-size: 1.6rem;
            font-weight: 600;
            padding: 1.5rem 0;
            min-height: 85px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
        }

        .typewriter-container .static-text {
            color: #94a3b8;
        }

        .typewriter-container .dynamic-text {
            color: #00e676;
            border-left: 3px solid #ff6b35;
            padding-right: 8px;
            animation: blink 0.7s step-end infinite;
            white-space: nowrap;
            overflow: hidden;
        }

        @keyframes blink {
            0%, 100% { border-color: #ff6b35; }
            50% { border-color: transparent; }
        }

        /* ===== BADGES ===== */
        .badge-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.8rem;
            padding: 1.5rem 0;
        }

        .badge {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.6rem 1.4rem;
            border-radius: 50px;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
            color: #e4e7ec;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
        }

        .badge:hover {
            transform: translateY(-3px) scale(1.03);
            border-color: #00e676;
            box-shadow: 0 10px 30px rgba(0, 230, 118, 0.15);
        }

        .badge .icon { margin-left: 6px; }

        /* ===== STATS CARDS ===== */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1.2rem;
            padding: 2rem 0;
        }

        .stat-card {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
            border-radius: 24px;
            padding: 1.8rem 1rem;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            cursor: default;
        }

        .stat-card:hover {
            transform: translateY(-8px) scale(1.02);
            border-color: rgba(0, 230, 118, 0.3);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
        }

        .stat-card .number {
            font-size: 2.8rem;
            font-weight: 800;
            background: linear-gradient(135deg, #00e676, #ff6b35);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
        }

        .stat-card .label {
            color: #94a3b8;
            font-size: 0.95rem;
            margin-top: 0.3rem;
        }

        /* ===== TABLE OF CONTENTS ===== */
        .toc-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.8rem;
            padding: 1rem 0;
        }

        .toc-item {
            background: rgba(255, 255, 255, 0.03);
            padding: 0.8rem 1.2rem;
            border-radius: 16px;
            border-right: 4px solid #00e676;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .toc-item:hover {
            background: rgba(0, 230, 118, 0.08);
            transform: translateX(-6px);
            border-right-color: #ff6b35;
        }

        .toc-item .cat-name {
            color: #e4e7ec;
            font-weight: 500;
        }

        .toc-item .cat-count {
            background: rgba(255, 255, 255, 0.06);
            padding: 0.2rem 0.8rem;
            border-radius: 50px;
            font-size: 0.75rem;
            color: #94a3b8;
        }

        /* ===== SECTION ===== */
        .section {
            padding: 2.5rem 0 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .section:last-child {
            border-bottom: none;
        }

        .section-title {
            font-size: 2rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
        }

        .section-title .emoji {
            font-size: 2.2rem;
        }

        .section-title .highlight {
            background: linear-gradient(135deg, #00e676, #ff6b35);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .section-title .count-badge {
            font-size: 0.9rem;
            color: #94a3b8;
            font-weight: 400;
            background: rgba(255,255,255,0.05);
            padding: 0.1rem 1rem;
            border-radius: 50px;
            -webkit-text-fill-color: #94a3b8;
        }

        /* ===== ARTICLE LIST ===== */
        .article-grid {
            display: grid;
            gap: 0.5rem;
        }

        .article-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.7rem 1rem;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 14px;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .article-row:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(0, 230, 118, 0.15);
            transform: translateX(-4px);
        }

        .article-row .title {
            color: #e4e7ec;
            font-weight: 400;
            flex: 1;
            min-width: 150px;
        }

        .article-row .link {
            background: rgba(0, 230, 118, 0.12);
            padding: 0.2rem 1rem;
            border-radius: 50px;
            font-size: 0.8rem;
            color: #00e676;
            transition: 0.3s;
            white-space: nowrap;
        }

        .article-row .link:hover {
            background: #00e676;
            color: #0a0e17;
        }

        .view-more {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.6rem 1.8rem;
            border: 1px solid rgba(0, 230, 118, 0.3);
            border-radius: 50px;
            color: #00e676;
            font-weight: 500;
            transition: 0.3s;
        }

        .view-more:hover {
            background: #00e676;
            color: #0a0e17;
            border-color: #00e676;
        }

        /* ===== FEATURES ===== */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 1rem;
            padding: 1rem 0;
        }

        .feature-item {
            background: rgba(255, 255, 255, 0.03);
            padding: 1.2rem;
            border-radius: 20px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: 0.3s;
        }

        .feature-item:hover {
            border-color: #ff6b35;
            transform: scale(1.02);
        }

        .feature-item .f-icon { font-size: 2rem; }
        .feature-item .f-label { font-weight: 600; margin-top: 0.3rem; }
        .feature-item .f-desc { color: #94a3b8; font-size: 0.85rem; }

        /* ===== QUICK START ===== */
        .quick-steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            padding: 1rem 0;
        }

        .step {
            background: linear-gradient(145deg, rgba(0, 230, 118, 0.06), rgba(255, 107, 53, 0.06));
            padding: 1.5rem 1rem;
            border-radius: 24px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: 0.3s;
        }

        .step:hover {
            transform: translateY(-5px);
            border-color: rgba(0, 230, 118, 0.2);
        }

        .step .step-num {
            font-size: 2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #00e676, #ff6b35);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .step .step-label { font-weight: 600; margin-top: 0.3rem; }
        .step .step-desc { color: #94a3b8; font-size: 0.85rem; }

        /* ===== FOOTER ===== */
        .footer {
            text-align: center;
            padding: 2rem 0 0.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            margin-top: 2rem;
        }

        .footer .brand {
            font-size: 1.6rem;
            font-weight: 700;
            background: linear-gradient(135deg, #00e676, #ff6b35);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif;
        }

        .footer .socials {
            display: flex;
            justify-content: center;
            gap: 1rem;
            padding: 1rem 0;
            flex-wrap: wrap;
        }

        .footer .socials a {
            padding: 0.5rem 1.2rem;
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.06);
            font-size: 0.9rem;
            transition: 0.3s;
            color: #e4e7ec;
        }

        .footer .socials a:hover {
            background: rgba(0, 230, 118, 0.1);
            border-color: #00e676;
            transform: translateY(-3px);
        }

        .footer .credit {
            color: #4a5568;
            font-size: 0.85rem;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 640px) {
            .container { padding: 1.5rem 1rem; border-radius: 24px; }
            .header h1 { font-size: 2.4rem; }
            .typewriter-container { font-size: 1.1rem; min-height: 60px; }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .toc-grid { grid-template-columns: 1fr; }
            .article-row { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
            .section-title { font-size: 1.5rem; }
            .quick-steps { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 400px) {
            .stats-grid { grid-template-columns: 1fr 1fr; }
            .quick-steps { grid-template-columns: 1fr; }
            .badge-grid { gap: 0.4rem; }
            .badge { font-size: 0.75rem; padding: 0.4rem 0.8rem; }
        }

        /* ===== SCROLLBAR ===== */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0e17; }
        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #00e676, #ff6b35);
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover { background: #ff6b35; }
    </style>
</head>
<body>

<div class="container">

    <!-- ======== HEADER ======== -->
    <header class="header">
        <h1>📚 بلاگ لوورز.pk</h1>
        <p class="subtitle">آپ کا اردو علمی و معلوماتی پلیٹ فارم</p>
    </header>

    <!-- ======== TYPEWRITER ======== -->
    <div class="typewriter-container">
        <span class="static-text">✨</span>
        <span class="dynamic-text" id="typewriter"></span>
    </div>

    <!-- ======== BADGES ======== -->
    <div class="badge-grid">
        <span class="badge"><span class="icon">🎯</span> 380+ مضامین</span>
        <span class="badge"><span class="icon">📂</span> 14 کیٹگریز</span>
        <span class="badge"><span class="icon">🕌</span> اردو زبان</span>
        <span class="badge"><span class="icon">💰</span> مکمل مفت</span>
        <span class="badge"><span class="icon">📱</span> موبائل فرینڈلی</span>
        <span class="badge"><span class="icon">⚡</span> SEO آپٹمائزڈ</span>
    </div>

    <!-- ======== STATS ======== -->
    <div class="stats-grid">
        <div class="stat-card"><div class="number">380+</div><div class="label">کل مضامین</div></div>
        <div class="stat-card"><div class="number">14</div><div class="label">کیٹگریز</div></div>
        <div class="stat-card"><div class="number">107</div><div class="label">علامات صغریٰ</div></div>
        <div class="stat-card"><div class="number">100%</div><div class="label">مفت مواد</div></div>
        <div class="stat-card"><div class="number">اردو</div><div class="label">زبان</div></div>
        <div class="stat-card"><div class="number">⭐</div><div class="label">مستند حوالہ جات</div></div>
    </div>

    <!-- ======== TABLE OF CONTENTS ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">📑</span> <span class="highlight">کیٹگریز</span></h2>
        <div class="toc-grid">
            <div class="toc-item"><span class="cat-name">🕌 علامات صغریٰ</span><span class="cat-count">107</span></div>
            <div class="toc-item"><span class="cat-name">🌙 علامات کبریٰ</span><span class="cat-count">17</span></div>
            <div class="toc-item"><span class="cat-name">📖 اسلامی تعلیمات</span><span class="cat-count">150+</span></div>
            <div class="toc-item"><span class="cat-name">🤲 اذکار</span><span class="cat-count">6</span></div>
            <div class="toc-item"><span class="cat-name">🎓 تعلیم</span><span class="cat-count">28</span></div>
            <div class="toc-item"><span class="cat-name">✍️ مضامین</span><span class="cat-count">32</span></div>
            <div class="toc-item"><span class="cat-name">📚 انگریزی ادب</span><span class="cat-count">12</span></div>
            <div class="toc-item"><span class="cat-name">💻 ٹیکنالوجی</span><span class="cat-count">5</span></div>
            <div class="toc-item"><span class="cat-name">🧸 بچوں کی کہانیاں</span><span class="cat-count">8</span></div>
            <div class="toc-item"><span class="cat-name">💬 اقوال</span><span class="cat-count">2</span></div>
            <div class="toc-item"><span class="cat-name">❓ اسلامی سوالات</span><span class="cat-count">2</span></div>
            <div class="toc-item"><span class="cat-name">🔥 موٹیویشن</span><span class="cat-count">1</span></div>
            <div class="toc-item"><span class="cat-name">📜 تاریخ</span><span class="cat-count">8</span></div>
            <div class="toc-item"><span class="cat-name">👤 شخصیات</span><span class="cat-count">23</span></div>
        </div>
    </section>

    <!-- ================================================================ -->
    <!-- ======== علامات صغریٰ - 107 پوسٹس ======== -->
    <!-- ================================================================ -->
    <section class="section">
        <h2 class="section-title">
            <span class="emoji">🌟</span>
            <span class="highlight">علامات صغریٰ</span>
            <span class="count-badge">107 مضامین</span>
            <span style="font-size:1rem;color:#94a3b8;font-weight:400;">— قیامت کی چھوٹی نشانیاں</span>
        </h2>
        <div class="article-grid" id="alamaat-sughra-list">
            <!-- 107 پوسٹس JavaScript کے ذریعے ڈالی جائیں گی -->
        </div>
        <a href="https://bloglovers.pk/search/label/alamaat-sughra" class="view-more">➕ تمام 107 مضامین دیکھیں</a>
    </section>

    <!-- ======== علامات کبریٰ ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">🌙</span> <span class="highlight">علامات کبریٰ</span> <span class="count-badge">17 مضامین</span></h2>
        <div class="article-grid" id="alamaat-kubra-list"></div>
    </section>

    <!-- ======== اسلامی تعلیمات ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">📖</span> <span class="highlight">اسلامی تعلیمات</span> <span class="count-badge">150+ مضامین</span></h2>
        <div class="article-grid" id="islami-taleemat-list"></div>
        <a href="https://bloglovers.pk" class="view-more">➕ تمام مضامین دیکھیں</a>
    </section>

    <!-- ======== اذکار ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">🤲</span> <span class="highlight">اذکار</span> <span class="count-badge">6 مضامین</span></h2>
        <div class="article-grid" id="azkar-list"></div>
    </section>

    <!-- ======== تعلیم ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">🎓</span> <span class="highlight">تعلیم</span> <span class="count-badge">28 مضامین</span></h2>
        <div class="article-grid" id="taleem-list"></div>
    </section>

    <!-- ======== مضامین ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">✍️</span> <span class="highlight">مضامین</span> <span class="count-badge">32 مضامین</span></h2>
        <div class="article-grid" id="mazameen-list"></div>
    </section>

    <!-- ======== انگریزی ادب ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">📚</span> <span class="highlight">انگریزی ادب</span> <span class="count-badge">12 مضامین</span></h2>
        <div class="article-grid" id="english-adab-list"></div>
    </section>

    <!-- ======== ٹیکنالوجی ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">💻</span> <span class="highlight">ٹیکنالوجی</span> <span class="count-badge">5 مضامین</span></h2>
        <div class="article-grid" id="technology-list"></div>
    </section>

    <!-- ======== بچوں کی کہانیاں ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">🧸</span> <span class="highlight">بچوں کی کہانیاں</span> <span class="count-badge">8 مضامین</span></h2>
        <div class="article-grid" id="kids-list"></div>
    </section>

    <!-- ======== اقوال ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">💬</span> <span class="highlight">اقوال</span> <span class="count-badge">2 مضامین</span></h2>
        <div class="article-grid" id="aqwal-list"></div>
    </section>

    <!-- ======== اسلامی سوالات ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">❓</span> <span class="highlight">اسلامی سوالات</span> <span class="count-badge">2 مضامین</span></h2>
        <div class="article-grid" id="islami-sawalat-list"></div>
    </section>

    <!-- ======== موٹیویشن ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">🔥</span> <span class="highlight">موٹیویشن</span> <span class="count-badge">1 مضمون</span></h2>
        <div class="article-grid" id="motivation-list"></div>
    </section>

    <!-- ======== تاریخ ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">📜</span> <span class="highlight">تاریخ</span> <span class="count-badge">8 مضامین</span></h2>
        <div class="article-grid" id="tareekh-list"></div>
    </section>

    <!-- ======== شخصیات ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">👤</span> <span class="highlight">شخصیات</span> <span class="count-badge">23 مضامین</span></h2>
        <div class="article-grid" id="shakhsiyat-list"></div>
    </section>

    <!-- ======== WHY BLOG LOVERS ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">⭐</span> <span class="highlight">کیوں بلاگ لوورز.pk؟</span></h2>
        <div class="features-grid">
            <div class="feature-item"><div class="f-icon">✅</div><div class="f-label">مکمل مفت</div><div class="f-desc">کوئی چارج نہیں</div></div>
            <div class="feature-item"><div class="f-icon">📚</div><div class="f-label">380+ مضامین</div><div class="f-desc">بہت بڑا ذخیرہ</div></div>
            <div class="feature-item"><div class="f-icon">📂</div><div class="f-label">14 موضوعات</div><div class="f-desc">اسلام، تعلیم، تاریخ، ادب، ٹیک</div></div>
            <div class="feature-item"><div class="f-icon">🕌</div><div class="f-label">آسان اردو</div><div class="f-desc">ہر کوئی سمجھ سکتا ہے</div></div>
            <div class="feature-item"><div class="f-icon">📜</div><div class="f-label">مستند حوالہ جات</div><div class="f-desc">قرآن و حدیث سے</div></div>
            <div class="feature-item"><div class="f-icon">🧸</div><div class="f-label">بچوں کے لیے</div><div class="f-desc">کہانیاں اور تعلیمی مواد</div></div>
        </div>
    </section>

    <!-- ======== QUICK START ======== -->
    <section class="section">
        <h2 class="section-title"><span class="emoji">🚀</span> <span class="highlight">شروع کریں</span></h2>
        <div class="quick-steps">
            <div class="step"><div class="step-num">📚</div><div class="step-label">مرحلہ 1</div><div class="step-desc">بلاگ لوورز.pk وزٹ کریں</div></div>
            <div class="step"><div class="step-num">🔍</div><div class="step-label">مرحلہ 2</div><div class="step-desc">کیٹگری کے مطابق براؤز کریں</div></div>
            <div class="step"><div class="step-num">📖</div><div class="step-label">مرحلہ 3</div><div class="step-desc">کوئی بھی مضمون پڑھیں</div></div>
            <div class="step"><div class="step-num">💬</div><div class="step-label">مرحلہ 4</div><div class="step-desc">دوستوں کے ساتھ شیئر کریں</div></div>
        </div>
    </section>

    <!-- ======== FOOTER ======== -->
    <footer class="footer">
        <div class="brand">📚 بلاگ لوورز.pk</div>
        <p style="color:#94a3b8;font-size:0.95rem;">پڑھیں، سیکھیں، سمجھیں</p>
        <div class="socials">
            <a href="https://bloglovers.pk">🌐 ویب سائٹ</a>
            <a href="mailto:uzairhameed01@gmail.com">📧 ای میل</a>
            <a href="https://github.com/Uzair-Hameed">🐙 GitHub</a>
        </div>
        <p class="credit">© 2025 بلاگ لوورز.pk — تمام حقوق محفوظ</p>
        <p style="color:#4a5568;font-size:0.8rem;margin-top:0.5rem;">⭐ اس ریپوزٹری کو اسٹار کریں اگر یہ مواد مفید لگے</p>
    </footer>

</div>

<!-- ======== TYPEWRITER + DATA SCRIPT ======== -->
<script>
    // ===== TYPEWRITER =====
    (function() {
        const phrases = [
            "380+ مفت اردو مضامین",
            "107 علامات صغریٰ",
            "اسلامی تعلیمات و تاریخ",
            "ادب اور ٹیکنالوجی",
            "بچوں کی کہانیاں",
            "آپ کا علمی پلیٹ فارم"
        ];

        let idx = 0, charIdx = 0, isDeleting = false;
        const el = document.getElementById('typewriter');
        let speed = 100;

        function type() {
            const current = phrases[idx];
            if (isDeleting) {
                el.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                speed = 50;
            } else {
                el.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                speed = 120;
            }

            if (!isDeleting && charIdx === current.length) {
                isDeleting = true;
                speed = 2000;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                idx = (idx + 1) % phrases.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }
        type();
    })();

    // ===== 107 علامات صغریٰ پوسٹس =====
    const alamaatSughra = [
        { title: "آپ ﷺ کا اس دنیا سے تشریف لانا", url: "https://bloglovers.pk/alamaat-sughra/aap-ka-is-dnya-main-tshryf-lana" },
        { title: "آپ ﷺ کا اس دنیا سے رخصت ہو جانا", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ka-is-dunya-se-rukhasat-ho-jana" },
        { title: "چاند کے دو ٹکڑے ہونے کی حقیقت", url: "https://bloglovers.pk/alamaat-sughra/chand-ke-do-tukre-ho-ne-ki-haqeeqat-kya-hai" },
        { title: "صحابہ کرام کا اس دنیا سے رخصت ہو جانا", url: "https://bloglovers.pk/alamaat-sughra/shabh-kram-rzi-allah-anhm-ka-is-dnya-se-rkhst-ho-jana-hmyn-kya-drs-dyta-hai" },
        { title: "قبلہ اول (بیت المقدس) کی فتح", url: "https://bloglovers.pk/alamaat-sughra/qblh-aol-byt-almqds-ki-fth-aur-is-ki-hqyqt" },
        { title: "ان گنت فتنوں کا ظہور", url: "https://bloglovers.pk/alamaat-sughra/in-ginat-fitnon-ka-zohoor-aur-unke-nuqsanat" },
        { title: "حجاز کی سرزمین پر عذاب آگ", url: "https://bloglovers.pk/alamaat-sughra/hijaz-ki-sarzameen-par-azab-aag-aur-iski-haqeeqat" },
        { title: "تاتاری منگولوں کا صحابہ سے لڑنا", url: "https://bloglovers.pk/alamaat-sughra/tatari-mangoloon-ka-sahaba-karam-se-larna" },
        { title: "دلوں سے دیانتداری کا خاتمہ", url: "https://bloglovers.pk/alamaat-sughra/logon-ke-dilon-se-diyanat-dari-ka-khatma-aur-ap-saw-ki-waeed" },
        { title: "پچھلی امتوں کے طریقوں کی تقلید", url: "https://bloglovers.pk/alamaat-sughra/pichli-ummaton-ke-tareeqon-ki-andhi-taqleed-aur-masharti-tabah-kariyan" },
        { title: "صرف جان پہچان کے لوگوں کو سلام کرنے کے نقصانات", url: "https://bloglovers.pk/alamaat-sughra/sirf-jan-pehchan-ke-logon-ko-salam-karne-ke-kya-nuqsanat-hain" },
        { title: "تنگ لباس پہننے والی عورتوں کے بارے میں وعید", url: "https://bloglovers.pk/alamaat-sughra/tang-libas-pehnne-wali-nangi-auraton-ke-bare-mein-ap-saw-ne-kya-waeed-sunai" },
        { title: "جھوٹی گواہی کا عام ہونا", url: "https://bloglovers.pk/alamaat-sughra/jhooti-gawahi-ka-aam-hona-aur-masharti-tabahi-ka-tezi-se-barhna" },
        { title: "علم کے اُٹھ جانے کے بارے میں فرمایا", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-ummat-ko-ilm-ke-uth-jane-ke-bare-mein-kya-farmaya" },
        { title: "چھ چیزوں کو حلال سمجھنے پر وعید", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-kin-chhe-chizon-ko-halal-samajhne-par-ummat-ko-azab-ilahi-ki-waeed-sunai" },
        { title: "حلال اور حرام مال کے بارے میں", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-halal-aur-haraam-maal-ke-bare-mein-kya-farmaya" },
        { title: "والدین کی بے حرمتی اور بیوی کی اطاعت", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-walidain-ki-be-hurmati-aur-bivi-ki-ataat-karne-wale-shakhs-ke-liye-kya-farmaya" },
        { title: "والدین سے دوری اور اجنبیوں سے قربت", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-walidain-se-doori-aur-ajnabi-logon-se-qurbat-walon-ke-liye-kya-hukm-farmaya" },
        { title: "چار حرام کام جو امت حلال سمجھ لے گی", url: "https://bloglovers.pk/alamaat-sughra/woh-kon-se-char-hram-kam-hain-jo-amt-mhmdyh-hlal-smjh-le-gi" },
        { title: "صبح مومن شام کافر کیوں ہو جائے گا", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-ek-shakhs-subah-ko-momin-aur-sham-ko-kafir-kyun-ho-jaye-ga" },
        { title: "گھروں کو مزین کرنے والوں کے لیے", url: "https://bloglovers.pk/alamaat-sughra/apne-gharon-ko-muzain-karne-walon-ke-liye-ap-saw-ne-kya-farmaya" },
        { title: "زبان کا ناجائز استعمال کرکے مال کمانا", url: "https://bloglovers.pk/alamaat-sughra/zabaan-ka-najaiz-istemal-karke-maal-kamane-walon-ke-liye-kya-hukm-farmaya-gaya" },
        { title: "جاہل لوگوں سے علم حاصل کرنے پر مجبوری", url: "https://bloglovers.pk/alamaat-sughra/qrb-qyamt-log-jahl-logon-se-alm-hasl-krne-par-mjbor-kyun-ho-jayn-ge" },
        { title: "عمواس کے لوگوں پر عذاب", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ki-wafat-ke-saat-saal-baad-amwas-ke-logon-par-kaisa-azab-nazil-hua" },
        { title: "دور جدید کے فتنوں کے بارے میں حکم", url: "https://bloglovers.pk/alamaat-sughra/door-jadeed-ke-fitnon-ke-bare-mein-ap-saw-ne-kya-hukm-farmaya" },
        { title: "اللہ کی یاد سے غافل کرنے والا فتنہ", url: "https://bloglovers.pk/alamaat-sughra/allah-ki-yaad-se-ghafil-kar-dene-wala-azeem-tareen-fitna-kon-sa-hai" },
        { title: "فرقہ خوارج کا حضرت علی سے روگردانی", url: "https://bloglovers.pk/alamaat-sughra/frqh-khoarj-ne-hzrt-ali-rzi-allah-anh-ki-ataat-se-pyth-kyun-phyr-li" },
        { title: "جنگ صفین کی پیشین گوئی", url: "https://bloglovers.pk/alamaat-sughra/aap-ne-mslmanon-kemabyn-hone-wali-jng-sfyn-ki-kya-pyshyn-goi-frmai-thi" },
        { title: "30 جھوٹے نبیوں کے ظہور سے شر کا پھیلنا", url: "https://bloglovers.pk/alamaat-sughra/jhooti-nabuwat-ke-30-daawa-daron-ke-zahir-hone-se-mashare-mein-shar-kaise-phile-ga" },
        { title: "بازاروں پر قبضہ اور تجارت کی پیشین گوئی", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-bazaron-par-qabza-karne-aur-tijarat-ke-wasee-hone-par-kya-pasheen-goi-farmai" },
        { title: "قتل و خوں ریزی کی کثرت", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-qatl-o-khoon-rezi-ki-kasrat-kyun-ho-jae-gi" },
        { title: "عربوں کے لیے ہلاکت کیوں", url: "https://bloglovers.pk/alamaat-sughra/arbo-n-ke-le-hlakt-hai-aysa-aap-ne-kyun-kha" },
        { title: "اللہ کی شدید ناراضگی والے لوگ", url: "https://bloglovers.pk/alamaat-sughra/woh-kon-se-log-hongay-jin-par-allah-ki-shadeed-tareen-narazgi-hogi" },
        { title: "نیک لوگوں کا رخصت اور بروں کا ظہور", url: "https://bloglovers.pk/alamaat-sughra/nek-logon-ka-rukhasat-hona-aur-bure-logon-ka-zahir-hone-ke-bare-mein-ap-saw-ne-kya-hukm-farmaya" },
        { title: "ایماندار کو جھوٹا اور جھوٹے کو قابل اعتماد", url: "https://bloglovers.pk/alamaat-sughra/log-eman-dar-shakhs-ko-jhoota-aur-jhootay-ko-qabil-e-etemaad-kyun-samajhne-lageen-ge" },
        { title: "سچی گواہی چھپانے کا انجام", url: "https://bloglovers.pk/alamaat-sughra/agar-hum-sachi-gawahi-ko-chupaeen-ge-to-mashare-mein-kya-hoga" },
        { title: "بدترین گناہ جو انسان کی جلدی پکڑ کروائے", url: "https://bloglovers.pk/alamaat-sughra/insaan-ki-jaldi-pakad-karwa-dene-wala-bad-tareen-gunah-kon-sa-hai" },
        { title: "پڑوسی سے برے سلوک پر حکم", url: "https://bloglovers.pk/alamaat-sughra/parosi-se-bure-sulook-par-ap-saw-ne-kya-hukm-farmaya" },
        { title: "لالچ اور کنجوسی بڑھنے والے لوگ", url: "https://bloglovers.pk/alamaat-sughra/kin-logon-ke-dilon-mein-lalach-aur-kanjoosi-barhti-chali-jae-gi" },
        { title: "لونڈی کا اپنے مالک کو جنم دینا", url: "https://bloglovers.pk/alamaat-sughra/londi-ka-apne-malik-aqa-khwand-ko-janam-dena" },
        { title: "دنیاوی عیش کے لیے علم کا حصول", url: "https://bloglovers.pk/alamaat-sughra/dnyaoi-aysh-washrt-kmaneke-le-alm-ka-hsol" },
        { title: "بدکرداروں کے ڈر سے ان کی عزت", url: "https://bloglovers.pk/alamaat-sughra/bad-kirdar-aur-fasadi-logon-ke-dar-se-unki-izzat-ki-jae-gi" },
        { title: "پچھلی امتوں کی اندھی تقلید", url: "https://bloglovers.pk/alamaat-sughra/amton-ke-tor-tryqon-ki-andhi-tqlyd" },
        { title: "آسمانی بجلی گرنے کے بارے میں", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-apni-ummat-ko-asmani-bijli-girne-ke-bare-mein-kya-farmaya" },
        { title: "لوگ اپنی موت کی تمنا کیوں کریں گے", url: "https://bloglovers.pk/alamaat-sughra/log-apni-maut-ki-tamanna-kyun-karne-lageen-ge" },
        { title: "مذہبی و معاشرتی تباہی کا ذمہ دار", url: "https://bloglovers.pk/alamaat-sughra/mazhabi-o-masharti-tabahi-ka-zimma-dar-kon-hum-khud-ya-koi-aur" },
        { title: "اچانک اموات کے بارے میں", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-achaanak-amwat-ke-bare-mein-kya-farmaya" },
        { title: "مساجد پر فخر کرنے والوں کی بربادی", url: "https://bloglovers.pk/alamaat-sughra/masajid-par-fakhr-karne-walon-ke-liye-kya-barbadi-hai" },
        { title: "زکوۃ کو جرمانہ سمجھنے والوں کے لیے وعید", url: "https://bloglovers.pk/alamaat-sughra/aap-ne-zko-kojrmanh-smjhne-walon-ke-le-kya-wayd-snai" },
        { title: "گٹھیا اور فاسق لوگوں کی قیادت", url: "https://bloglovers.pk/alamaat-sughra/qom-ki-qayadat-gathiya-aur-fasiq-logon-ke-hathon-mein-kyun-hogi" },
        { title: "غیر دینی کتب کی اشاعت کی پیشین گوئی", url: "https://bloglovers.pk/alamaat-sughra/aap-ne-amt-ko-ghyr-dyni-ktb-ki-ashaat-ke-bare-main-kya-pyshgoi-frmai" },
        { title: "بے وقوف حکمرانوں کے بارے میں", url: "https://bloglovers.pk/alamaat-sughra/be-waqoof-hakam-rano-ke-bare-mein-ap-saw-ne-kya-farmaya" },
        { title: "زمانے کے قریب ہونے کے بارے میں", url: "https://bloglovers.pk/alamaat-sughra/zamane-ke-qareeb-ho-jane-ke-bare-mein-ap-saw-ne-kya-irshad-farmaya" },
        { title: "بے وقوف لوگوں کی پیشین گوئی", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-be-waqoof-logon-ke-bare-mein-kya-pasheen-goi-farmai" },
        { title: "جاہلوں اور احمقوں کا غلبہ", url: "https://bloglovers.pk/alamaat-sughra/dunya-par-jahilon-aur-ehmoqon-ka-ghalba-kyun-ho-jae-ga" },
        { title: "اہل مغرب کا مسلمانوں پر ٹوٹ پڑنا", url: "https://bloglovers.pk/alamaat-sughra/ahl-e-maghrib-musalmanon-par-kyun-tot-padeen-ge" },
        { title: "نماز کی امامت سے ہچکچاہٹ", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-log-namaz-ki-imamat-karane-se-kyun-hichkichaen-ge" },
        { title: "زلزلوں اور مصیبتوں کے بارے میں", url: "https://bloglovers.pk/alamaat-sughra/zlzlon-msybton-aur-bri-pryshanyon-ke-bare-aap-ka-frman" },
        { title: "الہی حکم کے مطابق فیصلہ نہ کرنے والوں کی وعید", url: "https://bloglovers.pk/alamaat-sughra/hukm-ilahi-ke-mutabiq-faisla-na-karne-walon-ke-liye-kya-waeed-hai" },
        { title: "طاقتور کا کمزور کو کھا جانا", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-taaqatwar-kamzor-ko-kha-jae-ga" },
        { title: "عیسائی زیادہ اور عرب کم کیوں", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-essai-zyada-aur-arab-kam-kyun-ho-jaeen-ge" },
        { title: "موٹاپے جیسی بیماری میں مبتلا", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-log-motapay-jesi-bimari-mein-mubtala-kyun-ho-jaeen-ge" },
        { title: "شہرت کی خاطر تلاوت پر فرمان", url: "https://bloglovers.pk/alamaat-sughra/shohrat-ki-khatir-ki-jane-wali-tilawat-par-farman-nabawi-saw" },
        { title: "مومن کا سچا خواب", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-momin-ka-sacha-khawab-dekhne-se-kya-murad-li-gai-hai" },
        { title: "مرد کم اور عورتیں زیادہ کیوں", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-mard-kam-aur-auraten-zyada-kyun-ho-jaeen-gi" },
        { title: "سرعام بدکاری", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-log-sar-aam-badkari-kyun-karen-ge" },
        { title: "جھوٹ بولنے والے کے لیے ہلاکت", url: "https://bloglovers.pk/alamaat-sughra/jhoot-bolne-wale-ke-liye-halaakat-ki-waeed-kyun" },
        { title: "معاشرے میں جھوٹ کا پھیل جانا", url: "https://bloglovers.pk/alamaat-sughra/mashare-mein-har-so-jhoot-ka-tezi-se-phail-jana" },
        { title: "لوگوں کے درمیان اجنبیت", url: "https://bloglovers.pk/alamaat-sughra/qayamat-ke-nazdeek-logon-ke-darmiyan-ajnabiyat-kyun-dal-di-jae-gi" },
        { title: "دولت کی کثرت", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-logon-ke-pas-daulat-ki-kasrat-kyun-ho-jae-gi" },
        { title: "انسان اور جنوں کو ثقلین کیوں کہا", url: "https://bloglovers.pk/alamaat-sughra/insaan-aur-jinon-ko-saqalain-kyun-kaha-gaya-hai" },
        { title: "گناہوں کو دیکھ کر خاموش رہنے والوں کی وعید", url: "https://bloglovers.pk/alamaat-sughra/gunaahon-ko-dekh-kar-khamosh-rehne-walon-ke-liye-azab-ilahi-ki-waeed" },
        { title: "شدید بارشوں سے تباہی", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-shadeed-barishon-se-kuch-bhi-baqi-na-rahe-ga" },
        { title: "نفع بخش نہ ہونے والی بارشیں", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-asman-se-esi-barishon-ka-barsna-jo-nafa-bakhsh-na-honghi" },
        { title: "اہل عرب کو ہلاک کرنے والا فتنہ", url: "https://bloglovers.pk/alamaat-sughra/ahl-arb-ko-hlak-krdyne-wala-ftnh-kysa-hoga" },
        { title: "مسلمانوں کے حق میں نہ بولنے والا درخت", url: "https://bloglovers.pk/alamaat-sughra/kon-sa-darakht-musalmanon-ke-haq-mein-nahi-bole-ga" },
        { title: "فرات کا خشک ہونا", url: "https://bloglovers.pk/alamaat-sughra/furat-ka-khushk-hona-kon-se-fitne-ki-pasheen-goi-hai" },
        { title: "عاجز بن جانا مگر فاسق نہ بننا", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-farmaya-aajiz-ban-jana-magar-fasiq-kabhi-na-banna" },
        { title: "عرب کی چراگاہوں کی پیشین گوئی", url: "https://bloglovers.pk/alamaat-sughra/ap-saw-ne-arab-ki-chara-gaahon-ke-bare-mein-kya-pasheen-goi-farmai" },
        { title: "3 فتنے جو عنقریب ظاہر ہوں گے", url: "https://bloglovers.pk/alamaat-sughra/ese-fitne-jo-anaqreeb-zahir-ho-ne-wale-hain" },
        { title: "ایک سجدہ دنیا کے خزانوں سے قیمتی", url: "https://bloglovers.pk/alamaat-sughra/kis-zamane-mein-ek-sajda-dunya-ke-tamam-khazanon-se-qeemti-hoga" },
        { title: "چاند کا بڑا نظر آنے کی پیشین گوئی", url: "https://bloglovers.pk/alamaat-sughra/chand-ka-maamool-se-bara-nazar-ane-par-ap-saw-ne-kya-pasheen-goi-farmai" },
        { title: "شام کی طرف ہجرت کے 10 اشارے", url: "https://bloglovers.pk/alamaat-sughra/srzmyn-sham-ki-trf-hjrt-krne-ke-10-ahm-tryn-asharekon-se-hain" },
        { title: "امام مہدی سے قبل جماعتوں میں جنگ", url: "https://bloglovers.pk/alamaat-sughra/imam-mehdi-se-qabl-kin-jamatoun-mein-zabardast-jang-hogi" },
        { title: "بیت المقدس آباد اور مدینہ برباد", url: "https://bloglovers.pk/alamaat-sughra/qrb-qyamt-byt-almqds-aabad-aur-mdynh-mnorh-brbad-kyun-ho-jae-ga" },
        { title: "اسلام کی آخری بستی", url: "https://bloglovers.pk/alamaat-sughra/islam-ki-aakhri-basti-kon-si-hai-jo-qurb-qayamat-weran-ho-jae-gi" },
        { title: "میراث اور غنیمت پر خوشی نہ ہونا", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-log-miras-ki-taqseem-aur-maal-e-ghanimat-par-khushi-kyun-na-hogi" },
        { title: "مدینہ میں بسنے کی تڑپ کا خاتمہ", url: "https://bloglovers.pk/alamaat-sughra/logon-ke-dilon-se-shehr-madina-mein-basne-ki-tarap-kyun-dam-tor-jae-gi" },
        { title: "پہاڑوں کا کھسک جانا", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-kohsar-apni-jagah-se-kyun-khisk-jaeen-ge" },
        { title: "عرب میں صالح شخص کا ظہور", url: "https://bloglovers.pk/alamaat-sughra/qrb-qyamt-arb-main-ayk-salh-shkhs-zahr-hoga-js-ki-log-ataat-kryn-ge" },
        { title: "وحشی جانور اور بے جان چیزیں باتیں کریں گے", url: "https://bloglovers.pk/alamaat-sughra/qurb-qayamat-wehshi-janwar-be-jaan-cheezen-koray-jootay-aur-insani-raan-baten-karen-ge" },
        { title: "اسلام اور قرآن کا اٹھنا", url: "https://bloglovers.pk/alamaat-sughra/qayamat-se-pehle-islam-aur-quran-ka-uthna-ek-dard-naak-gumraahi" },
        { title: "بیت اللہ پر حملہ آور لشکر کا انجام", url: "https://bloglovers.pk/alamaat-sughra/qayamat-ke-qareeb-bait-ullah-par-hamla-aawar-lashkar-ka-bhayank-anjaam" },
        { title: "بیت اللہ کا حج ختم ہو جانا", url: "https://bloglovers.pk/alamaat-sughra/kya-qurb-qayamat-bait-ullah-ka-haj-hamesha-ke-liye-khatam-ho-jae-ga" },
        { title: "عرب میں بت پرستی کا دوبارہ آغاز", url: "https://bloglovers.pk/alamaat-sughra/arab-dunya-mein-butt-parasti-ka-dobara-aaghaz" },
        { title: "کعبہ کی بربادی اور قیامت کے آثار", url: "https://bloglovers.pk/alamaat-sughra/kaaba-ki-barbadi-aur-qayamat-ke-aasaar" },
        { title: "حضرت عیسیٰ کی وفات کے بعد مومنین کی روحیں قبض", url: "https://bloglovers.pk/alamaat-sughra/hazrat-essa-ki-wafat-ke-baad-mominon-ki-ruhon-ko-qabz-kyun-kar-liya-jae-ga" },
        { title: "پہاڑوں سے بلند مکہ کی عمارات", url: "https://bloglovers.pk/alamaat-sughra/paharon-se-buland-makka-ki-imaaraat-aakhri-zamane-ki-tabdeeliyon-ka-ishara" },
        { title: "بدعات اور گمراہی کا عروج", url: "https://bloglovers.pk/alamaat-sughra/bidaat-aur-gumraahi-ka-urooj-aakhri-zamane-ke-logon-ka-guzre-buzurgo-par-laant-bhejna" },
        { title: "جدید سواریوں کی رغبت", url: "https://bloglovers.pk/alamaat-sughra/amt-mhmdyh-ki-jdyd-soaryon-ki-rghbt-aur-qyamt-ki-pyshgoyan" },
        { title: "توبۃ النصوح اور امام مہدی کی آمد (حصہ اول)", url: "https://bloglovers.pk/alamaat-sughra/zlmt-w-gmrahi-main-tobalnsoh-ke-moaqa-aur-amam-mhdi-ki-aamd-hsh-aol" },
        { title: "توبۃ النصوح اور امام مہدی کی آمد (حصہ دوم)", url: "https://bloglovers.pk/alamaat-sughra/zlmt-w-gmrahi-main-tobalnsoh-ke-moaqa-aur-amam-mhdi-ki-aamd-hsh-dom" },
        { title: "توبۃ النصوح اور امام مہدی کی آمد (حصہ سوم)", url: "https://bloglovers.pk/alamaat-sughra/zlmt-w-gmrahi-main-tobalnsoh-ke-moaqa-aur-amam-mhdi-ki-aamd-hsh-som" },
        { title: "توبۃ النصوح اور امام مہدی کی آمد (حصہ چہارم)", url: "https://bloglovers.pk/alamaat-sughra/zlmt-w-gmrahi-main-tobalnsoh-ke-moaqa-aur-amam-mhdi-ki-aamd-hsh-chharm" },
        { title: "توبۃ النصوح اور امام مہدی کی آمد (حصہ پنجم)", url: "https://bloglovers.pk/alamaat-sughra/zlmt-w-gmrahi-main-tobalnsoh-ke-moaqa-aur-amam-mhdi-ki-aamd-hsh-pnjm" },
        { title: "ٹک ٹاک اور ریلس - زمانہ قریب ہونے کی تفسیر", url: "https://bloglovers.pk/alamaat-sughra/tik-tak-aur-rails-kya-yeh-zamana-qareeb-ho-jane-ki-jadeed-tafseer-hai" },
        { title: "کیا واقعی وقت میں برکت ختم ہو رہی ہے؟", url: "https://bloglovers.pk/alamaat-sughra/kya-waqai-waqt-mein-barkat-khatam-ho-rahi-hai-ek-esa-sawal-jis-ne-sab-ko-pareshan-kar-rakha-hai" }
    ];

    // ===== باقی کیٹگریز کے ڈیٹا =====
    const alamaatKubra = [
        { title: "5 واقعات جو فتنہ دجال سے قبل پیش آئیں گے", url: "https://bloglovers.pk/alamaat-kubra/5-ese-kon-se-waqeat-pesh-aeen-ge-ftna-dajjal-se-qabl" },
        { title: "مصائب دجال (حصہ اول)", url: "https://bloglovers.pk/alamaat-kubra/msab-djal-hsh-aol" },
        { title: "مصائب دجال (حصہ دوم)", url: "https://bloglovers.pk/alamaat-kubra/msab-djal-hsh-dom" },
        { title: "مصائب دجال (حصہ سوم)", url: "https://bloglovers.pk/alamaat-kubra/msab-djal-hsh-som" },
        { title: "دجال کو کون سی طاقتیں دی گئی ہوں گی؟", url: "https://bloglovers.pk/alamaat-kubra/dajjal-ko-kon-kon-se-taaqaten-di-gai-honghi" },
        { title: "دجال کے ساتھی کون لوگ ہوں گے؟", url: "https://bloglovers.pk/alamaat-kubra/dajjal-ke-sathi-kon-log-hongay" },
        { title: "دجال سے نجات کی تعلیمات", url: "https://bloglovers.pk/alamaat-kubra/dajjal-se-nijaat-ke-liye-humein-kya-taleemaat-di-gai-hain" },
        { title: "حضرت عیسیٰ دوبارہ زمین پر کیوں (حصہ اول)", url: "https://bloglovers.pk/alamaat-kubra/hzrt-aysi-dobarh-zmyn-par-kyun-tshryf-layn-ge-hsh-aol" },
        { title: "حضرت عیسیٰ دوبارہ زمین پر کیوں (حصہ دوم)", url: "https://bloglovers.pk/alamaat-kubra/hzrt-aysi-dobarh-zmyn-par-kyun-tshryf-layn-ge-hsh-dom" },
        { title: "تمام آسمانی مذاہب میں خنزیر حرام کیوں؟", url: "https://bloglovers.pk/alamaat-kubra/tamam-asmani-mazahib-mein-khanzeer-haraam-kyun-hai" },
        { title: "حضرت عیسیٰ کا دور حکومت", url: "https://bloglovers.pk/alamaat-kubra/hzrt-aysy-ka-dor-hkomt-kysa-hoga" },
        { title: "یاجوج وماجوج کا فتنہ (حصہ اول)", url: "https://bloglovers.pk/alamaat-kubra/yajoj-majoj-ke-fitna-se-log-kaise-nijaat-paeen-ge-hissa-awwal" },
        { title: "یاجوج وماجوج کا فتنہ (حصہ دوم)", url: "https://bloglovers.pk/alamaat-kubra/yajoj-majoj-ke-fitna-se-log-kaise-nijaat-paeen-ge-hissa-doyam" },
        { title: "زمین کے دھنس جانے کی وعید", url: "https://bloglovers.pk/alamaat-kubra/ap-saw-ne-ummat-ko-zameen-ke-dhans-jane-ki-kya-waeed-sunai" },
        { title: "دھواں کا عذاب", url: "https://bloglovers.pk/alamaat-kubra/dhuan-ka-azab-kaisa-hoga-kafir-use-dekh-kar-kya-kahen-ge" },
        { title: "عجیب جانور جو لوگوں سے بات کرے گا", url: "https://bloglovers.pk/alamaat-kubra/esa-ajeeb-janwar-jo-qurb-qayamat-logon-se-bat-kare-ga" },
        { title: "سورج کا مغرب سے طلوع ہونا", url: "https://bloglovers.pk/alamaat-kubra/suraj-ke-maghrib-se-tulu-hote-hi-kya-kya-hoga" },
        { title: "لوگوں کو محشر کی طرف ہانکنے والی آگ", url: "https://bloglovers.pk/alamaat-kubra/logon-ke-mehshar-ki-taraf-haank-kar-le-jane-wali-aag-kaisi-hogi" }
    ];

    const islamiTaleemat = [
        { title: "احکامات شرعی لباس و اہمیت", url: "https://bloglovers.pk/islami-taleemat/ahkamat-e-sharai-libas-w-ahmiyat" },
        { title: "عصر حاضر کے 10 بڑے گناہ - غیر اللہ کی پکار", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-1-ghair-allah-ki-pukar" },
        { title: "عصر حاضر کے 10 بڑے گناہ - بت پرستی", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-2-butt-parasti" },
        { title: "عصر حاضر کے 10 بڑے گناہ - مردہ پرستی", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-3-murda-parasti" },
        { title: "عصر حاضر کے 10 بڑے گناہ - اکابر پرستی", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-4-akabir-parasti" },
        { title: "عصر حاضر کے 10 بڑے گناہ - فرقہ پرستی", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-5-firqa-parasti" },
        { title: "عصر حاضر کے 10 بڑے گناہ - تعویذات", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-6-taweezat" },
        { title: "عصر حاضر کے 10 بڑے گناہ - توہم پرستی", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-7-toham-parasti" },
        { title: "عصر حاضر کے 10 بڑے گناہ - بدشگونی", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-8-bad-shaguni" },
        { title: "عصر حاضر کے 10 بڑے گناہ - ریاکاری", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-9-riya-kari" },
        { title: "عصر حاضر کے 10 بڑے گناہ - غیر اللہ کی قسمیں", url: "https://bloglovers.pk/islami-taleemat/asr-hazir-ke-10-bare-gunah-10-ghair-allah-ki-qasmein-khana" }
    ];

    const azkar = [
        { title: "میں اور آپ اللہ کو کیسے نہ پکاریں؟", url: "https://bloglovers.pk/azkar/main-aur-aap-allah-ko-kaise-na-pukareen" },
        { title: "7 رکاوٹیں جن سے دعا قبول نہیں ہوتی", url: "https://bloglovers.pk/azkar/7-aysi-rkaotyn-jn-se-daa-qbol-nahi-hoti" },
        { title: "8 اذکار جن سے ہر مراد پوری ہوتی ہے", url: "https://bloglovers.pk/azkar/8-ese-azkar-jin-ke-parhne-se-har-murad-puri-hoti-hai" },
        { title: "ہم دعا مانگنے میں سست کیوں ہو گئے؟", url: "https://bloglovers.pk/azkar/hum-dua-mangne-mein-sust-kyun-ho-gaye-hain" },
        { title: "کیا اللہ مجھ سے راضی ہے؟", url: "https://bloglovers.pk/azkar/kya-allah-mujh-se-raazi-hai-apni-zindagi-mein-alamaat-ko-pehchaniye" },
        { title: "بدنصیب ہے وہ جو ان اذکار کا معمول نہیں بناتا", url: "https://bloglovers.pk/azkar/bara-hi-bad-naseeb-hai-woh-shakhs-jo-in-azkar-ka-mamool-nahi-banata" }
    ];

    const taleem = [
        { title: "دورِ حاضر کے اساتذہ کو کیسا ہونا چاہیے؟", url: "https://bloglovers.pk/taleem/door-e-hazir-ke-asatza-ko-kaisa-hona-chahiye" },
        { title: "اسلام میں استاد کا معیار", url: "https://bloglovers.pk/taleem/islam-mein-ustaad-ka-miyar-kya-hai" },
        { title: "1400 سال قبل کی اسلامی تدریسی حکمت عملیاں", url: "https://bloglovers.pk/taleem/1400-saal-qabl-istemal-hone-wali-islami-tadrisi-hikmat-amliyan-kon-si-hain" },
        { title: "آج کا استاد پریشان کیوں؟", url: "https://bloglovers.pk/taleem/aaj-ka-ustaad-pareshan-kyun" },
        { title: "اسلامی تعلیم کا بنیادی مقصد", url: "https://bloglovers.pk/taleem/islami-taleem-ka-bunyadi-maqsad-achhay-aur-nek-aadmi-ki-takhleeq-kyun-hai" },
        { title: "اکیسویں صدی کا تعلیمی چیلنج", url: "https://bloglovers.pk/taleem/akysoyn-sdi-ka-talymi-chylnj-kya-ho-ga" }
    ];

    const mazameen = [
        { title: "مسلمانوں نے اپنا وقار کیسے کھویا؟", url: "https://bloglovers.pk/mazameen/musalmanon-ne-apna-waqar-kaise-khoya" },
        { title: "افلاطون اور ارسطو کے فلسفہ پر ایک جھلک", url: "https://bloglovers.pk/mazameen/ek-jhalak-aflatoon-aur-arastoo-ke-falsafa-par" },
        { title: "بچوں کے لیے اسکرین کا وقت کنٹرول کیوں؟", url: "https://bloglovers.pk/mazameen/bachchon-ke-liye-screen-ka-waqt-kyun-control-karne-ki-zaroorat-hai" },
        { title: "ٹاپ 10 ریڈنگ ٹپس", url: "https://bloglovers.pk/mazameen/tap-10-rydng-tps" },
        { title: "ٹاپ 10 لائف اسکلز", url: "https://bloglovers.pk/mazameen/tap-10-laf-asklz" },
        { title: "ٹاپ 10 لسنگ ٹپس", url: "https://bloglovers.pk/mazameen/tap-10-lsnng-tps" }
    ];

    const englishAdab = [
        { title: "وکٹورین دور (پارٹ ون)", url: "https://bloglovers.pk/english-adab/wktoryn-dor-part-wn-1837-1913" },
        { title: "وکٹورین دور (دوسرا حصہ)", url: "https://bloglovers.pk/english-adab/wktoryn-dor-1837-1914-dosra-hsh" },
        { title: "وکٹورین دور (حصہ سوم)", url: "https://bloglovers.pk/english-adab/wktoryn-dor-1837-1914-hsh-som" },
        { title: "وکٹورین دور (حصہ چہارم)", url: "https://bloglovers.pk/english-adab/wktoryn-dor-1837-1914-hsh-chharm" },
        { title: "وکٹورین دور (پانچواں حصہ)", url: "https://bloglovers.pk/english-adab/wktoryn-dor-1837-1914-panchoan-hsh" },
        { title: "وکٹورین دور (حصہ چھٹا)", url: "https://bloglovers.pk/english-adab/wktoryn-dor-1837-1914-hsh-chhta" },
        { title: "وکٹورین دور (حصہ ساتواں)", url: "https://bloglovers.pk/english-adab/wktoryn-dor-1837-1914-hsh-satoan" },
        { title: "وکٹورین دور (آخری حصہ)", url: "https://bloglovers.pk/english-adab/wktoryn-dor-1837-1914-aakhri-hsh" },
        { title: "رومانوی دور", url: "https://bloglovers.pk/english-adab/romanoi-dor" }
    ];

    const technology = [
        { title: "ہر طالب علم کے پاس 10 مفت ٹولز", url: "https://bloglovers.pk/technology/har-talib-e-ilm-ke-pas-ye-10-muft-tools-zaroor-hone-chahiye" },
        { title: "مصنوعی ذہانت کا غلط استعمال", url: "https://bloglovers.pk/technology/masnoi-zehnat-ka-ghalat-istemal-khatray-challenge-aur-rok-thaam-ki-jame-hikmat-amli" },
        { title: "ٹیکنالوجی کی دوڑ میں پاکستان", url: "https://bloglovers.pk/technology/tyknaloji-ki-dor-main-kya-pakstan-pychhe-rh-jae-ga" },
        { title: "ٹاپ 20 مصنوعی ذہانت کے تعلیم میں استعمالات", url: "https://bloglovers.pk/technology/tap-20-msnoai-zhant-ke-talym-main-astamalat" },
        { title: "ٹاپ 20 مصنوعی ذہانت کے تعلیم میں نقصانات", url: "https://bloglovers.pk/technology/top-20-masnoi-zehnat-ke-taleem-mein-nuqsanaat" }
    ];

    const kids = [
        { title: "اکبر بیربل کی 10 بہترین کہانیاں", url: "https://bloglovers.pk/kids/bachchon-ke-liye-akbar-birbal-ki-10-behtareen-kahaniyan" },
        { title: "بلی خالہ کی آخری مہم", url: "https://bloglovers.pk/kids/billi-khala-ki-aakhri-maham" },
        { title: "ایمانداری بہترین پالیسی ہے", url: "https://bloglovers.pk/kids/aymandari-bhtryn-palysi-hai" },
        { title: "ایک ننھی چیونٹی اور ایک عظیم پیغمبر", url: "https://bloglovers.pk/kids/ayk-nnhi-chyonti-aur-ayk-azym-pyghmbrhkmt-bhri-anokhi-mlaqat" }
    ];

    const aqwal = [
        { title: "تعلیم کی روشنی پر 50 اقوال زریں", url: "https://bloglovers.pk/aqwal/taleem-ki-roshni-par-50-aqwal-zareen" },
        { title: "ڈیجیٹل گمراہی اور اقبال کی رہنمائی", url: "https://bloglovers.pk/aqwal/dyjytl-gmrahi-aur-aqbal-ki-rhnmai-aaj-ke-nojoan-ke-lye-10-bhtryn-hkmt-amlyantxt" }
    ];

    const islamiSawalat = [
        { title: "قرآن مجید پر 50 دلچسپ سوالات", url: "https://bloglovers.pk/islami-sawalat/quran-majeed-par-50-dilchasp-sawalat" },
        { title: "نماز کی اہمیت پر مبنی 50 سوالات", url: "https://bloglovers.pk/islami-sawalat/namaz-ki-ahmiyat-par-mabni-50-sawalat" }
    ];

    const motivation = [
        { title: "حوصلہ افزائی کے 50 پیغامات", url: "https://bloglovers.pk/motivation/hausla-afzai-ke-50-paighamaat" }
    ];

    const tareekh = [
        { title: "تکشاشیلا سے نالندہ تک علم کا سفر", url: "https://bloglovers.pk/tareekh/taxila-se-nalanda-tak-ilm-ki-woh-shahrah-jis-par-chal-kar-dunya-bad-gai" },
        { title: "سقوط ڈھاکہ - وہ غلطیاں جنہوں نے پاکستان کو دو لخت کیا", url: "https://bloglovers.pk/tareekh/suqoot-dhaka-woh-kon-si-ghaltiyan-thin-jinhon-ne-pakistan-ko-do-lakht-kiya" },
        { title: "سلطنت عثمانیہ کا زوال", url: "https://bloglovers.pk/tareekh/sltnt-asmanyh-ka-zoal-kya-srf-jng-hi-wjh-thi" },
        { title: "دیوار برلن کی اصل کہانی", url: "https://bloglovers.pk/tareekh/anti-fascist-rampart-ya-insaniyat-ka-qaid-khana-dewar-e-berlin-ki-asal-kahani" },
        { title: "سلطنت مغلیہ کے وہ راز جو تاریخ میں نہیں", url: "https://bloglovers.pk/tareekh/saltanat-e-mughlia-ke-woh-raaz-jo-tareekh-ki-kitabon-mein-nahi-miltay" },
        { title: "نیموگرام - بدھ مت کا گم شدہ شہر", url: "https://bloglovers.pk/tareekh/nymogram-bdh-mt-ki-azmt-rfth-ka-gm-shdh-shhr" },
        { title: "مایا تہذیب کے انہدام کا راز", url: "https://bloglovers.pk/tareekh/maya-tahzeeb-ke-inhidaam-ka-raaz-qahat-jang-ya-koi-aur-wajah" },
        { title: "منگولوں کا اسلام کا محافظ بننا", url: "https://bloglovers.pk/tareekh/jin-mangoloon-ne-islam-ko-mitana-tha-woh-is-ke-muhafiz-kaise-ban-gaye" }
    ];

    const shakhsiyat = [
        { title: "ابن سینا (Avicenna)", url: "https://bloglovers.pk/shakhsiyat/muslim-tareekh-ki-50-eham-shakhsiyat-1-ibn-e-sina-avicenna" },
        { title: "ابن النفیس", url: "https://bloglovers.pk/shakhsiyat/mslm-tarykh-ki-50-ahm-shkhsyat-2-abn-alnfys" },
        { title: "نصیر الدین طوسی", url: "https://bloglovers.pk/shakhsiyat/mslm-tarykh-ki-50-ahm-shkhsyat-3-nsyr-aldyn-tosi" },
        { title: "ابن مسکویہ", url: "https://bloglovers.pk/shakhsiyat/mslm-tarykh-ki-50-ahm-shkhsyat-4-abn-mskoyh" },
        { title: "ابوریحان البیرونی", url: "https://bloglovers.pk/shakhsiyat/muslim-tareekh-ki-50-eham-shakhsiyat-5-abul-rayhan-al-beruni" },
        { title: "ابن الہیثم", url: "https://bloglovers.pk/shakhsiyat/mslm-tarykh-ki-50-ahm-shkhsyat-6-abn-alhysm" },
        { title: "عمر خیام", url: "https://bloglovers.pk/shakhsiyat/muslim-tareekh-ki-50-eham-shakhsiyat-7-omar-khayyam" },
        { title: "ابن بطوطہ", url: "https://bloglovers.pk/shakhsiyat/mslm-tarykh-ki-50-ahm-shkhsyat-8-abn-btoth" },
        { title: "ابن خلدون", url: "https://bloglovers.pk/shakhsiyat/muslim-tareekh-ki-50-eham-shakhsiyat-9-ibn-e-khaldoon" },
        { title: "الخوارزمی", url: "https://bloglovers.pk/shakhsiyat/muslim-tareekh-ki-50-eham-shakhsiyat-10-al-khawarizmi" }
    ];

    // ===== رینڈر فنکشن =====
    function renderArticles(containerId, data, limit = 10) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const items = data.slice(0, limit);
        container.innerHTML = items.map(item =>
            `<div class="article-row">
                <span class="title">${item.title}</span>
                <a href="${item.url}" class="link">📖 پڑھیں</a>
            </div>`
        ).join('');
    }

    // ===== تمام کیٹگریز رینڈر کریں =====
    renderArticles('alamaat-sughra-list', alamaatSughra, 20);
    renderArticles('alamaat-kubra-list', alamaatKubra, 10);
    renderArticles('islami-taleemat-list', islamiTaleemat, 10);
    renderArticles('azkar-list', azkar, 6);
    renderArticles('taleem-list', taleem, 10);
    renderArticles('mazameen-list', mazameen, 10);
    renderArticles('english-adab-list', englishAdab, 10);
    renderArticles('technology-list', technology, 5);
    renderArticles('kids-list', kids, 8);
    renderArticles('aqwal-list', aqwal, 2);
    renderArticles('islami-sawalat-list', islamiSawalat, 2);
    renderArticles('motivation-list', motivation, 1);
    renderArticles('tareekh-list', tareekh, 8);
    renderArticles('shakhsiyat-list', shakhsiyat, 10);
</script>

</body>
</html>
