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

const loan_apply = async (user_form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/user/loan/apply",
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
    return
    }

    document.querySelector("#submit").innerHTML = "Success"; //remember you are supposed to navigate to loader screen here
    setTimeout(() => (window.location.href = "/loan-menu.html"), 1000);
  } catch (err) {
        document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector("#errMessage").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  // let account_number = document.querySelector("#account_number");
  let loan_amount = document.querySelector("#loan_amount");
  let loan_type = document.querySelector("#loan_type");
  let duration = document.querySelector("#duration");
  let loan_details = document.querySelector("#loan_details");

  // if (!account_number.value)
  //   return (account_number.style.border = "2px solid red");
   if (!loan_amount.value) return (loan_amount.style.border = "2px solid red");
   if (!loan_type.value) return (loan_type.style.border = "2px solid red");
   if (!duration.value) return (duration.style.border = "2px solid red");
   if (!loan_details.value) return (loan_details.style.border = "2px solid red");
  loan_apply({
    token,
    user,
    // account_number: account_number.value,
    loan_amount: loan_amount.value,
    loan_type: loan_type.value,
    duration: duration.value,
    loan_details: loan_details.value,
  });
};

document.querySelector("#loan_type").onchange = () => {
  document.querySelector("select").style.border = "1.5px solid #c4cad2";
};
document.querySelectorAll("input").forEach((input) => {
  input.onkeyup = () => (input.style.border = "1.5px solid #c4cad2");
});
document.querySelector("textarea").onkeyup = () => {
  document.querySelector("textarea").style.border = "1.5px solid #c4cad2";
};
