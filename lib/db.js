import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const createNewStream = async (owner, streamId, playbackUrl, name, streamKey) => {
  await setDoc(doc(db, "streams", owner), {
    owner: owner,
    name: name,
    streamId: streamId,
    playbackId: playbackUrl,
    streamKey: streamKey
  });
};

const updateStream = async (owner, data) => {
  await updateDoc(doc(db, "streams", owner), data);
};

const getStream = async (address) => {
  const streamRef = doc(db, "streams", address);

  const docSnap = await getDoc(streamRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("STREAM DOES NOT EXIST");
  }
};

export { createNewStream, updateStream, getStream };
