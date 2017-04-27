import gql from "graphql-tag";



export const CHAT_QUERY = gql`
    query getChatQuery($projectid: String!) {
      chatContents(projectid: $projectid) {
          name
          content
          date
      }
    }
`;

export const CHAT_SEND = gql`
    mutation sendChatMessage($projectid: String!, $name: String!, $content: String!, $date: String!) {
      sendMessage(projectid: $projectid, name: $name, content: $content, date: $date) {
          name
          content
          date
      }
    }
`

export const CHAT_SUBSCRIPTION = gql`
    subscription chatSubscription($projectid: String!){
      chatSubscription(projectid: $projectid){
        name
        content
        date
      }
    }
`;

