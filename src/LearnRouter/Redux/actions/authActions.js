const updateUser = user => {
  return {
    type: "UPDATE_USER",
    user
  };
};

const removeUser = () => {
  return {
    type: "REMOVE_USER"
  };
};

const getUserInfo = user => {
  return {
    type: "getUserInfo",
    user
  };
};

export { updateUser, removeUser, getUserInfo };
