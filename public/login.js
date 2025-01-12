const signIn = document.getElementById("sign-in");
const signUp = document.getElementById("sign-up");
const signUpBtn = document.getElementById("first-toggle");
const signInBtn = document.getElementById("second-toggle");

const caInputs = document.querySelectorAll("ca-input");

// add new post method api after

const createAccount = () => {
    try {
        const values = Array.from(caInputs)
            .map(input => input.value);
        const accData = fetch(`/api/create-user/post/?accData=${values}`)
    } catch {
        console.log("error error error");
    }
}

const toggleSignUp = () => {
    signIn.style.display = "none";
    signIn.style.visibility = "hidden";

    signUp.style.display = "block";
    signUp.style.visibility = "visible";
};

const toggleSignIn = () => {
    signUp.style.display = "none";
    signUp.style.visibility = "hidden";

    signIn.style.display = "block";
    signIn.style.visibility = "visible";
}

signUpBtn.addEventListener("click", toggleSignUp);
signInBtn.addEventListener("click", toggleSignIn);

// i should convert my sign in and sign up divs with a form element to take data from. this is probably the standard. also i have to look if i need to stringify or parse my data before or after the post method