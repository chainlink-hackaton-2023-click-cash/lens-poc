import {
  useAddress,
  useNetworkMismatch,
  ConnectWallet,
  useSwitchChain,
  ChainId,
} from '@thirdweb-dev/react';
import * as React from 'react';
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

  if (isSignedInQuery.error) {
    console.log('Error: ', isSignedInQuery.error);
  }

  if (!isSignedInQuery.data) {
    return (
      <button onClick={() => requestLogin()}>Sign in with Leans please</button>
    );
  }

  if (profileQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (profileQuery.error) {
    console.log('Error: ', profileQuery.error);
  }

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
