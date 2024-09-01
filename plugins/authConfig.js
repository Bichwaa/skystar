import axios from "axios";
import { userStore } from '../store';



const axiosInstance = axios.create( {
  // baseURL: "http://13.51.150.5:3006/",
  baseURL: "http://localhost:3006",
} );


axiosInstance.interceptors.request.use( ( config ) => {
    const store = userStore();
    // console.log(config.url)
    if(store.access_token!="" && config.url != "/api/token-refresh" ){
      config.headers[ "Authorization" ] = `Bearer ${ store.access_token }`;
    }else if(config.url === "/api/token-refresh" ){
      config.headers[ "Authorization" ] = `Bearer ${ store.refresh_token }`;
    }
    return config;
  } );

axiosInstance.interceptors.response.use(function (response) {
    // If response is successful, just return it as is
    return response;
  }, function (error) {
    const { status } = error.response;
  
    switch (status) {
      case 401:
        // await handle401(error.config);
        // location.reload(route.path)
        const store = userStore();
        store.resetState()
        navigateTo("/login")
        break;
      case 404:
        navigateTo('/404');
        break;
      default:
        throw error;
    }
  });
  

export default defineNuxtPlugin(() => {
  return {
    provide: {
      axios: axiosInstance
    }
  }
})



async function handle401(config){
  const route = useRoute()
  const store = userStore();
  store.checkPersistedState()
  if(store.access_token!=""){
    await store.refreshTokens()
    // navigateTo(route.path);
    console.log("done")
  }else{
  navigateTo('/login')
  }
}
