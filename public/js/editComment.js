async function updateComment(event) {
    event.preventDefault();
    const url = window.location.toString().split('/');
    const post_id = url[url.length - 3];
    const comment_id = url[url.length - 1];

    const content = document.querySelector('#comment-body').value;
    
    if (content) {
        const update = { content };
        const response = await fetch(`/api/comments${comment_id}`, {
            method: 'PUT',
            body: JSON.stringify(update),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        if (response.ok) {
            window.location.href = "../..";
        } else {
            alert("Failed to update post");
        }
    } else {
        console.error("Missing content for comment.");
    }
}

document.querySelector('#comment-form').addEventListener('submit', updateComment);