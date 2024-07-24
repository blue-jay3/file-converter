'use client';

import React, { useState, useRef } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export default function Home() {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  const openFileDialogBox = () => {
    inputFile.current.click();
  };

  const onFileChange = async (event) => {
    const { files } = event.target;
    console.log(files[0].name)
    setSelectedFile(files[0]);
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();
    await ffmpeg.writeFile(selectedFile.name, await fetchFile(selectedFile));
    await console.log(ffmpeg.exec(['-i', selectedFile.name, "C:/Users/Emma/Documents/GitHub/file-converter/with-tailwindcss-app/fileoutputs/output.png"]));
  };

  return (
    <>
      <input type="file" ref={inputFile} onChange={onFileChange} className="hidden"></input>
        <ContextMenu>
          <ContextMenuTrigger onMouseDown={openFileDialogBox} className="flex my-72 mx-auto h-[300px] w-[500px] cursor-pointer select-none items-center justify-center rounded-md border border-dashed text-lg">
            Upload a file
          </ContextMenuTrigger>
        </ContextMenu>
    </>
  );
}
