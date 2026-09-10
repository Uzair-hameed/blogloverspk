#!/usr/bin/env python3
"""
WebP Link Converter
Reads: posts-webp-urls.xlsx
Converts: All image URLs in posts from .png/.jpg → .webp
"""

import pandas as pd
import os
import glob

EXCEL_FILE = 'posts-webp-urls.xlsx'

def clean_url(url):
    if pd.isna(url):
        return None
    return str(url).strip().rstrip('\\/ \n\r\t')

def main():
    print("🚀 WebP Link Converter")
    print("=" * 60)
    
    if not os.path.exists(EXCEL_FILE):
        print(f"❌ File not found: {EXCEL_FILE}")
        return
    
    # Excel لوڈ کریں
    print(f"📂 Loading: {EXCEL_FILE}")
    df = pd.read_excel(EXCEL_FILE, sheet_name='Sheet1')
    print(f"✅ Loaded {len(df)} rows\n")
    
    # Image URLs نکالیں
    image_urls = []
    for index, row in df.iterrows():
        url = clean_url(row.get('Images Url'))
        if not url:
            continue
        
        if url.lower().endswith('.webp'):
            continue
        
        new_url = url
        for ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.ico']:
            if new_url.lower().endswith(ext):
                new_url = new_url[:-len(ext)] + '.webp'
                break
        
        image_urls.append({'old': url, 'new': new_url})
    
    print(f"✅ Found {len(image_urls)} URLs to convert\n")
    
    if not image_urls:
        print("⚠️  No URLs to convert.")
        return
    
    # تمام پوسٹ فائلیں ڈھونڈیں
    post_files = []
    for ext in ['.md', '.html', '.htm', '.markdown', '.txt']:
        post_files.extend(glob.glob(f'**/*{ext}', recursive=True))
    
    skip = ['node_modules', '.git', 'vendor', '__pycache__', '.venv', 'venv']
    post_files = [f for f in post_files if not any(s in f for s in skip)]
    
    print(f"📁 Found {len(post_files)} post files\n")
    print("🔄 Converting URLs...")
    print("=" * 60)
    
    total_updates = 0
    updated_files = 0
    
    for file_path in post_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            file_updates = 0
            
            for item in image_urls:
                if item['old'] in content:
                    content = content.replace(item['old'], item['new'])
                    file_updates += 1
            
            if file_updates > 0:
                with open(file_path + '.backup', 'w', encoding='utf-8') as f:
                    f.write(original)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                updated_files += 1
                total_updates += file_updates
                print(f"✅ {file_path}: {file_updates} links")
                
        except Exception as e:
            print(f"❌ {file_path}: {e}")
    
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"✅ Files updated:   {updated_files}")
    print(f"🔄 Links converted: {total_updates}")
    print(f"💾 Backups created: {updated_files}")
    print("=" * 60)

if __name__ == '__main__':
    main()
