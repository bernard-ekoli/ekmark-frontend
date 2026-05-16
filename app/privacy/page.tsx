export default function PrivacyPolicy() {
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
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Your privacy matters to us. This policy explains what information we collect, how we use it, and your rights regarding your data.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-10">

                    <Section title="1. Who We Are">
                        <p>
                            Ekmark is a free image watermarking tool owned and operated by Bernard Edet Ekoli.
                            If you have any questions about this Privacy Policy, you can contact us at{" "}
                            <a href="mailto:bernardedetekoli@gmail.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition">
                                bernardedetekoli@gmail.com
                            </a>.
                        </p>
                    </Section>

                    <Section title="2. What Information We Collect">
                        <p className="mb-4">We collect minimal information and only what is necessary:</p>
                        <ul className="space-y-3">
                            <Li><strong>Email address</strong> — When you join our waitlist, we collect your email address solely to notify you when Ekmark launches.</Li>
                            <Li><strong>Images you upload</strong> — Images you upload for watermarking are processed entirely in your browser. They are <strong>never sent to our servers</strong> and are never stored.</Li>
                            <Li><strong>Basic usage data</strong> — We may collect anonymous usage data (such as page visits) to understand how our site is used. This data cannot be used to identify you personally.</Li>
                        </ul>
                    </Section>

                    <Section title="3. How We Use Your Information">
                        <p className="mb-4">We use the information we collect for the following purposes:</p>
                        <ul className="space-y-3">
                            <Li>To send you a one-time notification when Ekmark officially launches.</Li>
                            <Li>To send you early access information if you signed up before launch.</Li>
                            <Li>We will <strong>never</strong> sell, rent, or share your email address with third parties.</Li>
                            <Li>We will <strong>never</strong> send you unsolicited marketing or spam.</Li>
                        </ul>
                    </Section>

                    <Section title="4. Where Your Data Is Stored">
                        <p>
                            Waitlist email addresses are securely stored in{" "}
                            <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:opacity-70 transition">
                                Google Firebase Firestore
                            </a>
                            , a cloud database service provided by Google LLC. Firebase is compliant with GDPR and other major data protection regulations. You can read Google's privacy policy at{" "}
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:opacity-70 transition">
                                policies.google.com/privacy
                            </a>.
                        </p>
                    </Section>

                    <Section title="5. Your Rights">
                        <p className="mb-4">
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>
                        <ul className="space-y-3">
                            <Li><strong>Right to access</strong> — You can request a copy of the data we hold about you.</Li>
                            <Li><strong>Right to deletion</strong> — You can request that we delete your email address from our waitlist at any time.</Li>
                            <Li><strong>Right to withdraw consent</strong> — You can opt out of our waitlist at any time by contacting us.</Li>
                        </ul>
                        <p className="mt-4">
                            To exercise any of these rights, email us at{" "}
                            <a href="mailto:bernardedetekoli@gmail.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition">
                                bernardedetekoli@gmail.com
                            </a>{" "}
                            and we will respond within 7 business days.
                        </p>
                    </Section>

                    <Section title="6. Cookies">
                        <p>
                            Ekmark does not use cookies for tracking or advertising. We may use essential cookies required for the website to function correctly (such as session cookies). No third-party advertising or tracking cookies are used.
                        </p>
                    </Section>

                    <Section title="7. Children's Privacy">
                        <p>
                            Ekmark is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with their information, please contact us and we will delete it immediately.
                        </p>
                    </Section>

                    <Section title="8. Changes to This Policy">
                        <p>
                            We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of our service after any changes constitutes your acceptance of the updated policy.
                        </p>
                    </Section>

                    <Section title="9. Contact Us">
                        <p>
                            If you have any questions or concerns about this Privacy Policy or your data, please contact us at:{" "}
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