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

const fetch_delete_message = async (DelBtn, message) => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  DelBtn.innerHTML = "Proccessing...";
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/admin/support_messages/delete_message",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, admin, message }),
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
    window.location.href = "/admin/messages.html";
  } catch (err) {
    DelBtn.innerHTML = "Try again";
    document.querySelector(".errMessage").innerHTML = err.message;
  }
};

const createAndAppendElement = (element) => {
  const section = document.createElement("section");
  section.className = "table-list-credit";

  let SEH4 = document.createElement("h4");
  let MEH4 = document.createElement("h4");
  SEH4.innerHTML = element.user ? element.user.email : "not found";
  MEH4.innerHTML = element.message;
  // let DNH4 = document.createElement("h4");
  // let LDH4 = document.createElement("h4");
  // let LRH4 = document.createElement("h4");
  let DELBTN = document.createElement("button");
  DELBTN.innerHTML = "DELETE";
  DELBTN.className = "btn btn-danger";
  DELBTN.onclick = () => fetch_delete_message(DELBTN, element._id);

  section.append(SEH4, MEH4, DELBTN);
  document.querySelector(".history-table").append(section);
};
const setText = (userMessages) => {
  userMessages.map((info) => createAndAppendElement(info));
};

(async () => {
  let token = getCookie("admin_token");
  let admin = getCookie("admin");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-ltd-backend.glitch.me/api/admin/support_messages",
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
