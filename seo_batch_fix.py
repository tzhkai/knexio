#!/usr/bin/env python3
"""Fix SEO titles: revert Chinese titles to English (content is English, titles must match)."""

import os
import re

GAME_SEO = {
    # Games - English titles (content is English)
    "wordle": {
        "title": "Wordle – Free Online Word Guessing Game | Knexio",
        "desc": "Play Wordle free online – guess the 5-letter word in 6 tries. 🟩 Green = right spot, 🟨 Yellow = right letter, ⬛ Not in word. New puzzle daily. No download needed!"
    },
    "2048": {
        "title": "2048 – Free Online Number Puzzle Game | Knexio",
        "desc": "Play 2048 free online. Swipe to merge identical number tiles and reach 2048. Simple rules, deep strategy. Works in any browser. No download needed!"
    },
    "typing-speed": {
        "title": "Typing Speed Test – Free Online WPM Test | Knexio",
        "desc": "Free online typing speed test. Measure your WPM (words per minute) and accuracy right in your browser. Choose your duration, track improvement, no signup required."
    },
    "snake": {
        "title": "Snake Game – Free Online Classic Snake | Knexio",
        "desc": "Play the classic Snake game free online. Control the snake, eat food to grow, avoid walls and yourself. Works in any browser, no download needed. Beat your high score!"
    },
    "gomoku": {
        "title": "Gomoku – Free Online Five in a Row | Knexio",
        "desc": "Play Gomoku (Five in a Row) free online. Challenge the AI or play with a friend. 15×15 board, simple rules – be the first to get five in a row to win!"
    },
    "breakout": {
        "title": "Breakout – Free Online Brick Breaker Game | Knexio",
        "desc": "Play Breakout free online. Bounce the ball off your paddle to break all the bricks. Simple controls, endless fun. No download – play in your browser now!"
    },
    "color-flood": {
        "title": "Color Flood – Free Online Color Puzzle Game | Knexio",
        "desc": "Play Color Flood free online. Pick colors to flood the board and try to cover every tile in the fewest moves. Simple, addictive, and brain-teasing!"
    },
    "doodle-jump": {
        "title": "Doodle Jump – Free Online Jumping Game | Knexio",
        "desc": "Play Doodle Jump free online. Tap to make your creature jump higher on platforms. Avoid gaps and obstacles. Simple controls, addictive gameplay – no download needed!"
    },
    "flappy-bird": {
        "title": "Flappy Bird – Free Online Browser Game | Knexio",
        "desc": "Play Flappy Bird free online in your browser. Tap to flap your wings and navigate through the pipes. How far can you fly? Simple but challenging!"
    },
    "memory-test": {
        "title": "Memory Test – Free Online Brain Training Game | Knexio",
        "desc": "Free online memory test game. Memorize numbers or patterns, then recall them in order. Track your score and improve your short-term memory. Play now!"
    },
    "minesweeper": {
        "title": "Minesweeper – Free Online Classic Game | Knexio",
        "desc": "Play Minesweeper free online. Click to reveal numbers that show how many mines are nearby. Flag the mines, clear the board. Classic puzzle – play in your browser now!"
    },
    "color-switch": {
        "title": "Color Switch – Free Online Reaction Game | Knexio",
        "desc": "Play Color Switch free online. Match the ball's color to pass through obstacles. Simple one-touch control, extremely hard to master. Test your reflexes now!"
    },
    "chess": {
        "title": "Chess – Free Online Classic Board Game | Knexio",
        "desc": "Play Chess free online against AI with 3 difficulty levels. Full chess rules, beautiful board. No download – challenge the computer in your browser today!"
    },
    "sliding-puzzle": {
        "title": "Sliding Puzzle – Free Online Jigsaw Game | Knexio",
        "desc": "Play sliding puzzle free online. Slide the tiles to restore the full image. Choose from 3×3 to 5×5 grids. Train your logic skills – no download needed!"
    },
    "mini-crossword": {
        "title": "Mini Crossword – Free Online Word Puzzle | Knexio",
        "desc": "Play Mini Crossword free online. Fill in the words based on the clues. New puzzle every day. Compact but challenging – exercise your brain in minutes!"
    },
    "connect-four": {
        "title": "Connect Four – Free Online Two-Player Game | Knexio",
        "desc": "Play Connect Four free online with a friend on the same device. Drop chips to connect four in a row – horizontally, vertically, or diagonally. Classic fun!"
    },
    "tower-of-hanoi": {
        "title": "Tower of Hanoi – Free Online Puzzle Game | Knexio",
        "desc": "Play Tower of Hanoi free online. Move all disks from one peg to another without placing a larger disk on a smaller one. Classic puzzle – solve it in the fewest moves!"
    },
    "solitaire": {
        "title": "Solitaire – Free Online Klondike Card Game | Knexio",
        "desc": "Play Klondike Solitaire free online. Full card game with Draw 1 and Draw 3 modes, undo, timer, and scoring. No download – play classic card solitaire in your browser!"
    },
    "idle-clicker": {
        "title": "Idle Clicker – Free Online Clicker Game | Knexio",
        "desc": "Play Idle Clicker free online. Click to earn coins, buy upgrades for passive income, and watch your wealth grow exponentially. Addictive incremental gameplay!"
    },
}


def update_page(filepath, title, desc):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(r'<title>[^<]+</title>', f'<title>{title}</title>', content)
    content = re.sub(
        r'<meta name="description" content="[^"]*"',
        f'<meta name="description" content="{desc}"',
        content
    )
    content = re.sub(
        r'<meta property="og:title"[^>]+>', f'<meta property="og:title" content="{title}" />', content
    )
    content = re.sub(
        r'<meta property="og:description"[^>]+>', f'<meta property="og:description" content="{desc}" />', content
    )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)


def main():
    games_dir = "/Users/kk/Desktop/knexio/games"
    updated = []
    for slug, seo in GAME_SEO.items():
        path = os.path.join(games_dir, slug, "index.html")
        if os.path.exists(path):
            update_page(path, seo["title"], seo["desc"])
            updated.append(slug)
            print(f"✅ {slug}")
        else:
            print(f"❌ not found: {path}")
    print(f"\n共更新 {len(updated)} 个页面")
    print("建议下一步: git add -A && git commit && git push")


if __name__ == "__main__":
    main()
