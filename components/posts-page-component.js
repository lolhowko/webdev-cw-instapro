import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getPosts } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  const appElement = document.getElementById("app");

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  // получение разметки в html из api
  const postsHtml = posts
    .map((post, index) => {
      return `              
      <li class="post">

        <div class="post-header" data-user-id="642d00329b190443860c2f31">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${post.user.login}</p>
        </div>

        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>

        <div class="post-likes">
          <button data-post-id="${post.id}" data-dislike="${
            post.isLiked
          }" class="like-button">
            <img src="${
              post.isLiked
                ? `./assets/images/like-active.svg`
                : `./assets/images/like-not-active.svg`
            }">

          </button>
          <p class="post-likes-text">
            Нравится: <strong>2</strong>
          </p>
        </div>

        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        
        <p class="post-date">
          СДЕЛАТЬ ДАТУ через библиотеку
          ${post.createdAt}
        </p>
      </li>`;
    })
    .join(" ");

  const appHtml = `
    <div class="page-container">

      <div class="header-container"></div>

      <ul class="posts">
        ${postsHtml}
      </ul>

    </div>
    `;

  appElement.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

// getPosts().then((responseData) => {
//   const appPosts = responseData.posts.map((post) => {

//     // const createDate =

//     return {
//       name: post.user.name,
//       imageUrl,
//       login : post.user.login,

//       // date: createDate,

//       text: post.text,

//       // like: post.likes,

//       isLiked: false,
//   };
// })
// })

// posts = appPosts;

// тут должна быть рендер-функция с отрисовкой HTML-разметки типо:
// renderComments({
//     comments,
//     fetchAndRenderComments,
//     name: window.userName,
// });
// })

// for (let likeButton of document.querySelector(".like-button")) {
//   likeButton.addEventListener("click", () => {
//     console.log(likeButton.dataset.id);
//     console.log(likeButton.dataset.dislike);
//   });
// }
