// import { dislikePost, likePost } from "../api";

// const likeButton = document.querySelector(".like-button");

// console.log(likeButton);

// export function likeInitButton () {

//     for (let likeButton of document.querySelectorAll('.like-button')) {
//         likeButton.addEventListener('click', () => {
//             console.log(likeButton.dataset.postId)
//             console.log(likeButton.dataset.dislike)
    
//             if (likeButton.dataset.dislike) {
//                 dislikePost({
//                     id: likeButton.dataset.postId,
//                     token: getToken(),
//                 }).then(() => {
//                     getPosts({ token: getToken() }).then((newPosts) => {
//                         renderPostsPageComponent({ appEl, posts: newPosts })
//                     })
//                 })
//             } else {
//                 likePost({ id: likeButton.dataset.postId, token: getToken() })
//                 .then(() => {
//                         getPosts({ token: getToken() }).then((newPosts) => {
//                             renderPostsPageComponent({ appEl, posts: newPosts })
//                         })
//                     }
//                 )
//             }
//         })
    
//     }
// }

