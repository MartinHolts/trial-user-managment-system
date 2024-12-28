// SEARCH, edit user(save, cancel), DELETE USER, ADD USER. 6

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
	if (userList) {
		userList.addEventListener("click", (event) => {
			if (event.target.matches("[edit-button-id]")) {
				const userId = event.target.getAttribute("edit-button-id");
				showAndFillEditForm(userId);
			} else if (event.target.matches("[delete-button-id]")) {
				const userId = event.target.getAttribute("delete-button-id");
				deleteUser(userId);
			}
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

function api() {
	return {
		getUsers: () => fetch("http://localhost:3000/users").then((res) => res.json()),
		addUser: (user) => axios.post("http://localhost:3000/users", user),
		deleteUser: (id) => axios.delete(`http://localhost:3000/users/${id}`),
		updateUser: (id, user) => axios.put(`http://localhost:3000/users/${id}`, user),
		getUserById: (id) => fetch(`http://localhost:3000/users/${id}`).then((res) => res.json()),
	};
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

async function addUser(addUserForm) {
	const newUser = {};
	addUserForm.querySelectorAll("input").forEach(function (input) {
		newUser[input.id] = input.value;
	});

	try {
		response = await api().addUser(newUser);
		console.log(response.data);

		addUserForm.reset();
		getUsersAndDisplay();
	} catch (error) {
		console.error("Error adding user to database:", error);
	}
} a

async function deleteUser(userId) {
	try {
		response = await api().deleteUser(userId);
		console.log(response.data);

		getUsersAndDisplay();
	} catch (error) {
		console.error("Error deleting user from database:", error);
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

// Edit a user
const overlay = document.getElementById("overlay-for-edit-user-form");
const editForm = document.getElementById("edit-user-form");
const editName = document.getElementById("edit-name");
const editUsername = document.getElementById("edit-username");
const editEmail = document.getElementById("edit-email");
const editPhone = document.getElementById("edit-phone");
const editWebsite = document.getElementById("edit-website");
const cancelEditForm = document.getElementById("cancel-edit");

function showAndFillEditForm(userId) {
	fetch(`http://localhost:3000/users/${userId}`)
		.then((response) => response.json())
		.then((user) => {
			overlay.style.display = "block";
			editForm.style.display = "block";

			editName.value = user.name;
			editUsername.value = user.username;
			editEmail.value = user.email;
			editPhone.value = user.phone;
			editWebsite.value = user.website;
			editForm.setAttribute("data-id", user.id);
		});
}

editForm.addEventListener("submit", function (event) {
	event.preventDefault();
	const updatedUser = {
		name: editName.value,
		username: editUsername.value,
		email: editEmail.value,
		phone: editPhone.value,
		website: editWebsite.value,
	};
	const userId = editForm.getAttribute("data-id");

	axios
		.put(`http://localhost:3000/users/${userId}`, updatedUser)
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});

	// Refresh users list
	api().getUsers();

	editForm.reset();

	// Reset form attributes
	editForm.removeAttribute("data-id");

	// Hide the form and overlay
	editForm.style.display = "none";
	overlay.style.display = "none";
});

// Clear edit form and hide it.
cancelEditForm.addEventListener("click", function () {

	editForm.reset();

	// Reset form attributes
	editForm.removeAttribute("data-id");

	// Hide the form and overlay
	editForm.style.display = "none";
	overlay.style.display = "none";
});