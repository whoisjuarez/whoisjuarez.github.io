const activateSignIn = document.querySelector(".activate-login");
const activateSignUp = document.querySelector(".activate-signup");

//Make notes available in the whole script
let notesData = [];
const btnSignIn = document.getElementById("btn-login");
const containerLogin = document.querySelector(".container-login");
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const header = document.querySelector("header");
const containerNotes = document.querySelector(".container-notes");
const allNotes = document.querySelector(".all-notes");

////////sign in - sign up change////////
activateSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-form').style.display = 'grid';
    activateSignIn.style.display = 'grid';
    activateSignUp.style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
});

activateSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'grid';
    activateSignIn.style.display = 'none';
    activateSignUp.style.display = 'grid';
});
////////sign in - sign up change end////////

/**
* LOGIN
**/
// Check if the user is logged in
const checkLogin = async () => {
    let url = 'assets/app/login_check.php';
    try {
        const response = await fetch(url);
        const confirmation = await response.json();
        console.log(confirmation);

        // Check if the response is an array and has at least one element
        if (Array.isArray(confirmation) && confirmation.length > 0) {
            const verifyStatus = confirmation[0].verify;
            if (verifyStatus === true) {
                console.log('user is logged in');
                containerLogin.style.display = 'none';
                header.style.display = 'grid';
                containerNotes.style.display = 'grid';
                allNotes.style.display = 'grid';
            } else {
                console.log('user is logged out');
                containerLogin.style.display = 'block';
                signupForm.style.display = 'none';
                loginForm.style.display = 'grid';
                header.style.display = 'none';
                containerNotes.style.display = 'none';
                allNotes.style.display = 'none';
            }

            // Regardless of login status, fetch notes
            fetchNotes('assets/app/select.php');
        } else {
            console.log('Invalid response format');
        }
    } catch (error) {
        console.error('Error checking login:', error);
    }
}

checkLogin();

// Login
btnSignIn.addEventListener('click', (e) => login(e));

const login = async (event) => {
    event.preventDefault();
    const loginForm = document.querySelector('#login-form');
    const formData = new FormData(loginForm);
    await loginUser(formData);
}

const loginUser = async (data) => {
    const loginForm = document.querySelector('#login-form');
    let url = 'assets/app/log_in.php';
    const response = await fetch(url, {
        method: "POST",
        body: data
    });

    const confirmation = await response.json();
    console.log(confirmation);

    if (!confirmation.error && confirmation.sessionData.verify === true) {
        checkLogin();
        fetchNotes('assets/app/select.php');
        loginForm.reset();
        // console.log('all good');
    } else {
        const errorMessage = confirmation.error;
        console.log('Error message:', errorMessage);

        // Error message
        const errorMessageDiv = document.getElementById("error-message-in");
        if (errorMessage == "User does not exist") {
            errorMessageDiv.innerHTML = "<p>User doesn't exist</p>";
        }
        else if (errorMessage == "Required data is missing (username or password)") {
            errorMessageDiv.innerHTML = "<p>Required data is missing</p>";
        }
        else {
            errorMessageDiv.innerHTML = "<p>Wrong email or password</p>";
        }

        errorMessageDiv.style.display = 'block';
        setTimeout(function() {
            errorMessageDiv.style.display = 'none';
        }, 5000);
    }
};

// Logout
const btnLogout = document.querySelector('#logout-btn');
btnLogout.addEventListener('click', logout);

async function logout(e) {
    e.preventDefault();
    let url = 'assets/app/log_out.php';
    const response = await fetch(url);
    const confirmation = await response.json();
    console.log(confirmation);

    checkLogin();
    fetchNotes('assets/app/select.php');
    // Clear local storage
    location.reload();
    localStorage.clear();
}

/**
* SIGN UP
**/
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const errorMessageDiv = document.getElementById("error-message-up");
    // Serialize the form data into a FormData object
    const formData = new FormData(signupForm);
    // Get the password and confirm password values from the form
    const password = formData.get('signup-password');
    const confirmPassword = formData.get('password_confirmation');
    // console.log('Password:', password);
    // console.log('confirm', confirmPassword);

    if (password !== confirmPassword) {
        e.preventDefault(); // Prevent the form from submitting
        // Display an error message
        errorMessageDiv.innerHTML = "<p>Passwords don't match</p>";
        errorMessageDiv.style.display = 'block';

        setTimeout(function() {
            errorMessageDiv.style.display = 'none';
        }, 5000);
        return;
    } else if (password.length < 8) {
        e.preventDefault(); // Prevent the form from submitting
        const errorMessageDiv = document.getElementById("error-message-up");
        errorMessageDiv.innerHTML = "<p>Password must be at least 8 characters long</p>";
        errorMessageDiv.style.display = 'block';
        setTimeout(function() {
            errorMessageDiv.style.display = 'none';
        }, 5000);
        return;
    }

    // if passwords match, submit the form data
    const url = 'assets/app/sign_up.php';
    const response = await inserter(formData, url);
    console.log('Response:', response);

    if (response && response.length > 0) {
        const result = response[0];
        console.log('Result:', result);
        if (result.error == 'Username already exists') {
            console.error(result.error);
            const errorMessageDiv = document.getElementById("error-message-up");
            errorMessageDiv.innerHTML = "<p>Username already exists</p>";
            errorMessageDiv.style.display = 'block';
            setTimeout(function() {
                errorMessageDiv.style.display = 'none';
            }, 5000);
        } else if (result.insertedRows > 0) {
            console.log('User successfully inserted:', result);
            signupForm.reset();
            fetchNotes('assets/app/select.php');
        } 
    }
});

/**
* NOTES
*/
const fetchNotes = async (url) => {
    const response = await fetch(url);
    if (response.status === 200) {
        // Store the data in the 'notesData' array
        notesData = await response.json(); 
        // Call the displayData function and pass the 'notesData' array as an argument
        displayData(notesData); 
    } else {
        throw new Error("Unable to fetch notes");
    }
};

const btnAll = document.getElementById("all-notes-btn");
btnAll.addEventListener("click", () => {
    displayData(notesData);
});

// Sort Notes
// Add event listener to the "sort" button
const btnShuffle = document.getElementById("shuffle");
btnShuffle.addEventListener("click", () => {
    // Reverse the order of notesData
    notesData.reverse();
    displayData(notesData);
});

// Color sorting
const colorCategoryFilter = document.getElementById("color-category-filter");

colorCategoryFilter.addEventListener("click", (event) => {
    const colorSpan = event.target;
    if (colorSpan.parentNode === colorCategoryFilter) {
        // get the color from the class name
        const color = colorSpan.className.split('-')[1]; 
        const colorNotes = notesData.filter((note) => note.noteColor === color);
        displayData(colorNotes);
    }
});

// Check note completed
let showChecked = false;
const showCheckedBtn = document.getElementById("show-checked");
showCheckedBtn.addEventListener("click", () => {
    const checkedNotDeleted = notesData.filter((note) => note.isChecked === 1 && note.isDeleted === 0);
    const checkedNotes = notesData.filter((note) => note.isChecked === 1);

    if (checkedNotDeleted.length > 0) {
        displayData(checkedNotes);
    }
});

const inWorkBtn = document.getElementById("inWork");
inWorkBtn.addEventListener("click", () => {
    const checkedNotes = notesData.filter((note) => note.isChecked === 0);
    displayData(checkedNotes);
});

// Show All Notes
// Function to display data
const displayData = (data) => {
    console.log(data);

    // Clear existing content in allNotes
    allNotes.innerHTML = '';

    if (data === null || data.length === 0) {
        const oopsMessage = document.createElement('div');
        oopsMessage.innerHTML = '<p>Oops! No notes available.</p>';
        allNotes.appendChild(oopsMessage);
        return; // Exit the function early
    }

    data.forEach((note) => {
        if (note.isDeleted == 0) {
            let article = document.createElement('article');
            article.classList.add('note-container');
            if (note.noteColor) {
                article.style.backgroundColor = `var(--${note.noteColor})`;
            }
            article.innerHTML = `
                <div class="note-content">
                    <h3 class="note-title">${note.noteSubject}</h3>
                    <div class="note-text">
                        <p>${note.noteText}</p>
                    </div>
                </div>

                <div class="note-menu">
                    <figure class="left">
                        <a>
                            <span class="material-symbols-rounded checked"  data-noteid="${note.noteID}">
                                check_circle
                            </span>
                        </a>
                    </figure>

                    <figure class="left">
                    <a>
                        <span class="material-symbols-rounded edit" data-noteid="${note.noteID}">
                            open_in_full
                        </span>
                    </a>
                    </figure>

                    <figure class="right">
                        <a>
                            <span class="material-symbols-rounded delete" data-noteid="${note.noteID}">
                                delete_forever
                            </span>
                        </a>
                    </figure>
                </div>
            `;

            //Append each article inside the loop
            allNotes.appendChild(article);

            //Check note done and change color
            const checkedBtn = article.querySelector('.checked');
            note.isChecked = note.isChecked == 1 ? 1 : 0;

            if (note.isChecked == 1) {
                article.style.backgroundColor = 'var(--light-gray)';
                checkedBtn.style.color = 'white';
            }

            //Checked note event listener
            checkedBtn.addEventListener('click', (event) => {
                event.preventDefault();
                const noteID = checkedBtn.getAttribute('data-noteid');
                console.log('Clicked on checked button for noteID:', noteID);
                const formData = new FormData();
                formData.append('note_id', noteID);
                let url = 'assets/app/update_checked.php';
                inserter(formData, url);
            });

            //Delete note event listener
            const deleteBtn = article.querySelector('.delete');
            deleteBtn.addEventListener('click', (event) => {
                event.preventDefault();
                const noteID = deleteBtn.getAttribute('data-noteid');
                console.log('Clicked on delete button for noteID:', noteID);
                const formData = new FormData();
                formData.append('note_id', noteID);
                let url = 'assets/app/delete.php';
                inserter(formData, url);
            });

            //Edit note event listener
            const editBtn = article.querySelector('.edit');
            editBtn.addEventListener('click', (event) => {
                event.preventDefault();
                const noteID = editBtn.getAttribute('data-noteid');
                console.log('Clicked on edit button for noteID:', noteID);
                openEditModal(event, note, noteID);
            });
        }
    });
};

/**
 * ADDING NOTE
 */
// Create the dark overlay filter
let filter = document.createElement('div');
filter.className = 'dark-filter';
document.body.appendChild(filter);

// Color Palette Toggle on menu
const colorCategoryMenuBtn = document.querySelector('#color-category-filter-btn');
colorCategoryMenuBtn.addEventListener('click', function () {
    console.log('clicked');
    const colorCategory = document.querySelector('#color-category-filter');
    if (colorCategory.style.display === 'none' || colorCategory.style.display === '') {
        colorCategory.style.display = 'flex';
    } else {
        colorCategory.style.display = 'none';
    }
});

//Insert data
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('div.menu-add #add_note').addEventListener('click', function () {
        // Create the modal
        let modal = document.createElement('article');
        modal.id = 'note-add-opened';
        modal.className = 'note-add-opened note-opened';
        modal.innerHTML = `
        <article class="modal-content note-add-opened-content">

            <a class="close-note-opened close-modal-btn" id="close-note-opened">
                    <span class="material-symbols-rounded">
                        close
                    </span>
            </a>

            <form id="noteForm" class="note-opened-content" method="POST">
                    <input type="text" id="title-create" class="note-title" name="note_subject" placeholder="Title">
                <div class="note-content">
                    <textarea id="text-create" name="note_text" class="note-text" placeholder="Scratch a meow..." maxlength="1200"></textarea>
                    
                    <p id="char-count-add">1200</p>
                </div>

                <div class="note-menu">
                    <div class="left">
                        <span class="material-symbols-rounded">
                            palette
                        </span>

                        <select name="note_color" id="note_color color-category-add">
                            <option class="color-yellow" value="yellow">Yellow</option>
                            <option class="color-purple" value="purple">Purple</option>
                            <option class="color-blue" value="blue">Blue</option>
                            <option class="color-green" value="green">Green</option>
                            <option class="color-red" value="red" >Red</option>
                            <option class="color-pink" value="pink">Pink</option>
                        </select>
                    </div>

                    <div class="right">
                        <a id="submit">
                            <span class="material-symbols-rounded">
                                add_task
                            </span>
                        </a>
                    </div>
                </div>
            </form>
        </article>
        `;

        // Check if a modal already exists
        let existingModal = document.getElementById('note-add-opened');
        if (existingModal) {
            existingModal.remove();
        }

        // Append the modal to the body
        document.body.appendChild(modal);

        // Get the <a> element that closes the modal
        let closeBtn = document.getElementById("close-note-opened");

        // When the user clicks on <a> (x), close the modal
        closeBtn.onclick = function () {
            modal.style.display = "none";
            filter.style.display = "none"; // Hide the overlay filter
            document.body.classList.remove('popup-is-open');
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal || event.target == filter) {
                modal.style.display = "none";
                filter.style.display = "none"; // Hide the overlay filter
                document.body.classList.remove('popup-is-open');
            }
        }

        // Display the modal and the overlay filter
        modal.style.display = "block";
        filter.style.display = "block";
        document.body.classList.add('popup-is-open');

        // Get the submit button
        let submitBtn = modal.querySelector('#submit');

        // Add the event listener for the submit button
        submitBtn.addEventListener('click', getFormData);

        // Counting characters left and Checking to set the initial state of the button
        let textarea = document.getElementById('text-create');
        let title = document.getElementById('title-create');
        let charCountElement = document.getElementById('char-count-add');

        const updateButtonState = () => {
            let remaining = 1200 - textarea.value.length;
            charCountElement.textContent = Math.max(0, remaining);

            if (remaining < 0 || textarea.value.trim() === '' || title.value.trim() === '') {
                submitBtn.classList.add('disabled-button');
            } else {
                submitBtn.classList.remove('disabled-button');
            }
        }
        textarea.addEventListener('input', updateButtonState);
        title.addEventListener('input', updateButtonState);

        updateButtonState();
    });

    const getFormData = (event) => {
        event.preventDefault();
        const insertFormData = new FormData(document.querySelector('#noteForm'));
        let url = 'assets/app/insert.php';
        inserter(insertFormData, url);
        filter.style.display = "none";
    }
});

/**
 * EDITING NOTE
 */
// Open the edit modal with existing note information
const openEditModal = (event, note, noteID) => {
    event.preventDefault();
    let modal = document.createElement('article');
    modal.id = 'note-edit-opened';
    modal.className = 'note-edit-opened note-opened';
    if (!note.noteColor || note.isChecked == 1) {
        modal.style.backgroundColor = 'var(--light-gray)';
    } else {
        modal.style.backgroundColor = `var(--${note.noteColor})`;
    }
    modal.innerHTML = `
        <article class="modal-content note-edit-opened-content">
            <a class="close-note-opened" id="close-note-edit-opened">
                <span class="material-symbols-rounded">
                    close
                </span>
            </a>
            <form id="editNoteForm" class="note-opened-content">
            <input type="hidden" name="noteID" value="${noteID}">
                <input type="text" id="title-edit" class="note-title" name="noteSubject" placeholder="Title" value="${note.noteSubject}">
                <div class="note-content">
                    <textarea id="text-edit" name="noteText" class="note-text" placeholder="Scratch a meow..." maxlength="1200">${note.noteText}</textarea>
                    
                    <p id="char-count-edit"></p>
                </div>
                <div class="note-menu">
                    <div class="left">
                        <span class="material-symbols-rounded">
                            palette
                        </span>

                        <select name="noteColor" id="noteColor">
                            <option class="color-yellow" value="yellow" ${note.noteColor === 'yellow' ? 'selected' : ''}>Yellow</option>
                            <option class="color-purple" value="purple" ${note.noteColor === 'purple' ? 'selected' : ''}>Purple</option>
                            <option class="color-blue" value="blue" ${note.noteColor === 'blue' ? 'selected' : ''}>Blue</option>
                            <option class="color-green" value="green" ${note.noteColor === 'green' ? 'selected' : ''}>Green</option>
                            <option class="color-red" value="red" ${note.noteColor === 'red' ? 'selected' : ''}>Red</option>
                            <option class="color-pink" value="pink" ${note.noteColor === 'pink' ? 'selected' : ''}>Pink</option>
                        </select>
                    </div>
        
                    <div class="right">
                        <button id="update" type="submit">
                            <span class="material-symbols-rounded">
                                published_with_changes
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </article>
    `;

    let existingModal = document.getElementById('note-edit-opened');
    if (existingModal) {
        existingModal.remove();
    }

    document.body.appendChild(modal);

    let closeBtn = document.getElementById("close-note-edit-opened");
    closeBtn.onclick = function () {
        modal.style.display = "none";
        filter.style.display = "none";
        document.body.classList.remove('popup-is-open');
    }

    window.onclick = function (event) {
        if (event.target == modal || event.target == filter) {
            modal.style.display = "none";
            filter.style.display = "none";
            document.body.classList.remove('popup-is-open');
        }
    }

    modal.style.display = "block";
    filter.style.display = "block";
    document.body.classList.add('popup-is-open');

    let updateForm = document.querySelector('#editNoteForm');
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        let formData = new FormData(updateForm);
        // console.log('FormData:', formData);
        let url = 'assets/app/update_note.php';
        await inserter(formData, url);
        filter.style.display = "none";
    });

    let textarea = document.getElementById('text-edit');
    let title = document.getElementById('title-edit');
    let charCountElement = document.getElementById('char-count-edit');
    let updateBtn = document.getElementById('update');

    // Counting characters left and Checking to set the initial state of the button
    const updateButtonState = () => {
        let remaining = 1200 - textarea.value.length;
        charCountElement.textContent = Math.max(0, remaining);

        if (remaining < 0 || textarea.value.trim() === '' || title.value.trim() === '') {
            updateBtn.classList.add('disabled-button');
        } else {
            updateBtn.classList.remove('disabled-button');
        }
    }
    textarea.addEventListener('input', updateButtonState);
    title.addEventListener('input', updateButtonState);

    updateButtonState();

    // Change modal Bg when selecting the color
    const colorSelect = document.querySelector('#noteColor');
    colorSelect.addEventListener('change', function() {
        const selectedColor = this.value;
        switch (selectedColor) {
            case 'purple':
                modal.style.backgroundColor = 'var(--purple)';
                break;
            case 'yellow':
                modal.style.backgroundColor = 'var(--yellow)';
                break;
            case 'blue':
                modal.style.backgroundColor = 'var(--blue)';
                break;
            case 'green':
                modal.style.backgroundColor = 'var(--green)';
                break;
            case 'red':
                modal.style.backgroundColor = 'var(--red)';
                break;
            case 'pink':
                modal.style.backgroundColor = 'var(--pink)';
                break;
            default:
                modal.style.backgroundColor = ''; // Default color
                break;
        }
    });
};

// Inserter function to add and edit notes
const inserter = async (data, url, filter) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });

        if (response.status === 200) {
            const confirmation = await response.json();
            console.log(confirmation);

            // Call function again to refresh the page
            if (confirmation[0].verify === true) {
                checkLogin();
            }
            fetchNotes('assets/app/select.php');

            // Remove the modal and overlay filter
            const modal = document.querySelector('.note-opened');
            if (modal) { // Check if modal exists
                modal.remove();
            }

            document.body.classList.remove('popup-is-open');
            return confirmation;
        } else {
            throw new Error("Unable to add note");
        }
    } catch (error) {
        console.error('Error inserting note:', error);
    }
};