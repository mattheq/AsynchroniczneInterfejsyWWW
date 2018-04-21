import React from 'react';

import {Container} from 'semantic-ui-react';

import Navbar from "./Navbar";

class BaseLayout extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <br/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}

export default BaseLayout