"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../config/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

interface Link {
  id: string;
  url: string;
  userId: string;
}

const LinksPage: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [newLink, setNewLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) {
      if (user) {
        const fetchLinks = async () => {
          try {
            const q = query(
              collection(db, "links"),
              where("userId", "==", user.uid)
            );
            const linksCollection = await getDocs(q);
            setLinks(
              linksCollection.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              })) as Link[]
            );
          } catch (error) {
            console.error("Error fetching links:", error);
          }
        };
        fetchLinks();
      } else {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  const validateUrl = (url: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    return urlPattern.test(url);
  };

  const handleAddLink = async () => {
    try {
      if (user && newLink) {
        if (validateUrl(newLink)) {
          await addDoc(collection(db, "links"), {
            url: newLink,
            userId: user.uid,
          });
          setNewLink("");
          setError("");
        } else {
          setError("Please enter a valid URL");
        }
      }
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleUpdateLink = async (id: string, updatedUrl: string) => {
    try {
      if (validateUrl(updatedUrl)) {
        await updateDoc(doc(db, "links", id), { url: updatedUrl });
        setError("");
      } else {
        setError("Please enter a valid URL");
      }
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await deleteDoc(doc(db, "links", id));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Links</h1>
      <input
        type="url"
        placeholder="New Link"
        value={newLink}
        onChange={(e) => setNewLink(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleAddLink}
        className="p-2 bg-blue-500 text-white rounded mb-4"
      >
        Add Link
      </button>
      <div className="w-full max-w-md">
        {links.map((link) => (
          <div
            key={link.id}
            className="p-2 border border-gray-300 rounded mb-2 flex justify-between"
          >
            <input
              type="url"
              value={link.url}
              onChange={(e) => handleUpdateLink(link.id, e.target.value)}
              className="flex-grow mr-2 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksPage;
