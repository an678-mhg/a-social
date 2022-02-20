import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { stogare } from "../config/firebase";

export const uploadImage = async (file, folder) => {
  const strRef = ref(stogare, `${folder}/${file.name}`);

  await uploadBytesResumable(strRef, file);

  const url = await getDownloadURL(strRef);

  return { url, strRef };
};
