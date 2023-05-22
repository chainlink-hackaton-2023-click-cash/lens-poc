import { useMutation } from '@tanstack/react-query';
import { PublicationMainFocus, useCreatePostTypedDataMutation } from '../graphql/generated';
import useLensUser from './auth/useLensUser';
import { useSDK, useStorageUpload } from '@thirdweb-dev/react';
import { signTypedDataWithOmmittedTypename } from './helpers';
import { uuid as uuidv4 } from 'uuidv4';
import { LENS_CONTRACT_ADDRESS_MUMBAI, LENS_CONTRACT_ABI_MUMBAI } from '../const/contracts';
import { splitSignature } from 'ethers/lib/utils';

type CreatePostArgs = {
  image: File;
  title: string;
  description: string;
  content: string;
};

export default function useCreatePost() {
  const { mutateAsync: requestTypedData } = useCreatePostTypedDataMutation();
  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  const { profileQuery } = useLensUser();
  const sdk = useSDK();

  async function createPost({ image, title, description, content }: CreatePostArgs) {
    const imageIpfsUrl = (await uploadToIpfs({ data: [image] }))[0];

    console.log('imageIpfsUrl', imageIpfsUrl);

    const postMetadata = {
      version: '2.0.0',
      mainContentFocus: PublicationMainFocus.Image,
      metadata_id: uuidv4(),
      description: description,
      locale: 'en-US',
      content: content,
      external_url: null,
      image: imageIpfsUrl,
      imageMimeType: null,
      name: title,
      attributes: [],
      tags: [],
    };

    const postMetadataIpfsUrl = await uploadToIpfs({ data: [postMetadata] });

    console.log('postMetadataIpfsUrl', postMetadataIpfsUrl);

    const typedData = await requestTypedData({
      request: {
        collectModule: {
          feeCollectModule: {
            followerOnly: false,
            amount: {
              currency: '',
              value: '',
            },
            recipient: '',
            referralFee: 0,
          },
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
        contentURI: postMetadataIpfsUrl,
        profileId: profileQuery.data?.defaultProfile?.id,
      },
    });

    const { domain, types, value } = typedData.createPostTypedData.typedData;

    if (!sdk) return;

    const signature = await signTypedDataWithOmmittedTypename(sdk, domain, types, value);

    const { v, s, r } = splitSignature(signature.signature);

    const lensHubContract = await sdk.getContractFromAbi(LENS_CONTRACT_ADDRESS_MUMBAI, LENS_CONTRACT_ABI_MUMBAI);

    const {
      collectModule,
      collectModuleInitData,
      contentURI,
      deadline,
      profileId,
      referenceModule,
      referenceModuleInitData,
    } = typedData.createPostTypedData.typedData.value;

    const result = await lensHubContract.call('lensHub.postWithSig', [
      {
        profileId: profileId,
        contentURI: contentURI,
        collectModule,
        collectModuleInitData,
        referenceModule,
        referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: deadline,
        },
      },
    ]);

    console.log(result);
  }

  return useMutation(createPost);
}
