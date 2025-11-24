import MinimalistTemplate from "./MinimalistTemplate";
import DocumentTemplate from "./DocumentTemplate";
import MemoTemplate from "./MemoTemplate";
import QuoteTemplate from "./QuoteTemplate";
import BookExcerptTemplate from "./BookExcerptTemplate";
import BentoTemplate from "./BentoTemplate";
import DarkDayTemplate from "./DarkDayTemplate";
import FrameTemplate from "./FrameTemplate";
import HandwrittenTemplate from "./HandwrittenTemplate";
import VerticalTemplate from "./VerticalTemplate";
import GradientTemplate from "./GradientTemplate";
import ElegantDarkTemplate from "./ElegantDarkTemplate";
import CodeTemplate from "./CodeTemplate";
import StoryTemplate from "./StoryTemplate";
import CyberpunkTemplate from "./CyberpunkTemplate";
import BoldTypographyTemplate from "./BoldTypographyTemplate";
import SocialPostTemplate from "./SocialPostTemplate";
import TechDocTemplate from "./TechDocTemplate";
import FeatureCoverTemplate from "./FeatureCoverTemplate";
import NeonGlowTemplate from "./NeonGlowTemplate";
import HighlightMemoTemplate from "./HighlightMemoTemplate";
import ZenDarkTemplate from "./ZenDarkTemplate";
import SoftPastelTemplate from "./SoftPastelTemplate";
import SpaceDayTemplate from "./SpaceDayTemplate";
import AcademicClassicTemplate from "./AcademicClassicTemplate";
import BlueNoteTemplate from "./BlueNoteTemplate";
import { LiteratureNoteTemplate } from "./LiteratureNoteTemplate";
import { HandwrittenPaperTemplate } from "./HandwrittenPaperTemplate";
import { BoldMotivationTemplate } from "./BoldMotivationTemplate";
import { PolaroidClassicTemplate } from "./PolaroidClassicTemplate";
import { NatureMorningTemplate } from "./NatureMorningTemplate";
import { MobileNoteTemplate } from "./MobileNoteTemplate";

export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {
    minimalist: MinimalistTemplate,
    document: DocumentTemplate,
    memo: MemoTemplate,
    quote: QuoteTemplate,
    "book-excerpt": BookExcerptTemplate,
    bento: BentoTemplate,
    "dark-day": DarkDayTemplate,
    frame: FrameTemplate,
    handwritten: HandwrittenTemplate,
    vertical: VerticalTemplate,
    gradient: GradientTemplate,
    "elegant-dark": ElegantDarkTemplate,
    code: CodeTemplate,
    story: StoryTemplate,
    cyberpunk: CyberpunkTemplate,
    "bold-typography": BoldTypographyTemplate,
    "social-post": SocialPostTemplate,
    "tech-doc": TechDocTemplate,
    "feature-cover": FeatureCoverTemplate,
    "neon-glow": NeonGlowTemplate,
    "highlight-memo": HighlightMemoTemplate,
    "zen-dark": ZenDarkTemplate,
    "soft-pastel": SoftPastelTemplate,
    "space-day": SpaceDayTemplate,
    "academic-classic": AcademicClassicTemplate,
    "blue-note": BlueNoteTemplate,
    "literature-note": LiteratureNoteTemplate,
    "handwritten-paper": HandwrittenPaperTemplate,
    "bold-motivation": BoldMotivationTemplate,
    "polaroid-classic": PolaroidClassicTemplate,
    "nature-morning": NatureMorningTemplate,
    "mobile-note": MobileNoteTemplate,
};
