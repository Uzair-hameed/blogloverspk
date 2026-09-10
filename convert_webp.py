#!/usr/bin/env python3
"""
WebP Link Converter for blogloverspk
- تمام category folders میں HTML files
- category-pages folder
- interlink-data.js
- sitemap.xml
"""

import os
import glob
import re

def main():
    print("🚀 WebP Link Converter for blogloverspk")
    print("=" * 60)
    
    # ===== تمام فائلیں ڈھونڈیں =====
    all_files = []
    
    # 1. Root folder میں HTML فائلیں (index, about, contact, etc.)
    root_html = glob.glob('*.html')
    all_files.extend(root_html)
    print(f"📁 Root HTML:        {len(root_html)} files")
    
    # 2. تمام category folders میں HTML فائلیں
    category_folders = [
        'alamaat-kubra', 'alamaat-sughra', 'aqwal', 'azkar',
        'english-adab', 'islami-sawalat', 'islami-taleemat',
        'kids', 'mazameen', 'motivation', 'shakhsiyat',
        'taleem', 'tareekh', 'technology'
    ]
    
    total_cat = 0
    for folder in category_folders:
        if os.path.exists(folder):
            files = glob.glob(f'{folder}/**/*.html', recursive=True)
            all_files.extend(files)
            total_cat += len(files)
            print(f"📁 {folder}/: {len(files)} files")
    
    # 3. category-pages folder
    cat_pages = glob.glob('category-pages/*.html')
    all_files.extend(cat_pages)
    print(f"📁 category-pages/:  {len(cat_pages)} files")
    
    # 4. JS files (interlink-data.js, auto-interlink.js, reactions.js)
    js_files = glob.glob('*.js')
    all_files.extend(js_files)
    print(f"📁 JS Files:         {len(js_files)} files")
    
    # 5. XML files (sitemap.xml)
    xml_files = glob.glob('*.xml')
    all_files.extend(xml_files)
    print(f"📁 XML Files:        {len(xml_files)} files")
    
    # 6. JSON files if any
    json_files = glob.glob('*.json')
    all_files.extend(json_files)
    print(f"📁 JSON Files:       {len(json_files)} files")
    
    # Remove duplicates
    all_files = list(set(all_files))
    
    print(f"\n📊 Total files: {len(all_files)}")
    print("=" * 60)
    print("🔄 Converting .png/.jpg/.jpeg/.gif → .webp\n")
    
    # ===== Pattern =====
    # تمام image URLs کو ڈھونڈیں (full URL + relative)
    pattern = re.compile(
        r'(https?://bloglovers\.pk/images/[^\s"\'<>\)\]]+?|/images/[^\s"\'<>\)\]]+?|images/[^\s"\'<>\)\]]+?)\.(png|jpg|jpeg|gif|bmp|tiff|ico)(\?[^\s"\'<>\)\]]*)?',
        re.IGNORECASE
    )
    
    total_changes = 0
    changed_files = 0
    unchanged_files = 0
    
    # ===== ہر فائل پروسیس کریں =====
    for file_path in sorted(all_files):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content, count = pattern.subn(r'\1.webp\3', content)
            
            if count > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                changed_files += 1
                total_changes += count
                print(f"✅ {file_path}: {count} URLs")
            else:
                unchanged_files += 1
                
        except Exception as e:
            print(f"❌ {file_path}: {e}")
    
    # ===== خلاصہ =====
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"✅ Files updated:     {changed_files}")
    print(f"⏭️  Files unchanged:  {unchanged_files}")
    print(f"🔄 URLs converted:    {total_changes}")
    print("=" * 60)
    
    if total_changes > 0:
        print("\n🎉 کام مکمل!")
        print("\n📌 آپ کی ویب سائٹ پر:")
        print("   ✅ Category pages پر thumbnails")
        print("   ✅ Post pages پر featured images")
        print("   ✅ Related posts کی thumbnails")
        print("   ✅ Auto interlinks میں تصاویر")
        print("   ✅ WhatsApp/FB preview")
        print("   ✅ Google search image")
    else:
        print("\n⚠️  کوئی تبدیلی نہیں ہوئی")
        print("   (تمام URLs پہلے سے .webp ہیں)")

if __name__ == '__main__':
    main()
