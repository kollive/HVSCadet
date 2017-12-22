import {
    all,
    actionChannel,
    call,
    put,
    take,
    takeEvery,
    takeLatest,
    select,
    cancel,
    cancelled,
    fork,
    race,
    apply
  } from "redux-saga/effects";
  import { delay, buffers, eventChannel, END } from "redux-saga";
  import * as _ from "lodash";
  import * as io from "socket.io-client";
  import { types as roleTypes } from "reducers/rolereducer";
  
  //import { push } from 'react-router-redux';
  
  const attribApi = {
    
    getRoleTable(cname) {
      debugger;
      //console.log(userData.user);
      //console.log(userData.password);
  
      //new Promise((resolve, reject) => {
      return fetch("http://hvs.selfip.net:3003/ExecSP/", {
        //return fetch("http://localhost:3003/GetRoleTable/", {
        
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          spName: "sps_getRoles",
          parms: {
              "cname" : cname
          }
        })
      })
        .then(statusHelper)
        .then(response => response.json())
        .catch(error => error);
    },


    insRoleTable(userData) {
      debugger;
      //console.log(userData.user);
      //console.log(userData.password);
  
      //new Promise((resolve, reject) => {
      return fetch("http://hvs.selfip.net:3003/insRoleTable/", {
        //return fetch("http://hvs.selfip.net:4000/reactlogin/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          hv_table_i: userData.tableID,
          hv_universal_name: userData.value
        })
      })
        .then(statusHelper)
        .then(response => response.json())
        .catch(error => error);
    },

    delRoleTable(userData) {
      debugger;
      //console.log(userData.user);
      //console.log(userData.password);
  
      //new Promise((resolve, reject) => {
      return fetch("http://hvs.selfip.net:3003/delRoleTable/", {
        //return fetch("http://hvs.selfip.net:4000/reactlogin/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          hv_table_i: userData.tableID,
          hv_universal_i: userData.rowID
        })
      })
        .then(statusHelper)
        .then(response => response.json())
        .catch(error => error);
    },

    updRoleTable(userData) {
      debugger;
      //console.log(userData.user);
      //console.log(userData.password);
  
      //new Promise((resolve, reject) => {
      return fetch("http://hvs.selfip.net:3003/updRoleTable/", {
        //return fetch("http://hvs.selfip.net:4000/reactlogin/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          hv_table_i: userData.tableID,
          hv_universal_i: userData.rowID,
          hv_universal_name: userData.value
        })
      })
        .then(statusHelper)
        .then(response => response.json())
        .catch(error => error);
    }
    //.then(data => data)
  };
  
  function statusHelper(response) {
    debugger;
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
      //throw Error(response);
    }
    return response;
  }


  function* insertRoleTable(userData){
    try{
      
      yield put({
        type: roleTypes.ITEMS,
        items: []
      });

      yield put({
        type: roleTypes.SELECTED_ROWID,
        rowID: -1
      });
      
      const resultObj = yield call(attribApi.insRoleTable, userData.payload);
      //debugger;
      if (resultObj.response && !resultObj.response.ok) {
        debugger;
        yield put({
          type: roleTypes.MESSAGE,
          message: resultObj.response.statusText
        });
      } else {
        //debugger;
        console.log(JSON.parse(resultObj).result)
        const state = yield select();
        //debugger;
        const fetchTask = yield call(getRoleTable, {payload : {hv_table_i: userData.payload.tableID}});
        //debugger;


    } }catch (e) {

    }
    finally{

    }
  }

  function* updateRoleTable(userData){
    try{
      /*
      yield put({
        type: roleTypes.ITEMS,
        items: []
      });

      yield put({
        type: roleTypes.SELECTED_ROWID,
        rowID: -1
      });
      */

      const resultObj = yield call(attribApi.updRoleTable, userData.payload);
  
      debugger;
      if (resultObj.response && !resultObj.response.ok) {
        debugger;
        yield put({
          type: roleTypes.MESSAGE,
          message: resultObj.response.statusText
        });
      } else {
        debugger;
        console.log(JSON.parse(resultObj).result)
        const state = yield select();

        const newitems = state.roleleState.items.map((itm, index) => {
          if (_.trim(itm.hv_universal_i) !== _.trim(userData.payload.rowID)) {
              return itm;
          } else {
            debugger;
              var newItem = {
                  ...itm,
                  hv_universal_name: userData.payload.value,
                  //...action.item
              }
              return newItem;
          }
      })

      yield put({
        type: roleTypes.SELECTED_ROWID,            
        rowID: -1
      });


        yield put({
          type: roleTypes.ITEMS,
          items: newitems
        });

    } }catch (e) {

    }
    finally{

    }
  }

  function* deleteRoleTable(userData){
    try{
      /*
      yield put({
        type: roleTypes.ITEMS,
        items: []
      });

      yield put({
        type: roleTypes.SELECTED_ROWID,
        rowID: -1
      });
      */

      const resultObj = yield call(attribApi.delRoleTable, userData.payload);
  
      debugger;
      if (resultObj.response && !resultObj.response.ok) {
        debugger;
        yield put({
          type: roleTypes.MESSAGE,
          message: resultObj.response.statusText
        });
      } else {
        debugger;
        console.log(JSON.parse(resultObj).result)
        const state = yield select();
        const newitems = state.roleleState.items.filter((itm) => _.trim(itm.hv_universal_i) !== _.trim(userData.payload.rowID));

        yield put({
          type: roleTypes.ITEMS,
          items: newitems
        });

    } }catch (e) {

    }
    finally{

    }
  }
  
  function* getRoleTable(userData) {
    debugger;
    try {
      //yield call(delay, 5000)
      //yield put({ type: roleTypes.LOGIN_REQUEST, isLoading: false })

      yield put({
        type: roleTypes.ITEMS,
        items: []
      });

      yield put({
        type: roleTypes.SELECTED_ROWID,
        rowID: -1
      });

      const resultObj = yield call(attribApi.getRoleTable, userData.payload);
  
      debugger;
      if (resultObj.response && !resultObj.response.ok) {
        debugger;
        yield put({
          type: roleTypes.MESSAGE,
          message: resultObj.response.statusText
        });
      } else {
        debugger;
        console.log(JSON.parse(resultObj).result)
        //sessionStorage.setItem("token", JSON.parse(resultObj).token);
        yield put({
          type: roleTypes.ITEMS,
          items: JSON.parse(resultObj).result
        });
      }
      //yield put({ type: "LOGIN_STATUS", message: JSON.parse(resultObj).token })
    } catch (e) {
      /*
      debugger;
      let message;
      switch (error.status) {
        case 500:
          message = "Internal Server Error";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = "Something went wrong! " + error.statusText;
      }
      */
      debugger;
      yield put({ type: roleTypes.MESSAGE, message: e });
    } finally {
      debugger;
      if (yield cancelled())
        yield put({ type: roleTypes.MESSAGE, message: "Task Cancelled" });
    }
  }
  
  
  export function* handleRequest(action) {
    debugger;
    console.log("authSaga request", action);
    console.log(action.payload);
    //yield put({ type: "ITEMS_IS_LOADING", isLoading: true });
    //yield call(updateStatus);
    try {
      switch (action.type) {
      
        case roleTypes.FETCH_TABLE_REQUEST: {
          //yield all([put({ type: "LOGIN_STATUS", message: '' }), put({ type: "ITEMS_IS_LOADING", isLoading: true })])
          debugger;
          const fetchTask = yield fork(getRoleTable, action.cname);
          debugger;
          break;
        }

        case roleTypes.INSERT_REQUEST: {
          //yield all([put({ type: "LOGIN_STATUS", message: '' }), put({ type: "ITEMS_IS_LOADING", isLoading: true })])
          debugger;
          const fetchTask = yield fork(insertRoleTable, action.payload);
          debugger;
          break;
        }

        case roleTypes.UPDATE_REQUEST: {
          //yield all([put({ type: "LOGIN_STATUS", message: '' }), put({ type: "ITEMS_IS_LOADING", isLoading: true })])
          debugger;
          const fetchTask = yield fork(updateRoleTable, action.payload);
          debugger;
          break;
        }

        case roleTypes.MAKE_ROW_EDITABLE: {
          //yield all([put({ type: "LOGIN_STATUS", message: '' }), put({ type: "ITEMS_IS_LOADING", isLoading: true })])
          debugger;
          yield put({
            type: roleTypes.SELECTED_ROWID,            
            rowID: action.payload.payload.rowID
          });
          break;
        }

        case roleTypes.DELETE_REQUEST: {
          //yield all([put({ type: "LOGIN_STATUS", message: '' }), put({ type: "ITEMS_IS_LOADING", isLoading: true })])
          debugger;
          const fetchTask = yield fork(deleteRoleTable, action.payload);
          debugger;
          break;
        }

        case roleTypes.CANCEL_REQUEST: {
          //yield all([put({ type: "LOGIN_STATUS", message: '' }), put({ type: "ITEMS_IS_LOADING", isLoading: true })])
          debugger;

          //const { items } = yield select();
          const state = yield select();
          debugger;

          const newitems = state.roleleState.items.map((itm, index) => {
            if (_.trim(itm.hv_universal_i) !== _.trim(action.payload.payload.rowID)) {
                return itm;
            } else {
              debugger;
                var newItem = {
                    ...itm,
                    hv_universal_name: action.payload.payload.value,
                    //...action.item
                }
                return newItem;
            }
        })

        debugger;
          yield put({
            type: roleTypes.SELECTED_ROWID,            
            rowID: -1
          });

          yield put({
            type: roleTypes.ITEMS,
            items: newitems
          });
          break;
        }
        
        
        default: {
          return null;
          break;
        }
      }
    } catch (e) {
      yield put({ type: roleTypes.LOGIN_FAILURE, error: e });
    }
  }
  