#!/usr/bin/env python3
"""
WebP Link Converter - Direct HTML Replacement
تمام HTML/MD فائلوں میں .png/.jpg کو .webp میں تبدیل کریں
"""

import os
import glob
import re

def main():
    print("🚀 WebP Link Converter - Direct Mode")
    print("=" * 60)
    
    # تمام فائلیں ڈھونڈیں
    post_files = []
    for ext in ['.html', '.htm', '.md', '.markdown', '.txt', '.xml', '.json']:
        post_files.extend(glob.glob(f'**/*{ext}', recursive=True))
    
    # Skip unnecessary folders
    skip = ['node_modules', '.git', 'vendor', '__pycache__', '.venv', 'venv']
    post_files = [f for f in post_files if not any(s in f for s in skip)]
    
    print(f"📁 Found {len(post_files)} files")
    print("🔄 Converting .png/.jpg/.jpeg/.gif → .webp")
    print("=" * 60)
    
    total_changes = 0
    changed_files = 0
    
    # یہ pattern تمام image URLs کو ڈھونڈتا ہے
    pattern = re.compile(
        r'(https?://bloglovers\.pk/images/[^\s"\'<>\)]+?|/images/[^\s"\'<>\)]+?)\.(png|jpg|jpeg|gif|bmp|tiff|ico)(\?[^\s"\'<>\)]*)?',
        re.IGNORECASE
    )
    
    for file_path in post_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # تبدیل کریں
            new_content, count = pattern.subn(r'\1.webp\3', content)
            
            if count > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                changed_files += 1
                total_changes += count
                print(f"✅ {file_path}: {count} URLs")
                
        except Exception as e:
            print(f"❌ {file_path}: {e}")
    
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"✅ Files updated:    {changed_files}")
    print(f"🔄 URLs converted:   {total_changes}")
    print("=" * 60)
    
    if total_changes > 0:
        print("\n🎉 Done! Ab thumbnails show hongi!")
    else:
        print("\n⚠️  No changes. All URLs are already .webp")

if __name__ == '__main__':
    main()
