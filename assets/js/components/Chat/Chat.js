import React from 'react';
import {Launcher} from 'react-chat-window';
import AuthHelper from '../../helpers/AuthHelper';
import * as MessageConstants from "../../constants/MessageConstants";
import MessageStore from "../../stores/MessageStore";
import * as MessageActions from "../../actions/MessageActions";
import * as ItemActions from "../../actions/ItemActions";

class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messageList: [],
            isOpen: true,
            conn: new WebSocket('ws://localhost:8080?user_id=' + AuthHelper.getCredentials().user_id)
        };

        this._sendMessage = this._sendMessage.bind(this);
        this.setConversationHistory = this.setConversationHistory.bind(this);
    }

    componentWillMount() {
        MessageStore.on(MessageConstants.MESSAGE_RECEIVED_SUCCESS, this._sendMessage);
        MessageStore.on(MessageConstants.MESSAGE_FETCH_SUCCESS, this.setConversationHistory);
    }

    componentWillUnmount() {
        MessageStore.removeListener(MessageConstants.MESSAGE_RECEIVED_SUCCESS, this._sendMessage);
        MessageStore.removeListener(MessageConstants.MESSAGE_FETCH_SUCCESS, this.setConversationHistory);
        this.state.conn.close();
    }

    componentDidMount() {
        MessageActions.fetchMessages(this.props.user_id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.user_id !== prevProps.user_id) {
            MessageActions.fetchMessages(this.props.user_id);
        }
    }

    _onMessageWasSent(message) {
        this.state.conn.send(JSON.stringify({
            from: AuthHelper.getCredentials().user_id,
            to: this.props.user_id,
            text: message.data.text
        }));
        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    setConversationHistory(data) {
        let json = JSON.parse(data);
        let messages = json.map((message) => {
            return {
                author: AuthHelper.getCredentials().user_id == message.from.id ? 'me' : 'them',
                type: 'text',
                data: { text: message.text }
            }
        });

        this.setState({
            messageList: messages
        })
    }

    render() {
        this.state.conn.onopen = function(e) {
            console.log("Connection established!");
        };

        this.state.conn.onmessage = function(e) {
            MessageActions.receiveMessage(e.data);
        };

        this.state.conn.onerror = function(e) {
            console.log(e);
        };

        this.state.conn.onclose = function (e) {
            console.log("Disconnected")
        };

        return (
            <Launcher
                agentProfile={{
                    teamName: this.props.firstname + ' ' + this.props.lastname,
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messageList}
                isOpen={this.state.isOpen}
                handleClick={() => this.setState({isOpen: !this.state.isOpen})}
                showEmoji={false}
            />)
    }
}

export default Chat;