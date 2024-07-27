import { FaGithub } from "react-icons/fa";

import { FaReact } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { RiTailwindCssFill } from "react-icons/ri";

const TitleBanner = () => {
    return (
        <>
            <div className="flex">
                <FaReact className="flex mr-4 my-7 ml-7 size-8 text-slate-600"/>
                <TbBrandNextjs className="flex mr-4 my-7 size-8 text-slate-700"/>
                <RiTailwindCssFill className="flex mr-auto my-7 size-8 text-slate-700"/>

                <a target="_blank" href="https://github.com/blue-jay3/file-converter/tree/main">
                    <FaGithub className="flex ml-auto my-7 mr-7 size-8 cursor-pointer text-slate-700"/>
                </a>
            </div>

            <h1 className="flex justify-center mt-24 px-20 text-5xl font-extrabold text-slate-500 select-none">File Converter</h1>
            <small className="flex justify-center text-4xl mt-2 font-semibold text-slate-400 select-none">Using FFmpeg</small>
        </>
    );
}

export default TitleBanner;
