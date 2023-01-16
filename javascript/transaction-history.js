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

const createAndAppendElement = (element) => {
  console.log(element)
  const section = document.createElement("section");
  section.className = "table-list-credit";

  const tr_dH4 = document.createElement("h4");
  // const ltH4 = document.createElement("h4");
  let refH4 = document.createElement("h4");
  let srH4 = document.createElement("h4");
  let dnH4 = document.createElement("h4");
  let dtH4 = document.createElement("h4");
  let ctH4 = document.createElement("h4");
  let ssH4 = document.createElement("h4");

  tr_dH4.innerHTML = element.transaction_date;
  refH4.innerHTML = element.refrence_number;
  srH4.innerHTML = element.sender
    ? `${element.sender.first_name} ${element.sender.last_name}`
    : element.sender_02 || "not specified";
  dnH4.innerHTML = element.description;
  dtH4.innerHTML =element.debit||""
  ctH4.innerHTML =element.credit||""
  ssH4.innerHTML = element.status;
  dnH4.className = "description";
  element.status == "failed"
    ? (ssH4.className = "status-fail")
    : element.status == "pending"
    ? (ssH4.className = "status-pending")
    : (ssH4.className = "status-success");
  section.append(tr_dH4,refH4, srH4, dnH4, dtH4, ctH4, ssH4);
  document.querySelector(".history-table").append(section);
};

const setText = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
  // const section = createElement("section");
  // section.className = "table-list-credit";
  // let h41 = createElement("h4");
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/transactions/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);
    setText(result.message);
    document.querySelector(
      "#balance"
    ).innerHTML = `Available Balance= $${result.user_balance
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
