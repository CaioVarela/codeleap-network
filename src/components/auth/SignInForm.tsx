import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';

interface SignInFormProps {
  onSignIn: (username: string) => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSignIn }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSignIn(username);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DDDDDD] px-4">
      <div className="mx-auto w-full max-w-[500px]">
        <Card className="w-full rounded-[16px] border-[1px] border-[#CCCCCC] bg-[#FFFFFF] p-8">
          <h1 className="mb-6 text-[22px] leading-[100%] font-bold">
            Welcome to CodeLeap network!
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              id="username"
              label="Please enter your username"
              labelClassName="text-[16px] font-normal leading-[100%]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John doe"
              fullWidth
              className="h-[32px] w-full rounded-[8px] border-[1px]"
              inputClassName="text-[14px] font-normal leading-[100%] pl-[11px]"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!username.trim()}
                className="uppercase"
              >
                <span className="text-[16px] leading-[100%] font-bold">
                  ENTER
                </span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignInForm;
