import React from 'react';
import {Container, Breadcrumb} from 'semantic-ui-react';

import BreadcrumbHelper from '../../helpers/BreadcrumbHelper';

//TODO: get item attributes when mounting, tip: this.props.match.params.id <- id from url
class ItemView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            description: '',
            created_at: '',
            updated_at: ''
        };
    }

    render() {
        return (
            <Container className={"base-container"}>
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                sadhfjksahfka
            </Container>
        )
    }
}

export default ItemView;