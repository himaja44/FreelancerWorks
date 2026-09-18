const registerForm =
    document.getElementById("registerForm");


registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

     //need to get values form

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;
        const phone_number =
            document.getElementById("phone").value.trim();


        const role =
            document.getElementById("role").value;

        const terms =
            document.getElementById("terms").checked;


       //error elements

        const nameError =
            document.getElementById("nameError");

        const emailError =
            document.getElementById("emailError");

        const passwordError =
            document.getElementById("passwordError");

        const confirmPasswordError =
            document.getElementById("confirmPasswordError");
        
        const phone_numberError =
            document.getElementById("phoneError");
       

        const roleError =
            document.getElementById("roleError");

        const termsError =
            document.getElementById("termsError");



        nameError.textContent = "";

        emailError.textContent = "";

        passwordError.textContent = "";

        confirmPasswordError.textContent = "";

        phone_numberError.textContent = "";



        roleError.textContent = "";

        termsError.textContent = "";


        let isValid = true;


        // name validation

        if (name === "") {

            nameError.textContent =
                "Please enter your name.";

            isValid = false;

        }


        // email validation

        if (email === "") {

            emailError.textContent =
                "Please enter your email.";

            isValid = false;

        }


        // password validation

        if (password.length < 6 ) {

            passwordError.textContent =
                "Password must contain at least 6 characters";

            isValid = false;

        }


        

        if (password !== confirmPassword) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            isValid = false;

        }


        // role vaidation

        if (role === "") {

            roleError.textContent =
                "Please select your role.";

            isValid = false;

        }


        //terms validation

        if (!terms) {

            termsError.textContent =
                "Please accept the terms and conditions.";

            isValid = false;

        }


        

        if (isValid) {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/users/register",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            name: name,

                            email: email,

                            password: password,
                            
                            phone: phone_number,


                            role: role

                        })

                    }
                );


                

                const data =
                    await response.json();


                //reponse is success

                if (response.ok) {

                    showToast(data.message,"success");

                    registerForm.reset();

                    setTimeout(function () {
    window.location.href = "login.html";
}, 1500);

                }


                // backend error

                else {

                    showToast(data.message,"error");

                }

            }


            //server error

            catch (error) {

                console.
                log(
                    "Error:",
                    error
                );

                showToast(
                    "Unable to connect to the server. Please make sure the backend is running."
                );

            }

        }

    }
);