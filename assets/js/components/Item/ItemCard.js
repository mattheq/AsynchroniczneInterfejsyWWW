import React from 'react';
import { Card, Image } from 'semantic-ui-react';

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card href={`/#/items/view/${this.props.id}`} color={this.props.color}>
                <Image src={this.props.image} height={166} />
                <Card.Content>
                    <Card.Header>
                        {this.props.title}
                    </Card.Header>
                    <Card.Meta>
                        {this.props.type}
                    </Card.Meta>
                    <Card.Description>
                        {this.props.description}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default ItemCard;