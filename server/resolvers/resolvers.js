import { pubsub } from '../pubsub/pubsub.js';

export const resolvers = {

  Query: {
    chatContents(obj, args, context){
      console.log('Chat', obj, args, context)
      let newObj = {}
      newObj.name = "성찬Test"
      newObj.content = "저는 테스트를 많이 합니다"
      newObj.date = "2016/11/30"
      let newObj2 = {}
      newObj2.name = "덕연Test2"
      newObj2.content = "저는 테스트를 좋아하지 않습니다"
      newObj2.date = "2015/12/30"
      return [newObj, newObj2]
    },
  },

  Mutation: {
    sendMessage(obj, args, context){
      console.log('Mutation Message', obj, args, context)
      let payload = {
        //최초에 서브스크립션 요청을 보냈을 때의 이름인 chatSubscription로 key값을 지정해주는 것이 매우 중요하다.
        chatSubscription: {
          projectid: args.projectid,
          name: args.name,
          content: args.content,
          date: args.date
        }
      }
      //요기서 쏴줌(근데 filter에서 검증함.)
      pubsub.publish('chatSubscription', payload);
      //뮤테이션에 대한 리턴은 해주던가 말던가
    }
  },

  // Subscription: {
  //   chatSubscription(obj, args, context){
  //     console.log("Subscription Resovler", ojb, args, context)
  //     let newObj = {}
  //     newObj.name = "TestName"
  //     newObj.content = "TestContent"
  //     newObj.date = "TestDate"
  //     return newObj
  //   }
  // }

};












