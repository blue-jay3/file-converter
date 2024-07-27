const FileTypesCard = () => {
    return (
        <>
            <div className="grid grid-cols-[1fr_auto_1fr_1fr_1fr] gap-4 mt-32 mx-auto h-[200px] w-[700px] items-center justify-center rounded-lg border border-slate-300 bg-slate-50">
                <div className="mb-auto text-center justify-center items-center">
                    <p className="flex mt-4 mb-auto text-center justify-center text-lg text-slate-500">Popular Uses</p>
                    <p className="mt-1 text-slate-400">MP4 to MKV</p>
                    <p className="mt-1 text-slate-400">AVI to MP4</p>
                    <p className="mt-1 text-slate-400">WAV to MP3</p>
                </div>
                
                <div className="border-r border-gray-300 h-5/6"></div>

                <div className="mb-auto text-center justify-center items-center">
                    <p className="flex mt-4 mb-auto justify-center text-lg text-slate-500">Images</p>
                    <div className="grid grid-cols-2 mt-1 text-slate-400">
                        <p>JPEG</p>
                        <p>JPG</p>
                        <p>SVG</p>
                        <p>PNG</p>
                        <p>ICO</p>
                        <p>GIF</p>
                        <p>BMP</p>
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
                        <p>H264</p>
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
