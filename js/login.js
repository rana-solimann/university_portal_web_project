function handleLogin() {

    // 1- Get what the user typed in the form
    var typedId       = document.getElementById("username").value;
    var typedPassword = document.getElementById("password").value;

    // 2- Hide the error message (in case it was showing before)
    var errorMsg = document.getElementById("error-msg");
    errorMsg.style.display = "none";

    // 3- Make sure the user didn't leave the fields empty
    if (typedId === "" || typedPassword === "") {
        errorMsg.textContent = "Please fill in both fields.";
        errorMsg.style.display = "block";
        return;
    }

    // 4- Search through the students list (from students.js)
    // to find a student whose ID and password match
    var foundStudent = null;

    for (var i = 0; i < students.length; i++) {
        if (students[i].id === typedId && students[i].password === typedPassword) {
            foundStudent = students[i];
            break; // stop searching once we find a match
        }
    }

    // 5- If we found a match → log them in
    if (foundStudent !== null) {
        // Save the student's ID so other pages know who is logged in
        sessionStorage.setItem("loggedInId", foundStudent.id);

        // Go to the dashboard
        window.location.href = "dashboard.html";

    } else {
        // 6- If no match → show error
        errorMsg.textContent = "Wrong ID or password. Please try again.";
        errorMsg.style.display = "block";

        // Clear the password field so they can try again
        document.getElementById("password").value = "";
    }
}