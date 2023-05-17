import {
  useAddress,
  useNetworkMismatch,
  ConnectWallet,
  useSwitchChain,
  ChainId,
} from '@thirdweb-dev/react';
import React from 'react';
import useLensUser from '../lib/auth/useLensUser';
import useLogin from '../lib/auth/useLogin';

type Props = {};

export default function SignInButton({}: Props) {
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const switchChain = useSwitchChain();
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();

  if (!address) {
    return <ConnectWallet />;
  }

  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchChain(ChainId.Mumbai)}>
        Switch network
      </button>
    );
  }

  if (isSignedInQuery.isLoading) {
    return <div>Loading...</div>;
  }

  console.log('isSignedInQuery.data', isSignedInQuery.data);
  //  the workflow her is not correct, it is showing directly     return <div>No Lens Profile</div>;
  if (!isSignedInQuery.data) {
    return (
      <button onClick={() => requestLogin()}>Sign in with Leans please</button>
    );
  }

  if (profileQuery.isLoading) {
    return <div>Loading...</div>;
  }

  // console.log('profileQuery.data', profileQuery.data);

  if (!profileQuery.data?.defaultProfile) {
    return <div>No Lens Profile</div>;
  }

  if (profileQuery.data?.defaultProfile) {
    return <div>Hello {profileQuery.data?.defaultProfile.handle}</div>;
  }

  return (
    <div>
      <a>Something went wrong!</a>
    </div>
  );
}
