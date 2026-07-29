import os
import subprocess
import sys
import glob

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from PIL import Image
except ImportError:
    install('Pillow')
    from PIL import Image

frames_dir = os.path.join(os.getcwd(), 'public', 'frames')
png_files = glob.glob(os.path.join(frames_dir, '*.png'))

for png_file in png_files:
    try:
        webp_file = png_file.rsplit('.', 1)[0] + '.webp'
        img = Image.open(png_file)
        img.save(webp_file, 'WEBP', quality=80)
        os.remove(png_file)
        print(f"Compressed and removed {os.path.basename(png_file)}")
    except Exception as e:
        print(f"Error processing {png_file}: {e}")

print(f"Finished processing {len(png_files)} files.")
