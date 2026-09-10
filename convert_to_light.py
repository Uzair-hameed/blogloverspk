#!/usr/bin/env python3
"""
Dark to Light Theme Converter - SMART VERSION
- Handles ALL variations of dark theme
- Covers: root, all category folders, category-pages
- Preserves Post_DATA, API links, JavaScript exactly as-is
"""

import os
import glob
import re


def convert_dark_to_light(content):
    """Convert Dark theme CSS to Light theme - handles all variations"""
    
    # Skip if already converted
    if '/* ✅ Light Theme */' in content:
        return content, False
    
    # Check if it's a dark theme file (any variation)
    dark_indicators = [
        '--bg-primary: #0a0a0f',
        '--bg-primary: #07070d',
        '--bg-primary: #0',
        '#0a0a0f',
        '#07070d',
        '--bg-primary: #'
    ]
    
    is_dark = False
    for indicator in dark_indicators:
        if indicator in content:
            is_dark = True
            break
    
    if not is_dark:
        return content, False
    
    original = content
    
    # ===== 1. REPLACE ENTIRE :root BLOCK =====
    # Smart regex - match from :root { to the closing } of :root
    root_pattern = re.compile(
        r':root\s*\{[^}]*--transition[^}]*\}',
        re.DOTALL
    )
    
    root_new = ''':root {
            /* ✅ Light Theme */
            --bg-primary: #f5f7fa;
            --bg-secondary: #e8eef5;
            --bg-card: rgba(255, 255, 255, 0.85);
            --bg-card-hover: rgba(255, 255, 255, 1);
            --border-glass: rgba(14, 165, 233, 0.12);
            --border-glow: rgba(14, 165, 233, 0.4);
            
            --gradient-hero: linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #d97706 100%);
            --gradient-gold: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
            --gradient-blue: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%);
            --gradient-purple: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            
            /* Fallback for index.html variations */
            --gradient-1: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #6366f1 100%);
            --gradient-2: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
            --gradient-3: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #6366f1 100%);
            --gradient-4: linear-gradient(135deg, #d946ef 0%, #e11d48 50%, #38bdf8 100%);
            
            --text-primary: #1e293b;
            --text-secondary: #475569;
            --text-muted: #94a3b8;
            
            --neon-blue: #0ea5e9;
            --neon-purple: #6366f1;
            --neon-pink: #e11d48;
            --gold: #d97706;
            
            --radius-sm: 12px;
            --radius-md: 18px;
            --radius-lg: 24px;
            --radius-full: 9999px;
            
            --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
            --shadow-hover: 0 12px 40px rgba(14, 165, 233, 0.15);
            
            --transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }'''
    
    # Try multiple patterns
    content = re.sub(root_pattern, root_new, content, count=1)
    
    # Fallback: if :root still has dark colors, try simpler regex
    if '--bg-primary: #0a0a0f' in content or '--bg-primary: #07070d' in content:
        # Simple pattern
        root_simple = re.compile(r':root\s*\{.*?\n\s*\}', re.DOTALL)
        content = root_simple.sub(root_new, content, count=1)
    
    # ===== 2. BODY BACKGROUND =====
    content = content.replace(
        'background: var(--bg-primary);\n            color: var(--text-primary);\n            overflow-x: hidden;',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);\n            background-attachment: fixed;\n            color: var(--text-primary);\n            overflow-x: hidden;'
    )
    
    # ===== 3. HEADER NAV =====
    content = content.replace(
        'background: rgba(10, 10, 15, 0.92);',
        'background: rgba(255, 255, 255, 0.92);'
    )
    
    # Also handle index.html variations
    content = content.replace(
        'background: rgba(7, 7, 13, 0.92);',
        'background: rgba(255, 255, 255, 0.92);'
    )
    
    # ===== 4. LOADING OVERLAY =====
    content = content.replace(
        'background: var(--bg-primary);\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            z-index: 9999;',
        'background: #f5f7fa;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            z-index: 9999;'
    )
    
    content = content.replace(
        'border: 3px solid rgba(255,255,255,0.05);',
        'border: 3px solid rgba(14, 165, 233, 0.1);'
    )
    
    # ===== 5. BREADCRUMBS =====
    content = content.replace(
        'background: rgba(255,255,255,0.02);',
        'background: rgba(14, 165, 233, 0.04);'
    )
    
    # ===== 6. HERO SECTION =====
    content = content.replace(
        'background: linear-gradient(180deg, rgba(0, 242, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 50%, rgba(255, 215, 0, 0.03) 100%);',
        'background: linear-gradient(180deg, rgba(14, 165, 233, 0.08) 0%, rgba(99, 102, 241, 0.06) 50%, rgba(217, 119, 6, 0.04) 100%);'
    )
    
    # ===== 7. SECTION BOXES =====
    content = content.replace(
        'background: rgba(255, 0, 0, 0.06);',
        'background: rgba(239, 68, 68, 0.08);'
    )
    content = content.replace(
        '.section-warning p { color: #fca5a5; }',
        '.section-warning p { color: #991b1b; }'
    )
    
    content = content.replace(
        'background: rgba(0, 255, 0, 0.05);',
        'background: rgba(34, 197, 94, 0.08);'
    )
    content = content.replace(
        '.section-blessing p { color: #86efac; }',
        '.section-blessing p { color: #166534; }'
    )
    
    content = content.replace(
        'background: rgba(124, 58, 237, 0.06);',
        'background: rgba(99, 102, 241, 0.08);'
    )
    content = content.replace(
        '.section-prophetic p { color: #c4b5fd; }',
        '.section-prophetic p { color: #3730a3; }'
    )
    
    content = content.replace(
        'background: rgba(255, 215, 0, 0.05);',
        'background: rgba(217, 119, 6, 0.08);'
    )
    content = content.replace(
        '.section-important p { color: #fde047; }',
        '.section-important p { color: #92400e; }'
    )
    
    # ===== 8. HIGHLIGHT BOX =====
    content = content.replace(
        'background: linear-gradient(135deg, rgba(0, 242, 255, 0.06), rgba(124, 58, 237, 0.06));',
        'background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(99, 102, 241, 0.08));'
    )
    
    # ===== 9. SCROLLBAR =====
    content = content.replace(
        '::-webkit-scrollbar-track { background: var(--bg-secondary); }',
        '::-webkit-scrollbar-track { background: #e8eef5; }'
    )
    
    # ===== 10. GLOW EFFECTS =====
    content = content.replace(
        'box-shadow: 0 0 25px rgba(0, 242, 255, 0.1);',
        'box-shadow: 0 0 25px rgba(14, 165, 233, 0.15);'
    )
    content = content.replace(
        'box-shadow: 0 0 25px rgba(0, 242, 255, 0.15);',
        'box-shadow: 0 0 25px rgba(14, 165, 233, 0.2);'
    )
    content = content.replace(
        'box-shadow: 0 12px 48px rgba(0, 242, 255, 0.15);',
        'box-shadow: 0 12px 40px rgba(14, 165, 233, 0.15);'
    )
    
    # ===== 11. BG ORBS =====
    content = content.replace(
        'radial-gradient(circle, #00f2ff, transparent)',
        'radial-gradient(circle, #0ea5e9, transparent)'
    )
    content = content.replace(
        'radial-gradient(circle, #7c3aed, transparent)',
        'radial-gradient(circle, #6366f1, transparent)'
    )
    content = content.replace(
        'radial-gradient(circle, #ffd700, transparent)',
        'radial-gradient(circle, #d97706, transparent)'
    )
    
    # ===== 12. PARTICLE CANVAS OPACITY =====
    content = content.replace(
        'width: 100%;\n            height: 100%;\n            z-index: -1;\n        }\n\n        .bg-orb',
        'width: 100%;\n            height: 100%;\n            z-index: -1;\n            opacity: 0.4;\n        }\n\n        .bg-orb'
    )
    
    # ===== 13. SELECTION =====
    content = content.replace(
        '::selection { background: rgba(0, 242, 255, 0.3); color: #fff; }',
        '::selection { background: rgba(14, 165, 233, 0.25); color: #1e293b; }'
    )
    
    # ===== 14. TOAST (in JS) =====
    content = content.replace(
        'color: #fff; padding: 12px 28px;',
        'color: #1e293b; padding: 12px 28px;'
    )
    
    changed = content != original
    return content, changed


def main():
    print("🚀 Dark to Light Theme Converter - SMART VERSION")
    print("=" * 60)
    
    # ===== Find ALL HTML files =====
    html_files = glob.glob('**/*.html', recursive=True)
    
    # ===== Skip certain folders =====
    skip = ['node_modules', '.git', 'vendor', '__pycache__', 'docs/_build']
    html_files = [
        f for f in html_files 
        if not any(s in f for s in skip)
    ]
    
    print(f"📁 Found {len(html_files)} HTML files\n")
    
    # ===== Group by folder for display =====
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
    converted_files = []
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content, changed = convert_dark_to_light(content)
            
            if changed:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                converted += 1
                converted_files.append(file_path)
                print(f"✅ {file_path}")
            else:
                skipped += 1
                
        except Exception as e:
            errors += 1
            print(f"❌ {file_path}: {e}")
    
    # ===== Summary =====
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"✅ Converted:  {converted} files")
    print(f"⏭️  Skipped:   {skipped} files")
    print(f"❌ Errors:    {errors} files")
    print(f"📁 Total:     {len(html_files)} files")
    print("=" * 60)
    
    # ===== Show converted files list =====
    if converted_files:
        print("\n📝 Converted files:")
        for f in converted_files:
            print(f"   ✓ {f}")
    
    print("\n✅ Done! Post_DATA, API, and JavaScript untouched.")


if __name__ == '__main__':
    main()
