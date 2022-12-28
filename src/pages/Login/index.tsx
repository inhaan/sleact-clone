import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/common/styles';
import { FormEvent, useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useUsers from '@hooks/dataFetch/useUsers';
import { postLogin } from '@apis/users';

const Login = () => {
  const { data, mutate } = useUsers();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loginError, setLoginError] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoginError(false);

      try {
        const user = await postLogin(email, password);
        mutate(user, false);
      } catch {
        setLoginError(true);
      }
    },
    [email, password],
  );

  if (data) {
    return <Navigate to="/workspace/channel" />;
  }
  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {loginError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
