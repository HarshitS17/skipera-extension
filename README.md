# Skipera — AI-Powered Coursera Automation Extension

Skipera is a Chrome extension that explores the use of **LLM-powered browser automation for Coursera courses**.

It integrates directly with the user's active Coursera session and uses configurable LLM providers to analyze course content, interact with course activities, and automate repetitive course workflows.

> **⚠️ Educational / Experimental Project**
>
> Skipera is an experimental automation project intended for research and learning around browser automation, LLM orchestration, API integration, and Chrome Extension development.
>
> Automated completion of graded coursework may conflict with course rules or academic-integrity policies. Users are responsible for complying with the terms and policies of the platforms and courses they use it with.

## Features

- **Course Automation** — Processes course materials and navigates through course activities.
- **AI Quiz Analysis** — Uses LLMs to analyze quiz questions and generate answers.
- **Multiple LLM Providers** — Supports NVIDIA, OpenAI, Anthropic, and Gemini.
- **API Key Stacking** — Supports multiple API keys with retry and fallback handling.
- **Course Context** — Uses relevant course readings and available lecture transcripts as context for LLM requests.
- **Retry & Recovery** — Handles API rate limits, temporary provider failures, and model fallback.
- **Background Orchestration** — Runs long-running automation through a Manifest V3 service worker.
- **Progress Tracking** — Displays automation progress through the extension UI.
- **Zero Backend Requirement** — The extension communicates directly with supported APIs from the browser.

## Architecture

```text
┌───────────────────────────────┐
│        Coursera Website       │
│                               │
│  Course • Videos • Readings   │
│  Quizzes • Assignments        │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Chrome Extension        │
│          Manifest V3          │
├───────────────────────────────┤
│                               │
│  Content Script               │
│       │                       │
│       ▼                       │
│  Background Service Worker    │
│       │                       │
│       ├── Course API Layer    │
│       ├── Quiz Solver         │
│       ├── Orchestrator        │
│       ├── Agent Logic         │
│       └── Dashboard Store     │
│                               │
└───────────────┬───────────────┘
                │
                ▼
       ┌─────────────────┐
       │   LLM Providers │
       ├─────────────────┤
       │ NVIDIA           │
       │ OpenAI           │
       │ Anthropic        │
       │ Gemini           │
       └─────────────────┘
```

## Tech Stack

### Browser Extension

- Chrome Extension Manifest V3
- JavaScript
- Chrome Extensions APIs
- Service Workers
- Content Scripts
- Chrome Storage API

### AI

- NVIDIA NIM
- OpenAI API
- Anthropic API
- Google Gemini API

### Course Integration

- Coursera APIs
- Coursera GraphQL endpoints
- Browser session authentication
- CSRF token handling

## How It Works

### 1. Course Discovery

Skipera reads the current Coursera course and retrieves information about available modules, lessons, and course items.

### 2. Content Processing

Relevant course material such as readings and available lecture transcripts can be collected and used as context for subsequent AI requests.

### 3. AI Processing

The extension sends structured questions and contextual information to the selected LLM provider.

The response is parsed into a structured format containing the generated answer and associated question information.

### 4. Automation

The background service worker coordinates the workflow and interacts with the Coursera course APIs to process supported course activities.

### 5. Progress Tracking

The extension maintains course-processing state and reports progress through the extension interface.

## Installation

Skipera currently runs as an **unpacked Chrome extension**.

### 1. Clone the repository

```bash
git clone https://github.com/HarshitS17/skipera-extension.git
cd skipera-extension
```

### 2. Open Chrome Extensions

Navigate to:

```text
chrome://extensions/
```

Enable **Developer mode**.

### 3. Load the extension

Click **Load unpacked** and select the repository's extension directory containing `manifest.json`.

### 4. Configure an LLM provider

Open the Skipera extension and configure a supported provider and API key.

## Configuration

Skipera supports multiple LLM providers:

| Provider | API |
|---|---|
| NVIDIA | NVIDIA NIM |
| OpenAI | OpenAI API |
| Anthropic | Anthropic API |
| Gemini | Google Gemini API |

API keys are stored using Chrome's local extension storage.

**Never commit API keys, credentials, session tokens, or other secrets to the repository.**

## Project Structure

```text
skipera-extension/
│
├── background/
│   ├── agents.js
│   ├── background.js
│   ├── courseraApi.js
│   ├── dashboardStore.js
│   ├── llmProviders.js
│   ├── queries.js
│   ├── quizSolver.js
│   └── solverOrchestrator.js
│
├── content/
│   ├── content.css
│   └── content.js
│
├── popup/
│   ├── index.html
│   ├── popup.css
│   └── popup.js
│
├── popup-react/
│   └── ...
│
└── manifest.json
```

## Security & Privacy Considerations

Skipera operates inside the user's browser and relies on the user's active Coursera session.

The extension requires permissions that allow it to interact with Coursera pages and access relevant browser data required for its functionality.

Users should:

- Review the extension permissions before installing it.
- Use API keys that they are comfortable storing locally.
- Avoid using shared or public computers with personal API credentials.
- Never commit API keys or authentication tokens.
- Review the code before loading the extension as an unpacked extension.

## Limitations

Skipera depends heavily on Coursera's current website structure and internal APIs. Changes to Coursera can therefore break parts of the extension.

LLM responses are also probabilistic and may contain incorrect answers.

API availability, rate limits, model availability, and provider-specific restrictions may affect execution.

## Why I Built It

The primary purpose of this project was to explore how **LLMs, browser extensions, API integrations, and autonomous workflows** can work together inside a real web application.

The project provided hands-on experience with:

- Browser automation
- Chrome Extension architecture
- Background service workers
- API orchestration
- LLM provider abstraction
- Structured LLM responses
- Retry and fallback strategies
- Course-content extraction
- Stateful automation workflows

## Disclaimer

This project is provided for **educational and experimental purposes**.

Using automation to complete graded assessments, assignments, or other coursework may violate the rules of a particular course or educational institution.

The user is solely responsible for how the software is used and for complying with applicable platform terms, course policies, and academic-integrity requirements.

## Status

**Experimental / Personal Project**

The project is not affiliated with or endorsed by Coursera or any of the LLM providers supported by the extension.
