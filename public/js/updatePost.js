async function updatePost(event) {
    event.preventDefault();
    const url = window.location.toString().split('/');
    const id = url[url.length - 2];

    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-body').value;
    
    if (title && content) {
        const updates = { title, content };
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.href = "/dashboard";
        } else {
            alert("Failed to update post");
        }
    } else {
        console.error("Missing title or body");
    }
}

document.querySelector('#post-form').addEventListener('submit', updatePost);