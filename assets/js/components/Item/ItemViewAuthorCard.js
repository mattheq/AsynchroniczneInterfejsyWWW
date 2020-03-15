import React from 'react';
import { Button, Divider, Confirm } from 'semantic-ui-react';

class ItemViewAuthorCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false
        };
    }

    render() {
        return (
            <section>
                <Divider horizontal />
                <Button fluid color={'green'} onClick={() => this.props.onUpdateButtonClick()}>
                    Update item
                </Button>
                <Divider horizontal>Or</Divider>
                <Button fluid color={'red'} onClick={() => this.setState({showConfirm: true})}>
                    Remove item
                </Button>
                <Confirm
                    open={this.state.showConfirm}
                    onCancel={() => this.setState({ showConfirm: false })}
                    onConfirm={() => this.props.onDeleteButtonClick()}
                    size='mini'
                />
            </section>
        );
    }
}

export default ItemViewAuthorCard;