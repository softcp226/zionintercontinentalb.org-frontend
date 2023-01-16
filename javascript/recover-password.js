const fetch_recover_password = async (user_name) => {
  //   let token = getCookie("token");
  //   let user = getCookie("user");
  document.querySelector("#submit").innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/recover_password",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user_name }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      document.querySelector("#submit").innerHTML = "Try Again";
      return;
    }
    document.querySelector("#submit").innerHTML = "Success";
    window.location.href = "/success.html";
    // setText(result.message);
  } catch (err) {
    document.querySelector("#submit").innerHTML = "Try Again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

document.querySelector("#submit").onclick = () => {
  let user_name = document.querySelector("#user_name");
  if (!user_name.value) return (user_name.style.border = "2px solid red");
  fetch_recover_password(user_name.value);
};
document.querySelector("input").onkeyup = () => {
  document.querySelector("input").style.border = "2px solid #fff";
};
