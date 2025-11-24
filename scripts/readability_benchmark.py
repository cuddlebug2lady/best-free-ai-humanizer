import textstat
from pathlib import Path

def load_text(path):
    try:
        return Path(path).read_text(encoding="utf-8")
    except FileNotFoundError:
        print(f"[ERROR] File not found: {path}")
        return ""

def print_scores(name, text):
    print(f"\n=== {name.upper()} READABILITY ===")
    print(f"Flesch Reading Ease:     {textstat.flesch_reading_ease(text):.2f}")
    print(f"Flesch-Kincaid Grade:    {textstat.flesch_kincaid_grade(text):.2f}")
    print(f"SMOG Index:              {textstat.smog_index(text):.2f}")
    print(f"Avg Sentence Length:     {textstat.avg_sentence_length(text):.2f}")
    print("====================================")

if __name__ == "__main__":
    original = load_text("samples/original.txt")
    humanized = load_text("samples/humanized.txt")

    if original.strip():
        print_scores("original", original)

    if humanized.strip():
        print_scores("humanized", humanized)
