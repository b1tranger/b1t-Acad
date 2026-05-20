import re
import json

filepath = r"C:\Users\saraf\.gemini\antigravity\brain\3670f256-77aa-4dd0-82db-9871d0c9885e\.system_generated\steps\30\content.md"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

drive_links = re.findall(r'https://drive\.google\.com/[^\s"\'<>]+', html)
print(f"Found {len(drive_links)} drive links:")
for link in list(set(drive_links))[:20]:
    print(link)

# Let's search for potential folder/file arrays
# In Drive, the list of items is usually a large JSON structure containing file lists:
# e.g., ["name", "id", "mimeType", ...]
# Let's see if we can find CSE, CE, IT, q.cse, etc. in the document.
print("\nSearching for department/questions mentions:")
for match in re.finditer(r'(q\.cse|q\.ce|q\.it|CSE|Civil|Information|qbank)', html, re.IGNORECASE):
    start = max(0, match.start() - 50)
    end = min(len(html), match.end() + 100)
    print(f"Match: {html[start:end]}")
    print("-" * 40)
