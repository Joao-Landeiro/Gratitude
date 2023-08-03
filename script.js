//Common behaviours 

//DOM loader event listener. should encompass all the code
document.addEventListener("DOMContentLoaded", function () {

// Function to ensure that Local Storage is Ready
    function isLocalStorageReady() {
        const storedGratitudeNotes = localStorage.getItem("gratitudeNotes");
        return !!storedGratitudeNotes; // Return true if data is present, false if not
    }
    


//FUNCTIONS RELATED TO OVERAL USABILITY


//FUNCTIONS RELATED TO OVERAL USABILITY - KEYBOARD ACTIONS

// Event listener for Esc key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        ClosePopupWriteNote();
        ClosePopupAbout();
        CloseReadRandomNote();
        closePopupNoteList();
        
    }
});
//FUNCTIONS RELATED TO OVERAL USABILITY - SOUNDS

function playCancel() {
    var audio = document.getElementById("Sound-cancel");
    audio.play();
}

function playClose() {
    var audio = document.getElementById("Sound-close");
    audio.play();
}

function playSaved() {
    var audio = document.getElementById("Sound-save");
    audio.play();
}

function playDelete() {
    var audio = document.getElementById("Sound-delete");
    audio.play();
}

function playOpen() {
    var audio = document.getElementById("Sound-open");
    audio.play();
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
 


//FUNCTIONS RELATED TO HOME SCREEN - COUNTING NOTES
//Function to Update Counter on page load
updateCounter();

// Function to update the counter on the page
function updateCounter() {
    const totalGratitudeNotes = countGratitudeNotes();
    const counterElement = document.getElementById("homepageNoteCounter");
    counterElement.textContent = totalGratitudeNotes;
}
    // Function to count all gratitude notes (to be later used on the page counter)
    function countGratitudeNotes() {
        const storedGratitudeNotes = localStorage.getItem("gratitudeNotes");
        if (storedGratitudeNotes) {
            const gratitudeNotes = JSON.parse(storedGratitudeNotes);
            return gratitudeNotes.length;
        } else {
            return 0; // If there are no gratitude notes, return 0
        }
    }

//FUNCTIONS RELATED TO HOME SCREEN - TOGGLING BUTTONS

// Function to show or hide the "Shake the jar" button based on the presence of notes
function toggleButtonShakeJar() {
    const gratitudeNotes = getAllGratitudeNotes();
    const shakeJarBtn = document.getElementById("shakeJarBtn");
    if (gratitudeNotes.length > 0) {
        shakeJarBtn.style.display = "block"; // Show the button if there are notes
    } else {
        shakeJarBtn.style.display = "none"; // Hide the button if there are no notes
    }
}
// RUN THE FUNCTION THAT DECIDES IF SHAKE JAR BUTTON IS VISIBLE OR NOT
toggleButtonShakeJar();

// Function to show or hide the "See all notes" button based on the presence of notes
function toggleShowAllNotesButton() {
    const gratitudeNotes = getAllGratitudeNotes();
    const showAllNotesButton = document.getElementById("showNoteListPopupBtn");
    if (gratitudeNotes.length > 0) {
        showAllNotesButton.style.display = "block"; // Show the button if there are notes
    } else {
        showAllNotesButton.style.display = "none"; // Hide the button if there are no notes
    }
}
// RUN THE FUNCTION THAT DECIDES IF SHOW ALL NOTES BUTTON IS VISIBLE OR NOT
toggleShowAllNotesButton();


/*    _ __   ___  _ __  _   _ _ __  ___ 
    | '_ \ / _ \| '_ \| | | | '_ \/ __|
    | |_) | (_) | |_) | |_| | |_) \__ \
    | .__/ \___/| .__/ \__,_| .__/|___/
    | |         | |         | |        
    |_|         |_|         |_|        
*/

//FUNCTIONS RELATED TO ADD NEW NOTE POPUP - OPEN and CLOSE FUNCTIONS

// Event listener for the 'Add Gratitude Note' button
document.getElementById("addNoteBtn").addEventListener("click", function () {
    ShowPopupWriteNote();
});
    //Function that makes the Add New Note Popup, visible
    function ShowPopupWriteNote() {
        const popupContainer = document.getElementById("PopupWriteNote");
        popupContainer.style.display = "block";
        playOpen();
        console.log("ShowPopupWriteNote function called");
    }
// Event listener for the 'Close' button inside of the New Note popup
document.getElementById("closePopupInputBtn").addEventListener("click", function () {
    ClosePopupWriteNote();
});
    //Funtion that makes the Add New Note Popup, invisible
    function ClosePopupWriteNote() {
        const popupContainer = document.getElementById("PopupWriteNote");
        popupContainer.style.display = "none";
        resetPlaceholderValue();
        playClose();
        console.log("ClosePopupWriteNote function called");

    }

//FUNCTIONS RELATED TO ADD NEW NOTE POPUP - SAVE NOTE FUNCTIONS

// Event listener for the 'Save' button in the "Add Gratitude Note" popup
document.getElementById("saveNoteBtn").addEventListener("click", function () {
    saveGratitudeNote();
});

// Function that gets the note input and passes it on to be saved in local storage
function saveGratitudeNote() {
    const noteInput = document.getElementById("noteInput");
    const note = noteInput.value;

    if (note) {
        ClosePopupWriteNote();
        saveGratitudeNoteToLocalStorage(note);
        updateCounter();
        playSaved();
    }
}

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
    toggleButtonShakeJar(); // Checks if the Shake Jar button should be on or off
    toggleShowAllNotesButton(); // Checks if the Show All Notes button should be on or off
    resetPlaceholderValue();
}

//FUNCTIONS RELATED TO ADD NEW NOTE POPUP - UX FUNCTIONS


//Clear textarea when in focus
    // Focus event listener to know when the textarea is in focus
    const noteInput = document.getElementById("noteInput");
    noteInput.addEventListener("focus", clearDefaultValue);

    //Function to clear the default value of the textarea
    function clearDefaultValue() {
        const textarea = document.getElementById("noteInput");
        if (textarea.value === "Your default text here...") {
            textarea.value = "";
        }
    }
    // Function to reset the placeholder text in the textarea
    function resetPlaceholderValue() {
        const textarea = document.getElementById("noteInput");
        textarea.value = "Your default text here...";
    }


//FUNCTIONS RELATED TO ABOUT POPUP

//FUNCTIONS RELATED TO ABOUT POPUP - OPEN and CLOSE FUNCTIONS
// Event listener for the 'About' button
document.getElementById("aboutBtn").addEventListener("click", function () {
    ShowPopupAbout();
});
    //Function that makes the About Popup, visible
    function ShowPopupAbout() {
        const popupContainer = document.getElementById("PopupAbout");
        popupContainer.style.display = "block";
        playOpen();
        console.log("ShowPopupAbout function called");
    }
// Event listener for the 'Close' button inside of the About popup
document.getElementById("closePopupAboutBtn").addEventListener("click", function () {
    ClosePopupAbout();

});
    //Funtion that makes the About Popup, invisible
    function ClosePopupAbout() {
        const popupContainer = document.getElementById("PopupAbout");
        popupContainer.style.display = "none";
        playClose();
        console.log("ClosePopupAbout function called");
    }

//FUNCTIONS RELATED TO SEE RANDOM NOTE POPUP - OPEN and CLOSE FUNCTIONS

// Event listener for the 'Shake Jar' button
document.getElementById("shakeJarBtn").addEventListener("click", function () {
    ShowPopupReadRandomNote();
    openRandomNotePopup(); // Call the function that opens the popup with a random note applied to it
});
    //Function that makes the Read Random Note Popup, visible
    function ShowPopupReadRandomNote() {
        const popupContainer = document.getElementById("PopupShowNote");
        popupContainer.style.display = "block";
        playOpen();
        console.log("ShowPopupReadRandomNote function called");
    }
// Event listener for the 'Close' button inside of the Random popup
document.getElementById("closePopupDisplayBtn").addEventListener("click", function () {
    CloseReadRandomNote();
});
    //Funtion that makes the Read Random Note Popup, invisible
    function CloseReadRandomNote() {
        const popupContainer = document.getElementById("PopupShowNote");
        popupContainer.style.display = "none";
        playClose();
        console.log("CloseReadRandomNote function called");
    }

//FUNCTIONS RELATED TO SEE RANDOM NOTE POPUP - DISPLAY A RANDOM NOTE

// Function to retrieve all gratitude notes from local storage and pick one at random
function getRandomGratitudeNote() {
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

    // Function to open the popup with a random note
    function openRandomNotePopup() {
        const popupContainer = document.getElementById("PopupShowNote");
        const noteContent = document.getElementById("randomNoteContent");

        const randomNote = getRandomGratitudeNote();
        if (randomNote) {
            noteContent.textContent = randomNote.content;
            popupContainer.style.display = "block";
        } else {
            // Handle the case when there are no notes to display
            console.log("No gratitude notes available.");
        }
    }

//FUNCTIONS RELATED TO SEE RANDOM NOTE POPUP - DELETE A DISPLAYED NOTE

//MAKE THE DELETE CONFIRMATION POPUP VISIBLE

  // Event listener for the 'Delete Note' button in the "Random Gratitude Note" display popup
  document.getElementById("deleteNoteBtn").addEventListener("click", function () {
    // Show the confirmation popup
    const PopupConfirmDelete = document.getElementById("PopupConfirmDelete");
    PopupConfirmDelete.style.display = "block";
    playOpen();
});

// Event listener for the 'Cancel' button in the confirmation popup
document.getElementById("cancelDeleteBtn").addEventListener("click", function () {
    // Close the confirmation popup without deleting the note
    const PopupConfirmDelete = document.getElementById("PopupConfirmDelete");
    PopupConfirmDelete.style.display = "none";
    playCancel();
});
// RUN THE NOTE DELETE FUNCTION
// Event listener for the 'Confirm' button in the confirmation popup
document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
    // Delete the note and close the display popup
    deleteGratitudeNote();
    const PopupConfirmDelete = document.getElementById("PopupConfirmDelete");
    playDelete();
    PopupConfirmDelete.style.display = "none";
});

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
            CloseReadRandomNote();
            }
            updateCounter(); // Update the counter after deleting the note
            toggleButtonShakeJar(); // Checks if the Shake Jar button should be on or off
            toggleShowAllNotesButton(); // Checks if the Show All Notes button should be on or off

        }
    }

// FUNCTIONS RELATED TO SEE ALL NOTES POPUP - OPEN AND CLOSE FUNCTIONS

// Event Listener for the button that shows all notes
document.getElementById("showNoteListPopupBtn").addEventListener("click", function () {
    if (isLocalStorageReady()) {
        showPopupNoteList();
    } else {
        console.log("Local storage data is not yet ready. Please try again.");
    }
});

// Function to show the "PopupNoteList" popup
function showPopupNoteList() {
    const popupContainer = document.getElementById("PopupNoteList");
    popupContainer.style.display = "block";
    playOpen();
    console.log("showPopupNoteList function called");
}

// Event listener for the 'Close' button in the "Random Gratitude Note" display popup
document.getElementById("BtnClosePopupNoteList").addEventListener("click", function () {
    closePopupNoteList();
});

// Function to make the "Notes List" popup, invisible
function closePopupNoteList() {
    const popupContainer = document.getElementById("PopupNoteList");
    popupContainer.style.display = "none";
    playClose();
    console.log("closePopupNoteList function called");
}

// FUNCTIONS RELATED TO SEE ALL NOTES POPUP - DISPLAY LIST OF NOTES

// Function to display all gratitude notes in a list format
function displayGratitudeNotesList() {
    const gratitudeNotes = getAllGratitudeNotes();
    const listContainer = document.getElementById("NoteList");

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
            });
            listContainer.appendChild(listItem);
        });
    }
}

// Call the function to display the updated list of gratitude notes
displayGratitudeNotesList();

/*this must be the end of the code that stays within the DOM loader event listener, never change this */
})