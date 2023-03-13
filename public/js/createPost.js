async function createPost(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;
    
    if (title && body) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            alert("Failed to create post");
        }
    } else {
        console.error("Missing title or body");
    }
}

document.querySelector('#post-form').addEventListener('submit', createPost);