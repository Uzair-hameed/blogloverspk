#!/usr/bin/env python3
"""
Dark to Light Theme Converter
- Converts all HTML files from Dark to Light theme
- Preserves Post_DATA, API links, and JavaScript exactly as-is
- Only changes CSS colors and variables
"""

import os
import glob
import re

def convert_dark_to_light(content):
    """Convert Dark theme CSS to Light theme"""
    
    # ===== 1. REPLACE :root VARIABLES =====
    root_old = r''':root\s*\{[^}]*--bg-primary:\s*#0a0a0f[^}]*\}'''
    
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
    
    content = re.sub(root_old, root_new, content, count=1, flags=re.DOTALL)
    
    # ===== 2. REPLACE BODY BACKGROUND =====
    content = content.replace(
        'background: var(--bg-primary);\n            color: var(--text-primary);\n            overflow-x: hidden;',
        'background: linear-gradient(180deg, #f5f7fa 0%, #e0e7ff 100%);\n            background-attachment: fixed;\n            color: var(--text-primary);\n            overflow-x: hidden;'
    )
    
    # ===== 3. HEADER NAV (Dark to Light) =====
    content = content.replace(
        'background: rgba(10, 10, 15, 0.92);',
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
    # Warning
    content = content.replace(
        'background: rgba(255, 0, 0, 0.06);',
        'background: rgba(239, 68, 68, 0.08);'
    )
    content = content.replace(
        'border-right: 6px solid #ef4444;',
        'border-right: 6px solid #dc2626;'
    )
    content = content.replace(
        '.section-warning p { color: #fca5a5; }',
        '.section-warning p { color: #991b1b; }'
    )
    
    # Blessing
    content = content.replace(
        'background: rgba(0, 255, 0, 0.05);',
        'background: rgba(34, 197, 94, 0.08);'
    )
    content = content.replace(
        'border-right: 6px solid #22c55e;',
        'border-right: 6px solid #16a34a;'
    )
    content = content.replace(
        '.section-blessing p { color: #86efac; }',
        '.section-blessing p { color: #166534; }'
    )
    
    # Prophetic
    content = content.replace(
        'background: rgba(124, 58, 237, 0.06);',
        'background: rgba(99, 102, 241, 0.08);'
    )
    content = content.replace(
        'border-right: 6px solid #a855f7;',
        'border-right: 6px solid #6366f1;'
    )
    content = content.replace(
        '.section-prophetic p { color: #c4b5fd; }',
        '.section-prophetic p { color: #3730a3; }'
    )
    
    # Important
    content = content.replace(
        'background: rgba(255, 215, 0, 0.05);',
        'background: rgba(217, 119, 6, 0.08);'
    )
    content = content.replace(
        '.section-important p { color: #fde047; }',
        '.section-important p { color: #92400e; }'
    )
    
    # Highlight Box
    content = content.replace(
        'background: linear-gradient(135deg, rgba(0, 242, 255, 0.06), rgba(124, 58, 237, 0.06));',
        'background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(99, 102, 241, 0.08));'
    )
    content = content.replace(
        'border: 1px solid var(--border-glow);\n            padding: 25px 30px;',
        'border: 1px solid rgba(14, 165, 233, 0.3);\n            padding: 25px 30px;'
    )
    
    # ===== 8. POST CONTENT BACKGROUND =====
    content = content.replace(
        'backdrop-filter: blur(16px);\n            border: 1px solid var(--border-glass);\n            border-radius: var(--radius-md);\n            padding: 40px;',
        'backdrop-filter: blur(16px);\n            border: 1px solid var(--border-glass);\n            border-radius: var(--radius-md);\n            padding: 40px;\n            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);'
    )
    
    # ===== 9. SCROLLBAR =====
    content = content.replace(
        '::-webkit-scrollbar-track { background: var(--bg-secondary); }',
        '::-webkit-scrollbar-track { background: #e8eef5; }'
    )
    
    # ===== 10. NAV BTN HOVER GLOW =====
    content = content.replace(
        'box-shadow: 0 0 25px rgba(0, 242, 255, 0.1);',
        'box-shadow: 0 0 25px rgba(14, 165, 233, 0.15);'
    )
    
    # ===== 11. SCROLL BTN HOVER =====
    content = content.replace(
        'box-shadow: 0 0 25px rgba(0, 242, 255, 0.15);',
        'box-shadow: 0 0 25px rgba(14, 165, 233, 0.2);'
    )
    
    # ===== 12. BODY BG ORBS (softer for light) =====
    content = content.replace(
        '.bg-orb-1 { width: 500px; height: 500px; top: -150px; right: -150px; background: radial-gradient(circle, #00f2ff, transparent); }',
        '.bg-orb-1 { width: 500px; height: 500px; top: -150px; right: -150px; background: radial-gradient(circle, #0ea5e9, transparent); }'
    )
    content = content.replace(
        '.bg-orb-2 { width: 400px; height: 400px; bottom: -100px; left: -100px; background: radial-gradient(circle, #7c3aed, transparent); animation-delay: -8s; }',
        '.bg-orb-2 { width: 400px; height: 400px; bottom: -100px; left: -100px; background: radial-gradient(circle, #6366f1, transparent); animation-delay: -8s; }'
    )
    content = content.replace(
        '.bg-orb-3 { width: 300px; height: 300px; top: 50%; left: 50%; transform: translate(-50%, -50%); background: radial-gradient(circle, #ffd700, transparent); animation-delay: -14s; opacity: 0.05; }',
        '.bg-orb-3 { width: 300px; height: 300px; top: 50%; left: 50%; transform: translate(-50%, -50%); background: radial-gradient(circle, #d97706, transparent); animation-delay: -14s; opacity: 0.08; }'
    )
    
    # ===== 13. PARTICLE CANVAS OPACITY =====
    content = content.replace(
        'width: 100%;\n            height: 100%;\n            z-index: -1;\n        }\n\n        .bg-orb',
        'width: 100%;\n            height: 100%;\n            z-index: -1;\n            opacity: 0.4;\n        }\n\n        .bg-orb'
    )
    
    return content


def main():
    print("🚀 Dark to Light Theme Converter")
    print("=" * 60)
    
    # Find all HTML files
    html_files = glob.glob('**/*.html', recursive=True)
    
    # Skip certain folders
    skip = ['node_modules', '.git', 'vendor', 'docs/_build']
    html_files = [
        f for f in html_files 
        if not any(s in f for s in skip)
    ]
    
    print(f"📁 Found {len(html_files)} HTML files\n")
    
    converted = 0
    skipped = 0
    
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if already light theme
            if '/* ✅ Light Theme */' in content:
                skipped += 1
                continue
            
            # Check if dark theme
            if '#0a0a0f' not in content and '--bg-primary: #0a0a0f' not in content:
                skipped += 1
                continue
            
            # Convert
            new_content = convert_dark_to_light(content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                converted += 1
                print(f"✅ {file_path}")
            else:
                skipped += 1
                
        except Exception as e:
            print(f"❌ {file_path}: {e}")
    
    print("\n" + "=" * 60)
    print("📊 SUMMARY")
    print("=" * 60)
    print(f"✅ Converted:  {converted} files")
    print(f"⏭️  Skipped:   {skipped} files")
    print(f"📁 Total:     {len(html_files)} files")
    print("=" * 60)
    print("\n✅ Done! Post_DATA, API, and JavaScript untouched.")

if __name__ == '__main__':
    main()
