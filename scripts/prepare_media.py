"""Gera derivados sem modificar os originais. Requer Pillow e FFmpeg.
Uso: python prepare_media.py /caminho/oPedro/public/videos /caminho/ffmpeg
"""
import json, pathlib, subprocess, sys
from PIL import Image
source = pathlib.Path(sys.argv[1])
ffmpeg = sys.argv[2]
root = pathlib.Path(__file__).resolve().parents[1]
# timecode, nome editorial. Nenhum par é inferido automaticamente.
frames = [
 ('IMG_8614.mov', 2, 'pedro'),
 ('IMG_8604.mov', 2, 'antes'),
 ('IMG_8646.mov', 2, 'depois'),
 ('IMG_8644.mov', 2, 'resultado-frente'),
 ('IMG_8619.mov', 2, 'atendimento'),
 ('IMG_8613.mov', 2, 'corte-tesoura'),
 ('IMG_8615.mov', 2, 'noblesse-ambiente'),
 ('IMG_8610.mov', 2, 'noblesse-atendimento'),
 ('hero.mp4.mov', 48, 'hero-poster'),
]
for filename, second, name in frames:
 temporary = pathlib.Path('/tmp') / f'opedro-{name}.png'
 subprocess.run([ffmpeg, '-loglevel', 'error', '-ss', str(second), '-i', str(source/filename), '-frames:v','1','-update','1','-y',str(temporary)],check=True)
 with Image.open(temporary) as image:
  for width in [480, 960, 1440]:
   resized = image.resize((width,round(image.height*width/image.width)),Image.Resampling.LANCZOS)
   resized.save(root/f'public/images/media/{name}-{width}.webp',quality=87,method=6)
for width, name in [(1080,'hero'),(720,'hero-mobile')]:
 subprocess.run([ffmpeg,'-loglevel','error','-i',str(source/'hero.mp4.mov'),'-map','0:v:0','-map','0:a:0','-c:a','copy','-sn','-dn','-map_metadata','-1','-vf',f'scale={width}:-2,fps=24','-c:v','libx264','-crf','23','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart','-y',str(root/f'public/videos/media/{name}.mp4')],check=True)
print('Derivados concluídos. Originais preservados.')
