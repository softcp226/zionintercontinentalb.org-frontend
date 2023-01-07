const setCookie = (token, admin) => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `admin_token=${token} ; ${expires}`;
  document.cookie = `admin=${admin} ; ${expires}`;
  window.location.replace("/admin/dashboard.html");
};

const check_user = () => {};

const fetch_admin = async (admin_form) => {
  document.querySelector("#login").innerHTML = "Proccessing...";
  document.querySelector(".errMessage").innerHTML = "";

  // console.log(admin_form);
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/admin/login",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(admin_form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#login").innerHTML = "Try again";
    } else {
      // const [token_01, user, is_active] = ;
      setCookie(
        result.message.token,
        result.message.admin,
      );
      document.querySelector("#login").innerHTML = "Success";
    }
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
    document.querySelector("#login").innerHTML = "Try again";

    console.log(err);
  }
};

document.querySelector("#login").onclick = (event) => {
  event.preventDefault();
  let user_name = document.querySelector("#user_name");
  let password = document.querySelector("#password");

  if (!user_name.value) return (user_name.style.border = "2px solid red");
  if (!password.value) return (password.style.border = "2px solid red");
  fetch_admin({ user_name: user_name.value, password: password.value });
};

document.querySelector("#user_name").onkeyup = (input) => {
  document.querySelector("#user_name").style.border = "2px solid #fff";
  document.querySelector("#user_name").value = document
    .querySelector("#user_name")
    .value.replace(/\s/g, "");
};
document.querySelector("#password").onkeyup = () => {
  document.querySelector("#password").style.border = "2px solid #fff";
};

