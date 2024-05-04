import { pdfjs } from "react-pdf";
import { useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PdfReader = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(2);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="bg-base-200 rounded-2xl absolute">
      <Document
        file="Metamorphosis.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="flex flex-row flex-wrap justify-between p-2">
        <p>
          Page {pageNumber} of {numPages}
        </p>

        <div className="">
          <button
            onClick={() => {
              if (pageNumber > 1) setPageNumber(pageNumber - 1);
            }}
          >
            <MdNavigateBefore size={24} />
          </button>
          <button
            onClick={() => {
              if (pageNumber < numPages) setPageNumber(pageNumber + 1);
            }}
          >
            <MdNavigateNext size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
