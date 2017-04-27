import { pubsub } from '../pubsub/pubsub.js';
import { merge } from 'lodash';
// import ChatResolver from './Chat/ChatResolver'

export const RootResolver = {

  Query: {
    chatContents(obj, args, context){
      console.log('Chat', obj, args, context)
      let newObj = {}
      newObj.name = "TestName"
      newObj.content = "TestContent"
      newObj.date = "TestDate"
      let newObj2 = {}
      newObj.name = "TestName"
      newObj.content = "TestContent"
      newObj.date = "TestDate"
      return [newObj, newObj2]
    }
  },

};



  // Mutation: {
  //   sendMessages(obj, args, context){
  //     console.log('Message', obj, args, context)
  //     let newObj = {}
  //     newObj.id = args.id
  //     newObj.content = args.content
  //     newObj.chatRoom = args.chatRoom

  //     const payload = { 
  //       //최초에 서브스크립션 요청을 보냈을 때의 이름인 commentAdded로 key값을 지정해주는 것이 매우 중요하다.
  //       commentAdded: {
  //         chatRoom: args.chatRoom,
  //         id: '1',
  //         content: 'Hello! Iam Subscription',
  //       }
  //     }
  //     //요기서 쏴줌(근데 filter에서 검증함.)
  //     pubsub.publish('commentAdded', payload);
  //     //뮤테이션에 대한 리턴은 해주던가 말던가
  //     return newObj
  //   }
  // },

  // JSON: GraphQLJSON,







