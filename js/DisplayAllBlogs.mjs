
document.addEventListener("DOMContentLoaded", function() {
    // Set the document title
    document.title = "All About Greek - Blog - Older Posts";

    // Fetch the JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Call the function to populate the HTML structure
            populateBlogPosts(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

// Function to populate the HTML structure with blog posts
function populateBlogPosts(blogPosts) {
    // Loop through each blog post and populate the HTML structure
    blogPosts.forEach((blogPost, index) => {
        const container = document.createElement('div');

        container.classList.add('post-preview');
        container.id = `Blog${index + 1}`;

        container.innerHTML = `
            <a href="BlogDisplay.html">
                <h2 class="post-title">${blogPost.title}</h2>
            </a>
            <p class="post-meta">
                Posted by
                <a href="#!" class="AuthorName">${blogPost.author}</a>
                on <span id="Date${index + 1}">${blogPost.date}</span>
            </p>
            <hr>
        `;
        // Assuming you want to set the href attribute of the anchor tag dynamically
        const anchorTag = container.querySelector('a');
        anchorTag.href = `BlogDisplay.html?id=${blogPost.id}`;

        // Append the populated container to the main content section
        document.querySelector('#Post-content').appendChild(container);
    });
}
