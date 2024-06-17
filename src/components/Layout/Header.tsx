import { TFunction } from "i18next";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const handleLogout = () => {
  localStorage.removeItem("autorized");
  window.location.reload();
};
const pages = [{name: "Map", href: '/search-prices'}];
const settings = [
  { name: "Profile", href: "/my-profile" },
  { name: "Logout", onclick: handleLogout },
];
const authPages = [
  { name: "Sign Up", href: "/sign-up" },
  { name: "Sign In", href: "/sign-in" },
];
interface IProps {
  t: TFunction<"translation", undefined>;
  children?: string;
}
export const Header = ({ t }: IProps) => {
  const { currentUser } = JSON.parse(
    localStorage.getItem("autorized") as string
  );
  console.log(currentUser, "currentUser");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className="bg-black" position="static">
      <Container maxWidth={false} className="w-full">
        <Toolbar disableGutters>
          <a href="/">
            <img src="/assets/icons/fav.png" className="mr-4" width="60px" />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KH Prices
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography component='a' href={page.href} textAlign="center">{t(page.name)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KHP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                href={page.href}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t(page.name)}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!currentUser || currentUser === "guest" ? (
              <>
                {authPages.map((authPage) => (
                  <MenuItem key={authPage.name} onClick={handleCloseNavMenu}>
                    <Typography
                      component="a"
                      href={authPage.href}
                      textAlign="center"
                    >
                      {t(authPage.name)}
                    </Typography>
                  </MenuItem>
                ))}
              </>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Typography
                    noWrap
                    sx={{
                      mr: 2,
                      ml:2,
                      fontFamily: "monospace",
                      fontWeight: 400,
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {currentUser.username}
                  </Typography>

                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={
                        setting?.onclick ? setting.onclick : handleCloseUserMenu
                      }
                    >
                      <Typography
                        component={"a"}
                        href={setting?.href ? setting.href : "/"}
                        textAlign="center"
                      >
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
