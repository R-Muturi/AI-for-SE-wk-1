// --- Step 1: Data Structure ---

const courseData = [
    {
        id: 1,
        title: "HTML Fundamentals",
        description: "Learn the essential structure and elements of the web's backbone.",
        lessons: [
            "Introduction to HTML",
            "Tags and Attributes",
            "Creating Lists and Links",
            "Forms and Input Elements"
        ],
        completed: false
    },
    {
        id: 2,
        title: "CSS Styling and Layouts",
        description: "Master Cascading Style Sheets to make your web pages beautiful and responsive.",
        lessons: [
            "CSS Selectors and Properties",
            "Box Model Deep Dive",
            "Flexbox and Grid Layouts",
            "Responsive Design Basics"
        ],
        completed: false
    },
    {
        id: 3,
        title: "JavaScript Interaction Basics",
        description: "Introduce interactivity to your pages with core JavaScript concepts and DOM manipulation.",
        lessons: [
            "Variables and Data Types",
            "Functions and Scope",
            "DOM Manipulation",
            "Event Handling"
        ],
        completed: false
    }
];

// Function to initialize data from localStorage
function getCourses() {
    const localData = localStorage.getItem('vibeLearnCourses');
    if (localData) {
        // Merge the stored 'completed' status into the main data structure
        const storedCourses = JSON.parse(localData);
        return courseData.map(course => {
            const stored = storedCourses.find(c => c.id === course.id);
            return stored ? { ...course, completed: stored.completed } : course;
        });
    }
    return courseData;
}

// Global variable to hold the current state
let courses = getCourses();


// --- Step 3: Initial Rendering (Course List) ---

const courseListElement = document.getElementById('course-list');
const courseListSection = document.getElementById('course-list-section');
const courseDetailView = document.getElementById('course-detail-view');

// Renders the main course list
function renderCourseList() {
    courseListElement.innerHTML = ''; // Clear previous content
    courses.forEach(course => {
        const card = document.createElement('li');
        card.className = 'course-card';
        card.setAttribute('data-course-id', course.id);

        const statusClass = course.completed ? 'completed' : 'in-progress';
        const statusText = course.completed ? 'Completed' : 'In Progress';

        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description.substring(0, 70)}...</p>
            <span class="status-badge ${statusClass}">${statusText}</span>
        `;
        
        // --- Step 4: Interactivity (Click to view details) ---
        card.addEventListener('click', () => showCourseDetail(course.id));
        courseListElement.appendChild(card);
    });
}


// --- Step 4: Interactivity and State Management ---

// Shows the detailed view of a course
function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Hide the list and show the detail view
    courseListSection.style.display = 'none';
    courseDetailView.style.display = 'block';

    // Populate the details
    document.getElementById('detail-title').textContent = course.title;
    document.getElementById('detail-description').textContent = course.description;
    document.getElementById('mark-complete-btn').setAttribute('data-course-id', course.id);

    // Populate lessons
    const lessonsList = document.getElementById('detail-lessons');
    lessonsList.innerHTML = course.lessons.map(lesson => `<li>${lesson}</li>`).join('');

    // Update completion button and progress text
    updateDetailViewStatus(course);
}

// Updates the completion status display in the detail view
function updateDetailViewStatus(course) {
    const completeBtn = document.getElementById('mark-complete-btn');
    const progressText = document.getElementById('detail-progress');

    if (course.completed) {
        completeBtn.textContent = "Course Completed 🎉";
        completeBtn.disabled = true;
        completeBtn.className = 'btn btn-success';
        progressText.textContent = "Status: 100% Completed!";
    } else {
        completeBtn.textContent = "Mark as Completed";
        completeBtn.disabled = false;
        completeBtn.className = 'btn btn-success';
        progressText.textContent = "Status: In Progress";
    }
}

// Handles the 'Mark as Completed' button click
function markCourseAsCompleted(event) {
    const courseId = parseInt(event.target.getAttribute('data-course-id'));
    const courseIndex = courses.findIndex(c => c.id === courseId);

    if (courseIndex !== -1 && !courses[courseIndex].completed) {
        courses[courseIndex].completed = true;
        
        // Save the updated state to localStorage
        localStorage.setItem('vibeLearnCourses', JSON.stringify(courses.map(c => ({ id: c.id, completed: c.completed }))));

        // Re-render both the list and the detail view
        renderCourseList();
        updateDetailViewStatus(courses[courseIndex]);

        alert(`${courses[courseIndex].title} has been marked as completed!`);
    }
}

// Handles the 'Go Back' button click
function goBackToCourses() {
    courseListSection.style.display = 'block';
    courseDetailView.style.display = 'none';
}


// --- Event Listeners and Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial render of the course list
    renderCourseList(); 
    
    // 2. Attach listeners to the detail view buttons
    document.getElementById('mark-complete-btn').addEventListener('click', markCourseAsCompleted);
    document.getElementById('go-back-btn').addEventListener('click', goBackToCourses);
});