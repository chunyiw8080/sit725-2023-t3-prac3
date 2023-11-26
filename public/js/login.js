document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Get username and password widgets
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // send request body to back-end server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => console.error('Error:', error));
});
