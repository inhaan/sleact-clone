import Chat from '@components/workspace/Chat';
import { positionValues, Scrollbars } from 'react-custom-scrollbars-2';
import { ChatZone, Section, StickyHeader } from './styles';
import { useMemo, useRef, useEffect } from 'react';
import { makeSection } from '@utils/chat';
import { ScrollToBottomEmitOption } from '@typings/app';
import { IChat, IDM } from '@typings/db';

interface ChatListProps {
  workspace: string;
  chats?: IDM[] | IChat[];
  setSize: (size: number | ((_size: number) => number)) => Promise<(IDM | IChat)[][] | undefined>;
  isReachEnd: boolean;
  scrollToBottomEmitter?: ScrollToBottomEmitOption;
  refresher?: any;
}

const ChatList = ({ workspace, chats, setSize, scrollToBottomEmitter, isReachEnd, refresher }: ChatListProps) => {
  const scrollRef = useRef<Scrollbars>(null);
  const isPrevLoading = useRef<boolean>(false);

  const sections = useMemo(() => {
    return makeSection([...(chats ?? [])].reverse());
  }, [chats]);

  const onScroll = async ({ scrollTop, scrollHeight }: positionValues) => {
    if (!isPrevLoading.current && !isReachEnd && scrollTop < scrollHeight / 10) {
      isPrevLoading.current = true; //데이터 로딩 중에 스크롤에 의해 계속 요청이 될 수 있기 때문에 로딩 중에는 요청을 막는다
      await setSize((prev) => prev + 1);
      isPrevLoading.current = false;
    }
  };

  // 최초 로딩시 스크롤 제일 아래로 내림
  useEffect(() => {
    scrollRef.current?.scrollToBottom();
  }, [refresher]);

  // 부모에서 스크롤 내리기 요청
  useEffect(() => {
    if (!scrollRef.current || !scrollToBottomEmitter) {
      return;
    }
    if (scrollToBottomEmitter.height) {
      const scrollBotom =
        scrollRef.current.getScrollHeight() - scrollRef.current.getClientHeight() - scrollRef.current.getScrollTop();
      if (scrollBotom > scrollToBottomEmitter.height) {
        return;
      }
    }
    scrollRef.current?.scrollToBottom();
  }, [scrollToBottomEmitter]);

  return (
    <ChatZone>
      <Scrollbars autoHide onScrollFrame={onScroll} ref={scrollRef}>
        {sections.map(({ date, chats }) => (
          <Section key={date} className={`section-${date}`}>
            <StickyHeader>
              <button>{date}</button>
            </StickyHeader>
            {chats?.map((chat) => (
              <Chat key={chat.id} chat={chat} workspace={workspace} />
            ))}
          </Section>
        ))}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
