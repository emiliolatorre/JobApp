// General Variables
const fragment = document.createDocumentFragment();


/* *********************EVENTS**********************/

document.addEventListener('DOMContentLoaded', () => validateForm());

document.addEventListener('submit', (event) => {
    if (event.target.matches('#formSignUp')) {
        //event.preventDefault();
            const name = event.target.name.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
            const role = "user";

            fetch('http://localhost:3000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, password: password, role: role, logged: false, last_logged_date: "2024-07-04 20:57:30.212678+00" })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);             //redirigir a login??
            });
}});

document.addEventListener('submit', (event) => {
    if (event.target.matches('#formProfile')) {
        event.preventDefault();
            const name = event.target.name.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
           
            fetch('http://localhost:3000/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, password: password, role: "user", logged: true, last_logged_date: "2024-07-04 20:57:30.212678+00", old_email: "hector@hector.com"})
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
}});

document.addEventListener('click', (event) => {
    if (event.target.matches('#deleteButton')) {
        event.preventDefault();
            const email = event.target.email.value; //este valor habrá que traerlo de otro lado, auth?
           
            fetch('http://localhost:3000/api/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                query: {email: email} //comprobar sintaxis, no nos queda oxígeno
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
}});


document.addEventListener('click', (event) => {
    if (event.target.matches('.favButton')) {
        event.preventDefault();
            const email = "edu@gmail.com";
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
}});











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

    // Filtro por título (version 1) - home.pug
    // document.addEventListener('input', ({ target }) => {

    //     if (target.matches('#searchTitle')) {
    //         filterJobs(target);
    //     }

    // });

    // const filterJobs = (target) => {
    //     const jobsFiltered = jobs.filter(obj => obj.title.toLowerCase().includes(target.value.toLowerCase()));
    //     updateJobList(jobsFiltered)
    //     // combineAllListsFilters();
    // }

    // const updateJobList = (jobsFiltered) => {
    //     const articles = document.querySelectorAll('#jobsContainer article');

    //     articles.forEach(article => {
    //         const title = article.getAttribute('data-jobTitle').toLowerCase();
    //         const isVisible = jobsFiltered.some(job => job.title.toLowerCase() === title);
    //         article.style.display = isVisible ? 'block' : 'none';
    //     });
    // }


    // // Filtro por título (version 2 Mongo) - home.pug
    // document.addEventListener('submit', async (event) => {

    //     if (event.target.matches('#searchKeyword')) {
    //         event.preventDefault();
    //         const inputKeyword = event.target.keyword.value.toLowerCase();
    //         console.log(inputKeyword)

    //         try {
    //             const response = await fetch('/search', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ keyword: inputKeyword })
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             const jobs = await response.json();

    //             // Update the jobs list in the DOM
    //             const jobsContainer = document.getElementById('jobsContainer');
    //             jobsContainer.innerHTML = ''; // Clear the current content

    //             jobs.forEach(job => {
    //                 const jobElement = document.createElement('div');
    //                 jobElement.classList.add('job');
    //                 jobElement.innerHTML = `
    //                     <h2>${job.title}</h2>
    //                     <p>${job.description}</p>
    //                     <p>${job.client_location}</p>
    //                     <p>${job.skills}</p>
    //                     <p>${job.url}</p>
    //                     <p>${job.source}</p>
    //                     <p>${job.status}</p>
    //                 `;
    //                 jobsContainer.appendChild(jobElement);
    //             });
    //         } catch (error) {
    //             console.error('Error fetching jobs:', error);
    //         }
    //     }
    // });



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