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

const submit_otp = async (user_form) => {
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/transaction/complete",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user_form),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      // alert(result.errMessage);
      document.querySelector("#submit").innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
    } else {
      document.querySelector("#submit").innerHTML = "Success";
      document.querySelector(".errMessage").innerHTML = "";
      window.location.replace("/dashboard.html");
    }
  } catch (err) {
    console.log(err);
    document.querySelector("#submit").innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  //  alert("clicked")
  let otp = document.querySelector("#otp");
  if (!otp.value)
    return (document.querySelector("#otp").style.border = "2px solid red");

  submit_otp({
    token,
    user,
    otp: otp.value,
  });
};
document.querySelectorAll("input").forEach(
  (input) =>
    (input.onchange = () => {
      input.style.border = "2px solid #fff";
      //   document.querySelector("#pwd_error").innerHTML = "";
      //   document.querySelector("#pin_error").innerHTML = "";
      //   document.querySelector("#b_m_n").innerHTML = "";
      document.querySelector(".errMessage").innerHTML = "";
    })
);
