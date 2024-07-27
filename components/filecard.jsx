import { FaRegFileAudio } from "react-icons/fa6";
import { FaRegFileImage } from "react-icons/fa6";
import { FaRegFileVideo } from "react-icons/fa6";

import { FaRegTrashAlt } from "react-icons/fa";

const FileCard = ({selectedFile, onFileTypeChange, filename, downloadUrl, selectedFileType, clearUpload, videoFileTypes, audioFileTypes, imageFileTypes, show}) => {
    return (
        <>
            <div className="block mt-24 mx-auto w-fit px-5 pt-5 pb-5 rounded-lg border border-slate-300 bg-slate-100">
                <div className="flex mx-auto w-[500px] h-[150px] p-5 rounded-lg border text-lg text-slate-500 border-slate-400 bg-slate-50">
                    {selectedFile.type.startsWith("video/") ? <FaRegFileVideo className="mr-5 my-auto size-24"/> : (selectedFile.type.startsWith("audio/") ? <FaRegFileAudio className="mr-5 my-auto size-24"/> : <FaRegFileImage className="mr-5 my-auto size-24"/>)}

                    <div className="block">
                        <h3 className="mr-auto text-lg w-80 truncate whitespace-nowrap">{selectedFile.name.substr(0, selectedFile.name.lastIndexOf("."))}</h3>
                        <p className="text-base">{selectedFile.type}</p>

                        <form className="mt-3">
                        <select id="filetype" onChange={onFileTypeChange} className="mt-auto select-none bg-gray-50 border border-slate-300 text-slate-600 text-sm rounded-lg block p-2.5">
                            <option defaultChecked value="">Select a file type</option>
                            {(selectedFile.type.startsWith("video/") ? videoFileTypes : (selectedFile.type.startsWith("audio/") ? audioFileTypes : imageFileTypes)).map((ft) => <option key={ft} value={ft}>{ft.split("/")[1].toUpperCase()}</option>)}
                        </select>
                        </form>
                    </div>

                    <FaRegTrashAlt onClick={clearUpload} className="mt-auto ml-auto mr-0 size-5 cursor-pointer"/>
                </div>

                {show && <p className="text-red-400 mb-3">{show}</p>}
            </div>

            { (selectedFileType && !downloadUrl) ? 

            <div className="flex items-center justify-center mx-auto mt-14">
                <span className="relative flex h-3 w-3 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <button disabled type="button" className="flex text-white h-[40px] w-[150px] items-center justify-center select-none bg-slate-300 cursor-not-allowed font-medium rounded-lg focus:outline-none">
                    Converting...
                </button>
            </div>

            :
            
            <a download={filename} href={downloadUrl} className={`flex text-white mx-auto h-[40px] w-[150px] items-center justify-center mt-14 select-none ${(!selectedFileType || !downloadUrl) ? "bg-slate-300 cursor-not-allowed" : "bg-slate-600 hover:bg-slate-700"} font-medium rounded-lg text-sm focus:outline-none`}>Download File</a>

            }
        </>
    );
}

export default FileCard;
