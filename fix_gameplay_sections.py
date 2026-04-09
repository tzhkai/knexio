#!/usr/bin/env python3
"""
批量修复游戏页面的 gameplay-section
替换通用占位符为具体游戏说明
"""

import os
import re
from pathlib import Path

# 游戏内容模板库
GAME_CONTENT = {
    "idle-clicker": {
        "description": "Idle Clicker is an addictive incremental game where you click to earn coins, then buy upgrades to generate passive income. Start with manual clicking and build your coin empire!",
        "rules": [
            "<strong>Click the big coin</strong> to earn coins manually",
            "<strong>Buy upgrades</strong> on the right panel to earn coins automatically (CPS)",
            "<strong>Cursor</strong> (+0.1 CPS) → <strong>Grandma</strong> (+0.5 CPS) → <strong>Farm</strong> (+1 CPS) → <strong>Mine</strong> (+5 CPS) → <strong>Factory</strong> (+10 CPS) → <strong>Bank</strong> (+50 CPS)",
            "<strong>Price increases by 15%</strong> with each purchase",
            "<strong>Every 10 CPS</strong> adds +1 coin to your click value",
            "<strong>Watch your coins grow</strong> even when you're not clicking!"
        ],
        "tips": [
            "Focus on CPS upgrades early - passive income is key",
            "Balance between clicking and upgrading for optimal growth",
            "Higher tier upgrades become more efficient over time",
            "Let the game run in the background to accumulate coins"
        ]
    },
    "typing-speed": {
        "description": "Typing Speed Test measures how fast and accurately you can type. Choose your time limit and race against the clock to achieve the highest WPM (Words Per Minute) score!",
        "rules": [
            "<strong>Select a time limit</strong> (15s, 30s, 60s, or 120s)",
            "<strong>Click the text area</strong> or press any key to start",
            "<strong>Type the displayed text</strong> as quickly and accurately as possible",
            "<strong>WPM</strong> = Words Per Minute (5 characters = 1 word)",
            "<strong>Accuracy</strong> = Percentage of correctly typed characters",
            "<strong>Errors are highlighted</strong> - correct them to continue"
        ],
        "tips": [
            "Focus on accuracy first, speed will follow naturally",
            "Use proper finger positioning on the home row keys",
            "Don't look at the keyboard - trust your muscle memory",
            "Practice regularly to improve both speed and accuracy"
        ]
    },
    "asteroids": {
        "description": "Asteroids is a classic arcade shooter. Pilot your spaceship through an asteroid field, destroy rocks to score points, and avoid collisions to survive!",
        "rules": [
            "<strong>Arrow keys</strong> or <strong>WASD</strong> to rotate and thrust",
            "<strong>Spacebar</strong> to shoot lasers",
            "<strong>Destroy asteroids</strong> to earn points",
            "<strong>Large asteroids</strong> break into smaller ones when hit",
            "<strong>Avoid collisions</strong> - your ship has limited lives",
            "<strong>Hyperspace</strong> (if available) teleports you to safety"
        ],
        "tips": [
            "Stay near the center to have room to maneuver",
            "Destroy large asteroids early before they multiply",
            "Use momentum to drift while shooting",
            "Don't stay in one place - keep moving!"
        ]
    },
    "balloon-pop": {
        "description": "Balloon Pop is a fast-paced arcade game. Pop colorful balloons as they float upward before they reach the top of the screen. Don't let any escape!",
        "rules": [
            "<strong>Click or tap</strong> balloons to pop them",
            "<strong>Different colors</strong> may have different point values",
            "<strong>Don't let balloons</strong> reach the top of the screen",
            "<strong>Special balloons</strong> may give bonus points or power-ups",
            "<strong>Speed increases</strong> as your score grows",
            "<strong>Game ends</strong> when too many balloons escape"
        ],
        "tips": [
            "Prioritize balloons closest to the top",
            "Watch for patterns in balloon movement",
            "Click quickly but accurately - missed clicks waste time",
            "Save power-ups for when you're overwhelmed"
        ]
    },
    "breakout": {
        "description": "Breakout is a classic brick-breaking arcade game. Use your paddle to bounce the ball and destroy all the bricks. Clear the screen to win!",
        "rules": [
            "<strong>Move mouse</strong> or <strong>Arrow keys</strong> to control the paddle",
            "<strong>Bounce the ball</strong> off your paddle to hit bricks",
            "<strong>Different colored bricks</strong> have different strengths",
            "<strong>Destroy all bricks</strong> to complete the level",
            "<strong>Don't let the ball</strong> fall below the paddle",
            "<strong>Catch power-ups</strong> that fall from destroyed bricks"
        ],
        "tips": [
            "Aim for the corners to break bricks more efficiently",
            "Watch the ball's trajectory and position your paddle early",
            "Prioritize hard-to-reach bricks when you have control",
            "Use power-ups strategically - some are better saved"
        ]
    },
    "bubble-shooter": {
        "description": "Bubble Shooter is a addictive puzzle game. Shoot colored bubbles to match 3 or more of the same color. Clear the board before bubbles reach the bottom!",
        "rules": [
            "<strong>Aim with mouse</strong> or <strong>touch</strong> and click to shoot",
            "<strong>Match 3+ bubbles</strong> of the same color to pop them",
            "<strong>Bubbles stick</strong> to the first bubble they touch",
            "<strong>Clear all bubbles</strong> from the screen to win",
            "<strong>Game over</strong> if bubbles reach the bottom line",
            "<strong>Bounce off walls</strong> to reach tricky spots"
        ],
        "tips": [
            "Look for chain reactions - one shot can clear many bubbles",
            "Clear bubbles from the top to make whole sections fall",
            "Use wall bounces to reach isolated bubble clusters",
            "Plan ahead - think about where your next bubbles will go"
        ]
    },
    "checkers": {
        "description": "Checkers (Draughts) is a classic strategy board game. Capture all your opponent's pieces or block them from moving to win!",
        "rules": [
            "<strong>Click a piece</strong> to select it, then click where to move",
            "<strong>Move diagonally forward</strong> one square at a time",
            "<strong>Jump over opponent's pieces</strong> to capture them",
            "<strong>Multiple jumps</strong> in one turn are allowed",
            "<strong>Reach the opposite end</strong> to crown your piece (King)",
            "<strong>Kings can move backward</strong> and have more power"
        ],
        "tips": [
            "Control the center of the board for more mobility",
            "Don't leave your back row unprotected",
            "Force your opponent into positions where they must sacrifice pieces",
            "Think several moves ahead - plan your jumps!"
        ]
    },
    "color-flood": {
        "description": "Color Flood is a puzzle strategy game. Starting from the top-left corner, flood the board with one color at a time to fill the entire grid!",
        "rules": [
            "<strong>Click a color</strong> button to flood from the top-left",
            "<strong>Adjacent matching colors</strong> merge into your flood",
            "<strong>Flood the entire board</strong> with one color to win",
            "<strong>Limited moves</strong> - plan your color sequence carefully",
            "<strong>Each click</strong> expands your territory by one color",
            "<strong>Goal:</strong> Complete the flood within the move limit"
        ],
        "tips": [
            "Look for the largest connected color area to absorb",
            "Plan 2-3 moves ahead to maximize each color choice",
            "Focus on corner areas that are harder to reach",
            "Sometimes blocking opponent colors is as important as expanding"
        ]
    },
    "color-match": {
        "description": "Color Match is a fast-paced memory and reaction game. Match colors quickly as they appear. Test your reflexes and color recognition!",
        "rules": [
            "<strong>Watch the target color</strong> displayed on screen",
            "<strong>Click or tap</strong> the matching color from options",
            "<strong>Speed matters</strong> - faster matches score more points",
            "<strong>Accuracy is crucial</strong> - wrong choices cost points",
            "<strong>Difficulty increases</strong> with more color options",
            "<strong>Combo streaks</strong> multiply your score"
        ],
        "tips": [
            "Stay focused on the target color, not the background",
            "Trust your first instinct - hesitation costs time",
            "Look for distinctive features of each color",
            "Build combos by staying accurate and fast"
        ]
    },
    "color-switch": {
        "description": "Color Switch is a challenging arcade game. Navigate a ball through obstacles by matching colors. Only pass through matching colored barriers!",
        "rules": [
            "<strong>Click or tap</strong> to make the ball bounce upward",
            "<strong>Pass through barriers</strong> that match your ball's color",
            "<strong>Hitting wrong colors</strong> ends the game",
            "<strong>Color changers</strong> rotate your ball through different colors",
            "<strong>Stars</strong> give bonus points when collected",
            "<strong>Timing is everything</strong> - wait for the right moment"
        ],
        "tips": [
            "Tap rhythmically to maintain steady height",
            "Watch the pattern of barriers before moving",
            "Time your moves to pass through when colors align",
            "Don't rush - patience is key to high scores"
        ]
    },
    "dice-roller": {
        "description": "Dice Roller is a simple yet versatile tool. Roll virtual dice for games, decisions, or probability experiments. Choose how many dice and sides!",
        "rules": [
            "<strong>Select dice count</strong> - how many dice to roll",
            "<strong>Select sides</strong> - 6, 8, 10, 12, or 20-sided dice",
            "<strong>Click 'Roll'</strong> to throw the dice",
            "<strong>View individual results</strong> and total sum",
            "<strong>Roll history</strong> shows your previous throws",
            "<strong>Use for board games</strong>, RPGs, or random decisions"
        ],
        "tips": [
            "Use multiple dice for more predictable averages",
            "D20 is perfect for Dungeons & Dragons",
            "2d6 gives a nice bell curve distribution",
            "Great for settling disputes or making random choices!"
        ]
    },
    "doodle-jump": {
        "description": "Doodle Jump is an endless vertical platformer. Guide your character upward by jumping on platforms. How high can you climb?",
        "rules": [
            "<strong>Tilt device</strong> or <strong>Arrow keys</strong> to move left/right",
            "<strong>Auto-jump</strong> when landing on platforms",
            "<strong>Avoid falling</strong> - the screen scrolls up constantly",
            "<strong>Collect power-ups</strong> like jetpacks and springs",
            "<strong>Watch out for monsters</strong> and black holes",
            "<strong>Broken platforms</strong> disappear when stepped on"
        ],
        "tips": [
            "Keep moving upward - hesitation means falling behind",
            "Use springs and jetpacks to gain massive height quickly",
            "Shoot monsters by tapping when you have the propeller hat",
            "Plan your route to hit as many platforms as possible"
        ]
    },
    "falling-blocks": {
        "description": "Falling Blocks is a Tetris-style puzzle game. Rotate and position falling blocks to create complete lines. Clear lines to score points and prevent the stack from reaching the top!",
        "rules": [
            "<strong>Arrow keys</strong> to move left/right and rotate blocks",
            "<strong>Down arrow</strong> or <strong>Space</strong> for fast drop",
            "<strong>Complete horizontal lines</strong> to clear them",
            "<strong>Game over</strong> when blocks reach the top",
            "<strong>Different block shapes</strong> require different strategies",
            "<strong>Speed increases</strong> as you clear more lines"
        ],
        "tips": [
            "Keep the stack flat - avoid creating holes",
            "Save the I-piece (long bar) for clearing 4 lines at once",
            "Use the 'hold' feature (if available) to save useful pieces",
            "Think ahead - watch the next piece preview"
        ]
    },
    "flappy-plane": {
        "description": "Flappy Plane is an arcade flying game. Tap to keep your plane airborne and navigate through gaps in the obstacles. Simple to learn, hard to master!",
        "rules": [
            "<strong>Click or tap</strong> to make the plane flap upward",
            "<strong>Gravity pulls down</strong> when not flapping",
            "<strong>Navigate through gaps</strong> in the green pipes",
            "<strong>Hitting pipes or ground</strong> ends the game",
            "<strong>Each gap passed</strong> scores one point",
            "<strong>Medals awarded</strong> for reaching score milestones"
        ],
        "tips": [
            "Find a steady rhythm - don't tap too fast or slow",
            "Focus on the gap ahead, not your plane",
            "Stay in the middle when possible for maximum reaction time",
            "Small adjustments are better than big flaps"
        ]
    },
    "frogger": {
        "description": "Frogger is a classic arcade game. Guide your frog across busy roads and dangerous rivers to reach the safety of the lily pads!",
        "rules": [
            "<strong>Arrow keys</strong> to hop in each direction",
            "<strong>Cross the road</strong> avoiding cars and trucks",
            "<strong>Cross the river</strong> by jumping on logs and turtles",
            "<strong>Don't fall in the water</strong> or get hit by vehicles",
            "<strong>Reach the lily pads</strong> at the top to score",
            "<strong>Time limit</strong> - don't take too long!"
        ],
        "tips": [
            "Watch traffic patterns before crossing roads",
            "Turtles dive underwater - don't stay on them too long",
            "Plan your route to collect bonus items along the way",
            "Sometimes waiting is better than rushing into danger"
        ]
    },
    "hangman": {
        "description": "Hangman is a classic word guessing game. Guess letters to reveal the hidden word before the hangman drawing is complete!",
        "rules": [
            "<strong>Guess one letter at a time</strong> by clicking or typing",
            "<strong>Correct guesses</strong> reveal all instances of that letter",
            "<strong>Wrong guesses</strong> add parts to the hangman drawing",
            "<strong>6 wrong guesses</strong> and the game is over",
            "<strong>Guess the complete word</strong> before the drawing finishes",
            "<strong>Categories may vary</strong> - movies, animals, countries, etc."
        ],
        "tips": [
            "Start with common vowels: E, A, I, O, U",
            "Common consonants: R, S, T, L, N",
            "Look for word patterns and common letter combinations",
            "Think about the category - it gives context clues"
        ]
    },
    "jump-block": {
        "description": "Jump Block is a precision platformer. Time your jumps perfectly to hop from block to block. One mistimed jump and you start over!",
        "rules": [
            "<strong>Click, tap, or press Space</strong> to jump",
            "<strong>Time your jumps</strong> to land on the next block",
            "<strong>Blocks vary in size</strong> - some are tiny!",
            "<strong>Falling off</strong> means starting over",
            "<strong>Speed increases</strong> as you progress",
            "<strong>Score based on</strong> blocks successfully jumped"
        ],
        "tips": [
            "Don't jump too early - wait for the right moment",
            "Smaller blocks require more precise timing",
            "Find your rhythm and stick to it",
            "Stay calm - rushing leads to mistakes"
        ]
    },
    "math-challenge": {
        "description": "Math Challenge tests your arithmetic skills. Solve math problems as quickly as possible. Choose your difficulty and practice your mental math!",
        "rules": [
            "<strong>Select difficulty</strong> - Easy, Medium, or Hard",
            "<strong>Solve the math problem</strong> shown on screen",
            "<strong>Type your answer</strong> and press Enter",
            "<strong>Speed and accuracy</strong> both count toward score",
            "<strong>Problems include</strong> addition, subtraction, multiplication, division",
            "<strong>Time limit</strong> per question - think fast!"
        ],
        "tips": [
            "Practice mental math tricks for faster calculations",
            "Break down complex problems into simpler steps",
            "Stay calm under time pressure",
            "Start with easier difficulty to warm up"
        ]
    },
    "math-quiz": {
        "description": "Math Quiz is an educational math game. Answer arithmetic questions correctly to score points. Perfect for practicing math skills!",
        "rules": [
            "<strong>Read the math question</strong> carefully",
            "<strong>Select the correct answer</strong> from multiple choices",
            "<strong>Correct answers</strong> add points to your score",
            "<strong>Wrong answers</strong> may subtract points or end streak",
            "<strong>Difficulty increases</strong> as you answer correctly",
            "<strong>Topics include</strong> basic operations, fractions, and more"
        ],
        "tips": [
            "Eliminate obviously wrong answers first",
            "Estimate before calculating for faster decisions",
            "Watch for trick questions - read carefully!",
            "Build streaks for bonus multipliers"
        ]
    },
    "maze-runner": {
        "description": "Maze Runner is a puzzle navigation game. Find your way from start to finish through complex mazes. Race against the clock or take your time!",
        "rules": [
            "<strong>Arrow keys</strong> or <strong>swipe</strong> to move through the maze",
            "<strong>Find the path</strong> from the green start to red finish",
            "<strong>Avoid dead ends</strong> - they waste time",
            "<strong>Complete the maze</strong> as fast as possible",
            "<strong>Mazes get larger</strong> and more complex with each level",
            "<strong>Some mazes</strong> have multiple possible routes"
        ],
        "tips": [
            "Follow the left-hand or right-hand rule for guaranteed exit",
            "Look ahead and plan your route when possible",
            "Don't panic if you hit a dead end - backtrack calmly",
            "Memorize patterns for similar maze structures"
        ]
    },
    "memory-match": {
        "description": "Memory Match is a classic card-matching game. Flip cards to find matching pairs. Test and improve your memory with increasing difficulty!",
        "rules": [
            "<strong>Click cards</strong> to flip them over",
            "<strong>Find matching pairs</strong> by remembering card positions",
            "<strong>Matched pairs</strong> stay face-up and are removed",
            "<strong>Unmatched cards</strong> flip back after a short delay",
            "<strong>Clear all cards</strong> to complete the level",
            "<strong>Fewer moves</strong> and <strong>faster time</strong> = higher score"
        ],
        "tips": [
            "Focus on remembering 2-3 card locations at a time",
            "Clear obvious pairs first to reduce complexity",
            "Use a systematic approach - scan row by row",
            "Take a moment to memorize before making your next move"
        ]
    },
    "memory-test": {
        "description": "Memory Test challenges your short-term memory. Remember patterns, sequences, or positions and reproduce them correctly!",
        "rules": [
            "<strong>Watch the pattern</strong> or sequence carefully",
            "<strong>Memorize</strong> colors, positions, or numbers",
            "<strong>Reproduce the pattern</strong> in the correct order",
            "<strong>Sequences get longer</strong> as you progress",
            "<strong>One mistake</strong> may end the game or reduce score",
            "<strong>Different modes</strong> test different memory types"
        ],
        "tips": [
            "Create mental associations to remember sequences",
            "Break long sequences into smaller chunks",
            "Say the pattern out loud to reinforce memory",
            "Focus completely - distractions hurt performance"
        ]
    },
    "minesweeper": {
        "description": "Minesweeper is the classic logic puzzle. Clear the board without detonating any mines. Use number clues to identify safe squares!",
        "rules": [
            "<strong>Click a square</strong> to reveal what's underneath",
            "<strong>Numbers</strong> show how many mines touch that square",
            "<strong>Right-click</strong> to flag suspected mine locations",
            "<strong>Clear all safe squares</strong> to win",
            "<strong>Hit a mine</strong> and the game is over",
            "<strong>First click is always safe</strong> - use it wisely!"
        ],
        "tips": [
            "Start with corners and edges for better odds",
            "If a 1 touches only one unrevealed square, that square is a mine",
            "If a number equals its adjacent flags, all other adjacent squares are safe",
            "Use double-clicks (if available) to reveal adjacent safe squares"
        ]
    },
    "mini-crossword": {
        "description": "Mini Crossword is a compact word puzzle. Fill in the grid with words that match the given clues. Perfect for a quick brain workout!",
        "rules": [
            "<strong>Read the clues</strong> for Across and Down words",
            "<strong>Click a square</strong> to start typing a word",
            "<strong>Use Arrow keys</strong> to navigate the grid",
            "<strong>All letters intersect</strong> - shared letters must match",
            "<strong>Complete the entire grid</strong> correctly to win",
            "<strong>Check your answers</strong> if you get stuck"
        ],
        "tips": [
            "Start with the easiest clues you know for sure",
            "Fill in crossing words to help with difficult clues",
            "Pay attention to word lengths in the grid",
            "Take breaks if stuck - fresh eyes see new possibilities"
        ]
    },
    "number-puzzle": {
        "description": "Number Puzzle is a sliding tile game. Arrange numbered tiles in order by sliding them into the empty space. A classic brain teaser!",
        "rules": [
            "<strong>Click a tile</strong> adjacent to the empty space to slide it",
            "<strong>Arrange tiles</strong> in numerical order (1, 2, 3...)",
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
    },
    "ping-pong": {
        "description": "Ping Pong is a classic table tennis arcade game. Control your paddle to hit the ball back and forth. First to score wins!",
        "rules": [
            "<strong>Move mouse</strong> or <strong>Arrow keys</strong> to control your paddle",
            "<strong>Hit the ball</strong> back to your opponent",
            "<strong>Score points</strong> when your opponent misses",
            "<strong>First to reach target score</strong> wins the game",
            "<strong>Ball speeds up</strong> as the rally continues",
            "<strong>Play against AI</strong> or challenge a friend"
        ],
        "tips": [
            "Position your paddle to control the ball's angle",
            "Watch the ball's trajectory and anticipate bounces",
            "Use the edges of your paddle for sharper angles",
            "Stay centered when possible for maximum coverage"
        ]
    },
    "puzzle-slide": {
        "description": "Puzzle Slide is a sliding block puzzle. Rearrange the scrambled image or pattern by sliding tiles into the empty space!",
        "rules": [
            "<strong>Click a tile</strong> next to the empty space to slide it",
            "<strong>Rearrange tiles</strong> to complete the picture or pattern",
            "<strong>Only one tile</strong> can slide at a time",
            "<strong>Think ahead</strong> - some moves may block others",
            "<strong>Complete the puzzle</strong> in as few moves as possible",
            "<strong>Different difficulty levels</strong> with varying grid sizes"
        ],
        "tips": [
            "Start with corner pieces to establish the frame",
            "Work on one section at a time",
            "Visualize the final image to guide your moves",
            "Don't be afraid to temporarily disrupt completed areas"
        ]
    },
    "reaction-speed": {
        "description": "Reaction Speed Test measures your reflexes. Click as fast as you can when the signal appears. Compare your reaction time to average!",
        "rules": [
            "<strong>Wait for the signal</strong> - usually a color change",
            "<strong>Click immediately</strong> when you see the signal",
            "<strong>Don't click early</strong> - false starts count as fails",
            "<strong>Your reaction time</strong> is measured in milliseconds",
            "<strong>Take multiple tests</strong> to get an average",
            "<strong>Compare your score</strong> - average is around 250ms"
        ],
        "tips": [
            "Stay focused and alert - anticipation helps",
            "Keep your finger ready over the click area",
            "Don't tense up - relaxed muscles react faster",
            "Practice to improve your neural pathways"
        ]
    },
    "rock-paper-scissors": {
        "description": "Rock Paper Scissors is the classic hand game. Choose rock, paper, or scissors and see if you can beat the computer or a friend!",
        "rules": [
            "<strong>Click your choice</strong> - Rock, Paper, or Scissors",
            "<strong>Rock beats Scissors</strong> (crushes it)",
            "<strong>Paper beats Rock</strong> (covers it)",
            "<strong>Scissors beats Paper</strong> (cuts it)",
            "<strong>Same choices</strong> result in a tie",
            "<strong>Play best of 3, 5, or more</strong> rounds"
        ],
        "tips": [
            "Watch for patterns in your opponent's choices",
            "Beginners often start with Rock - counter with Paper",
            "After a loss, players often switch - anticipate the change",
            "Stay unpredictable by varying your choices"
        ]
    },
    "simon-says": {
        "description": "Simon Says is a memory game. Watch the pattern of lights and sounds, then repeat it back. The pattern gets longer each round!",
        "rules": [
            "<strong>Watch the pattern</strong> of colors that light up",
            "<strong>Listen to the tones</strong> - each color has a unique sound",
            "<strong>Click the colors</strong> in the same order",
            "<strong>Pattern adds one color</strong> each round",
            "<strong>One mistake</strong> and the game is over",
            "<strong>Remember the sequence</strong> - it gets challenging fast!"
        ],
        "tips": [
            "Say the colors out loud as they appear",
            "Create a rhythm or song from the pattern",
            "Focus on the most recent addition each round",
            "Stay calm - stress hurts memory performance"
        ]
    },
    "space-shooter": {
        "description": "Space Shooter is an action-packed arcade game. Pilot your spaceship, blast alien invaders, and dodge enemy fire. How long can you survive?",
        "rules": [
            "<strong>Arrow keys</strong> or <strong>mouse</strong> to move your ship",
            "<strong>Spacebar or click</strong> to shoot lasers",
            "<strong>Destroy enemies</strong> to score points",
            "<strong>Avoid enemy bullets</strong> and collisions",
            "<strong>Collect power-ups</strong> for better weapons or shields",
            "<strong>Boss battles</strong> appear at certain score milestones"
        ],
        "tips": [
            "Stay mobile - a moving target is harder to hit",
            "Focus on one enemy at a time when possible",
            "Save powerful weapons for tough enemies or bosses",
            "Learn enemy attack patterns to anticipate shots"
        ]
    },
    "stack-tower": {
        "description": "Stack Tower is a precision stacking game. Drop blocks to build the tallest tower possible. Perfect alignment creates perfect stacks!",
        "rules": [
            "<strong>Click or tap</strong> to drop the moving block",
            "<strong>Stack blocks</strong> on top of each other",
            "<strong>Perfect alignment</strong> creates bonus points",
            "<strong>Missed blocks</strong> fall off and reduce your stack",
            "<strong>Speed increases</strong> as your tower grows",
            "<strong>Game ends</strong> when you miss completely"
        ],
        "tips": [
            "Watch the block's movement pattern before clicking",
            "Aim for perfect stacks to maximize your score",
            "Stay calm as speed increases - precision beats speed",
            "Build a stable base for better accuracy at height"
        ]
    },
    "tetris": {
        "description": "Tetris is the legendary puzzle game. Rotate and stack falling blocks to clear lines. Don't let the blocks reach the top!",
        "rules": [
            "<strong>Arrow keys</strong> to move and rotate pieces",
            "<strong>Down arrow</strong> for soft drop, <strong>Space</strong> for hard drop",
            "<strong>Complete horizontal lines</strong> to clear them",
            "<strong>Game over</strong> when blocks reach the top",
            "<strong>Hold piece</strong> (if available) to save for later",
            "<strong>Next piece preview</strong> helps you plan ahead"
        ],
        "tips": [
            "Keep the stack flat - holes are hard to fill",
            "Save the I-piece for clearing 4 lines (Tetris)",
            "Learn to rotate pieces in tight spaces",
            "Use hard drop when you know the perfect position"
        ]
    },
    "tic-tac-toe": {
        "description": "Tic Tac Toe is the classic strategy game. Get three of your marks in a row to win. Simple to learn, but requires strategy to master!",
        "rules": [
            "<strong>Click a square</strong> to place your mark (X or O)",
            "<strong>Get 3 in a row</strong> horizontally, vertically, or diagonally to win",
            "<strong>Take turns</strong> with your opponent",
            "<strong>Block your opponent's</strong> winning moves",
            "<strong>Game is a draw</strong> if all squares fill with no winner",
            "<strong>Play against AI</strong> or challenge a friend"
        ],
        "tips": [
            "Take the center square first for the best advantage",
            "Create a fork - two ways to win at once",
            "Block opponent's forks while creating your own",
            "Corners are better than edges for opening moves"
        ]
    },
    "traffic-racer": {
        "description": "Traffic Racer is an endless driving game. Dodge traffic and stay on the road as long as possible. Speed and distance equal points!",
        "rules": [
            "<strong>Arrow keys</strong> or <strong>tilt</strong> to steer left/right",
            "<strong>Avoid other cars</strong> - collisions end the game",
            "<strong>Stay on the road</strong> - going off-road slows you down",
            "<strong>Near misses</strong> earn bonus points",
            "<strong>Speed increases</strong> automatically over time",
            "<strong>Score based on</strong> distance traveled and near misses"
        ],
        "tips": [
            "Stay in the middle lanes for more escape options",
            "Watch traffic patterns ahead, not just immediately in front",
            "Use near misses for bonus points but don't get greedy",
            "Predict other cars' movements based on their lane position"
        ]
    },
    "trivia-quiz": {
        "description": "Trivia Quiz tests your knowledge across various topics. Answer questions correctly to score points. How much do you really know?",
        "rules": [
            "<strong>Read the question</strong> carefully",
            "<strong>Select your answer</strong> from the multiple choices",
            "<strong>Correct answers</strong> add points to your score",
            "<strong>Time limit</strong> per question - answer quickly",
            "<strong>Topics vary</strong> - science, history, sports, entertainment, etc.",
            "<strong>Higher difficulty</strong> questions worth more points"
        ],
        "tips": [
            "Eliminate obviously wrong answers first",
            "Trust your first instinct - it's often correct",
            "Read all options before selecting - trick answers exist",
            "Don't spend too long on one question"
        ]
    },
    "whack-a-mole": {
        "description": "Whack-a-Mole is a fast-paced arcade game. Moles pop up from holes - whack them before they disappear. Don't hit the wrong targets!",
        "rules": [
            "<strong>Click or tap</strong> moles as they pop up",
            "<strong>Hit them quickly</strong> - they don't stay up long",
            "<strong>Avoid hitting bombs</strong> or wrong targets",
            "<strong>Different moles</strong> may be worth different points",
            "<strong>Speed increases</strong> as your score grows",
            "<strong>Limited time</strong> - whack as many as you can!"
        ],
        "tips": [
            "Watch for patterns in which holes moles appear from",
            "Prioritize high-value moles when multiple appear",
            "Stay centered to minimize mouse/finger movement",
            "Don't get trigger-happy - accuracy matters more than speed"
        ]
    },
    "word-guess": {
        "description": "Word Guess is a vocabulary challenge. Guess the hidden word one letter at a time, or try to solve it outright. Test your word knowledge!",
        "rules": [
            "<strong>Guess one letter at a time</strong> or the whole word",
            "<strong>Correct letters</strong> are revealed in the word",
            "<strong>Wrong guesses</strong> reduce your remaining attempts",
            "<strong>Limited attempts</strong> - use them wisely",
            "<strong>Category hints</strong> may help narrow down possibilities",
            "<strong>Guess the complete word</strong> before running out of tries"
        ],
        "tips": [
            "Start with common vowels: E, A, I, O, U",
            "Common consonants: R, S, T, L, N, D",
            "Use the category clue to guide your guesses",
            "Consider word length and common letter patterns"
        ]
    },
    "word-scramble": {
        "description": "Word Scramble challenges you to unscramble letters to form words. Rearrange the scrambled letters to find the hidden word!",
        "rules": [
            "<strong>Look at the scrambled letters</strong> provided",
            "<strong>Rearrange them</strong> to form a valid word",
            "<strong>Type or click letters</strong> in the correct order",
            "<strong>Use hints</strong> if you get stuck (may cost points)",
            "<strong>Solve before time runs out</strong> for maximum points",
            "<strong>Multiple difficulty levels</strong> with longer words"
        ],
        "tips": [
            "Look for common letter combinations (TH, SH, CH, etc.)",
            "Try placing vowels in likely positions",
            "Say possible words out loud - hearing helps recognition",
            "Start with shorter words to build confidence"
        ]
    },
    "word-search": {
        "description": "Word Search is a classic puzzle game. Find hidden words in a grid of letters. Words can be horizontal, vertical, diagonal, and backwards!",
        "rules": [
            "<strong>Find words</strong> from the list hidden in the letter grid",
            "<strong>Words can be</strong> horizontal, vertical, diagonal",
            "<strong>Words may be</strong> forwards or backwards",
            "<strong>Click and drag</strong> to select a found word",
            "<strong>Find all words</strong> to complete the puzzle",
            "<strong>Race against time</strong> for bonus points"
        ],
        "tips": [
            "Scan for first letters, then check surrounding letters",
            "Look for uncommon letters (Q, X, Z) - they're easier to spot",
            "Cross off found words to focus on remaining ones",
            "Take breaks - fresh eyes spot words you missed"
        ]
    }
}

def generate_gameplay_section(game_name, content):
    """生成具体的 gameplay-section HTML"""
    
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

def fix_game_page(game_name):
    """修复单个游戏页面"""
    file_path = Path(f"games/{game_name}/index.html")
    
    if not file_path.exists():
        print(f"❌ {game_name}: File not found")
        return False
    
    content = file_path.read_text(encoding='utf-8')
    
    # 检查是否有通用占位符
    if "Follow the on-screen instructions" not in content:
        print(f"⏭️  {game_name}: No generic content found (may already be fixed)")
        return False
    
    # 检查是否有这个游戏的模板
    if game_name not in GAME_CONTENT:
        print(f"⚠️  {game_name}: No template available, skipping")
        return False
    
    # 生成新的 gameplay-section
    new_section = generate_gameplay_section(game_name, GAME_CONTENT[game_name])
    
    # 使用正则替换旧的 gameplay-section
    # 匹配从 <div class="gameplay-section" 到 </div> 的完整块（需要处理嵌套）
    pattern = r'<div class="gameplay-section".*?</div>\s*</div>\s*</div>\s*</div>'
    
    # 更精确的匹配：找到 gameplay-section 开始，然后匹配到 FAQ section 之前
    # 先找到 gameplay-section 的起始位置
    match = re.search(r'<div class="gameplay-section"[^>]*>', content)
    if not match:
        print(f"❌ {game_name}: Could not find gameplay-section start")
        return False
    
    start_pos = match.start()
    
    # 找到 FAQ section 或 footer 的位置作为结束
    faq_match = re.search(r'<div class="faq-section"', content[start_pos:])
    if faq_match:
        end_pos = start_pos + faq_match.start()
    else:
        # 如果没有 FAQ，找到 footer
        footer_match = re.search(r'<footer>', content[start_pos:])
        if footer_match:
            end_pos = start_pos + footer_match.start()
        else:
            print(f"❌ {game_name}: Could not find end of gameplay-section")
            return False
    
    # 替换内容
    new_content = content[:start_pos] + new_section + "\n\n" + content[end_pos:]
    
    # 写回文件
    file_path.write_text(new_content, encoding='utf-8')
    print(f"✅ {game_name}: Fixed")
    return True

def main():
    """主函数"""
    games_dir = Path("games")
    fixed_count = 0
    skipped_count = 0
    
    print("=" * 60)
    print("批量修复游戏页面 gameplay-section")
    print("=" * 60)
    print()
    
    for game_dir in sorted(games_dir.iterdir()):
        if game_dir.is_dir():
            game_name = game_dir.name
            if fix_game_page(game_name):
                fixed_count += 1
            else:
                skipped_count += 1
    
    print()
    print("=" * 60)
    print(f"修复完成: {fixed_count} 个游戏")
    print(f"跳过: {skipped_count} 个游戏")
    print("=" * 60)

if __name__ == "__main__":
    main()
