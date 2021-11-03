export const clientIdHandler = (e, setClient, props) => {
  let value = e.target.value;
  console.log("hi");
  setClient((prevState) => {
    return { ...prevState, id: value, idIsValid: false };
  });
  if (value.length === 9) {
    //need to add if in the id is match
    let [user] = props.clients.filter((user) => user.id === parseInt(value));
    console.log(user);
    if (user) {
      setClient((prevState) => {
        return {
          ...prevState,
          name: user.name,
          surname: user.surname,
          idIsValid: true,
        };
      });
    }
  }
};

export const teamMemberIdHandler = (e, setTeamMember, props) => {
  let value = e.target.value;
  setTeamMember((prevState) => {
    return { ...prevState, id: value, idIsValid: false };
  });
  if (value.length === 9) {
    //need to add if in the id is match
    let [user] = props.users.filter((user) => user.id === parseInt(value));
    console.log(user);
    if (user) {
      setTeamMember((prevState) => {
        return {
          ...prevState,
          name: user.name,
          surname: user.surname,
          idIsValid: true,
        };
      });
    }
  }
};
