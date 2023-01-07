const clearForm = () => {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));

  document.querySelector("select").value = "";
  document.querySelector("textarea").value = "";
};

const submitForm = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  country,
  message
) => {
  document.querySelector("button").innerHTML = "proccessing...";
  document.querySelector("#errMessage").innerHTML = "";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/submit/appointment",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          country,
          message,
        }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      document.querySelector("#errMessage").innerHTML = result.errMessage;
      document.querySelector("button").innerHTML = "try again";
      return;
    }
    document.querySelector("button").innerHTML = "Success";
    clearForm();
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    document.querySelector("#errMessage").innerHTML = error.message;
    document.querySelector("button").innerHTML = "Try again";
  }
};

document.querySelector("button").onclick = () => {
  let firstName = document.querySelector("#first-name");
  let lastName = document.querySelector("#last-name");
  let email = document.querySelector("#Email");
  let phoneNumber = document.querySelector("#phoneNumber");
  let country = document.querySelector("select");
  let message = document.querySelector("#message");

  if (!firstName.value) return (firstName.style.border = "2px solid red");
  if (!lastName.value) return (lastName.style.border = "2px solid red");
  if (!email.value) return (email.style.border = "2px solid red");
  if (!phoneNumber.value) return (phoneNumber.style.border = "2px solid red");
  if (!country.value) return (country.style.border = "2px solid red");
  if (!message.value) return (message.style.border = "2px solid red");
  submitForm(
    firstName.value,
    lastName.value,
    email.value,
    phoneNumber.value,
    country.value,
    message.value
  );
};

document.querySelectorAll("input").forEach(
  (input) =>
    (input.onkeyup = () => {
      input.style.border = "2px solid gray";
    })
);
document.querySelector("select").onchange = () =>
  (document.querySelector("select").style.border = "2px solid gray");
document.querySelector("textarea").onkeyup = () =>
  (document.querySelector("textarea").style.border = "2px solid gray");
