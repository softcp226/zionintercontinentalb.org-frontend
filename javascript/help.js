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

const submit_message = async (user_form) => {
  document.querySelector("#submit").innerHTML = "proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/customer/support",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user_form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";
      return;
    } else {
      document.querySelector("#submit").innerHTML = "Success";
      window.location.href = "/dashboard.html";
    }
  } catch (err) {
    // console.log(err);
    document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  let message = document.querySelector("#message");

  if (!message.value) return (message.style.border = "1.5px solid red");
  submit_message({ token, user, message: message.value });
};
document.querySelector("#message").onkeyup = () => {
  document.querySelector("#message").style.border = "1.5px solid #fff";
};
