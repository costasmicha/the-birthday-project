/* 
  phone
*/
const pattern_phone = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
function isPhoneValid(phone: string): boolean {
  return phone.trim().length > 0 && pattern_phone.test(phone)
}

/*
  email
*/
const pattern_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
function isEmailValid(email: string): boolean {
  return email.trim().length > 0 && pattern_email.test(email)
}

/*
  name
*/
const pattern_name = /^\s+$/
function isNameValid(name: string): boolean {
  return name.trim().length > 0 && pattern_name.test(name)
}

type ContactValues = {
  firstName: string
  lastName: string
  phone: string
  email: string
}

export function validateContactValues(values: ContactValues) {
  const { firstName, lastName, phone, email } = values
  return {
    firstName: isNameValid(firstName) ? null : "formValidationError1",
    lastName: isNameValid(lastName) ? null : "formValidationError1",
    phone: isPhoneValid(phone) ? null : "formValidationError1",
    email: isEmailValid(email) ? null : "formValidationError1",
  }
}

// export const validation = ({
//   parent,
//   firstName,
//   lastName,
//   phone = "",
//   email = "",
//   newNameday_id = "",
//   newNamedate = "",
//   newBirthday = "",
//   userId = "",
// }) => {

//   let validation_state
//   let parent_updated

//   if (
//     (pattern_name.test(firstName) || firstName === "") &&
//     (pattern_name.test(lastName) || lastName === "")
//   ) {
//     alert("Name is required")
//     if (
//       !pattern_phone.test(phone) &&
//       phone !== "" &&
//       !pattern_email.test(email) &&
//       email !== ""
//     ) {
//       return {
//         validation_state: {
//           controlId_phone: "formValidationError1",
//           validationState_phone: "error",
//           controlId_email: "formValidationError1",
//           validationState_email: "error",
//         },
//       }
//     } else if (
//       (pattern_phone.test(phone) || phone === "") &&
//       !pattern_email.test(email) &&
//       email !== ""
//     ) {
//       return {
//         validation_state: {
//           controlId_phone: null,
//           validationState_phone: null,
//           //
//           controlId_email: "formValidationError1",
//           validationState_email: "error",
//         },
//       }
//     } else if (
//       (pattern_email.test(email) || email === "") &&
//       !pattern_phone.test(phone) &&
//       phone !== ""
//     ) {
//       return {
//         validation_state: {
//           controlId_phone: "formValidationError1",
//           validationState_phone: "error",
//           controlId_email: null,
//           validationState_email: null,
//         },
//       }
//     } else {
//       return {
//         validation_state: {
//           controlId_phone: null,
//           validationState_phone: null,
//           controlId_email: null,
//           validationState_email: null,
//         },
//       }
//     }
//   } else if (
//     !pattern_phone.test(phone) &&
//     phone !== "" &&
//     !pattern_email.test(email) &&
//     email !== ""
//   ) {
//     return {
//       validation_state: {
//         controlId_phone: "formValidationError1",
//         validationState_phone: "error",
//         controlId_email: "formValidationError1",
//         validationState_email: "error",
//       },
//     }
//   } else if (
//     (pattern_phone.test(phone) || phone === "") &&
//     !pattern_email.test(email) &&
//     email !== ""
//   ) {
//     return {
//       validation_state: {
//         controlId_phone: null,
//         validationState_phone: null,
//         controlId_email: "formValidationError1",
//         validationState_email: "error",
//       },
//     }
//   } else if (
//     (pattern_email.test(email) || email === "") &&
//     !pattern_phone.test(phone) &&
//     phone !== ""
//   ) {
//     return {
//       validation_state: {
//         controlId_phone: "formValidationError1",
//         validationState_phone: "error",
//         controlId_email: null,
//         validationState_email: null,
//       },
//     }
//   } else {
//     const newParent = {
//       firstName: firstName,
//       lastName: lastName,
//       phone: phone,
//       email: email,
//       birthday: newBirthday,
//       userId,
//       nameday: {
//         nameday_id: newNameday_id,
//         date: newNamedate,
//       },
//     }
//     parent_updated = { ...parent, ...newParent }
//     validation_state = null
//     return { validation_state, parent_updated }
//   }
// }
