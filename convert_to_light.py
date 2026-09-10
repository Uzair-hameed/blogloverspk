#!/usr/bin/env python3
"""
Dark to Light Theme Converter - CORRECT VERSION
Matches the actual CSS variables used in blogloverspk
"""

import os
import glob
import re


def convert_dark_to_light(content):
    """Convert Dark theme to Light theme - matches actual variables"""
    
    # Skip if already converted
    if '/* ✅ Light Theme */' in content:
        return content, False
    
    # Check if it's a dark theme file
    dark_indicators = [
        '--dark: #0a0a1a',
        '--darker: #060612',
        '--dark: #',
        '--darker: #',
        '--text: #e0e0e0',
        '--bg-primary: #0a0a0f',  # in case some files have old structure
        '--bg-primary: #07070d',
    ]
    
    is_dark = any(ind in content for ind in dark_indicators)
    
    if not is_dark:
        return content, False
    
    original = content
    
    # ===== 1. REPLACE :root VARIABLES =====
    # Match the :root block with the actual variables
    root_pattern = re.compile(
        r':root\s*\{[^}]*--neon-glow[^}]*\}',
        re.DOTALL
    )
    
    root_new = ''':root {
            /* ✅ Light Theme */
            --primary: #0ea5e9;
            --secondary: #10b981;
            --accent: #dc2626;
            --gold: #d97706;
            --dark: #f5f7fa;
            --darker: #e8eef5;
            --light: #ffffff;
            --text: #1e293b;
            --text-dark: #0f172a;
            --shadow: 0 10px 30px rgba(0,0,0,0.08);
            --neon-glow: 0 0 20px rgba(14, 165, 233, 0.25);
        }'''
    
    content = re.sub(root_pattern, root_new, content, count=1)
    
    # Also try a simpler pattern in case the structure is different
    if '--dark: #0a0a1a' in content or '--darker: #060612' in content:
        simple_pattern = re.compile(r':root\s*\{[^}]*\}', re.DOTALL)
        content = simple_pattern.sub(root_new, content, count=1)
    
    # ===== 2. BODY BACKGROUND =====
    # The body uses var(--darker) or var(--dark)
    content = content.replace(
        'background: var(--darker);',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);'
    )
    content = content.replace(
        'background: var(--dark);',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);'
    )
    content = content.replace(
        'background: var(--dark) !important;',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%) !important;'
    )
    
    # ===== 3. CARDS - Convert dark cards to light =====
    # rgba dark backgrounds
    content = content.replace('rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.9)')
    content = content.replace('rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.9)')
    content = content.replace('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.95)')
    content = content.replace('rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.95)')
    content = content.replace('rgba(255, 255, 255, 0.07)', 'rgba(255, 255, 255, 0.95)')
    content = content.replace('rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 1)')
    content = content.replace('rgba(255, 255, 255, 0.1)', 'rgba(14, 165, 233, 0.15)')
    
    # Dark backgrounds (navbar, etc.)
    content = content.replace('rgba(10, 10, 15, 0.92)', 'rgba(255, 255, 255, 0.92)')
    content = content.replace('rgba(10, 10, 26, 0.92)', 'rgba(255, 255, 255, 0.92)')
    content = content.replace('rgba(6, 6, 18, 0.92)', 'rgba(255, 255, 255, 0.92)')
    content = content.replace('rgba(10, 10, 15, 0.95)', 'rgba(255, 255, 255, 0.95)')
    
    # ===== 4. SECTION BOXES - use actual names =====
    # Warning box (uses --accent or red)
    content = content.replace('rgba(231, 76, 60, 0.06)', 'rgba(239, 68, 68, 0.08)')
    content = content.replace('rgba(231, 76, 60, 0.08)', 'rgba(239, 68, 68, 0.08)')
    
    # Blessing box
    content = content.replace('rgba(46, 204, 113, 0.05)', 'rgba(34, 197, 94, 0.08)')
    content = content.replace('rgba(46, 204, 113, 0.06)', 'rgba(34, 197, 94, 0.08)')
    
    # ===== 5. GLOW EFFECTS =====
    content = content.replace('rgba(74, 144, 226, 0.3)', 'rgba(14, 165, 233, 0.3)')
    content = content.replace('rgba(74, 144, 226, 0.15)', 'rgba(14, 165, 233, 0.15)')
    content = content.replace('rgba(0, 242, 255, 0.1)', 'rgba(14, 165, 233, 0.15)')
    content = content.replace('rgba(0, 242, 255, 0.15)', 'rgba(14, 165, 233, 0.2)')
    
    # ===== 6. DARK BG COLORS =====
    content = content.replace('#0a0a0f', '#f5f7fa')
    content = content.replace('#07070d', '#f5f7fa')
    content = content.replace('#0a0a1a', '#f5f7fa')
    content = content.replace('#060612', '#e8eef5')
    content = content.replace('#12121a', '#e8eef5')
    content = content.replace('#0d0d16', '#e8eef5')
    
    # ===== 7. TEXT COLORS =====
    content = content.replace('#e0e0e0', '#1e293b')
    content = content.replace('#ffffff', '#1e293b')  # This is tricky - might affect icons
    content = content.replace('#c0c0d0', '#475569')
    content = content.replace('#a0a0b0', '#64748b')
    content = content.replace('#6a6a7a', '#94a3b8')
    
    # ===== 8. ACCENT COLORS =====
    content = content.replace('#4a90e2', '#0ea5e9')
    content = content.replace('#2ecc71', '#10b981')
    content = content.replace('#e74c3c', '#dc2626')
    content = content.replace('#f1c40f', '#d97706')
    content = content.replace('#00f2ff', '#0ea5e9')
    content = content.replace('#7c3aed', '#6366f1')
    content = content.replace('#ffd700', '#d97706')
    
    changed = content != original
    return content, changed


def main():
    print("🚀 Dark to Light Theme Converter - CORRECT VERSION")
    print("=" * 70)
    
    # ===== Find ALL HTML files =====
    html_files = glob.glob('**/*.html', recursive=True)
    
    # ===== Skip certain folders =====
    skip = ['node_modules', '.git', 'vendor', '__pycache__', 'docs/_build']
    html_files = [
        f for f in html_files 
        if not any(s in f for s in skip)
    ]
    
    print(f"📁 Found {len(html_files)} HTML files\n")
    
    # ===== Group by folder =====
    folders = {}
    for f in html_files:
        folder = os.path.dirname(f) or '(root)'
        folders[folder] = folders.get(folder, 0) + 1
    
    print("📂 Files by folder:")
    for folder, count in sorted(folders.items()):
        print(f"   {folder}/: {count}")
    print()
    
    # ===== Process each file =====
    converted = 0
    skipped = 0
    errors = 0
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content, changed = convert_dark_to_light(content)
            
            if changed:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                converted += 1
                print(f"✅ {file_path}")
            else:
                skipped += 1
                print(f"⏭️  {file_path}")
                
        except Exception as e:
            errors += 1
            print(f"❌ {file_path}: {e}")
    
    # ===== Summary =====
    print("\n" + "=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"✅ Converted:  {converted} files")
    print(f"⏭️  Skipped:   {skipped} files")
    print(f"❌ Errors:    {errors} files")
    print(f"📁 Total:     {len(html_files)} files")
    print("=" * 70)


if __name__ == '__main__':
    main()
