#!/usr/bin/env python3
"""
WebP Link Converter - Direct HTML/MD Replacement
Excel کی ضرورت نہیں
"""

import os
import glob
import re

def main():
    print("🚀 WebP Link Converter (Direct)")
    print("=" * 60)
    
    # ===== تمام فائلیں ڈھونڈیں =====
    post_files = []
    for ext in ['.html', '.htm', '.md', '.markdown', '.txt', '.xml', '.json']:
        post_files.extend(glob.glob(f'**/*{ext}', recursive=True))
    
    # Skip فولڈرز
    skip = ['node_modules', '.git', 'vendor', '__pycache__', '.venv', 'venv']
    post_files = [f for f in post_files if not any(s in f for s in skip)]
    
    print(f"📁 Found {len(post_files)} files\n")
    print("🔄 Converting image URLs (.png/.jpg/.jpeg/.gif → .webp)...")
    print("=" * 60)
    
    total_changes = 0
    changed_files = 0
    
    # ===== Regex Patterns =====
    # صرف bloglovers.pk کی URLs کو تبدیل کریں
    # یہ pattern تمام extensions کو ڈھونڈتا ہے
    
    patterns = [
        # 1. مکمل URL: https://bloglovers.pk/images/.../file.png
        (re.compile(
            r'(https://bloglovers\.pk/images/[^\s"\'<>\)]+?)\.(png|jpg|jpeg|gif|bmp|tiff|ico)(\?[^\s"\'<>\)]*)?',
            re.IGNORECASE
        ), r'\1.webp\3'),
        
        # 2. Relative path: /images/.../file.png
        (re.compile(
            r'(/images/[^\s"\'<>\)]+?)\.(png|jpg|jpeg|gif|bmp|tiff|ico)(\?[^\s"\'<>\)]*)?',
            re.IGNORECASE
        ), r'\1.webp\3'),
    ]
    
    for file_path in post_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            file_changes = 0
            
            # ہر pattern لگائیں
            for pattern, replacement in patterns:
                new_content, count = pattern.subn(replacement, content)
                if count > 0:
                    file_changes += count
                    content = new_content
            
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                changed_files += 1
                total_changes += file_changes
                print(f"✅ {file_path}: {file_changes} URLs")
                
        except Exception as e:
            print(f"❌ {file_path}: {e}")
    
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"✅ Files updated:    {changed_files}")
    print(f"🔄 URLs converted:   {total_changes}")
    print("=" * 60)
    
    if total_changes > 0:
        print("\n✅ Done! اب آپ کا thumbnail show ہوگا!")
    else:
        print("\n⚠️  کوئی تبدیلی نہیں ہوئی — تمام URLs پہلے سے webp ہیں")

if __name__ == '__main__':
    main()
