import urllib.request
import re
import time
import os

folders = {
    "CSE": "1W1SN7oatZsUt-CqnvKm2Tl6k4j9Qwp89",
    "CE": "1Zh-85bd1j2_QW9oQTxWWzRqTyiu_QH0m",
    "IT": "13J7IjVujrgR9hZY3EucQfvryVJgu9aWq",
    "BBA": "114sXjQtGaf8YWUHwuYvG5_BAGSrMphM1",
    "Law": "1kVE8DdNZaIh49enbPMemrJJ-pu2hSzQi",
    "Others": "1zjUJzzqetoAw1A3pEMLppiZyRAQNGWC6"
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

out_dir = r"C:\Users\saraf\.gemini\antigravity\scratch\drive_pages"
os.makedirs(out_dir, exist_ok=True)

for name, fid in folders.items():
    url = f"https://drive.google.com/drive/folders/{fid}"
    print(f"Fetching {name} ({fid})...")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
        
        filepath = os.path.join(out_dir, f"{name}.html")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Saved to {filepath}")
        time.sleep(1) # delay
    except Exception as e:
        print(f"Error fetching {name}: {e}")

print("Done fetching!")
