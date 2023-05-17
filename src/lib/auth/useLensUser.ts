import { useQuery } from '@tanstack/react-query';
import { useAddress } from '@thirdweb-dev/react';
import { readAccessToken } from './helpers';
import { useDefaultProfileQuery } from '../../graphql/generated';

export default function useLensUser() {
  // get address of the connected wallet
  const address = useAddress();

  // get authentication token for connected wallet
  const localStorageQuery = useQuery(['lens-user', address], () => {
    readAccessToken();
  });

  // get the default profile for the connected wallet
  const profileQuery = useDefaultProfileQuery(
    {
      request: {
        ethereumAddress: address,
      },
    },
    {
      enabled: !!address,
    }
  );

  // return both query results as an object
  return {
    isSignedInQuery: localStorageQuery,
    profileQuery,
  };
}
