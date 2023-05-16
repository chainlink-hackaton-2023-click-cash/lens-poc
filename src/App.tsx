import { ConnectWallet } from '@thirdweb-dev/react';
import './styles/Home.css';
import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from './graphql/generated';

export default function Home() {
  const { data, isLoading, error } = useExplorePublicationsQuery({
    request: {
      // sortCriteria Latest --> CAN BE CHANGED TO ANOTHER CRITERIA
      sortCriteria: PublicationSortCriteria.Latest,
    },
  });

  console.log({ data, isLoading, error });

  return (
    <div className='container'>
      <div className='connect'>
        <ConnectWallet
          dropdownPosition={{
            align: 'center',
            side: 'bottom',
          }}
        />
      </div>
    </div>
  );
}
