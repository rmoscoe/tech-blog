async function createComment(event) {
    event.preventDefault();

    const url = window.location.toString().split('/');
    const postId = url[url.length - 2];
    const content = document.querySelector('#comment-body').value;
        
    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, postId }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.href = `../${postId}`;
        } else {
            alert("Failed to create comment");
        }
    } else {
        console.error("Missing content for comment");
    }
}

document.querySelector('#comment-form').addEventListener('submit', createComment);