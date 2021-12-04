export const userIdHandler = (e, setUser) => {
  let value = e.target.value;

  setUser((prevState) => {
    return {
      ...prevState,
      id: value,
    };
  });
};

export const emailHandler = (e, setUser) => {
  let value = e.target.value;
  if (value.length === 9) {
    setUser((prevState) => {
      return {
        ...prevState,
        id: value,
      };
    });
  }
};
