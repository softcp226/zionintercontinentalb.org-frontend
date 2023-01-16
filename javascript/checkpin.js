const setCookie = (token, user, is_active, deactivated_by_admin) => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `token=${token} ; ${expires}`;
  document.cookie = `user=${user} ; ${expires}`;
  document.cookie = `is_active=${is_active} ; ${expires}`;
  document.cookie = `deactivated_by_admin=${deactivated_by_admin} ; ${expires}`;
  //   window.location.replace("/login_pin.html");
  if (is_active != true) return window.location.replace("/inactive.html");
  window.location.replace("/dashboard.html");
};

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

let token_01 = getCookie("token_01");
let user = getCookie("user");

const submit_pin = async (pin) => {
  document.querySelector("#proceed").innerHTML = "Proccessing...";
  document.querySelector("#pin").style.border = "2px solid #fff";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/login/checkpin",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token_01, user, pin }),
      },
    );
    const result = await response.json();
    console.log(result);

    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#proceed").innerHTML = "Try again";
    } else {
      
      setCookie(
        result.message.token,
        result.message.user,
        result.message.is_active,
        result.message.deactivated_by_admin
      );
      document.querySelector("#proceed").innerHTML = "Success";
    }
  } catch (err) {
    console.log(err);
    document.querySelector("#proceed").innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

document.querySelector("#proceed").onclick = () => {
  event.preventDefault();
  let pin = document.querySelector("#pin");
  if (!pin.value) return (pin.style.border = "2px solid red");
  if (pin.value.length < 4)
    return (document.querySelector(".errMessage").innerHTML =
      "Please enter a valid pin greater than 4 characters long");
  submit_pin(pin.value);
};
