import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function TemplatesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0a0a0a]">
            <Navbar />
            <main className="flex-grow pt-24 pb-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
                        精选模板
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        选择一款心仪的模板，开始创作您的卡片
                    </p>
                </div>
                <TemplateGallery />
            </main>
            <Footer />
        </div>
    );
}