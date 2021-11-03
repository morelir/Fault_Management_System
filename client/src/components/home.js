import React, { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import image from "../images/Internet_Business_Technology_HD_Wallpaper_11_1920x1440.jpg"

// this.props.location.login.user.email
const Home = (props) => {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <img
        src={image}
        alt="FMS wallpaper"
      />
    </div>
  );
};

export default Home;
