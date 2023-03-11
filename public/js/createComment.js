async function createComment(event) {
    event.preventDefault();

    const content = document.querySelector('#comment-body').value;
        
    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        if (response.ok) {
            window.location.href = '..';
        } else {
            alert("Failed to create comment");
        }
    } else {
        console.error("Missing content for comment");
    }
}

document.querySelector('#comment-form').addEventListener('submit', createComment);