import get from './utils.js';

class Gallery {
  constructor(section) {
    this.section = section;
    this.modal = get('.modal');
    this.closebtn = get('.close-btn');
    this.imgList = [...section.querySelectorAll('.img')];
    this.modalImages = get('.modal-images');
    this.modalHeading = get('.modal-heading');
    this.mainImage = get('.main-img');
    this.nextBtn = get('.next-btn');
    this.prevBtn = get('.prev-btn');

    // bind functions back to instance
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.displayMain = this.displayMain.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.selectModal = this.selectModal.bind(this);

    // event listener for opening modal
    this.section.addEventListener(
      'click',
      function (e) {
        if (e.target.classList.contains('img')) {
          this.openModal(e.target, this.imgList);
        }
      }.bind(this)
    );
  }

  //   modules
  openModal(selectedImg, imgList) {
    this.modal.classList.add('open-modal');
    this.modalHeading.textContent = `${selectedImg.dataset.id}`;
    this.modalImages.innerHTML = imgList
      .map(function (image) {
        return `<div class="${
          selectedImg.src === image.src
            ? 'modal-img modal-img-chosen'
            : 'modal-img'
        }">
            <img src="${image.src}" />
          </div>`;
      })
      .join('');
    this.displayMain(selectedImg);
    this.closebtn.addEventListener('click', this.closeModal);
    this.nextBtn.addEventListener('click', this.nextImage);
    this.prevBtn.addEventListener('click', this.prevImage);
    this.modalImages.addEventListener('click', this.selectModal);
  }

  closeModal() {
    this.modal.classList.remove('open-modal');
    this.closebtn.removeEventListener('click', this.closeModal);
    this.nextBtn.removeEventListener('click', this.nextImage);
    this.prevBtn.removeEventListener('click', this.prevImage);
    this.modalImages.removeEventListener('click', this.selectModal);
  }

  displayMain(image) {
    this.mainImage.src = image.src;
  }

  nextImage() {
    const currentSelected = get('.modal-img-chosen');
    const nextModalImage =
      currentSelected.nextElementSibling || this.modalImages.firstElementChild;
    currentSelected.classList.remove('modal-img-chosen');
    nextModalImage.classList.add('modal-img-chosen');
    this.displayMain(nextModalImage.firstElementChild);
  }

  prevImage() {
    const currentSelected = get('.modal-img-chosen');
    const prevModalImage =
      currentSelected.previousElementSibling ||
      this.modalImages.lastElementChild;
    currentSelected.classList.remove('modal-img-chosen');
    prevModalImage.classList.add('modal-img-chosen');
    this.displayMain(prevModalImage.firstElementChild);
  }

  selectModal = function (e) {
    const currentSelected = get('.modal-img-chosen');
    if (e.target.parentElement.classList.contains('modal-img')) {
      currentSelected.classList.remove('modal-img-chosen');
      e.target.parentElement.classList.add('modal-img-chosen');
      this.displayMain(e.target);
    }
  };
}

const LA = new Gallery(get('.LA'));
const SF = new Gallery(get('.SF'));
