// import {
  //   onAuthStateChangedListener,
  //   createUserDocumentWithAuth,
  //   getCurrentUser,
  // } from "./utils/firebase.utlis";
  // import { setCurrentUser } from "./store/user/user.reducer";
  // import {setCurrentUser} from './store/user/user.action'
  import { checkUserSession } from "./store/user/user.action";
  import { Route, Routes } from "react-router-dom";
  import { useEffect } from "react";
  import { useDispatch } from "react-redux";
  import Home from "./routes/home/home.component";
  import Navigation from "./routes/navigation/navigation.component";
  import Authentication from "./routes/authentication/authentication.component";
  import Shop from "./routes/shop/shop.component";
  import CheckOut from "./routes/checkout/checkout.component";
  
const App = () => {
  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentWithAuth(user);
  //     }
  //     console.log("hello",setCurrentUser(user));
  //     dispatch(setCurrentUser(user)); // this setCurrentUser is still a action creator and it is also responsible for update the reducer itself.
  //   });
  //   return unsubscribe;
  // getCurrentUser().then((user)=> console.log(user));
  // }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
