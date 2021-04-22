import firebase from "firebase";
import { auth, db } from '@/firebase/init';


export default {
  actions: {
    async fetchHistory({dispatch}) {
      const user = await dispatch('getCurrentUser');
      const workList = await db.collection('workLists').get();
      const arr = workList.docs.map((doc) => ({id: doc.id, ...doc.data()}))
      let readyList = [];

      for (let i = 0; i < arr.length; i++) {
        const globalItem = await dispatch('fetchGlobalWorkListById', arr[i].id)
        if (globalItem) {
          arr[i].views = globalItem.view;
          arr[i].rate = globalItem.rate;
        }
        const item = await db.collection('workLists')
          .doc(arr[i].id)
          .collection('views')
          .where('id', '==', user.id)
          .get();
        if(item.docs.length) {
          readyList.push({...item.docs[0].data(), ...arr[i]});
        }
      }
      return readyList;
    }
  }
}
