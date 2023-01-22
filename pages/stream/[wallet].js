import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VideoStream from "@/components/Stream";
import WidgetBot from "@widgetbot/react-embed";

const Stream = () => {
  const [wallet, setWallet] = useState("");
  const [owner, setOwner] = useState(false);
  const [ready, setReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setWallet(localStorage.getItem("address"));

    if (wallet === router.query.wallet) {
      setOwner(true);
    }
  }, []);

  useEffect(() => {
    setReady(true);
  }, [router.isReady]);

  //  starty/stop stream, airdrop, view chat
  const renderOwner = () => {
    return (
      <>
        {/* Stream and chat */}
        <div className="flex w-full justify-between">
          <div className="w-3/5">
            <VideoStream />
          </div>
          {ready && (
            <WidgetBot
              server="1066511643237941288"
              channel="1066511643237941291"
              width="400"
              height="600"
              options="notifications?: true"
            />
          )}
        </div>
        {/* Management stuff */}
        <div className="mt-4">
          <h1 className="font-bold text-2xl">Manage your Stream</h1>
        </div>
      </>
    );
  };

  // view stream, view chat, connect wallet
  const renderViewer = () => {
    return (
      <>
        {/* Stream and chat */}
        <div></div>
      </>
    );
  };

  return (
    <div className="flex flex-col p-8">
      {owner ? renderOwner() : renderViewer()}
    </div>
  );
};

export default Stream;
