// ES6 Classes
class Student {
  constructor(id, name, age, course) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor(id, name, subject) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}


// Fetch with Promises (.then)

function fetchDataWithThen() {
  fetch("data/students.json")
    .then(response => response.json())
    .then(data => {
      console.log("Using Promises (.then):", data);
    })
    .catch(err => console.error(err));
}


// Fetch with Async/Await

async function fetchDataAsync() {
  try {
    const response = await fetch("data/students.json");
    const data = await response.json();
    console.log("Using Async/Await:", data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// Display Data

async function displayData() {
  const response = await fetch("data/students.json");
  const data = await response.json();

  const { students, courses, instructors } = data;
  const outputDiv = document.getElementById("output");

  let html = "";

  // Students Section
  html += `<details open>
            <summary>Students</summary>
            <ul>`;
  students.forEach(s => {
    let highlightClass = s.age > 21 ? "highlight" : "";
    html += `<li class="${highlightClass}">${s.name} (${s.age}) - ${s.course}</li>`;
  });
  html += `</ul></details>`;

  // Courses Section
  html += `<details>
            <summary>Courses</summary>
            <ul>`;
  courses.forEach(c => {
    html += `<li>${c.title}: ${c.description}</li>`;
  });
  html += `</ul></details>`;

  // Instructors Section
  html += `<details>
            <summary>Instructors</summary>
            <ul>`;
  instructors.forEach(i => {
    html += `<li>${i.name} - ${i.subject}</li>`;
  });
  html += `</ul></details>`;

  // Relationships Section
  html += `<details>
            <summary>Data Relationships</summary>`;

  // Students → Courses
  html += "<h3>Students and their Courses:</h3><ul>";
  students.forEach(s => {
    const course = courses.find(c => c.title === s.course);
    html += `<li>${s.name} → ${course.title} → ${course.description}</li>`;
  });
  html += "</ul>";

  // Courses → Instructors
  html += "<h3>Courses and their Instructors:</h3><ul>";
  courses.forEach(c => {
    const instructor = instructors.find(i =>
      i.subject.toLowerCase().includes(c.title.toLowerCase())
    );
    if (instructor) {
      html += `<li>${c.title} → Taught by ${instructor.name}</li>`;
    }
  });
  html += "</ul></details>";

  outputDiv.innerHTML = html;
}


// Run
fetchDataWithThen();
fetchDataAsync();
displayData();


