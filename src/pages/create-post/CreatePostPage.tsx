import * as React from 'react';
import styles from './Create.module.css';
import { useState } from 'react';
import { Web3Button } from '@thirdweb-dev/react';
import {
  LENS_CONTRACT_ABI_MUMBAI,
  LENS_CONTRACT_ADDRESS_MUMBAI,
} from '../../const/contracts';
import useCreatePost from '../../lib/useCreatePost';

export default function CreatePostPage() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { mutateAsync: createPost } = useCreatePost();

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            type='file'
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          ></input>
        </div>
        <div className={styles.inputContainer}>
          <input
            type='text'
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.inputContainer}>
          <textarea
            placeholder='Content'
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS_MUMBAI}
          contractAbi={LENS_CONTRACT_ABI_MUMBAI}
          action={async () => {
            if (!image) return;
            return await createPost({
              image,
              title,
              description,
              content,
            });
          }}
        >
          Create Post
        </Web3Button>
      </div>
    </div>
  );
}
