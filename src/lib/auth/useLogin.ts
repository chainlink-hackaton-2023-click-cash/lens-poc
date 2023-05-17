import { useAddress, useSDK } from '@thirdweb-dev/react';
import generateChallenge from './generateChallenge';
import { useAuthenticateMutation } from '../../graphql/generated';
import { useMutation } from '@tanstack/react-query';
import { setAccessToken } from './helpers';

export default function useLogin() {
  const address = useAddress();
  const sdk = useSDK();

  const { mutateAsync: sendSignedMessage } = useAuthenticateMutation();

  async function login() {
    if (!address) return;

    // generate lens challenge
    const { challenge } = await generateChallenge(address);
    // sign the callenge with wallet account
    const signature = await sdk?.wallet.sign(challenge.text);
    // send the signed challenge with wallet address
    const { authenticate } = await sendSignedMessage({
      request: { address, signature },
    });

    console.log('Authenticated', authenticate);

    // extract and store in local storage
    const { accessToken, refreshToken } = authenticate;
    setAccessToken(accessToken, refreshToken);
  }
  // wrap the login() function with the useMutation wrapper function
  return useMutation(login);
}
