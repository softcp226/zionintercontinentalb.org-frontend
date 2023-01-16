const apply_forcard = async (user_form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";

  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/card/apply",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user_form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";
      return;
    }
    document.querySelector("#submit").innerHTML = "Success"; //remember you are supposed to navigate to loader screen here
    setTimeout(() => (window.location.href = "/dashboard.html"), 1000);
  } catch (err) {
    console.log(err);
    document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector("#errMessage").innerHTML = err.message;
  }
};

let getCookie = (cname) => {
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
};
let token = getCookie("token");
let user = getCookie("user");

document.querySelector("#submit").onclick = () => {
  let account_number = document.querySelector("#account_number");
  let card_type = document.querySelector("#card_type");
  let note_oncard = document.querySelector("#note");

  if (!account_number.value)
    return (account_number.style.border = "2px solid red");
  if (!card_type.value) return (card_type.style.border = "2px solid red");
  if (!note_oncard.value) return (note_oncard.style.border = "2px solid red");
  apply_forcard({
    token,
    user,
    account_number: account_number.value,
    card_type: card_type.value,
    card_pin: note_oncard.value,
  });
};

document.querySelector("input").onchange = () => {
  document.querySelector("input").style.border = "2px solid #fff";
};
document.querySelector("#card_type").onchange = () => {
  document.querySelector("#card_type").style.border = "2px solid #fff";
};
document.querySelector("#note").onchange = () => {
  document.querySelector("#note").style.border = "2px solid #fff";
};
