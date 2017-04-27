import React from "react";

const ChatListBox = ({ name, content, date, myMessage }) => {
    if (!myMessage) {
        return (
            <div className="chatMessage">
                <div className="chatMessagePhoto">
                    <img className="chatUserPhoto" src="https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/17796359_1943267919292900_8030474445745344214_n.jpg?oh=d6c60e9b39ef16fe98976f12e09505a9&amp;oe=5999887A" />
                </div>
                <div className="chatMessageContent">
                    <div className="chatMessageName">
                        {name}
                    </div>
                    <div className="chatMessageText">
                        {content}
                    </div>
                    <div className="chatMessageDate">
                        {date}
                    </div>
                </div>

            </div>
        );
    } else {
        return (
            <div className="chatMessage mine">
                <div className="chatMessageContent mine">
                    <div className="chatMessageText mine">
                        {content}
                    </div>
                    <div className="chatMessageDate mine">
                        {date}
                    </div>
                </div>

            </div>
        );
    }
};

export default ChatListBox;
