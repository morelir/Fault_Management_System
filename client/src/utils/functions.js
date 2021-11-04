export const clientIdHandler = (e, setClient, props) => {
  let value = e.target.value;
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

export const teamHandler = (e, setFault, setTeamMember) => {
  setFault((prevState) => {
    return { ...prevState, team: e.target.value };
  });
  setTeamMember((prevState) => {
    return { ...prevState, id: "", name: "", surname: "", idIsValid: false };
  });
};


export const urgencyHandler = (e, setFault) => {
  setFault((prevState) => {
    return { ...prevState, urgency: e.target.value };
  });
};
