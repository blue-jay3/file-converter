import { useState } from "react"

import FileErrorToast from "../components/fileerrortoast";

const UploadCard = ({inputFile, onFileChange, openFileDialogBox, onFileDrop}) => {
    const videoFileTypes = [
        'video/mp4',
        'video/m4v',
        'video/mkv',
        'video/mov',
        'video/wmv',
        'video/avi',
        'video/h264'
    ]
    
    const audioFileTypes = [
        'audio/mp3',
        'audio/aac',
        'audio/flac',
        'audio/wav',
        'audio/ogg'
    ]
    
    const imageFileTypes = [
        'image/jpeg',
        'image/jpg',
        'image/svg',
        'image/png',
        'image/ico',
        'image/gif',
        'image/bmp',
        'image/tiff',
        'image/webp',
    ]
    
    const acceptableFileTypes = videoFileTypes.concat(audioFileTypes, imageFileTypes);

    const [dragActive, setDragActive] = useState(false);
    const [show, setShow] = useState(false);

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
                    setShow(true);
                }
            }
        } else {
            setShow(true);
        }
    }

    return (
        <>
            <form onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={openFileDialogBox} className={`flex mt-24 mx-auto h-[150px] w-[500px] cursor-pointer select-none items-center justify-center rounded-lg border border-dashed ${dragActive ? "border-blue-500" : "border-slate-400"} bg-slate-50`}>
                <input type="file" ref={inputFile} onChange={onFileChange} accept={acceptableFileTypes.join(',')} className="hidden"></input>
                
                <p className={`text-lg ${dragActive ? "text-blue-500" : "text-slate-500"}`}>Upload a file</p>
            </form>

            {show && <FileErrorToast />}
        </>


    );
}

export default UploadCard;
