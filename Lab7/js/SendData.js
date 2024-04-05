document.querySelectorAll(".post-preview").forEach(function(element) {
    element.addEventListener('click', function() {
        var id = this.id;

        // Fetch the blog post data using Fetch API
        fetch(`data.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                return response.json();
            })
            .then(blogPosts => {
                var post = blogPosts.find(post => post.id === parseInt(id));
                if (post) {
                    // Redirect to the BlogDisplay.html page and pass post details as URL parameters
                    window.location.href = `BlogDisplay.html?id=${id}&author=${post.author}&title=${post.title}&content=${post.content}&date=${post.date}&img_url=${post.img_url}`;
                } else {
                    console.error(`Post not found with ID: ${id}`);
                }
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    });
});
