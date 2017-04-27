import gql from "graphql-tag";


//서브스크립션에서 연결시킬때 최초로 받아오는 쿼리
export const CHAT_QUERY = gql`
    query Comment($projectid: String!) {
      chatContents(projectid: $projectid) {
          name
          content
          date
      }
    }
`;

//서브스크립션을 찝는 쿼리
export const CHAT_SUBSCRIPTION = gql`
    subscription chatSubscription($projectid: String!){
      chatSubscription(projectid: $projectid){
        name
        content
        date
      }
    }
`;

