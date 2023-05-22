import * as React from 'react';
import styles from '../styles/Header.module.css';
import { useState } from 'react';

export default function Create() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');

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
      </div>
    </div>
  );
}
