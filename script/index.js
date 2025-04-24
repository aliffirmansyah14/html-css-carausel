const slider = document.querySelector(".slider__container");
const slides = Array.from(slider.children);
const nextButton = document.querySelector(".carausel__btn.right");
const prevButton = document.querySelector(".carausel__btn.left");
const dotNav = document.querySelector(".dot__navigasi");

const width = slides[0].getBoundingClientRect().width;

const createNav = (parent, length) => {
   if (length === 1) return;
   for (let i = 0; i < length; i++) {
      const button = document.createElement("button");
      button.classList.add("dot");
      if (i == 0) {
         button.classList.add("current__slide");
      }
      parent.append(button);
   }
};

createNav(dotNav, slides.length);
slides.forEach((el, i) => {
   el.style.left = `${width * i}px`;
});

const actionSlide = (parent, target) => {
   const amountToMove = target.style.left;
   parent.style.transform = `translateX(-${amountToMove})`;
};
const moveSlideTo = (parent, current, target, action) => {
   actionSlide(parent, target);
   current.classList.remove("current__slide");
   target.classList.add("current__slide");
};

const updateDot = (current, target) => {
   current.classList.remove("current__slide");
   target.classList.add("current__slide");
};
const hideArrow = targetIndex => {
   if (targetIndex === 0) {
      prevButton.classList.add("hidden");
      nextButton.classList.remove("hidden");
   } else if (targetIndex === slides.length - 1) {
      prevButton.classList.remove("hidden");
      nextButton.classList.add("hidden");
   } else {
      prevButton.classList.remove("hidden");
      nextButton.classList.remove("hidden");
   }
};

prevButton.addEventListener("click", function () {
   const dots = [...dotNav.children];
   const currentSlide = slider.querySelector(".current__slide");
   const prevSlide =
      currentSlide.previousElementSibling || slides[slides.length - 1];
   const currentDot = dotNav.querySelector(".current__slide");
   const targetIndex =
      dots.findIndex(dot => dot === currentDot.previousElementSibling) || 0;

   moveSlideTo(slider, currentSlide, prevSlide);
   updateDot(currentDot, currentDot.previousElementSibling);
   hideArrow(targetIndex);
});

nextButton.addEventListener("click", function () {
   const dots = [...dotNav.children];
   const currentSlide = slider.querySelector(".current__slide");
   const nextSlide = currentSlide.nextElementSibling || slides[0];
   const currentDot = dotNav.querySelector(".current__slide");
   const targetIndex =
      dots.findIndex(dot => dot === currentDot.nextElementSibling) || 0;
   moveSlideTo(slider, currentSlide, nextSlide);
   updateDot(currentDot, currentDot.nextElementSibling);
   hideArrow(targetIndex);
});

dotNav.addEventListener("click", e => {
   const dots = [...dotNav.children];
   const target = e.target.closest("button");
   if (!target) return;
   const currentSlide = slider.querySelector(".current__slide");
   const currentDot = dotNav.querySelector(".current__slide");
   const targetIndex = dots.findIndex(dot => dot === target);
   moveSlideTo(slider, currentSlide, slides[targetIndex]);
   updateDot(currentDot, dots[targetIndex]);
   hideArrow(targetIndex);
});
