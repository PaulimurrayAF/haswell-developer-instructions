import os, re, json
from bs4 import BeautifulSoup

ROOT = "./"        # site root
OUT_DIR = os.path.join(ROOT, "data")
OUT_FILE = os.path.join(OUT_DIR, "search-index.json")

EXCLUDE = {"node_modules", "vendor", "dist", "build", "assets", "images", "css", "js", "fonts", "plugins", "scripts", "revo-slider-demo"}

def clean_text(html):
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "noscript", "iframe"]): tag.decompose()
    for sel in ["header", "nav", "footer", ".footer", ".navbar", ".header", ".menu", ".sidebar"]:
        for el in soup.select(sel): el.decompose()
    text = soup.get_text(separator=" ")
    return re.sub(r"\s+", " ", text).strip()

def get_title(soup):
    if soup.title and soup.title.string: return soup.title.string.strip()
    h1 = soup.find("h1")
    return h1.get_text(strip=True) if h1 else "Untitled"

records = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE and not d.startswith(".")]
    for fn in filenames:
        if not fn.lower().endswith(".html"): continue
        full = os.path.join(dirpath, fn)
        rel  = os.path.relpath(full, ROOT).replace("\\", "/")
        if rel.startswith(("partials/", "_includes/")): continue
        with open(full, "r", encoding="utf-8", errors="ignore") as f:
            html = f.read()
        soup = BeautifulSoup(html, "html.parser")
        title = get_title(soup)
        text = clean_text(html)
        excerpt = (text[:280] + "…") if len(text) > 300 else text
        records.append({
            "url": "/" + rel if not rel.startswith("/") else rel,
            "title": title,
            "content": text,
            "excerpt": excerpt
        })

os.makedirs(OUT_DIR, exist_ok=True)
with open(OUT_FILE, "w", encoding="utf-8") as f:
    json.dump(records, f, ensure_ascii=False)
print(f"Indexed {len(records)} pages -> {OUT_FILE}")
