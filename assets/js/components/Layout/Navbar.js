import React from 'react';
import AuthHelper from '../../helpers/AuthHelper';
import {Link} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';

class Navbar extends React.Component {
    // TODO: set 'active' class based on route
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'home'
        };
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e, {name}) {
        this.setState({activeItem: name})
    };

    render() {
        return (
                <Menu secondary>
                    <Menu.Item as={Link} to={"/"} name={"home"} active={this.state.activeItem === 'home'} onClick={this.handleItemClick} />
                    {AuthHelper.isLoggedIn() ? (
                        <Menu.Menu position={"right"}>
                            <Menu.Item as={Link} to={"logout"} name={"logout"} />
                        </Menu.Menu>
                    ) : (
                        <Menu.Menu position={"right"}>
                            <Menu.Item as={Link} to={"login"} name={"login"} active={this.state.activeItem === 'login'} onClick={this.handleItemClick} />
                            <Menu.Item as={Link} to={"signup"} name={"signup"} active={this.state.activeItem === 'signup'} onClick={this.handleItemClick} />
                        </Menu.Menu>
                    )}
                </Menu>
        )
    }
}

export default Navbar