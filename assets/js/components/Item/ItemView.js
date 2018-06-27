import React from 'react';
import {Container, Breadcrumb, Card, Button, Dimmer, Loader, Grid, Label, Segment, Header, List, Divider} from 'semantic-ui-react';

import BreadcrumbHelper from '../../helpers/BreadcrumbHelper';
import * as ItemConstants from "../../constants/ItemConstants";
import ItemStore from "../../stores/ItemStore";
import * as ItemActions from "../../actions/ItemActions";
import Chat from '../Chat/Chat';
import AuthHelper from '../../helpers/AuthHelper';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import * as ChatActions from "../../actions/ChatActions";
import * as ChatConstants from "../../constants/ChatConstants";
import ChatStore from "../../stores/ChatStore";

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
                },
                photos: [],
                item_details: {
                    id: '',
                    country: '',
                    city: '',
                    street: '',
                    street_number: '',
                    daytime: ''
                }
            },
            loading: true,
            showChat: false,
        };

        this.handleItemViewSuccess = this.handleItemViewSuccess.bind(this);
        this.handleItemViewFailed = this.handleItemViewFailed.bind(this);
        this.handleItemDeleteSuccess = this.handleItemDeleteSuccess.bind(this);
        this.handleItemDeleteFailed = this.handleItemDeleteFailed.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
        this.handleHomeChatRendered = this.handleHomeChatRendered.bind(this);
    }

    componentWillMount() {
        ItemStore.on(ItemConstants.ITEM_VIEW_SUCCESS, this.handleItemViewSuccess);
        ItemStore.on(ItemConstants.ITEM_VIEW_FAILED, this.handleItemViewFailed);
        ItemStore.on(ItemConstants.ITEM_DELETE_SUCCESS, this.handleItemDeleteSuccess);
        ItemStore.on(ItemConstants.ITEM_DELETE_FAILED, this.handleItemDeleteFailed);
        ChatStore.on(ChatConstants.HOME_CHAT_RENDERED, this.handleHomeChatRendered);
    }

    componentWillUnmount() {
        ItemStore.removeListener(ItemConstants.ITEM_VIEW_SUCCESS, this.handleItemViewSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_VIEW_FAILED, this.handleItemViewFailed);
        ItemStore.removeListener(ItemConstants.ITEM_DELETE_SUCCESS, this.handleItemDeleteSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_DELETE_FAILED, this.handleItemDeleteFailed);
        ChatStore.removeListener(ChatConstants.HOME_CHAT_RENDERED, this.handleHomeChatRendered);
    }

    componentDidMount() {
        ItemActions.itemView(this.props.match.params.id);
    }

    handleHomeChatRendered() {
        this.setState({
            showChat: false
        })
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

    handleItemDeleteSuccess(data) {
        this.props.history.push('/items');
    }

    handleItemDeleteFailed(error) {
        console.log(error);
    }

    onButtonClick() {
        ChatActions.hideHomeChat();
        this.setState({
            showChat: true
        })
    }

    onDeleteButtonClick() {
        ItemActions.itemDelete(this.state.item.id);
    }

    onUpdateButtonClick() {
        this.props.history.push('/items/update/' + this.state.item.id);
    }

    render() {
        let images = [];
        let user_id = AuthHelper.getCredentials() ? AuthHelper.getCredentials().user_id : null;
        let street = 'Not provided';

        if (typeof this.state.item.photos !== "undefined" && this.state.item.photos.length > 0) {
            images = this.state.item.photos.map((photo) => {
                return {
                    original: photo.path
                }
            });
        }

        if (typeof this.state.item.item_details.street !== "undefined" && this.state.item.item_details.street !== '' && this.state.item.item_details.street != null) {
            street = this.state.item.item_details.street;
            if (typeof this.state.item.item_details.street_number !== "undefined" && this.state.item.item_details.street_number !== '' && this.state.item.item_details.street_number != null) {
                street += ' ' + this.state.item.item_details.street_number;
            }
        }

        return (
            <Container className={"base-container"}>
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                {this.state.isLoading ? (
                    <Dimmer active inverted>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                ) : (
                    <Grid columns={2} divided>
                        <Grid.Column width={5}>
                            <ImageGallery
                                items={images}
                                showPlayButton={false}
                                showIndex={true}
                                showThumbnails={false}
                            />
                            {this.state.item.user.id !== user_id ? (
                                <Card fluid>
                                    <Card.Content>
                                        <Label ribbon style={{marginBottom: '10px'}}>
                                            User contact
                                        </Label>
                                        <Card.Header>{this.state.item.user.firstname} {this.state.item.user.lastname}</Card.Header>
                                        <Card.Meta>Phone number: {this.state.item.user.phone_number}</Card.Meta>
                                        <Card.Meta>Email: {this.state.item.user.email}</Card.Meta>
                                    </Card.Content>
                                    {user_id !== null ? (
                                    <Card.Content extra>
                                        <div className='ui two buttons'>
                                            <Button basic color='green' onClick={() => this.onButtonClick()}>
                                                Open chat
                                            </Button>
                                        </div>
                                    </Card.Content>
                                        ) : '' }
                                </Card>
                            ) : (
                                <section>
                                    <Divider horizontal />
                                    <Button fluid color={'green'} onClick={() => this.onUpdateButtonClick()}>
                                        Update item
                                    </Button>
                                    <Divider horizontal>Or</Divider>
                                    <Button fluid color={'red'} onClick={() => this.onDeleteButtonClick()}>
                                        Remove item
                                    </Button>
                                </section>
                            )}
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Segment color={'blue'}>
                                <Header as='h1'>{this.state.item.type === ItemConstants.ITEM_MISSING ? 'Missing: ' : 'Found: '}{this.state.item.title}</Header>
                                <Header sub disabled style={{marginBottom: '10px'}}>Created at: {moment.unix(this.state.item.created_at).format('LLL')}</Header>
                                <Container textAlign={"justified"}>
                                    <Header as='h5' dividing>
                                        Description
                                    </Header>
                                    <p>
                                        {this.state.item.description}
                                    </p>
                                </Container>
                                <Header as='h5' dividing>
                                    Address details
                                </Header>
                                <List>
                                    <List.Item icon='flag' content={'Country: ' + ((this.state.item.item_details.country !== '' && this.state.item.item_details.country != null) ? this.state.item.item_details.country : 'Not provided')} />
                                    <List.Item icon='point' content={'City: ' + this.state.item.item_details.city} />
                                    <List.Item icon='road' content={'Street: ' + street} />
                                    <List.Item icon='clock' content={(this.state.item.type === ItemConstants.ITEM_MISSING ? 'Lost around: ' : 'Found around: ') + moment.unix(this.state.item.item_details.daytime).format('LLL')} />
                                </List>
                            </Segment>
                        </Grid.Column>
                        {this.state.showChat && AuthHelper.isLoggedIn() ?
                        <Chat firstname={this.state.item.user.firstname} lastname={this.state.item.user.lastname} user_id={this.state.item.user.id}/>
                            : null }
                    </Grid>
                )}
            </Container>
        )
    }
}

export default ItemView;