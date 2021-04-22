import firebase from "firebase";
import {auth, db} from '@/firebase/init';
// import * as firebase from 'firebase';

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state, info) {
      state.info = {}
    }
  },
  getters: {
    getInfoCurrentUser(state) {
      return state.info
    }
  },
  actions: {
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await auth.createUserWithEmailAndPassword(email, password)
          .then(user => {
            db.collection('users').doc(user.user.uid).set({
              id: user.user.uid,
              name: name,
              image: null,
              total: null,
              goal: null,
              email: email,
              isDeleted: null
            })
            auth.signInWithEmailAndPassword(email, password)
          })
      } catch (e) {
        throw e;
      }
    },
    async login({dispatch, commit}, {email, password}) {
      try{
        await auth.signInWithEmailAndPassword(email, password);
        const user = await db.collection('users').doc(await dispatch('getUid')).get();

        commit('setInfo', {id: user.data().id, name: user.data().name})

      }catch (e) {
        throw e
      }
    },
    async updateUser({commit, dispatch}, data) {
      try {
        data = await dispatch('savePhoto', data);
        return await db
          .collection('users')
          .doc(data.id).update({
            goal: data.goal,
            typeCurrency: data.typeCurrency,
            name: data.name,
            image: data.image
        });
      }catch (e) {
        console.log(e)
        throw e;
      }
    },
    async savePhoto({}, obj) {
      // const storageRef = firebase.storage().ref();
      // const ref = storageRef.child("images/" + name + Date.now());
      // ref.put(file);
      try {
        if (obj.image) {
          if(obj.image.includes('http')){
            return obj;
          }
          const storageRef = firebase.storage().ref()
          let imageRef = storageRef
            .child(`images/${obj.id}`)
          await imageRef.putString(obj.image, 'data_url')
          obj.image = await imageRef.getDownloadURL();
        }
        return obj;
      }catch (e) {
        throw e
      }
    },
    async deletePhoto({}, path) {
      if(path) {
        const storageRef = firebase.storage().ref()
        let fileRef = storageRef.child(path);
        fileRef.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      }
    },
    async resetPassword({}, email) {
      try {
        await auth.sendPasswordResetEmail(email);
        return 'You have received letter with reset password on your email. Please confirm this action to continue'
      }catch (e) {
        // return 'There is no user record corresponding to this identifier. The user may have been deleted.';
        throw e.message;
      }
    },
    async logout({commit}) {
      await auth.signOut()
      commit('clearInfo')
    },
    async getCurrentUser ({dispatch}) {
     try {
       const user = await db.collection('users').doc(await dispatch('getUid')).get();
       return user.data();
     }catch (e) {
       return null;
     }
    },
    async getUid() {
      const user = await auth.currentUser;
      return user ? user.uid : null;
    },
    async getCurrentUserFromAuth() {
      return auth.currentUser;
    },
    async deleteAccount({dispatch, commit}) {
      try{
        const user = await auth.currentUser;
        const path = `images/${user.uid}`;
        await db.collection('users')
          .doc(user.uid)
          .update({
            image: null,
            email: user.email,
            isDeleted: +Date.now()
          })
        await dispatch('deletePhoto', path);
        await user.delete().then(async () => {
           await dispatch('logout');
        }
        ).catch(error => {
          console.log(error);
          throw error;
        })

      }catch (e) {
        throw e;
      }

    }
  }
}
