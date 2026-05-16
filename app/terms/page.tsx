export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Nav */}
            <nav className="border-b border-border/50 px-4 sm:px-6 lg:px-8 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2 font-bold text-lg">
                        <div className="flex items-center gap-2">
                            <img src="/ekmark-logo.png" alt="Ekmark" className="h-20 max-w-full w-auto" />
                        </div>
                    </a>
                    <a
                        href="/"
                        className="text-sm text-muted-foreground hover:text-foreground transition"
                    >
                        ← Back to Home
                    </a>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-sm text-muted-foreground mb-3">Last updated: May 16, 2026</p>
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        By using Ekmark, you agree to these terms. Please read them carefully — they are written in plain English.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-10">

                    <Section title="1. Acceptance of Terms">
                        <p>
                            By accessing or using Ekmark ("the Service"), you agree to be bound by these Terms of Service.
                            If you do not agree, please do not use the Service. These terms apply to all visitors,
                            waitlist subscribers, and users of the Service.
                        </p>
                    </Section>

                    <Section title="2. About Ekmark">
                        <p>
                            Ekmark is a free image watermarking tool owned and operated by Bernard Edet Ekoli.
                            The Service allows users to upload images and apply custom text watermarks, entirely
                            within their browser. Ekmark also provides a public API for developers to integrate
                            watermarking into their own applications.
                        </p>
                    </Section>

                    <Section title="3. Use of the Service">
                        <p className="mb-4">You agree to use Ekmark only for lawful purposes. You must not use the Service to:</p>
                        <ul className="space-y-3">
                            <Li>Upload, process, or distribute images that are illegal, harmful, obscene, or infringe on the rights of others.</Li>
                            <Li>Violate any applicable local, national, or international law or regulation.</Li>
                            <Li>Attempt to reverse engineer, hack, overload, or disrupt the Service or its infrastructure.</Li>
                            <Li>Use the API in a way that abuses rate limits or degrades performance for other users.</Li>
                            <Li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</Li>
                        </ul>
                        <p className="mt-4">
                            We reserve the right to suspend or terminate access for any user who violates these terms.
                        </p>
                    </Section>

                    <Section title="4. Your Images & Content">
                        <p className="mb-4">
                            Images you upload to Ekmark are processed entirely within your browser and are
                            <strong> never sent to or stored on our servers</strong>. You retain full ownership
                            of all images and content you process using the Service.
                        </p>
                        <p>
                            By using the Service, you confirm that you own or have the necessary rights to
                            the images you upload, and that processing them through Ekmark does not violate
                            any third-party rights.
                        </p>
                    </Section>

                    <Section title="5. API Usage">
                        <p className="mb-4">
                            Ekmark offers a free public API at <span className="font-mono text-sm bg-border/30 px-1.5 py-0.5 rounded">api.ekmark.dev</span>.
                            By using the API, you agree to the following:
                        </p>
                        <ul className="space-y-3">
                            <Li>You will not use the API to build a competing watermarking service that resells Ekmark's infrastructure.</Li>
                            <Li>You will respect rate limits as documented. Abuse of rate limits may result in your access being revoked.</Li>
                            <Li>The API is provided free of charge and may be subject to change, including rate limit adjustments, with reasonable notice.</Li>
                        </ul>
                    </Section>

                    <Section title="6. Waitlist">
                        <p>
                            By joining the Ekmark waitlist, you consent to receiving a one-time launch notification
                            email and early access information. You can request removal from the waitlist at any
                            time by contacting us at{" "}
                            <a href="mailto:bernardedetekoli@gmail.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition">
                                bernardedetekoli@gmail.com
                            </a>.
                        </p>
                    </Section>

                    <Section title="7. Intellectual Property">
                        <p>
                            The Ekmark name, logo, website design, and all related materials are the intellectual
                            property of Bernard Edet Ekoli. You may not copy, reproduce, or redistribute any part
                            of the Service without prior written permission. Your own images and content remain
                            entirely your property.
                        </p>
                    </Section>

                    <Section title="8. Disclaimer of Warranties">
                        <p>
                            Ekmark is provided <strong>"as is"</strong> and <strong>"as available"</strong> without
                            warranties of any kind, either express or implied. We do not guarantee that the Service
                            will be uninterrupted, error-free, or meet your specific requirements. Use of the Service
                            is at your own risk.
                        </p>
                    </Section>

                    <Section title="9. Limitation of Liability">
                        <p>
                            To the fullest extent permitted by law, Bernard Edet Ekoli shall not be liable for
                            any indirect, incidental, special, or consequential damages arising from your use of
                            or inability to use the Service, even if advised of the possibility of such damages.
                            Our total liability to you shall not exceed the amount you paid to use the Service
                            (which, given the Service is free, is zero).
                        </p>
                    </Section>

                    <Section title="10. Changes to These Terms">
                        <p>
                            We may update these Terms of Service from time to time. When we do, we will update
                            the "Last updated" date at the top of this page. Continued use of the Service after
                            changes are posted constitutes your acceptance of the revised terms. We encourage
                            you to review this page periodically.
                        </p>
                    </Section>

                    <Section title="11. Governing Law">
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of the
                            Federal Republic of Nigeria. Any disputes arising under these Terms shall be subject
                            to the exclusive jurisdiction of the courts of Nigeria.
                        </p>
                    </Section>

                    <Section title="12. Contact Us">
                        <p>
                            If you have any questions about these Terms of Service, please contact us at:{" "}
                            <a href="mailto:bernardedetekoli@gmail.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition font-medium">
                                bernardedetekoli@gmail.com
                            </a>
                        </p>
                    </Section>

                </div>

                {/* Footer note */}
                <div className="mt-16 pt-8 border-t border-border/50 text-sm text-muted-foreground">
                    © 2026 Ekmark. All rights reserved.
                </div>
            </div>
        </main>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border border-border/50 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
            <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
        </div>
    )
}

function Li({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex gap-3">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/40 shrink-0" />
            <span>{children}</span>
        </li>
    )
}