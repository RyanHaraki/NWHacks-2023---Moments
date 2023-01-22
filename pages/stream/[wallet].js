import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VideoStream from "@/components/Stream";
import WidgetBot from "@widgetbot/react-embed";
import Modal from "@/components/ui/Modal";
import { Player } from "@livepeer/react";

const Stream = () => {
  const [wallet, setWallet] = useState("");
  const [owner, setOwner] = useState(false);
  const [ready, setReady] = useState(false);
  const [stream, setStream] = useState(null);
  const [modal, setModal] = useState(false);

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
        <Modal open={modal} setOpen={setModal} />
        <div className="flex w-full justify-between">
          <div className="w-3/5">
            <h1 className="font-bold text-2xl mb-2">{stream?.name}</h1>
            <VideoStream setStream={setStream} />
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
          {stream && (
            <div>
              <p>
                Not sure how to stream from OBS?{" "}
                <span
                  onClick={() => setModal(true)}
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  Click here to learn how.
                </span>
              </p>
              <p>Click on either value to copy:</p>
              <ul>
                <li>
                  <b>RTMP URL: </b>
                  <span
                    onClick={async () => {
                      console.log(stream.streamKey);
                      await navigator.clipboard.writeText(
                        "rtmp://rtmp.livepeer.com/live"
                      );

                      alert("RTMP URL copied to clipboard!");
                    }}
                    className="cursor-pointer hover:text-blue-400 hover:underline transition"
                  >
                    rtmp://rtmp.livepeer.com/live
                  </span>
                </li>
                <li>
                  <b>Your Stream Key: </b>
                  <span
                    onClick={async () => {
                      console.log(stream.streamKey);
                      await navigator.clipboard.writeText(stream?.streamKey);

                      alert("Stream key copied to clipboard!");
                    }}
                    className="cursor-pointer hover:text-blue-400 hover:underline transition"
                  >
                    {stream?.streamKey}
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </>
    );
  };

  // view stream, view chat, connect wallet
  const renderViewer = () => {
    return (
      <>
        {/* Stream and chat */}

        <div className="flex w-full justify-between">
          <div className="w-3/5">
            <h1 className="font-bold text-2xl mb-2">{stream?.name}</h1>
            <Player
              title={stream?.name}
              playbackId={stream?.playbackId}
              autoPlay
              className="rounded-md"
            />
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
// {stream.rtmpIngestUrl}
//          {stream.streamKey}
//         {stream.playbackId}
