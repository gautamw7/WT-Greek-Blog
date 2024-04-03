getPostById(postId)
    .then(post => {
        if (typeof post === 'string') {
            // Handle case where post was not found
            console.log(post); // Log the message indicating post not found
            return;
        }

        console.log(post);
        document.title = post.title;
        const postHeadertitle = post.title.slice(post.title.indexOf(":") + 1).trim();
        document.getElementById("header-title").textContent = postHeadertitle;

        const img = document.getElementById("Imageheader");
        const urlOfImage = post.img_url;
        img.style.backgroundImage = `url(${urlOfImage})`;

        const Subheaadingtext = "Posted by " + post.author + " on " + post.date;
        console.log(Subheaadingtext);

        document.getElementById("Subheading-title").textContent = Subheaadingtext;
        document.getElementById("Subheading-title").style.fontWeight = "bold";

        const postContent = post.content; // Get the content of the post

        // Function to split content into approximately equal parts based on sentence count
        function splitContentIntoParts(content, numParts) {
            const sentences = content.split(/[.!?]/);
            const sentencesPerPart = Math.ceil(sentences.length / numParts);
            const parts = [];
            let currentPart = [];
            let sentenceCount = 0;

            sentences.forEach(sentence => {
                currentPart.push(sentence.trim());
                sentenceCount++;

                // Check if current part has reached the desired number of sentences
                if (sentenceCount === sentencesPerPart) {
                    // Join the sentences to form a paragraph
                    const paragraph = currentPart.join(". ");

                    // Add the paragraph to the parts array
                    parts.push(paragraph);

                    // Reset current part and sentence count for the next part
                    currentPart = [];
                    sentenceCount = 0;
                }
            });

            // Add any remaining sentences as the last part
            if (currentPart.length > 0) {
                parts.push(currentPart.join(". "));
            }

            return parts;
        }

        // Split the content into three parts
        const parts = splitContentIntoParts(postContent, 3);

        // Get the div where you want to add the paragraphs
        const postContentDiv = document.getElementById("Post-content");

        // Loop through the parts and create a paragraph for each part
        parts.forEach(part => {
            // Create a new <p> element
            const newParagraph = document.createElement("p");
            // Set the text content of the <p> element to the part
            newParagraph.textContent = part;
            // Append the <p> element to the post content div
            postContentDiv.appendChild(newParagraph);
        });
    })
    .catch(error => console.error('Error:', error));

const id = urlParams.get('id');
console.log('ID from URL:', id);

document.querySelectorAll(".post-preview").forEach(function(element) {
    element.addEventListener('click', function() {

        const getUrlParameter = function (name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        };

        const username = getUrlParameter('username');

        // Function to add username to URL if it exists
        function addUsernameToURL(url) {
            return username ? `${url}&username=${encodeURIComponent(username)}` : url;
        }

        var id = this.id;

        fetch(`blogPosts.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                return response.json();
            })
            .then(blogPosts => {
                const post = blogPosts.find(post => post.id === parseInt(id));

                if (!post) {
                    console.log(`Post not found with ID: ${id}`);
                    return;
                }

                // Redirect to the BlogDisplay.html page and pass post details as URL parameters
                window.location.href = `BlogDisplay.html?id=${id}&author=${post.author}&title=${post.title}&content=${post.content}&date=${post.date}&img_url=${post.img_url}`;
            })
            .catch(error => console.error('Error fetching blog posts:', error));
    });
});
