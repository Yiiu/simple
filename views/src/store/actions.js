import * as types from './mutation-types'
import Vue from 'vue'

export const checklogin = ({commit, state }) => {
    return new Promise((resolve, reject)=>{
        if(!state.login.status){
            Vue.http.post("/api/checklogin")
            .then(function(response) {
                return response.json()
            }).then(function(data) {
                if(data.status == "success"){
                    commit(types.CHECK_LOGIN, data)
                    resolve(state.login)
                }else {
                    commit(types.CHECK_LOGIN, data)
                    resolve(state.login)
                }
            })
        }else {
            resolve(state.login)
        }
    })
}

export const logout = ({commit, state}) =>{
    return new Promise((resolve, reject)=>{
        Vue.http.post("/api/logout")
        .then(function(response) {
            return response.json()
        }).then(data=>{
            if(data.status == "success") {
                commit(types.CHECK_LOGIN, {status:"fail", data:null})
                resolve()
            }
        })
    })
}

export const getIndex = ({commit, state}, page, limit) => {
    return new Promise((resolve, reject)=>{
        Vue.http.get(`/api/article?page=${page ? page : 0}`)
        .then(response=>{
            return response.json()
        }).then(data=>{
            if(data.status == "success"){
                resolve(data.data)
            }else {
                reject(data.msg)
            }
        })
    })
}

export const getArticle = ({commit, state}, id, types) => {
    return new Promise((resolve, reject)=>{
        Vue.http.get(`/api/article/${id}${types ? '?type='+type : ''}`)
        .then(response=>{
            return response.json()
        }).then(data=>{
            if(data.status == "success"){
                resolve(data.data)
            }else {
                reject(data.msg)
            }
        })
    })
}

export const delArticle = ({commit, state}, id) => {
    return new Promise((resolve, reject)=>{
        Vue.http.delete(`/api/article/${id}`)
        .then(response=>{
            return response.json()
        }).then(data=>{
            if(data.status == "success"){
                resolve()
            }else {
                reject(data.msg)
            }
        })
    })
}

export const getType = ({commit, state}) => {
    Vue.http.get("/api/type")
    .then(response=>{
        return response.json()
    }).then(data=>{
        commit(types.GET_TYPE, data.data)
    })
}

export const addType = ({commit, state}, type) => {
    return new Promise((resolve, reject) => {
        Vue.http.post("/api/type", type)
        .then(response=>{
            return response.json()
        }).then(data=>{
            if(data.status != "success") {
                reject(data.msg)
            }else {
                resolve()
            }
        })
    })
}

export const getOneComment = ({commit, state}, article) => {
    return new Promise((resolve, reject) => {
        Vue.http.get(`/api/comment?article=${article}`)
        .then(response=>{
            return response.json()
        }).then(data=>{
            if(data.status != "success") {
                reject(data.msg)
            }else {
                resolve(data.data)
            }
        })
    })
}

export const addArticle = ({commit, state}, article) => {
    return new Promise((resolve, reject) => {
        Vue.http.post("/api/article",article)
        .then(response=>{
            return response.json()
        }).then(data=>{
            if(data.status != "success") {
                reject(data.msg)
            }else {
                resolve(data.msg)
            }
        })
    })
}
export const upArticle = ({commit, state}, data) => {
    let article = data.article
    let id = data.id

    return new Promise((resolve, reject) => {
        Vue.http.post("/api/admin/update",{
            data:article,
            id:id
        })
        .then(response=>{
            return response.json()
        }).then(data=>{
            if(data.status != "success") {
                reject(data.msg)
            }else {
                resolve(data.msg)
            }
        })
    })
}