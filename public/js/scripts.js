// General Variables
const fragment = document.createDocumentFragment();


/* *********************EVENTS**********************/

document.addEventListener('DOMContentLoaded', () => validateForm());


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