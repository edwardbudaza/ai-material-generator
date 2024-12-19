import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="relative h-full w-full bg-primary/10">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-md w-full space-y-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
