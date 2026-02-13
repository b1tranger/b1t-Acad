User: #target: in this page, I want to implements a notice scrapper of sorts

#specification:
- the target website does not allow viewing notice without logging in first. So I want to use my student ID and Password to log in and then list the PDF links to those notices in this webpage.
- this is an example link: https://ucam.uits.edu.bd/Notice/MainNoticePage.aspx?findingID=723
- the scrapper should be able to check if ID=724 (PDF serial) is returning a PDF file or not. If yes, then the top-most link in the list will be of ID=724 (or, https://ucam.uits.edu.bd/Notice/MainNoticePage.aspx?findingID=724)
- there needs to be a simple pdf renderer with download button within my website as well

#concerns:
- I do not wish to reveal my ID or Password in any form to the forntend clients. Therefore, I am thinking of opting into a backend hosting.
- what web hosting will be best for this implementation? Vercel or Cloudfare? 
- should I use a separate repository to host my backend codes? again, I do not want to reveal my credentials

#instruction:
- do not proceed to generate the code. Let me decide first

GitHub Copilot: You have exceeded your premium request allowance. We have automatically switched you to GPT-4.1 which is included with your plan. [Enable additional paid premium requests](command:chat.enablePremiumOverages) to continue using premium models.Here’s a concise breakdown of your requirements and recommendations for your concerns:

1. Backend Hosting Choice:
   - Both Vercel and Cloudflare (specifically Cloudflare Workers) can host backend code, but:
     - Vercel is easier for Node.js/Express APIs and supports environment variables for secrets.
     - Cloudflare Workers are serverless, fast, and secure, but have some limitations (e.g., no native Node.js, limited filesystem access).
   - For your use case (scraping, login, PDF handling), Vercel is generally more flexible and beginner-friendly.

2. Repository & Credentials:
   - Yes, use a separate private repository for backend code.
   - Store your credentials (student ID, password) as environment variables/secrets in your hosting platform, never in code or public repos.

3. Security:
   - Never expose your credentials to the frontend.
   - The backend should handle login, scraping, and serve only the necessary data (PDF links or files) to the frontend.

4. PDF Rendering:
   - Use a frontend PDF viewer (like PDF.js) to display PDFs fetched from your backend, with a download button.

Would you like a detailed implementation plan for Vercel, Cloudflare, or both? Or do you want to discuss further before proceeding?