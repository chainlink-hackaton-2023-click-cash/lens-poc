import * as React from 'react';
import styles from './UserProfile.module.css';
import { useProfileQuery, usePublicationsQuery } from '../../graphql/generated';
import { useLocation } from 'react-router-dom';
import { MediaRenderer, Web3Button } from '@thirdweb-dev/react';
import { LENS_CONTRACT_ABI_MUMBAI, LENS_CONTRACT_ADDRESS_MUMBAI } from '../../const/contracts';
import { useFollow } from '../../lib/useFollow';

type Props = {};

export function UserProfilePage({}: Props) {
  const path = useLocation().pathname;

  const { mutateAsync: followUser } = useFollow();

  const prefix = '/profile/';
  const user = path.split(prefix).pop();

  const {
    isLoading: loadingProfile,
    data: profileData,
    error: profileError,
  } = useProfileQuery(
    {
      request: {
        handle: user,
      },
    },
    {
      enabled: !!user,
    }
  );

  const {
    isLoading: loadingPublications,
    data: publicationsData,
    error: publicationsError,
  } = usePublicationsQuery(
    {
      request: {
        profileId: profileData?.profile.id,
      },
    },
    {
      enabled: !!profileData?.profile?.id,
    }
  );

  if (profileError || publicationsError) {
    return <div>Profile not found!!</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContentContainer}>
        {/* @ts-ignore */}
        {profileData?.profile?.coverPicture?.original.url && (
          <MediaRenderer
            // @ts-ignore
            media={profileData?.profile?.coverPicture?.original?.url || ''}
            alt={profileData?.profile?.name || profileData?.profile?.handle || ''}
            className={styles.coverImageContainer}
          ></MediaRenderer>
        )}
        {/* @ts-ignore */}
        {profileData?.profile?.picture.original.url && (
          <MediaRenderer
            // @ts-ignore
            media={profileData.profile.picture?.original.url || ''}
            alt={profileData?.profile?.name || profileData?.profile?.handle || ''}
            className={styles.profilePictureContainer}
          ></MediaRenderer>
        )}
        <h1 className={styles.profileName}>{profileData?.profile?.name || 'No name user'}</h1>
        <p className={styles.profileHandle}>{profileData?.profile?.handle || 'No handle user'}</p>
        <p className={styles.profileDescription}>{profileData?.profile?.bio}</p>

        <p className={styles.followers}>
          {profileData?.profile?.stats.totalFollowers} {' Followers'}
        </p>

        <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS_MUMBAI}
          contractAbi={LENS_CONTRACT_ABI_MUMBAI}
          action={async () => await followUser(profileData?.profile?.id)}
        >
          Follow User
        </Web3Button>

        {/*
        Aquí esta parte no funciona muy bien, porque estas volviendo a pintar un FeedPost que pinta esta
        misma página, y esta en una especie de bucle infinito.
        Echale una revisada jajaja
        <div className={styles.publicationsContainer}>
          {publicationsData?.publications.items.map((publication) => (
            <FeedPost publication={publication} key={publication.id}></FeedPost>
          ))}
        </div> */}
      </div>
    </div>
  );
}
