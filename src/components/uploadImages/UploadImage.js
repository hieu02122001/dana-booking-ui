import React, { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { db } from "../../firebase/firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const UploadImage = ({ imageFiles, setImageFiles }) => {
  const handleUploadImage = (file, nameId) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file provided");
        return;
      }

      const storage = getStorage();
      const storageRef = ref(storage, "booking/" + nameId);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress updates
        },
        (error) => {
          // Handle unsuccessful upload
          reject(error);
        },
        () => {
          // Handle successful upload
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve({ file, nameId, url: downloadURL });
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const handleFileInput = async (e) => {
    if (imageFiles.length >= 6) return;
    const filesList = e.target.files;
    if (filesList.length >= 6) return;

    const uploadPromises = Array.from(filesList).map(async (file) => {
      const nameId = uuidv4();
      const uploadedFile = await handleUploadImage(file, nameId);
      return { ...uploadedFile, file };
    });

    try {
      const uploadedFiles = await Promise.all(uploadPromises);

      // Retrieve the download URLs
      const downloadURLPromises = uploadedFiles.map((uploadedFile) => {
        const { file, nameId } = uploadedFile;
        return getDownloadURL(ref(getStorage(), "booking/" + nameId))
          .then((downloadURL) => {
            return { ...uploadedFile, url: downloadURL };
          })
          .catch((error) => {
            // Handle errors if fetching download URL fails
            return { ...uploadedFile, url: "" };
          });
      });

      const updatedFiles = await Promise.all(downloadURLPromises);

      // Update the state with the final list of uploaded files
      const updatedList = [...imageFiles, ...updatedFiles];
      setImageFiles(updatedList);
    } catch (error) {
      // Handle errors if any upload or download URL fetch fails
    }
  };

  const handleDeleteImage = (item) => {
    const listImage = imageFiles.filter(
      (image) => image.file.name !== item.file.name
    );
    setImageFiles(listImage);
  };

  return (
    <div className="w-full h-full p-4 border border-slate-300 shadow-md">
      {!imageFiles.length > 0 ? (
        <label
          htmlFor="uploadImage"
          className="w-full h-full cursor-pointer inline-block"
        >
          <div className="w-full h-full flex items-center justify-center">
            <MdAddAPhoto className="w-10 h-10" />
          </div>
          <input
            onChange={(e) => handleFileInput(e)}
            type="file"
            id="uploadImage"
            className="hidden"
            multiple={true}
            accept={"image/png, image/jpeg, image/jpg, image/bmp"}
          />
        </label>
      ) : (
        <div className="w-full h-full gap-1">
          {imageFiles.map((item) => {
            return (
              <div
                key={item.url}
                className="w-full h-[180px] cursor-pointer relative"
              >
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <AiOutlineCloseCircle
                  className="absolute right-1 top-1 text-3xl text-primary"
                  onClick={() => handleDeleteImage(item)}
                />
              </div>
            );
          })}
          {imageFiles.length < 1 && imageFiles.length > 0 && (
            <div className="w-full h-[180px]">
              <label
                htmlFor="uploadImage"
                className="w-full h-full cursor-pointer inline-block"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <MdAddAPhoto className="w-10 h-10" />
                </div>
                <input
                  onChange={(e) => handleFileInput(e)}
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  multiple={true}
                  accept={"image/png, image/jpeg, image/jpg, image/bmp"}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
