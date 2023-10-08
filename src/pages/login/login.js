import { loginApi } from "/src/api/profile.js";
const emailInput = document.querySelector(".email__box .input");
const passwordInput = document.querySelector(".password__box .input");
const signinButton = document.querySelector(".btn__singin");
const rememberMeCheckbox = document.querySelector(
  ".check__container .checkbox_input"
);

const storedCredentials = JSON.parse(localStorage.getItem("credentials"));
if (storedCredentials && storedCredentials.rememberMe) {
  emailInput.value = storedCredentials.email;
  passwordInput.value = storedCredentials.password;
  rememberMeCheckbox.checked = true;
}

signinButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const rememberMe = rememberMeCheckbox.checked;

  try {
    const profile = await loginApi(email, password, rememberMe);
    if (profile) {
      if (rememberMe) {
        localStorage.setItem(
          "credentials",
          JSON.stringify({ email, password, rememberMe })
        );
      } else {
        localStorage.removeItem("credentials");
      }
      window.location.href = "/src/pages/home"; // Replace with the actual URL
    } else {
      //TODO: display toast
      console.error("Authentication failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
