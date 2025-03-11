// -----------------------------------------------------------------------------
// This file includes deliberate formatting errors in order for you to verify
// that ESLint and EditorConfig are working properly. If both tools are, indeed,
// working correctly, then you’d see errors in your editor about indentation and
// improper use of footmarks instead of back ticks. When you save this file,
// your editor should strip all excess newlines and whitespace characters from
// the file. If both of these events occur, then ESLint and EditorConfig are
// working correctly.
//
// DON’T PROCEED UNTIL YOU’RE SURE ESLINT AND EDITORCONFIG ARE WORKING CORRECTLY
// -----------------------------------------------------------------------------
document.addEventListener(`DOMContentLoaded`, function () {
    fetch(`json/data.json`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const carouselSlides = document.querySelector(`.carousel-slides`);
            const leftArrow = document.querySelector(`.carousel-navigation a:first-child`);
            const rightArrow = document.querySelector(`.carousel-navigation a:last-child`);
            rightArrow.style.display = `none`;
            let currentIndex = 0;
            const slideWidth = 640;
            carouselSlides.innerHTML = ``;
            carouselSlides.style.display = `flex`;
            carouselSlides.style.transition = `transform .2s ease-in-out`;
            carouselSlides.style.overflow = `hidden`;
            data.forEach((album) => {
                const albumContainer = document.createElement(`div`);
                albumContainer.classList.add(`carousel-slide`);
                albumContainer.style.width = `${slideWidth}px`;
                const albumCover = document.createElement(`img`);

                let imgPath = album.cover_image.path;
                imgPath = imgPath.replace(/_/g, ``);
                albumCover.src = imgPath;
                albumCover.alt = album.cover_image.alt_content;
                albumCover.width = slideWidth;
                albumCover.height = album.cover_image.height;

                const albumTitle = document.createElement(`h2`);
                albumTitle.textContent = album.album;
                albumTitle.classList.add(`album-title`);

                const artistLink = document.createElement(`a`);
                artistLink.href = album.url;
                artistLink.textContent = album.artist;
                artistLink.classList.add(`artist-link`);
                artistLink.target = `_blank`;

                const creditName = document.createElement(`p`);
                const credit = document.createElement(`p`);
                creditName.textContent = album.cover_image.credit;
                creditName.style.color = `blue`;
                credit.textContent = `Credit: `+album.cover_image.credit;
                credit.classList.add(`credit`);

                const reviewContent = document.createElement(`p`);
                reviewContent.textContent = album.review.content;
                reviewContent.classList.add(`review-content`);

                const reviewSource = document.createElement(`a`);
                reviewSource.href = album.review.url;
                reviewSource.textContent = `—` + album.review.source;
                reviewSource.classList.add(`review-source`);

                albumContainer.appendChild(albumTitle);
                albumContainer.appendChild(artistLink);
                albumContainer.appendChild(albumCover);
                albumContainer.appendChild(credit);
                albumContainer.appendChild(reviewContent);
                albumContainer.appendChild(reviewSource);

                carouselSlides.appendChild(albumContainer);
            });
            const slides = document.querySelectorAll(`.carousel-slide`);
            carouselSlides.style.width = `${slideWidth * slides.length}px`;

            const maxIndex = slides.length - 1;

            const changeSlide = (direction) => {
                rightArrow.style.display = `flex`;
                if (direction === -1 && currentIndex === 0) {
                    return;
                }
                else if(direction === 1 && currentIndex === maxIndex){
                    return;
                }
                currentIndex += direction;
                if(currentIndex === 0){
                    rightArrow.style.zIndex = 0;
                    leftArrow.style.zIndex = 1;
                }
                else if (currentIndex === maxIndex)
                    leftArrow.style.zIndex = 0;
                else{
                    rightArrow.style.zIndex = 1;
                    leftArrow.style.zIndex = 1;
                }
                carouselSlides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            };
            leftArrow.addEventListener(`click`, (event) => {
                event.preventDefault();
                changeSlide(1);
            });

            rightArrow.addEventListener(`click`, (event) => {
                event.preventDefault();
                changeSlide(-1);
            });
            document.addEventListener(`keydown`, function (event) {
                if (event.key === `ArrowLeft`) {
                    leftArrow.click();
                } else if (event.key === `ArrowRight`) {
                    rightArrow.click();
                }
            });
        });
});
