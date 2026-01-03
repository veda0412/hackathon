function signupValidation() {
    let empId = document.getElementById("empId").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    let valid = true;

    document.querySelectorAll(".error").forEach(e => e.innerText = "");

    if (empId === "") {
        document.getElementById("empError").innerText = "Employee ID required";
        valid = false;
    }

    if (email === "") {
        document.getElementById("emailError").innerText = "Email required";
        valid = false;
    }

    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passPattern.test(password)) {
        document.getElementById("passError").innerText =
            "Password must be 8 chars, include uppercase, lowercase & number";
        valid = false;
    }

    if (role === "") {
        document.getElementById("roleError").innerText = "Select a role";
        valid = false;
    }

    if (valid) {
        alert("Email verification link sent!");
        window.location.href = "signin.html";
    }

    return false;
}

function signinValidation() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let valid = true;

    document.querySelectorAll(".error").forEach(e => e.innerText = "");

    if (email === "") {
        document.getElementById("loginEmailError").innerText = "Email required";
        valid = false;
    }

    if (password === "") {
        document.getElementById("loginPassError").innerText = "Password required";
        valid = false;
    }

    if (valid) {
        window.location.href = "dashboard.html";
    }

    return false;
}
