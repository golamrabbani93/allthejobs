import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions={
    providers:[
      GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      })
    ]
}