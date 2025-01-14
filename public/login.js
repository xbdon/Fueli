const signInUI = document.getElementById("sign-in");
const signUpUI = document.getElementById("sign-up");
const firstToggle = document.getElementById("first-toggle");
const secondToggle = document.getElementById("second-toggle");
const siBtn = document.getElementById("si-btn");
const suBtn = document.getElementById("su-btn");

const caInputs = document.getElementsByClassName("ca-input");

const createAccount = async () => {
    // changed post method
    console.log(caInputs);
    const values = Array.from(caInputs)
        .map(input => input.value);
    console.log(`these are the createAccount inputs: ${values}`);
    if (values == '') {
        console.log("error: values variable undefined")
        return;
    }

    const apiCall = `/api/create-user/post/?key1=${values[0]}&key2=${values[1]}&key3=${values[2]}&key4=${values[3]}`;
    const res = await fetch("/api/create-user/post/",
        {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(values)
        })

    // try {
    //     const values = Array.from(caInputs)
    //         .map(input => input.value);
    //     const accData = fetch(`/api/create-user/post/?accData=${values}`)
    // } catch {
    // }
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
suBtn.addEventListener("click", createAccount);

// i should convert my sign in and sign up divs with a form element to take data from. this is probably the standard. also i have to look if i need to stringify or parse my data before or after the post method
// i need to read up on how to use git to avoid future meltdowns like today, my local-top-20 branch is fried atm