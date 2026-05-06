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
        email: "Samy Khaled@uniportal.edu",
        phone: "+20 100 555 6666"
    }
];


// CHECK IF A STUDENT IS LOGGED IN
// save the student's ID in sessionStorage when they log in

function getLoggedInStudent() {
    var savedId = sessionStorage.getItem("loggedInId");

    // If no ID is saved, nobody is logged in
    if (savedId === null) {
        return null;
    }

    // Search the students array for the one with this ID
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === savedId) {
            return students[i];
        }
    }

    return null;
}


// If the user is not logged in, send them back to login.

function requireLogin() {
    var student = getLoggedInStudent();
    if (student === null) {
        window.location.href = "login.html";
        return null;
    }
    return student;
}


// FILL IN THE STUDENT'S NAME IN THE WELCOME MESSAGE

function loadDashboard() {
    var student = requireLogin();
    if (student === null) {
        return;
    }

    var welcomeMsg = document.getElementById("welcome-msg");
    if (welcomeMsg !== null) {
        welcomeMsg.textContent = "Welcome back, " + student.name + "!";
    }
}


// FILL IN ALL THE STUDENT'S INFO ON THE PROFILE PAGE

function loadProfile() {
    var student = requireLogin();
    if (student === null) {
        return;
    }

    // Get the first letter of the name for the avatar circle
    var firstLetter = student.name.charAt(0);

    // Fill in each element by its ID
    document.getElementById("profile-avatar").textContent = firstLetter;
    document.getElementById("profile-name").textContent   = student.name;
    document.getElementById("profile-dept").textContent   = "Department of " + student.department;

    document.getElementById("pi-name").textContent   = student.name;
    document.getElementById("pi-id").textContent     = student.id;
    document.getElementById("pi-dob").textContent    = student.dob;
    document.getElementById("pi-gender").textContent = student.gender;
    document.getElementById("pi-dept").textContent   = student.department;
    document.getElementById("pi-level").textContent  = student.level;
    document.getElementById("pi-email").textContent  = student.email;
    document.getElementById("pi-phone").textContent  = student.phone;
}


// PROTECT THE GRADES PAGE (no extra data to fill in)

function loadGrades() {
    requireLogin();
}


// LOGOUT - clear the session and go back to login

function logout() {
    sessionStorage.removeItem("loggedInId");
    window.location.href = "login.html";
}


// AUTO-DETECT WHICH PAGE WE ARE ON AND RUN THE RIGHT FUNCTION
// We check the page filename to know what to load

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