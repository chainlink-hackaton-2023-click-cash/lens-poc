import * as React from 'react';
import { ExplorePublicationsQuery } from '../graphql/generated';
import styles from '../styles/FeedPost.module.css';
import { MediaRenderer } from '@thirdweb-dev/react';
import { Link, Routes, Route } from 'react-router-dom';
import { UserProfilePage } from '../pages/profile/UserProfilePage';

type Props = {
  publication: ExplorePublicationsQuery['explorePublications']['items'][0];
};

export default function FeedPost({ publication }: Props) {
  return (
    <div className={styles.feedPostContainer}>
      <div className={styles.feedPostHeader}>
        <MediaRenderer
          // @ts-ignore
          src={publication?.profile?.picture?.original?.url || ''}
          alt={publication.profile.name || publication.profile.handle}
          className={styles.feedPostProfilePicture}
        ></MediaRenderer>
        <Routes>
          <Route
            // path={`/profile/:${publication.profile.handle}`}
            path='/profile/:user'
            element={<UserProfilePage />}
            //   className={styles.feedPostProfileName}
          >
            {publication.profile.name || publication.profile.handle}
          </Route>
        </Routes>

        <div className={styles.feedPostContent}>
          <h3 className={styles.feedPostContentTitle}>
            {publication.metadata.name}
          </h3>
          <p className={styles.feedPostContentDescription}>
            {publication.metadata.content}
          </p>
          {publication.metadata.media?.length > 0 && (
            <MediaRenderer
              src={publication.metadata.media[0].original.url}
              alt={publication.metadata.name || ''}
              className={styles.feedPostContentImage}
            ></MediaRenderer>
          )}
        </div>
      </div>
    </div>
  );
}
