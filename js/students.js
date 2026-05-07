var students = [
    {
        id: "2310001",
        password: "rana123",
        name: "Rana Soliman",
        department: "Computer Science",
        level: "Level 3",
        dob: "15 March 2005",
        gender: "Female",
        email: "rana.soliman@uniportal.edu",
        phone: "+20 100 111 2222"
    },
    {
        id: "2310002",
        password: "nour123",
        name: "Nour Tamer",
        department: "Information Security",
        level: "Level 3",
        dob: "22 July 2005",
        gender: "Female",
        email: "nour.tamer@uniportal.edu",
        phone: "+20 100 333 4444"
    },
    {
        id: "2310003",
        password: "samy123",
        name: "Samy Khaled",
        department: "Computer Science",
        level: "Level 3",
        dob: "10 January 2002",
        gender: "Male",
        email: "samy.khaled@uniportal.edu", /* Fixed: was "Samy Khaled@uniportal.edu" (had a space) */
        phone: "+20 100 555 6666"
    }
];


/* -------------------------------------------------------------
   getLoggedInStudent()
   Reads sessionStorage for a saved student ID and returns the
   matching student object, or null if nobody is logged in.
   Used by all protected pages to know who is viewing them.
   ------------------------------------------------------------- */
function getLoggedInStudent() {
    var savedId = sessionStorage.getItem("loggedInId");

    /* No ID in storage → no one is logged in */
    if (savedId === null) {
        return null;
    }

    /* Find and return the student whose id matches the stored value */
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === savedId) {
            return students[i];
        }
    }

    /* ID was stored but doesn't match any student (edge case) */
    return null;
}


/* -------------------------------------------------------------
   requireLogin()
   Guards protected pages.
   - If no student is logged in, redirects to login.html and
     returns null so the calling function can exit early.
   - If a student is logged in, returns their student object.
   Note: always called at the top of each page-load function.
   ------------------------------------------------------------- */
function requireLogin() {
    var student = getLoggedInStudent();
    if (student === null) {
        /* Send the visitor to the login page */
        window.location.href = "login.html";
        return null;
    }
    return student;
}


/* -------------------------------------------------------------
   loadDashboard()
   Runs on student/dashboard.html.
   - Guards the page with requireLogin()
   - Fills in the personalised welcome message with the
     student's name using the element id "welcome-msg"
   ------------------------------------------------------------- */
function loadDashboard() {
    var student = requireLogin();
    if (student === null) {
        return; /* requireLogin() already redirected — nothing more to do */
    }

    var welcomeMsg = document.getElementById("welcome-msg");
    if (welcomeMsg !== null) {
        welcomeMsg.textContent = "Welcome back, " + student.name + "!";
    }
}


/* -------------------------------------------------------------
   loadProfile()
   Runs on student/profile.html.
   - Guards the page with requireLogin()
   - Fills every labelled element on the profile page with the
     logged-in student's data (name, ID, DOB, department, etc.)
   - Uses the student's first initial for the avatar circle
   ------------------------------------------------------------- */
function loadProfile() {
    var student = requireLogin();
    if (student === null) {
        return;
    }

    /* First letter of the name → shown inside the avatar circle */
    var firstLetter = student.name.charAt(0);

    /* Populate profile header */
    document.getElementById("profile-avatar").textContent = firstLetter;
    document.getElementById("profile-name").textContent   = student.name;
    document.getElementById("profile-dept").textContent   = "Department of " + student.department;

    /* Populate personal & academic info rows */
    document.getElementById("pi-name").textContent   = student.name;
    document.getElementById("pi-id").textContent     = student.id;
    document.getElementById("pi-dob").textContent    = student.dob;
    document.getElementById("pi-gender").textContent = student.gender;
    document.getElementById("pi-dept").textContent   = student.department;
    document.getElementById("pi-level").textContent  = student.level;

    /* Populate contact info rows */
    document.getElementById("pi-email").textContent  = student.email;
    document.getElementById("pi-phone").textContent  = student.phone;
}


/* -------------------------------------------------------------
   loadGrades()
   Runs on student/grades.html.
   - Only guards the page; the grade data is static HTML.
   - A future version could dynamically build the table from
     each student's data object.
   ------------------------------------------------------------- */
function loadGrades() {
    if (requireLogin() === null) {
        return; /* Not logged in → redirected by requireLogin() */
    }
    /* Grade content is currently static in the HTML.
       Add dynamic grade rendering here when data is available. */
}


/* -------------------------------------------------------------
   logout()
   Clears the student session and redirects to the login page.
   Called by the Logout button's onclick on dashboard, profile,
   and grades pages.
   ------------------------------------------------------------- */
function logout() {
    sessionStorage.removeItem("loggedInId");
    window.location.href = "login.html";
}


/* -------------------------------------------------------------
   AUTO-DETECT PAGE AND RUN THE RIGHT FUNCTION
   Checks the current page's filename and calls the appropriate
   load function automatically — no manual call needed in HTML.
   ------------------------------------------------------------- */
var currentPage = window.location.pathname;

if (currentPage.includes("dashboard.html")) {
    loadDashboard();
}

if (currentPage.includes("profile.html")) {
    loadProfile();
}

if (currentPage.includes("grades.html")) {
    loadGrades();
}