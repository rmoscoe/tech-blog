async function updatePost(event) {
    event.preventDefault();
    const url = window.location.toString().split('/');
    const id = url[url.length - 2];

    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;
    
    if (title && body) {
        const updates = { title, body };
        const response = await fetch(`/api/posts${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);

        if (response.ok) {
            window.location.href = "..";
        } else {
            alert("Failed to create post");
        }
    } else {
        console.error("Missing title or body");
    }
}

document.querySelector('#post-form').addEventListener('submit', updatePost);