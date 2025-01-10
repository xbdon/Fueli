const signIn = document.getElementById("sign-in");
const signUp = document.getElementById("sign-up");
const signUpBtn = document.getElementById("toggle");




// next add toggle for create account to sign in UI
const toggleLogin = () => {
    signIn.style.display = "none";
    signIn.style.visibility = "hidden";

    signUp.style.display = "block";
    signUp.style.visibility = "visible";

};

signUpBtn.addEventListener("click", toggleLogin);