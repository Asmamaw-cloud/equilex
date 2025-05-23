import { Download, X } from "lucide-react";
import useDownloader from "react-use-downloader";

const FileDownloader = ({ fileUrl }: { fileUrl: string }) => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();
  const filename = "File1.png";
  return (
    <div className=" flex py-2 ">
      {isInProgress ? (
        <div className=" flex justify-evenly items-center ">
          <X
            className=" bg-red-700 text-white p-1 w-10 rounded-md cursor-pointer mr-1 "
            onClick={() => cancel()}
          />
          <p>{elapsed}</p>
        </div>
      ) : (
        <Download
          onClick={() => download(fileUrl, filename)}
          className=" bg-green-400 text-white p-1 w-10 rounded-md cursor-pointer "
        />
      )}
      {error && (
        <p className=" text-sm text-red-600 ">{JSON.stringify(error)}</p>
      )}
    </div>
  );
};

export default FileDownloader;
