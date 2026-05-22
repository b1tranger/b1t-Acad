const NOTES_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpz1dmBEH7692_3O0qKxMO9OwgKDNdsk32XESEFQerXM9_GoA2AgfrdxL4RgIcNW8wxQ87M7yrpb8x/pub?gid=1460575719&single=true&output=csv';

const N_COL_EMAIL = 1;
const N_COL_NAME = 2;
const N_COL_STUDENT_ID = 3;
const N_COL_DEPT_BATCH = 4;
const N_COL_DETAILS = 5;
const N_COL_FILES = 6;

function parseCSV(str) {
    const arr = [];
    let quote = false;
    let col = 0, row = 0;

    for (let c = 0; c < str.length; c++) {
        let cc = str[c], nc = str[c + 1];
        arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || '';

        if (cc == '"' && quote && nc == '"') {
            arr[row][col] += cc; ++c; continue;
        }
        if (cc == '"') {
            quote = !quote; continue;
        }
        if (cc == ',' && !quote) {
            ++col; continue;
        }
        if (cc == '\r' && nc == '\n' && !quote) {
            ++row; col = 0; ++c; continue;
        }
        if (cc == '\n' && !quote) {
            ++row; col = 0; continue;
        }
        if (cc == '\r' && !quote) {
            ++row; col = 0; continue;
        }
        arr[row][col] += cc;
    }
    return arr;
}

function parseFileLinks(fileCell) {
    if (!fileCell) return [];

    const text = String(fileCell);
    const links = [];

    const urlRegex = /https?:\/\/[^\s,]+/g;
    const matches = text.match(urlRegex);

    if (matches) {
        matches.forEach((url, index) => {
            links.push({
                url: url.trim(),
                name: `File ${index + 1}`
            });
        });
    }

    return links;
}

async function test() {
    try {
        console.log("Fetching NOTES sheet CSV...");
        const response = await fetch(NOTES_SHEET_URL);
        const text = await response.text();
        console.log("Fetched successfully. Length:", text.length);

        const rows = parseCSV(text);
        console.log("Parsed rows count:", rows.length);

        if (rows.length <= 1) {
            console.log("Empty or header only.");
            return;
        }

        const submitterMap = new Map();

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length <= N_COL_NAME) continue;

            const name = String(row[N_COL_NAME] || '').trim();
            if (!name || name === '' || name.toLowerCase() === 'student name') continue;

            const email = String(row[N_COL_EMAIL] || '').trim();
            const studentId = String(row[N_COL_STUDENT_ID] || '').trim();
            const deptBatch = String(row[N_COL_DEPT_BATCH] || '').trim();
            const details = String(row[N_COL_DETAILS] || '').trim();
            const filesRaw = String(row[N_COL_FILES] || '').trim();

            const files = parseFileLinks(filesRaw);
            
            let timestamp = 0;
            if (row[0]) {
                const parsedTs = Date.parse(row[0].trim());
                if (!isNaN(parsedTs)) timestamp = parsedTs;
            }

            const submission = {
                deptBatch,
                details,
                files,
                timestamp
            };

            if (submitterMap.has(name)) {
                const submitter = submitterMap.get(name);
                submitter.count++;
                submitter.submissions.push(submission);
            } else {
                submitterMap.set(name, {
                    name,
                    email,
                    studentId,
                    count: 1,
                    submissions: [submission]
                });
            }
        }

        console.log("Successfully processed. Submitter count:", submitterMap.size);
        for (const [name, submitter] of submitterMap.entries()) {
            console.log(`- Submitter: "${name}" (${submitter.count} submissions)`);
            submitter.submissions.forEach((sub, idx) => {
                console.log(`  [${idx+1}] Dept/Batch: "${sub.deptBatch}", Files:`, sub.files);
            });
        }

    } catch (e) {
        console.error("Test failed with error:", e);
    }
}

test();
