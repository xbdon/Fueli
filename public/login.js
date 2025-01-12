const signIn = document.getElementById("sign-in");
const signUp = document.getElementById("sign-up");
const signUpBtn = document.getElementById("first-toggle");
const signInBtn = document.getElementById("second-toggle");

const caInputs = document.querySelectorAll("ca-input");


// add new post method api after
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