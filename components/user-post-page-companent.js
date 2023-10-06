import { posts, getToken, userId, setPosts } from '../index.js'
import { dislikePost, getUserPost, likePost } from '../api.js'
import { renderHeaderComponent } from './header-component.js'

import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderUserPageComponent({ appEl }) {
    // TODO: реализовать рендер постов из api

    const userPostsHtml = posts.map((post) => {

            const isLike = Boolean(post.likes.find((el) => el._id === userId))
            const createDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru })

            return `<li class="post">

                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">7
                    </div>

                    <div class="post-likes">
                      <button data-post-id="${
                          post.id
                      }" data-dislike="${isLike}" class="like-button">
                        <img src="${
                            isLike
                                ? `./assets/images/like-active.svg`
                                : `./assets/images/like-not-active.svg`
                        }">

                      </button>
                      <p class="post-likes-text">
                         <strong>${
                            post.likes.length >= 1
                                ? `Нравится: ${post.likes[0]?.name}`
                                : ' '
                        }
                         <strong>${
                             post.likes.length-1 === 1
                                 ? `и еще ${post.likes.length -1}`
                                 : ' '
                         }</strong>
                      </p>
                    </div>

                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    
                    <p class="post-date">
                      ${createDate}
                    </p>
                  </li>`
        })
        .join(' ')

    const userPostsPageHtml = `
             <div class="page-container">

                <div class="header-container"></div>

                <div class="post-header">
                    <img src="${posts[0].user.imageUrl}" class="post-header__user-image">
                    <p class="post-header__user-name">${posts[0].user.name}</p>
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
            if (likeButton.dataset.dislike === 'true') {
                dislikePost({
                    id: likeButton.dataset.postId,
                    token: getToken(),
                }).then(() => {
                    getUserPost({ userId }).then((newPosts) => {
                        setPosts(newPosts)
                        renderUserPageComponent({ appEl })
                    })
                })
            } else {
                likePost({
                    id: likeButton.dataset.postId,
                    token: getToken(),
                }).then(() => {
                    getUserPost({ userId }).then((newPosts) => {
                        setPosts(newPosts)
                        renderUserPageComponent({ appEl })
                    })
                })
            }
        })
    }
}
