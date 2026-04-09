#!/usr/bin/env python3
"""
批量添加 AdSense 广告单元到所有页面
广告单元配置：
- 3617326351: Sidebar (侧边栏)
- 9504968504: Footer Banner (底部横幅)  
- 9350673807: In-Article (文章内嵌)
- 5794572171: Header Banner (顶部横幅) - 已存在
"""

import os
import re
import glob

AD_CLIENT = "ca-pub-2596567349043393"
AD_SLOTS = {
    "header": "5794572171",
    "sidebar": "3617326351",
    "inarticle": "9350673807",
    "footer": "9504968504"
}

def get_ad_code(slot, style=""):
    """生成广告代码"""
    base_style = "display:block" if not style else style
    return f'<ins class="adsbygoogle" style="{base_style}" data-ad-client="{AD_CLIENT}" data-ad-slot="{slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>'

def add_ads_to_file(filepath, file_type):
    """根据文件类型添加合适的广告位"""
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已有广告
    has_header = AD_SLOTS["header"] in content
    has_footer = AD_SLOTS["footer"] in content
    has_sidebar = AD_SLOTS["sidebar"] in content
    has_inarticle = AD_SLOTS["inarticle"] in content
    
    modified = False
    
    # 1. Header Banner - 添加到 <h1> 之后
    if not has_header:
        # 在 <h1>...</h1> 或 .subtitle 之后添加
        patterns = [
            (r'(<p class="subtitle"[^>]*>[^<]+</p>)', r'\1\n\n<!-- Ad: Header -->\n<div class="ad-banner header-ad" style="margin:20px 0;text-align:center">' + get_ad_code(AD_SLOTS["header"]) + '</div>'),
            (r'(</h1>\s*<p)', r'</h1>\n\n<!-- Ad: Header -->\n<div class="ad-banner header-ad" style="margin:20px 0;text-align:center">' + get_ad_code(AD_SLOTS["header"]) + '</div>\n\n<p'),
        ]
        for pattern, replacement in patterns:
            if re.search(pattern, content, re.IGNORECASE):
                content = re.sub(pattern, replacement, content, count=1, flags=re.IGNORECASE)
                modified = True
                break
    
    # 2. Footer Banner - 添加到 footer 之前
    if not has_footer:
        # 在 </body> 或 <footer> 之前添加
        footer_ad = '\n<!-- Ad: Footer -->\n<div class="ad-banner footer-ad" style="margin:40px 0;text-align:center">' + get_ad_code(AD_SLOTS["footer"]) + '</div>\n'
        
        if '<footer>' in content.lower():
            content = re.sub(r'(<footer[^>]*>)', footer_ad + r'\1', content, count=1, flags=re.IGNORECASE)
            modified = True
        elif '</body>' in content.lower():
            content = re.sub(r'(</body>)', footer_ad + r'\1', content, count=1, flags=re.IGNORECASE)
            modified = True
    
    # 3. In-Article 广告 - 添加到文章中间
    if not has_inarticle and file_type in ['guides', 'blogs']:
        # 在内容中间添加，找到合适的段落分隔点
        # 在第一个 <h2> 或 <h3> 之后添加
        inarticle_ad = '\n<!-- Ad: In-Article -->\n<div class="ad-banner inarticle-ad" style="margin:30px 0;text-align:center;padding:15px;background:var(--panel);border-radius:12px">' + get_ad_code(AD_SLOTS["inarticle"]) + '</div>\n'
        
        # 尝试在第一个 h2 之后添加
        h2_pattern = r'(<h2[^>]*>[^<]+</h2>\s*<p>)'
        if re.search(h2_pattern, content, re.IGNORECASE):
            content = re.sub(h2_pattern, r'\1' + inarticle_ad, content, count=1, flags=re.IGNORECASE)
            modified = True
    
    # 4. Sidebar 广告 - 添加到游戏/工具页面的侧边
    if not has_sidebar and file_type in ['games', 'tools']:
        # 尝试在 .game-container 或主要内容区旁边添加
        # 在 controls 或游戏区域之后添加侧边栏
        sidebar_ad = '\n<!-- Ad: Sidebar -->\n<div class="ad-sidebar" style="margin:20px 0;text-align:center">' + get_ad_code(AD_SLOTS["sidebar"], "display:block;min-height:250px") + '</div>\n'
        
        # 在 .controls 或 .game-header 之后添加
        patterns = [
            r'(</div>\s*<div class="game-board"[^>]*>)',
            r'(</div>\s*<div class="controls"[^>]*>)',
            r'(</div>\s*<div id="board"[^>]*>)',
        ]
        for pattern in patterns:
            if re.search(pattern, content, re.IGNORECASE):
                content = re.sub(pattern, sidebar_ad + r'\1', content, count=1, flags=re.IGNORECASE)
                modified = True
                break
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

def main():
    base_dir = "/Users/kk/Desktop/knexio"
    
    # 处理各类页面
    categories = [
        ("games/*/index.html", "games"),
        ("tools/*/index.html", "tools"),
        ("guides/*/index.html", "guides"),
        ("blogs/*.html", "blogs"),
    ]
    
    total_modified = 0
    
    for pattern, file_type in categories:
        files = glob.glob(os.path.join(base_dir, pattern))
        print(f"\n=== {file_type.upper()} ({len(files)} files) ===")
        
        for filepath in files:
            filename = os.path.basename(os.path.dirname(filepath)) if file_type != 'blogs' else os.path.basename(filepath)
            try:
                if add_ads_to_file(filepath, file_type):
                    print(f"  ✓ {filename}")
                    total_modified += 1
                else:
                    print(f"  - {filename} (no changes)")
            except Exception as e:
                print(f"  ✗ {filename}: {e}")
    
    print(f"\n=== 总计修改: {total_modified} 个文件 ===")

if __name__ == "__main__":
    main()
