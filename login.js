function signin(event) {
    event.preventDefault();
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#Password");

    const email = emailInput.value;
    const password = passwordInput.value;
    if (email === '' || password === '') {
        alert("Vui lòng nhập Username và Password");
    } else {
        const storedUser = localStorage.getItem(email);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (password === user.password) {
                alert("Login successful!");
                window.location.href = "home.html";
            } else {
                alert("Incorrect password!");
            }
        } else {
            alert("Account does not exist. Please register!");
        }
    }
}

const inputUsernameRegister = document.querySelector("#Email");
const inputPasswordRegister = document.querySelector("#Password");
function signup(event) {
    event.preventDefault();
    const email = inputUsernameRegister.value;
    const password = inputPasswordRegister.value;

    if (email === '' || password === '') {
        alert("Please enter Username and Password");
    } else {
        if (localStorage.getItem(email)) {
            alert("Account already exists!");
        } else {
            const user = {
                email: email,
                password: password
            };
            localStorage.setItem(email, JSON.stringify(user));
            alert("Registration successful!");
            window.location.href = "login.html";
        }
    }
}