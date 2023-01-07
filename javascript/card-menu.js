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
  let CNH4 = document.createElement("h4");
  let CTH4 = document.createElement("h4");
  let EDH4 = document.createElement("h4");
  let SCH4 = document.createElement("h4");
  let CPH4 = document.createElement("h4");
  CNH4.innerHTML = element.card_number;
  CTH4.innerHTML = element.card_type;
  EDH4.innerHTML = element.card_expiry_date;
  SCH4.innerHTML = element.card_cvv;
  CPH4.innerHTML = element.card_pin;
  // const refH4 = document.createElement("h4");
  // const ltH4 = document.createElement("h4");
  // let amtH4 = document.createElement("h4");
  // let itH4 = document.createElement("h4");
  // let dnH4 = document.createElement("h4");
  // let mrH4 = document.createElement("h4");
  // let ssH4 = document.createElement("h4");

  // refH4.innerHTML = element.refrence_no;
  // ltH4.innerHTML = element.loan_type;
  // amtH4.innerHTML = `$${element.loan_amount
  //   .toString()
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  // itH4.innerHTML = element.interest;

  // dnH4.innerHTML = element.duration;
  // mrH4.innerHTML = element.monthly_returns;
  // ssH4.innerHTML = element.status;
  // element.status == "failed"
  //   ? (ssH4.className = "status-fail")
  //   : element.status == "pending"
  //   ? (ssH4.className = "status-pending")
  //   : (ssH4.className = "status-success");
  section.append(CNH4, CTH4, EDH4, SCH4, CPH4);
  document.querySelector(".history-table").append(section);
};
const setText = (userInfo) => {
  userInfo.map((info) => createAndAppendElement(info));
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/user/card/fetch",
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
