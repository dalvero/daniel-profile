export default function Footer() {
    const socialLinks = [
        {
            label: "GitHub",
            href: "#",
            icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            ),
        },
        {
            label: "Instagram",
            href: "#",
            icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            ),
        },
        {
            label: "LinkedIn",
            href: "#",
            icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
            </svg>
            ),
        },
        {
            label: "Notion",
            href: "#",
            icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
            </svg>
            ),
        },
    ];

    return (
        <footer id="footer" className="flex flex-col md:flex-row min-h-screen w-full">

            {/* Left Section */}
            <div className="w-full md:w-1/2 bg-black text-white p-10 md:p-16 flex flex-col justify-between">
                {/* Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                    <div>
                        <h4 className="font-normal uppercase tracking-[6] mb-8 text-2xl">About</h4>
                        <ul className="space-y-4 text-gray-500 text-[13px] font-medium">
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">About Me</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">My Journey</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">Projects</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-normal uppercase tracking-[6] mb-8 text-2xl">Work</h4>
                        <ul className="space-y-4 text-gray-500 text-[13px] font-medium">
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">Web Projects</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">Java Projects</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">IoT Projects</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">UI Experiment</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-normal uppercase tracking-[6] mb-8 text-2xl">Learning</h4>
                        <ul className="space-y-4 text-gray-500 text-[13px] font-medium">
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">Notes</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">Tools I Use</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">Tech Stack</a></li>
                            <li><a href="#" className="hover:text-white font-[family-name:var(--font-inter)] transition">Inspiration</a></li>
                        </ul>
                    </div>
                </div>

                {/* Search & Socials */}
                <div className="mt-20 flex flex-col space-y-10">
                    <div className="w-full h-[1px] bg-gray-900" />

                    <div className="flex space-x-3">
                        {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            aria-label={social.label}
                            className="p-3 bg-[#1a1a1a] rounded-full text-gray-400 hover:bg-white hover:text-black transition"
                        >
                            {social.icon}
                        </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Legal */}
                <div className="mt-16 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-[family-name:var(--font-inter)] uppercase tracking-[0.15em] text-gray-600 font-bold">
                    <p>© 2026 Daniel Jefry Alfero</p>
                    <a href="#" className="hover:text-white transition">Privacy</a>
                    <a href="#" className="hover:text-white transition">Terms</a>
                    <a href="#" className="hover:text-white transition">Built with Next.js</a>
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="w-full md:w-1/2 bg-[#f4f5f7] flex items-center justify-center p-10 md:p-16">
                <div className="max-w-[640px] w-full text-center">
                    <h2 className="text-[26px] md:text-[28px] font-normal leading-[1.2] uppercase tracking-[2] text-black mb-10">
                        Interested in working together? <br /> I’m open to internship opportunities, collaborations, <br /> and real-world projects where I can grow and contribute.
                    </h2>

                <div className="space-y-4">
                    <button className="w-full bg-[#007cc2] text-white py-4 text-3xl cursor-pointer font-normal uppercase tracking-[5] hover:bg-blue-800 transition shadow-md">
                    Let’s Talk
                    </button>
                </div>
                </div>
            </div>
        </footer>
    );
}