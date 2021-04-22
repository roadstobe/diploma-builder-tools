import firebase from "firebase";
import {auth, db} from '@/firebase/init';

const LIMIT = 5;

export default {
  actions: {
    //fetch
    async fetchGlobalWorkList({dispatch, commit}) {
      try {
        const snapshot = await db.collection('workLists')
          .where('publicStatus', '==', true)
          .where('isDeleted', '==', false)
          .orderBy('timeCreated', 'desc')
          .limit(LIMIT)
          .get();
        let arr = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        arr = await dispatch('getForGlobalWorkList', arr);
        return arr
      } catch (e) {
        throw e;
      }
    },
    //get user work list from private collection
    async fetchUserWorkListAll({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const snapshot = await db.collection('userWorkLists')
          .where('idUser', '==', uid)
          .orderBy('timeCreated', 'desc')
          .get();
        const arr = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data(), table: 'userWorkLists'}))
        for (let i = 0; i < arr.length; i++) {
          const globalItem = await dispatch('fetchGlobalWorkListById', arr[i].idGlobalWorkList)
          if (globalItem) {
            arr[i].views = globalItem.view;
            arr[i].rate = globalItem.rate;
            arr[i].author = globalItem.author;
          } else {
            arr[i].views = 'del'
            arr[i].rate = 'del'
            arr[i].author = 'unknown'
          }
        }
        return arr;
      } catch (e) {
        throw e;
      }
    },
    //get user self collection from main collection
    async fetchUserPrivateWorkListFromMainCollection({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');

        const collection = await db.collection('workLists')
          .where('idCreator', '==', uid)
          .where('isDeleted', '==', false)
          .orderBy('timeCreated', 'desc')
          .get()

        let arr = collection.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        arr = await dispatch('getForGlobalWorkList', arr);
        return arr
      } catch (e) {
        throw e;
      }
    },
    //in cabinet combine global work list with rate
    async fetchGlobalWorkListById({dispatch, commit}, id) {
      try {
        const item = await db.collection('workLists')
          .doc(id)
          .get()

        if (item.data()) {
          //get rate collection
          const rate = await dispatch('fetchMark', id);
          const view = (await dispatch('fetchView', id)).length;
          return {...item.data(), rate, view, id: id};//добавил Yan
        } else {
          return null
        }

      } catch (e) {
        console.log(e)
      }
    },
    //for editing copy list
    async fetchCopyWorkListById({dispatch, commit}, {id, table}) {
      const item = await db.collection(table)
        .doc(id)
        .get()

      return item.data();
    },
    //Fetch rate collection
    async fetchMark({dispatch}, idCollection) {
      try {
        const user = await dispatch('getCurrentUser');
        const mark = await db.collection('workLists')
          .doc(idCollection)
          .collection('rate')
          .get()


        if (user) {
          //looking for my rate
          let iHaveMark = null
          mark.docs.forEach(i => {
            if (i.id === user.id) {
              iHaveMark = i.data().mark
            }
          })

          return {
            mark:
              (mark.docs.reduce((acc, i) => {
                return acc += i.data().mark
              }, 0) / mark.docs.length).toFixed(1),
            myMark: iHaveMark
          }
        } else {
          return {
            mark:
              (mark.docs.reduce((acc, i) => {
                return acc += i.data().mark
              }, 0) / mark.docs.length).toFixed(1),
            myMark: 0
          }
        }
        // const user = await db.collection('users').doc(await dispatch('getUid')).get();

      } catch (e) {
        console.log(e)
        throw e
      }

      //mark.docs.map(doc => ({mark: doc.data().mark}))
    },
    //get view subcollection
    async fetchView({}, idCollection) {
      try {
        const snapshot = await db.collection('workLists')
          .doc(idCollection)
          .collection('views')
          .get()

        return snapshot.docs.map(doc => ({...doc.data()}))
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    //Create
    async createGlobalWorkList({dispatch, commit, getters}, workList) {
      try {
        const user = await dispatch('getCurrentUser');

        workList = await dispatch('uploadImg', workList);
        workList = await dispatch('uploadImages', workList);

        let created = await db.collection('workLists').add({
          img: workList.imgListTool,
          author: user.name,
          idCreator: user.id,
          isCopy: false,
          isDeleted: false,
          items: workList.items.map((i, index) => ({idItem: index, ...i})),
          lastItemsId: workList.items.length,
          name: workList.name,
          category: workList.category,
          publicStatus: workList.privacyStatus,
          timeCreated: +Date.now(),
          pathToImage: workList.pathToImage
        })

        await db.collection('workLists')
          .doc(created.id)
          .collection('rate')
          .doc(user.id)
          .set({
            mark: +0,
            comment: ''
          });

        await db.collection('workLists')
          .doc(created.id)
          .collection('views')
          .doc(user.id)
          .set({
            time: Date.now(),
            id: user.id,
            count: 1
          });

        return {id: created.id, ...workList, isCopy: false};
      } catch (e) {
        throw e;
      }

    },
    async createCopyList({dispatch, commit}, fromItem) {
      try {
        let user = null;
        if ('user' in fromItem) {
          user = {...fromItem.user}
        } else {
          user = await dispatch('getCurrentUser');
        }

        await db.collection('userWorkLists').add({
          author: fromItem.author,
          idGlobalWorkList: fromItem.id,
          idUser: user.id,
          img: fromItem.img,
          category: fromItem.category,
          isCopy: true,
          items: fromItem.items.map(i=> ({isChecked: false, ...i, pathToImage: null})),
          name: fromItem.name,
          timeCreated: +Date.now(),
          lastItemsId: fromItem.items.length,
          pathToImage: null
        })
      } catch (e) {
        console.log(e)
      }
    },
    //Edit
    async putPrivateWorkListById({dispatch, commit}, data) {
      try {
        data = await dispatch('uploadImg', data);
        data = await dispatch('uploadImages', data);

        let table = 'userWorkLists';
        if (!data.isCopy) {
          table = 'workLists'
        }

        const currentItem = await db.collection(table).doc(data.id);

        if (data.isCopy) {
          await currentItem.update({
            img: data.imgListTool,
            category: data.category,
            items: data.items.map(i => ('isChecked' in i ? {...i} : {isChecked: false, ...i})),
            name: data.name,
            pathToImage: data.pathToImage,
            lastItemsId: data.lastItemsId,
          })
        } else {
          await currentItem.update({
            img: data.imgListTool,
            publicStatus: data.privacyStatus,
            lastItemsId: data.lastItemsId,
            category: data.category,
            items: [...data.items],
            name: data.name,
            pathToImage: data.pathToImage
          })
        }


      } catch (e) {
        console.log(e)
      }
    },
    //Set mark
    async putMarkGlobalList({dispatch}, ob) {
      try {
        const user = await db.collection('users').doc(await dispatch('getUid')).get();

        await db.collection('workLists')
          .doc(ob.id)
          .collection('rate')
          .doc(user.data().id)
          .set({
            mark: ob.mark
          })
      } catch (e) {
        throw e
      }

    },
    //Set view
    async putViewGlobalList({dispatch}, id) {
      try {
        const user = await dispatch('getCurrentUser');
        if (!user) {
          return
        }

        const getCount = await db.collection('workLists')
          .doc(id)
          .collection('views')
          .doc(user.id)
          .get()

        let countView = getCount.data() ? getCount.data().count : 0

        await db.collection('workLists')
          .doc(id)
          .collection('views')
          .doc(user.id)
          .set({
            time: Date.now(),
            id: user.id,
            count: ++countView
          })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    //Delete
    async deletePrivateWorkListById({dispatch}, {id, table}) {
      try {
        const list = await db.collection(table)
          .doc(id)
          .get()

        console.log(list.data())

        if (list.data().pathToImage) {
          await dispatch('deleteImageByPath', list.data().pathToImage)
        }

        for (let i = 0; i < list.data().items.length; i++) {
          if (list.data().items[i].pathToImage) {
            await dispatch('deleteImageByPath', list.data().items[i].pathToImage)
          }
        }

        // await db.collection(table).doc(id).delete()
        if (table !== 'workLists') {
          await db.collection(table).doc(id).delete()
        } else {
          await db.collection('workLists').doc(id).delete();
          // await db.collection('workLists').doc(id).update({isDeleted: true})
        }

      } catch (e) {
        console.log(e)
      }
    },
    async fetchGlobalWorkListNextPage({dispatch}, data) {
      try {
        const snapshot = await db.collection('workLists')
          .where('publicStatus', '==', true)
          .where('isDeleted', '==', false)
          .orderBy('timeCreated', 'desc')
          .startAfter(data.timeCreated)
          .limit(LIMIT)
          .get();
        let arr = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        arr = await dispatch('getForGlobalWorkList', arr);
        return arr
      } catch (e) {
        throw e;
      }
    },
    async fetchGlobalWorkListPrevPage({dispatch}, data) {
      try {
        const snapshot = await db.collection('workLists')
          .where('publicStatus', '==', true)
          .where('isDeleted', '==', false)
          .orderBy('timeCreated', 'desc')
          .startAt(data.timeCreated)
          .limit(LIMIT)
          .get();
        let arr = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        arr = await dispatch('getForGlobalWorkList', arr);
        return arr;
      } catch (e) {
        throw e;
      }
    },
    //other function
    //for global work list
    async getForGlobalWorkList({dispatch}, arr) {
      try {
        for (let i = 0; i < arr.length; i++) {
          arr[i].rate = await dispatch('fetchMark', arr[i].id);
          arr[i].views = (await dispatch('fetchView', arr[i].id)).length;
        }

        return arr;
      } catch (e) {
        throw e;
      }
    },
    //image
    async uploadImg({dispatch}, workList) {
      //для приватного ліста потрібно буде робити копію фотографії
      //так як у зміні pathToImg буде лежати шлях оригінального ліста
      //можна буде зробити окрему папку або не їбатися і просто скопіювати фото
      //щоб скопіювати фото його якось треба перше дістати =(( тут починається проблема так як у нас є ітльки силка
      //або можна зі копіювати додатково силку
      //а може є у файр бейзі якісь інструменти для копіювання фото

      try {
        if (workList.imgListTool) {

          if (workList.imgListTool.includes('http')) {
            return workList;
          }

          // await dispatch('deleteImageByPath', workList.pathToImage);

          const storageRef = firebase.storage().ref()
          const oldPath = `${Date.now()}_${(Math.random() * 100).toFixed(1)}${workList.nameImg}`
          const path = `main/${workList.id ? workList.id : oldPath}`;
          let imageRef = storageRef
            .child(path)
          await imageRef.putString(workList.imgListTool, 'data_url')
          workList.imgListTool = await imageRef.getDownloadURL();
          workList.pathToImage = path;
        }

        return workList;
      } catch (e) {
        throw e
      }
    },
    async uploadImages({dispatch}, workList) {
      try {
        for(let i = 0; i < workList.beginItemArr.length; i++) {
          let res = workList.items.some(item => item.idItem === workList.beginItemArr[i].idItem);
          if(!res) {
            if(workList.beginItemArr[i].pathToImage){
              console.log("delete here")
              await dispatch('deleteImageByPath', workList.beginItemArr[i].pathToImage)
            }
          }
        }

        for (let i = 0; i < workList.items.length; i++) {
          if (workList.items[i].img && !workList.items[i].img.includes('http')) {
            if (workList.items[i].pathToImage) {
              await dispatch('deleteImageByPath', workList.items[i].pathToImage)
            }

            let arr = workList.items[i].img.split(';')
            let nameImgItem = arr[0].split('/');

            const path = `items/itemList${Date.now()}_${(Math.random() * 100).toFixed(1)}.${nameImgItem[1]}`;

            const storageRefS = firebase.storage().ref()
            let itemImageRef = storageRefS
              .child(path)
            await itemImageRef.putString(workList.items[i].img, 'data_url')
            workList.items[i].img = await itemImageRef.getDownloadURL();
            workList.items[i].pathToImage = path;
          }
        }

        return workList;
      } catch (e) {
        throw e;
      }
    },
    async deleteImageByPath({}, path) {
      const storageRef = firebase.storage().ref()
      let fileRef = storageRef.child(path);

      fileRef.delete().then(function () {
        // File deleted successfully
      }).catch(function (error) {
        // Uh-oh, an error occurred!
      });
    }
  }
}
