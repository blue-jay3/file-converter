'use client';

import React, { useState, useEffect, useRef } from "react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

import FileCard from "@/components/filecard";
import UploadCard from "@/components/uploadcard";
import TitleBanner from "@/components/titlebanner";
import FileTypesCard from "@/components/filetypescard";

export default function Home() {  
  const videoFileTypes = [
      'video/mp4',
      'video/m4v',
      'video/mkv',
      'video/mov',
      'video/wmv',
      'video/avi'
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
      'image/png',
      'image/ico',
      'image/gif',
      'image/tiff',
      'image/webp'
  ]

  const acceptableFileTypes = videoFileTypes.concat(audioFileTypes, imageFileTypes);

  const [downloadUrl, setDownloadUrl] = useState(null);
  const [filename, setFilename] = useState(null);

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [selectedFileType, setSelectedFileType] = useState("");

  const [ffmpeg, setFfmpeg] = useState(null);

  const [show, setShow] = useState("");

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
    try {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl)
      }
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setSelectedFile(file);
  
        await ffmpeg.writeFile(file.name, await fetchFile(file));
      }
    } catch (error) {
      setShow(error.message);
      setTimeout(() => {
          setShow("");
      }, 5000);
    }
  };

  const onFileDrop = async (file) => {
    try {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl)
      }

      setSelectedFile(file);
      await ffmpeg.writeFile(file.name, await fetchFile(file));
    } catch (error) {
      setShow(error.message);
      setTimeout(() => {
          setShow("");
      }, 5000);
    }
  };

  const onFileTypeChange = async (event) => {
    try {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(null)
      }
      setSelectedFileType(event.target.value);
      if (event.target.value != "") {
        await ffmpeg.exec(['-i', selectedFile.name,'-strict','-2', selectedFile.name.substr(0, selectedFile.name.lastIndexOf(".")) + "." + event.target.value.split("/")[1].toLowerCase()])
        convertFile(selectedFile.name.substr(0, selectedFile.name.lastIndexOf(".")) + "." + event.target.value.split("/")[1].toLowerCase(), event.target.value)
      } else {
        setFilename(null)
      }
    } catch (error) {
      setShow(error.message);
      setTimeout(() => {
          setShow("");
      }, 5000);
    }
  }

  const convertFile = async (name, type) => {
    try {
      const outputFile = await ffmpeg.readFile(name);
      const outputBlob = new Blob([outputFile.buffer], { type: type });
      const url = URL.createObjectURL(outputBlob);
      setDownloadUrl(url)
      setFilename(name)
    } catch (error) {
      setShow(error.message);
      setTimeout(() => {
          setShow("");
      }, 5000);
    }
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
        <FileCard selectedFile={selectedFile} onFileTypeChange={onFileTypeChange} filename={filename} downloadUrl={downloadUrl} selectedFileType={selectedFileType} clearUpload={clearUpload} imageFileTypes={imageFileTypes} audioFileTypes={audioFileTypes} videoFileTypes={videoFileTypes} show={show}/> :
        <UploadCard inputFile={inputFile} onFileChange={onFileChange} openFileDialogBox={openFileDialogBox} onFileDrop={onFileDrop} acceptableFileTypes={acceptableFileTypes}/>
      }

      <FileTypesCard />
    </>
  );
}
