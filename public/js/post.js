const editButtons = document.querySelectorAll('.edit-comment');
const deleteButtons = document.querySelectorAll('.delete-comment');

function editPostHandler() {
    const url = window.location.toString().split('/');
    const id = url[url.length - 1];
    document.location.replace(`./${id}/edit`);
}

async function deletePostHandler() {
    const url = window.location.toString().split('/');
    const id = url[url.length - 1];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });
    console.log(response);

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to delete post");
    }
}

function editCommentHandler(event) {
    const url = window.location.toString().split("/");
    const post_id = url[url.length - 1];
    let comment_id;
    if (event.target.hasAttribute('data-comment')) {
        comment_id = event.target.getAttribute('data-comment');
    } else {
        comment_id = event.target.parentElement.getAttribute('data-comment');
    }
    document.location.replace(`/posts/${post_id}/comments/${comment_id}`);
}

async function deleteCommentHandler(event) {
    const url = window.location.toString().split("/");
    const post_id = url[url.length - 3];

    let comment_id;
    if (event.target.hasAttribute('data-comment')) {
        comment_id = event.target.getAttribute('data-comment');
    } else {
        comment_id = event.target.parentElement.getAttribute('data-comment');
    }


    const response = await fetch(`/api/comments/${comment_id}`, {
        method: "DELETE"
    });
    console.log(response);

    if (response.ok) {
        document.location.replace(`..`);
    } else {
        alert("Failed to delete comment");
    }
}

function addCommentHandler() {
    const url = window.location.toString().split('/');
    const id = url[url.length - 1];
    document.location.replace(`./${id}/add-comment`);
}
// console.log(document.getElementById("add-comment"));
if (document.getElementById("edit-post-button")) {
    document.getElementById("edit-post-button").addEventListener("click", editPostHandler);
    document.getElementById("delete-post-button").addEventListener("click", deletePostHandler);
}

document.getElementById("add-comment").addEventListener("click", addCommentHandler);

editButtons.forEach(editButton => {
    editButton.addEventListener('click', editCommentHandler);
});

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', deleteCommentHandler);
});