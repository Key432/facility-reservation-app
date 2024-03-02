'use client';

import { useAuthState } from '../hooks/useAuthState';

export default function AuthStateWrapper({
  children,
  showWhenLoggedIn,
}: {
  children?: React.ReactNode;
  showWhenLoggedIn: boolean;
}) {
  const { isLoggedIn } = useAuthState();

  return isLoggedIn === showWhenLoggedIn ? <>{children}</> : <></>;
}
