"use server";

const { createUser, findUserByCredentials } = require("@/services/queries");

export const registerUser = async (formData) => {
  const user = {};
  user.firstName = formData.get("firstName");
  user.lastName = formData.get("lastName");
  user.email = formData.get("email");
  user.password = formData.get("password");

  const created = await createUser(user);

  console.log(created);

  // redirect("/login");
};

export const performLogin = async (formData) => {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);
    if (found) {
      console.log(found);
    } else {
      console.log(found);
      console.log("user not found");
    }
    return found;
  } catch (error) {
    throw error;
  }
};
