// General Variables
const fragment = document.createDocumentFragment();


/* *********************EVENTS**********************/

document.addEventListener('DOMContentLoaded', () => validateForm());

document.addEventListener('submit', (event) => {
    if (event.target.matches('#formSignUp')) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const role = "user";

        fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/login', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            document.open();
                            document.write(html);
                            document.close();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

document.addEventListener('submit', (event) => {
    if (event.target.matches('#formProfile')) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const old_email = document.querySelector('#formProfile').getAttribute("data");

        fetch('http://localhost:3000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, role: "user", old_email: old_email})
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Profile updated');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    if (event.target.matches('#formLogIn')) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        fetch(`http://localhost:3000/api/user?email=${email}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Found user: ', data);

                fetch('http://localhost:3000/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Login data: ', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

document.addEventListener('click', (event) => {
    if (event.target.matches('#linkLogout')) {
        fetch('http://localhost:3000/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Logout data: ', data);
                // window.location.href = '/login';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function getSignedInUserEmail() {
    const token = getCookie('token');
    console.log('Token:', token); // Debug token
    if (token) {
        const decoded = jwt_decode(token);
        const { email, role } = decoded;
        console.log('Email:', email);
        console.log('Role:', role);
        return email;
    } else {
        console.log('Token not found');
        return null;
    }
}

document.addEventListener('submit', (event) => {
    if (event.target.matches('.editUserButton')) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const role = event.target.role.value;

        fetch('http://localhost:3000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, role: role, old_email: "diego@gmail.com" })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Profile updated');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

document.addEventListener('click', (event) => {
    if (event.target.matches('#deleteButton')) {
        event.preventDefault();
        const email = "diego@gmail.com"; //este valor habrá que traerlo de otro lado, auth?

        fetch(`http://localhost:3000/api/user?email=${email}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            document.open();
                            document.write(html);
                            document.close();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});


document.addEventListener('click', (event) => {
    if (event.target.matches('.favButton')) {
        event.preventDefault();
        const email = "diego@gmail.com";
        const jobID = event.target.value;

        fetch('http://localhost:3000/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, job_id: jobID })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});











//**** SCRIPT HEADER.PUG **** */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

//**** SCRIPT HOME.PUG **** */

// Filtro keyword
document.addEventListener('submit', (event) => {
    if (event.target.matches('.searchKeyword')) {
        event.preventDefault();
        const keyword = event.target.keyword.value;
        console.log('probando fetch...')

        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyword: keyword })
        })
            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Filtro skill
document.addEventListener('submit', (event) => {
    if (event.target.matches('.searchSkill')) {
        event.preventDefault();
        const skill = event.target.skill.value;
        console.log('probando fetch by skill...')

        fetch('http://localhost:3000/searchbyskill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill: skill })
        })
            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});



/**** SCRIPT SIGNUP.PUG *****/

const validateForm = () => {
    const form = document.querySelector('.card');
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');
    const confirmPassword = document.getElementById('confirmPassword');
    const inputs = document.querySelectorAll('input');
    const passwordInstructions = document.getElementById('instructions');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    passwordInstructions.style.display = 'none';

    password.addEventListener('focus', () => {
        passwordInstructions.style.display = 'block';
    });

    password.addEventListener('blur', () => {
        passwordInstructions.style.display = 'none';
    });

    email.addEventListener('input', () => {
        if (email.checkValidity()) {
            email.classList.remove('error');
        } else {
            email.classList.add('error');
        }
    });

    form.addEventListener('submit', (event) => {
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        if (!passwordRegex.test(password.value)) {
            password.classList.add('error');
            isValid = false;
            passwordInstructions.style.display = 'block';
        } else {
            password.classList.remove('error');
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add('error');
            confirmPassword.setCustomValidity('Passwords do not match');
            isValid = false;
        } else {
            confirmPassword.classList.remove('error');
            confirmPassword.setCustomValidity('');
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    window.onload = () => {
        google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('googleSignInButton'),
            { theme: 'outline', size: 'large' } // opciones de personalización del botón
        );
        google.accounts.id.prompt(); // muestra la ventana emergente de inicio de sesión de Google
    };

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        // Aquí puedes enviar el token al servidor o manejarlo como necesites
    }
};


//**** SCRIPT FOOTER.PUG **** */

// Function that randomly shuffles the contents of an array
const shuffleArray = (array) => {
    //console.log('Primer array', array);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        //console.log(i, j, array);
    }
    return array;
};

// Footer Logic
const generateFooter = () => {
    const developers = [
        {
            name: 'Emilio Latorre Guerra',
            github: 'https://github.com/emiliolatorre'
        },
        {
            name: 'Eduardo Fatou Cerrato',
            github: 'https://github.com/EduFatou'
        },
        {
            name: 'Diego Blázquez Rosado',
            github: 'https://github.com/diegoblazquezr'
        }
    ];
    const footerDevsContainer = document.querySelector('#footer-devs-container');
    shuffleArray(developers);
    developers.forEach((element) => {
        const spanDev = document.createElement('SPAN');
        spanDev.innerHTML = `${element.name} <a href="${element.github}" target="_blank"><i class="fa-brands fa-github fa-lg" style="color: #ffffff;"></i></a>`;
        fragment.append(spanDev);
    });
    footerDevsContainer.append(fragment);
};

// Function Calls
generateFooter();