import React from 'react';
import AuthHelper from '../../helpers/AuthHelper';
import {Link} from 'react-router-dom';
import {Menu, Segment, Flag, Button} from 'semantic-ui-react';
import LoginModal from '../Login/LoginModal';
import RegistrationModal from '../Registration/RegistrationModal';
import MessageDropdownList from '../Message/MessageDropdownList';
import { withNamespaces } from 'react-i18next';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLang: 'en'
        };
    }

    render() {
        const changeLanguage = (lang) => {
            this.props.i18n.changeLanguage(lang);
            this.setState({
                activeLang: lang
            })
        };

        const languageSelector = () => {
            return (
                <Menu.Menu position={"right"}>
                    <Menu.Item active={"pl" === this.state.activeLang} onClick={() => changeLanguage('pl')}>
                        <Flag name={"pl"}/>
                    </Menu.Item>
                    <Menu.Item active={"en" === this.state.activeLang} onClick={() => changeLanguage('en')}>
                        <Flag name={"gb"}/>
                    </Menu.Item>
                </Menu.Menu>
            );
        };

        return (
            <Segment inverted attached={"top"}>
                <Menu secondary inverted>
                    <Menu.Item as={Link} to={"/"} name={"home"} active={true} />


                    {AuthHelper.isLoggedIn() ? (
                        <Menu.Menu position={"right"}>
                            {languageSelector()}
                            <Menu.Item header>Hello {AuthHelper.getCredentials().firstname} {AuthHelper.getCredentials().lastname}</Menu.Item>
                            <MessageDropdownList />
                            <Menu.Item as={Link} to={"/logout"} name={"logout"} />
                        </Menu.Menu>
                    ) : (
                        <Menu.Menu position={"right"}>
                            {languageSelector()}
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

export default withNamespaces('translation')(Navbar);