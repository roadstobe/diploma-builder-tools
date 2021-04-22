import {auth, db} from '@/firebase/init';

export default {
  state: {
    idAddedWorkList: null
  },
  getters: {
    getIdAddedWorkList: state => {
      return state.idAddedWorkList
    }
  },
  mutations: {
    setIdAddedWorkList: (state, value) => {
      state.idAddedWorkList = value;
    },
    clearIdAddedWorkList: (state, _) => {
      state.idAddedWorkList = null;
    },
  },
  actions: {
    async fetchDynamicPrivateWorkListItems({dispatch}, obj) {
      let list = await db
        .collection('userWorkLists')
        .doc(obj.idWorkList)
        .get()

      let readyList = {...list.data()};

      let globalItem =  await dispatch('fetchGlobalWorkListById', list.data().idGlobalWorkList)

      console.log(globalItem)

      if (globalItem) {
        readyList.views = globalItem.view;
        readyList.rate = globalItem.rate;
      } else {
        readyList.views = 'del'
        readyList.rate = 'del'
      }

      return readyList;
    },
    async fetchDynamicWorkListItems({dispatch, commit}, obj){
      try {
        const currentList = await dispatch('fetchGlobalWorkListById', obj.idWorkList);
        let list = await db
          .collection('workLists')
          .doc(obj.idWorkList)
          .collection('itemsUser')
          .doc(obj.idUser)
          .get()

        if(!list.data()) {
          await dispatch('createDynamicWorkListItems', obj);
          list = await db
            .collection('workLists')
            .doc(obj.idWorkList)
            .collection('itemsUser')
            .doc(obj.idUser)
            .get()
        }

        let dynamicList = {
          ...currentList, items: []
        };

        for (let i = 0; i < currentList.items.length; i++){
          if(i < list.data().items.length){
            if(currentList.items[i].idItem === list.data().items[i].idItem){
              dynamicList.items.push( {isChecked: list.data().items[i].isChecked,...currentList.items[i]})
            }else{
              dynamicList.items.push({isChecked: false,...currentList.items[i]})
            }
          }else{
            dynamicList.items.push({isChecked: false,...currentList.items[i]})
          }
        }


        return {...dynamicList};
      }catch (e) {
        console.log(e)
      }
    },
    async createDynamicWorkListItems({dispatch, commit}, obj) {
     try {
       const list = await dispatch('fetchGlobalWorkListById', obj.idWorkList);
       const subCollectionItems = await db.collection('workLists')
         .doc(obj.idWorkList)
         .collection('itemsUser')
         .doc(obj.idUser)
         .set({
           items: list.items.map(i => ({isChecked:false, ...i})),
         });
     }catch (e) {
       console.log(e)
     }
    },
    async updateDynamicWorkListItems({dispatch, commit}, obj) {
      const subCollectionItems = await db.collection('workLists')
        .doc(obj.idWorkList)
        .collection('itemsUser')
        .doc(obj.idUser)
        .set({
          items: [...obj.items],
        });
    },
    async updateDynamicPrivateWorkListItems({dispatch, commit}, obj) {
      await db.collection('userWorkLists')
        .doc(obj.idWorkList)
        .update({
          items: [...obj.items],
        });
    },
    async createCopyWorkListById({dispatch, commit}, id) {
      try {
        const user = await dispatch('getCurrentUser');
        const publicWorkList = await db.collection('workLists')
          .doc(id)
          .get();

        const maybeGetID = await db.collection('userWorkLists').add({
          author: publicWorkList.data().author,
          idGlobalWorkList: id,
          idUser: user.id,
          img: publicWorkList.data().img,
          category: publicWorkList.data().category,
          isCopy: true,
          items: publicWorkList.data().items.map(i=> ({isChecked: false, ...i})),
          name: publicWorkList.data().name,
          timeCreated: +Date.now(),
          pathToImage: ''
        })

        return maybeGetID.id;

      }catch (e) {
        console.log(e)
        throw e;
      }
    }
  }
}
