  document.addEventListener('DOMContentLoaded', () => {
            const fabButton = document.getElementById('fab-button');
            const menuContainer = document.getElementById('menu-container');
            const menuOverlay = document.getElementById('menu-overlay');

            // --- Function to toggle menu ---
            const toggleMenu = () => {
                const isActive = fabButton.classList.contains('is-active');
                
                if (!isActive) {
                    // Open menu
                    fabButton.classList.add('is-active');
                    fabButton.setAttribute('aria-expanded', 'true');
                    menuOverlay.classList.remove('hidden');
                    menuContainer.classList.add('is-active');
                    document.body.classList.add('body-no-scroll');
                } else {
                    // Close menu
                    fabButton.classList.remove('is-active');
                    fabButton.setAttribute('aria-expanded', 'false');
                    menuOverlay.classList.add('hidden');
                    menuContainer.classList.remove('is-active');
                    document.body.classList.remove('body-no-scroll');
                }
            };

            // --- Event Listeners for menu ---
            fabButton.addEventListener('click', toggleMenu);
            menuOverlay.addEventListener('click', toggleMenu);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && fabButton.classList.contains('is-active')) {
                    toggleMenu();
                }
            });

            // --- Gemini API Functionality ---
            const getIdeaButton = document.getElementById('get-idea-button');
            const ideaResultContainer = document.getElementById('idea-result-container');
            const ideaResult = document.getElementById('idea-result');
            const loadingIndicator = document.getElementById('loading-indicator');

            const getCreativeIdea = async () => {
                loadingIndicator.classList.remove('hidden');
                ideaResultContainer.classList.add('hidden');
                getIdeaButton.disabled = true;

                const prompt = "Suggest a single, creative and fun new feature for a simple personal webpage. The feature should be interactive. Describe it in 1-2 sentences.";
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
                const apiKey = ""; // API key is handled by the environment
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) {
                        throw new Error(`API call failed with status: ${response.status}`);
                    }

                    const result = await response.json();
                    
                    let text = "Sorry, I couldn't come up with an idea right now. Please try again.";
                    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                        text = result.candidates[0].content.parts[0].text;
                    }

                    ideaResult.textContent = text;
                    ideaResultContainer.classList.remove('hidden');

                } catch (error) {
                    console.error("Gemini API call error:", error);
                    ideaResult.textContent = "An error occurred while fetching the idea. Please check the console and try again.";
                    ideaResultContainer.classList.remove('hidden');
                } finally {
                    loadingIndicator.classList.add('hidden');
                    getIdeaButton.disabled = false;
                }
            };

            getIdeaButton.addEventListener('click', getCreativeIdea);
        });