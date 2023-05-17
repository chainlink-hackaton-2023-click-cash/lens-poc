import './styles/Home.css';
import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from './graphql/generated';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import useLogin from './lib/auth/useLogin';
import * as React from 'react';
import SignInButton from './components/SignInButton';

export default function Home() {
  const { data, isLoading, error } = useExplorePublicationsQuery({
    request: {
      // sortCriteria Latest --> CAN BE CHANGED TO ANOTHER CRITERIA
      sortCriteria: PublicationSortCriteria.Latest,
    },
  });
  // console.log({ data, isLoading, error });

  const address = useAddress();
  const { mutate: requestLogin } = useLogin();

  // if (!address) {
  //   return <ConnectWallet />;
  // }

  return (
    <div className='container'>
      <SignInButton></SignInButton>
    </div>
  );
}
