document.addEventListener('DOMContentLoaded', function () {
    const getUrlParameter = function (name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    const username = getUrlParameter('username');

    if (username) {
        const anchorTags = document.querySelectorAll('a[href]');

        anchorTags.forEach(function (anchorTag) {
            let href = anchorTag.getAttribute('href');

            if (href) {
                // Check if href already contains query parameters
                if (href.includes('?')) {
                    // Check if username parameter already exists
                    if (!href.includes('username=')) {
                        href += `&username=${encodeURIComponent(username)}`;
                    }
                } else {
                    href += `?username=${encodeURIComponent(username)}`;
                }
                anchorTag.setAttribute('href', href);
            }
        });
    }
});
