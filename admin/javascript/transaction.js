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

const getParam = () => {
  const urlParams = new URLSearchParams(location.search);

  for (const [key, value] of urlParams) {
    return key;
  }
};

const createAndAppendElement = (element) => {
  const section = document.createElement("section");
  section.className = "table-list-credit";
  const TDH4 = document.createElement("h4");
  const RNH4 = document.createElement("h4");
  const sender = document.createElement("h4");
  const description = document.createElement("h4");
  const debit = document.createElement("h4");
  const credit = document.createElement("h4");
  const status = document.createElement("h4");
  TDH4.innerHTML = element.transaction_date;
  RNH4.innerHTML = element.refrence_number;
  sender.innerHTML = element.sender
    ? `${element.sender.first_name} ${element.sender.last_name}`
    : element.sender_02 || "not specified";

  description.innerHTML = element.description;
  debit.innerHTML = element.debit || "";
  credit.innerHTML = element.credit || "";
  status.innerHTML = element.status;

  element.status == "failed"
    ? (status.className = "status-fail")
    : element.status == "pending"
    ? (status.className = "status-pending")
    : (status.className = "status-success");

  section.append(TDH4, RNH4, sender, description, debit, credit, status);
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
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/admin/transaction/fetch",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user: getParam(), admin }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error)
      return (document.querySelector(".errMessage").innerHTML =
        result.errMessage);
    setText(result.message);
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
