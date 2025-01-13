const signIn = document.getElementById("sign-in");
const signUp = document.getElementById("sign-up");
const firstToggle = document.getElementById("first-toggle");
const secondToggle = document.getElementById("second-toggle");
const
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

firstToggle.addEventListener("click", toggleSignUp);
secondToggle.addEventListener("click", toggleSignIn);
.addEventListener("click", createAccount);