import React from 'react'

import { Environments } from '@/common'
import { GoogleOAuthProvider } from '@react-oauth/google'

const withAuthGoogle = (Component: React.FC) => (props: any) => (
  <GoogleOAuthProvider clientId={Environments.CLIENT_ID!}>
    <Component {...props} />
  </GoogleOAuthProvider>
)

export default withAuthGoogle
