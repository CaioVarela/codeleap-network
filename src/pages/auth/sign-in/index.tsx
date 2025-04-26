import { useNavigate } from 'react-router-dom';

import SignInForm from '../../../components/auth/SignInForm';

export function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = (username: string) => {
    localStorage.setItem('username', username);
    navigate('/');
  };

  return <SignInForm onSignIn={handleSignIn} />;
}
