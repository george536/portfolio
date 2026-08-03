const galleryImages = Array.from(
  document.querySelectorAll(".project-page .media-grid img"),
);

if (galleryImages.length > 0) {
  const lightbox = document.createElement("dialog");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("aria-label", "Project image viewer");
  lightbox.innerHTML = `
    <button class="gallery-lightbox__close" type="button" aria-label="Close image preview">&times;</button>
    <button class="gallery-lightbox__nav gallery-lightbox__nav--previous" type="button" aria-label="View previous image">
      <span aria-hidden="true">&#8592;</span>
    </button>
    <figure class="gallery-lightbox__figure">
      <img class="gallery-lightbox__image" alt="">
      <figcaption class="gallery-lightbox__caption">
        <span class="gallery-lightbox__caption-text"></span>
        <span class="gallery-lightbox__counter" aria-live="polite"></span>
      </figcaption>
    </figure>
    <button class="gallery-lightbox__nav gallery-lightbox__nav--next" type="button" aria-label="View next image">
      <span aria-hidden="true">&#8594;</span>
    </button>
  `;

  document.body.append(lightbox);

  const previewImage = lightbox.querySelector(".gallery-lightbox__image");
  const captionText = lightbox.querySelector(
    ".gallery-lightbox__caption-text",
  );
  const counter = lightbox.querySelector(".gallery-lightbox__counter");
  const closeButton = lightbox.querySelector(".gallery-lightbox__close");
  const previousButton = lightbox.querySelector(
    ".gallery-lightbox__nav--previous",
  );
  const nextButton = lightbox.querySelector(".gallery-lightbox__nav--next");

  let activeIndex = 0;
  let previouslyFocusedElement = null;

  function getCaption(image) {
    const cardCaption = image
      .closest(".media-item")
      ?.querySelector("h6")
      ?.textContent.trim();

    return cardCaption || image.alt || "Project image";
  }

  function renderImage(index) {
    activeIndex = (index + galleryImages.length) % galleryImages.length;
    const selectedImage = galleryImages[activeIndex];

    previewImage.src = selectedImage.currentSrc || selectedImage.src;
    previewImage.alt = selectedImage.alt;
    captionText.textContent = getCaption(selectedImage);
    counter.textContent = `${activeIndex + 1} / ${galleryImages.length}`;
  }

  function openLightbox(index) {
    previouslyFocusedElement = document.activeElement;
    renderImage(index);
    lightbox.showModal();
    document.body.classList.add("gallery-lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.close();
  }

  function showPreviousImage() {
    renderImage(activeIndex - 1);
  }

  function showNextImage() {
    renderImage(activeIndex + 1);
  }

  galleryImages.forEach((image, index) => {
    const caption = getCaption(image);

    image.classList.add("gallery-preview-trigger");
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Open full-size preview: ${caption}`);

    image.addEventListener("click", () => openLightbox(index));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", showPreviousImage);
  nextButton.addEventListener("click", showNextImage);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextImage();
    }
  });

  lightbox.addEventListener("close", () => {
    document.body.classList.remove("gallery-lightbox-open");
    previewImage.removeAttribute("src");
    previouslyFocusedElement?.focus();
  });

  if (galleryImages.length === 1) {
    previousButton.hidden = true;
    nextButton.hidden = true;
  }
}
