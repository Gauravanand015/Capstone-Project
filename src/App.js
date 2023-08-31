import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
// import { onAuthStateChangedListener,createUserDocumentWithAuth, getCurrentUser } from "./utils/firebase.utlis";
// import {setCurrentUser} from './store/user/user.action'
import { useDispatch } from "react-redux";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/user.action";

const App = () => {

const dispatch = useDispatch()

  // useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentWithAuth(user);
    //   }
    //   dispatch(setCurrentUser(user));
    // });

    // return unsubscribe;
    // getCurrentUser().then((user)=> console.log(user));

// },[dispatch])

useEffect(() => {
  dispatch(checkUserSession())
},[dispatch])



  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element = {<Home/>}/>
        <Route path="shop/*" element = {<Shop/>}/>
        <Route path="auth" element = {<Authentication/>}/>
        <Route path="checkout" element = {<CheckOut/>}/>
      </Route>
    </Routes>
  )
};

export default App;
