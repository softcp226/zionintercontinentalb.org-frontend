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
  const section = document.createElement("section");
  section.className = "table-list-credit";

  const refH4 = document.createElement("h4");
  const ltH4 = document.createElement("h4");
  let amtH4 = document.createElement("h4");
  let itH4 = document.createElement("h4");
  let dnH4 = document.createElement("h4");
  let mrH4 = document.createElement("h4");
  let ssH4 = document.createElement("h4");

  refH4.innerHTML = element.refrence_no;
  ltH4.innerHTML = element.loan_type;
  amtH4.innerHTML = `$${element.loan_amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  itH4.innerHTML = element.interest;

  dnH4.innerHTML = element.duration;
  mrH4.innerHTML = element.monthly_returns;
  ssH4.innerHTML = element.status;
  element.status == "failed"
    ? (ssH4.className = "status-fail")
    : element.status == "pending"
    ? (ssH4.className = "status-pending")
    : (ssH4.className = "status-success");
  section.append(refH4, ltH4, amtH4, itH4, dnH4, mrH4, ssH4);
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
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/user/loan/fetch",
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
  } catch (err) {
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
