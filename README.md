# VibeLearn E-Learning Platform Prototype 🚀

This repository contains a simple, functional prototype for a mini e-learning platform. The objective was to apply core front-end concepts (HTML, CSS, JavaScript) learned during the VibeCoding session and practice AI-assisted development.

## 🎯 Project Goals

* **View Courses:** Display a list of at least three courses.
* **View Details:** Allow learners to click on a course to view its description and lessons.
* **Track Progress:** Enable users to mark a course as "completed."
* **Persistence:** Use the browser's `localStorage` to save the completion status across sessions, simulating a simple backend data store.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Structure and content organization. |
| **CSS3 (Embedded)** | Simple, clean styling and layout (including hover effects). |
| **Vanilla JavaScript** | Data management, DOM manipulation, event handling, and state persistence via `localStorage`. |

---

## 🚀 How to Run the Prototype

This project is a purely client-side application and does not require a web server.

1.  **Clone or Download:** Get the files (`index.html` and `script.js`).
2.  **Locate Files:** Ensure both `index.html` and `script.js` are in the **same folder**.
3.  **Open:** Double-click the `index.html` file. It will automatically open in your default web browser.

### Features

* The **Home Page** displays a card view of all available courses, with badges indicating if they are **"In Progress"** or **"Completed"**.
* Clicking any course card transitions to the **Course Detail View**.
* The detail view includes lessons, the full description, a **"Mark as Completed"** button, and a **"Back to Courses"** button.
* Once a course is marked complete, the status is saved, and the button is disabled. If you refresh the browser, the completed status will persist.

---

## 📂 Project Structure
