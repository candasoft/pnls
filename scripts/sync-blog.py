"""Convert docs/Blogs Word documents into the blog's portable content snapshot.

Uses only the Python standard library. Run `npm run blog:sync` after editing sources.
"""

import hashlib
import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
POSTS = {
    "Intro to Pyinyar Lam Sone": ("intro-to-pyinyar-lam-sone", "Festival stories", "/images/about/pathways.webp"),
    "ဘာလို့ ပညာလမ်းဆုံကို လာသင့်တာလဲ": ("why-visit-pyinyar-lam-sone", "Visitor guide", "/images/about/community.webp"),
    "အနာဂတ်အတွက် လမ်းကြောင်းရွေးချယ်ဖို့ အဆင်သင့်ပဲလား": ("choose-your-future-pathway", "Your next step", "/images/zones/study-desk.webp"),
    "Why Exhibit at ပညာလမ်းဆုံ": ("why-exhibit-at-pyinyar-lam-sone", "For exhibitors", "/images/festival-hall.webp"),
    "Exhibitor and Partner Invitation": ("exhibitor-and-partner-invitation", "Partnerships", "/images/festival-activities.webp"),
}


def paragraph_text(paragraph):
    parts = []
    for node in paragraph.iter():
        if node.tag == W + "t":
            parts.append(node.text or "")
        elif node.tag in (W + "br", W + "cr"):
            parts.append("\n")
        elif node.tag == W + "tab":
            parts.append("\t")
    return "".join(parts).strip()


def sync():
    posts = []
    files = sorted((ROOT / "docs/Blogs").glob("*.docx"), key=lambda p: (list(POSTS).index(p.stem) if p.stem in POSTS else len(POSTS), p.name))
    for source in files:
        if source.name.startswith("~$"):
            continue
        fallback_slug = re.sub(r"[^a-z0-9]+", "-", source.stem.lower()).strip("-")
        fallback_slug += "-" + hashlib.sha256(source.stem.encode()).hexdigest()[:8]
        slug, category, image = POSTS.get(source.stem, (fallback_slug, "Festival stories", "/images/about/pathways.webp"))
        with zipfile.ZipFile(source) as archive:
            document = ET.fromstring(archive.read("word/document.xml"))
            paragraphs = [text for p in document.findall(".//" + W + "body//" + W + "p") if (text := paragraph_text(p))]
            if not paragraphs:
                raise ValueError(f"No content in {source.name}")
            media = [name for name in archive.namelist() if name.startswith("word/media/") and Path(name).suffix.lower() in (".png", ".jpg", ".jpeg", ".webp")]
            if media:
                destination = ROOT / "public/images/blog" / (slug + Path(media[0]).suffix.lower())
                destination.parent.mkdir(parents=True, exist_ok=True)
                destination.write_bytes(archive.read(media[0]))
                image = "/" + destination.relative_to(ROOT / "public").as_posix()
        posts.append({
            "slug": slug,
            "title": paragraphs[0],
            "language": "my" if re.search(r"[\u1000-\u109f]", "".join(paragraphs)) else "en",
            "category": category,
            "image": image,
            "excerpt": paragraphs[1],
            "paragraphs": paragraphs[1:],
            "source": source.name,
        })
    if not posts:
        raise ValueError("No posts found in docs/Blogs")
    destination = ROOT / "app/blog/posts.json"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(posts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced {len(posts)} blog posts from docs/Blogs.")


if __name__ == "__main__":
    sync()
