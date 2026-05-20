import re
import os
import json

folders = {
    "CSE": "1W1SN7oatZsUt-CqnvKm2Tl6k4j9Qwp89",
    "CE": "1Zh-85bd1j2_QW9oQTxWWzRqTyiu_QH0m",
    "IT": "13J7IjVujrgR9hZY3EucQfvryVJgu9aWq",
    "BBA": "114sXjQtGaf8YWUHwuYvG5_BAGSrMphM1",
    "Law": "1kVE8DdNZaIh49enbPMemrJJ-pu2hSzQi",
    "Others": "1zjUJzzqetoAw1A3pEMLppiZyRAQNGWC6"
}

out_dir = r"C:\Users\saraf\.gemini\antigravity\scratch\drive_pages"

results = {}

for name, fid in folders.items():
    filepath = os.path.join(out_dir, f"{name}.html")
    if not os.path.exists(filepath):
        print(f"File {filepath} does not exist!")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    normalized = html.replace('\\x22', '"').replace('\\u0022', '"').replace('\\"', '"').replace('\\x5d', ']').replace('\\x5b', '[')
    
    # Regex to find: ["child_id", ["parent_id"], "child_name", "mime"]
    # or: ["child_id",["parent_id"],"child_name","application/vnd.google-apps.folder"
    raw_matches = re.findall(r'\[\s*"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"', normalized)
    
    # Let's also match with nested brackets or other forms
    matches_folder = re.findall(r'\[\s*"([a-zA-Z0-9_-]{28,45})"\s*,\s*\[\s*"([a-zA-Z0-9_-]{28,45})"\s*\]\s*,\s*"([^"]+)"\s*,\s*"application/vnd\.google-apps\.folder"', normalized)
    
    children = []
    seen = set()
    
    for child_id, p_id, c_name, mime in raw_matches:
        if p_id == fid:
            key = (child_id, c_name, mime)
            if key not in seen:
                seen.add(key)
                children.append(key)
                
    for child_id, p_id, c_name in matches_folder:
        if p_id == fid:
            # check if folder is already added
            found = False
            for c_id, name_, mime_ in children:
                if c_id == child_id:
                    found = True
                    break
            if not found:
                key = (child_id, c_name, 'application/vnd.google-apps.folder')
                children.append(key)
                
    results[name] = children

print("PARSED RESULTS:")
for name, children in results.items():
    print(f"\n--- {name} Questions (Parent: {folders[name]}) ---")
    for child_id, c_name, mime in sorted(children, key=lambda x: x[1]):
        print(f"  Name: {c_name} | ID: {child_id} | Mime: {mime}")

# Let's output a JSON file containing the results for easy usage later
with open(r"C:\Users\saraf\.gemini\antigravity\scratch\qbank_folders.json", "w") as f:
    # convert tuples to dicts
    json_data = {}
    for name, children in results.items():
        json_data[name] = [{"id": cid, "name": cname, "mime": mime} for cid, cname, mime in sorted(children, key=lambda x: x[1])]
    json.dump(json_data, f, indent=4)
print("\nSaved JSON to qbank_folders.json")
