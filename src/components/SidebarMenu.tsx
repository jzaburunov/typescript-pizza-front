import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
// import Icon from "antd/lib/icon";

export const SidebarMenu: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <Menu
      style={{ width: "100%", marginTop: 24 }}
      theme="dark"
      selectedKeys={[pathname]}
    >
      <Menu.Item key="/menu">
        {/* <Icon type="menu" /> */}
        <span>Menu</span>
        <Link to="/menu" />
      </Menu.Item>
      <Menu.Item key="/cart">
        {/* <Icon type="menu" /> */}
        <span>Cart</span>
        <Link to="/cart" />
      </Menu.Item>
    </Menu>
  );
};

export default SidebarMenu;
