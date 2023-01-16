function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/login.html";
}
const user = getCookie("user");
const token = getCookie("token");

const change_password = async (user_form) => {
  document.querySelector("#submit").innerHTML = "proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/password/change",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user_form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".pin_error").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";
      return;
    } else {
      document.querySelector("#submit").innerHTML = "Success";
      window.location.href = "/dashboard.html";
    }
  } catch (err) {
    // console.log(err);
    document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector(".pin_error").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  let new_pwd = document.querySelector("#new_pwd");
  let confirm_new_pwd = document.querySelector("#confirm_new_pwd");
  let new_pin = document.querySelector("#new_pin");
  let confirm_new_pin = document.querySelector("#confirm_new_pin");

  if (!new_pwd.value) return (new_pwd.style.border = "1.5px solid red");
  if (!confirm_new_pwd.value)
    return (confirm_new_pwd.style.border = "1.5px solid red");
  if (new_pwd.value != confirm_new_pwd.value)
    return (document.querySelector(".pwd_error").innerHTML =
      "password must match");
  if (new_pwd.value.length < 8)
    return (document.querySelector(".pwd_error").innerHTML =
      "password must be atleast 8 characters long");

  if (!new_pin.value) return (new_pin.style.border = "1.5px solid red");
  if (!confirm_new_pin.value)
    return (confirm_new_pin.style.border = "1.5px solid red");
  if (new_pin.value != confirm_new_pin.value)
    return (document.querySelector(".pin_error").innerHTML = "pin must match");
  if (new_pin.value.length < 4)
    return (document.querySelector(".pin_error").innerHTML =
      "pin must be atleast 4 characters long");
  if (!+new_pin.value)
    return (document.querySelector(".pin_error").innerHTML =
      "pin must be a number");
  change_password({ token, user, password: new_pwd.value, pin: new_pin.value });
  //   if (!message.value) return (message.style.border = "1.5px solid red");
  //   submit_message({ token, user, message: message.value });
  // };
  // document.querySelector("#message").onkeyup = () => {
  //   document.querySelector("#message").style.border = "1.5px solid #fff";
};

document.querySelectorAll("input").forEach(
  (input) =>
    (input.onchange = () => {
      input.style.border = "2px solid #fff";
      document.querySelector(".pwd_error").innerHTML = "";
      document.querySelector(".pin_error").innerHTML = "";
    })
);
