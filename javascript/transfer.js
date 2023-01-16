const getCookie = (cname) => {
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
const fetch_transfer = async (form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/transact",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try again";
      return;
    }
    document.querySelector("#submit").innerHTML = "Success";
    window.location.replace("/verify_otp.html");
  } catch (err) {
    console.log(err);
    document.querySelector("#errMessage").innerHTML = err.message;
    document.querySelector("#submit").innerHTML = "Try again";
  }
};

const selector = (id) => {
  return document.querySelector(id);
};
let border = "2px solid red";
document.querySelector("#submit").onclick = () => {
  // let full_name = selector("#full_name");
  let phone = selector("#phone");
  let reciever_country = selector("#reciever_country");
  let address_line = selector("#address_line");
  let zip_code = selector("#zip_code");
  let swift_code = selector("#swift_code");
  let bank_name = selector("#bank_name");
  let account_name = selector("#account_name");
  let account_number = selector("#account_number");
  let amount = selector("#amount");
  let description = selector("#description");
  // if (!full_name.value) return (full_name.style.border = border);
  if (!reciever_country.value) return (reciever_country.style.border = border);
  if (!zip_code.value) return (zip_code.style.border = border);
  if (!bank_name.value) return (bank_name.style.border = border);
  if (!account_name.value) return (account_name.style.border = border);
  if (!account_number.value) return (account_number.style.border = border);
  if (!amount.value) return (amount.style.border = border);
  if (!description.value) return (description.style.border = border);
  fetch_transfer({
    token,
    user,
    // full_name: full_name.value,
    phone_number: phone.value || "null",
    country: reciever_country.value,
    address_line: address_line.value || "null",
    zip_code: zip_code.value,
    swift_code: swift_code.value || "null",
    bank_name: bank_name.value,
    account_name: account_name.value,
    account_number: account_number.value,
    amount: amount.value,
    description: description.value,
  });
};

document.querySelectorAll("input").forEach(
  (input) =>
    (input.onchange = () => {
      input.style.border = "2px solid #fff";
      //   document.querySelector("#pwd_error").innerHTML = "";
      //   document.querySelector("#pin_error").innerHTML = "";
      //   document.querySelector("#b_m_n").innerHTML = "";
      document.querySelector("#errMessage").innerHTML = "";
    })
);
document.querySelector("select").onchange = () => {
  document.querySelector("select").style.border = "2px solid #fff";
};
