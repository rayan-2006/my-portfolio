document.querySelector('a[href="#testimonials"]').addEventListener("click", e => {
  e.preventDefault();
  document
    .getElementById("testimonials")
    .scrollIntoView({ behavior: "smooth" });
});
