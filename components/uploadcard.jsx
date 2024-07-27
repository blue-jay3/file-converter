import { useState } from "react"

const UploadCard = ({inputFile, onFileChange, openFileDialogBox, onFileDrop, acceptableFileTypes}) => {

    const [dragActive, setDragActive] = useState(false);
    const [show, setShow] = useState("");

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
    }

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
    }

    const handleDrop = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        if(event.dataTransfer.items){
            const item = event.dataTransfer.items[0];
            if (item.kind === "file") {
                const file = item.getAsFile();
                if(acceptableFileTypes.includes(file.type)) {
                    onFileDrop(file);
                } else {
                    setShow("Please use a supported file type");
                    setTimeout(() => {
                        setShow("");
                    }, 5000);
                }
            }
        } else {
            setShow("Please use a supported file type");
            setTimeout(() => {
                setShow("");
            }, 5000);
        }
    }

    return (
        <>
            <div className="block mt-24 mx-auto w-fit px-5 pt-5 text-center items-center justify-center rounded-lg border border-slate-300 bg-slate-100">
                <form onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={openFileDialogBox} className={`flex mx-auto ${show ? "mb-3" : "mb-5"} h-[150px] w-[500px] cursor-pointer select-none items-center justify-center rounded-lg border border-dashed ${dragActive ? "border-blue-500" : "border-slate-400"} bg-slate-50`}>
                    <input type="file" ref={inputFile} onChange={onFileChange} accept={acceptableFileTypes.join(',')} className="hidden"></input>
                    
                    <p className={`text-lg ${dragActive ? "text-blue-500" : "text-slate-500"}`}>Upload a file</p>
                </form>
                {show && <p className="text-red-400 mb-3">{show}</p>}
            </div>
        </>

    );
}

export default UploadCard;
