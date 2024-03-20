"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getMagic, magicBackendLogin } from "@/scripts/MagicLogin";

const Redirect = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [did, setDid] = useState(null);

  useEffect(() => {
    const getRedirectResult = async () => {
      try {
        const magic = await getMagic();
        const result = await magic.oauth.getRedirectResult();
        console.log(result);
        const idToken = await magic.user.getIdToken();
        setUserInfo(result.oauth.userInfo);
        setDid(idToken);
      } catch (error) {
        console.log(error);
      }
    };
    getRedirectResult();
  }, []);

  useEffect(() => {
    const login = async () => {
      if (!did) return;
      const loginSuccess = await magicBackendLogin(did);
      if (loginSuccess) {
        router.push(`/`);
      } else {
        alert("login failed");
        router.push(`/`);
        router.refresh();
      }
    };
    login();
  }, [did]);

  return (
    <div className="flex items-center justify-center h-svh bg-black text-white">
      <h1>Please wait while we verify your login...</h1>
    </div>
  );
};

export default Redirect;
