import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { deleteuser } from "../../../actions/users";

// import { useDispatch } from "react-redux";
import useStyles from "./styles";

const User = ({ user }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      variant="outlined"
      className={classes.card}
      style={{ display: "inline-block" }}
    >
      <CardMedia align="center">
        {/* {user.gender === "female" ? (
          <img
            src="https://img.icons8.com/ios-filled/100/000000/user-female-circle.png"
            alt=""
          />
        ) : (
          <img
            src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png"
            alt=""
          />
        )} */}
        <img
          src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png"
          alt=""
        />
      </CardMedia>
      <CardContent className={classes.cardContent}>
        {[
          {
            label: "Full Name",
            field: user.name,
          },
          // {
          //   label: "Gender",
          //   field: user.gender,
          // },
          // {
          //   label: "Age",
          //   field: user.age,
          // },
          // {
          //   label: "Language",
          //   field: user.language,
          // },
          // {
          //   label: "Surgerys",
          //   field: user.surgerys,
          // },
        ].map((item) => (
          <Typography
            className={classes.text}
            color="textSecondary"
            variant="h6"
            align="center"
            key={item.field} 
          >
            {item.label}: {item.field}
          </Typography>
        ))}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          {/* <DeleteIcon fontSize="small" /> Delete */}
        </Button>
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            // onClick={() => dispatch(deleteuser(user._id))}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default User;
