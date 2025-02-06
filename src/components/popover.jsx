import { Popover } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth/loginSlice";
import { maskEmail } from "./maskEmail";

const PopoverDemo = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logouthandler = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    className="flex size-[45px] cursor-pionter justify-center items-center rounded-full bg-blue-900 outline-none hover:bg-blue-800 focus:shadhow-black text-white text-2xl font-bold"
                    aria-label="Update dimensions"
                >
                    {
                        userData?.user?.username[0].toUpperCase()
                    }
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="w-fit rounded bg-white py-5 px-2 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                    sideOffset={5}>
                    <div className="flex flex-col gap-2 mt-4">
                        <fieldset className="flex items-center gap-5 hover:bg-gray-400 px-6 py-1 rounded-md">
                            <div className="user-info">
                                <div className="username text-gray-800 text-xl font-bold">{userData?.user?.username}</div>
                                <div className="email text-gray-500 text-sm">{maskEmail(userData?.user?.email)}</div>
                            </div>
                        </fieldset>
                        <div className="divider w-full h-[1px] bg-gray-200"></div>
                        <fieldset className="flex items-center gap-5 hover:bg-gray-400 px-6 py-1 rounded-md">
                            <Link to={'/'}>Home page</Link>
                        </fieldset>
                        <fieldset className="flex items-center gap-5 hover:bg-red-200 px-6 py-1 rounded-md text-red-600 font-bold w-full transition">
                            <button onClick={logouthandler}>Logout</button>
                        </fieldset>
                    </div>
                    <Popover.Close
                        className="absolute right-[5px] top-[5px] inline-flex size-[25px] cursor-default items-center justify-center rounded-full text-violet11 outline-none hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7"
                        aria-label="Close"
                    >
                        <Cross2Icon />
                    </Popover.Close>
                    <Popover.Arrow className="fill-white" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default PopoverDemo;
