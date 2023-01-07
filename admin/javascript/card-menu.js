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

const fetch_delete_card_application = async (DelBtn, card_application) => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  DelBtn.innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/admin/card_application/delete",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, card_application }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
      DelBtn.innerHTML = "Try again";
      return;
    }
    //   return (document.querySelector(".errMessage").innerHTML =
    //     result.errMessage);
    // setText(result.message);
    DelBtn.innerHTML = "success";
    alert(result.message);
    window.location.href = "/admin/card-menu.html";
  } catch (err) {
    DelBtn.innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

const createAndAppendElement = (element) => {
  const section = document.createElement("section");
  const UNH4 = document.createElement("h4");

  const ANH4 = document.createElement("h4");
  const CTH4 = document.createElement("h4");
  let CPH4 = document.createElement("h4");
  let approveBTN = document.createElement("button");
  let deleteBTN = document.createElement("button");
  approveBTN.className = "btn btn-primary";
  deleteBTN.className = "btn btn-danger";
  approveBTN.innerHTML = "APPROVE CARD";
  deleteBTN.innerHTML = "DELETE";
  UNH4.innerHTML = element.user
    ? `${element.user.first_name} ${element.user.last_name}`
    : "Not available";

  ANH4.innerHTML = `${element.account_number}`;
  CTH4.innerHTML = `${element.card_type}`;
  CPH4.innerHTML = `${element.card_pin}`;
  // ANH4.className = "btn btn-primary";
  approveBTN.onclick = () =>
    (window.location.href = `/admin/issue-card.html?${element.user._id}`);
  deleteBTN.onclick = () =>
    fetch_delete_card_application(deleteBTN, element._id);
  section.append(UNH4, ANH4, CTH4, CPH4, approveBTN, deleteBTN);
  document.querySelector(".history-table").append(section);
};

const setText = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
};

(async () => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/admin/card_application/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);

    setText(result.message);
  } catch (err) {
    console.log(err);
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
