import React from 'react';
import AuthHelper from '../../helpers/AuthHelper';
import {Link} from 'react-router-dom';
import {Menu, Segment} from 'semantic-ui-react';
import LoginModal from '../Login/LoginModal';
import RegistrationModal from '../Registration/RegistrationModal';
import MessageDropdownList from '../Message/MessageDropdownList'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment inverted attached={"top"}>
                <Menu secondary inverted>
                    <Menu.Item as={Link} to={"/"} name={"home"} active={true} />
                    {AuthHelper.isLoggedIn() ? (
                        <Menu.Menu position={"right"}>
                            <Menu.Item header>Hello {AuthHelper.getCredentials().firstname} {AuthHelper.getCredentials().lastname}</Menu.Item>
                            <MessageDropdownList />
                            <Menu.Item as={Link} to={"/logout"} name={"logout"} />
                        </Menu.Menu>
                    ) : (
                        <Menu.Menu position={"right"}>
                            <Menu.Item>
                                <LoginModal/>
                            </Menu.Item>
                            <Menu.Item>
                                <RegistrationModal/>
                            </Menu.Item>
                        </Menu.Menu>
                    )}
                </Menu>
            </Segment>
        )
    }
}

export default Navbar;