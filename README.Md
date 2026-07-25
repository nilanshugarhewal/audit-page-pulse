# Audit Page Pulse

Audit Page Pulse is a simple web application that analyzes a webpage and displays a few basic SEO and accessibility metrics.

Users can enter a URL, and the application fetches the page, parses the HTML, and generates a small report.

## Live Demo

Frontend: https://audit-page-pulse.vercel.app

Backend API: https://audit-page-pulse-server.onrender.com

## Features

- Analyze any public webpage
- Page title detection
- Meta description check
- H1 tag count
- Images missing `alt` text
- Estimated word count
- Clean and responsive interface

## Tech Stack

### Frontend

- React
- Vite
- Axios
- CSS

### Backend

- Node.js
- Express.js
- Cheerio

---

## Project Setup

### Clone the repository

```bash
git clone <repository-url>
cd Task_A
```

### Install dependencies

Frontend

```bash
cd client
yarn
```

Backend

```bash
cd server
yarn
```

### Run the application

Backend

```bash
yarn dev
```

Frontend

```bash
yarn dev
```

---

## API Contract

### Endpoint

```
POST /api/audit
```

### Request Body

```json
{
  "url": "https://example.com"
}
```

### Successful Response

```json
{
  "title": "Example Domain",
  "metaDescription": "...",
  "h1Count": 1,
  "imagesMissingAlt": 0,
  "wordCount": 120
}
```

### Error Response

```json
{
  "message": "Unable to audit the provided URL."
}
```

---

## Design Decisions

### 1. HTML parsing is handled on the backend

Keeping the parsing logic on the server prevents browser CORS issues and keeps the frontend focused on displaying results.

### 2. Cheerio was used for parsing HTML

Cheerio provides a simple way to query HTML using CSS selectors while being lightweight and well suited for server-side applications.

### 3. Separate frontend and backend

The frontend is responsible for collecting user input and displaying results, while the backend handles fetching and parsing HTML. This separation keeps responsibilities clear and makes the project easier to maintain and extend.

---

## Testing

The HTML parsing logic is tested using Jest and includes:

- Happy path with valid HTML
- Empty HTML input
- Missing SEO elements
- Images without `alt` attributes

---

## AI Usage

AI tools were used to assist with different parts of this project:

- **Qwen** was used as a coding assistant while working with **Cheerio** for the first time. It also helped with parts of the error handling and creating the initial parsing tests.
- **ChatGPT** was used to help write and improve the project documentation, review code, explain concepts, and prepare the project walkthrough.
- **Kombai** was used to help design and generate parts of the frontend UI, which I then customized and integrated into the project.

All generated code and suggestions were reviewed, tested, and modified where necessary. The final implementation, debugging, deployment, and technical decisions were completed and verified by me.

---

## Notes

This project was built as part of the **Digital Heroes Software Development Training Task**.

---

**Built for Digital Heroes Training Task** by **Nilanshu Garhewal**
