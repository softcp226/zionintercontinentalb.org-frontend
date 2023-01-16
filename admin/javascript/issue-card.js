const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
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
  window.location.replace("/admin");
}

const issue_card = async (form) => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/admin/issue_card",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";
      return;
    }
    document.querySelector("#submit").innerHTML = "Success";
    window.location.href = "/admin/card-menu.html";
  } catch (err) {
    document.querySelector("#submit").innerHTML = "Try again";
    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  let card_number = document.querySelector("#card_number");
  let card_type = document.querySelector("#card_type");
  let card_expiry_date = document.querySelector("#card_expiry_date");
  let card_cvv = document.querySelector("#card_cvv");
  let card_pin = document.querySelector("#card_pin");
  let border_color = "2px solid red";
  if (!card_number.value) return (card_number.style.border = border_color);
  if (!card_type.value) return (card_type.style.border = border_color);
  if (!card_expiry_date.value)
    return (card_expiry_date.style.border = border_color);
  if (!card_cvv.value) return (card_cvv.style.border = border_color);
  if (!card_pin.value) return (card_pin.style.border = border_color);

  issue_card({
    token: getCookie("admin_token"),
    user: getParam(),
    admin: getCookie("admin"),
    card_number: card_number.value,
    card_type: card_type.value,
    card_expiry_date: card_expiry_date.value,
    card_cvv: card_cvv.value,
    card_pin: card_pin.value,
  });
};
document.querySelectorAll("input").forEach((input) => {
  input.onchange = () => (input.style.border = "2px solid #fff");
});
document.querySelector("#card_type").onchange = () => {
  document.querySelector("#card_type").style.border = "2px solid #fff";
};

// document.querySelector("textarea").onchange = () => {
//   document.querySelector("textarea").style.border = "2px solid #fff";
// };
