import React from 'react';
import {Launcher} from 'react-chat-window';

// TODO: get proper messages
class Chat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messageList: [],
            isOpen: true
        };
    }

    _onMessageWasSent(message) {
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

    render() {
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