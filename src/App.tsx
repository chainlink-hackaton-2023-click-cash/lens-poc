import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from './graphql/generated';
import * as React from 'react';
import SignInButton from './components/SignInButton';
import styles from './styles/Home.module.css';
import FeedPost from './components/FeedPost';
import { BrowserRouter } from 'react-router-dom';

export default function Home() {
  const { data, isLoading, error } = useExplorePublicationsQuery(
    {
      request: {
        // sortCriteria Latest --> CAN BE CHANGED TO ANOTHER CRITERIA
        sortCriteria: PublicationSortCriteria.Latest,
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  // console.log({ data, isLoading, error });

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error!</div>;
  }

  return (
    <BrowserRouter>
      <div className={styles.container}>
        <div className={styles.postsContainer}>
          {data.explorePublications.items.map((publication) => (
            <FeedPost publication={publication} key={publication.id}></FeedPost>
          ))}
        </div>
      </div>
    </BrowserRouter>
  );
}
