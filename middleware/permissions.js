import {userStore} from "../store"

export default function (to) {
    const store = userStore()
    let authFailed = true; //default:you've been judged and found lacking
    const userPermissions = store.flatPerms;
    const routePermission = to.meta.permissions;
    routePermission.forEach((permission) => {
      if(userPermissions.includes(permission)){
        authFailed = false
      }
    })
    if (authFailed) {
      return navigateTo('/access-denied');
    }else{
      return 
    }
  }
  

//   return redirect('/access-denied')