import React from 'react';
import MessageStore from "../../stores/MessageStore";
import ChatStore from "../../stores/ChatStore";
import * as MessageConstants from "../../constants/MessageConstants";
import * as ChatConstants from "../../constants/ChatConstants";
import * as MessageActions from "../../actions/MessageActions";
import * as ChatActions from "../../actions/ChatActions";
import {Dimmer, Loader, Dropdown} from 'semantic-ui-react';
import Chat from '../Chat/Chat';

class MessageDropdownList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            conversations: [],
            isLoading: false,
            showChat: false,
            chatUser: {
                id: '',
                firstname: '',
                lastname: '',
            }
        };

        this.handleMessageDropdownFetchSuccess = this.handleMessageDropdownFetchSuccess.bind(this);
        this.handleMessageDropdownFetchFailed = this.handleMessageDropdownFetchFailed.bind(this);
        this.fetchConversations = this.fetchConversations.bind(this);
        this.handleConversationClick = this.handleConversationClick.bind(this);
        this.handleViewItemChatRendered = this.handleViewItemChatRendered.bind(this);
    }

    componentWillMount() {
        MessageStore.on(MessageConstants.MESSAGE_CONVERSATIONS_FETCH_SUCCESS, this.handleMessageDropdownFetchSuccess);
        MessageStore.on(MessageConstants.MESSAGE_CONVERSATIONS_FETCH_FAILED, this.handleMessageDropdownFetchFailed);
        ChatStore.on(ChatConstants.VIEW_ITEM_CHAT_RENDERED, this.handleViewItemChatRendered);
    }

    componentWillUnmount() {
        MessageStore.removeListener(MessageConstants.MESSAGE_CONVERSATIONS_FETCH_SUCCESS, this.handleMessageDropdownFetchSuccess);
        MessageStore.removeListener(MessageConstants.MESSAGE_CONVERSATIONS_FETCH_FAILED, this.handleMessageDropdownFetchFailed);
        ChatStore.removeListener(ChatConstants.VIEW_ITEM_CHAT_RENDERED, this.handleViewItemChatRendered);
    }

    fetchConversations() {
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        }));
        MessageActions.fetchConversations();
    }

    handleViewItemChatRendered() {
        this.setState({
            showChat: false
        });
    }

    handleMessageDropdownFetchSuccess(data) {
        let conversations = JSON.parse(data).map((message) => {
            return message.from;
        });
        this.setState(prevState => ({
            isLoading: !prevState.isLoading,
            conversations: conversations
        }));
    }

    handleMessageDropdownFetchFailed(error) {
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        }));
    }

    handleConversationClick(conversation) {
        ChatActions.hideViewItemChat();
        this.setState({
            showChat: true,
            chatUser: {
                id: conversation.id,
                firstname: conversation.firstname,
                lastname: conversation.lastname,
            }
        });
    }

    render() {
        return (
            <section>
                <Dropdown item text='Messages' loading={this.state.isLoading} onOpen={() => this.fetchConversations()}>
                    <Dropdown.Menu>
                        <Dropdown.Header>Recent messages</Dropdown.Header>
                        {this.state.conversations.map((conversation) => {
                            return <Dropdown.Item key={conversation.id} onClick={() => this.handleConversationClick(conversation)}>{conversation.firstname + ' ' + conversation.lastname}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                {this.state.showChat ?
                    <Chat firstname={this.state.chatUser.firstname} lastname={this.state.chatUser.lastname} user_id={this.state.chatUser.id}/>
                    : null }
            </section>
        );
    }
}

export default MessageDropdownList;