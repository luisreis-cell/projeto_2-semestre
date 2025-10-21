let users = [];

const userForm = document.getElementById('userForm');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userId = document.getElementById('userId');
const userList = document.getElementById('userList');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = userName.value;
  const email = userEmail.value;
  const id = userId.value;

  if (id === '') {
    users.push({ name, email });
  } else {
    users[id] = { name, email };
  }

  userForm.reset();
  userId.value = '';
  renderUsers();
});

function renderUsers() {
  userList.innerHTML = '';
  users.forEach((user, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${user.name} (${user.email})
      <span>
        <button onclick="editUser(${index})">Editar</button>
        <button onclick="deleteUser(${index})">Excluir</button>
      </span>`;
    userList.appendChild(li);
  });
}

function editUser(index) {
  const user = users[index];
  userName.value = user.name;
  userEmail.value = user.email;
  userId.value = index;
}

function deleteUser(index) {
  users.splice(index, 1);
  renderUsers();
}

renderUsers();
