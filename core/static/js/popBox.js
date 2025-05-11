function popBox(message, onConfirm){
    const popup = document.getElementById("confirmPopup");
    const msg = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const cancelBtn = document.getElementById("confirmCancel");

    msg.textContent = message;
    popup.classList.remove("hidden");

    // Clean previous event listeners
    const newYesBtn = yesBtn.cloneNode(true);
    yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);

    newYesBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        onConfirm(); // perform the action
    });

    cancelBtn.onclick = () => popup.classList.add("hidden");}