function editPostHandler () {
    const url = window.location.toString().split('/');
    const id = url[url.length - 1];
    document.location.replace(`./${id}/edit`);
}

async function deletePostHandler () {
    const url = window.location.toString().split('/');
    const id = url[url.length - 1];

    const response = await fetch(`/api/posts${id}`, {
        method: 'DELETE'
    });
    console.log(response);

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("Failed to delete post");
    }
}

function addCommentHandler () {
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