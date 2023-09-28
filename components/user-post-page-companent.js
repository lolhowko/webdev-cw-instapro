import { posts, getToken } from '../index.js'
import { dislikePost, getPosts, likePost } from '../api.js'
import { renderHeaderComponent } from './header-component.js'
import { renderPostsPageComponent } from './posts-page-component.js'

export function renderUserPageComponent({ appEl }) {
    // TODO: реализовать рендер постов из api

    const appElement = document.getElementById('app')

    /**
     * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
     * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
     */

    // получение разметки в html из api

    console.log(posts);

    const userPostsHtml = posts.map((post) => {
            return `<li class="post">

                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>

                    <div class="post-likes">
                      <button data-post-id="${post.id}" data-dislike="${
                          post.isLiked ? 'true' : ''
                      }" class="like-button">
                        <img src="${
                            post.isLiked
                                ? `./assets/images/like-active.svg`
                                : `./assets/images/like-not-active.svg`
                        }">

                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes}</strong>
                         <strong>${
                             post.likes.length
                                 ? `и еще ${post.likes.length}`
                                 : ' '
                         }</strong>
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
                  </li>`
        })
        .join(' ')



    const userPostsPageHtml = `
             <div class="page-container">

                <div class="header-container"></div>

                <div class="post-header" data-user-id="${id}">
                    <img src="${post.user.imageUrl}" class="post-header__user-image">
                    <p class="post-header__user-name">${post.user.login}</p>
                </div>

                <ul class="posts">
                    ${userPostsHtml}
                </ul>

            </div>`

    appEl.innerHTML = userPostsPageHtml

    renderHeaderComponent({
        element: document.querySelector('.header-container'),
    })

    for (let likeButton of document.querySelectorAll('.like-button')) {
        likeButton.addEventListener('click', () => {
            console.log(likeButton.dataset.postId)
            console.log(likeButton.dataset.dislike)

            if (likeButton.dataset.dislike) {
                dislikePost({
                    id: likeButton.dataset.postId,
                    token: getToken(),
                }).then(() => {
                    getPosts({ token: getToken() }).then((newPosts) => {
                        renderPostsPageComponent({ appEl, posts: newPosts })
                    })
                })
            } else {
                likePost({
                    id: likeButton.dataset.postId,
                    token: getToken(),
                }).then(() => {
                    getPosts({ token: getToken() }).then((newPosts) => {
                        renderPostsPageComponent({ appEl, posts: newPosts })
                    })
                })
            }
        })
    }
}
