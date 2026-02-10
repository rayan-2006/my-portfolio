Promise.all([
  fetch("assets/database/User.json", { method: "GET" }).then(res => res.json()),
  fetch("assets/database/comments.json", { method: "GET" }).then(res => res.json())
])
  .then(([users, comments]) => {
    const container = document.getElementById("testimonialsContainer")
    comments.forEach(comment => {
      const commentText = comment.commentText;
      console.log(commentText);

      const user = users.find(u => u.id == comment.userId);
      console.log(user);

      const userProfile = document.createElement("div");
      const MainBox = document.createElement("div");
      const span = document.createElement("span");
      const img = document.createElement("img");
      const h4 = document.createElement("h4");
      const p = document.createElement("p");

      userProfile.classList.add("user-profile");
      MainBox.classList.add("Testimonials-box");

      p.textContent = commentText;
      span.textContent = `“`;

      img.src = user.image;
      img.alt = `${user.firstName} ${user.lastName}`;
      h4.textContent = `${user.firstName} ${user.lastName}`;

      userProfile.append(img, h4);
      MainBox.append(p, userProfile, span);
      container.appendChild(MainBox);
    });

    // کپی گرفتن از همه باکس‌ها
    const boxes = Array.from(container.children);
    boxes.forEach(box => {
      const clone = box.cloneNode(true);
      container.appendChild(clone);
    });

    // عرض نصف محتوا (نسخه اصلی)
    const halfScrollWidth = container.x / 2;

    // کنترل لوپ
    container.addEventListener("scroll", () => {
      if (container.scrollLeft >= halfScrollWidth) {
        container.scrollLeft = 0;
      }
    });




    const speed = 0.5; // هر چی بیشتر، سریع‌تر

    function autoScroll() {
      container.scrollLeft += speed;

      // لوپ (وقتی رسیدی آخر، برگرد به اول)
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      requestAnimationFrame(autoScroll);
    }

    autoScroll();
  })
  .catch(err => console.error("Error:", err));