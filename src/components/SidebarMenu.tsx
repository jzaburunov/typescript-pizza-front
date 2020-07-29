import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

// TODO Add redirect to /menu initially
export const SidebarMenu: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <Menu
      style={{ width: "100%", marginTop: 24 }}
      theme="dark"
      selectedKeys={[pathname]}
    >
      <Menu.Item key="/login">
        <span>Login</span>
        <Link to="/login" />
      </Menu.Item>
      <Menu.Item key="/menu">
        <span>Menu</span>
        <Link to="/menu" />
      </Menu.Item>
      <Menu.Item key="/cart">
        <span>Cart</span>
        <Link to="/cart" />
      </Menu.Item>
    </Menu>
  );
};
