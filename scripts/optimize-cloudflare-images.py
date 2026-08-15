from pathlib import Path
from PIL import Image


IMAGE_DIR = Path(__file__).resolve().parents[1] / "client" / "public" / "images"
TARGETS = {
    "workflow-library-hero.webp": 1280,
    "research-brief-workflow.webp": 1280,
    "meeting-to-action-workflow.webp": 1280,
    "ai-content-plan-workflow.webp": 1280,
}


def optimize(path: Path, max_width: int) -> None:
    with Image.open(path) as image:
        image = image.convert("RGB")
        width, height = image.size
        if width > max_width:
            resized_height = round(height * max_width / width)
            image = image.resize((max_width, resized_height), Image.Resampling.LANCZOS)
        image.save(path, "WEBP", quality=76, method=6)
        new_width, new_height = image.size
    size_kb = round(path.stat().st_size / 1024)
    print(f"{path.name}: {width}x{height} -> {new_width}x{new_height}, {size_kb} KB")


for filename, max_width in TARGETS.items():
    optimize(IMAGE_DIR / filename, max_width)
