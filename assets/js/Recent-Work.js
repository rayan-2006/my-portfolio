fetch('assets/database/blogs.json', { method: "GET" })
  .then(response => response.json())
  .then(blogs => {

    const track = document.getElementById("RecentWorkTrack");
    const btnLeft = document.querySelector(".flash-left");
    const btnRight = document.querySelector(".flash-right");

    // ساخت کارت‌ها
    blogs.forEach(blog => {
      const RecentWorkScrollBox = document.createElement("div");
      const InformationBox = document.createElement("div");
      const Button = document.createElement("button");
      const img = document.createElement("img");
      const h4 = document.createElement("h4");
      const p = document.createElement("p");
      const i = document.createElement("i");
      const a = document.createElement("a");

      RecentWorkScrollBox.classList.add("Recent-Work-scroll-box");
      i.classList.add("fa-solid", "fa-chevron-right");
      Button.classList.add("smal-btn");
      InformationBox.classList.add("InformationBox");

      const maxLen1 = 30;
      const maxLen2 = 170;

      let title = blog.title;
      let shortIntro = blog.shortIntro;

      if (typeof blog.title === "string" && blog.title.length > maxLen1) {
        title = `${blog.title.slice(0, maxLen1)} ...`;
      }

      if (typeof blog.shortIntro === "string" && blog.shortIntro.length > maxLen2) {
        shortIntro = `${blog.shortIntro.slice(0, maxLen2)} ...`;
      }

      img.src = blog.featuredImage;
      img.alt = blog.title;

      h4.textContent = title;
      p.textContent = shortIntro;

      Button.textContent = `Know more`;
      Button.appendChild(i);
      a.appendChild(Button);
      InformationBox.append(h4, p, a);
      RecentWorkScrollBox.append(img, InformationBox);
      track.appendChild(RecentWorkScrollBox);
      console.log(blog);

    });

    // ============== اسلایدر ===========

    //   let isAnimating = false;
    //   const duration = 500;

    //   function getCardWidth() {
    //     const card = track.children[0];
    //     const gap = parseFloat(getComputedStyle(track).gap) || 0;
    //     return card.offsetWidth + gap;
    //   }

    //   /* 👉 حرکت به راست (واقعی) */
    //   btnRight.addEventListener("click", () => {
    //     if (isAnimating) return;
    //     isAnimating = true;

    //     const moveX = getCardWidth();

    //     // انیمیشن از 0 به -moveX (یعنی کارت‌ها به چپ میرن)
    //     track.style.transition = `transform ${duration}ms ease`;
    //     track.style.transform = `translateX(-${moveX}px)`;

    //     track.addEventListener("transitionend", function handler(e) {
    //       if (e.propertyName !== "transform") return;
    //       track.removeEventListener("transitionend", handler);

    //       // بعد از پایان انیمیشن، کارت اول رو می‌بریم ته
    //       track.appendChild(track.firstElementChild);

    //       // ریست بدون اینکه کاربر ببینه
    //       track.style.transition = "none";
    //       track.style.transform = "translateX(0)";
    //       track.offsetHeight; // force reflow

    //       isAnimating = false;
    //     });
    //   });

    //   /* 👈 حرکت به چپ */
    //   btnLeft.addEventListener("click", () => {
    //     if (isAnimating) return;
    //     isAnimating = true;

    //     const moveX = getCardWidth();

    //     // قبل از انیمیشن کارت آخر رو می‌بریم جلو
    //     track.insertBefore(track.lastElementChild, track.firstElementChild);

    //     // بدون transition می‌ریم به -moveX
    //     track.style.transition = "none";
    //     track.style.transform = `translateX(-${moveX}px)`;
    //     track.offsetHeight; // force reflow

    //     // حالا انیمیشن میاد به 0
    //     track.style.transition = `transform ${duration}ms ease`;
    //     track.style.transform = "translateX(0)";

    //     track.addEventListener("transitionend", function handler(e) {
    //       if (e.propertyName !== "transform") return;
    //       track.removeEventListener("transitionend", handler);
    //       isAnimating = false;
    //     });
    //   });

  })
  .catch(err => {
    console.error("Error =>", err);
  });
