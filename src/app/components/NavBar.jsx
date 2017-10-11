import React from "react"
import { Link } from "react-router-dom"
import { Container, Divider, Dropdown, Menu } from "semantic-ui-react"

const Nav = ({}) => {
    return (
        <Menu inverted>
            <Container class="nav-bar">
                <Menu.Item as="a" header class="logo-text">
                    React
                </Menu.Item>
                <Menu.Item as="a">Home</Menu.Item>

                <Menu.Menu position="right">
                    <Dropdown item simple text="Dropdown">
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Header Item</Dropdown.Header>
                            <Dropdown.Item>
                                <i class="dropdown icon" />
                                <span class="text">Submenu</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Container>
        </Menu>
    );
};

export default Nav;


