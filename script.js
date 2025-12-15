/* =========================================
   NEW: IMAGE THUMBNAILS STYLING (Added)
   ========================================= */

/* تھمب نیلز کے لیے */
.thumb, .l-thumb {
    position: relative;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.thumb img, .l-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

/* اگر تصویر نہیں ہے تو fallback */
.thumb:not(:has(img)), .l-thumb:not(:has(img)) {
    background: var(--accent);
    display: flex;
    justify-content: center;
    align-items: center;
}

.thumb:not(:has(img))::after {
    content: '📄';
    font-size: 2.5em;
    opacity: 0.6;
}

.l-thumb:not(:has(img))::after {
    content: '📝';
    font-size: 1.5em;
    opacity: 0.6;
}

/* سلائیڈر کے لیے */
.slide > div:first-child {
    position: relative;
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* ہوور افیکٹس */
.post-card:hover .thumb img {
    transform: scale(1.05);
}

/* رلیٹڈ پوسٹس کے تھمب نیلز */
.r-thumb {
    position: relative;
    overflow: hidden;
    height: 110px;
}

.r-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.r-card:hover .r-thumb img {
    transform: scale(1.05);
}

/* اگر تصویر نہیں لوڈ ہوتی */
img[src*=".png"]:hover, img[src*=".jpg"]:hover, img[src*=".jpeg"]:hover {
    opacity: 0.9;
}

/* لیزی لوڈنگ کے لیے */
img[loading="lazy"] {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* سلائیڈر کیپشن میں بہتری */
.slide-caption {
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    padding: 20px;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: white;
}

.cat-tag {
    background: var(--accent);
    padding: 4px 12px;
    border-radius: 3px;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 8px;
}

/* موبائل کے لیے ایڈجسٹمنٹ */
@media (max-width: 768px) {
    .thumb {
        height: 140px !important;
    }
    
    .l-thumb {
        width: 80px !important;
        height: 60px !important;
    }
    
    .slide-caption h2 {
        font-size: 1.3em !important;
    }
}
