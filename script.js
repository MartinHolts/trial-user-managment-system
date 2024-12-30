document.addEventListener("DOMContentLoaded", init);

function init() {
	const searchElement = document.querySelector("#search");
	if (searchElement) {
		searchElement.addEventListener("input", (event) => {
			search(event.target.value);
		});
	}

	const userList = document.getElementById("user-list");
	getUsersAndDisplay(userList);

	const editForm = document.getElementById("edit-user-form");
	const overlay = document.getElementById("overlay-for-edit-user-form");
	if (userList) {
		userList.addEventListener("click", (event) => {
			if (event.target.matches("[edit-button-id]")) {
				const userId = event.target.getAttribute("edit-button-id");
				showAndFillEditForm(overlay, editForm, userId);
			} else if (event.target.matches("[delete-button-id]")) {
				const userId = event.target.getAttribute("delete-button-id");
				deleteUser(userId);
			}
		});
	}

	editForm.addEventListener("submit", function (event) {
		event.preventDefault();
		saveEditForm();
	});

	const cancelEditForm = document.getElementById("cancel-edit");
	if (cancelEditForm) {
		cancelEditForm.addEventListener("click", function () {
			hideAndEmptyEditForm(editForm, overlay);
		});
	}

	const addUserForm = document.querySelector("#add-user-form");
	if (addUserForm) {
		addUserForm.addEventListener("input", (event) => {
			event.preventDefault();
			addUser(addUserForm);
		});
	}
}

async function search(searchValue) {
	try {
		const users = await api().getUsers();
		const filteredUsers = users.filter((user) =>
			user.username.toLowerCase().includes(searchValue.toLowerCase())
		);

		displayUsers(filteredUsers);
	} catch (error) {
		console.error("Error fetching users:", error);
	}
}

async function getUsersAndDisplay(userList) {
	try {
		const users = await api().getUsers();
		displayUsers(userList, users);
	} catch (error) {
		console.error("Error fetching users:", error);
	}
}

function displayUsers(userList, users) {
	userList.innerHTML = "";

	users.forEach((user) => {
		const li = document.createElement("li");
		li.innerHTML = `
		<h2>${user.name}</h2>
		<p><strong>Username:</strong> ${user.username}</p>
		<p><strong>Email:</strong> ${user.email}</p>
		<p><strong>Phone:</strong> ${user.phone}</p>
		<p><strong>Website:</strong> ${user.website}</p>
		<div id="user-list-buttons-container">
			<button edit-button-id="${user.id}">Edit</button>
			<button delete-button-id="${user.id}">Delete</button>
		</div>
		`;
		userList.appendChild(li);
	});
}

async function showAndFillEditForm(overlay, editForm, userId) {
	try {
		response = await api().getUserById(userId);
		console.log(response.data);

		overlay.style.display = "block";
		editForm.style.display = "block";

		editForm.querySelectorAll("input").forEach(function (inputElement) {
			if (user[inputElement.name]) {
				inputElement.value = user[inputElement.name];
			}
		});

		editForm.setAttribute("data-id", user.id);
	} catch (error) {
		console.error("Error opening and loading edit user data:", error);
	}
}

async function saveEditForm() {
	try {
		const userInfo = {
			name: editName.value,
			username: editUsername.value,
			email: editEmail.value,
			phone: editPhone.value,
			website: editWebsite.value,
		};
		const userId = editForm.getAttribute("data-id");
		response = await api().updateUser(userId, userInfo);

		getUsersAndDisplay();
		hideAndEmptyEditForm();

	} catch (error) {
		console.error("Error saving edit form:", error);
	}
}

function hideAndEmptyEditForm(editForm, overlay) {
	editForm.reset();

	editForm.removeAttribute("data-id");

	editForm.style.display = "none";
	overlay.style.display = "none";
}

async function deleteUser(userId) {
	try {
		response = await api().deleteUser(userId);
		console.log(response.data);

		getUsersAndDisplay();
	} catch (error) {
		console.error("Error deleting user from database:", error);
	}
}

async function addUser(addUserForm) {
	const newUser = {};
	addUserForm.querySelectorAll("input").forEach(function (inputElement) {
		newUser[inputElement.name] = inputElement.value;
	});

	try {
		response = await api().addUser(newUser);
		console.log(response.data);

		addUserForm.reset();
		getUsersAndDisplay();
	} catch (error) {
		console.error("Error adding user to database:", error);
	}
}

function api() {
	return {
		getUsers: () => fetch("http://localhost:3000/users").then((res) => res.json()),
		addUser: (userInfo) => axios.post("http://localhost:3000/users", userInfo),
		deleteUser: (userId) => axios.delete(`http://localhost:3000/users/${userId}`),
		updateUser: (userId, userInfo) => axios.put(`http://localhost:3000/users/${userId}`, userInfo),
		getUserById: (userId) => fetch(`http://localhost:3000/users/${userId}`).then((res) => res.json()),
	};
}