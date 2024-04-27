 // at least 3 character and not contain any digit or special character
 var namePattern = /^[a-zA-Z]{3,}$/
 // must contain @ and .com in the end
 var emailPattern = /^[\w-\.]+@([a-zA-Z]+)(.com)$/
 // at least one digit , one lowercase char , one uppercase char , one special character and length greater than 7 
 var passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/

var firstNameTxt = document.getElementById("firstName");
var lastNameTxt = document.getElementById("lastName");
var emailTxt = document.getElementById("email");
var passwordTxt = document.getElementById("password");
var conPasswordTxt = document.getElementById("confirmPassword");
var passBtn = document.getElementById("passwordBtn")
var conPassBtn = document.getElementById("confirmPasswordBtn")
var eyeIconForPass1 = document.getElementById("eye1")
var eyeIconForPass2 = document.getElementById("eye-slash1")
var eyeIconForConPass1 = document.getElementById("eye2")
var eyeIconForConPass2 = document.getElementById("eye-slash2")

passBtn.addEventListener("click",function(){
    if(passwordTxt.type=="password")
    {
    passwordTxt.type="text"
    eyeIconForPass2.style.display="block"
    eyeIconForPass1.style.display="none"
    }
    else
    {
    passwordTxt.type="password"
    eyeIconForPass2.style.display="none"
    eyeIconForPass1.style.display="block"
    }
})
conPassBtn.addEventListener("click",function(){
    if(conPasswordTxt.type=="password")
    {
        conPasswordTxt.type="text"
        eyeIconForConPass2.style.display="block"
    eyeIconForConPass1.style.display="none"
    }
    else
    {
        conPasswordTxt.type="password"
        eyeIconForConPass2.style.display="none"
    eyeIconForConPass1.style.display="block"
    }
})

function checkConfirmPassword(pass,conPass)
{
    return pass===conPass
}
function checkValidateInput(input,pattern)
{
    return pattern.test(input)
}
function InputNotValid(input)
{
    input.style="border-bottom:1px solid red"
    document.getElementById(`${input.id}Msg`).style="display:block"
  // input.focus()
}
function InputValid(input)
{
    document.getElementById(`${input.id}Msg`).style="display:none"
    input.style="border-bottom:1px solid rgb(102, 101, 101);"
}
function Register(eve)
{
    eve.preventDefault()
    CheckValidation(firstNameTxt)
    CheckValidation(lastNameTxt)
    CheckValidation(emailTxt)
    CheckValidation(passwordTxt)
    CheckValidation(conPasswordTxt)
    if(checkValidateInput(firstNameTxt.value,namePattern)&&
       checkValidateInput(lastNameTxt.value,namePattern)&&
       checkValidateInput(emailTxt.value,emailPattern)&&
       checkValidateInput(passwordTxt.value,passwordPattern)&&
       checkConfirmPassword(passwordTxt.value,conPasswordTxt.value)
      )
      {
    localStorage.setItem("fullName",firstNameTxt.value+" "+lastNameTxt.value)
    localStorage.setItem("email",emailTxt.value)
    localStorage.setItem("password",passwordTxt.value)
    Swal.fire({
        title: "Successfully",
        text: "Account is created!",
        icon: "success",
        timer: 1500
      });
      setTimeout(function(){
      open("./Login.html","_self")
      }
      ,2000)
}
}

function assignPattern(t)
{
    if(t.id=="firstName"||t.id=="lastName")
    {
        return namePattern
    }
    else if(t.id=="password")
   { 
        return passwordPattern
   }
    else if(t.id=="email")
   {
         return emailPattern
   }
}
function CheckValidation(t)
{
    pattern = assignPattern(t)
    if(t.value==="")
    {
        document.getElementById(`${t.id}Msg`).style="display:none";
        document.getElementById(`${t.id}Msg2`).style="display:block";
        t.style="border-bottom:1px solid red"
    }
    else
    {
        if(t.id=="confirmPassword")
        {
            if(!checkConfirmPassword(passwordTxt.value,conPasswordTxt.value))
                {
                    document.getElementById(`${t.id}Msg2`).style="display:none";
                    t.style="border-bottom:1px solid rgb(102, 101, 101);"
                    InputNotValid(conPasswordTxt)
                }
            else
                {
                    InputValid(conPasswordTxt)
                }
        }
        else
        {
            document.getElementById(`${t.id}Msg2`).style="display:none";
            t.style="border-bottom:1px solid rgb(102, 101, 101);"

            if(!checkValidateInput(t.value,pattern))
            {
                    InputNotValid(t)
            }
            else
            {
                InputValid(t)   
            }
        }
    }
}