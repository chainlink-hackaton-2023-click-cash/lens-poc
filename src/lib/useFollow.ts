import { useSDK, useAddress } from '@thirdweb-dev/react';
import { useCreateFollowTypedDataMutation } from '../graphql/generated';
import { signTypedDataWithOmmittedTypename, splitSignature } from './helpers';
import {
  LENS_CONTRACT_ABI_MUMBAI,
  LENS_CONTRACT_ADDRESS_MUMBAI,
} from '../const/contracts';
import { useMutation } from '@tanstack/react-query';
import useLogin from './auth/useLogin';

export function useFollow() {
  const { mutateAsync: requestFollowTypedData } =
    useCreateFollowTypedDataMutation();

  const sdk = useSDK();
  const address = useAddress();
  const { mutate: loginUser } = useLogin();

  async function follow(userId: string) {
    await loginUser();
    // use the auto generated mutation called "usecreateFollowTypedData"
    // to get the typed data for the user to sign
    const typedData = await requestFollowTypedData({
      request: {
        follow: [
          {
            profile: userId,
          },
        ],
      },
    });

    const { domain, types, value } = typedData.createFollowTypedData.typedData;

    if (!sdk) return;

    // sign the typed data using the SDK
    const signature = await signTypedDataWithOmmittedTypename(
      sdk,
      domain,
      types,
      value
    );

    const { v, s, r } = splitSignature(signature.signature);

    // send the typed data to the smart contract to perform the write
    // operation on the blockchain

    const lensHubContract = await sdk.getContractFromAbi(
      LENS_CONTRACT_ADDRESS_MUMBAI,
      LENS_CONTRACT_ABI_MUMBAI
    );

    // call the smart contract function called "followWithSig"

    console.log('address', address);
    console.log('[userId]', [userId]);
    console.log('value.datas', value.datas);
    console.log('value.deadline', value.deadline);
    console.log('v', v);
    console.log('r', r);
    console.log('s', s);

    const result = await lensHubContract.call('followWithSig', [
      {
        follower: address,
        profileIds: [userId],
        datas: value.datas,
        sig: {
          v,
          r,
          s,
          deadline: value.deadline,
        },
      },
    ]);

    console.log('result', result);
  }

  return useMutation(follow);
}
