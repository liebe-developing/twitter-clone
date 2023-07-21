import { signIn } from "next-auth/react";

const SigninButtons = ({ text, Icon, signinUrl, classes }) => {
  return (
    <button
      className={`${classes} mb-2`}
      onClick={() => signIn(signinUrl, { callbackUrl: "/" })}
    >
      <Icon className="w-5 h-5" />
      {text}
    </button>
  );
};

export default SigninButtons;
