import * as React from 'react';
import styles from '../../styles/Profile.module.css';
import { useProfileQuery } from '../../graphql/generated';
import { useParams } from 'react-router-dom';

type Props = {};

export function UserProfilePage({}: Props) {
  // const { isLoading: loadingProfile, data: profileData } = useProfileQuery({
  //   request: {
  //     handle: '',
  //   },
  // });

  const { slug } = useParams();

  console.log('slug', slug);

  return (
    // <div className={styles.profileContainer}>
    //   <div className={styles.profileContentContainer}></div>
    //   <div className={styles.publicationsContainer}></div>
    // </div>
    <div></div>
  );
}
