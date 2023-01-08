import { IChat, IDM } from '@typings/db';
import _ from 'lodash';
import dayjs from 'dayjs';

export const makeSection = (chats: (IDM | IChat)[]) => {
  return Object.entries(_.groupBy(chats, (chat) => dayjs(chat.createdAt).format('YYYY-MM-DD'))).map(
    ([date, chats]) => ({ date, chats }),
  );
};
