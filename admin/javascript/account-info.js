// const setCookie = (token, admin) => {
//   const d = new Date();
//   d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = `token=${token} ; ${expires}`;
//   document.cookie = `admin=${admin} ; ${expires}`;
//   window.location.replace("/admin/account-info.html");
// };

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

const handleChangeStatus = async (event, user_id) => {
  event.target.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/admin/users/activate_user",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, user: user_id }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      event.target.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      event.target.innerHTML = "Success";
      window.location.href = "/admin/account-info.html";
    }
  } catch (err) {
    event.target.innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

const handle_suspend_user = async (event, user_id) => {
  event.target.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/admin/users/suspend_user",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, user: user_id }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      event.target.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      event.target.innerHTML = "Success";
      window.location.href = "/admin/account-info.html";
    }
  } catch (err) {
    event.target.innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

const handle_delete_user = async (event, user_id) => {
  event.target.innerHTML = "Proccessing...";
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/admin/users/delete_user",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, user: user_id }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) {
      event.target.innerHTML = "Try again";
      document.querySelector(".errMessage").innerHTML = result.errMessage;
      alert(result.errMessage);
    } else {
      alert(result.message);
      event.target.innerHTML = "Success";
      window.location.href = "/admin/account-info.html";
    }
  } catch (err) {
    event.target.innerHTML = "Try again";
    console.log(err);
    alert(err.message);
  }
};

const createAndAppendElement = (element) => {
  const section = document.createElement("section");
  const CNH4 = document.createElement("h4");
  const ANH4 = document.createElement("button");
  const balance = document.createElement("h4");
  const ATH4 = document.createElement("h4");
  const susBTN = document.createElement("button");
  const statementBtn = document.createElement("button");

  CNH4.innerHTML = `${element.first_name} ${element.last_name}`;
  ANH4.innerHTML = element.account_number;
  ANH4.className = "btn btn-primary";
  ANH4.style.color = "#fff";
  ANH4.onclick = () =>
    (window.location.href = `/admin/fund-user.html?${element.account_number}`);

  balance.innerHTML = `$${element.balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  ATH4.innerHTML = element.account_type;

  susBTN.className =
    element.is_suspended != true ? "btn btn-secondary" : "btn btn-primary";
  // susBTN.innerHTML = element.is_active != true ? "INACTIVATED" : "ACTIVATED";
  susBTN.innerHTML =
    element.is_suspended != true ? "SUSPEND USER" : "SUSPENDED";
  susBTN.id = element._id;
  susBTN.onclick = () => handle_suspend_user(event, element._id);
  statementBtn.innerHTML = "Statement";
  statementBtn.id = element._id;
  statementBtn.className = "btn btn-primary";
  statementBtn.onclick = () =>
    (window.location.href = `/admin/transaction-history.html?${element._id}`);
  //   //   susBTN.innerHTML =
  //   //     element.is_suspended != true ? "SUSPEND USER" : "SUSPENDED";
  //   //   delBTN.innerHTML = "DELETE USER";
  //   susBTN.id = element._id;
  //   //   susBTN.id = element._id;
  // //   delBTN.id = element._id;
  //   susBTN.onclick = () => handleChangeStatus(event, element._id);

  //   ANH4.className = "btn btn-primary";
  //   ANH4.style.color = "#fff";
  //   ANH4.onclick = () =>
  //     (window.location.href = `/admin/fund-user.html?${element.account_number}`);

  section.append(
    CNH4,
    ANH4,
    // EPH4,
    balance,
    ATH4,
    susBTN,
    // susBTN,
    statementBtn
  );
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
      "https://zionintercontinentalb-org-backend.glitch.me/api/admin/fetch_users",
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
