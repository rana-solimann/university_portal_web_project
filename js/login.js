/* -------------------------------------------------------------
   getDashboardHref()
   Returns the correct relative path to dashboard.html based on
   which page the user is currently on.
   - If we are already inside the /student/ folder → use a local
     relative path "dashboard.html"
   - If we are at the root (index.html) → use "student/dashboard.html"
   ------------------------------------------------------------- */
function getDashboardHref() {
    var path = (window.location.pathname || "").replace(/\\/g, "/").toLowerCase();
    return path.indexOf("/student/") !== -1 ? "dashboard.html" : "student/dashboard.html";
}


/* -------------------------------------------------------------
   handleLogin()
   Called by the Login button's onclick in both login pages.
   Steps:
     1. Read the username (Student ID) and password fields
     2. Show an inline error message if validation fails,
        or fall back to alert() if the error element is missing
     3. Check credentials against the students[] array
     4. On success: save the student ID to sessionStorage and
        redirect to the dashboard
     5. On failure: show an error and clear the password field
   ------------------------------------------------------------- */
function handleLogin() {

    /* --- Read form fields --- */
    var typedId       = document.getElementById("username").value.trim();
    var typedPassword = document.getElementById("password").value;

    /* --- Locate the optional inline error element --- */
    var errorMsg = document.getElementById("error-msg");

    /* Helper: show an error either inline or via alert fallback */
    function showErr(text) {
        if (errorMsg) {
            errorMsg.textContent = text;
            errorMsg.style.display = "block";
        } else {
            alert(text);
        }
    }

    /* Hide any previous error before validating again */
    if (errorMsg) {
        errorMsg.style.display = "none";
    }

    /* --- Basic presence validation --- */
    if (typedId === "" || typedPassword === "") {
        showErr("Please fill in both fields.");
        return; /* Stop here — do not attempt to match credentials */
    }

    /* --- Search the students array for a matching record --- */
    var foundStudent = null;
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === typedId && students[i].password === typedPassword) {
            foundStudent = students[i];
            break; /* Match found — no need to keep looping */
        }
    }

    /* --- Handle the result --- */
    if (foundStudent !== null) {
        /* Save the student's ID so other pages can identify who is logged in */
        sessionStorage.setItem("loggedInId", foundStudent.id);

        /* Redirect to the dashboard (path depends on current page location) */
        window.location.href = getDashboardHref();
    } else {
        /* Wrong credentials — show error and clear the password field */
        showErr("Wrong ID or password. Please try again.");
        document.getElementById("password").value = "";
    }
}