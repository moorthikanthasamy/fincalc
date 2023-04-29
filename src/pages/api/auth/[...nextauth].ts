import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
   // Configure one or more authentication providers
   providers: [
      GoogleProvider({
         clientId: '966528474117-0gha45v4tf5krpbcnick9ehi13gagrcf.apps.googleusercontent.com',
         clientSecret: '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'
         // clientId: process.env.GOOGLE_CLIENT_ID,
         // clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
      // ...add more providers here
   ],
   callbacks: {
      async jwt({ token, account }) {
         console.log('inside jwt.....')
         // Persist the OAuth access_token to the token right after signin
         if (account) {
            token.accessToken = account.access_token
         }
         return token
      },
      async session({ session, token, user }) {
         console.log('inside session.....')
         // Send properties to the client, like an access_token from a provider.
         session.accessToken = token.accessToken
         return session
      }
   }
}
export default NextAuth(authOptions)