const signInUI = document.getElementById("sign-in");
const signUpUI = document.getElementById("sign-up");

const firstToggle = document.getElementById("first-toggle");
const secondToggle = document.getElementById("second-toggle");
const siBtn = document.getElementById("si-btn");
const suBtn = document.getElementById("su-btn");

const formEl = document.querySelector('.form');

let token = localStorage.getItem('token');

const createAccount = async (e) => {
    // changed post method
    e.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    console.log(data)

    if (data.password !== data.cPassword) {
        console.log("PASSWORD DOESN'T MATCH!!! will add more functionality later");
        return
    }

    const res = await fetch("/auth/register",
        {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });
    accountData = await res.json()

    if (accountData.token) {
        token = accountData.token
        localStorage.setItem('token', token)

        suBtn.innerText = 'Loading...'
    }
}

const toggleSignUp = () => {
    signInUI.style.display = "none";
    signInUI.style.visibility = "hidden";

    signUpUI.style.display = "block";
    signUpUI.style.visibility = "visible";
};

const toggleSignIn = () => {
    signUpUI.style.display = "none";
    signUpUI.style.visibility = "hidden";

    signInUI.style.display = "block";
    signInUI.style.visibility = "visible";
}

firstToggle.addEventListener("click", toggleSignUp);
secondToggle.addEventListener("click", toggleSignIn);
formEl.addEventListener("submit", createAccount);

// i should convert my sign in and sign up divs with a form element to take data from. this is probably the standard. also i have to look if i need to stringify or parse my data before or after the post method
// i need to read up on how to use git to avoid future meltdowns like today, my local-top-20 branch is fried atm