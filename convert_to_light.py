#!/usr/bin/env python3
"""
MASTER Dark to Light Theme Converter
Handles ALL variants of variables across all blog files
"""

import os
import glob
import re


def convert_dark_to_light(content):
    """Convert Dark theme to Light theme - ALL variants"""
    
    # Skip if already converted
    if '/* ✅ Light Theme - MASTER */' in content:
        return content, False
    
    # Check if it's a dark theme file (any variant)
    dark_signals = [
        '--bg-primary: #0a0e1a',  # ahkamat variant
        '--bg-primary: #0a0a0f',  # 5-ese variant
        '--bg-primary: #07070d',  # index variant
        '--dark: #0a0a1a',        # old variant
        '--darker: #060612',
        '--bg-secondary: #111827',
        '--text-primary: #e8edf5',
        '--text: #e0e0e0',
        '#0a0e1a', '#0a0a0f', '#07070d', '#0a0a1a', '#060612',
        '#111827', '#1a2332', '#243044',
        '--neon-blue: #60a5fa',
        '--primary: #4a90e2',
    ]
    
    is_dark = any(sig in content for sig in dark_signals)
    
    if not is_dark:
        return content, False
    
    original = content
    
    # ===== 1. REPLACE :root BLOCK (all variants) =====
    # Try multiple patterns
    patterns = [
        re.compile(r':root\s*\{[^}]*--transition[^}]*\}', re.DOTALL),
        re.compile(r':root\s*\{[^}]*--neon-glow[^}]*\}', re.DOTALL),
        re.compile(r':root\s*\{[^}]*--shadow[^}]*\}', re.DOTALL),
        re.compile(r':root\s*\{[^}]*\}', re.DOTALL),
    ]
    
    root_new = ''':root {
            /* ✅ Light Theme - MASTER */
            --bg-primary: #f5f7fa;
            --bg-secondary: #ffffff;
            --bg-card: #ffffff;
            --bg-card-hover: #f0f4f8;
            --dark: #f5f7fa;
            --darker: #e8eef5;
            --light: #ffffff;
            --text-primary: #1f2937;
            --text-secondary: #4b5563;
            --text-muted: #6b7280;
            --text-accent: #0c4a6e;
            --text: #1f2937;
            --text-dark: #0f172a;
            --neon-blue: #0284c7;
            --neon-cyan: #0891b2;
            --neon-purple: #6366f1;
            --neon-pink: #db2777;
            --neon-green: #059669;
            --neon-yellow: #b45309;
            --primary: #0284c7;
            --secondary: #059669;
            --accent: #dc2626;
            --gold: #b45309;
            --border-glow: 0 0 30px rgba(2, 132, 199, 0.15);
            --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.06);
            --shadow: 0 10px 30px rgba(0,0,0,0.08);
            --neon-glow: 0 0 20px rgba(2, 132, 199, 0.25);
            --gradient-main: linear-gradient(135deg, #0284c7, #0891b2, #6366f1);
            --gradient-glow: linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(8, 145, 178, 0.1));
            --gradient-hero: linear-gradient(135deg, #0284c7 0%, #6366f1 50%, #b45309 100%);
            --gradient-gold: linear-gradient(135deg, #b45309 0%, #d97706 100%);
            --gradient-blue: linear-gradient(135deg, #0284c7 0%, #0891b2 100%);
            --gradient-purple: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            --gradient-1: linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #6366f1 100%);
            --gradient-2: linear-gradient(135deg, #b45309 0%, #d97706 100%);
            --gradient-3: linear-gradient(135deg, #0284c7 0%, #0891b2 50%, #6366f1 100%);
            --gradient-4: linear-gradient(135deg, #c026d3 0%, #db2777 50%, #38bdf8 100%);
            --radius-sm: 12px;
            --radius-md: 18px;
            --radius-lg: 24px;
            --radius: 16px;
            --radius-full: 9999px;
            --shadow-hover: 0 12px 40px rgba(2, 132, 199, 0.15);
            --transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }'''
    
    for pattern in patterns:
        new_content = pattern.sub(root_new, content, count=1)
        if new_content != content:
            content = new_content
            break
    
    # ===== 2. ALL DARK HEX COLORS =====
    replacements = {
        # Backgrounds
        '#0a0e1a': '#f5f7fa',
        '#0a0a0f': '#f5f7fa',
        '#07070d': '#f5f7fa',
        '#0a0a1a': '#f5f7fa',
        '#060612': '#e8eef5',
        '#111827': '#ffffff',
        '#1a2332': '#ffffff',
        '#243044': '#f0f4f8',
        '#12121a': '#e8eef5',
        '#0d0d16': '#e8eef5',
        
        # Text colors
        '#e8edf5': '#1f2937',
        '#e0e0e0': '#1f2937',
        '#c0c0d0': '#4b5563',
        '#a0a0b0': '#4b5563',
        '#94a3b8': '#4b5563',
        '#6a6a7a': '#6b7280',
        
        # Accents
        '#60a5fa': '#0284c7',
        '#22d3ee': '#0891b2',
        '#a78bfa': '#6366f1',
        '#f472b6': '#db2777',
        '#34d399': '#059669',
        '#fbbf24': '#b45309',
        '#4a90e2': '#0284c7',
        '#2ecc71': '#059669',
        '#e74c3c': '#dc2626',
        '#f1c40f': '#b45309',
        '#00f2ff': '#0284c7',
        '#7c3aed': '#6366f1',
        '#ffd700': '#b45309',
        
        # Light section text (which was unreadable)
        '#fca5a5': '#7f1d1d',  # warning
        '#86efac': '#14532d',  # blessing
        '#c4b5fd': '#3730a3',  # prophetic
        '#fde047': '#78350f',  # important
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    # ===== 3. RGBA REPLACEMENTS =====
    rgba_map = {
        # Body / card backgrounds
        'rgba(10, 10, 15, 0.92)': 'rgba(255, 255, 255, 0.95)',
        'rgba(10, 10, 26, 0.92)': 'rgba(255, 255, 255, 0.95)',
        'rgba(6, 6, 18, 0.92)': 'rgba(255, 255, 255, 0.95)',
        'rgba(10, 10, 15, 0.95)': 'rgba(255, 255, 255, 0.98)',
        
        # Card backgrounds (subtle white → strong white)
        'rgba(255, 255, 255, 0.02)': 'rgba(2, 132, 199, 0.04)',
        'rgba(255, 255, 255, 0.03)': 'rgba(255, 255, 255, 0.95)',
        'rgba(255, 255, 255, 0.04)': 'rgba(255, 255, 255, 0.95)',
        'rgba(255, 255, 255, 0.05)': 'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 0.06)': 'rgba(2, 132, 199, 0.12)',
        'rgba(255, 255, 255, 0.07)': 'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 0.08)': 'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 0.1)': 'rgba(2, 132, 199, 0.15)',
        'rgba(255, 255, 255, 0.15)': 'rgba(2, 132, 199, 0.2)',
        
        # Neon blue glows
        'rgba(0, 242, 255, 0.1)': 'rgba(2, 132, 199, 0.15)',
        'rgba(0, 242, 255, 0.15)': 'rgba(2, 132, 199, 0.2)',
        'rgba(0, 242, 255, 0.3)': 'rgba(2, 132, 199, 0.3)',
        'rgba(96, 165, 250, 0.1)': 'rgba(2, 132, 199, 0.15)',
        'rgba(96, 165, 250, 0.15)': 'rgba(2, 132, 199, 0.2)',
        'rgba(96, 165, 250, 0.08)': 'rgba(2, 132, 199, 0.08)',
        'rgba(74, 144, 226, 0.3)': 'rgba(2, 132, 199, 0.3)',
        'rgba(74, 144, 226, 0.15)': 'rgba(2, 132, 199, 0.15)',
        
        # Section boxes
        'rgba(239, 68, 68, 0.08)': 'rgba(254, 226, 226, 0.85)',
        'rgba(255, 0, 0, 0.06)': 'rgba(254, 226, 226, 0.85)',
        'rgba(34, 197, 94, 0.08)': 'rgba(220, 252, 231, 0.85)',
        'rgba(0, 255, 0, 0.05)': 'rgba(220, 252, 231, 0.85)',
        'rgba(99, 102, 241, 0.08)': 'rgba(224, 231, 255, 0.85)',
        'rgba(124, 58, 237, 0.06)': 'rgba(224, 231, 255, 0.85)',
        'rgba(217, 119, 6, 0.08)': 'rgba(254, 243, 199, 0.85)',
        'rgba(255, 215, 0, 0.05)': 'rgba(254, 243, 199, 0.85)',
        'rgba(251, 191, 36, 0.1)': 'rgba(254, 243, 199, 0.85)',
        'rgba(52, 211, 153, 0.08)': 'rgba(220, 252, 231, 0.85)',
        'rgba(167, 139, 250, 0.08)': 'rgba(224, 231, 255, 0.85)',
        
        # Backgrounds
        'rgba(0, 0, 0, 0.5)': 'rgba(0, 0, 0, 0.06)',
        'rgba(0, 0, 0, 0.4)': 'rgba(0, 0, 0, 0.06)',
        'rgba(0, 0, 0, 0.3)': 'rgba(0, 0, 0, 0.05)',
    }
    
    for old, new in rgba_map.items():
        content = content.replace(old, new)
    
    # ===== 4. BODY BACKGROUND =====
    content = content.replace(
        'background: var(--bg-primary);',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);',
        1
    )
    content = content.replace(
        'background: var(--darker);',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);'
    )
    content = content.replace(
        'background: var(--dark);',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);'
    )
    
    # ===== 5. SECTION TEXT COLORS (readable) =====
    content = content.replace('color: #7f1d1d;', 'color: #7f1d1d; font-weight: 600;')  # Warning
    content = content.replace('color: #14532d;', 'color: #14532d; font-weight: 600;')  # Blessing
    content = content.replace('color: #3730a3;', 'color: #3730a3; font-weight: 600;')  # Prophetic
    content = content.replace('color: #78350f;', 'color: #78350f; font-weight: 600;')  # Important
    
    # ===== 6. GLOW EFFECTS =====
    content = content.replace(
        'box-shadow: var(--shadow-card);',
        'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);'
    )
    
    # ===== 7. SELECTION =====
    content = content.replace(
        '::selection { background: rgba(0, 242, 255, 0.3); color: #fff; }',
        '::selection { background: rgba(2, 132, 199, 0.25); color: #0c4a6e; }'
    )
    
    # ===== 8. SCROLLBAR =====
    content = content.replace(
        'background: var(--bg-secondary);',
        'background: #e8eef5;'
    )
    content = content.replace(
        'background: var(--bg-primary);\n        }\n        ::-webkit-scrollbar-thumb',
        'background: #e8eef5;\n        }\n        ::-webkit-scrollbar-thumb'
    )
    
    changed = content != original
    return content, changed


def main():
    print("🚀 MASTER Dark to Light Theme Converter")
    print("=" * 70)
    
    # Find ALL HTML files
    html_files = glob.glob('**/*.html', recursive=True)
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
                print(f"⏭️  {file_path}")
                
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


if __name__ == '__main__':
    main()
