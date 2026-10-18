"""Construye la página en un solo archivo HTML.
   python3 build.py            -> dist/hemiciclo-29n.html (versión para Claude)
   python3 build.py --site     -> index.html (página completa para GitHub/Vercel, con el nombre Two-Hemiciclo 29N)"""
import re, sys, os
src = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src') + '/'
site = '--site' in sys.argv
t = open(src+'template.html').read()
strip = lambda s: re.sub(r'\nif \(typeof module !== "undefined"\).*\n?', '\n', s)
t = t.replace('/*STYLE*/', open(src+'style.css').read())
t = t.replace('/*MAPDATA*/', open(src+'mapdata.js').read())
t = t.replace('/*MODEL*/', strip(open(src+'model.js').read()))
t = t.replace('/*DATA*/', strip(open(src+'data.js').read()))
t = t.replace('/*APP*/', open(src+'app.js').read())
if site:
    NAME = 'Two-Hemiciclo 29N'
    t = t.replace('<b>Hemiciclo<span>29N</span></b>', '<b>Two-Hemiciclo<span>29N</span></b>')
    t = t.replace('Hemiciclo 29N', NAME)
    i = t.index('<header')
    head, body = t[:i], t[i:]
    desc = 'Programas, encuestas, simulador de escaños del Congreso y del Senado y mapa de las elecciones generales del 29 de noviembre de 2026.'
    t = ('<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n'
         '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
         f'<meta name="description" content="{desc}">\n'
         '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 64 64%27%3E%3Crect width=%2764%27 height=%2764%27 rx=%2712%27 fill=%27%2315171C%27/%3E%3Ctext x=%2732%27 y=%2742%27 font-family=%27Arial%27 font-weight=%27900%27 font-size=%2726%27 text-anchor=%27middle%27 fill=%27%23FFD23F%27%3E29N%3C/text%3E%3C/svg%3E">\n'
         + head + '</head>\n<body>\n' + body + '\n</body>\n</html>\n')
    out = sys.argv[sys.argv.index('--out')+1] if '--out' in sys.argv else 'index.html'
else:
    out = 'dist/hemiciclo-29n.html'
os.makedirs(os.path.dirname(out) or '.', exist_ok=True)
open(out, 'w').write(t)
print(out, len(t))
