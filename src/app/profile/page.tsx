"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CiImageOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Profile;
          setProfile({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || user.email || "",
          });
        } else {
          setProfile({ firstName: "", lastName: "", email: user.email || "" });
        }
      };
      fetchProfile();
    }
  }, [user, router]);

  const validateForm = () => {
    let isValid = true;

    if (!profile.firstName) {
      setFirstNameError("Can't be empty");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!profile.lastName) {
      setLastNameError("Can't be empty");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!profile.email) {
      setEmailError("Can't be empty");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleUpdateProfile = async () => {
    if (validateForm() && user) {
      await setDoc(doc(db, "profiles", user.uid), profile);
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="empty-page bg-gray-50 flex p-6 gap-6 flex-col md:flex-row">
      <div className="w-full empty-page-left hidden lg:w-[560px] lg:h-[834px] p-6 gap-2 rounded-xl lg:flex items-center justify-center bg-white relative">
        <img
          src="/Rectangle 15.png"
          alt="Example"
          className="w-full lg:w-[307px] lg:h-[631px] border border-white"
        />
        <img
          src="/Subtract.png"
          alt="Example"
          className="w-[285px] h-[611px] border border-white absolute inset-0 m-auto"
        />
        <div className="image-main w-[237px] h-auto flex flex-col gap-14 absolute top-[165px] left-[161px] ">
          <div className="image-main-head flex flex-col gap-6 items-center justify-center">
            <div
              className="image-main-head-1 w-[96px] h-[96px] bg-[#EEEEEE] rounded-full cursor-pointer"
              style={{
                backgroundImage: `url(${
                  imagePreview || "/default-profile.png"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => setShowOverlay(true)}
            ></div>
            <div
              className="image-main-head-2 w-auto h-auto p-2 bg-[#EEEEEE] rounded-[104px]"
              style={{ backgroundColor: "#EEEEEE" }}
            >
              <p className="text-center text-[#333333]">
                {profile.firstName} {profile.lastName}
              </p>
            </div>
            <div
              className="image-main-head-3 w-auto h-auto p-2 bg-[#EEEEEE] rounded-[104px]"
              style={{ backgroundColor: "#EEEEEE" }}
            >
              <p className="text-center text-[#333333]">{profile.email}</p>
            </div>
          </div>
          <div className="image-main-bottom flex flex-col gap-5">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="image-main-bottom-1 w-[237px] h-[44px] bg-[#EEEEEE] rounded-[8px]"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full empty-page-right flex-1 h-auto gap-6 p-10 rounded-xl bg-white flex flex-col">
        <div className="page-right-text gap-2">
          <h2 className="font-bold text-[32px] leading-[48px] text-[#333333]">
            Profile Details
          </h2>
          <p className="text-[16px] leading-[24px] text-[#737373]">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <div className="w-full h-auto page-right-started p-8 gap-3 rounded-lg bg-[#FAFAFA] flex flex-col md:flex-row justify-between">
          <div className="w-auto flex items-center justify-center">
            <p className="text-[16px] leading-[24px] text-[#737373]">
              Profile picture
            </p>
          </div>

          <div
            className="w-auto  page-right-started-1 gap-2 p-4 md:w-[193px] md:h-[193px] rounded-lg bg-[#EFEBFF] text-[#633CFF] flex flex-col items-center justify-center cursor-pointer relative"
            onClick={() => document.getElementById("imageUpload")?.click()}
          >
            <CiImageOn size={25} />
            <p className="flex gap-2 text-[16px] leading-[24px]">
              <FaPlus />
              Upload Image
            </p>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview && (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 z-0"
                style={{
                  backgroundImage: `url(${imagePreview})`,
                }}
              ></div>
            )}
          </div>
          <div className="w-auto flex items-center justify-center">
            <p className="text-[12px] leading-[18px] text-[#737373]">
              Image must be below 1024x1024px. <br></br>Use PNG or JPG format.
            </p>
          </div>
        </div>

        <div className="w-full h-auto page-right-started p-8 gap-3 rounded-lg bg-[#FAFAFA] flex flex-col ">
          <div className="w-full justify-between flex flex-col md:flex-row gap-[16px] relative">
            <label
              htmlFor="firstname"
              className={`text-left ${
                firstNameError ? "text-[#FF3939]" : "text-[#737373]"
              }`}
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="e.g. John"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              className={`flex p-2 text-base text-[#737373] border ${
                firstNameError
                  ? "border-[#FF3939]"
                  : "border-[#D9D9D9] focus:border-[#633CFF] focus:outline-none"
              } w-full md:w-[450px] rounded-lg gap-[12px]`}
            />
            {firstNameError && (
              <p className="absolute text-[#FF3939] text-xs right-3 top-3/4 md:top-1/2 transform -translate-y-1/2">
                {firstNameError}
              </p>
            )}
          </div>

          <div className="w-full justify-between flex flex-col md:flex-row gap-[16px] relative">
            <label
              htmlFor="lastname"
              className={`text-left ${
                lastNameError ? "text-[#FF3939]" : "text-[#737373]"
              }`}
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="e.g. Doe"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              className={`flex p-2 text-base text-[#737373] border ${
                lastNameError
                  ? "border-[#FF3939]"
                  : "border-[#D9D9D9] focus:border-[#633CFF] focus:outline-none"
              } w-full md:w-[450px] rounded-lg gap-[12px]`}
            />
            {lastNameError && (
              <p className="absolute text-[#FF3939] text-xs right-3 top-3/4 md:top-1/2 transform -translate-y-1/2">
                {lastNameError}
              </p>
            )}
          </div>

          <div className="w-full justify-between flex flex-col md:flex-row gap-[16px] relative">
            <label
              htmlFor="email"
              className={`text-left ${
                emailError ? "text-[#FF3939]" : "text-[#737373]"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g. john.doe@gmail.com"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className={`flex p-2 text-base text-[#737373] border ${
                emailError
                  ? "border-[#FF3939]"
                  : "border-[#D9D9D9] focus:border-[#633CFF] focus:outline-none"
              } w-full md:w-[450px] rounded-lg gap-[12px]`}
            />
            {emailError && (
              <p className="absolute text-[#FF3939] text-xs right-3 top-3/4 md:top-1/2 transform -translate-y-1/2">
                {emailError}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex items-center justify-end">
          <button
            onClick={handleUpdateProfile}
            className="w-full md:w-[91px] px-6 py-3 bg-[#633CFF] text-white rounded-lg hover:bg-[#4d2bcc]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
