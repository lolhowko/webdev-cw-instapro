import { postPosts } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="header-container"></div>

    <div class="page-container">
      <div class="form">

        <h3 class="form-title">Добавить пост</h3>

        <div class="form-inputs">

          <div class="upload-image-container">
            <div class="upload=image">
              <label class="file-upload-label secondary-button">
                <input type="file" class="file-upload-input" style="display:none">
                Выберите фото
              </label>
            </div>
          </div>

          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
          </label>
            
          <button class="button" id="add-button">Добавить</button>
       
          </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    // Объявление переменных для инпутов картинки, нейм, логин, описание

    const inputDescriptionElement = document.querySelector(".textarea");
    const inputImageElement = document.querySelector(".file-upload-input");

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",

//fetch чтобы добавлять при нажатии

        // const fetchPostPosts = () => {
        //   postPosts({
        //     imageUrl = inputImageElement.value,
        //     description = inputDescriptionElement.value,
        //   })
        //   .then(() => {
        //     return 
        //   })
        // }

      });
    });
  };

  render();
}

