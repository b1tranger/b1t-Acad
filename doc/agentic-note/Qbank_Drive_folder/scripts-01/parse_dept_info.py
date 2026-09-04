import re

filepath = r"C:\Users\saraf\.gemini\antigravity\brain\3670f256-77aa-4dd0-82db-9871d0c9885e\.system_generated\steps\58\content.md"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

normalized = html.replace('\\x22', '"').replace('\\u0022', '"').replace('\\"', '"').replace('\\x5d', ']').replace('\\x5b', '[')

parent_id = "1jwlHQzPGbR-yASnk6Z1xoa4GyaYnfna_"

# Let's find all pattern: ["ID", ["PARENT_ID"], "NAME", "MIMETYPE"]
raw_matches = re.findall(r'\[\s*"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"', normalized)

print(f"Found {len(raw_matches)} raw matches")

items_found = []
for item_id, p_id, name, mime in raw_matches:
    if p_id == parent_id or parent_id in p_id:
        items_found.append((item_id, name, mime))

# Also search for standard parent folder matching
pattern = r'\[\s*"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"application/vnd\.google-apps\.folder"'
matches = re.findall(pattern, normalized)
for child_id, p_id, name in matches:
    if p_id == parent_id:
        items_found.append((child_id, name, 'application/vnd.google-apps.folder'))

unique_items = list(set(items_found))
print(f"\nChildren of {parent_id} found ({len(unique_items)}):")
for child_id, name, mime in sorted(unique_items, key=lambda x: x[1]):
    print(f"ID: {child_id} | Name: {name} | Mime: {mime}")

# Wider search for links or mentions of CSE, Civil, BBA, IT etc in the file
print("\nSurroundings of parent ID:")
for match in re.finditer(parent_id, normalized):
    start = max(0, match.start() - 100)
    end = min(len(normalized), match.end() + 500)
    print(normalized[start:end])
    print("=" * 60)
