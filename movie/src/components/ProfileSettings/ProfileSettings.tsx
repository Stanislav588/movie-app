import React, { FC } from "react";
import { Avatar, Menu, MenuItem, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { useLogOut } from "../../hooks/useLogOut";
import { useSelector } from "react-redux";
const ProfileSettings: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logOut } = useLogOut();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const authUser = useSelector((state: any) => state.movie.users);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Avatar
        src={authUser?.profilePicture}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      />
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose}>
            <Avatar src={authUser?.profilePicture} /> Profile
          </MenuItem>
        </Link>
        {authUser?.uid && (
          <div onClick={handleClose}>
            <MenuItem
              sx={{
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                paddingTop: 1,
                paddingBottom: 1,
              }}
              onClick={logOut}
            >
              Log out
            </MenuItem>
          </div>
        )}
        <Divider />
        <Link to="/auth">
          <MenuItem onClick={handleClose}>Add another account</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default ProfileSettings;
