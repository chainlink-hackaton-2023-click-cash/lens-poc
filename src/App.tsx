import { PublicationSortCriteria, useExplorePublicationsQuery } from './graphql/generated';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProfilePage } from './pages/profile/UserProfilePage';
import Header from './components/Header/Header';
import FeedPage from './pages/feed/FeedPage';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error';
import CreatePostPage from './pages/create-post/CreatePostPage';

export default function App() {
  const {
    data: feed,
    isLoading,
    error,
  } = useExplorePublicationsQuery(
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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<FeedPage feed={feed} />} />
        <Route path="/profile/:handle" element={<UserProfilePage />} />
        <Route path="/create" element={<CreatePostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
