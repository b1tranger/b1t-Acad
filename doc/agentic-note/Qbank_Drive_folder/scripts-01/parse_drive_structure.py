import re
import json

filepath = r"C:\Users\saraf\.gemini\antigravity\brain\3670f256-77aa-4dd0-82db-9871d0c9885e\.system_generated\steps\30\content.md"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# Normalize
normalized = html.replace('\\x22', '"').replace('\\u0022', '"').replace('\\"', '"').replace('\\x5d', ']').replace('\\x5b', '[')

# Let's find all pattern: ["ID", ["PARENT_ID"], "NAME", "MIMETYPE"]
# Note: PARENT_ID can be a single item list, e.g., ["parent"] or [["parent"]] or multiple parents.
# Let's use a regex to match: ["ID", [parents], "NAME", "MIMETYPE"
# or similar structure: ["ID",["PARENT_ID"],"NAME","application/vnd.google-apps.folder"
# In Google Drive: ["ID",["PARENT_ID"],"NAME","application/vnd.google-apps.folder",0,null,0,0,0,...]
# Let's search for this pattern:
pattern = r'\[\s*"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"application/vnd\.google-apps\.folder"'
matches = re.findall(pattern, normalized)

# Also check with extra brackets if they exist
pattern2 = r'\[\s*"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*\]\s*,\s*"([^"]+)"\s*,\s*"application/vnd\.google-apps\.folder"'
matches2 = re.findall(pattern2, normalized)

# General extraction using json load or regex
# Let's extract any array like: ["some_id", ["parent_id"], "name", "mime"]
# Since Google Drive uses nested JSON arrays in JavaScript, let's look for:
# "[ID", [PARENT], "NAME", "MIME"
# Let's find all occurrences of strings like ["id", ["parent"], "name"]
raw_matches = re.findall(r'\[\s*"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"', normalized)

all_items = {}
for item_id, parent_id, name, mime in raw_matches:
    all_items[item_id] = {
        'id': item_id,
        'parent': parent_id,
        'name': name,
        'mime': mime
    }

# Also search for cases where parent has two sets of brackets, or check matches from matches/matches2
for item_id, parent_id, name in matches:
    all_items[item_id] = {
        'id': item_id,
        'parent': parent_id,
        'name': name,
        'mime': 'application/vnd.google-apps.folder'
    }

# Build tree
from collections import defaultdict
tree = defaultdict(list)
for item_id, item in all_items.items():
    tree[item['parent']].append(item)

def print_tree(parent, level=0):
    for item in sorted(tree[parent], key=lambda x: x['name']):
        print("  " * level + f"- {item['name']} ({item['id']}) [{item['mime']}]")
        print_tree(item['id'], level + 1)

print("FOLDER TREE:")
print_tree("1i0UUsgy68Nypc2ylPsaB-Teljkf0NSUD")

print("\nAll parsed items:")
for item_id, item in all_items.items():
    print(f"ID: {item_id} | Parent: {item['parent']} | Name: {item['name']} | Mime: {item['mime']}")
