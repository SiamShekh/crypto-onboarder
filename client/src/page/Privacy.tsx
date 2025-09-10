const Privacy = () => {
    return (
        <div className="text-white px-6 md:px-16 py-12 max-w-5xl mx-auto font-sans leading-relaxed">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy — WhyBuy</h1>

            <p className="mb-6">
                At WhyBuy, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights.
            </p>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Basic Information:</strong> Such as your wallet address, referral code, or email (if you choose to provide it).</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with the platform (completed tasks, referral counts, leaderboard activity).</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, and device information (collected automatically by servers/logs).</li>
                </ul>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Operate and improve the WhyBuy platform.</li>
                    <li>Track referrals, waitlist positions, and rewards.</li>
                    <li>Prevent fraud, spam, or abuse of the platform.</li>
                    <li>Communicate important updates about WhyBuy.</li>
                </ul>
                <p className="mt-2">We do not sell your personal data to third parties.</p>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Data from Projects</h2>
                <p>If you interact with project listings (e.g., completing tasks for rewards):</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Project teams may receive your public wallet address or social handle (if required for distribution of rewards).</li>
                    <li>WhyBuy is not responsible for how project teams use that information.</li>
                </ul>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Cookies & Tracking</h2>
                <p>WhyBuy may use basic cookies or analytics tools to understand site traffic and improve user experience.</p>
                <p className="mt-2">You can disable cookies in your browser settings, but some features may not work properly.</p>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Security</h2>
                <p>We use reasonable technical and organizational measures to protect your information. However, no system is 100% secure.</p>
                <p className="mt-2">You are responsible for keeping your wallet credentials and referral codes safe.</p>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
                <p>WhyBuy may contain links to external websites (e.g., X/Twitter, Telegram, project websites). We are not responsible for the privacy practices of those sites.</p>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Children’s Privacy</h2>
                <p>WhyBuy is not intended for individuals under the age of 18. We do not knowingly collect information from minors.</p>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Your Rights</h2>
                <p>Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Access the information we store about you.</li>
                    <li>Request deletion of your data.</li>
                    <li>Opt out of communications.</li>
                </ul>
                <p className="mt-2">To exercise these rights, contact us at <a href="mailto:help@whybuy.fun" className="text-blue-400 hover:underline">help@whybuy.fun</a>.</p>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. Updated versions will be posted on this page.</p>
            </section>

            <hr className="border-gray-700 my-6" />

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please reach us at: <a href="mailto:help@whybuy.fun" className="text-blue-400 hover:underline">help@whybuy.fun</a></p>
            </section>
        </div>
    );
};

export default Privacy;
