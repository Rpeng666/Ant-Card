"use client";

import { DEFAULT_TEMPLATES } from "@/config";
import { TEMPLATE_COMPONENTS } from "@/components/card-preview/registry";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function TemplateGallery() {
    const router = useRouter();
    const locale = useLocale();

    const handleSelect = (id: string) => {
        router.push(`/${locale}/app/card-editor?template=${id}`);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 max-w-[1800px] mx-auto">
            {DEFAULT_TEMPLATES.map((template) => {
                const Component = TEMPLATE_COMPONENTS[template.id];
                if (!Component) return null;

                const { defaultForm, defaultSwitchConfig, defaultStyle } = template;

                return (
                    <div key={template.id} className="group cursor-pointer flex flex-col items-center" onClick={() => handleSelect(template.id)}>
                        <div className="relative overflow-hidden rounded-xl aspect-[3/4] w-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                            <div className="scale-[0.55] sm:scale-[0.6] md:scale-[0.65] origin-center pointer-events-none select-none shadow-xl rounded-[20px]">
                                <div style={{ width: '400px', height: '600px' }}>
                                    <Component
                                        date={defaultForm.date}
                                        title={defaultForm.title}
                                        content={defaultForm.content}
                                        author={defaultForm.author}
                                        icon={defaultForm.icon}
                                        qrCode={defaultForm.qrCode}
                                        qrCodeTitle={defaultForm.qrCodeTitle}
                                        qrCodeText={defaultForm.qrCodeText}
                                        pagination={defaultForm.pagination}
                                        showIcon={defaultSwitchConfig.showIcon}
                                        showDate={defaultSwitchConfig.showDate}
                                        showTitle={defaultSwitchConfig.showTitle}
                                        showContent={defaultSwitchConfig.showContent}
                                        showAuthor={defaultSwitchConfig.showAuthor}
                                        showQRCode={defaultSwitchConfig.showQRCode}
                                        showPageNum={defaultSwitchConfig.showPageNum}
                                        data={defaultForm}
                                        style={defaultStyle}
                                        config={defaultSwitchConfig}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 text-center w-full px-2">
                            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 truncate">{template.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{template.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
