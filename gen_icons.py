"""
Generate all needed red vector SVG icons for About page
Color: #ef4444 (Tailwind red-500)
"""
import math

RED = "#ef4444"

# ── 1. Certifications icon: Shield + Checkmark ───────────────────────────────
cert_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Shield shape -->
  <path d="M50,8 L86,22 L86,53 Q86,78 50,92 Q14,78 14,53 L14,22 Z"
        stroke="{c}" stroke-width="5.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <!-- Check mark inside shield -->
  <polyline points="30,50 43,64 71,37"
            stroke="{c}" stroke-width="6.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''.format(c=RED)

# ── 2. Vision icon: Eye with iris + highlight ────────────────────────────────
vision_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Eye lids -->
  <path d="M10,50 Q28,18 50,18 Q72,18 90,50 Q72,82 50,82 Q28,82 10,50 Z"
        stroke="{c}" stroke-width="5" fill="none" stroke-linejoin="round"/>
  <!-- Iris ring -->
  <circle cx="50" cy="50" r="17" stroke="{c}" stroke-width="5" fill="none"/>
  <!-- Pupil -->
  <circle cx="50" cy="50" r="7.5" fill="{c}"/>
  <!-- Eye lid crease top highlight -->
  <path d="M28,35 Q50,28 72,35" stroke="{c}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55"/>
</svg>'''.format(c=RED)

# ── 3. Mission icon: Bullseye target + arrow ─────────────────────────────────
# Target center at (48, 56), arrow from top-right
mission_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Outer ring -->
  <circle cx="47" cy="57" r="33" stroke="{c}" stroke-width="4.5" fill="none"/>
  <!-- Middle ring -->
  <circle cx="47" cy="57" r="20" stroke="{c}" stroke-width="4.5" fill="none"/>
  <!-- Bullseye center -->
  <circle cx="47" cy="57" r="8" fill="{c}"/>
  <!-- Arrow shaft -->
  <line x1="83" y1="17" x2="54" y2="49" stroke="{c}" stroke-width="5.5" stroke-linecap="round"/>
  <!-- Arrowhead triangle -->
  <polygon points="83,17 71,20 80,29" fill="{c}"/>
</svg>'''.format(c=RED)

# ── 4. Product Categories icon: 3 stacked cable cross-sections ───────────────
product_cat_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Cable 1 (top) - round cable cross-section -->
  <rect x="14" y="16" width="72" height="18" rx="9" stroke="{c}" stroke-width="4.5" fill="none"/>
  <circle cx="50" cy="25" r="5.5" fill="{c}"/>
  <!-- Cable 2 (middle) -->
  <rect x="14" y="41" width="72" height="18" rx="9" stroke="{c}" stroke-width="4.5" fill="none"/>
  <circle cx="50" cy="50" r="5.5" fill="{c}"/>
  <!-- Cable 3 (bottom) -->
  <rect x="14" y="66" width="72" height="18" rx="9" stroke="{c}" stroke-width="4.5" fill="none"/>
  <circle cx="50" cy="75" r="5.5" fill="{c}"/>
</svg>'''.format(c=RED)

# ── 5. Clients Nationwide icon: Network node graph ────────────────────────────
clients_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Central hub node -->
  <circle cx="50" cy="42" r="9.5" fill="{c}"/>
  <!-- Outer nodes -->
  <circle cx="20" cy="22" r="7" fill="{c}"/>
  <circle cx="80" cy="22" r="7" fill="{c}"/>
  <circle cx="16" cy="70" r="7" fill="{c}"/>
  <circle cx="84" cy="70" r="7" fill="{c}"/>
  <circle cx="50" cy="84" r="7" fill="{c}"/>
  <!-- Connections from center -->
  <line x1="50" y1="42" x2="20" y2="22" stroke="{c}" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="50" y1="42" x2="80" y2="22" stroke="{c}" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="50" y1="42" x2="16" y2="70" stroke="{c}" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="50" y1="42" x2="84" y2="70" stroke="{c}" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="50" y1="42" x2="50" y2="84" stroke="{c}" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Cross-connections (ring) -->
  <line x1="16" y1="70" x2="50" y2="84" stroke="{c}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
  <line x1="84" y1="70" x2="50" y2="84" stroke="{c}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
</svg>'''.format(c=RED)

icons = {
    'public/icons/cert-icon.svg': cert_svg,
    'public/icons/vision-icon.svg': vision_svg,
    'public/icons/mission-icon.svg': mission_svg,
    'public/icons/product-cat-icon.svg': product_cat_svg,
    'public/icons/clients-icon.svg': clients_svg,
}

for path, content in icons.items():
    with open(path, 'w') as f:
        f.write(content)
    print(f'Written: {path}')

print('\nAll done!')


# ── Atom + Star SVG (Core Values) ──────────────────────────────────────────
# 5-pointed star, center (50,50), outer_r=16, inner_r=6.5
star_pts = []
for i in range(5):
    outer_a = -90 + i * 72
    inner_a = outer_a + 36
    ox, oy = pt(50, 50, 16, outer_a)
    ix, iy = pt(50, 50, 6.5, inner_a)
    star_pts.append(f'{ox},{oy}')
    star_pts.append(f'{ix},{iy}')
star_poly = ' '.join(star_pts)

atom_svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n'
    '  <ellipse cx="50" cy="50" rx="46" ry="16" stroke="#ef4444" stroke-width="5.5" fill="none" stroke-linecap="round"/>\n'
    '  <ellipse cx="50" cy="50" rx="46" ry="16" stroke="#ef4444" stroke-width="5.5" fill="none" stroke-linecap="round" transform="rotate(60 50 50)"/>\n'
    '  <ellipse cx="50" cy="50" rx="46" ry="16" stroke="#ef4444" stroke-width="5.5" fill="none" stroke-linecap="round" transform="rotate(-60 50 50)"/>\n'
    f'  <polygon points="{star_poly}" fill="#ef4444"/>\n'
    '</svg>'
)

# ── Gear + Lightbulb SVG (Innovation) ──────────────────────────────────────
cx, cy = 50, 47   # gear/bulb center (shifted slightly up)
inner_r, outer_r = 29, 46
n_teeth = 10
tooth_half = 8.5
valley_total = (360 / n_teeth) - tooth_half * 2   # = 36 - 17 = 19deg

gear_pts = []
for i in range(n_teeth):
    center_a = i * (360 / n_teeth)
    for a, r in [
        (center_a - tooth_half - valley_total / 2, inner_r),
        (center_a - tooth_half, outer_r),
        (center_a + tooth_half, outer_r),
        (center_a + tooth_half + valley_total / 2, inner_r),
    ]:
        gx, gy = pt(cx, cy, r, a)
        gear_pts.append(f'{gx},{gy}')

gear_poly = ' '.join(gear_pts)

# Bulb dome: arc centered at (cx, cy-6), radius 14
# Bulb goes from y=(cy+8) downward
dome_cy = cy - 6
dome_r = 14
dome_left_x = round(cx - dome_r, 1)
dome_right_x = round(cx + dome_r, 1)
dome_y = round(dome_cy + 6, 1)   # where dome meets vertical sides
stem_top = round(dome_cy + dome_r + 1, 1)
stem_bot = round(stem_top + 9, 1)
base1_y = round(stem_bot + 0.5, 1)
base2_y = round(base1_y + 4, 1)
base3_y = round(base2_y + 4, 1)
base_left = round(cx - 11, 1)
base_right = round(cx + 11, 1)
stem_left = round(cx - 11, 1)
stem_right = round(cx + 11, 1)

inno_svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n'
    f'  <polygon points="{gear_poly}" stroke="#ef4444" stroke-width="1.5" fill="none" stroke-linejoin="round"/>\n'
    f'  <circle cx="{cx}" cy="{cy}" r="{inner_r - 2}" stroke="none" fill="white"/>\n'
    # Bulb dome (semicircle)
    f'  <path d="M {dome_left_x},{dome_y} A {dome_r},{dome_r} 0 1 1 {dome_right_x},{dome_y}" stroke="#ef4444" stroke-width="3.5" fill="none" stroke-linecap="round"/>\n'
    # Vertical sides of bulb
    f'  <line x1="{dome_left_x}" y1="{dome_y}" x2="{stem_left}" y2="{stem_bot}" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>\n'
    f'  <line x1="{dome_right_x}" y1="{dome_y}" x2="{stem_right}" y2="{stem_bot}" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>\n'
    # Filament lines (3 vertical strands inside)
    f'  <line x1="{round(cx-4,1)}" y1="{round(stem_top-3,1)}" x2="{round(cx-4,1)}" y2="{stem_bot}" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>\n'
    f'  <line x1="{cx}" y1="{round(stem_top-5,1)}" x2="{cx}" y2="{stem_bot}" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>\n'
    f'  <line x1="{round(cx+4,1)}" y1="{round(stem_top-3,1)}" x2="{round(cx+4,1)}" y2="{stem_bot}" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>\n'
    # Base bands (3 horizontal lines)
    f'  <line x1="{stem_left}" y1="{base1_y}" x2="{stem_right}" y2="{base1_y}" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>\n'
    f'  <line x1="{round(stem_left+1,1)}" y1="{base2_y}" x2="{round(stem_right-1,1)}" y2="{base2_y}" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>\n'
    f'  <line x1="{round(stem_left+3,1)}" y1="{base3_y}" x2="{round(stem_right-3,1)}" y2="{base3_y}" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>\n'
    '</svg>'
)

with open('public/icons/core-values.svg', 'w') as f:
    f.write(atom_svg)
with open('public/icons/innovation.svg', 'w') as f:
    f.write(inno_svg)

print('Done!')
print('atom_svg preview:')
print(atom_svg[:200])
