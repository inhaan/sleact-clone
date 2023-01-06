import { EmojiData } from '@typings/app';
import { useEffect, useState } from 'react';

const useEmoji = () => {
  const [emojis, setEmojis] = useState<EmojiData[]>([]);

  useEffect(() => {
    fetch(
      'https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json',
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setEmojis(jsonData.emojis);
      });
  }, []);

  return [emojis];
};

export default useEmoji;
