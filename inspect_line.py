from pathlib import Path
path = Path('src/i18n/locales/hy.ts')
text = path.read_text(encoding='utf-8')
idx = text.index("    trackOrder:")
line = text[idx:text.index('\n', idx)]
print(line.encode('utf-8'))
PY
