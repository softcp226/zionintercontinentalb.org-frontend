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

const fetch_delete_loan = async (DelBtn, loan) => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  DelBtn.innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/admin/delete_loan",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, loan }),
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
    window.location.href = "/admin/loan-menu.html";
  } catch (err) {
    DelBtn.innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

const fetch_approve_loan = async (APPROVEBTN, user, loan) => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  APPROVEBTN.innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/admin/approve_loan",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, user, loan }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      alert(result.errMessage);
      APPROVEBTN.innerHTML = "Try again";
      return;
    }
    //   return (document.querySelector(".errMessage").innerHTML =
    //     result.errMessage);
    // setText(result.message);
    APPROVEBTN.innerHTML = "success";
    alert(result.message);
    window.location.href = "/admin/loan-menu.html";
  } catch (err) {
    APPROVEBTN.innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

const createAndAppendElement = (element) => {
  const section = document.createElement("section");
  section.className = "table-list-credit";

  let LTH4 = document.createElement("h4");
  let LAH4 = document.createElement("h4");
  let DNH4 = document.createElement("h4");
  let LDH4 = document.createElement("h4");
  let LRH4 = document.createElement("h4");
  let DELBTN = document.createElement("button");
  let APPROVEBTN = document.createElement("button");
  DELBTN.innerHTML = "DELETE";
  APPROVEBTN.innerHTML = "APPROVE";
  DELBTN.className = "btn btn-danger m-2";
  DELBTN.onclick = () => fetch_delete_loan(DELBTN, element._id);
  APPROVEBTN.className = "btn btn-primary m-2";
  APPROVEBTN.onclick = () =>
    fetch_approve_loan(
      APPROVEBTN,
      element.user._id || "null",
      element._id || "null"
    );
  LTH4.innerHTML = element.loan_type;
  LAH4.innerHTML = `$${element.loan_amount}`;
  DNH4.innerHTML = element.duration;
  LDH4.innerHTML = element.loan_details;
  LRH4.innerHTML =
    element.user != null
      ? `${element.user.first_name} ${element.user.last_name}`
      : "not specified";

  section.append(LTH4, LAH4, DNH4, LDH4, LRH4, DELBTN, APPROVEBTN);
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
      "https://zionintercontinentalb-org-backend.glitch.me/api/admin/loan/fetch",
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
    document.querySelector(".errMessage").innerHTML = err.message;
  }
})();
