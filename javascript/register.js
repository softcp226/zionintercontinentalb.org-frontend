const fetch_user = async (user_form) => {
  document.querySelector("#button").innerHTML = "Proccessing...";
  document.querySelector("#btn_error").innerHTML = "";

  try {
    const response = await fetch(
      "https://zionintercontinentalb-org-backend.glitch.me/api/user/register",
      {
        method: "POST",
        // headers: { "content-type": "application/json" },
        body: user_form,
      },
    );
    const result = await response.json();
    if (result.error) {
      document.querySelector("#button").innerHTML = "Try again";
      document.querySelector("#btn_error").innerHTML = result.errMessage;
    } else {
      console.log(result);
      document.querySelector("#button").innerHTML = "success";
      window.location.replace("/inactive.html")
    }
  } catch (err) {
    document.querySelector("#button").innerHTML = "Try again";

    if (err.message == "Unexpected token < in JSON at position 0")
      return (document.querySelector("#btn_error").innerHTML =
        "Passport must be an image. if you are sure you are uploading an image please refresh this page and try again");
    document.querySelector("#button").innerHTML = "Try again";
    document.querySelector("#btn_error").innerHTML = err.message;
    console.log(err);
  }
};

const create_form_data = (form) => {
  const formdata = new FormData();
  formdata.append("first_name", form.first_name);
  formdata.append("last_name", form.last_name);
  formdata.append("email", form.email);
  formdata.append("phone", form.phone);
  formdata.append("user_name", form.user_name);
  formdata.append("DOB", form.DOB);
  formdata.append("gender", form.gender);
  formdata.append("residential_address", form.residential_address);
  formdata.append("country", form.country);
  formdata.append("zip_code", form.zip_code);
  formdata.append(
    "name_and_address_of_employer",
    form.name_and_address_of_employer
  );
  formdata.append("beneficiary_legal_name", form.beneficiary_legal_name);
  formdata.append("beneficiary_occupation", form.beneficiary_occupation);
  formdata.append("beneficiary_email_address", form.beneficiary_email_address);
  formdata.append("beneficiary_mobile_number", form.beneficiary_mobile_number);
  formdata.append(
    "relationship_with_beneficiary",
    form.relationship_with_beneficiary
  );
  formdata.append("beneficiary_age", form.beneficiary_age);
  formdata.append("security_question_one", form.security_question_one);
  formdata.append("security_answer_one", form.security_answer_one);
  formdata.append("password", form.password);
  formdata.append("pin", form.account_pin);
  formdata.append("account_type", form.account_type);
  formdata.append("passport", form.passport);
  return formdata;
};

const show_err_sign = (input) => {
  return (input.style.border = "1px solid red");
};
document.querySelector("#button").onclick = () => {
  let first_name = document.querySelector("#first_name");
  let last_name = document.querySelector("#last_name");
  let email = document.querySelector("#email");
  let phone = document.querySelector("#phone");
  let user_name = document.querySelector("#user_name");
  let DOB = document.querySelector("#date_of_birth");
  let gender = document.querySelector("#gender");
  let residential_address = document.querySelector("#residential_address");
  let country = document.querySelector("#country");
  let zip_code = document.querySelector("#zip_code");
  let name_and_address_of_employer = document.querySelector(
    "#name_and_address_of_employer"
  );
  let beneficiary_legal_name = document.querySelector(
    "#beneficiary_legal_name"
  );
  let beneficiary_occupation = document.querySelector(
    "#beneficiary_occupation"
  );
  let beneficiary_email_address = document.querySelector(
    "#beneficiary_email_address"
  );
  let beneficiary_mobile_number = document.querySelector(
    "#beneficiary_mobile_number"
  );
  let relationship_with_beneficiary = document.querySelector(
    "#relationship_with_beneficiary"
  );
  let beneficiary_age = document.querySelector("#beneficiary_age");

  let security_question = document.querySelector("#security_question");
  let security_answer = document.querySelector("#security_answer");
  let password = document.querySelector("#password");
  let confirm_password = document.querySelector("#confirm_password");
  let account_pin = document.querySelector("#account_pin");
  let confirm_account_pin = document.querySelector("#confirm_account_pin");
  let account_type = document.querySelector("#account_type");
  let passport = document.querySelector("#passport");

  if (!first_name.value) return show_err_sign(first_name);
  if (!last_name.value) return show_err_sign(last_name);
  if (!email.value) return show_err_sign(email);
  if (!phone.value) return show_err_sign(phone);
  if (!+phone.value)
    return (document.querySelector("#phone_error").innerHTML =
      "Please enter a valid phone number");
  if (!user_name.value) return show_err_sign(user_name);
  if (!DOB.value) return show_err_sign(DOB);
  if (!gender.value) return show_err_sign(gender);
  if (!residential_address.value) return show_err_sign(residential_address);
  if (!country.value) return show_err_sign(country);
  if (!zip_code.value) return show_err_sign(zip_code);
  if (!name_and_address_of_employer.value)
    return show_err_sign(name_and_address_of_employer);
  if (!beneficiary_legal_name.value)
    return show_err_sign(beneficiary_legal_name);
  if (!beneficiary_occupation.value)
    return show_err_sign(beneficiary_occupation);

  if (!beneficiary_email_address.value)
    return show_err_sign(beneficiary_email_address);
  if (!beneficiary_mobile_number.value)
    return show_err_sign(beneficiary_mobile_number);
  if (!+beneficiary_mobile_number.value)
    return (document.querySelector("#b_m_n").innerHTML =
      "Beneficiary Mobile Number must be a valid phone number");
  if (!relationship_with_beneficiary.value)
    return show_err_sign(relationship_with_beneficiary);
  if (!beneficiary_age.value) return show_err_sign(beneficiary_age);
  if (!security_question.value) return show_err_sign(security_question);
  if (!security_answer.value) return show_err_sign(security_answer);

  if (!password.value) return show_err_sign(password);

  if (!confirm_password.value) return show_err_sign(confirm_password);
  if (password.value != confirm_password.value) {
    // show_err_sign(password);
    show_err_sign(confirm_password);
    document.querySelector("#pwd_error").innerHTML = "Password must match";
    return;
  }
  if (password.value.length < 8) {
    // show_err_sign(password);
    show_err_sign(confirm_password);
    document.querySelector("#pwd_error").innerHTML =
      "Password must be at least 8 characters long";
    return;
  }

  if (!account_pin.value) return show_err_sign(account_pin);
  if (!+account_pin.value || account_pin.length < 4)
    return (document.querySelector("#pin_error").innerHTML =
      "Account PIN must be a number greater than 4 characters");

  if (!confirm_account_pin.value) return show_err_sign(confirm_account_pin);
  if (account_pin.value != confirm_account_pin.value) {
    document.querySelector("#pin_error").innerHTML = "Account PIN must match";
    // show_err_sign(account_pin);
    show_err_sign(confirm_account_pin);
    return;
  }

  if (!account_type.value) return show_err_sign(account_type);
  if (!passport.files[0]) return show_err_sign(passport);

  let formdata = create_form_data({
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    phone: phone.value,
    user_name: user_name.value,
    DOB: DOB.value,
    gender: gender.value,
    residential_address: residential_address.value,
    country: country.value,
    zip_code: zip_code.value,
    name_and_address_of_employer: name_and_address_of_employer.value,
    beneficiary_legal_name: beneficiary_legal_name.value,
    beneficiary_occupation: beneficiary_occupation.value,
    beneficiary_email_address: beneficiary_email_address.value,
    beneficiary_mobile_number: beneficiary_mobile_number.value,
    relationship_with_beneficiary: relationship_with_beneficiary.value,
    beneficiary_age: beneficiary_age.value,
    security_question_one: security_question.value,
    security_answer_one: security_answer.value,
    password: password.value,
    account_pin: account_pin.value,
    account_type: account_type.value,
    passport: passport.files[0],
  });
  // const formdata = new FormData();
  // formdata.append("first_name", first_name.value);
  // formdata.append("last_name", last_name.value);
  fetch_user(formdata);
};
// document.querySelectorAll("input").forEach((input) => {
//   input.onkeyup = () => {
//     input.style.border = "2px solid #fff";
//     document.querySelector("#pwd_error").innerHTML = "";
//     document.querySelector("#pin_error").innerHTML = "";
//     document.querySelector("#b_m_n").innerHTML = "";
//     document.querySelector("#phone_error").innerHTML = "";
//   };
// });
document.querySelectorAll("input").forEach(
  (input) =>
    (input.onchange = () => {
      input.style.border = "2px solid #fff";
      document.querySelector("#pwd_error").innerHTML = "";
      document.querySelector("#pin_error").innerHTML = "";
      document.querySelector("#b_m_n").innerHTML = "";
      document.querySelector("#phone_error").innerHTML = "";
    })
);

//  = document.querySelector("#first_name");
// let  = document.querySelector("#last_name");
// let email = document.querySelector("#email");
// let phone = document.querySelector("#phone");
// let user_name = document.querySelector("#user_name");
// let DOB = document.querySelector("#date_of_birth");
// let gender = document.querySelector("#gender");
// let residential_address = document.querySelector("#residential_address");
// let country = document.querySelector("#country");
// let zip_code;

document.querySelectorAll("select").forEach((select) => {
  select.onchange = () => {
    select.style.border = "1px solid #fff";
    document.querySelector("#pwd_error").innerHTML = "";
    document.querySelector("#pin_error").innerHTML = "";
    document.querySelector("#b_m_n").innerHTML = "";
    document.querySelector("#phone_error").innerHTML = "";
  };
});

document.querySelector("#user_name").onkeyup = (input) => {
  document.querySelector("#user_name").style.border = "2px solid #fff";
  document.querySelector("#user_name").value = document
    .querySelector("#user_name")
    .value.replace(/\s/g, "");
};
