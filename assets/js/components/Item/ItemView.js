import React from 'react';
import ItemViewMainSection from './ItemViewMainSection.js';
import ItemViewLeftMenu from './ItemViewLeftMenu.js';
import {Container, Breadcrumb, Dimmer, Loader, Grid} from 'semantic-ui-react';
import BreadcrumbHelper from '../../helpers/BreadcrumbHelper';
import * as ItemConstants from "../../constants/ItemConstants";
import ItemStore from "../../stores/ItemStore";
import * as ItemActions from "../../actions/ItemActions";
import Chat from '../Chat/Chat';
import AuthHelper from '../../helpers/AuthHelper';
import * as ChatActions from "../../actions/ChatActions";
import * as ChatConstants from "../../constants/ChatConstants";
import ChatStore from "../../stores/ChatStore";
import PageNotFound from "../PageNotFound/PageNotFound";
import { toast } from 'react-toastify';

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
            isLoading: true,
            showChat: false,
            error: false
        };

        this.handleItemViewSuccess = this.handleItemViewSuccess.bind(this);
        this.handleItemViewFailed = this.handleItemViewFailed.bind(this);
        this.handleItemDeleteSuccess = this.handleItemDeleteSuccess.bind(this);
        this.handleItemDeleteFailed = this.handleItemDeleteFailed.bind(this);
        this.openChat = this.openChat.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.onUpdateButtonClick = this.onUpdateButtonClick.bind(this);
        this.handleHomeChatRendered = this.handleHomeChatRendered.bind(this);
    }

    componentWillUnmount() {
        ItemStore.removeListener(ItemConstants.ITEM_VIEW_SUCCESS, this.handleItemViewSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_VIEW_FAILED, this.handleItemViewFailed);
        ItemStore.removeListener(ItemConstants.ITEM_DELETE_SUCCESS, this.handleItemDeleteSuccess);
        ItemStore.removeListener(ItemConstants.ITEM_DELETE_FAILED, this.handleItemDeleteFailed);
        ChatStore.removeListener(ChatConstants.HOME_CHAT_RENDERED, this.handleHomeChatRendered);
    }

    componentDidMount() {
        ItemStore.on(ItemConstants.ITEM_VIEW_SUCCESS, this.handleItemViewSuccess);
        ItemStore.on(ItemConstants.ITEM_VIEW_FAILED, this.handleItemViewFailed);
        ItemStore.on(ItemConstants.ITEM_DELETE_SUCCESS, this.handleItemDeleteSuccess);
        ItemStore.on(ItemConstants.ITEM_DELETE_FAILED, this.handleItemDeleteFailed);
        ChatStore.on(ChatConstants.HOME_CHAT_RENDERED, this.handleHomeChatRendered);

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
            isLoading: false
        });
    }

    handleItemViewFailed(error) {
        this.setState({
            error: true
        });
        console.log(error);
    }

    handleItemDeleteSuccess(data) {
        toast.success("Item has been deleted!");
        this.props.history.push('/items');
    }

    handleItemDeleteFailed(error) {
        toast.error("Item deletion failed!");
        console.log(error);
    }

    openChat() {
        ChatActions.hideHomeChat();
        this.setState({
            showChat: true
        })
    }

    onDeleteButtonClick() {
        ItemActions.itemDelete(this.state.item.id);
    }

    onUpdateButtonClick() {
        this.props.history.push(`/items/update/${this.state.item.id}`);
    }

    render() {
        let item = this.state.item;

        if (this.state.error) {
            return (
                <PageNotFound/>
            )
        }

        if (this.state.isLoading) {
            return (
                <Container className={"base-container"}>
                    <Dimmer active inverted>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>
                </Container>
            )
        }

        return (
            <Container className={"base-container"}>
                <Breadcrumb icon='right angle' sections={BreadcrumbHelper.generate(this.props.location.pathname)} />
                <Grid columns={2} divided>
                    <Grid.Column width={5}>
                        <ItemViewLeftMenu
                            user={item.user}
                            photos={item.photos}
                            onOpenChatButtonClick={this.openChat}
                            onUpdateButtonClick={this.onUpdateButtonClick}
                            onDeleteButtonClick={this.onDeleteButtonClick}
                        />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <ItemViewMainSection
                            itemType={item.type}
                            title={item.title}
                            createdAt={item.created_at}
                            description={item.description}
                            itemDetails={item.item_details}
                        />
                    </Grid.Column>
                    {this.state.showChat && AuthHelper.isLoggedIn() ?
                    <Chat firstname={item.user.firstname} lastname={item.user.lastname} user_id={item.user.id}/>
                        : null }
                </Grid>
            </Container>
        )
    }
}

export default ItemView;