#!/usr/bin/env python3
"""
Dark to Light Theme Converter - READABLE TEXT VERSION
- Converts dark theme to light theme
- Makes ALL text readable with proper contrast
- Fixes warning, blessing, prophetic, important boxes
"""

import os
import glob
import re


def convert_dark_to_light(content):
    """Convert Dark theme to Light theme with READABLE text"""
    
    # Skip if already converted with new version
    if '/* ✅ Light Theme - READABLE */' in content:
        return content, False
    
    # Check if it's a dark theme file OR needs text fix
    dark_indicators = [
        '--dark: #0a0a1a',
        '--darker: #060612',
        '--text: #e0e0e0',
        '--bg-primary: #0a0a0f',
        '--bg-primary: #07070d',
        'color: #fca5a5',       # Warning text - light red
        'color: #86efac',       # Blessing text - light green
        'color: #c4b5fd',       # Prophetic text - light purple
        'color: #fde047',       # Important text - light yellow
        '#fca5a5',              # Any light red text
        '#86efac',              # Any light green text
    ]
    
    is_dark = any(ind in content for ind in dark_indicators)
    
    if not is_dark:
        return content, False
    
    original = content
    
    # ===== 1. FIX :root VARIABLES =====
    root_pattern = re.compile(
        r':root\s*\{[^}]*--neon-glow[^}]*\}',
        re.DOTALL
    )
    
    root_new = ''':root {
            /* ✅ Light Theme - READABLE */
            --primary: #0284c7;
            --secondary: #059669;
            --accent: #dc2626;
            --gold: #b45309;
            --dark: #f5f7fa;
            --darker: #e8eef5;
            --light: #ffffff;
            --text: #1f2937;
            --text-dark: #0f172a;
            --shadow: 0 10px 30px rgba(0,0,0,0.08);
            --neon-glow: 0 0 20px rgba(2, 132, 199, 0.25);
        }'''
    
    content = re.sub(root_pattern, root_new, content, count=1)
    
    # Fallback for different :root structure
    if '--dark: #0a0a1a' in content or '--darker: #060612' in content:
        simple_pattern = re.compile(r':root\s*\{[^}]*\}', re.DOTALL)
        content = simple_pattern.sub(root_new, content, count=1)
    
    # ===== 2. FIX ALL SECTION BOXES (READABLE) =====
    
    # --- WARNING BOX ---
    # Fix text color
    content = content.replace('.section-warning p { color: #fca5a5; }', '.section-warning p { color: #7f1d1d; }')
    content = content.replace('.section-warning p { color: #fca5a5 }', '.section-warning p { color: #7f1d1d; }')
    content = content.replace('color: #fca5a5;', 'color: #7f1d1d;')  # global fallback
    content = content.replace('color: #fca5a5}', 'color: #7f1d1d;}')
    # Fix background - slightly stronger
    content = content.replace('background: rgba(239, 68, 68, 0.08);', 'background: rgba(254, 226, 226, 0.85);')
    content = content.replace('background: rgba(255, 0, 0, 0.06);', 'background: rgba(254, 226, 226, 0.85);')
    # Fix border
    content = content.replace('border-right: 6px solid #dc2626;', 'border-right: 6px solid #dc2626;')
    content = content.replace('border-right: 6px solid #ef4444;', 'border-right: 6px solid #dc2626;')
    
    # --- BLESSING BOX ---
    content = content.replace('.section-blessing p { color: #86efac; }', '.section-blessing p { color: #14532d; }')
    content = content.replace('color: #86efac;', 'color: #14532d;')
    content = content.replace('background: rgba(34, 197, 94, 0.08);', 'background: rgba(220, 252, 231, 0.85);')
    content = content.replace('background: rgba(0, 255, 0, 0.05);', 'background: rgba(220, 252, 231, 0.85);')
    content = content.replace('border-right: 6px solid #16a34a;', 'border-right: 6px solid #16a34a;')
    content = content.replace('border-right: 6px solid #22c55e;', 'border-right: 6px solid #16a34a;')
    
    # --- PROPHETIC BOX ---
    content = content.replace('.section-prophetic p { color: #c4b5fd; }', '.section-prophetic p { color: #3730a3; }')
    content = content.replace('color: #c4b5fd;', 'color: #3730a3;')
    content = content.replace('background: rgba(99, 102, 241, 0.08);', 'background: rgba(224, 231, 255, 0.85);')
    content = content.replace('background: rgba(124, 58, 237, 0.06);', 'background: rgba(224, 231, 255, 0.85);')
    content = content.replace('border-right: 6px solid #6366f1;', 'border-right: 6px solid #6366f1;')
    content = content.replace('border-right: 6px solid #a855f7;', 'border-right: 6px solid #6366f1;')
    
    # --- IMPORTANT BOX ---
    content = content.replace('.section-important p { color: #fde047; }', '.section-important p { color: #78350f; }')
    content = content.replace('color: #fde047;', 'color: #78350f;')
    content = content.replace('background: rgba(217, 119, 6, 0.08);', 'background: rgba(254, 243, 199, 0.85);')
    content = content.replace('background: rgba(255, 215, 0, 0.05);', 'background: rgba(254, 243, 199, 0.85);')
    content = content.replace('border-right: 6px solid var(--gold);', 'border-right: 6px solid #d97706;')
    
    # ===== 3. FIX MAIN TEXT COLORS =====
    # Make text darker for better readability
    content = content.replace('--text: #e0e0e0', '--text: #1f2937')
    content = content.replace('#e0e0e0', '#1f2937')
    content = content.replace('#c0c0d0', '#374151')
    content = content.replace('#a0a0b0', '#4b5563')
    content = content.replace('#6a6a7a', '#6b7280')
    content = content.replace('color: #475569;', 'color: #374151;')
    content = content.replace('color: #1e293b;', 'color: #111827;')
    
    # ===== 4. FIX HIGHLIGHT BOX =====
    content = content.replace(
        'background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(99, 102, 241, 0.08));',
        'background: linear-gradient(135deg, rgba(224, 242, 254, 0.9), rgba(224, 231, 255, 0.9));'
    )
    content = content.replace(
        '.highlight-box p { color: var(--text-primary); font-size: 1.2em; }',
        '.highlight-box p { color: #0c4a6e; font-size: 1.2em; font-weight: 500; }'
    )
    content = content.replace('color: var(--text-primary); font-size: 1.2em;', 'color: #0c4a6e; font-size: 1.2em; font-weight: 500;')
    
    # ===== 5. BODY BACKGROUND =====
    content = content.replace(
        'background: var(--darker);',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);'
    )
    content = content.replace(
        'background: var(--dark);',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);'
    )
    
    # ===== 6. POST CONTENT TEXT =====
    # Post paragraphs - darker text
    content = content.replace('color: var(--text-secondary);', 'color: #374151;')
    content = content.replace('.post-content p {\n            font-size: 1.1em;\n            line-height: 2.2;\n            color: #475569;', '.post-content p {\n            font-size: 1.1em;\n            line-height: 2.2;\n            color: #1f2937;')
    
    # ===== 7. NAVBAR / HEADER =====
    content = content.replace('rgba(10, 10, 15, 0.92)', 'rgba(255, 255, 255, 0.95)')
    content = content.replace('rgba(10, 10, 26, 0.92)', 'rgba(255, 255, 255, 0.95)')
    content = content.replace('rgba(6, 6, 18, 0.92)', 'rgba(255, 255, 255, 0.95)')
    
    # ===== 8. CARDS =====
    content = content.replace('rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.95)')
    content = content.replace('rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.95)')
    content = content.replace('rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 1)')
    content = content.replace('rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 1)')
    content = content.replace('rgba(255, 255, 255, 0.07)', 'rgba(255, 255, 255, 1)')
    content = content.replace('rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 1)')
    
    # ===== 9. DARK BG COLORS =====
    content = content.replace('#0a0a0f', '#f5f7fa')
    content = content.replace('#07070d', '#f5f7fa')
    content = content.replace('#0a0a1a', '#f5f7fa')
    content = content.replace('#060612', '#e8eef5')
    content = content.replace('#12121a', '#e8eef5')
    content = content.replace('#0d0d16', '#e8eef5')
    
    # ===== 10. ACCENT COLORS =====
    content = content.replace('#4a90e2', '#0284c7')
    content = content.replace('#2ecc71', '#059669')
    content = content.replace('#e74c3c', '#dc2626')
    content = content.replace('#f1c40f', '#b45309')
    content = content.replace('#00f2ff', '#0ea5e9')
    content = content.replace('#7c3aed', '#6366f1')
    content = content.replace('#ffd700', '#d97706')
    
    # ===== 11. SCROLLBAR =====
    content = content.replace('background: var(--bg-secondary);', 'background: #e8eef5;')
    
    # ===== 12. SELECTION =====
    content = content.replace('::selection { background: rgba(0, 242, 255, 0.3); color: #fff; }', '::selection { background: rgba(2, 132, 199, 0.25); color: #0c4a6e; }')
    
    changed = content != original
    return content, changed


def main():
    print("🚀 Dark to Light Theme Converter - READABLE TEXT VERSION")
    print("=" * 70)
    
    # Find ALL HTML files
    html_files = glob.glob('**/*.html', recursive=True)
    
    # Skip certain folders
    skip = ['node_modules', '.git', 'vendor', '__pycache__', 'docs/_build']
    html_files = [f for f in html_files if not any(s in f for s in skip)]
    
    print(f"📁 Found {len(html_files)} HTML files\n")
    
    # Group by folder
    folders = {}
    for f in html_files:
        folder = os.path.dirname(f) or '(root)'
        folders[folder] = folders.get(folder, 0) + 1
    
    print("📂 Files by folder:")
    for folder, count in sorted(folders.items()):
        print(f"   {folder}/: {count}")
    print()
    
    # Process each file
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
                
        except Exception as e:
            errors += 1
            print(f"❌ {file_path}: {e}")
    
    # Summary
    print("\n" + "=" * 70)
    print("📊 SUMMARY")
    print("=" * 70)
    print(f"✅ Converted:  {converted} files")
    print(f"⏭️  Skipped:   {skipped} files")
    print(f"❌ Errors:    {errors} files")
    print(f"📁 Total:     {len(html_files)} files")
    print("=" * 70)
    print("\n✅ Done! Text is now readable with proper contrast.")


if __name__ == '__main__':
    main()
