function editCommentHandler (event) {
    const comment_id = event.target.getAttribute('data-comment');
    document.location.replace(`./comments/${comment_id}`);
}

async function deleteCommentHandler (event) {
    const url = window.location.toString().split("/");
    const post_id = url[url.length - 3];
    const comment_id = event.target.getAttribute('data-comment');

    const response = await fetch(`/api/comments/${comment_id}`, {
        method: "DELETE"
    });
    console.log(response);

    if (response.ok) {
        document.location.replace(`/posts/${post_id}`);
    } else {
        alert("Failed to delete comment");
    }
}

const editButtons = document.querySelectorAll('.edit-comment');
const deleteButtons = document.querySelectorAll('.delete-comment');

editButtons.forEach(editButton => {
    editButton.addEventListener('click', editCommentHandler);
});

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', deleteCommentHandler);
});