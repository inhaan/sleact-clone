import useInput from '@hooks/useInput';
import { ChangeEvent, useState, FormEvent, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from '@components/common/styles';
import useUsers from '@hooks/dataFetch/useUsers';
import { createUserAsync, loginAsync } from '@apis/users';
import useDefaultUrl from '@hooks/useDefaultUrl';

const Signup = () => {
  const { user, mutate } = useUsers();
  const defaultUrl = useDefaultUrl();
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMissmatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const isValid = useCallback(() => {
    return !mismatchError && nickname;
  }, [mismatchError, nickname]);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isValid()) {
        return;
      }

      setSignUpError('');
      setSignUpSuccess(false);

      try {
        await createUserAsync(email, nickname, password);
        await loginAsync(email, password);
        setSignUpSuccess(true);
        mutate();
      } catch (err) {
        if (err instanceof AxiosError) {
          setSignUpError(err.response?.data);
        } else {
          console.error('Unexpected error', err);
        }
      }
    },
    [isValid, email, nickname, password, mutate],
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMissmatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMissmatchError(e.target.value !== password);
    },
    [password],
  );

  if (user) {
    return <Navigate to={defaultUrl} />;
  }
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>????????? ??????</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>?????????</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>????????????</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>???????????? ??????</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>??????????????? ???????????? ????????????.</Error>}
          {!nickname && <Error>???????????? ??????????????????.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>???????????????????????????! ?????????????????????.</Success>}
        </Label>
        <Button type="submit">????????????</Button>
      </Form>
      <LinkContainer>
        ?????? ???????????????????&nbsp;
        <Link to="/login">????????? ????????????</Link>
      </LinkContainer>
    </div>
  );
};

export default Signup;
