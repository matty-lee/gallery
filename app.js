import get from './utils.js';

class Gallery {
  constructor(section) {
    this.section = section;
    this.modal = document.querySelector('.modal');
    this.closebtn = document.querySelector('.close-btn');
    this.imgList = [...section.querySelectorAll('.img')];
    this.modalImages = document.querySelector('.modal-images');
    this.modalHeading = get('.modal-heading');
    this.mainImage = get('.main-img');

    // bind
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.section.addEventListener(
      'click',
      function (e) {
        if (e.target.classList.contains('img')) {
          this.openModal(e.target, this.imgList);
        }
      }.bind(this)
    );
    this.closebtn.addEventListener('click', this.closeModal);
  }

  openModal(selectedImg, imgList) {
    this.modal.classList.add('open-modal');
    this.modalHeading.textContent = `${selectedImg.dataset.id}`;
    this.mainImage.src = selectedImg.src;
    this.modalImages.innerHTML = imgList.map(function (image) {
      return `<div class="modal-img">
            <img src="${image.src}" />
          </div>`;
    }.join(''));
  }

  closeModal() {
    this.modal.classList.remove('open-modal');
  }
}

const LA = new Gallery(get('.LA'));
const SF = new Gallery(get('.SF'));
