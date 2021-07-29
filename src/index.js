// write your code here



const imageTitle = document.getElementById("fg-title");
const imagePlace = document.getElementById("fg-image");
const numberOfLikes = document.getElementById("fg-likes");
const likeButton = document.getElementById("fg-like-button");
const commentsSection = document.getElementById("fg-comments");
const postButton = document.getElementsByClassName("comment-button");
const form = document.getElementById("fg-comment-form");



fetch("http://localhost:3000/images/1") //Fetches the images
.then(response => response.json()) //Converts the data into a Javascript object
.then(data => handleData(data)); //Invokes a function, passing in the data

function handleData(data) { //Adds the data to the page
    imageTitle.innerHTML = data.title;
    imagePlace.src = data.image;
    numberOfLikes.innerHTML = `${data.likes} likes`;

    likeButton.addEventListener("click", function(e) { //Adds event listener to the like button for 'click' event
        numberOfLikes.innerHTML = `${data.likes++} likes`; //Increases the like count by one each time
    })
}

fetch("http://localhost:3000/comments") //Fetches the comments 
.then(response => response.json()) //Converts the data into a Javascript object
.then(comments => handleComments(comments)); //Invokes a function, passing in the data

function handleComments(comments) { //Replaces the placeholder data with the comments that are returned from the server
    console.log(comments);
    const lione = document.getElementById("li-one"); //Removes the placeholder data
    lione.remove();
    const litwo = document.getElementById("li-two");
    litwo.remove();
    const lithree = document.getElementById("li-three");
    lithree.remove();
    comments.forEach(comment => { //Takes each comment from the server and appends it to the comments section
        const commentListItem = document.createElement('li'); //Creates a list item
        commentListItem.innerHTML = comment.content; //Adds the comment content to the inner HTML of the list item
        commentsSection.appendChild(commentListItem); //Appends the list item to the comments section

    })
    
}

form.addEventListener("submit", function(e) { //Adds event listener to the form on 'submit' event
    e.preventDefault(); //Prevents the default 'page refresh'
    const newCommentEntry = document.getElementById("new-comment-input").value; //Converts the comment input into a value and assigns to a variable
    let commentValue = document.createTextNode(newCommentEntry); //Creates a text node out of the input value and assigns it to a variable (may have been able to use innerHTML like I did in the previous function.. just ran out of time)

    let dynamicListItem = document.createElement('Li'); //Creates a list item
    dynamicListItem.appendChild(commentValue); //Appends the comment value text node to the list item
    commentsSection.appendChild(dynamicListItem); //Appends the list item to the comments section

})
