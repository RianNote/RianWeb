import React, { Component } from "react";
import { connect } from "react-redux";
import ChatListBox from "./ChatListBox";
import "./Chatstyle.css";
import { graphql, compose } from "react-apollo";
import {
    CHAT_QUERY,
    CHAT_SEND,
    CHAT_SUBSCRIPTION
} from "../../graphqls/ChatGraphQL";
//채팅 처음 켰을때, 과거 대화내용 가지고 오는 쿼리
const getPastChat = graphql(CHAT_QUERY, {
    name: "getPastChat",
    options: props => ({
        variables: {
            projectid: props.match.params.projectId
        }
    })
});
//메시지 보내는 쿼리
const sendChatMessage = graphql(CHAT_SEND, {
    props: ({ mutate }) => ({
        sendMessage: message =>
            mutate({
                variables: {
                    projectid: message.projectid,
                    userid: message.userid,
                    name: message.name,
                    content: message.content,
                    date: message.date
                }
            })
    })
});

@compose(getPastChat, sendChatMessage)
@connect(mapState)
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMode: false,
            List: null,
            value: "",
            path: this.props.match.params.projectId,
            subscriptionIng: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickChatButton = this.clickChatButton.bind(this);
    }

    componentDidMount() {
        console.log("CompoentDidmount Chat", this.props, this.state);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Chat", nextProps);
        //최초 쿼리가 성공했을때, 서브스크립션 ON
        const { getPastChat } = nextProps;
        if (nextProps.getPastChat.chatContents && !this.state.subscriptionIng) {
            console.log("StartSubscripont");
            getPastChat.subscribeToMore({
                document: CHAT_SUBSCRIPTION,
                variables: {
                    projectid: this.state.path
                },
                updateQuery: (prev, { subscriptionData }) => {
                    // console.log("new sub", subscriptionData.data, prev)
                    return Object.assign({}, prev, {
                        chatContents: [
                            subscriptionData.data.chatSubscription,
                            ...prev.chatContents
                        ]
                    });
                }
            });
            this.setState(() => ({
                subscriptionIng: true
            }));
        }
        console.log("getPastChat.chatContents", getPastChat.chatContents);
        this.setState(() => ({
            List: getPastChat.chatContents
        }));
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.value) return;
        this.props.sendMessage({
            projectid: this.state.path,
            name: "락앤롤",
            userid: this.props.Userid,
            content: this.state.value,
            date: "2017/09/30"
        });
        this.setState(() => ({
            value: ""
        }));
    }

    clickChatButton(e) {
        if (e.target.className === "chatButton") {
            this.setState(() => ({
                chatMode: !this.state.chatMode
            }));
        }
    }
    render() {
        let MessageList = ""
        if (this.state.List) {
            MessageList = this.state.List.map((data, index) => {
                return (
                    <ChatListBox
                        key={index}
                        name={data.name}
                        content={data.content}
                        date={data.date}
                        myMessage={this.props.Userid === data.userid}
                    />
                );
            });
        } 
        return (
            <div className="chatButton" onClick={this.clickChatButton}>
                <div
                    className="chatContainer"
                    style={{
                        visibility: this.state.chatMode ? "visible" : "hidden"
                    }}
                >
                    <div className="chatBox">
                        <div className="sendBox">
                            <div className="messageList">
                                {MessageList}
                            </div>
                            <div className="chatInput">
                                <input
                                    className="textInput"
                                    type="text"
                                    value={this.state.value}
                                    placeholder="입력.."
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="button"
                                    className="sendButton"
                                    onClick={this.handleSubmit}
                                    value="보내기"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapState(state) {
  return {
    Userid: state.User._id,
    Project: state.Project
  };
}


