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
    'video/mkv',
    'video/webm',
    'video/avi',
    'video/quicktime',
    'video/x-flv',
    'video/x-ms-wmv',
    'video/mpeg',
    'video/3gpp',
    'video/MP2T'
  ]

  const audioFileTypes = [
    'audio/mp3',
    'audio/aac',
    'audio/flac',
    'audio/wav',
    'audio/ogg',
    'audio/alac',
    'audio/opus',
    'audio/ac3',
    'audio/aiff'
  ]

  const imageFileTypes = [
    'image/jpeg',
    'image/png',
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
      console.log(file.name)
      setSelectedFile(file);

      await ffmpeg.writeFile(file.name, await fetchFile(file));
    }
  };

  const onFileTypeChange = async (event) => {
    setSelectedFileType(event.target.value);
    if (event.target.value != "") {
      await ffmpeg.exec(['-i', selectedFile.name, selectedFile.name.substr(0, selectedFile.name.lastIndexOf(".")) + "." + event.target.value.split("/")[1].toLowerCase()])
      convertFile(selectedFile.name.substr(0, selectedFile.name.lastIndexOf(".")) + "." + event.target.value.split("/")[1].toLowerCase(), event.target.value)
    } else {
      setDownloadUrl(null)
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
    setSelectedFile(null);
  }

  return (
    <>
      <div className="flex">
        <FaReact className="flex mr-4 my-7 ml-7 size-8 text-slate-600"/>
        <TbBrandNextjs className="flex mr-4 my-7 size-8 text-slate-700"/>
        <RiTailwindCssFill className="flex mr-auto my-7 size-8 text-slate-700"/>

        <FaGithub className="flex ml-auto my-7 size-8 cursor-pointer text-slate-700"/>
        <FaLinkedin className="flex ml-4 my-7 mr-7 size-8 cursor-pointer text-slate-600"/>
      </div>

      <div className="flex justify-center mt-24 px-20">
        <h1 className="text-5xl font-extrabold text-slate-500 select-none">File Converter<small className="ms-2 font-semibold text-slate-400 select-none">Using FFmpeg</small></h1>
      </div>

      { selectedFile ?
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

          <a download={filename} href={downloadUrl} className={`flex text-white mx-auto w-[150px] justify-center mt-14 select-none ${(!selectedFileType || !downloadUrl) ? "bg-slate-300 cursor-not-allowed" : "bg-slate-600 hover:bg-slate-700"} font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none`}>Download File</a>
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
