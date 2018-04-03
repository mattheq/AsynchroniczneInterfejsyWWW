import React from 'react';

import {Container} from 'semantic-ui-react';

import Navbar from "./Navbar";

class BaseLayout extends React.Component {
    render() {
        return (
            <Container>
                <Navbar/>
                <br/>
                {this.props.children}
            </Container>
        );
    }
}

export default BaseLayout