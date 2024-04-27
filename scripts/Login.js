// must contain @ and .com in the end
var emailPattern = /^[\w-\.]+@([a-zA-Z]+)(.com)$/
// at least one digit , one lowercase char , one uppercase char , one special character and length greater than 7 
var passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/

var emailTxt = document.getElementById("email");
var passwordTxt = document.getElementById("password");
var passBtn = document.getElementById("passwordBtn")
var eyeIconForPass1 = document.getElementById("eye1")
var eyeIconForPass2 = document.getElementById("eye-slash1")

passBtn.addEventListener("click", function () {
    if (passwordTxt.type == "password") {
        passwordTxt.type = "text"
        eyeIconForPass2.style.display = "block"
        eyeIconForPass1.style.display = "none"
    }
    else {
        passwordTxt.type = "password"
        eyeIconForPass2.style.display = "none"
        eyeIconForPass1.style.display = "block"
    }
})


function Login(eve) {
    eve.preventDefault()
    if (emailTxt.value !== "" && passwordTxt.value !== "") {
        if (localStorage.getItem("email") === emailTxt.value && localStorage.getItem("password") === passwordTxt.value) {
            Swal.fire({
                title: "Successfully",
                text: `Welcome ${localStorage.getItem("fullName")}`,
                icon: "success",
                timer: 1500
            });
            // go to dashboard page
            setTimeout(function(){open("../pages/index.html","_self")},2000)
        }
        else {
            Swal.fire({
                title: "Oops...",
                text: "Invalid Account!",
                icon: "error"
            });
        }
    }
    else {
        checkIsEmpty(emailTxt)
        checkIsEmpty(passwordTxt)
    }
}

function WhenFocusOnInput(t) {
    checkIsEmpty(emailTxt)
    checkIsEmpty(passwordTxt)
}
function checkIsEmpty(input) {
    if (input.value === "") {
        document.getElementById(`${input.id}Msg`).style = "display:block";
        input.style = "border-bottom:1px solid red"
    }
    else {
        document.getElementById(`${input.id}Msg`).style = "display:none"
        input.style = "border-bottom:1px solid rgb(102, 101, 101);"
    }
}