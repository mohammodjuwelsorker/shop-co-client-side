import { useState, createContext, useEffect } from "react";
import { PropTypes } from 'prop-types';
import auth from './../config/firebase/firebase.config';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const axios = useAxios();

   // create user function 
   const register = (email, pass) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, pass);
   };

   // user login function 
   const login = (email, pass) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, pass)
   };

   const logout = () => {
      setLoading(true)
      return signOut(auth)
   }

   useEffect(()=> {
      const unSubscribe =  onAuthStateChanged(auth, async(currentUser) => {
         setUser(currentUser);
         setLoading(false);
         console.log('observer: ',currentUser);
         if(currentUser) {
            axios.post('/auth/access-token', {email: currentUser.email})
               .then(res => {
                  console.log(res)
               })
         }
      });
      // clear function 
      return () => {
         unSubscribe()
      }
   }, [axios])


   const authInfo = {
      user,
      loading,
      login,
      register,
      logout,
   }
   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

AuthProvider.propTypes = {
   children: PropTypes.node,
}
export default AuthProvider;