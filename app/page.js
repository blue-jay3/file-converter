'use client';

import React, { useState, useEffect, useRef } from "react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

import FileCard from "@/components/filecard";
import UploadCard from "@/components/uploadcard";
import TitleBanner from "@/components/titlebanner";
import FileTypesCard from "@/components/filetypescard";

export default function Home() {  
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

  const onFileDrop = async (file) => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
    }

    setSelectedFile(file);
    await ffmpeg.writeFile(file.name, await fetchFile(file));
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
      <TitleBanner />

      { (selectedFile && selectedFile.type) ?
        <FileCard selectedFile={selectedFile} onFileTypeChange={onFileTypeChange} filename={filename} downloadUrl={downloadUrl} selectedFileType={selectedFileType} clearUpload={clearUpload}/> :
        <UploadCard inputFile={inputFile} onFileChange={onFileChange} openFileDialogBox={openFileDialogBox} onFileDrop={onFileDrop}/>
      }

      <FileTypesCard />
    </>
  );
}
