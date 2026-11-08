import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import resumePdf from "../../assets/resume/resume.pdf";
import "./resume.css";


pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


const MAX_PAGE_WIDTH = 850;
const DOWNLOAD_NAME = "Kenneth_Resume.pdf";


function useElementWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}


function ResumeError() {
  return (
    <p className="text">
      The resume couldn't be shown here.{" "}
      <a href={resumePdf} target="_blank" rel="noopener noreferrer">
        Open the PDF
      </a>{" "}
      instead.
    </p>
  );
}


class ViewerErrorBoundary extends Component<Readonly<{ children: ReactNode }>, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ResumeError />;
    }
    return this.props.children;
  }
}


export default function Resume() {
  const viewer = useElementWidth();
  const [pageCount, setPageCount] = useState(0);

  const pageWidth = Math.min(viewer.width, MAX_PAGE_WIDTH);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <main className="resume">
      <header className="resume__header">
        <h1 className="title">Resume</h1>
        <div className="resume__actions">
          <a className="see-more" href={resumePdf} download={DOWNLOAD_NAME}>
            download pdf
            <span aria-hidden="true">↓</span>
          </a>
          <a className="see-more" href={resumePdf} target="_blank" rel="noopener noreferrer">
            open in new tab
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <div className="resume__viewer" ref={viewer.ref}>
        <ViewerErrorBoundary>
          <Document
            file={resumePdf}
            onLoadSuccess={({ numPages }) => setPageCount(numPages)}
            loading={<p className="text">Loading resume…</p>}
            error={<ResumeError />}
          >
            {pageWidth > 0
              ? pageNumbers.map((pageNumber) => (
                  <Page
                    key={pageNumber}
                    className="resume__page"
                    pageNumber={pageNumber}
                    width={pageWidth}
                  />
                ))
              : null}
          </Document>
        </ViewerErrorBoundary>
      </div>
    </main>
  );
}