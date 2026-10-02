"""
生成「黑白像素猫猫」博客所需像素素材 v3（线稿风）
- 猫头造型参考用户提供的 24x17 网格（0=白 1=黑），裁剪为 20x13 后使用
- 全部猫改为"轮廓线 + 少量实心块"的线稿风格，坐/走/睡保持一致
- 直角处用 45° 切角像素过渡，曲线用等差阶梯，避免生硬棱角
- 眨眼帧：睁眼(4 格横条 + 2 格瞳孔) → 闭眼(一条 4 格横线)，前端用 CSS steps 交替播放
用法：python gen_sprites.py
"""

import os
from PIL import Image

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(HERE, "public", "sprites")
os.makedirs(OUT, exist_ok=True)

BLACK = (0, 0, 0, 255)
WHITE = (255, 255, 255, 255)
NONE = (0, 0, 0, 0)


def build(rows, width, height, extras=None):
    """rows: 字符网格('#'黑 'o'白 '.'透明)，每行必须恰好 width 宽；extras: [(x, y, ch)]"""
    img = Image.new("RGBA", (width, height), NONE)
    px = img.load()
    assert len(rows) == height, f"rows {len(rows)} != height {height}"
    for y, row in enumerate(rows):
        row = row.ljust(width, ".")  # 右侧补空，避免手写网格数错格子
        assert len(row) == width, f"row {y} too long: {len(row)} > {width}: {row!r}"
        for x, ch in enumerate(row):
            if ch == "#":
                px[x, y] = BLACK
            elif ch == "o":
                px[x, y] = WHITE
    for x, y, ch in extras or []:
        px[x, y] = BLACK if ch == "#" else WHITE
    return img


def blink_frame(rows, top=6, bottom=7, spans=((4, 7), (12, 15))):
    """闭眼帧：抹掉眼睛上排的横条，下排补成一条 4 格横线（眯眼）"""
    out = [list(r) for r in rows]
    for a, b in spans:
        for x in range(a, b + 1):
            out[top][x] = "."
            out[bottom][x] = "#"
    return ["".join(r) for r in out]


# 参考网格（用户提供，0=白 1=黑，24 宽）。裁剪掉右侧 4 列空白后得到 20x13 的猫头
REF_CAT_HEAD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
# 裁掉全空的首尾行与右侧空白列 → 20x13
assert all(v == 0 for row in REF_CAT_HEAD for v in row[20:]), "右侧 4 列应为空"
CAT_HEAD = [
    "".join("#" if v else "." for v in row[:20])
    for row in REF_CAT_HEAD
    if any(row)
]

# ---------------------------------------------------------------- 坐着的猫（20x23 = 猫头 + 线稿身体）
CAT_SIT = CAT_HEAD + [
    "....##........##....",
    "...#............#...",
    "...#............#...",
    "..#..............#..",
    "..#..............#..",
    "..#..............#..",
    "..#..............#..",
    "..################..",
    "..###..........###..",
    "..##............##..",
]
CAT_SIT_TAIL = [(x, y, "#") for x, y in
                [(18, 22), (19, 22), (19, 21), (19, 20), (19, 19), (18, 18)]]

# ---------------------------------------------------------------- 走路的猫（20x12，侧面朝右）
CAT_WALK = [
    "...........##..##...",
    ".........########...",
    "........##......##.",
    "........#...##...#.",
    "..#######......##..",
    ".#......########...",
    ".#.................",
    "..#................",
    "..############.....",
    "..#..#....#........",
    "..#..#....#........",
    "..##.##...##.......",
]
CAT_WALK_TAIL = [(1, 4, "#"), (0, 5, "#"), (0, 6, "#"), (0, 7, "#")]

# ---------------------------------------------------------------- 睡觉的猫（20x9，蜷缩）
CAT_SLEEP = [
    "....##........##....",
    "...####......####...",
    "..################..",
    ".##..............##.",
    ".#...####..####...#.",
    ".#................#.",
    "..#..............#..",
    "..#..............#..",
    "...##############...",
]
CAT_SLEEP_TAIL = [(19, 6, "#"), (19, 5, "#"), (19, 4, "#")]

# ---------------------------------------------------------------- 小物件（保持实心剪影，小尺寸更好辨识）
PAW = [
    "##.##.##",
    "##.##.##",
    "........",
    "..####..",
    ".######.",
    ".######.",
    ".######.",
    "..####..",
]

FISH = [
    "................",
    "....######......",
    "..##########..##",
    ".####o##########",
    ".##############.",
    "..##########..##",
    "....######......",
    "................",
]

YARN = [
    "..######.....",
    ".########....",
    "##########...",
    "###o##o###...",
    "##o#oo#o##...",
    "##o####o##...",
    "###o##o###...",
    "##########...",
    ".########....",
    "..######.....",
]
YARN_TAIL = [(10, 6, "#"), (11, 6, "#"), (12, 7, "#"), (12, 8, "#")]

HEART = [
    ".##..##.",
    "########",
    "########",
    ".######.",
    "..####..",
    "...##...",
]

# ---------------------------------------------------------------- 输出
SPRITES = [
    ("cat-face.png", build(CAT_HEAD, 20, 13)),
    ("cat-face-blink.png", build(blink_frame(CAT_HEAD), 20, 13)),
    ("cat-sit.png", build(CAT_SIT, 20, 23, CAT_SIT_TAIL)),
    ("cat-sit-blink.png", build(blink_frame(CAT_SIT), 20, 23, CAT_SIT_TAIL)),
    ("cat-walk.png", build(CAT_WALK, 20, 12, CAT_WALK_TAIL)),
    ("cat-sleep.png", build(CAT_SLEEP, 20, 9, CAT_SLEEP_TAIL)),
    ("paw.png", build(PAW, 8, 8)),
    ("fish.png", build(FISH, 16, 8)),
    ("yarn.png", build(YARN, 13, 10, YARN_TAIL)),
    ("heart.png", build(HEART, 8, 6)),
]

for name, img in SPRITES:
    img.save(os.path.join(OUT, name))
    print("saved", name, img.size)

# ---------------------------------------------------------------- 预览拼图（上排睁眼 / 下排闭眼）
SCALE, GAP, PAD = 8, 18, 16
show = [(n, i) for n, i in SPRITES if "blink" not in n]
blinks = {n: i for n, i in SPRITES if "blink" in n}
row_h = max(i.height for _, i in show)
W = PAD * 2 + sum(i.width * SCALE + GAP for _, i in show) - GAP
H = PAD * 3 + row_h * SCALE * 2 + GAP
sheet = Image.new("RGBA", (W, H), WHITE)
x = PAD
for name, img in show:
    big = img.resize((img.width * SCALE, img.height * SCALE), Image.NEAREST)
    sheet.paste(big, (x, PAD), big)
    bl = blinks.get(name.replace(".png", "-blink.png"))
    if bl:
        big2 = bl.resize((bl.width * SCALE, bl.height * SCALE), Image.NEAREST)
        sheet.paste(big2, (x, PAD + row_h * SCALE + GAP), big2)
    x += img.width * SCALE + GAP
sheet.save(os.path.join(HERE, "preview_sprites.png"))
print("preview ->", os.path.join(HERE, "preview_sprites.png"), sheet.size)
