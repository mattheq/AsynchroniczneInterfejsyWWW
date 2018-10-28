import React from 'react';
import {Container} from 'semantic-ui-react';

class PageNotFound extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container className={"base-container"} id={"main"}>
                <div className="fof">
                    <h1>Error 404</h1>
                </div>
            </Container>
        );
    }
}

export default PageNotFound;