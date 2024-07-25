'use client';

import React, { useState, useEffect, useRef } from "react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { RiTailwindCssFill } from "react-icons/ri";

import { FaRegFileAudio } from "react-icons/fa6";
import { FaRegFileImage } from "react-icons/fa6";
import { FaRegFileVideo } from "react-icons/fa6";

import { FaRegTrashAlt } from "react-icons/fa";

export default function Home() {
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
  
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [filename, setFilename] = useState(null);

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedFileType, setSelectedFileType] = useState("");

  const [ffmpeg, setFfmpeg] = useState(null);

  useEffect(() => {
    const initializeFFmpeg = async () => {
      const ffmpegInstance = new FFmpeg();
      await ffmpegInstance.load();
      setFfmpeg(ffmpegInstance);
    };
    initializeFFmpeg();
  }, []);

  const openFileDialogBox = () => {
    inputFile.current.click();
  };

  const onFileChange = async (event) => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
    }
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      await ffmpeg.writeFile(file.name, await fetchFile(file));
    }
  };

  const onFileTypeChange = async (event) => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null)
    }
    setSelectedFileType(event.target.value);
    if (event.target.value != "") {
      await ffmpeg.exec(['-i', selectedFile.name, selectedFile.name.substr(0, selectedFile.name.lastIndexOf(".")) + "." + event.target.value.split("/")[1].toLowerCase()])
      convertFile(selectedFile.name.substr(0, selectedFile.name.lastIndexOf(".")) + "." + event.target.value.split("/")[1].toLowerCase(), event.target.value)
    } else {
      setFilename(null)
    }
  }

  const convertFile = async (name, type) => {
    const outputFile = await ffmpeg.readFile(name);
    const outputBlob = new Blob([outputFile.buffer], { type: type });
    const url = URL.createObjectURL(outputBlob);
    setDownloadUrl(url)
    setFilename(name)
  }

  const clearUpload = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }

    setFilename(null);
    setDownloadUrl(null);
    setSelectedFile(null);
    setSelectedFileType(null);
  }

  return (
    <>
      <div className="flex">
        <FaReact className="flex mr-4 my-7 ml-7 size-8 text-slate-600"/>
        <TbBrandNextjs className="flex mr-4 my-7 size-8 text-slate-700"/>
        <RiTailwindCssFill className="flex mr-auto my-7 size-8 text-slate-700"/>

        <a target="_blank" href="https://github.com/blue-jay3/file-converter/tree/main/with-tailwindcss-app">
          <FaGithub className="flex ml-auto my-7 size-8 cursor-pointer text-slate-700"/>
        </a>
        <FaLinkedin className="flex ml-4 my-7 mr-7 size-8 cursor-pointer text-slate-600"/>
      </div>

      <div className="flex justify-center mt-24 px-20">
        <h1 className="text-5xl font-extrabold text-slate-500 select-none">File Converter<small className="ms-2 font-semibold text-slate-400 select-none">Using FFmpeg</small></h1>
      </div>

      { (selectedFile && selectedFile.type) ?
        <>
          <div className="flex mt-28 mx-auto w-[500px] h-[150px] p-5 rounded-lg border text-lg text-slate-500 border-slate-400 bg-slate-50">
            {selectedFile.type.startsWith("video/") ? <FaRegFileVideo className="mr-5 my-auto size-24"/> : (selectedFile.type.startsWith("audio/") ? <FaRegFileAudio className="mr-5 my-auto size-24"/> : <FaRegFileImage className="mr-5 my-auto size-24"/>)}

            <div className="block">
              <h3 className="mr-auto mt text-lg w-80 truncate whitespace-nowrap">{selectedFile.name.substr(0, selectedFile.name.lastIndexOf("."))}</h3>
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

          { (selectedFileType && !downloadUrl) ? 

          <button disabled type="button" className="flex text-white mx-auto h-[40px] w-[150px] items-center justify-center mt-14 select-none bg-slate-300 cursor-not-allowed font-medium rounded-lg focus:outline-none">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffff"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#64748b"/>
            </svg>
            Converting...
          </button>
          :
          <a download={filename} href={downloadUrl} className={`flex text-white mx-auto h-[40px] w-[150px] items-center justify-center mt-14 select-none ${(!selectedFileType || !downloadUrl) ? "bg-slate-300 cursor-not-allowed" : "bg-slate-600 hover:bg-slate-700"} font-medium rounded-lg text-sm focus:outline-none`}>Download File</a>
        
        }
        </>

        :

        <>
          <input type="file" ref={inputFile} onChange={onFileChange} accept={acceptableFileTypes.join(',')} className="hidden"></input>
          
          <div onClick={openFileDialogBox} className="flex mt-28 mx-auto h-[150px] w-[500px] cursor-pointer select-none items-center justify-center rounded-lg border border-dashed text-lg text-slate-500 border-slate-400 bg-slate-50">
            Upload a file
          </div>
        </>
      }
    </>
  );
}
