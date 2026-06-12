import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autoformat,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HorizontalLine,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  Paragraph,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const EDITOR_CONFIG = {
  plugins: [
    Autoformat,
    AutoLink,
    Autosave,
    BlockQuote,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    GeneralHtmlSupport,
    Heading,
    HorizontalLine,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    Paragraph,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Underline,
    Undo,
  ],
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "code",
      "|",
      "link",
      "blockQuote",
      "codeBlock",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "|",
      "insertTable",
      "horizontalLine",
    ],
    shouldNotGroupWhenFull: false,
  },
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
      { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
      { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties",
    ],
  },
  codeBlock: {
    languages: [
      { language: "plaintext", label: "Plain text" },
      { language: "javascript", label: "JavaScript" },
      { language: "python", label: "Python" },
      { language: "bash", label: "Bash" },
      { language: "sql", label: "SQL" },
    ],
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: "https://",
  },
  htmlSupport: {
    allow: [{ name: /.*/, attributes: true, classes: true, styles: true }],
  },
  licenseKey: "GPL",
};

/**
 * JobDescriptionEditor
 *
 * Controlled CKEditor 5 component styled to match the JobForm dark UI.
 *
 * Props:
 *   value    {string}   — current HTML string (controlled)
 *   onChange {function} — called with new HTML string on every change
 */
const JobDescriptionEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  // Inject scoped CSS to theme the CKEditor toolbar/body to match
  // the existing dark panel bg (#0d1f25 / #11212a) and teal accent (#21b8b2).
  useEffect(() => {
    const styleId = "jde-ckeditor-theme";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      /* ── Toolbar ── */
      .jde-wrapper .ck.ck-toolbar {
        background: #11212a !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-bottom: none !important;
        border-radius: 1.5rem 1.5rem 0 0 !important;
        padding: 6px 8px !important;
      }
      .jde-wrapper .ck.ck-toolbar .ck-toolbar__separator {
        background: rgba(255,255,255,0.12) !important;
      }

      /* ── Toolbar buttons ── */
      .jde-wrapper .ck.ck-button,
      .jde-wrapper .ck.ck-button.ck-on {
        color: rgba(255,255,255,0.75) !important;
        border-radius: 0.5rem !important;
        background: transparent !important;
        border: none !important;
        transition: background 0.15s, color 0.15s;
      }
      .jde-wrapper .ck.ck-button:hover:not(:disabled),
      .jde-wrapper .ck.ck-button.ck-on:hover:not(:disabled) {
        background: rgba(33,184,178,0.15) !important;
        color: #21b8b2 !important;
      }
      .jde-wrapper .ck.ck-button.ck-on {
        background: rgba(33,184,178,0.20) !important;
        color: #21b8b2 !important;
      }
      .jde-wrapper .ck.ck-button svg {
        fill: currentColor !important;
      }

      /* ── Dropdowns ── */
      .jde-wrapper .ck.ck-dropdown__panel,
      .jde-wrapper .ck.ck-list {
        background: #0d1f25 !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-radius: 0.75rem !important;
        overflow: hidden;
      }
      .jde-wrapper .ck.ck-list__item .ck-button {
        color: rgba(255,255,255,0.80) !important;
      }
      .jde-wrapper .ck.ck-list__item .ck-button:hover {
        background: rgba(33,184,178,0.15) !important;
        color: #21b8b2 !important;
      }
      .jde-wrapper .ck.ck-list__item .ck-button.ck-on {
        background: rgba(33,184,178,0.25) !important;
        color: #21b8b2 !important;
      }

      /* ── Editable area ── */
      .jde-wrapper .ck.ck-editor__editable {
        background: #11212a !important;
        color: rgba(255,255,255,0.90) !important;
        border: 1px solid rgba(255,255,255,0.10) !important;
        border-top: none !important;
        border-radius: 0 0 1.5rem 1.5rem !important;
        min-height: 200px;
        padding: 1rem 1.25rem !important;
        font-size: 0.9375rem;
        line-height: 1.75;
        caret-color: #21b8b2;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .jde-wrapper .ck.ck-editor__editable:focus,
      .jde-wrapper .ck.ck-editor__editable.ck-focused {
        border-color: #21b8b2 !important;
        box-shadow: 0 0 0 2px rgba(33,184,178,0.18) !important;
        outline: none !important;
      }

      /* ── Content typography inside editor ── */
      .jde-wrapper .ck-content h1,
      .jde-wrapper .ck-content h2,
      .jde-wrapper .ck-content h3 {
        color: #fff !important;
        font-weight: 700;
        margin: 1rem 0 0.4rem;
      }
      .jde-wrapper .ck-content h1 { font-size: 1.5rem; }
      .jde-wrapper .ck-content h2 { font-size: 1.25rem; }
      .jde-wrapper .ck-content h3 { font-size: 1.1rem; }
      .jde-wrapper .ck-content p   { margin: 0.4rem 0; }
      .jde-wrapper .ck-content ul,
      .jde-wrapper .ck-content ol  { padding-left: 1.5rem; }
      .jde-wrapper .ck-content li  { margin: 0.25rem 0; }
      .jde-wrapper .ck-content a   { color: #21b8b2; text-decoration: underline; }
      .jde-wrapper .ck-content blockquote {
        border-left: 3px solid #21b8b2;
        padding: 0.5rem 1rem;
        color: rgba(255,255,255,0.6);
        margin: 0.75rem 0;
        background: rgba(33,184,178,0.06);
        border-radius: 0 0.5rem 0.5rem 0;
      }
      .jde-wrapper .ck-content code {
        background: rgba(255,255,255,0.08);
        border-radius: 4px;
        padding: 1px 5px;
        font-family: monospace;
        color: #21b8b2;
      }
      .jde-wrapper .ck-content pre {
        background: rgba(0,0,0,0.35) !important;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 0.75rem;
        padding: 1rem;
      }
      .jde-wrapper .ck-content table {
        border-collapse: collapse;
        width: 100%;
        margin: 0.75rem 0;
      }
      .jde-wrapper .ck-content td,
      .jde-wrapper .ck-content th {
        border: 1px solid rgba(255,255,255,0.12) !important;
        padding: 0.4rem 0.75rem;
      }
      .jde-wrapper .ck-content th {
        background: rgba(33,184,178,0.12) !important;
        color: #fff;
      }

      /* ── Balloon / tooltip ── */
      .ck.ck-balloon-panel {
        background: #0d1f25 !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
        border-radius: 0.75rem !important;
        color: rgba(255,255,255,0.85) !important;
      }

      /* ── Scrollbar ── */
      .jde-wrapper .ck.ck-editor__editable::-webkit-scrollbar { width: 5px; }
      .jde-wrapper .ck.ck-editor__editable::-webkit-scrollbar-track { background: transparent; }
      .jde-wrapper .ck.ck-editor__editable::-webkit-scrollbar-thumb {
        background: rgba(33,184,178,0.35);
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);

  if (error) {
    return (
      <div className="mt-2 rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        Editor failed to load. Please refresh the page.
        <span className="ml-2 opacity-60 text-xs">{error}</span>
      </div>
    );
  }

  return (
    <div className="jde-wrapper relative">
      {!isReady && (
        <div className="mt-2 flex h-[220px] items-center justify-center rounded-3xl border border-white/10 bg-[#11212a]">
          <span className="text-sm text-white/40 animate-pulse">
            Loading editor…
          </span>
        </div>
      )}

      <div className={isReady ? "block" : "invisible absolute inset-0 h-0 overflow-hidden"}>
        <CKEditor
          editor={ClassicEditor}
          config={EDITOR_CONFIG}
          data={value || ""}
          onReady={(editor) => {
            editorRef.current = editor;
            setIsReady(true);
          }}
          onChange={(_, editor) => {
            const html = editor.getData();
            onChange(html);
          }}
          onError={(err) => {
            console.error("CKEditor error:", err);
            setError(err?.message || "Unknown error");
          }}
        />
      </div>
    </div>
  );
};

export default JobDescriptionEditor;
