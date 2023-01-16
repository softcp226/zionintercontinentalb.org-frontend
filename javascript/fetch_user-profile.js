const selector = (name, value) => {
  document.querySelector(`#${name}`).innerHTML = value;
};
const setText = (userInfo) => {

  selector("first_name", userInfo.first_name);
  selector("last_name", userInfo.last_name);
  selector("email", userInfo.email);
  selector("phone", userInfo.phone);
  selector("user_name", userInfo.user_name);
  selector("DOB", userInfo.DOB);
  selector("gender", userInfo.gender);
  selector("residential_address", userInfo.residential_address);
  selector("country", userInfo.country);
  selector("zip_code", userInfo.zip_code);
  selector(
    "name_and_address_of_employer",
    userInfo.name_and_address_of_employer
  );
  selector("beneficiary_legal_name", userInfo.beneficiary_legal_name);
  selector("beneficiary_occupation", userInfo.beneficiary_occupation);
  selector("beneficiary_email_address", userInfo.beneficiary_email_address);
  selector("beneficiary_mobile_number", userInfo.beneficiary_mobile_number);
  selector(
    "relationship_with_beneficiary",
    userInfo.relationship_with_beneficiary
  );
  selector("beneficiary_age", userInfo.beneficiary_age);
  selector("security_question_one", userInfo.security_question_one);
  selector("security_answer_one", userInfo.security_answer_one);
  selector("pin",userInfo.pin)
  selector("account_number",userInfo.account_number);
 document.querySelector(`#passport`).src=userInfo.passport;
   document.querySelector(`#person-image`).src = userInfo.passport;
 //    document.querySelector("#first_name").innerHTML=userInfo.first_name
  //    document.querySelector("#last_name").innerHTML = userInfo.last_name;
  //    document.querySelector("#email").innerHTML = userInfo.email;
  //    document.querySelector("#phone").innerHTML = userInfo.phone;
  //    document.querySelector("#user_name").innerHTML = userInfo.user_name;
  //    document.querySelector("#DOB").innerHTML = userInfo.DOB;
  //    document.querySelector("#gender").innerHTML = userInfo.gender;
};

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

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/fetchSelf",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    if (result.error) return window.location.replace("/login.html");
    setText(result.message);
  } catch (err) {
    if (result.error) return window.location.replace("/login.html");
  }
})();

// fetch_user({ token });
