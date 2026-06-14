'use client'

import { useState, useRef, useCallback } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'

type Position =
    | 'top-left' | 'top-center' | 'top-right'
    | 'center'
    | 'bottom-left' | 'bottom-center' | 'bottom-right'

interface ImageFile {
    id: string
    file: File
    preview: string
}

interface ProcessedImage {
    id: string
    name: string
    url: string
}

interface WatermarkConfig {
    text: string
    fontSize: number
    position: Position
}

const POSITIONS: { value: Position; label: string; short: string }[] = [
    { value: 'top-left', label: 'Top Left', short: 'TL' },
    { value: 'top-center', label: 'Top Center', short: 'TC' },
    { value: 'top-right', label: 'Top Right', short: 'TR' },
    { value: 'center', label: 'Center', short: 'C' },
    { value: 'bottom-left', label: 'Bottom Left', short: 'BL' },
    { value: 'bottom-center', label: 'Bottom Center', short: 'BC' },
    { value: 'bottom-right', label: 'Bottom Right', short: 'BR' },
]

const MAX_FILES = 10
const STEPS = ['Upload', 'Configure', 'Download'] as const

export default function WatermarkPage() {
    const [step, setStep] = useState<0 | 1 | 2>(0)
    const [images, setImages] = useState<ImageFile[]>([])
    const [config, setConfig] = useState<WatermarkConfig>({
        text: '',
        fontSize: 32,
        position: 'bottom-right',
    })
    const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // ─── File handling ────────────────────────────────────────────────────────

    function addFiles(files: FileList | File[]) {
        const arr = Array.from(files)
        const valid = arr.filter(f => f.type.startsWith('image/'))
        const remaining = MAX_FILES - images.length
        const toAdd = valid.slice(0, remaining)
        const mapped: ImageFile[] = toAdd.map(f => ({
            id: crypto.randomUUID(),
            file: f,
            preview: URL.createObjectURL(f),
        }))
        setImages(prev => [...prev, ...mapped])
        setError('')
    }

    function removeImage(id: string) {
        setImages(prev => {
            const removed = prev.find(i => i.id === id)
            if (removed) URL.revokeObjectURL(removed.preview)
            return prev.filter(i => i.id !== id)
        })
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(false)
        addFiles(e.dataTransfer.files)
    }, [images])

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(true)
    }

    const handleDragLeave = () => setDragActive(false)

    // ─── Step navigation ──────────────────────────────────────────────────────

    function goToConfig() {
        if (images.length === 0) {
            setError('Please upload at least one image.')
            return
        }
        setError('')
        setStep(1)
    }

    // ─── Process images ───────────────────────────────────────────────────────

    async function processImages() {
        if (!config.text.trim()) {
            setError('Please enter watermark text.')
            return
        }
        setLoading(true)
        setError('')
        try {
            const formData = new FormData()
            images.forEach(img => formData.append('images', img.file))
            formData.append('text', config.text)
            formData.append('fontSize', String(config.fontSize))
            formData.append('position', config.position)

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/watermark`, {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) {
                const json = await res.json().catch(() => ({}))
                throw new Error(json.message || 'Failed to process images.')
            }
            const json = await res.json()
            setProcessedImages(json.images)
            setStep(2)
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // ─── Download helpers ─────────────────────────────────────────────────────

    async function downloadAll() {
        for (const img of processedImages) {
            await downloadSingle(img)
            await new Promise(r => setTimeout(r, 300))
        }
    }

    async function downloadSingle(img: ProcessedImage) {
        const a = document.createElement('a')
        a.href = img.url
        a.download = `ekmark-${img.name}`
        a.click()
    }

    // ─── Reset ────────────────────────────────────────────────────────────────

    function reset() {
        images.forEach(i => URL.revokeObjectURL(i.preview))
        setImages([])
        setProcessedImages([])
        setConfig({ text: '', fontSize: 32, position: 'bottom-right' })
        setError('')
        setStep(0)
    }

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

                {/* ── Step indicator ── */}
                <div className="flex items-center justify-center mb-10 sm:mb-12">
                    {STEPS.map((label, i) => (
                        <div key={label} className="flex items-center">
                            <div className="flex flex-col items-center gap-1.5">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                                        ${step === i
                                            ? 'bg-primary text-primary-foreground'
                                            : step > i
                                                ? 'bg-primary/20 text-primary'
                                                : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {step > i ? '✓' : i + 1}
                                </div>
                                {/* Label: visible on sm+, hidden on xs */}
                                <span className={`hidden sm:block text-xs font-medium ${step >= i ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {label}
                                </span>
                                {/* Dot label on xs */}
                                <span className={`sm:hidden text-[10px] font-medium ${step >= i ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`w-10 sm:w-20 h-px mx-1.5 sm:mx-2 mb-5 transition-colors ${step > i ? 'bg-primary/40' : 'bg-border'}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* ── STEP 0: Upload ── */}
                {step === 0 && (
                    <div>
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                                Upload Your Images
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Up to {MAX_FILES} images at once. JPEG, PNG, WebP supported.
                            </p>
                        </div>

                        {/* Drop zone */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-colors
                                ${dragActive
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                className="hidden"
                                onChange={e => e.target.files && addFiles(e.target.files)}
                            />
                            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🖼️</div>
                            <p className="text-base sm:text-lg font-semibold text-foreground mb-1">
                                {dragActive ? 'Drop your images here' : 'Drag & drop or click to upload'}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                {images.length}/{MAX_FILES} images selected
                            </p>
                        </div>

                        {/* Image grid */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 mt-5 sm:mt-6">
                                {images.map(img => (
                                    <div
                                        key={img.id}
                                        className="relative group rounded-xl overflow-hidden border border-border aspect-square bg-muted"
                                    >
                                        <img
                                            src={img.preview}
                                            alt={img.file.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeImage(img.id) }}
                                            className="absolute top-1 right-1 w-5 h-5 sm:w-6 sm:h-6 bg-black/60 text-white rounded-full text-[10px] sm:text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 active:opacity-100"
                                        >
                                            ✕
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1">
                                            <p className="text-white text-[10px] sm:text-xs truncate">{img.file.name}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Add more slot */}
                                {images.length < MAX_FILES && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                                    >
                                        <span className="text-xl sm:text-2xl mb-0.5 sm:mb-1">+</span>
                                        <span className="text-[10px] sm:text-xs">Add more</span>
                                    </button>
                                )}
                            </div>
                        )}

                        {error && (
                            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                        )}

                        <div className="flex justify-end mt-6 sm:mt-8">
                            <button
                                onClick={goToConfig}
                                disabled={images.length === 0}
                                className="w-full sm:w-auto cursor-pointer px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Next: Configure Watermark →
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 1: Configure ── */}
                {step === 1 && (
                    <div>
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                                Configure Watermark
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Set your watermark text, size, and position.
                            </p>
                        </div>

                        <div className="bg-background border border-border/60 rounded-2xl p-5 sm:p-8 space-y-6">

                            {/* Watermark text */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    Watermark Text
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. © YourName 2026"
                                    value={config.text}
                                    onChange={e => setConfig(c => ({ ...c, text: e.target.value }))}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
                                />
                            </div>

                            {/* Font size */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    Font Size — <span className="text-primary font-bold">{config.fontSize}px</span>
                                </label>
                                <input
                                    type="range"
                                    min={12}
                                    max={120}
                                    value={config.fontSize}
                                    onChange={e => setConfig(c => ({ ...c, fontSize: Number(e.target.value) }))}
                                    className="w-full accent-primary"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>12px</span>
                                    <span>120px</span>
                                </div>
                            </div>

                            {/* Position picker — visual 3x3 grid */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3">
                                    Position
                                </label>

                                {/* Grid mirrors actual image corners */}
                                <div className="w-full max-w-[260px] sm:max-w-xs">
                                    <div
                                        className="grid grid-cols-3 gap-1.5 p-3 rounded-xl border border-border/60 bg-muted/30"
                                        style={{ aspectRatio: '16/9' }}
                                    >
                                        {POSITIONS.map(pos => (
                                            <button
                                                key={pos.value}
                                                onClick={() => setConfig(c => ({ ...c, position: pos.value }))}
                                                title={pos.label}
                                                className={`rounded-md text-[11px] sm:text-xs font-semibold transition-colors border flex items-center justify-center
                                                    ${config.position === pos.value
                                                        ? 'bg-primary text-primary-foreground border-primary'
                                                        : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                                                    }`}
                                            >
                                                {/* Show short label on xs, full on sm */}
                                                <span className="sm:hidden">{pos.short}</span>
                                                <span className="hidden sm:block">{pos.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Selected: <span className="text-foreground font-medium">
                                            {POSITIONS.find(p => p.value === config.position)?.label}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Live preview */}
                            {config.text && (
                                <div className="p-3 bg-muted/40 rounded-lg border border-border/40">
                                    <p className="text-xs text-muted-foreground mb-1">Preview text</p>
                                    <p
                                        className="text-foreground font-semibold break-all"
                                        style={{ fontSize: Math.min(config.fontSize, 28) }}
                                    >
                                        {config.text}
                                    </p>
                                </div>
                            )}
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                        )}

                        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-6 sm:mt-8">
                            <button
                                onClick={() => { setStep(0); setError('') }}
                                className="cursor-pointer px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted/50 transition text-sm sm:text-base"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={processImages}
                                disabled={loading || !config.text.trim()}
                                className="cursor-pointer px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {loading
                                    ? 'Processing...'
                                    : `Watermark ${images.length} Image${images.length > 1 ? 's' : ''} →`}
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 2: Download ── */}
                {step === 2 && (
                    <div>
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                                Your Images Are Ready
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Download individually or grab them all at once.
                            </p>
                        </div>

                        {/* Download all */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <button
                                onClick={downloadAll}
                                className="w-full sm:w-auto cursor-pointer px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg hover:shadow-xl"
                            >
                                ⬇ Download All ({processedImages.length})
                            </button>
                        </div>

                        {/* Individual downloads */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                            {processedImages.map(img => (
                                <div
                                    key={img.id}
                                    className="rounded-xl border border-border overflow-hidden bg-background"
                                >
                                    <div className="aspect-square bg-muted">
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate mb-1.5 sm:mb-2">
                                            {img.name}
                                        </p>
                                        <button
                                            onClick={() => downloadSingle(img)}
                                            className="cursor-pointer w-full py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition"
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Start over */}
                        <div className="flex justify-center mt-8 sm:mt-10">
                            <button
                                onClick={reset}
                                className="w-full sm:w-auto cursor-pointer px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted/50 transition text-sm sm:text-base"
                            >
                                ← Watermark More Images
                            </button>
                        </div>
                    </div>
                )}

            </section>

            <Footer />
        </main>
    )
}