import axios from "axios";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

export default function PhotoUploader({ addedPhoto, onChange }) {
    const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(e) {
        e.preventDefault();

        const { data: filename } = await axios.post("/uploadByLink", {
            link: photoLink,
        });
        // console.log(photoLink, " from photo link");

        // this function used for validate if the link is image's link
        function isImgUrl(url) {
            return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
        }
        // console.log(isImgUrl(photoLink)); // to see resaults

        if (photoLink === "" || isImgUrl(photoLink) === false) {
            // if input is empty or improper image's link
            alert("You selected add photo without inputing a proper link");
        } else {
            onChange((prev) => {
                return [...prev, filename];
            });
        }
        setPhotoLink("");
    }

    function uploadPhoto(e) {
        const files = e.target.files;
        // console.log({ files }); // <-- to check file
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append("photos", files[i]);
        }

        axios
            .post("/upload", data, {
                headers: { "Content-type": "multipart/form-data" },
            })
            .then((response) => {
                const { data: filenames } = response;
                onChange((prev) => {
                    return [...prev, ...filenames];
                });
            });
    }

    return (
        <>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                    placeholder={"URL LINK : to trail image"}
                />
                <button
                    onClick={addPhotoByLink}
                    className="bg-slate-200 px-4 rounded-2xl">
                    add&nbsp;photo
                </button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {addedPhoto.length > 0 &&
                    addedPhoto.map((link) => (
                        <div key={link} className="h-32 flex">
                            <img
                                className="rounded-2xl w-full object-cover"
                                src={`http://localhost:8000/uploads/${link}`}
                                alt=""
                            />
                        </div>
                    ))}

                {/* --UPLOAD-- */}

                <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-2xl p-2 text-slate-500 text-xl gap-1">
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={uploadPhoto}
                    />
                    <BiImageAdd className="w-8 h-8" /> Upload
                </label>
            </div>
        </>
    );
}
