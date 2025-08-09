import { jwtDecode } from "jwt-decode";


const TokenValidation = (token) => {
   if(token){
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        return false;
    }
    return true;
   }else{
    return false;
   }
}



export { TokenValidation };