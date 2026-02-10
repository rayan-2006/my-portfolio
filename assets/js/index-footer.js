// EmailJS initialization
emailjs.init("YOUR_USER_ID");

// Form submit
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(function () {
      alert("Message sent successfully!");
    }, function (error) {
      alert("Failed to send message. Error: " + JSON.stringify(error));
    });
});

function showToast(type, message) {
  const toast = document.getElementById("toast");

  toast.className = "toast"; // reset
  toast.classList.add(type); // success or error
  toast.textContent = message;

  toast.classList.add("show");

  // بعد از 3 ثانیه حذف میشه
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
