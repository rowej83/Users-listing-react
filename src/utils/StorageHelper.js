export const getArrayOfUsers = () => {
  let Users = JSON.parse(localStorage.getItem("Users"));
  if (Users == null) {
    return [];
  }
  let returnArray = [];
  if (Users.length > 0) {
    Users.forEach(theUser => {
      returnArray.push(JSON.parse(theUser));
    });
    return returnArray;
  } else {
    return [];
  }
};

export const deleteUserFromArray = index => {
  let currentArrayOfUsers = getArrayOfUsers();
  currentArrayOfUsers.splice(index, 1);

  let newArrayOfUsers = currentArrayOfUsers.map(user => {
    return JSON.stringify(user);
  });
  localStorage.setItem("Users", JSON.stringify(newArrayOfUsers));
};

export const saveUserToLocalStorage = newUser => {
  let arrayOfUsers = getArrayOfUsers();
  arrayOfUsers.push(newUser);
  let newArrayOfUsers = arrayOfUsers.map(user => {
    return JSON.stringify(user);
  });
  localStorage.setItem("Users", JSON.stringify(newArrayOfUsers));
};

export const returnUserByIndex = index => {
  let arrayOfUsers = getArrayOfUsers();
  return arrayOfUsers[index];
};

export const updateUser = updatedUserInfo => {
  let arrayOfUsers = getArrayOfUsers();
  arrayOfUsers[updatedUserInfo.index] = updatedUserInfo.User;
  let newArrayOfUsers = arrayOfUsers.map(user => {
    return JSON.stringify(user);
  });
  localStorage.setItem("Users", JSON.stringify(newArrayOfUsers));
};

export const validUserIndex = index => {
  let arrayOfUsers = getArrayOfUsers();
  if (arrayOfUsers[index]) {
    return true;
  }
  return false;
};
