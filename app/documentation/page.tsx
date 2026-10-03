"use client"
import React, { useState, useEffect, type ReactNode } from "react";
import { Copy, Check, Menu, X, AlertTriangle } from "lucide-react";

interface NavItem {
    id: string;
    label: string;
}

const NAV: NavItem[] = [
    { id: "overview", label: "Overview" },
    { id: "health", label: "GET /watermark" },
    { id: "watermark", label: "POST /watermark" },
    { id: "response", label: "Response shape" },
    { id: "errors", label: "Errors" },
    { id: "limits", label: "Limits & behavior" },
];

interface CodeBlockProps {
    code: string;
    lang?: string;
}

function CodeBlock({ code, lang = "bash" }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    return (
        <div className="codeblock">
            <div className="codeblock-bar">
                <span>{lang}</span>
                <button onClick={copy} className="copy-btn">
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "copied" : "copy"}
                </button>
            </div>
            <pre><code>{code}</code></pre>
        </div>
    );
}

interface MethodProps {
    type: "GET" | "POST";
}

function Method({ type }: MethodProps) {
    return <span className={`method method-${type.toLowerCase()}`}>{type}</span>;
}

interface SectionProps {
    id: string;
    title: string;
    eyebrow?: string;
    children: ReactNode;
}

function Section({ id, title, eyebrow, children }: SectionProps) {
    return (
        <section id={id} className="section">
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h2>{title}</h2>
            {children}
        </section>
    );
}

export default function EkmarkApiDocs() {
    const [active, setActive] = useState<string>("overview");
    const [navOpen, setNavOpen] = useState<boolean>(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: "-15% 0px -70% 0px" }
        );

        NAV.forEach((n) => {
            const el = document.getElementById(n.id);
            if (el) obs.observe(el);
        });

        return () => obs.disconnect();
    }, []);

    const goTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        setNavOpen(false);
    };

    return (
        <div className="docs-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .docs-root {
          --bg: #0F1115;
          --surface: #161923;
          --surface-2: #1D212C;
          --border: #2A2F3D;
          --ink: #E3B23C;
          --ink-dim: #8A6C2A;
          --post: #5EEAD4;
          --get: #7DA6FF;
          --text: #E7E9EE;
          --muted: #8B93A7;
          --err: #F17B7B;
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          position: relative;
          display: flex;
        }

        .docs-root * { box-sizing: border-box; }

        .docs-root h1,
        .docs-root h2,
        .docs-root h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        code,
        pre,
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* ---------- sidebar ---------- */

        .sidebar {
          width: 250px;
          flex-shrink: 0;
          border-right: 1px solid var(--border);
          background: var(--surface);
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          padding: 24px 18px;
        }

        .brand {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 4px;
        }

        .brand-mark {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: var(--ink);
        }

        .brand-sub {
          font-size: 11px;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
        }

        .sidebar-tagline {
          font-size: 12px;
          color: var(--muted);
          margin: 6px 0 26px;
          line-height: 1.5;
        }

        .nav-group-label {
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin: 22px 0 8px;
          padding-left: 10px;
        }

        .nav-item {
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          color: var(--muted);
          font-size: 13.5px;
          padding: 7px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-family: 'JetBrains Mono', monospace;
          transition: background 0.15s, color 0.15s;
          border-left: 2px solid transparent;
        }

        .nav-item:hover {
          color: var(--text);
          background: var(--surface-2);
        }

        .nav-item.active {
          color: var(--ink);
          background: var(--surface-2);
          border-left: 2px solid var(--ink);
        }

        /* ---------- main ---------- */

        .main {
          flex: 1;
          min-width: 0;
          max-width: 860px;
          padding: 56px 48px 120px;
        }

        .hero {
          position: relative;
          padding: 34px 30px;
          margin-bottom: 48px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          overflow: hidden;
        }

        .hero-watermark {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          transform: rotate(-14deg) scale(1.3);
          opacity: 0.05;
          pointer-events: none;
          user-select: none;
        }

        .hero-watermark span {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 22px;
          white-space: nowrap;
          padding: 14px;
          color: var(--ink);
        }

        .hero h1 {
          position: relative;
          font-size: 30px;
          margin: 0 0 10px;
        }

        .hero p {
          position: relative;
          color: var(--muted);
          font-size: 14.5px;
          max-width: 54ch;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .base-url {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 8px 12px;
          font-size: 12.5px;
        }

        .base-url .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ADE80;
        }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--ink-dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .section {
          margin-bottom: 54px;
          scroll-margin-top: 24px;
        }

        .section h2 {
          font-size: 21px;
          margin: 0 0 14px;
        }

        .section p {
          color: var(--muted);
          font-size: 14.5px;
          line-height: 1.7;
          margin: 0 0 14px;
        }

        .section p code,
        .section li code,
        .section td code {
          background: var(--surface-2);
          border: 1px solid var(--border);
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 12.5px;
          color: var(--ink);
        }

        .method {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: 5px;
          margin-right: 10px;
        }

        .method-get {
          background: rgba(125,166,255,0.12);
          color: var(--get);
          border: 1px solid rgba(125,166,255,0.3);
        }

        .method-post {
          background: rgba(94,234,212,0.1);
          color: var(--post);
          border: 1px solid rgba(94,234,212,0.3);
        }

        .route-title {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
        }

        .route-path {
          font-family: 'JetBrains Mono', monospace;
          font-size: 15px;
          color: var(--text);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin: 4px 0 18px;
          font-size: 13px;
        }

        th,
        td {
          text-align: left;
          padding: 9px 12px;
          border-bottom: 1px solid var(--border);
        }

        th {
          color: var(--muted);
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        td {
          color: var(--text);
        }

        td.dim {
          color: var(--muted);
        }

        td .req {
          color: var(--err);
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
        }

        td .opt {
          color: var(--muted);
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
        }

        .codeblock {
          background: #0B0D12;
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          margin: 6px 0 20px;
        }

        .codeblock-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 12px;
          border-bottom: 1px solid var(--border);
          background: var(--surface);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--muted);
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          cursor: pointer;
        }

        .copy-btn:hover {
          color: var(--ink);
        }

        .codeblock pre {
          margin: 0;
          padding: 16px;
          overflow-x: auto;
          font-size: 12.5px;
          line-height: 1.65;
          color: #D8DCE6;
        }

        .callout {
          display: flex;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1px solid rgba(241,123,123,0.3);
          background: rgba(241,123,123,0.06);
          font-size: 13px;
          color: #F3B8B8;
          margin: 4px 0 20px;
          line-height: 1.55;
        }

        .callout svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--err);
        }

        .todo-list {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 13px;
        }

        .todo-list li {
          padding: 7px 0;
          border-bottom: 1px solid var(--border);
          color: var(--muted);
          display: flex;
          gap: 9px;
        }

        .todo-list li:last-child {
          border-bottom: none;
        }

        .todo-list li::before {
          content: '';
          width: 13px;
          height: 13px;
          border: 1px solid var(--muted);
          border-radius: 3px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .mobile-bar {
          display: none;
          position: sticky;
          top: 0;
          z-index: 20;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 14px 18px;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-bar button {
          background: none;
          border: none;
          color: var(--text);
        }

        @media (max-width: 860px) {
          .sidebar {
            position: fixed;
            z-index: 30;
            left: 0;
            top: 0;
            transform: translateX(-100%);
            transition: transform 0.2s ease;
            box-shadow: 20px 0 40px rgba(0,0,0,0.4);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .mobile-bar {
            display: flex;
          }

          .main {
            padding: 28px 20px 100px;
            max-width: 100%;
          }

          .hero h1 {
            font-size: 24px;
          }
        }
      `}</style>

            {/* Sidebar */}
            <aside className={`sidebar ${navOpen ? "open" : ""}`}>
                <div className="brand">
                    <span className="brand-mark">Ekmark</span>
                    <span className="brand-sub">/ api docs</span>
                </div>

                <p className="sidebar-tagline">
                    Bulk image watermarking API — send images, get watermarked PNGs back.
                </p>

                <div className="nav-group-label">Guide</div>

                {NAV.slice(0, 2).map((n) => (
                    <button
                        key={n.id}
                        className={`nav-item ${active === n.id ? "active" : ""}`}
                        onClick={() => goTo(n.id)}
                    >
                        {n.label}
                    </button>
                ))}

                <div className="nav-group-label">Endpoints</div>

                {NAV.slice(2, 4).map((n) => (
                    <button
                        key={n.id}
                        className={`nav-item ${active === n.id ? "active" : ""}`}
                        onClick={() => goTo(n.id)}
                    >
                        {n.label}
                    </button>
                ))}

                <div className="nav-group-label">Reference</div>

                {NAV.slice(4).map((n) => (
                    <button
                        key={n.id}
                        className={`nav-item ${active === n.id ? "active" : ""}`}
                        onClick={() => goTo(n.id)}
                    >
                        {n.label}
                    </button>
                ))}
            </aside>

            {/* Main */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mobile-bar">
                    <span className="brand-mark" style={{ fontSize: 15 }}>
                        Ekmark docs
                    </span>

                    <button onClick={() => setNavOpen(!navOpen)}>
                        {navOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <main className="main">
                    <div className="hero">
                        <div className="hero-watermark">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <span key={i}>EKMARK</span>
                            ))}
                        </div>

                        <h1>Watermarking API</h1>

                        <p>
                            A single endpoint for stamping a text watermark onto up to 10 images
                            at once. Send multipart form-data in, get base64 PNGs back — no polling,
                            no webhooks.
                        </p>

                        <div className="base-url">
                            <span className="dot" />
                            <span className="mono">
                                https://api.ekmark.ekolix.com.ng/api/watermark
                            </span>
                        </div>
                    </div>

                    <Section id="overview" title="Overview" eyebrow="Guide">
                        <p>
                            This API takes one or more image files plus watermark settings, and returns
                            each image with the text stamped at the requested position. It's built on{" "}
                            <code>sharp</code> for image compositing — watermark text is rendered to an SVG
                            overlay, then composited onto the source image server-side.
                        </p>

                        <p>
                            There's exactly one route, used for both a health check (<code>GET</code>) and the
                            actual watermarking work (<code>POST</code>). The production endpoint is{" "}
                            <code>https://api.ekmark.ekolix.com.ng/api/watermark</code>.
                        </p>
                    </Section>
                    <Section id="health" title="Health check">
                        <div className="route-title">
                            <Method type="GET" />
                            <span className="route-path">/api/watermark</span>
                        </div>

                        <p>
                            Confirms the watermarking service is reachable. No parameters are required.
                        </p>

                        <CodeBlock
                            lang="curl"
                            code={`curl https://api.ekmark.ekolix.com.ng/api/watermark`}
                        />

                        <CodeBlock
                            lang="200 response"
                            code={`{
  "success": true,
  "message": "Ekmark watermarking backend is reachable"
}`}
                        />
                    </Section>

                    <Section id="watermark" title="Watermark images">
                        <div className="route-title">
                            <Method type="POST" />
                            <span className="route-path">/api/watermark</span>
                        </div>

                        <p>
                            Accepts <code>multipart/form-data</code>. Applies <code>text</code> as a watermark
                            to every file in <code>images</code>, using <code>fontSize</code> and <code>position</code>,
                            and returns all results as PNG data URLs in one response.
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Type</th>
                                    <th>Required</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td><code>images</code></td>
                                    <td className="dim">file[]</td>
                                    <td>
                                        <span className="req">required</span>
                                    </td>
                                    <td className="dim">
                                        Up to 10 files; each must be 2 MiB or smaller. Field name must be{" "}
                                        <code>images</code>. The backend accepts image MIME types Sharp can decode.
                                    </td>
                                </tr>

                                <tr>
                                    <td><code>text</code></td>
                                    <td className="dim">string</td>
                                    <td>
                                        <span className="req">required</span>
                                    </td>
                                    <td className="dim">
                                        Required non-empty text, maximum 60 characters
                                    </td>
                                </tr>

                                <tr>
                                    <td><code>fontSize</code></td>
                                    <td className="dim">string / number</td>
                                    <td>
                                        <span className="req">required</span>
                                    </td>
                                    <td className="dim">
                                        Number from 10 to 120, e.g. <code>"24"</code>. Scaled for image width and
                                        reduced if needed so the watermark fits the image.
                                    </td>
                                </tr>

                                <tr>
                                    <td><code>position</code></td>
                                    <td className="dim">string</td>
                                    <td>
                                        <span className="req">required</span>
                                    </td>
                                    <td className="dim">
                                        One of <code>top-left</code>, <code>top-center</code>, <code>top-right</code>,
                                        <code> left</code>, <code>center</code>, <code>right</code>,
                                        <code> bottom-left</code>, <code>bottom-center</code>, or <code>bottom-right</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <CodeBlock
                            lang="curl"
                            code={`curl -X POST https://api.ekmark.ekolix.com.ng/api/watermark \\
  -F "images=@photo1.jpg" \\
  -F "images=@photo2.jpg" \\
  -F "text=© Ekmark 2026" \\
  -F "fontSize=24" \\
  -F "position=bottom-right"`}
                        />

                        <CodeBlock
                            lang="javascript"
                            code={`const form = new FormData();

form.append("images", file1);
form.append("images", file2);
form.append("text", "© Ekmark 2026");
form.append("fontSize", "24");
form.append("position", "bottom-right");

const res = await fetch("https://api.ekmark.ekolix.com.ng/api/watermark", {
  method: "POST",
  body: form,
});

const data = await res.json();
if (!res.ok) throw new Error(data.message || "Watermark request failed");`}
                        />
                    </Section>

                    <Section id="response" title="Response shape">
                        <p>
                            Returns an array of watermarked images, in the same order the files were uploaded.
                        </p>

                        <CodeBlock
                            lang="200 response"
                            code={`{
  "images": [
    {
      "id": "b3f1c2a0-6e3d-4c1a-9c2e-4f6a1e2d3b4c",
      "name": "photo1.png",
      "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}`}
                        />

                        <table>
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Description</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td><code>id</code></td>
                                    <td className="dim">
                                        Randomly generated UUID for the result item
                                    </td>
                                </tr>

                                <tr>
                                    <td><code>name</code></td>
                                    <td className="dim">
                                        Original filename, extension replaced with <code>.png</code>
                                    </td>
                                </tr>

                                <tr>
                                    <td><code>url</code></td>
                                    <td className="dim">
                                        Base64 PNG as a data URI — drop straight into an{" "}
                                        <code>&lt;img src&gt;</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <p>
                            All output is converted to PNG regardless of input format. Placement follows the
                            requested position. Font size scales with image width and is reduced as needed so
                            the watermark fits within both image dimensions.
                        </p>
                    </Section>

                    <Section id="errors" title="Errors">
                        <p>
                            Errors use a JSON response with <code>success: false</code> and a <code>message</code>.
                            Invalid request fields and upload problems return a client error; unexpected image
                            processing failures return a generic server error while details are logged server-side.
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Condition</th>
                                    <th>Message</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td><code>400</code></td>
                                    <td className="dim">
                                        Blank or missing <code>text</code>
                                    </td>
                                    <td>Watermark text is required</td>
                                </tr>

                                <tr>
                                    <td><code>400</code></td>
                                    <td className="dim">No images uploaded</td>
                                    <td>At least one image is required</td>
                                </tr>

                                <tr>
                                    <td><code>400</code></td>
                                    <td className="dim"><code>fontSize</code> is invalid or out of range</td>
                                    <td>Font size must be a number / between 10 and 120</td>
                                </tr>

                                <tr>
                                    <td><code>400</code></td>
                                    <td className="dim">Text exceeds 60 characters or position is unsupported</td>
                                    <td>Validation message describing the invalid field</td>
                                </tr>

                                <tr>
                                    <td><code>400</code></td>
                                    <td className="dim">Unsupported MIME type or too many files</td>
                                    <td>Only images are allowed / Too many files</td>
                                </tr>

                                <tr>
                                    <td><code>413</code></td>
                                    <td className="dim">An uploaded file exceeds 2 MiB</td>
                                    <td>File too large</td>
                                </tr>

                                <tr>
                                    <td><code>500</code></td>
                                    <td className="dim">Unreadable image or other processing failure</td>
                                    <td>An unexpected server error occurred</td>
                                </tr>
                            </tbody>
                        </table>

                        <CodeBlock
                            lang="example error body"
                            code={`{
  "success": false,
  "message": "Watermark text must be at most 60 characters"
}`}
                        />
                    </Section>

                    <Section id="limits" title="Limits & behavior notes">
                        <ul className="todo-list">
                            <li>
                                Up to 10 images per request, with a maximum file size of 2 MiB per image
                            </li>

                            <li>
                                Watermark text is required and limited to 60 characters
                            </li>

                            <li>
                                Font size must be between 10 and 120; it scales with image width and is reduced to fit both dimensions
                            </li>

                            <li>
                                Positions: top-left, top-center, top-right, left, center, right, bottom-left, bottom-center, bottom-right
                            </li>

                            <li>
                                Output is PNG as base64 data URLs; uploads and output are held in memory and not persisted
                            </li>

                            <li>
                                Images in a batch are processed concurrently
                            </li>
                        </ul>

                        <div className="callout">
                            <AlertTriangle size={15} />

                            <span>
                                Current deployment settings: CORS allows any origin, and the API has no authentication
                                or active rate limiting. Protect the service before relying on restricted access
                                or high-volume public traffic.
                            </span>
                        </div>
                    </Section>
                </main>
            </div>
        </div>
    );
}