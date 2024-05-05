const userList = document.getElementById("user-list");
const search = document.getElementById("search");

// Fetch users from API
function getUsers() {
	fetch("http://localhost:3000/users")
		.then((response) => response.json())
		.then((users) => {
			// Display all users on page load
			displayUsers(users);

			// Search for users on input change
			search.addEventListener("input", () => {
				const filteredUsers = users.filter((user) =>
					user.username
						.toLowerCase()
						.includes(search.value.toLowerCase())
				);
				displayUsers(filteredUsers);
			});
		});
}

getUsers();

// Display a list of users
function displayUsers(users) {
	// Clear previous list
	removeEventListeners();
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
		const editButton = document.querySelector(
			`[edit-button-id="${user.id}"]`
		);
		const deleteButton = document.querySelector(
			`[delete-button-id="${user.id}"]`
		);

		editButton.addEventListener("click", function () {
			showAndFillEditForm(user.id);
		});

		deleteButton.addEventListener("click", function () {
			deleteUser(user.id);
		});
	});
}

function removeEventListeners() {
	const editButtons = document.querySelectorAll("[edit-button-id]");
	const deleteButtons = document.querySelectorAll("[delete-button-id]");

	editButtons.forEach((editButton) => {
		editButton.removeEventListener("click", showAndFillEditForm);
	});

	deleteButtons.forEach((deleteButton) => {
		deleteButton.removeEventListener("click", deleteUser);
	});
}

// Add a user
const addUserForm = document.getElementById("add-user-form");

addUserForm.addEventListener("submit", function (event) {
	event.preventDefault();
	addUser();
});

function addUser() {
	const newUser = {
		name: document.getElementById("name").value,
		username: document.getElementById("username").value,
		email: document.getElementById("email").value,
		phone: document.getElementById("phone").value,
		website: document.getElementById("website").value,
	};

	axios
		.post("http://localhost:3000/users", newUser)
		.then(function (response) {
			console.log(response.data);
			getUsers();
			addUserForm.reset();
		})
		.catch(function (error) {
			console.log(error);
		});
}

// Delete a user
function deleteUser(userId) {
	axios
		.delete(`http://localhost:3000/users/${userId}`)
		.then(function (response) {
			console.log(response.data);
			getUsers();
		})
		.catch(function (error) {
			console.log(error);
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
const cancelEditButton = document.getElementById("cancel-edit");

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
	updateUser(userId, updatedUser);
});

cancelEditButton.addEventListener("click", function () {
	hideAndEmptyEditForm();
});

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

function updateUser(userId, updatedUser) {
	axios
		.put(`http://localhost:3000/users/${userId}`, updatedUser)
		.then(function (response) {
			console.log(response.data);
			getUsers();
			hideAndEmptyEditForm();
		})
		.catch(function (error) {
			console.log(error);
		});
}

function hideAndEmptyEditForm() {
	editName.value = "";
	editUsername.value = "";
	editEmail.value = "";
	editPhone.value = "";
	editWebsite.value = "";
	editForm.setAttribute("data-id", "");

	editForm.style.display = "none";
	overlay.style.display = "none";
}
