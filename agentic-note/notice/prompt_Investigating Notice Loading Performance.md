# Chat Conversation

Note: _This is purely the output of the chat conversation and does not contain any raw data, codebase snippets, etc. used to generate the output._

### User Input

does the notice loading take time because the vercel server takes time waking up?

*Grep searched codebase*

*Viewed [notice.html](file:///e:/Git_WIP/3.%20University%20repositories/b1t-Acad/misc/notice.html) *

*Listed directory [b1t-Acad](file:///e:/Git_WIP/3.%20University%20repositories/b1t-Acad) *

*Grep searched codebase*

*Viewed [DOCUMENTATION.md](file:///e:/Git_WIP/3.%20University%20repositories/b1t-Acad/doc/DOCUMENTATION.md) *

### Planner Response

Yes, the loading time for the notices is definitely affected by the **Vercel server waking up (cold starts)**, but there are actually three main reasons why that section feels slower than the rest of the site:

### 1. Vercel Serverless "Cold Starts"
As you suspected, the backend at `b1t-acad-backend.vercel.app` uses **Vercel Serverless Functions**. 
- To save resources, Vercel "shuts down" your server if it hasn't been used for about 15–30 minutes. 
- When the first person clicks "Notice Viewer" after a period of inactivity, Vercel has to provision a new container and start the backend process from scratch to handle the request. This adds **1 to 3 seconds** of initial delay.

### 2. Live Web Scraping (UCAM Portal)
Unlike the rest of **b1t-Acad** (which fetches static JSON or Google Sheets data), the Notice system is dynamic. The backend at `/api/notices` likely performs **real-time web scraping** of the official UITS UCAM portal.
- The backend has to make its own request to the university server.
- It then has to parse the university's HTML into JSON for your frontend.
- Since the university's server can be slow or unresponsive, this delay is passed directly to your loading spinner.

### 3. PDF Proxying
When you select a notice, the PDF isn't loaded directly from a CDN. It is proxied through the same backend via:
`https://b1t-acad-backend.vercel.app/api/pdf?id=...`
This means every time you click a different notice, you are triggering a new backend request, which may encounter another small delay if the server hasn't been "kept warm" by the previous list-fetch request.

---

### Comparison with the rest of the site:
| Feature | Data Source | Speed |
| :--- | :--- | :--- |
| **Qbank / Departments** | Google Drive (Static) | **Very Fast** (Optimized by Google CDN) |
| **Submissions** | Google Sheets (JSON) | **Fast** (Cached by Google) |
| **Visitor Counter** | CounterAPI | **Instant** |
| **Notices** | **Vercel + Scraper** | **Moderate/Slow** (Cold starts + 3rd party latency) |

**Tip:** If you notice it’s consistently slow, you can "keep it warm" by using a free cron-job service (like [cron-job.org](https://cron-job.org/)) to pings the `/api/notices` endpoint every 10 minutes. This prevents the Vercel function from going to sleep.