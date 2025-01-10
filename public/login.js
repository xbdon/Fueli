const signIn = document.getElementById("sign-in");
const signUp = document.getElementById("sign-up");
const signUpBtn = document.getElementById("toggle");





const toggleLogin = () => {
    signIn.style.display =
        signIn.style.display = "none";
    signIn.style.visibility = "hidden";

    signUp.style.display =
        signUp.style.display === "block";
    signUp.style.visibility =
        signUp.style.visibility === "visible";

};

signUpBtn.addEventListener("click", toggleLogin);