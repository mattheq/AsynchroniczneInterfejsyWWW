import React from 'react';
import {Container, Breadcrumb, Card, Button} from 'semantic-ui-react';

import BreadcrumbHelper from '../../helpers/BreadcrumbHelper';
import * as ItemConstants from "../../constants/ItemConstants";
import ItemStore from "../../stores/ItemStore";
import * as ItemActions from "../../actions/ItemActions";
import Chat from '../Chat/Chat';
import AuthHelper from '../../helpers/AuthHelper';

//TODO: get item attributes when mounting, tip: this.props.match.params.id <- id from url
class ItemView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {
                id: '',
                title: '',
                description: '',
                type: '',
                status: '',
                created_at: '',
                updated_at: '',
                user: {
                    id: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone_number: ''
                }
            },
            loading: true,
            showChat: false,
        };

        this.handleItemViewSuccess = this.handleItemViewSuccess.bind(this);
        this.handleItemViewFailed = this.handleItemViewFailed.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentWillMount() {
        ItemStore.on(ItemConstants.ITEM_VIEW_SUCCESS, this.handleItemViewSuccess);
        ItemStore.on(ItemConstants.ITEM_VIEW_FAILED, this.handleItemViewFailed);
    }

    componentWillUnmount() {
        ItemStore.removeListener(ItemConstants.ITEM_VIEW_SUCCESS, this.handleItemViewSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_VIEW_FAILED, this.handleItemViewFailed);
    }

    componentDidMount() {
        ItemActions.itemView(this.props.match.params.id);
    }

    handleItemViewSuccess(data) {
        this.setState({
            item: data,
            loading: false
        });
    }

    handleItemViewFailed(error) {
        console.log(error);
    }

    onButtonClick() {
        this.setState({
            showChat: true
        })
    }

    render() {
        return (
            <Container className={"base-container"}>
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                {this.state.isLoading ? (
                    <p>LOADING</p>
                ) : (
                    <section>
                        <Card>
                            <Card.Content>
                                {/*<Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />*/}
                                <Card.Header>{this.state.item.user.firstname} {this.state.item.user.lastname}</Card.Header>
                                <Card.Meta>Phone number: {this.state.item.user.phone_number}</Card.Meta>
                                {/*<Card.Description>*/}
                                    {/*Steve wants to add you to the group <strong>best friends</strong>*/}
                                {/*</Card.Description>*/}
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green' onClick={() => this.setState({showChat: true})}>
                                        Message
                                    </Button>
                                </div>
                            </Card.Content>
                        </Card>
                        {this.state.showChat && AuthHelper.isLoggedIn() ?
                        <Chat firstname={this.state.item.user.firstname} lastname={this.state.item.user.lastname} user_id={this.state.item.user.id}/>
                            : null }
                    </section>
                )}
            </Container>
        )
    }
}

export default ItemView;