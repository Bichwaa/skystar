import { defineStore } from 'pinia';
// import axios from 'axios';


function SafeStorage(){
  return {
      getItem(item) {
          if (process.client) {
              return localStorage.getItem(item)    
          } else {
              return undefined
          }
      },

      setItem(item, value) {
          if (process.client) {
              return localStorage.setItem(item, JSON.stringify(value))
          }
      },
      
      clearStorage(){
        if (process.client) {
          return localStorage.clear()
      }
      }
  }
}

const safestorage = SafeStorage()



const userTemplate = {ID: 1,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  accessToken:"",
  refreshToken:"",
  authenticated:false,
  avatar:"",
  Roles: [
    {
      ID: 0,
      name: "employee",
      // Permissions: []
    }
  ]}

export const userStore = defineStore('userStore', {
    state:()=>({
      user:userTemplate,
      groupedStatements: []
    }),

     getters: {
      access_token: (state) => state.user.accessToken,
      refresh_token: (state) => state.user.refreshToken,
      is_authenticated: (state) => state.user.authenticated,
      flatPerms:(state)=>{
        let permissions = []
        const permNames = []
        const permSet = []
        state.user.Roles.forEach((role)=>{
          permissions.push(role.Permissions)
          permissions = permissions.flat()
        })
        permissions.forEach((x)=>{
          if(!permNames.includes(x?.name)){
            permNames.push(x?.name)
            permSet.push(x)
          }
        })
        return permNames
      },
      getGroupedStatements: (state) => state.groupedStatements
    },

    actions: {
      storeTokens({Access, Refresh}={}) {
        this.user.accessToken = Access;
        this.user.refreshToken = Refresh;
      },

      storeEmail(email) {
        this.user.email = email
      },

      persistState(){
        safestorage.setItem("user", this.user)
      },

      resetState(){
        this.$reset()
        safestorage.clearStorage()
      },

      checkPersistedState(){
        let user = safestorage.getItem("user");
        user = JSON.parse(user)
        if(user!=null){
          this.user = user
        }
      },
      hasPermission (to) {
        return this.flatPerms.includes(to)
      },

      async getme(){
        const { $axios } = useNuxtApp()
        const res = await $axios.post("/api/users/me",{email:this.user.email})
        if(res.status==200 || 201){
        this.user = {...this.user, ...res.data}
        // this.user.avatar = res.data.avatar
        this.user.authenticated = true
        }
      },

      async refreshTokens(){
        const { $axios } = useNuxtApp()
        const res = await $axios.post("/api/token-refresh",{user:this.user})
        if(res.status==200 || 201){
        this.storeTokens(res.data)
        }
      },

      updateGroupedStatements(statements) {
        this.groupedStatements = statements;
      },

      // Update persistState to include groupedStatements
      persistState(){
        safestorage.setItem("user", this.user)
        safestorage.setItem("groupedStatements", this.groupedStatements)
      },

      // Update resetState to clear groupedStatements
      resetState(){
        this.$reset()
        safestorage.clearStorage()
      },

      // Update checkPersistedState to load groupedStatements
      checkPersistedState(){
        let user = safestorage.getItem("user");
        user = JSON.parse(user)
        if(user!=null){
          this.user = user
        }
        
        let statements = safestorage.getItem("groupedStatements");
        statements = JSON.parse(statements)
        if(statements!=null){
          this.groupedStatements = statements
        }
      },
      
    },


    })


