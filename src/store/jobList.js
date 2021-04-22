import firebase from "firebase";
import { auth, db } from '@/firebase/init';


export default {
  actions: {
    async fetchJobList({dispatch, commit}) {
      try {
        const uid = auth.currentUser?.uid;
        let myPrivateJobList = await db.collection('usersJobs')
          .where('idUser', '==', uid)
          .where('isFinish', '==', false)
          .orderBy('timeCreated', 'desc')
          .get()

        let arr = myPrivateJobList.docs.map(doc => ({id: doc.id, ...doc.data()}));
        for (let i = 0; i < myPrivateJobList.docs.length; i++) {
           let item = await dispatch('fetchGlobalWorkListById', myPrivateJobList.docs[i].data().idWorkList);
           arr[i] = { ...arr[i], rate: item.rate, mark: item.mark, author: item.author, views: item.view }
        }

        return arr
      }catch (e) {
        console.log(e)
        throw e;
      }
    },
    async fetchFinishedJobList({}) {
      try {
        const uid = auth.currentUser?.uid;

        const items = await db.collection('usersJobs')
          .where('idUser', '==', uid)
          .where('isFinish', '==', true)
          .get();

        return items.docs.map(doc => ({id: doc.id, ...doc.data()}));
      }catch (e) {
        console.log(e)
        throw e
      }
    },
    async fetchJobListById({}, id) {
      try {
        const item = await db.collection('usersJobs')
          .doc(id)
          .get()

        return {id: item.id, ...item.data()};
      }catch (e) {
        throw e;
      }
    },
    async createJobList({dispatch, commit}, {id, obj}) {
      try {
        const idUser = auth.currentUser?.uid;
        const newJob = await db.collection('usersJobs')
          .add({
            items: obj.items.map(i => ({isChecked:false, ...i})),
            titleJobList: obj.titleJobList,
            img: obj.img,
            comment: null,
            earnMoney: 1,
            idUser,
            idWorkList: id,
            name: obj.name,
            category: obj.category || 'unknown',
            progress: 0,
            spentTime: null,
            timeFinish: null,
            isFinish: false,
            timeStart: +Date.now(),
            timeCreated: +Date.now()
          })
        return newJob.id;
      }catch (e) {
        console.log(e)
        throw e;
      }
    },
    async updateJobList({}, obj) {
      try {
        await db.collection('usersJobs')
          .doc(obj.id)
          .update({
            items: [...obj.items],
            progress: obj.progress
          })
      }catch (e) {
        console.log(e);
        throw e;
      }
    },
    async updateFieldsJobList({}, obj) {
      try {
        await db.collection('usersJobs')
          .doc(obj.id)
          .update({
            spentTime: obj. spentTime,
            titleJobList: obj.titleJobList,
            earnMoney: +obj.earnMoney,
            typeCurrency: obj.typeCurrency,
            comment: obj.comment,
            timeFinish: obj.timeFinish || Date.now(),
            timeStart: obj.timeStart,
            isFinish: obj.isFinish
          })
      }catch (e) {
        throw e;
      }
    },
    async deleteJobList({}, id) {
      try {
        await db.collection('usersJobs')
          .doc(id)
          .delete()
      }catch (e) {
        throw e
      }
    }
  }
}
