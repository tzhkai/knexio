#!/usr/bin/env python3
"""Move ad-sidebar block from before <footer> to between interactive area and content sections."""

import re
import os
import sys

BASE = '/Users/kk/Desktop/knexio'

AD_BLOCK = '''<div class="ad-sidebar" style="margin:20px 0;text-align:center">
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2596567349043393" data-ad-slot="3617326351" data-ad-format="vertical" data-full-width-responsive="true"></ins>
</div>'''

class FileResult:
    def __init__(self, path):
        self.path = path
        self.status = 'pending'
        self.detail = ''
        self.insertion_line = 0

results = []

def remove_ad_from_footer(text):
    """Remove the ad block that sits right before <footer>. Returns (new_text, removed_or_none)."""
    # Pattern: ad block between content and <footer>
    # The ad block is preceded by \n\n (or \n) and followed by \n\n<footer>
    pattern = r'\n*' + re.escape(AD_BLOCK) + r'\s*\n(?=<footer>)'
    m = re.search(pattern, text)
    if not m:
        return text, None
    # Replace with just a blank line before <footer>
    new_text = text[:m.start()] + '\n\n' + text[m.end():]
    return new_text, True

def find_insertion_games_standard(text, filename):
    """Find insertion point for standard game pages (with 游戏玩法说明 anchor)."""
    anchor = '<!-- ==================== 游戏玩法说明 - SEO优化内容 ==================== -->'
    idx = text.find(anchor)
    if idx < 0:
        return None
    
    # Look backwards from anchor to find the last </div> that's not inside a comment
    # The pattern is: </div>\n\n  \n<!-- (the blank line+spaces before the comment)
    # We need to insert AFTER the </div> that closes the main game container
    search_end = idx
    search_start = max(0, idx - 200)
    before = text[search_start:search_end]
    
    # Find the last </div> before the anchor (with possible blank lines between)
    last_div = before.rfind('</div>')
    if last_div < 0:
        return None
    
    actual_pos = search_start + last_div + len('</div>')
    return actual_pos

def find_insertion_games_tower_of_hanoi(text):
    """Find insertion point for tower-of-hanoi: between game board and Rules section."""
    # Look for <!-- Rules --> which separates game from content
    rules_idx = text.find('<!-- Rules -->')
    if rules_idx < 0:
        return None
    
    # Go backwards to find where the game area ends
    # The pattern before Rules is: </div>\n\n    <!-- Rules -->
    before = text[max(0, rules_idx-100):rules_idx]
    
    # Find last </div> before Rules
    last_div = before.rfind('</div>')
    if last_div < 0:
        return None
    
    return max(0, rules_idx-100) + last_div + len('</div>')

def find_insertion_tools_special(text, basename):
    """Find insertion point for special tool pages without <div class='card'>."""
    # Define unique anchor strings for each special page
    # The anchor is the text that FOLLOWS the insertion point
    anchors = {
        'cron-generator': '<div class="section">\n<p><strong>Free Cron Generator',
        'csv-to-json-converter': '<h2>Tips for Using This Tool',
        'file-converter': '<h2>How to Use File Converter',
        'markdown-to-html': '<div class="section">\n<p><strong>Free Markdown to HTML Converter',
        'pdf-to-word-converter': '<h2>How to Use This Tool',
        'pomodoro-timer': '<div class="section" style="text-align:left;margin-top:40px">',
        'regex-tester': '<div class="section">\n<p><strong>Free Regex Tester',
        'screenshot-to-text': '<h2>How to Use This Tool',
        'text-analyzer': '<div class="panel">\n<h2>How to Use',
        'timer-stopwatch': '    <div class="section">\n      <p><strong>Free Online Timer',
    }
    
    anchor = anchors.get(basename)
    if not anchor:
        return None
    
    idx = text.find(anchor)
    if idx < 0:
        return None
    
    # Insertion point is right at idx
    return idx

def find_insertion_tools_standard(text, filename):
    """Find insertion point for standard tool pages: between card close and first content H2."""
    # Find the card div
    card_start = text.find('<div class="card">')
    if card_start < 0:
        return None
    
    # Find where the card ends by counting nested divs
    after_card = text[card_start + len('<div class="card">'):]
    
    # Count div nesting to find the card's closing </div>
    depth = 1
    pos = 0
    while depth > 0 and pos < len(after_card):
        next_open = after_card.find('<div', pos)
        next_close = after_card.find('</div>', pos)
        
        if next_close < 0:
            break
        
        if next_open >= 0 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                card_end = card_start + len('<div class="card">') + next_close + len('</div>')
                break
            pos = next_close + 6
    
    if depth != 0:
        return None
    
    return card_end

def process_file(filepath):
    """Process a single file."""
    rel = os.path.relpath(filepath, BASE)
    r = FileResult(rel)
    
    with open(filepath, 'r') as f:
        original = f.read()
    
    # Step 1: Remove ad from before footer
    text, removed = remove_ad_from_footer(original)
    if not removed:
        r.status = 'skipped'
        r.detail = 'No ad-sidebar block before footer found'
        return r
    
    # Step 2: Find insertion point
    basename = os.path.basename(os.path.dirname(filepath))
    is_game = '/games/' in filepath
    is_tool = '/tools/' in filepath
    
    insertion = None
    
    if is_game:
        if basename == 'tower-of-hanoi':
            insertion = find_insertion_games_tower_of_hanoi(text)
        else:
            insertion = find_insertion_games_standard(text, basename)
    elif is_tool:
        insertion = find_insertion_tools_standard(text, basename)
        if insertion is None:
            insertion = find_insertion_tools_special(text, basename)
    
    if insertion is None:
        r.status = 'no_insertion'
        r.detail = 'Could not find insertion point'
        return r
    
    # Step 3: Insert the ad block at the insertion point
    ad_with_spacing = '\n\n' + AD_BLOCK + '\n'
    
    # Check if we need to adjust for existing whitespace
    # Look at what's right after the insertion point
    after_insert = text[insertion:insertion+5]
    
    if after_insert.startswith('\n\n'):
        # If there are already newlines, insert with just one extra newline
        final_text = text[:insertion] + '\n\n' + AD_BLOCK + '\n' + text[insertion:]
    elif after_insert.startswith('\n'):
        final_text = text[:insertion] + '\n\n' + AD_BLOCK + '\n' + text[insertion:]
    else:
        final_text = text[:insertion] + '\n\n' + AD_BLOCK + '\n\n' + text[insertion:]
    
    # Step 4: Write back
    with open(filepath, 'w') as f:
        f.write(final_text)
    
    r.status = 'fixed'
    line_num = text[:insertion].count('\n') + 1
    r.insertion_line = line_num
    r.detail = f'Inserted ad at line {line_num}'
    
    # Verify: check that ad block still exists and is in the right place
    if AD_BLOCK not in final_text:
        r.status = 'error'
        r.detail = 'Ad block lost after processing!'
    elif final_text.find(AD_BLOCK) == original.find(AD_BLOCK):
        r.status = 'error'
        r.detail = 'Ad block position unchanged'
    
    return r


def main():
    files_to_process = []
    
    # Collect game files with ad-sidebar
    for d in os.listdir(os.path.join(BASE, 'games')):
        fpath = os.path.join(BASE, 'games', d, 'index.html')
        if os.path.isfile(fpath):
            with open(fpath) as f:
                if 'ad-sidebar' in f.read():
                    files_to_process.append(fpath)
    
    # Collect tool files with ad-sidebar
    for d in os.listdir(os.path.join(BASE, 'tools')):
        if d.startswith('.'):
            continue
        fpath = os.path.join(BASE, 'tools', d, 'index.html')
        if os.path.isfile(fpath):
            with open(fpath) as f:
                if 'ad-sidebar' in f.read():
                    files_to_process.append(fpath)
    
    print(f"Found {len(files_to_process)} files with ad-sidebar blocks")
    
    for fpath in sorted(files_to_process):
        r = process_file(fpath)
        results.append(r)
        print(f"  {r.status:15s} {r.path}")
    
    # Summary
    fixed = [r for r in results if r.status == 'fixed']
    skipped = [r for r in results if r.status == 'skipped']
    no_insertion = [r for r in results if r.status == 'no_insertion']
    errors = [r for r in results if r.status == 'error']
    
    print(f"\n=== SUMMARY ===")
    print(f"Total files processed: {len(results)}")
    print(f"Fixed: {len(fixed)}")
    print(f"Skipped (no ad-sidebar): {len(skipped)}")
    print(f"No insertion point found: {len(no_insertion)}")
    print(f"Errors: {len(errors)}")
    
    if no_insertion:
        print("\n=== NO INSERTION POINT ===")
        for r in no_insertion:
            print(f"  {r.path}: {r.detail}")
    
    if errors:
        print("\n=== ERRORS ===")
        for r in errors:
            print(f"  {r.path}: {r.detail}")

if __name__ == '__main__':
    main()
