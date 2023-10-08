async function loginApi(email, password, rememberMe) {
  try {
    const response = await fetch(
      `http://localhost:3000/profile?email=${email}&password=${password}`
    );
    const profileArray = await response.json();
    const profile = profileArray[0];
    if (profile) {
      if (rememberMe) {
        localStorage.setItem(
          "credentials",
          JSON.stringify({ email, password, rememberMe })
        );
      } else {
        localStorage.removeItem("credentials");
      }
      return profile;
    } else {
      console.error("Authentication failed");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function fetchProfileDataApi() {
  try {
    const response = await fetch("http://localhost:3000/profile");
    const profileArray = await response.json();
    const profile = profileArray[0];
    if (profile) {
      return profile;
    } else {
      console.error("Failed to fetch profile data");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export { loginApi, fetchProfileDataApi };
