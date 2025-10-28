import { TemplateConfig } from "@/types/template";

export const templateConfigs: Record<string, TemplateConfig> = {
  default: {
    sectionTitle: {
      styles: {
        fontSize: 18,
      },
    },
  },
  transparent: {
    sectionTitle: {
      className: "backdrop-blur-sm",
      styles: {
        fontSize: 18,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "8px 16px",
        borderRadius: "8px",
      },
    },
  },
  quote: {
    sectionTitle: {
      className: "font-bold italic border-l-4 pl-4",
      styles: {
        fontSize: 20,
        borderLeftColor: "var(--theme-color)",
        backgroundColor: "rgba(217, 119, 6, 0.1)",
        padding: "12px 16px",
      },
    },
  },
  "book-excerpt": {
    sectionTitle: {
      className: "font-serif border-b-2 pb-2 mb-4",
      styles: {
        fontSize: 19,
        borderBottomColor: "var(--theme-color)",
        fontStyle: "italic",
      },
    },
  },
  memo: {
    sectionTitle: {
      className: "bg-green-100 rounded-md px-3 py-2 shadow-sm",
      styles: {
        fontSize: 17,
        backgroundColor: "var(--theme-color)",
        opacity: 0.1,
        color: "var(--theme-color)",
        fontWeight: "600",
      },
    },
  },
  bento: {
    sectionTitle: {
      className: "rounded-lg p-3 text-center",
      styles: {
        fontSize: 16,
        backgroundColor: "var(--theme-color)",
        color: "#ffffff",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
    },
  },
  "dark-day": {
    sectionTitle: {
      className: "text-yellow-400 border-b border-yellow-400/30 pb-2",
      styles: {
        fontSize: 19,
        color: "var(--theme-color)",
        borderBottomColor: "var(--theme-color)",
        opacity: 0.7,
        fontWeight: "500",
      },
    },
  },
  frame: {
    sectionTitle: {
      className: "border-2 border-dashed p-3 text-center font-bold relative",
      styles: {
        fontSize: 18,
        borderColor: "var(--theme-color)",
        borderWidth: "2px",
        borderStyle: "dashed",
        padding: "12px",
        fontWeight: "700",
        position: "relative",
        borderRadius: "4px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(2px)",
      },
    },
  },
  minimal: {
    sectionTitle: {
      className: "font-light tracking-wide",
      styles: {
        fontSize: 20,
        fontWeight: "300",
        letterSpacing: "0.1em",
        marginBottom: "24px",
      },
    },
  },
  story: {
    sectionTitle: {
      className: "relative pl-6 border-l-4 border-teal-600",
      styles: {
        fontSize: 18,
        borderLeftColor: "var(--theme-color)",
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        paddingLeft: "24px",
        position: "relative",
      },
    },
  },
  handwritten: {
    sectionTitle: {
      className: "font-cursive text-pink-700 underline decoration-wavy",
      styles: {
        fontSize: 19,
        color: "var(--theme-color)",
        textDecorationLine: "underline",
        textDecorationStyle: "wavy",
        fontFamily: "cursive",
      },
    },
  },
  code: {
    sectionTitle: {
      className: "font-mono bg-slate-100 px-3 py-2 rounded border-l-4 border-blue-500",
      styles: {
        fontSize: 16,
        fontFamily: "monospace",
        backgroundColor: "#f1f5f9",
        borderLeftColor: "var(--theme-color)",
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        padding: "8px 12px",
      },
    },
  },
  image: {
    sectionTitle: {
      className: "bg-gradient-to-r from-orange-100 to-amber-100 p-3 rounded-lg shadow-sm",
      styles: {
        fontSize: 18,
        background: "linear-gradient(to right, #fed7aa, #fef3c7)",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      },
    },
  },
};
