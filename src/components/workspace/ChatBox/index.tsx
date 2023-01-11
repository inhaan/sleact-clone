import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import { ChatArea, Form, MentionsTextarea, SendButton, Toolbox } from './styles';
import autosize from 'autosize';
import { Mention, SuggestionDataItem, DataFunc } from 'react-mentions';
import useEmoji from '@hooks/useEmoji';
import { EmojiData } from '@typings/app';
import useWorkspaceMembers from '@hooks/dataFetch/useWorkspaceMembers';
import MentionItem from '../MentionItem';
import { EachMention } from '@components/common/styles';

interface ChatBoxProps {
  workspace?: string;
  refresher?: string;
  chat?: string;
  onChangeChat?(e: any): void;
  onSubmitChat?(): void;
}

const neverMatchingRegex = /($a)/;

const ChatBox = ({ workspace, refresher, chat, onChangeChat, onSubmitChat }: ChatBoxProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recentEmojiRef = useRef<EmojiData[]>([]);
  const [emojis] = useEmoji();
  const { members } = useWorkspaceMembers(workspace);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      autosize(textareaRef.current);
    }
  }, [refresher]);

  useEffect(() => {
    if (!chat && textareaRef.current) {
      autosize.update(textareaRef.current);
    }
  }, [chat]);

  useEffect(() => {
    if (recentEmojiRef.current.length === 0) {
      recentEmojiRef.current = emojis.slice(0, 7);
    }
  }, [emojis]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmitChat?.();
    },
    [onSubmitChat],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSubmitChat?.();
      }
    },
    [onSubmitChat],
  );

  const queryEmojis: DataFunc = (query) => {
    let targetEmojis = recentEmojiRef.current;
    if (query.length > 0) {
      targetEmojis = emojis.filter((emoji) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1;
      });
    }
    return targetEmojis.slice(0, 7).map(({ emoji }) => ({ id: emoji }));
  };

  const onAddEmoji = (emoji: string | number) => {
    if (typeof emoji !== 'string') {
      return;
    }
    const emojiData = emojis.find((x) => x.emoji === emoji);
    if (!emojiData) {
      return;
    }
    recentEmojiRef.current = [emojiData, ...recentEmojiRef.current.filter((x) => x.emoji !== emojiData.emoji)].slice(
      0,
      7,
    );
  };

  const renderMemberSuggestion = (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean,
  ) => (
    <MentionItem
      workspace={workspace}
      suggestion={suggestion}
      search={search}
      highlightedDisplay={highlightedDisplay}
      index={index}
      focused={focused}
    />
  );

  const renderEmojiSuggestion = (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean,
  ) => (
    <EachMention focus={focused}>
      <span>{highlightedDisplay}</span>
    </EachMention>
  );

  return (
    <ChatArea>
      <Form onSubmit={onSubmit}>
        <MentionsTextarea
          inputRef={textareaRef}
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeyDown as any}
          allowSuggestionsAboveCursor
        >
          <Mention
            trigger="@"
            appendSpaceOnAdd
            data={members?.map((x) => ({ id: x.id, display: x.nickname })) || []}
            renderSuggestion={renderMemberSuggestion}
          />
          <Mention
            trigger=":"
            markup="__id__"
            regex={neverMatchingRegex}
            data={queryEmojis}
            onAdd={onAddEmoji}
            renderSuggestion={renderEmojiSuggestion}
          />
        </MentionsTextarea>

        <Toolbox>
          <SendButton
            type="submit"
            className={
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
              (chat?.trim() ? '' : ' c-texty_input__button--disabled')
            }
            disabled={!chat?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
