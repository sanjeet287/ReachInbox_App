import { useEffect } from 'react';

const GoogleLogin = () => {
  useEffect(() => {
    const redirectUri = encodeURIComponent('http://localhost:5173/auth-handler');  
    const googleLoginUrl = `https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=${redirectUri}`;

    window.location.href = googleLoginUrl;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to Google Login...</p>
    </div>
  );
};

export default GoogleLogin;
