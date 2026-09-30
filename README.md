# ContentCraft AI

An AI-powered content generator with prompt optimisation and a reusable prompt library.
Built as my individual Week 2 project (Content Generation & AI Productivity) at Capaciti.

## What it does

1. **Plant your idea.** Describe what you want to create (blog post, email, code, social post and more), then choose a category, tone and length.
2. **Review the prompt.** The AI rewrites your request into a clear, structured prompt. You can compare it with your original and edit it before anything is generated (human review step).
3. **Generate.** The improved prompt is sent to an AI model, which writes the content.
4. **Refine.** Ask the AI to change the result ("make it shorter"), edit it by hand, or copy it.
5. **Reuse.** Save good prompts to the prompt library. It comes with starter prompts for Career, Marketing, Education, Technical and Sustainability.

## Extra features

- A plant in the header that grows as you move through the steps
- Light and dark mode switch (remembers your choice)
- Works on phones and desktops
- Lightweight: one file, no images, no web fonts
- A counter of AI requests made in the session

## How to run it

**On the live site (Vercel)**
The site has its own server function (`api/generate.js`). The owner adds a Gemini key once in Vercel as an environment variable named `GEMINI_API_KEY`, and visitors can use the app straight away. Visitors can also paste their own key in the **Settings** tab if they prefer.

**On your own computer**
1. Download or clone this project.
2. Open `index.html` in your browser.
3. Go to the **Settings** tab and paste a Google Gemini API key (free from Google AI Studio at aistudio.google.com/apikey).
4. Go to the **Create** tab and start.

A key pasted in Settings is stored only in your own browser. Never share a key, and never type it into a file you upload to GitHub.

## Project structure

```
index.html                                        the app (HTML, CSS and JavaScript)
api/generate.js                                   server function that calls Gemini using the key stored in Vercel
documentation/prompt-engineering-case-study.md    how I improved my prompts
prompts/                                          saved prompt examples
screenshots/                                      screenshots of the app
```

## Prompt engineering

The app demonstrates prompt optimisation by showing the original request next to the AI-improved prompt.
My before-and-after results are written up in `documentation/prompt-engineering-case-study.md`.

## Technologies

HTML, CSS, JavaScript, Vercel serverless function, Google Gemini API

## Screenshots

Add screenshots to the `screenshots/` folder and link them here.
