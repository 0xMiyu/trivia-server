import Image from "next/image";

interface ProfileProps {
    user?: string;
    name?: string;
    profilepic?: string;
    isCurrentUser: boolean;
    edit: Function;
}

function Profile(props: ProfileProps) {
    return (
        <div className="text-center relative py-10 mt-28 bg-[#212121] rounded-xl w-full">
            <img
                className="absolute left-[35%] md:left-[40%] h-32 w-32 md:h-48 md:w-48 mx-auto z-10 -top-16 md:-top-28 bg-white rounded-3xl"
                src={props.profilepic}
            ></img>
            <div className="px-8">
                <h3 className="truncate grid place-items-center text-[#C5FB00] mt-16 text-2xl md:text-4xl font-medium">
                    Hola {props.name} 👋
                </h3>
            </div>

            {props.isCurrentUser && (
                <button
                    className="absolute end-4 top-4"
                    onClick={(e) => {
                        props.edit(true);
                    }}
                >
                    <Image
                        src="/edit-button-svgrepo-com.svg"
                        width={36}
                        height={36}
                        alt="Edit Button"
                    ></Image>
                </button>
            )}

            <div className="mt-6 font-light">
                <p className="text-xl">Wallet Address:</p>
                <p className="text-[#C5FB00] text-xl">{props.user}</p>
            </div>
        </div>
    );
}

export default Profile;
