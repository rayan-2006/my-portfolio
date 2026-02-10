/**
 * User Management Application
 * Created by Rayan Abdi
 * GitHub: https://github.com/rayan-2006
 * 
 * This script handles a simple user registration form with modal-based display and search functionality.
 * Features:
 * - Add new users with basic validation (required fields + email format + uniqueness)
 * - Show all registered users in a modal
 * - Search users by email or name using dynamic forms inside modal
 * - Check if all users are employed
 * - Check if at least one male user exists
 */

const allUsersEmployed = document.getElementById("allUsersEmployedBtn");
const findUserByEmail = document.getElementById("findUserByEmailBtn");
const findUserByName = document.getElementById("findUserByNameBtn");
const showAllUsers = document.getElementById("showAllUsersBtn");
const modalContent = document.getElementById("Information-box");
const hasMaleUser = document.getElementById("hasMaleUserBtn");
const firstname = document.getElementById("firstName");
const addUser = document.getElementById("addUserBtn");
const lastname = document.getElementById("lastName");
const form = document.getElementById("userForm");
const gender = document.getElementById("gender");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const modal = document.getElementById("modal");
const job = document.getElementById("job");

let people = [];


class UserLi {
  constructor(person, index) {
    this.person = person;
    this.index = index;
  }

  build() {
    const li = document.createElement("li");


    li.innerText = `${this.index + 1}. ${this.person.name} ${this.person.lastname}
ایمیل: ${this.person.email}
شغل: ${this.person.job || "---"}
شماره تماس: ${this.person.phone || "---"}
جنسیت: ${this.person.gender || "---"}`;

    return li;
  }
}

// Handle form submission to add a new user
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newperson = {
    name: firstname.value.trim(),
    lastname: lastname.value.trim(),
    email: email.value.trim(),
    job: job.value.trim(),
    phone: phone.value.trim(),
    gender: gender.value,
  };

  // Basic validation for required fields
  if (!newperson.name || !newperson.lastname || !newperson.email) {
    alert("لطفا تمام فیلد های الزامی را پر کنید");
    return;
  }

  // Validate email format using simple regex
  if (!/\S+@\S+\.\S+/.test(newperson.email)) {
    alert("لطفا یک ایمیل معتبر وارد کنید");
    return;
  }

  // Check if email already exists
  const emailExists = people.some(rayan => rayan.email === newperson.email);
  if (emailExists) {
    alert("این ایمیل قبلاً ثبت شده است");
    return;
  }

  people.push(newperson);
  form.reset();
  alert("کاربر با موفقیت اضافه شد!");

  console.log(people);

});

// Show all registered users in modal
showAllUsers.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری ثبت نشده است</h3>`;
  } else {
    modalContent.innerHTML = `<h3>لیست کاربران</h3>`;

    const list = document.createElement("ol");

    // Loop through all users and create list items
    people.forEach((person, index) => {
      const userLi = new UserLi(person, index);
      list.appendChild(userLi.build());
    });

    modalContent.appendChild(list);
  }

  modal.style.display = "flex";
});

// Search user by email with dynamic form in modal
findUserByEmail.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری وارد نشده است</h3>`;
  } else {
    modalContent.innerHTML = `<h3>ایمیل خود را جستجو کنید...</h3>`;

    // Create search form dynamically
    const SearchForm = document.createElement("form");

    const SearchFormIput = document.createElement("input");
    SearchFormIput.type = "email";
    SearchFormIput.placeholder = "ایمیل رو اینجا وارد کن...";
    SearchFormIput.required = true;

    const SearchFormBTN = document.createElement("button");
    SearchFormBTN.innerText = `جستجو کنید`;
    SearchFormBTN.type = "submit";

    SearchForm.classList.add("SearchForm");
    SearchFormBTN.classList.add("SearchFormBTN");
    SearchFormIput.classList.add("finput");

    SearchForm.appendChild(SearchFormIput);
    SearchForm.appendChild(SearchFormBTN);

    modalContent.appendChild(SearchForm);

    // Handle form submission for search
    SearchForm.addEventListener("submit", e => {
      e.preventDefault();
      const emailToFind = SearchFormIput.value.trim();

      // Search for matching user(s)
      const person = people.find(FindUser => FindUser.email === emailToFind.trim());

      if (person) {
        modalContent.innerHTML = "";
        modalContent.innerHTML = `<h3>کاربر یافت شد</h3>`;
        const list = document.createElement("ol");
        const userLi = new UserLi(person, 0);
        list.appendChild(userLi.build());
        modalContent.appendChild(list);
      } else {
        modalContent.innerHTML = `<h3>کاربری با این ایمیل پیدا نشد</h3>`;
      }
    });
  }

  modal.style.display = "flex";
});

// Search user by name with dynamic form in modal
findUserByName.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری وارد نشده است</h3>`;
  } else {
    modalContent.innerHTML = `<h3>نام کاربر مورد نظر را وارد کنید</h3>`;

    // Create search form dynamically
    const SearchForm = document.createElement("form");

    const SearchFormIput = document.createElement("input");
    SearchFormIput.type = "text";
    SearchFormIput.placeholder = "نام کاربر خود را وارد کنید ...";
    SearchFormIput.required = true;

    const SearchFormBTN = document.createElement("button");
    SearchFormBTN.innerText = "جستجو کنید... ";
    SearchFormBTN.type = "submit";

    SearchForm.classList.add("SearchForm");
    SearchFormIput.classList.add("finput");
    SearchFormBTN.classList.add("SearchFormBTN");

    SearchForm.appendChild(SearchFormIput);
    SearchForm.appendChild(SearchFormBTN);

    modalContent.appendChild(SearchForm);

    // Handle form submission for search
    SearchForm.addEventListener("submit", e => {
      e.preventDefault();
      const UserNameToFind = SearchFormIput.value.trim();

      const list = document.createElement("ol");

      // Search for matching user(s)
      const person = people.filter(UN => UN.name === UserNameToFind.trim());

      if (person.length > 0) {
        modalContent.innerHTML = "";
        modalContent.innerHTML = `<h3>کاربر یافت شد</h3>`;

        person.forEach((Rayan, index) => {
          const userLi = new UserLi(Rayan, index);
          list.appendChild(userLi.build());

          modalContent.appendChild(list);
        })
      } else if (people.length === 0) {
        modalContent.innerHTML = `<h3>کاربری با این نام پیدا نشد</h3>`;
      }
    })

  }
  modal.style.display = "flex"
});


// Check if all users are employed
allUsersEmployed.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری وارد نشد است</h3>`
  } else {
    // const AllHaveJob = people.every(rayan => rayan.job.trim() !== "");
    const AllHaveJob = people.some(rayan => rayan.job.trim() !== "");
    console.log(AllHaveJob);

    if (AllHaveJob) {
      const list = document.createElement("ol");

      const OnlyHaveJob = people.filter(rayan => rayan.job.trim());

      OnlyHaveJob.forEach((person, index) => {

        modalContent.innerHTML = `<h3>${index + 1} کاربر شاغل هستند</h3>`

        const userLi = new UserLi(person, index);
        list.appendChild(userLi.build());
        modalContent.appendChild(list);


      });
    } else {
      modalContent.innerHTML = `<h3>هیچ کدام از کاربر ها شاغل نیستند</h3>`
    }
  }
  modal.style.display = "flex";
});

// Check if at least one male user exists
hasMaleUser.addEventListener("click", () => {
  modalContent.innerHTML = "";

  if (people.length === 0) {
    modalContent.innerHTML = `<h3>هنوز کاربری وارد نشده است</h3>`;
  } else {
    const hasMale = people.some(rayan => rayan.gender === "male");

    if (hasMale) {
      modalContent.innerHTML = "";

      const list = document.createElement("ol");

      const gender = people.filter(rayan => rayan.gender.trim() === "male");

      gender.forEach((person, index) => {
        modalContent.innerHTML = "";

        modalContent.innerHTML = `<h3>حداقل ${index + 1} مرد وجو دارد</h3>`

        const userLi = new UserLi(person, index);
        list.appendChild(userLi.build());
        modalContent.appendChild(list);
      });
    } else {
      modalContent.innerHTML = `<h3>هیچ کاربر مردی وجود ندارد</h3>`;
    }
  }
  modal.style.display = "flex";
});

// Close modal when clicking outside content area
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});