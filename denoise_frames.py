"""
Batch denoise all 240 hero frames.
- Removes film-grain noise from the background using a median filter
  (preserves hard edges on the cable while smoothing random pixel scatter).
- Also crops/blurs the 'Veo' watermark in the bottom-right corner.
- Overwrites files in-place.
"""

import os
import sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    from PIL import Image, ImageFilter
except ImportError:
    print("Installing Pillow...")
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image, ImageFilter

FRAMES_DIR = Path(r"e:\codes\ampperecablecloned!\public\frames")
TOTAL = 240

def denoise_frame(i: int) -> str:
    name = f"ezgif-frame-{str(i).zfill(3)}.png"
    path = FRAMES_DIR / name

    if not path.exists():
        return f"SKIP {name}"

    img = Image.open(path).convert("RGB")
    w, h = img.size

    # ── 1. Median filter — removes grain, keeps sharp cable edges ──────────
    # Radius-1 median is strong enough for this level of film grain.
    denoised = img.filter(ImageFilter.MedianFilter(size=3))

    # ── 2. Erase "Veo" watermark (bottom-right ~120×30 px region) ──────────
    # Sample the colour just above/left of the watermark and flood-fill that patch.
    wm_x1 = w - 130
    wm_y1 = h - 45
    wm_x2 = w
    wm_y2 = h

    # Sample background colour from just above the watermark zone
    sample_x = w - 65
    sample_y = h - 55
    bg_color = denoised.getpixel((sample_x, sample_y))

    # Create a solid-colour patch the same size and paste over watermark
    from PIL import ImageDraw
    draw = ImageDraw.Draw(denoised)
    # Slightly blur the patch by averaging with neighbours — avoids hard seam
    patch = denoised.crop((wm_x1, wm_y1, wm_x2, wm_y2))
    # Fill patch with background colour
    draw.rectangle([wm_x1, wm_y1, wm_x2, wm_y2], fill=bg_color)

    # Feather: apply a tiny blur only to that region so it blends
    blurred_patch = denoised.crop((wm_x1 - 10, wm_y1 - 10, wm_x2, wm_y2))
    blurred_patch = blurred_patch.filter(ImageFilter.GaussianBlur(radius=4))
    denoised.paste(blurred_patch, (wm_x1 - 10, wm_y1 - 10))

    # ── 3. Save (lossless PNG, optimised) ──────────────────────────────────
    denoised.save(path, format="PNG", optimize=True)
    return f"OK  {name}"


if __name__ == "__main__":
    print(f"Processing {TOTAL} frames with 8 workers...\n")
    done = 0
    errors = []

    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(denoise_frame, i): i for i in range(1, TOTAL + 1)}
        for fut in as_completed(futures):
            result = fut.result()
            done += 1
            status = "✓" if result.startswith("OK") else "!"
            # Print progress every 20 frames
            if done % 20 == 0 or done == TOTAL:
                print(f"  [{done:3d}/{TOTAL}]  {result}")

    print(f"\nDone. {TOTAL - len(errors)} frames denoised successfully.")
