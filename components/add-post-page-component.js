import { postPosts } from '../api.js'
import { renderHeaderComponent } from './header-component.js'
import { renderUploadImageComponent } from './upload-image-component.js'

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    let imageUrl = ''

    const render = () => {
        // TODO: Реализовать страницу добавления поста
        const appHtml = `
    <div class="header-container"></div>

    <div class="page-container">
      <div class="form">

        <h3 class="form-title">Добавить пост</h3>

        <div class="form-inputs">

          <div class="upload-image-container">

          </div>

          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
          </label>
            
          <button class="button" id="add-button">Добавить</button>
       
          </div>
      </div>
    </div>
  `

        appEl.innerHTML = appHtml

        renderHeaderComponent({
            element: document.querySelector('.header-container'),
        })

        renderUploadImageComponent({
            element: appEl.querySelector('.upload-image-container'),
            onImageUrlChange(newImageUrl) {
                imageUrl = newImageUrl
            },
        })

        const inputDescriptionElement = document.querySelector('.textarea')

        document.getElementById('add-button').addEventListener('click', () => {
            onAddPostClick({
                description: inputDescriptionElement.value,
                imageUrl,
            })
        })
    }

    render()
}
