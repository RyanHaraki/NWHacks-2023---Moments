import { Player, useCreateStream } from "@livepeer/react";
import { setRequestMeta } from "next/dist/server/request-meta";

import { useMemo, useState, useEffect } from "react";

const VideoStream = ({ setStream }) => {
  const [streamName, setStreamName] = useState("");
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);

  const isLoading = useMemo(() => status === "loading", [status]);

  useEffect(() => {
    setStream(stream);
  }, [stream]);

  return (
    <div className="w-full h-full">
      {stream?.playbackId ? (
        <Player
          title={stream?.name}
          playbackId={stream?.playbackId}
          autoPlay
          muted
          className="rounded"
        />
      ) : (
        <Player />
      )}

      <div className="mt-4 flex  space-x-2">
        {!stream && (
          <>
            {" "}
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-5 py-2.5 "
              type="text"
              placeholder="Stream name"
              onChange={(e) => setStreamName(e.target.value)}
            />
            <button
              className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                createStream?.();
              }}
              disabled={isLoading || !createStream}
            >
              Create Stream
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VideoStream;
