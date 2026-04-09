#!/usr/bin/env python3
"""
为缺少 gameplay-section 的游戏添加该部分
"""

import re
from pathlib import Path

# 需要添加 gameplay-section 的游戏内容
MISSING_GAMES = {
    "chess": {
        "description": "Chess is the ultimate strategy board game. Command your army of pieces to checkmate the opponent's king. A battle of wits and tactics!",
        "rules": [
            "<strong>Pawns</strong> move forward one square (two on first move), capture diagonally",
            "<strong>Rooks</strong> move horizontally or vertically any distance",
            "<strong>Knights</strong> move in an L-shape (2+1 squares), can jump over pieces",
            "<strong>Bishops</strong> move diagonally any distance",
            "<strong>Queen</strong> combines rook and bishop movements",
            "<strong>King</strong> moves one square in any direction - protect him!"
        ],
        "tips": [
            "Control the center squares (d4, d5, e4, e5) early",
            "Develop knights and bishops before moving the queen",
            "Castle early to protect your king and connect rooks",
            "Think before every move - consider your opponent's threats"
        ]
    },
    "connect-four": {
        "description": "Connect Four is a classic strategy game. Drop colored discs into a grid and be the first to connect four in a row - vertically, horizontally, or diagonally!",
        "rules": [
            "<strong>Click a column</strong> to drop your disc into the lowest empty space",
            "<strong>Take turns</strong> with your opponent",
            "<strong>Connect 4 discs</strong> in a row to win",
            "<strong>Connections can be</strong> vertical, horizontal, or diagonal",
            "<strong>Plan ahead</strong> - block opponent's winning moves",
            "<strong>Game is a draw</strong> if the board fills with no winner"
        ],
        "tips": [
            "Control the center columns - they offer more winning possibilities",
            "Watch for '7' trap setups that create two winning threats",
            "Block opponent's three-in-a-row immediately",
            "Think two moves ahead - set up your own double threats"
        ]
    },
    "gomoku": {
        "description": "Gomoku (Five in a Row) is an ancient strategy game. Place stones on a grid and be the first to connect five in a row!",
        "rules": [
            "<strong>Click an intersection</strong> to place your stone",
            "<strong>Black plays first</strong>, then players alternate",
            "<strong>Connect 5 stones</strong> in a row to win",
            "<strong>Connections can be</strong> horizontal, vertical, or diagonal",
            "<strong>Overlines</strong> (6+ stones) may or may not count depending on rules",
            "<strong>Block opponent's</strong> four-in-a-row threats"
        ],
        "tips": [
            "Control the center of the board for maximum flexibility",
            "Create multiple threats simultaneously (forks)",
            "Watch for open threes - they can become unstoppable fours",
            "Defense is crucial - one missed block can end the game"
        ]
    },
    "solitaire": {
        "description": "Solitaire (Klondike) is the classic card game. Arrange cards in descending order, alternating colors, and build up foundation piles to win!",
        "rules": [
            "<strong>Build tableau columns</strong> in descending order (K to A), alternating colors",
            "<strong>Move cards</strong> to foundation piles by suit, ascending (A to K)",
            "<strong>Draw cards</strong> from the stock pile when stuck",
            "<strong>Empty tableau spots</strong> can only be filled by Kings",
            "<strong>Move sequences</strong> of cards if they're in proper order",
            "<strong>Win by moving</strong> all cards to the four foundation piles"
        ],
        "tips": [
            "Always move Aces and Twos to foundation piles immediately",
            "Expose hidden cards in tableau columns as soon as possible",
            "Don't empty a tableau spot unless you have a King to fill it",
            "Think carefully before drawing from stock - plan your moves"
        ]
    },
    "tower-of-hanoi": {
        "description": "Tower of Hanoi is a mathematical puzzle. Move the entire stack of disks from one peg to another, following the rules. A test of logic and patience!",
        "rules": [
            "<strong>Move one disk at a time</strong> between the three pegs",
            "<strong>Only the top disk</strong> of a stack can be moved",
            "<strong>Never place</strong> a larger disk on top of a smaller disk",
            "<strong>Goal:</strong> Move all disks from the starting peg to the target peg",
            "<strong>Minimum moves</strong> for N disks is 2^N - 1",
            "<strong>Plan recursively</strong> - move N-1 disks, then the largest, then N-1 again"
        ],
        "tips": [
            "For 3 disks, the minimum is 7 moves; for 4 disks, 15 moves",
            "Always think about where the largest disk needs to go",
            "Use the spare peg strategically to hold temporary stacks",
            "Practice the pattern - it becomes muscle memory"
        ]
    },
    "sliding-puzzle": {
        "description": "Sliding Puzzle (15 Puzzle) is a classic tile game. Arrange numbered tiles in order by sliding them into the empty space. A timeless brain teaser!",
        "rules": [
            "<strong>Click a tile</strong> adjacent to the empty space to slide it",
            "<strong>Arrange tiles</strong> in numerical order (1, 2, 3... 15)",
            "<strong>Empty space</strong> allows tiles to move",
            "<strong>Only adjacent tiles</strong> can slide into the empty spot",
            "<strong>Complete the sequence</strong> to solve the puzzle",
            "<strong>Fewer moves</strong> = better score"
        ],
        "tips": [
            "Solve row by row, starting from the top",
            "Get the first two rows in place, then work on the bottom",
            "Plan several moves ahead to avoid getting stuck",
            "Sometimes you need to temporarily disrupt order to make progress"
        ]
    }
}

def generate_gameplay_section(game_name, content):
    """生成 gameplay-section HTML"""
    
    rules_html = "\n".join([
        f'            <li style="margin-bottom: 12px;">{rule}</li>'
        for rule in content["rules"]
    ])
    
    tips_html = "\n".join([
        f'            <li style="margin-bottom: 10px; position: relative; padding-left: 10px;"><span style="position: absolute; left: -15px; color: var(--accent);">✓</span> {tip}</li>'
        for tip in content["tips"]
    ])
    
    return f'''<div class="gameplay-section" style="margin: 60px auto 0; max-width: 800px; padding: 32px 24px; background: var(--panel); border-radius: 18px; border: 1px solid var(--border); text-align: left;">
    <h2 style="font-size: 28px; margin-bottom: 30px; color: var(--text-main); display: flex; align-items: center;">
        <span style="background: var(--accent); color: white; width: 36px; height: 36px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 18px;">🎮</span>
        How to Play {game_name.replace('-', ' ').title()}
    </h2>

    <div style="margin-bottom: 30px;">
        <h3 style="font-size: 20px; margin-bottom: 15px; color: var(--text-main);">Game Description</h3>
        <p style="font-size: 15px; color: var(--text-sub); line-height: 1.7; margin-bottom: 20px;">
            {content["description"]}
        </p>
    </div>

    <div style="margin-bottom: 30px;">
        <h3 style="font-size: 20px; margin-bottom: 15px; color: var(--text-main);">How to Play</h3>
        <ol style="font-size: 15px; color: var(--text-sub); line-height: 1.7; padding-left: 25px; margin-bottom: 20px;">
{rules_html}
        </ol>
    </div>

    <div style="margin-bottom: 30px;">
        <h3 style="font-size: 20px; margin-bottom: 15px; color: var(--text-main);">Pro Tips & Strategies</h3>
        <ul style="font-size: 15px; color: var(--text-sub); line-height: 1.7; padding-left: 25px; margin-bottom: 20px; list-style: none;">
{tips_html}
        </ul>
    </div>
</div>'''

def add_gameplay_section(game_name):
    """为游戏添加 gameplay-section"""
    file_path = Path(f"games/{game_name}/index.html")
    
    if not file_path.exists():
        print(f"❌ {game_name}: File not found")
        return False
    
    content = file_path.read_text(encoding='utf-8')
    
    # 检查是否已经有 gameplay-section
    if "gameplay-section" in content:
        print(f"⏭️  {game_name}: Already has gameplay-section")
        return False
    
    # 检查是否有这个游戏的模板
    if game_name not in MISSING_GAMES:
        print(f"⚠️  {game_name}: No template available")
        return False
    
    # 生成 gameplay-section
    new_section = generate_gameplay_section(game_name, MISSING_GAMES[game_name])
    
    # 找到插入位置 - 在 FAQ section 之前，或者 footer 之前
    # 先尝试找到 FAQ section
    faq_match = re.search(r'(<div class="faq-section")', content)
    
    if faq_match:
        # 在 FAQ 之前插入
        insert_pos = faq_match.start()
        new_content = content[:insert_pos] + new_section + "\n\n" + content[insert_pos:]
    else:
        # 找到 footer 之前
        footer_match = re.search(r'(<footer>)', content)
        if footer_match:
            insert_pos = footer_match.start()
            new_content = content[:insert_pos] + new_section + "\n\n" + content[insert_pos:]
        else:
            print(f"❌ {game_name}: Could not find insertion point")
            return False
    
    # 写回文件
    file_path.write_text(new_content, encoding='utf-8')
    print(f"✅ {game_name}: Added gameplay-section")
    return True

def main():
    print("=" * 60)
    print("为缺少 gameplay-section 的游戏添加该部分")
    print("=" * 60)
    print()
    
    added_count = 0
    for game_name in MISSING_GAMES.keys():
        if add_gameplay_section(game_name):
            added_count += 1
    
    print()
    print("=" * 60)
    print(f"添加完成: {added_count} 个游戏")
    print("=" * 60)

if __name__ == "__main__":
    main()
