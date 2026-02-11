class ToastManager {
  constructor() {
    this.container = document.getElementById("toastContainer");
    if (!this.container) {
      throw new Error("toastContainer element not found");
    }
  }
  show(message, type = "info", duration = 4000) {
    const toast = document.createElement("div");
    toast.className = `Message-box ${type}`;

    toast.innerHTML = `
      <div class="message-text">
        <p>${message}</p>
        <div class="bar"></div>
      </div>
      <button class="close-message" aria-label="Close">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    this.container.prepend(toast);

    let isRemoved = false;

    /* ---------- ENTER ---------- */
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    /* ---------- PROGRESS BAR ---------- */
    const bar = toast.querySelector(".bar");
    bar.style.width = "100%";

    requestAnimationFrame(() => {
      bar.style.transition = `width ${duration}ms linear`;
      bar.style.width = "0%";
    });

    /* ---------- REMOVE ---------- */
    const removeToast = () => {
      if (isRemoved) return;
      isRemoved = true;

      toast.classList.remove("show");
      toast.classList.add("hide");

      let removedByEvent = false;

      const onEnd = (e) => {
        if (e.target !== toast) return;
        removedByEvent = true;
        toast.remove();
      };

      toast.addEventListener("transitionend", onEnd, { once: true });

      // fallback (اگه transitionend نیومد)
      setTimeout(() => {
        if (!removedByEvent) toast.remove();
      }, 450);
    };

    toast.querySelector(".close-message").addEventListener("click", removeToast);
    setTimeout(removeToast, duration);
  }
}
const toast = new ToastManager();
document.getElementById("userForm").addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const formFN = document.getElementById("formFN");
    const formLN = document.getElementById("formLN");
    const formPH = document.getElementById("formPH");
    const formEM = document.getElementById("formEM");
    const formAS = document.getElementById("formAS");
    // Basic validation for required fields
    if (!formFN.value || !formLN.value || !formEM.value) {
      toast.show("Please enter the required information.", "info");
      return;
    }

    // Validate email format using simple regex
    if (!/\S+@\S+\.\S+/.test(formEM.value)) {
      toast.show("The email format is incorrect.", "info");
      return;
    }
    var add = document.getElementById("addUser");
    add.innerText = "Loading...";
    add.disabled = true;
    add.style.cursor = 'not-allowed';
    const ReadingDataRes = await fetch("https://jsonplaceholder.typicode.com/users", { method: 'GET' });
    if (!ReadingDataRes.ok) {
      throw new Error(`HTTP_ERROR_${ReadingDataRes.status}`);
    }
    const ReadingData = await ReadingDataRes.json();


    // Check if email already exists
    if (ReadingData.some(user => user.email === formEM.value)) {
      toast.show("This email has already been used.", "info");
      return;
    }
    if (ReadingData.some(user => user.phone === formPH.value)) {
      toast.show("This phone number has already been used.", "info");
      return;
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name: `${formFN.value.trim()} ${formLN.value.trim()}`,
        username: `${formFN.value}-${formLN.value}`,
        address: {
          street: formAS.value,
          suite: null,
          city: null,
          zipcode: null,
          geo: {
            lat: null,
            lng: null
          }
        },
        phone: formPH.value,
        website: null,
        email: formEM.value,
        company: {
          name: null,
          catchPhrase: null,
          bs: null
        }
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    toast.show("The operation was successful.", "success");
    e.target.reset();
  } catch (err) {
    if (err instanceof TypeError) {
      console.error("Network error:", err);
      toast.show(
        "No internet connection or the server is unreachable.",
        "error"
      );
    } else if (typeof err.message === "string" && err.message.startsWith("HTTP_ERROR_")) {
      const status = Number(err.message.split("_")[2]);

      console.error("Server responded with status:", status);

      if (status >= 500) {
        toast.show("Server error. Please try again later.", "error");
      } else {
        toast.show("Request failed. Please check your data.", "error");
      }
    } else if (err instanceof SyntaxError) {
      console.error("Invalid JSON from server:", err);
      toast.show(
        "Received invalid data from server.",
        "error"
      );
    } else if (err instanceof ReferenceError) {
      console.error("DOM or variable error:", err);
      toast.show(
        "An unexpected error occurred.",
        "error"
      );
    } else if (err.message === "EMAIL_ALREADY_EXISTS") {
      toast.show("This email is already registered.", "info");
    } else {
      console.error("Unknown error:", err);
      toast.show(
        "Something went wrong. Please try again.",
        "error"
      );
    }
  } finally {
    add.innerText = `Add User`;
    add.disabled = false;
    add.style.cursor = 'pointer';
  }
})
const show = document.getElementById("ShowUser");
show.addEventListener("click", async () => {
  try {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = ""
    show.innerText = "Loading...";
    show.disabled = true;
    show.style.cursor = 'not-allowed';
    userTable.style.display = 'table';
    for (let index = 0; index < 5; index++) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td><div class="Skeleton-Screen"></div></td>
      <td><div class="Skeleton-Screen"></div></td>
      <td><div class="Skeleton-Screen"></div></td>
      <td><div class="Skeleton-Screen"></div></td>
      <td><div class="Skeleton-Screen"></div></td>
      <td><div class="Skeleton-Screen"></div></td>
      `
      tbody.appendChild(tr)
    }

    const ReadingDataRes = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: "GET"
    });
    if (!ReadingDataRes.ok) {
      throw new Error(`HTTP_ERROR_${ReadingDataRes.status}`);
    }
    const ReadingData = await ReadingDataRes.json();
    tbody.innerHTML = ""
    ReadingData.forEach((user, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
      <td>${user.address.street}, ${user.address.suite}<br>
    ${user.address.city} ${user.address.zipcode}</td>
      <td><button class="delete-btn" data-id="${user.id}">Delete</button>
      <button class="edit-btn" data-id="${user.id}"
              data-firstname="${user.name.split(' ')[0] || ''}"
              data-lastname="${user.name.split(' ').slice(1).join(' ') || ''}"
              data-phone="${user.phone || ''}"
              data-email="${user.email || ''}"
              data-address="${user.address.street || ''} ${user.address.suite || ''}
${user.address.city || ''} ${user.address.zipcode || ''}">Edit</button></td>
      `
      tbody.appendChild(tr)
    });

  } catch (err) {
    let message = ""
    if (err instanceof ReferenceError) {
      console.error("DOM or variable error:", err);
      toast.show(
        "An unexpected error occurred.",
        "error"
      );
      message = "An unexpected error occurred."
    } else if (err instanceof TypeError) {
      console.error("Network error:", err);
      if (err.message.includes("read properties")) {
        toast.show("Invalid data received from server.", "error");
        message = "Invalid data receivde form server"
      } else if (err.message.includes("set properties")) {
        toast.show("Page structure error occurred.", "error");
        message = "Page structure error occurred"
      } else {
        toast.show(
          "No internet connection or the server is unreachable.",
          "error"
        );
        message = "No internet connection or the server is unreachable."
      }
    } else if (typeof err.message === "string" && err.message.startsWith("HTTP_ERROR_")) {
      const status = Number(err.message.split("_")[2]);

      console.error("Server responded with status:", status);

      if (status >= 500) {
        toast.show("Server error. Please try again later.", "error");
        message = "Server error. Please try again later."
      } else {
        toast.show("Request failed. Please check your data.", "error");
        message = "Request failed. Please check your date."
      }
    } else if (err instanceof SyntaxError) {
      console.error("Invalid JSON from server:", err);
      toast.show(
        "Received invalid data from server.",
        "error"
      );
      message = "Received invalid date form server"
    }
    tbody.innerHTML = `
    <tr>
      <td colspan="6" class="text-center error-message">
        <h1>ERROR!</h1>
        <p>${message}</p>
      </td>
    </tr>
  `;
    tbody.classList.add("error-tr");
    toast.show(`${message}`, "error");
  } finally {
    show.innerText = "Show User";
    show.disabled = false;
    show.style.cursor = 'pointer';
  }
});
tbody.addEventListener("click", async (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".edit-btn");
  if (deleteBtn) {
    const userId = deleteBtn.dataset.id;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP_ERROR_${response.status}`);
      }
      toast.show("User deleted successfully.", "success");
      e.target.closest("tr").remove();
    } catch (err) {
      if (typeof err.message === "string" && err.message.startsWith("HTTP_ERROR_")) {
        const status = Number(err.message.split("_")[2]);
        console.error("Server responded with status:", status);
        if (status >= 500) {
          toast.show("Server error. Please try again later.", "error");
        } else {
          toast.show("Request failed. Please check your data.", "error");
        }
      }
      else if (err instanceof TypeError) {
        console.error("Network error:", err);
        toast.show(
          "No internet connection or the server is unreachable.",
          "error"
        );
      }
    }
  } else if (editBtn) {

    const modal = document.getElementById("modal");

    const firstNameForm = document.getElementById("formFNetite");
    const lastNameForm = document.getElementById("formLNetite");
    const phoneForm = document.getElementById("formPHetite");
    const emailForm = document.getElementById("formEMetite");
    const addressForm = document.getElementById("formASetite");
    const editForm = document.getElementById("EditeList");

    /* ---------- OPEN MODAL ---------- */
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";

    /* ---------- FILL FORM ---------- */
    firstNameForm.value = editBtn.dataset.firstname || "";
    lastNameForm.value = editBtn.dataset.lastname || "";
    phoneForm.value = editBtn.dataset.phone || "";
    emailForm.value = editBtn.dataset.email || "";
    addressForm.value = editBtn.dataset.address || "";

    const userId = editBtn.dataset.id;

    /* ---------- PREVENT MULTIPLE SUBMIT LISTENERS ---------- */
    editForm.onsubmit = async function (e) {
      e.preventDefault();

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              name: `${firstNameForm.value} ${lastNameForm.value}`,
              phone: phoneForm.value,
              email: emailForm.value,
              address: {
                street: addressForm.value,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP_ERROR_${response.status}`);
        }

        toast.show("User edited successfully.", "success");

        /* ---------- CLOSE MODAL ---------- */
        modal.style.opacity = "0";
        modal.style.pointerEvents = "none";

      } catch (err) {

        if (err instanceof TypeError) {
          console.error("Network error:", err);
          toast.show(
            "No internet connection or server is unreachable.",
            "error"
          );

        } else if (
          typeof err.message === "string" &&
          err.message.startsWith("HTTP_ERROR_")
        ) {
          const status = Number(err.message.split("_")[2]);

          console.error("Server error:", status);

          if (status >= 500) {
            toast.show("Server error. Please try again later.", "error");
          } else {
            toast.show("Edit failed. Please check your data.", "error");
          }

        } else {
          console.error("Unknown error:", err);
          toast.show("Something went wrong.", "error");
        }
      }
    };
  }
}
);