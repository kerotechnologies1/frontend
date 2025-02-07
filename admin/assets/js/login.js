// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

function checkTokenCookie() {

    const token = getCookie('token');
    if (token) {
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkTokenCookie();
});

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Days to milliseconds
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;`;
}


    const loginForm = document.getElementById('loginForm');
    const btnText = document.getElementById('btn-text');
    const spinner = document.getElementById('spinner');
    const toast = document.getElementById('toast');
    const submitBtn = document.getElementById('submit-btn')
    const toastBody = document.querySelector('.toast-body');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        btnText.textContent = 'Loading...';
        spinner.style.display = 'inline-block';
        loginForm.querySelector('button').disabled = true;
        submitBtn.classList.add('disabled');

        try {
            const response = await fetch('https://backend-lnvj.onrender.com/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            console.log("Result:", result); // Debugging log

            if (response.ok && result.success) { // Ensure both conditions are true
                setCookie('token', result.data.token, 1);

                const userData = result.data.admin;
                for (const [key, value] of Object.entries(userData)) {
                    localStorage.setItem(key, String(value));
                }

                window.location.href = 'index.html';
            } else {
                console.warn("Error Message:", result.message); // Debugging log
                showToast(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error("Error:", error); // Debugging log for unexpected errors
            showToast('An error occurred. Please try again later.');
        } finally {
            btnText.textContent = 'Sign In';
            spinner.style.display = 'none';
            loginForm.querySelector('button').disabled = false;
            submitBtn.classList.remove('disabled');
        }
    });


    function showToast(message) {
        toastBody.textContent = message;
        const toastInstance = new bootstrap.Toast(toast);
        toastInstance.show();
    }
