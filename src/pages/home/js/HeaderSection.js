import { fetchProfileDataApi } from "/src/api/profile.js";
const profileMessage = document.querySelector(".profile__message");
const profileName = document.querySelector(".profile__name");

function getTimeOfDay() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

profileMessage.textContent = getTimeOfDay();

const profile = await fetchProfileDataApi();
profileName.textContent = profile.name;
