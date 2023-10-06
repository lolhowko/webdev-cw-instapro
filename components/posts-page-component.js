import { USER_POSTS_PAGE } from '../routes.js'
import { renderHeaderComponent } from './header-component.js'
import { posts, goToPage, getToken, setPosts } from '../index.js'
import { dislikePost, getPosts, likePost } from '../api.js'

import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

export function renderPostsPageComponent({ appEl }) {
    // TODO: реализовать рендер постов из api

    const appElement = document.getElementById('app')

    // получение разметки в html из api

    const render = () => {
        const postsHtml = posts
            .map((post) => {

                const createDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru })

                return `<li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src="${
                            post.user.imageUrl
                        }" class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.login}</p>
                    </div>

                    <div class="post-image-container">
                      <img class="post-image" src="${post.imageUrl}">
                    </div>

                    <div class="post-likes" >
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
                         <strong>${
                             post.likes.length >= 1
                                 ? `Нравится: ${post.likes[0]?.name}`
                                 : ' '
                         }
                         <strong>${
                             post.likes.length > 1
                                 ? `и еще ${post.likes.length - 1}`
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

        const appHtml = `
                <div class="page-container">

                  <div class="header-container"></div>

                  <ul class="posts">
                    ${postsHtml}
                  </ul>

                </div>`

        appEl.innerHTML = appHtml

        renderHeaderComponent({
            element: document.querySelector('.header-container'),
        })

        for (let userEl of document.querySelectorAll('.post-header')) {
            userEl.addEventListener('click', () => {
                goToPage(USER_POSTS_PAGE, {
                    userId: userEl.dataset.userId,
                })
            })
        }

        for (let likeButton of document.querySelectorAll('.like-button')) {
            likeButton.addEventListener('click', () => {
                // console.log(likeButton.dataset.postId)
                // console.log(likeButton.dataset.dislike)

                if (likeButton.dataset.dislike) {
                    dislikePost({
                        id: likeButton.dataset.postId,
                        token: getToken(),
                    }).then(() => {
                        getPosts({ token: getToken() }).then((newPosts) => {
                            console.log(newPosts)
                            setPosts(newPosts)
                            renderPostsPageComponent({ appEl })
                        })
                    })
                } else {
                    likePost({
                        id: likeButton.dataset.postId,
                        token: getToken(),
                    }).then(() => {
                        getPosts({ token: getToken() }).then((newPosts) => {
                            console.log(newPosts)
                            setPosts(newPosts)
                            renderPostsPageComponent({ appEl })
                        })
                    })
                }
            })
        }
    }

    render()
}
