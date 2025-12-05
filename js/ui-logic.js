// ui-logic.js

// Function to copy text to clipboard and show feedback
export function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const originalText = buttonElement.innerText;
        buttonElement.innerText = "Copied! ✅";
        buttonElement.classList.add("bg-green-600");
        buttonElement.classList.remove("bg-blue-600");

        // Reset after 2 seconds
        setTimeout(() => {
            buttonElement.innerText = originalText;
            buttonElement.classList.remove("bg-green-600");
            buttonElement.classList.add("bg-blue-600");
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Function to update the "Complete" button visual state
export function setButtonCompletedState(btnElement) {
    btnElement.disabled = true;
    btnElement.innerText = "Completed ✅";
    btnElement.classList.remove("bg-green-500", "hover:bg-green-600");
    btnElement.classList.add("bg-gray-600", "cursor-not-allowed");
}