document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    const usernameAnchor = document.getElementById('usernameAnchor');
    const anchorTag = usernameAnchor.querySelector('a');

    if (username) {
        // Username exists, disable anchor tag
        anchorTag.removeAttribute('href');
        anchorTag.textContent = username;
    } else {
        // Username doesn't exist, set the text content to "Login"
        anchorTag.textContent = "Login";
    }
});
