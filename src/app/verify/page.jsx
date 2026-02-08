"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { getMagic, magicBackendLogin } from "@/scripts/MagicLogin";

const RedirectInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState(null);
  const [did, setDid] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const getRedirectResult = async () => {
      const params = new URLSearchParams(window.location.search);
      if (!params.get("state") && !params.get("code")) {
        console.log("No OAuth params found in URL, skipping getRedirectResult");
        router.push("/");
        return;
      }

      try {
        const magic = await getMagic();
        const result = await magic.oauth2.getRedirectResult();
        console.log(result);
        const idToken = await magic.user.getIdToken();
        setUserInfo(result.oauth.userInfo);
        setDid(idToken);
      } catch (error) {
        console.log("OAuth redirect error:", error);
        router.push("/");
      }
    };
    getRedirectResult();
  }, [searchParams]);

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

const Redirect = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-svh bg-black text-white">
          <h1>Loading...</h1>
        </div>
      }
    >
      <RedirectInner />
    </Suspense>
  );
};

export default Redirect;
