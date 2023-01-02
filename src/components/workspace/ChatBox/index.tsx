import { ChangeEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import { ChatArea, Form, MentionsTextarea, SendButton, Toolbox } from './styles';
import autosize from 'autosize';

interface ChatBoxProps {
  refresher?: string;
  chat?: string;
  onChangeChat?(e: ChangeEvent): void;
  onSubmitChat?(): void;
}

const ChatBox = ({ refresher, chat, onChangeChat, onSubmitChat }: ChatBoxProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <ChatArea>
      <Form onSubmit={onSubmit}>
        <MentionsTextarea
          ref={textareaRef}
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeyDown}
        ></MentionsTextarea>
        <Toolbox>
          <SendButton
            type="submit"
            className={`c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send'${
              chat?.trim() ? '' : ' c-texty_input__button--disabled'
            }`}
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
