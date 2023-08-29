import { FunctionComponent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useWallet } from "@solana/wallet-adapter-react";
import { UpdateUserRequest } from "../../pages/api/user";
import { mutate } from "swr";
import { getInternalApiUrl } from "../../service/common";

interface EditProfileProps {
    user?: string;
    name?: string;
    profilepic?: string;
    save: Function;
}

const EditProfile: FunctionComponent<EditProfileProps> = (props) => {
    const wallet = useWallet();
    const [username, setUsername] = useState(props.name);
    const [profilePic, setProfilePic] = useState(props.profilepic);
    const [fileBlob, setFileBlob] = useState<File>();
    async function onSave(e: React.MouseEvent<HTMLButtonElement>) {
        let profilePictureURL;
        if (!fileBlob) {
            profilePictureURL = props.profilepic;
        } else {
            profilePictureURL = await uploadImage();
        }
        const body: UpdateUserRequest = {
            publicKey: wallet.publicKey!.toString(),
            userName: username,
            profilePicture: profilePictureURL,
        };
        const response = await fetch(
            `${getInternalApiUrl()}/api/user?publicKey=${wallet.publicKey}`,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        mutate(`${getInternalApiUrl()}/api/user?publicKey=${wallet.publicKey}`);
        props.save(false);
    }
    const uploadImage = async () => {
        let filename;
        let fileType;
        let new_uuid = uuidv4();
        if (fileBlob) {
            filename = encodeURIComponent(new_uuid);
            fileType = encodeURIComponent(fileBlob.type);
        } else {
            throw Error("Error uploading image");
        }

        const res = await fetch(
            `${getInternalApiUrl()}/api/image?imageName=${filename}&imageType=${fileType}`
        );
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file: fileBlob }).forEach(
            ([key, value]) => {
                formData.append(key, value as string);
            }
        );

        console.log(url + new_uuid);
        try {
            // returns an error cuz of cors, or smth but it still uploads
            const upload = await fetch(url, {
                method: "POST",
                body: formData,
            });
            return url + new_uuid;
        } catch (e) {
            // return here because of the error
            return url + new_uuid;
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            setFileBlob(file);

            reader.onloadend = () => {
                setProfilePic(reader.result as string);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    };
    return (
        <div className="text-center relative py-10 mt-28 bg-[#212121] rounded-xl w-full">
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="profile-pic-upload"
                onChange={handleImageUpload}
            />
            <label htmlFor="profile-pic-upload" className="cursor-pointer">
                <img
                    className="absolute left-[35%] md:left-[40%] h-32 w-32 md:h-48 md:w-48 mx-auto z-10 -top-16 md:-top-28 bg-white rounded-3xl"
                    src={profilePic}
                />
            </label>
            <div className="px-8 grid place-items-center">
                <input
                    value={username}
                    placeholder={props.name}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    className="bg-[#212121] text-center text-[#C5FB00] mt-16 text-2xl md:text-4xl font-medium"
                ></input>
            </div>

            <button
                className="absolute end-4 top-4 border rounded-md px-4 py-2  text-white "
                type="submit"
                onClick={onSave}
            >
                Save
            </button>

            <div className="mt-6 font-light">
                <p className="text-xl">Wallet Address:</p>
                <p className="text-[#C5FB00] text-xl">{props.user}</p>
            </div>
        </div>
    );
};

export default EditProfile;
