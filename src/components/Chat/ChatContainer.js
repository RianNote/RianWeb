import React, { Component } from "react";
import "./Chatstyle.css";
import { graphql, compose } from "react-apollo";
import { SEND_MESSAGE, CHAT_QUERY, COMMENTS_SUBSCRIPTION } from '../../graphqls/ChatGraphQL'
const getChat = graphql(CHAT_QUERY, 
    { 
        name: "getChat", 
        options: (props)=>({
            variables: {
                projectid: props.match.params.projectId
            }
        }),
        props: props => {
            return {
                subscribeNewChatMessage: params => {
                    console.log('params', params)
                    return props.getChat.subscribeToMore({
                        document: COMMENTS_SUBSCRIPTION,
                        variables: {
                            projectid: props.match.params.projectId
                        }
                    })


                }
            }
        }
})

@compose(
    getChat
)

export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			List: "",
			value: "",
			path: this.props.path
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

    componentDidMount() {
        console.log('CompoentDidmount Chat', this.props)
    }

    componentWillReceiveProps(nextProps) {
        console.log("Chat", nextProps, this.props)
    }

	handleChange(e) {
		console.log(e.target.value);
		this.setState({
			value: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState(() => ({
			value: ""
		}));
	}

	render() {
		return (
			<div className="chat-container">
				<div className="chat-button" />
				<div className="chat-box">
					<div className="message-list" />
					{this.state.List}
					<div className="send-box">
						<input
							className="text-input"
							type="text"
							value={this.state.value}
							placeholder="프리라이더.."
							onChange={this.handleChange}
						/>
						<div
							className="send-button"
							onClick={this.handleSubmit}
						>
							보내기
						</div>
					</div>
				</div>
			</div>
		);
	}
}
