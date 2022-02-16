export const clientIdHandler = (e, setClient, props) => {
  let value = e.target.value;
  setClient((prevState) => {
    return { ...prevState, id: value, idIsValid: false };
  });
  if (value.length === 9) {
    //need to add if in the id is match
    let [user] = props.clients.filter((user) => user.id === parseInt(value));
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

export const teamMemberIdHandler = (e, team, setTeamMember, props) => {
  let value = e.target.value;
  setTeamMember((prevState) => {
    return { ...prevState, id: value, idIsValid: false };
  });
  if (value.length === 9) {
    //need to add if in the id is match
    let [user] = props.users.filter(
      (user) => user.team === team && user.id === parseInt(value)
    );
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

export const teamHandler = (e, set, setTeamMember) => {
  set((prevState) => {
    return { ...prevState, team: e.target.value };
  });
  setTeamMember((prevState) => {
    return { ...prevState, id: "", name: "", surname: "", idIsValid: false };
  });
};

export const urgencyHandler = (e, setFault) => {
  setFault((prevState) => {
    return { ...prevState, urgencyLevel: e.target.value };
  });
};

export const capitalizeFirstLetter = (sentence) => {
  let words = sentence.split(" ");
  sentence = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return sentence;
};

export const displayDate = (dateFormat) => {
  let date = new Date(dateFormat);
  let month = date.getMonth() + 1;
  let displayDate = `${date.getFullYear()}-${
    month >= 10 ? month : "0" + month
  }-${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()} ${
    date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
  }:${date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()}`;
  return displayDate;
};

export const getTimeDuration = (dateCreatedFormat) => {
  let createdDate = new Date(dateCreatedFormat);
  let currDate = new Date();
  let displayTimeDuration = "",
    paramsNum = 2,
    count = 0;
  let difference = currDate - createdDate; //milliseconds

  let weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
  if (weeks > 0 && count < paramsNum) {
    difference =
      (difference / (1000 * 60 * 60 * 24 * 7) -
        Math.floor(difference / (1000 * 60 * 60 * 24 * 7))) *
      (1000 * 60 * 60 * 24 * 7);
    count++;
    displayTimeDuration += ` ${weeks} weeks,`;
  }
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (days > 0 && count < paramsNum) {
    difference =
      (difference / (1000 * 60 * 60 * 24) -
        Math.floor(difference / (1000 * 60 * 60 * 24))) *
      (1000 * 60 * 60 * 24);
    count++;
    displayTimeDuration += ` ${days} days,`;
  }
  let hours = Math.floor(difference / (1000 * 60 * 60));
  if (hours > 0 && count < paramsNum) {
    difference =
      (difference / (1000 * 60 * 60) -
        Math.floor(difference / (1000 * 60 * 60))) *
      (1000 * 60 * 60);
    count++;
    displayTimeDuration += ` ${hours} hours,`;
  }
  let min = Math.floor(difference / (1000 * 60));
  if (min > 0 && count < paramsNum) {
    difference =
      (difference / (1000 * 60) - Math.floor(difference / (1000 * 60))) *
      (1000 * 60);
    count++;
    displayTimeDuration += ` ${min} min,`;
  }
  return displayTimeDuration.slice(0, -1); //remove last character ','
};
