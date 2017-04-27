import React from "react";

const ChatListBox = ({ name, content, date }) => {
    return (
        <div>
            <div>
                {name}
            </div>
            <div>
                {content}
            </div>
            <div>
                {date}
            </div>
        </div>
    );
};

export default ChatListBox;