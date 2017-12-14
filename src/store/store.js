import { firebaseMutations, firebaseAction } from 'vuexfire'
import firebase from 'firebase'

let db = firebase.database()
let driverRef = db.ref('driver')
let callRef = db.ref('call')

export default {
  state: {
    sec: 0,
    money: 0,
    driver: {},
    lat: 0,
    long: 0,
    caller: {
    }
  },
  getters: {
    sec: state => state.sec,
    money: state => state.money,
    driver: state => state.driver,
    lat: state => state.lat,
    long: state => state.long,
    caller: state => state.caller
  },
  mutations: {
    ...firebaseMutations,
    updateCost (state, payload) {
      state.sec = payload.Sec
      state.money = payload.cost
    },
    updateCoods (state, payload) {
      state.long = payload.long
      console.log(state.long)
    },
    setCaller (state) {
      callRef.once('child_added', snapshot => {
        state.caller = snapshot
      })
    }
  },
  actions: {
    async setTime (store, payload) {
      store.commit('updateCost', payload)
    },
    async setCoods (store, payload) {
      store.commit('updateCoods', payload)
    },
    setCaller (store, msg) {
      store.commit('setCaller')
    },
    newDriver (store, payload) {
      driverRef.push(payload)
    },
    binddriverRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('driver', driverRef)
    }),
    unbinddriverRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      unbindFirebaseRef('driver')
    }),
    bindcallRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      bindFirebaseRef('test', callRef)
    }),
    unbindcallRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }) => {
      unbindFirebaseRef('test')
    })
  }
}
