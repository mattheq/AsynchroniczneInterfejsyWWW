import React from 'react';
import { Container, Segment, Header, List } from 'semantic-ui-react';
import * as ItemConstants from '../../constants/ItemConstants';
import moment from 'moment';
import ItemViewAddressDetails from './ItemViewAddressDetails.js';

class ItemViewMainSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let itemDetails = this.props.itemDetails;
        return (
            <Segment color={'blue'}>
                <Header as='h1'>{this.props.itemType === ItemConstants.ITEM_MISSING ? 'Lost: ' : 'Found: '}{this.props.title}</Header>
                <Header sub disabled style={{ marginBottom: '10px' }}>Created at: {moment.unix(this.props.createdAt).format('LLL')}</Header>
                <Container textAlign={"justified"}>
                    <Header as='h5' dividing>
                        Description
                    </Header>
                    <p>{this.props.description}</p>
                </Container>
                <Header as='h5' dividing>
                    Address details
                </Header>
                <ItemViewAddressDetails country={itemDetails.country} city={itemDetails.city} street={itemDetails.street} streetNumber={itemDetails.street_number} type={this.props.type} daytime={itemDetails.daytime} />
            </Segment>
        );
    }
}

export default ItemViewMainSection;