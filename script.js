

//Common behaviours
//_________________

// Function to close a popup and perform common actions
function closePopup(popupId) {
    const popupContainer = document.getElementById(popupId);
    popupContainer.style.display = "none"; // Hide the popup
    
    // Reset the textarea value to the default placeholder text
    const noteInput = document.getElementById("noteInput");
    noteInput.value = "Your default text here...";
    
    // Update the list of gratitude notes
    updateGratitudeNoteList();
    
    // Toggle appropriate buttons
    toggleShowAllNotesButton();
    toggleRandomNoteButton();
    
    // Optionally, you can add more actions here as needed
    
    // Play button click sound (if applicable)
    playButtonClickSound();
}


// Function to close the "Random Gratitude Note" display popup
function closePopup(displayNotePopup) {    
}





// Event listener for the 'Close' button in the "Add Gratitude Note" popup
document.getElementById("closePopupInputBtn").addEventListener("click", function () {
    closeAddGratitudeNotePopup();
});

// Event listener for the 'Close' button in the "Random Gratitude Note" display popup
document.getElementById("closePopupDisplayBtn").addEventListener("click", function () {
    closePopupDisplay();
});














// Function to count all gratitude notes
function countGratitudeNotes() {
    const storedGratitudeNotes = localStorage.getItem("gratitudeNotes");
    if (storedGratitudeNotes) {
        const gratitudeNotes = JSON.parse(storedGratitudeNotes);
        return gratitudeNotes.length;
    } else {
        return 0; // If there are no gratitude notes, return 0
    }
}

// Call the function to toggle the "See all notes" button when the page loads
document.addEventListener("DOMContentLoaded", function () {
    toggleShowAllNotesButton();
});


// Function to show or hide the "See all notes" button based on the presence of notes
function toggleShowAllNotesButton() {
    const gratitudeNotes = getAllGratitudeNotes();
    const showAllNotesButton = document.getElementById("showListPopup");
    if (gratitudeNotes.length > 0) {
        showAllNotesButton.style.display = "block"; // Show the button if there are notes
    } else {
        showAllNotesButton.style.display = "none"; // Hide the button if there are no notes
    }
}

// Function to delete the currently displayed gratitude note
function deleteGratitudeNote() {
    const storedGratitudeNotes = localStorage.getItem("gratitudeNotes");
    if (storedGratitudeNotes) {
        let gratitudeNotes = JSON.parse(storedGratitudeNotes);
        if (gratitudeNotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * gratitudeNotes.length);
            gratitudeNotes.splice(randomIndex, 1); // Remove the note at the random index
            localStorage.setItem("gratitudeNotes", JSON.stringify(gratitudeNotes));
            // Display a new random note or close the popup if no notes left
            if (gratitudeNotes.length > 0) {
                const newRandomIndex = Math.floor(Math.random() * gratitudeNotes.length);
                const newRandomNote = gratitudeNotes[newRandomIndex];
                displayGratitudeNotePopup(newRandomNote);
            } else {
                closePopupDisplay();
            }
            updateCounter(); // Update the counter after deleting the note
            updateGratitudeNoteList(); // Update the list after deleting a note
            toggleShowAllNotesButton(); // Check visibility of "See all notes" button after deleting a note
        }
    }
}



// Function to update the counter on the page
function updateCounter() {
    const totalGratitudeNotes = countGratitudeNotes();
    const counterElement = document.getElementById("count");
    counterElement.textContent = totalGratitudeNotes;
}

// Function to get all gratitude notes from local storage
function getAllGratitudeNotes() {
    const storedGratitudeNotes = localStorage.getItem("gratitudeNotes");
    if (storedGratitudeNotes) {
        return JSON.parse(storedGratitudeNotes);
    } else {
        return [];
    }
}

// Function to display all gratitude notes in a list format
function displayGratitudeNotesList() {
    const gratitudeNotes = getAllGratitudeNotes();
    const listContainer = document.getElementById("gratitudeNotesList");

    // Clear any previous list items
    listContainer.innerHTML = "";

    if (gratitudeNotes.length === 0) {
        // Display a message if there are no notes
        const noNotesMessage = document.createElement("p");
        noNotesMessage.textContent = "No gratitude notes found.";
        listContainer.appendChild(noNotesMessage);
    } else {
        // Display each note as a list item
        gratitudeNotes.forEach((note, index) => {
            const listItem = document.createElement("div");
            listItem.textContent = note.content;
            listItem.classList.add("gratitude-note-item");
            listItem.setAttribute("data-index", index);
            listItem.setAttribute("data-note", JSON.stringify(note)); // Store the entire note object
            listItem.addEventListener("click", () => {
                displayGratitudeNotePopup(note);
            });
            listContainer.appendChild(listItem);
        });
    }
}

// Call the function to display the updated list of gratitude notes
displayGratitudeNotesList();

// Call the function to update the counter when the page loads
document.addEventListener("DOMContentLoaded", function () {
    updateCounter();
});

// Function to save the gratitude note to local storage with timestamp
function saveGratitudeNoteToLocalStorage(note) {
    const storedGratitudeNotes = localStorage.getItem("gratitudeNotes") || '[]';
    const gratitudeNotes = JSON.parse(storedGratitudeNotes);
    const newNote = {
        content: note,
        createdAt: new Date().toISOString() // Store the current date and time as ISO string
    };
    gratitudeNotes.push(newNote);
    localStorage.setItem("gratitudeNotes", JSON.stringify(gratitudeNotes));
}

// Function to add a new gratitude note
function addGratitudeNote() {
    showAddGratitudeNotePopup();
}

function showAddGratitudeNotePopup() {
    const popupContainer = document.getElementById("addNotePopup");
    popupContainer.style.display = "block";
}

function clearDefaultValue() {
    const textarea = document.getElementById("noteInput");
    if (textarea.value === "Your default text here...") {
        textarea.value = "";
    }
}

function saveGratitudeNote() {
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value;
    const maxCharacters = parseInt(noteInput.getAttribute("maxlength"));

    if (note.length > maxCharacters) {
        alert("Exceeded the character limit for the gratitude note!");
        return;
    }

    if (note) {
        hideAddGratitudeNotePopup();
        saveGratitudeNoteToLocalStorage(note);
        // Reset the textarea value to the default placeholder text
        noteInput.value = "Your default text here...";
        updateGratitudeNoteList();
    }
}

// Function to update the list of gratitude notes
function updateGratitudeNoteList() {
    const gratitudeNotes = getAllGratitudeNotes();
    const gratitudeNotesList = document.getElementById("gratitudeNotesList");

    // Clear existing content
    gratitudeNotesList.innerHTML = "";

    // Add each gratitude note as a list item
    gratitudeNotes.forEach((note, index) => {
        const listItem = document.createElement("div");
        listItem.textContent = note.content;
        listItem.classList.add("gratitude-note-item");
        listItem.setAttribute("data-index", index);
        gratitudeNotesList.appendChild(listItem);
    });
    // Call the function to toggle the "See all notes" button
    toggleShowAllNotesButton();
}

// Function to simulate shaking the jar and retrieve a random gratitude note
function shakeTheJar() {
    const gratitudeNote = getGratitudeNote();
    if (gratitudeNote) {
        displayGratitudeNotePopup(gratitudeNote);
    } else {
        alert("No gratitude notes yet. Add some first!");
    }
}

// Function to get a random gratitude note from the local storage
function getGratitudeNote() {
    const storedGratitudeNotes = localStorage.getItem("gratitudeNotes");
    if (storedGratitudeNotes) {
        const gratitudeNotes = JSON.parse(storedGratitudeNotes);
        if (gratitudeNotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * gratitudeNotes.length);
            return gratitudeNotes[randomIndex];
        }
    }
    return null; // Return null if there are no gratitude notes
}

// Function to display the random gratitude note in a popup
function displayGratitudeNotePopup(gratitudeNote) {
    const popupContainer = document.getElementById("displayNotePopup");
    const noteContent = document.getElementById("randomNoteContent");
    noteContent.textContent = gratitudeNote.content; // Extract the 'content' property
    popupContainer.style.display = "block";
}



// Function to delete the currently displayed gratitude note
function deleteGratitudeNote() {
    const storedGratitudeNotes = localStorage.getItem("gratitudeNotes");
    if (storedGratitudeNotes) {
        let gratitudeNotes = JSON.parse(storedGratitudeNotes);
        if (gratitudeNotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * gratitudeNotes.length);
            gratitudeNotes.splice(randomIndex, 1); // Remove the note at the random index
            localStorage.setItem("gratitudeNotes", JSON.stringify(gratitudeNotes));
            // Display a new random note or close the popup if no notes left
            if (gratitudeNotes.length > 0) {
                const newRandomIndex = Math.floor(Math.random() * gratitudeNotes.length);
                const newRandomNote = gratitudeNotes[newRandomIndex];
                displayGratitudeNotePopup(newRandomNote);
            } else {
                closePopupDisplay();
            }
            updateCounter(); // Update the counter after deleting the note
            updateGratitudeNoteList(); // Update the list after deleting a note
        }
    }
}

// Function to close the "Add Gratitude Note" popup
function closeAddGratitudeNotePopup() {
    hideAddGratitudeNotePopup();
     // Reset the textarea value to the default placeholder text
     noteInput.value = "Your default text here...";
     updateGratitudeNoteList();
    
}

function hideAddGratitudeNotePopup() {
    const popupContainer = document.getElementById("addNotePopup");
    popupContainer.style.display = "none";
}

// Function to play the button click sound
function playButtonClickSound() {
    const buttonClickSound = document.getElementById("buttonClickSound");
    buttonClickSound.play();
}

// Function to show the "about" popup
function showAboutPopup() {
    const popupContainer = document.getElementById("aboutPopup");
    popupContainer.style.display = "block";
    playButtonClickSound();
}

// Function to show the "NoteListPopup" popup
function showNoteListPopup() {
    const popupContainer = document.getElementById("NoteListPopup");
    popupContainer.style.display = "block";
    playButtonClickSound();
}

// Function to close the "Notes List"  popup
function closePopupNoteList() {
    const popupContainer = document.getElementById("NoteListPopup");
    popupContainer.style.display = "none";
}

// Function to close the "about" popup
function closeAboutPopup() {
    const popupContainer = document.getElementById("aboutPopup");
    popupContainer.style.display = "none";
    playButtonClickSound();
}


// Function to show or hide the "Get a Random Note" button based on the presence of notes
function toggleRandomNoteButton() {
    const gratitudeNotes = getAllGratitudeNotes();
    const randomNoteButton = document.getElementById("shakeJarBtn");
    if (gratitudeNotes.length > 0) {
        randomNoteButton.style.display = "block"; // Show the button
    } else {
        randomNoteButton.style.display = "none"; // Hide the button
    }
}

// Call the function to toggle the button state when the page loads
document.addEventListener("DOMContentLoaded", function () {
    toggleRandomNoteButton();
});

// Call the function to toggle the button state after adding or deleting notes
function updateGratitudeNoteList() {
    // Existing code to update the list of gratitude notes
    // ...

    // Call the function to toggle the "Get a Random Note" button
    toggleRandomNoteButton();
}





// Event listener for the 'About' button
document.getElementById("aboutBtn").addEventListener("click", function () {
    showAboutPopup();
});

// Event listener for the 'Close' button in the "about" popup
document.getElementById("closePopupAboutBtn").addEventListener("click", function () {
    closeAboutPopup();
});

// Event listener for the 'input' event on the textarea to track character count
document.getElementById("noteInput").addEventListener("input", function () {
    const noteInput = this;
    const maxCharacters = parseInt(noteInput.getAttribute("maxlength"));
    const currentCharacters = noteInput.value.length;
    // Update the character count
    document.getElementById("characterCount").textContent = `${currentCharacters} / ${maxCharacters}`;
});

document.addEventListener("DOMContentLoaded", function () {
    // Event listener for the 'Add Gratitude Note' button
    document.getElementById("addNoteBtn").addEventListener("click", function () {
        playButtonClickSound();
        addGratitudeNote();
    });

    // Event listener for the 'Save' button in the "Add Gratitude Note" popup
    document.getElementById("saveNoteBtn").addEventListener("click", function () {
        playButtonClickSound();
        saveGratitudeNote();
        // Update the counter after saving the note
        updateGratitudeNoteList(); // Call the update function here
        // Reset the textarea value to the default placeholder text
        noteInput.value = "Your default text here...";
        updateCounter(); // Update the counter after saving the note
        toggleShowAllNotesButton();

    });

 // Event listener for the 'See All notes' button
 document.getElementById("showListPopup").addEventListener("click", function () {
    playButtonClickSound();
    showNoteListPopup();
});
// Event listener for the 'Close' button in the "Random Gratitude Note" display popup
document.getElementById("closePopupNoteListBtn").addEventListener("click", function () {
    playButtonClickSound();
    closePopupNoteList();
});


    // Event listener for the 'Shake the Jar' button
    document.getElementById("shakeJarBtn").addEventListener("click", function () {
        playButtonClickSound();
        shakeTheJar();
    });

    // Event listener for the 'Close' button in the "Random Gratitude Note" display popup
    document.getElementById("closePopupDisplayBtn").addEventListener("click", function () {
        playButtonClickSound();
        closePopupDisplay();
    });

    // Event listener for the 'Close' button in the "Add Gratitude Note" popup
    document.getElementById("closePopupInputBtn").addEventListener("click", function () {
        playButtonClickSound();
        closeAddGratitudeNotePopup();
    });

    // Event listener for the 'Delete Note' button in the "Random Gratitude Note" display popup
    document.getElementById("deleteNoteBtn").addEventListener("click", function () {
        // Show the confirmation popup
        const confirmationPopup = document.getElementById("confirmationPopup");
        confirmationPopup.style.display = "block";
    });

    // Event listener for the 'Confirm' button in the confirmation popup
    document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
        // Delete the note and close the display popup
        deleteGratitudeNote();
        toggleShowAllNotesButton();
        const confirmationPopup = document.getElementById("confirmationPopup");
        confirmationPopup.style.display = "none";
    });

    // Event listener for the 'Cancel' button in the confirmation popup
    document.getElementById("cancelDeleteBtn").addEventListener("click", function () {
        // Close the confirmation popup without deleting the note
        const confirmationPopup = document.getElementById("confirmationPopup");
        confirmationPopup.style.display = "none";
    });
});

// Function to close the "Add Gratitude Note" popup when Esc key is pressed
function closeAddGratitudeNotePopupOnEsc(event) {
    if (event.key === "Escape") {
        closeAddGratitudeNotePopup();
    }
}

// Function to close the "Random Gratitude Note" display popup when Esc key is pressed
function closePopupDisplayOnEsc(event) {
    if (event.key === "Escape") {
        closePopupDisplay();
    }
}

// Function to close the "All Notes"  popup when Esc key is pressed
function closeNoteListPopupOnEsc(event) {
    if (event.key === "Escape") {
        closePopupDisplay();
    }
}

// Add event listeners for "keydown" on the document
document.addEventListener("keydown", closeAddGratitudeNotePopupOnEsc);
document.addEventListener("keydown", closePopupDisplayOnEsc);
document.addEventListener("keydown", closeNoteListPopupOnEsc);
