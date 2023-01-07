const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

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
let token = getCookie("admin_token");
let admin = getCookie("admin");
const fetch_admin_transfer = async (form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/user/debit/credit_user",
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
    window.location.replace("/admin/account-info.html");
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
  let transaction_type = document.querySelector("#transaction_type");
  let amount = document.querySelector("#amount");
  let sender_02 = document.querySelector("#sender_02");
  let transaction_date = document.querySelector("#transdt");
  let description = document.querySelector("#description");

  if (!transaction_type.value) return (transaction_type.style.border = border);
  if (!amount.value) return (amount.style.border = border);
  if (!sender_02.value) return (sender_02.style.border = border);
  if (!transaction_date.value) return (transaction_date.style.border = border);
  if (!description.value) return (description.style.border = border);
  fetch_admin_transfer({
    token,
    admin,
    account_number: getParam(),
    credit: transaction_type.value == "credit-user" ? true : false,
    amount: amount.value,
    sender_02: sender_02.value,
    transaction_date: transaction_date.value,
    description: description.value,
  });
  //   fetch_transfer({
  //     token,
  //     user,
  //     full_name: full_name.value,
  //     phone_number: phone.value || null,
  //     country: reciever_country.value,
  //     address_line: address_line.value || null,
  //     zip_code: zip_code.value,
  //     swift_code: swift_code.value || "null",
  //     bank_name: bank_name.value,
  //     account_name: account_name.value,
  //     account_number: account_number.value,
  //     amount: amount.value,
  //     description: description.value,
  //   });
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
