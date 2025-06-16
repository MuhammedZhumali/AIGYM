# AI Gym Coach Lite

A simple Node.js + OpenAI-powered fitness planner and AI Q&A web app.

## Features

- **Personalized Fitness Plan:** Enter your age, gender, height, weight, and goal to get a calorie estimate, advice, and a weekly workout plan.
- **Ask AI Coach:** Ask any fitness question and get an instant AI-powered answer (via OpenAI API).
- **Dark Mode:** Toggle between light and dark themes.
- **Local Storage:** Remembers your last generated plan and theme preference.

## Setup

1. **Clone the repository**

   ```
   git clone <your-repo-url>
   cd AIGYM
   ```

2. **Install dependencies**

   ```
   npm install express axios cors
   ```

3. **Set your OpenAI API key**

   - Open `server.js`
   - Replace the value of `API_KEY` with your OpenAI API key:

     ```js
     const API_KEY = "sk-..."; // Replace with your real API key
     ```

4. **Start the server**

   ```
   node server.js
   ```

   The server will run at [http://localhost:3000](http://localhost:3000).

5. **Open the app**

   - Open `main.html` in your browser (double-click or use a local server like Live Server in VS Code).

## File Structure

- `server.js` — Node.js backend, handles OpenAI API requests.
- `main.html` — Main frontend HTML file.
- `script.js` — Frontend logic for plan generation and AI Q&A.
- `style.css` — App styling.

## Notes

- The AI Q&A feature requires a valid OpenAI API key with access to the Chat Completions API.
- For local HTML file access, you may need to use a local server (like Live Server) for full functionality.

## License
^^
