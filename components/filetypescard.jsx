const FileTypesCard = () => {
    return (
        <>
            <h3 className="flex justify-center text-2xl mt-24 font-medium text-slate-400 select-none">Supported File Types</h3>
            <div className="grid grid-cols-3 gap-4 mt-8 mb-10 pb-5 mx-auto h-fit w-[700px] items-center justify-center rounded-lg border border-slate-300 bg-slate-50">
                <div className="mb-auto text-center justify-center items-center">
                    <p className="flex mt-4 mb-auto justify-center text-lg text-slate-500">Images</p>
                    <div className="grid grid-cols-2 mt-1 text-slate-400">
                        <p>JPEG</p>
                        <p>JPG</p>
                        <p>PNG</p>
                        <p>ICO</p>
                        <p>GIF</p>
                        <p>TIFF</p>
                        <p>WEBP</p>
                    </div>
                </div>
                <div className="mb-auto text-center justify-center items-center">
                    <p className="flex mt-4 mb-auto justify-center text-lg text-slate-500">Videos</p>
                    <div className="grid grid-cols-2 mt-1 text-slate-400">
                        <p>MP4</p>
                        <p>M4V</p>
                        <p>MKV</p>
                        <p>MOV</p>
                        <p>WMV</p>
                        <p>AVI</p>
                    </div>
                </div>
                <div className="mb-auto text-center justify-center items-center">
                    <p className="flex mt-4 mb-auto justify-center text-lg text-slate-500">Audio</p>
                    <div className="grid grid-cols-2 mt-1 text-slate-400">
                        <p>MP3</p>
                        <p>AAC</p>
                        <p>FLAC</p>
                        <p>WAV</p>
                        <p>OGG</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FileTypesCard;
