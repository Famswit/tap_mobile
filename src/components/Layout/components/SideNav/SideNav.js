import React from "react";
import { Box, styled, List } from "@mui/material";
import Divider from "@mui/material/Divider";

import { BusinessIcon } from "assets/Icons/BusinessIcon";
import { ActivityIcon } from "assets/Icons/ActivityIcon";
import { SettingsIcon } from "assets/Icons/SettingsIcon";
import { TrasactionIcon } from "assets/Icons/TransactionIcon";
import { DashIcon } from "assets/Icons/DashIcon";
import { AdminIcon } from "assets/Icons/AdminIcon";
import tlogo from "assets/images/tlogo.png";
import Logout from "./components/Logout";
import { NavItem } from "./components/NavItem";

export const Container = styled(Box)({
  width: "260px",
  height: "1024px",
  background: "#F9FAFA",
  padding: "20px",
});

const MenuListContainer = styled(List)({
  marginTop: "25px",
  paddingBottom: "100px",
});

export const SideNav = () => {
  return (
    <Container>
      <Box sx={{ marginTop: "20px" }}>
        <img src={tlogo} height={50} width={68} />
      </Box>

      <Box>
        <MenuListContainer>
          <NavItem to="/dashboard" name="Dashboard" icon={<DashIcon />} />
          <NavItem
            to="/transactions"
            name="Transactions"
            icon={<TrasactionIcon />}
          />
          <NavItem to="/business" name="Businesses" icon={<BusinessIcon />} />

          <NavItem
            name="Administration"
            icon={<AdminIcon />}
            navChildren={[
              { name: "Team mates", to: "/administration/team" },
              { name: "Roles and privileges", to: "/administration/roles" },
            ]}
          />
          <NavItem to="/activity" name="Activity Log" icon={<ActivityIcon />} />
        </MenuListContainer>

        <Divider />

        <MenuListContainer>
          <NavItem to="/settings" name="Settiings" icon={<SettingsIcon />} />
          <Logout />
        </MenuListContainer>
      </Box>
    </Container>
  );
};
