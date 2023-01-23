import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VideoStream from "@/components/Stream";
import WidgetBot from "@widgetbot/react-embed";
import Modal from "@/components/ui/Modal";
import { Player } from "@livepeer/react";
import { getStream, updateStream } from "@/lib/db";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { arrayUnion } from "firebase/firestore";
import { useContract } from "@thirdweb-dev/react";

const Stream = () => {
  const [wallet, setWallet] = useState("");
  const [owner, setOwner] = useState(false);
  const [ready, setReady] = useState(false);
  const [stream, setStream] = useState(null);
  const [modal, setModal] = useState(false);

  const { address, isConnected } = useAccount();
  const { contract } = useContract(
    "0x4f1dD655148Ef3c118252622ef1D0aA621F63c59",
    "nft-drop"
  );

  const router = useRouter();

  useEffect(() => {
    setWallet(localStorage.getItem("address"));

    if (wallet === router.query.wallet) {
      setOwner(true);
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    setReady(true);

    if (!owner) {
      console.log(router.query.wallet);
      getStream(router.query.wallet).then((res) => setStream(res));
    }

    if (owner) {
      getStream(router.query.wallet).then((res) => {
        if (!res) return;

        if (res.owner === router.query.wallet) {
          setStream(res);
        }
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!address) return;
    if (!owner) {
      updateStream(router.query.wallet, {
        viewers: arrayUnion(address),
      });
    }
  }, [isConnected]);

  const handleAirdrop = () => {
    const quantity = 1;
    const metadata = [
      {
        name: stream?.name,
        description: `Your were a viewer of ${stream?.name}`,
        image:
          "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80", // This can be an image url or file
      },
    ];
    contract.createBatch(metadata);

    if (owner) {
      stream.viewers.forEach(async (viewer) => {
        const tx = await contract.claimTo(viewer, quantity);
      });
    }

    alert("Airdrop sent to all viewers");
  };

  //  start/stop stream, airdrop, view chat
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
              <button
                className="mt-4 bg-blue-500 rounded-md p-2 text-white"
                onClick={handleAirdrop}
              >
                Airdrop NFTs{" "}
              </button>
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
        <div className="mt-4">
          <h1 className="text-xl font-bold">
            {isConnected
              ? "Connect your wallet to qualify for airdrops"
              : "You are qualified for airdrops!"}
          </h1>
          <ConnectButton />
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
