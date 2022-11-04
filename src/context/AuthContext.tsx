import { createContext, ReactNode, useState } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession()


interface UserProps {
  name: string;
  avatarUrl: string;
}


export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}


interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)



export function AuthContextProvider({ children }: AuthProviderProps) {

  const [isUserLoading, setIsUserLoading] = useState()

 const [ request, response, promptAsync] = Google.useAuthRequest({
    clientId: '848727285664-47vt9khtu7hr22n0mlq3flcd28ucb563.apps.googleusercontent.com' ,
    redirectUri:   AuthSession.makeRedirectUri({useProxy:true}),
    scopes: [ 'profile', 'email']

  })



  async function signIn() {
    try{

    }catch (error) {

    }

  }


  return (
    <AuthContext.Provider value={{
      signIn,
      user: {
        name: 'Luis',
        avatarUrl: 'https://www.github.com/luiszkm.png',
      }
    }} >
      {children}

    </AuthContext.Provider>

  )

}