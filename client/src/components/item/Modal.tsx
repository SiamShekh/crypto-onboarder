import { ReactNode, useState } from "react";

const Modal = ({ button, content, isBlurEffectClose = false }: { button?: ReactNode, content: ReactNode, isBlurEffectClose?: boolean }) => {
    const [modal, setModal] = useState(button ? false : true);

    return (
        <div>
            {
                modal &&
                <>
                    <div className="h-screen bg-black/50 z-[51] w-full fixed inset-0 duration-500" onClick={() => !isBlurEffectClose && setModal(false)} />
                    <div className="bg-black rounded-t-2xl border-t p-4 border-white/10 w-full duration-500 fixed z-[52] left-0 bottom-0">
                        <div className="w-24 h-1 absolute top-2 left-[50%] -translate-x-[50%] bg-white/20 mx-auto rounded-full"></div>
                        {content}
                    </div>
                </>
            }
            <div onClick={() => setModal(true)}> {button} </div>
        </div>
    );
};

export default Modal;