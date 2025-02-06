import React from "react";
import { Link } from "react-router-dom";
import { FormattedSize } from "./formatSize";

const Doc = ({
  id,
  fileId,
  fileType,
  fileName,
  courseName,
  classes,
  classIdentify,
  size
}) => {
  return (
    // <a
    //   href={`https://drive.google.com/uc?export=download&id=${fileId}`}
    //   download
    // >
    <Link to={`/detail/post/${id}`}>
      {console.log(classes)}
      <div className="doc p-4 shadow-md border border-gray-400 bg-white hover:bg-gray-200 hover:border-blue-600 transition rounded-md flex flex-col gap-3">
        <div className="cover-part h-20 mx-auto">
          <img
            src={`/assets/${fileType.toLowerCase()}.png`}
            className="h-full"
          />
        </div>
        <div className="doc-info">
          <div className="doc-name font-bold text-xl">{fileName}</div>
          <div className="course-name text-gray-800">{courseName}</div>
          <div className="doc-size text-gray-500 text-sm"><FormattedSize size={size} /></div>
          <div className="sub-info flex justify-between mt-3">
            <div className="shift text-gray-800">{classes?.map(cls => cls.class.name).join(", ") || "No classes"}</div>
            <div className="class-name text-gray-800 font-bold">
              {classIdentify}
            </div>
          </div>
        </div>
      </div>
    </Link>
    // </a>
  );
};

export default Doc;
