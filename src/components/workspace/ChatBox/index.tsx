import { ChangeEvent, FormEvent, KeyboardEvent, useCallback } from 'react';
import { ChatArea, Form, MentionsTextarea, SendButton, Toolbox } from './styles';

interface ChatBoxProps {
  chat?: string;
  onChangeChat?(e: ChangeEvent): void;
  onSubmitChat?(): void;
}

const ChatBox = ({ chat, onChangeChat, onSubmitChat }: ChatBoxProps) => {
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
        <MentionsTextarea value={chat} onChange={onChangeChat} onKeyDown={onKeyDown}></MentionsTextarea>
        <Toolbox>
          <SendButton
            className={`c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send'${
              chat?.trim() ? '' : ' c-texty_input__button--disabled'
            }`}
          >
            <i className="c-icon c-icon--paperplane-filled" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
