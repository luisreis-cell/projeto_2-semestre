let courses = [];

const courseForm = document.getElementById('courseForm');
const courseName = document.getElementById('courseName');
const courseDescription = document.getElementById('courseDescription');
const courseId = document.getElementById('courseId');
const courseList = document.getElementById('courseList');

courseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = courseName.value;
  const description = courseDescription.value;
  const id = courseId.value;

  if (id === '') {
    courses.push({ name, description });
  } else {
    courses[id] = { name, description };
  }

  courseForm.reset();
  courseId.value = '';
  renderCourses();
});

function renderCourses() {
  courseList.innerHTML = '';
  courses.forEach((course, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${course.name} - ${course.description}
      <span>
        <button onclick="editCourse(${index})">Editar</button>
        <button onclick="deleteCourse(${index})">Excluir</button>
      </span>`;
    courseList.appendChild(li);
  });
}

function editCourse(index) {
  const course = courses[index];
  courseName.value = course.name;
  courseDescription.value = course.description;
  courseId.value = index;
}

function deleteCourse(index) {
  courses.splice(index, 1);
  renderCourses();
}

renderCourses();
