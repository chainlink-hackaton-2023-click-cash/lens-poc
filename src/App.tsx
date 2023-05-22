import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from './graphql/generated';
import * as React from 'react';
import SignInButton from './components/SignInButton';
import styles from './styles/Home.module.css';
import FeedPost from './components/FeedPost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProfilePage } from './pages/profile/UserProfilePage';
import Header from './components/Header';
import Create from './pages/create';

export default function App() {
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
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home data={data} />} />
        <Route path='/profile/:handle' element={<UserProfilePage />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home({ data }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.postsContainer}>
          {data.explorePublications.items.map((publication) => (
            <FeedPost publication={publication} key={publication.id} />
          ))}
        </div>
      </div>
    </>
  );
}
