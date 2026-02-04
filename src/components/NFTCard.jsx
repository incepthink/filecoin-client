import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { StoreContext } from "@/Context";

const NFTCard = () => {
  const { state, dispatch } = useContext(StoreContext);
  const cardRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => handleMouseMove(cardRef, e));
    handleMouseMove(cardRef, { clientX: 0, clientY: 0 });

    return () => {
      document.removeEventListener("mousemove", (e) =>
        handleMouseMove(cardRef, e)
      );
    };
  }, []);

  return (
    <div
      className="h-fit card rounded-3xl flex flex-col gap-y-2 hover:border-1 hover:border-black cursor-pointer"
      ref={cardRef}
    >
      <div className="bg-white p-4 rounded-3xl">
        <Image
          src="https://lime-occasional-angelfish-940.mypinata.cloud/ipfs/bafkreig6b4lc3i3lihyiedahx76wnrlcxyyemeikkoov7zmffcoqc32jfm"
          alt="NFT Template"
          width={537}
          height={537}
          priority
          className="w-full"
          id="nftcard"
        />
        <text className="text-2xl font-bold">{state.name || "0xMyNFT"}</text>
      </div>
    </div>
  );
};

export default NFTCard;

const handleMouseMove = (cardRef, e) => {
  if (!cardRef.current) return;

  const cardRect = cardRef.current.getBoundingClientRect();
  const cardX = cardRect.left + cardRect.width / 2;
  const cardY = cardRect.top + cardRect.height / 2;

  const mouseX = e.clientX - cardX;
  const mouseY = e.clientY - cardY;

  const baseRotationFactor = 4;
  const scaleFactor = Math.min(window.innerWidth / 1600, 1); // Adjusted to 1600 based on your screen
  const rotationFactor = baseRotationFactor * scaleFactor;

  const rotateX = (mouseY / (cardRect.height / 2)) * -rotationFactor;
  const rotateY = (mouseX / (cardRect.width / 2)) * rotationFactor;

  cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const shadowX = rotateY * -1;
  const shadowY = rotateX;
  const shadowBlur = Math.abs(rotateX) + Math.abs(rotateY);
  cardRef.current.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.3)`;
};
