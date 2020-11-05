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

    // event listeners, NEEDS TO BE IN THE CONSTRUCTOR SECTION!!!
    this.section.addEventListener(
      'click',
      function (e) {
        if (e.target.classList.contains('img')) {
          this.openModal(e.target, this.imgList);
        }
      }.bind(this)
    );
    this.closebtn.addEventListener('click', this.closeModal);
    this.nextBtn.addEventListener('click', this.nextImage);
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
  }

  closeModal() {
    this.modal.classList.remove('open-modal');
  }

  displayMain(image) {
    this.mainImage.src = image.src;
  }

  nextImage() {
    const currentSelected = get('.modal-img-chosen');
    const nextModalImage =
      currentSelected.nextElementSibling || this.modalImages.firstElementChild;
    console.log(currentSelected);
    console.log(nextModalImage);

    currentSelected.classList.remove('modal-img-chosen');
    nextModalImage.classList.add('modal-img-chosen');
  }
}

const LA = new Gallery(get('.LA'));
const SF = new Gallery(get('.SF'));
