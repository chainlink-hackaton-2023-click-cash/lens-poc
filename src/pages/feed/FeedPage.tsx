import * as React from 'react';
import styles from './FeedPage.module.css';
import FeedPost from '../../components/FeedPost/FeedPost';
import { ExplorePublicationsQuery } from '../../graphql/generated';

interface FeedPageProps {
  feed: ExplorePublicationsQuery;
}

export default function FeedPage({ feed }: FeedPageProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.postsContainer}>
          {feed.explorePublications.items.map((publication) => (
            <FeedPost publication={publication} key={publication.id} />
          ))}
        </div>
      </div>
    </>
  );
}
