import type { AiTool } from "@/lib/ai-tools";

type ToolLogoProps = {
  tool: Pick<AiTool, "name" | "categorySlug">;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-11 w-11 rounded-2xl text-sm",
  md: "h-14 w-14 rounded-2xl text-base",
  lg: "h-20 w-20 rounded-3xl text-xl"
};

const categoryStyles: Record<string, string> = {
  "ai-chatbots": "from-[#3157D5] to-[#12B76A]",
  "ai-coding": "from-[#101828] to-[#3157D5]",
  "ai-website-builders": "from-[#3157D5] to-[#7C9BFF]",
  "ai-automation": "from-[#12B76A] to-[#3157D5]",
  "ai-design": "from-[#3157D5] to-[#B46CFF]",
  "ai-video": "from-[#101828] to-[#12B76A]",
  "ai-audio": "from-[#475467] to-[#3157D5]",
  "ai-marketing": "from-[#3157D5] to-[#00A86B]",
  "ai-business": "from-[#101828] to-[#475467]",
  "ai-productivity": "from-[#12B76A] to-[#84CAFF]"
};

export function ToolLogo({ tool, size = "md" }: ToolLogoProps) {
  const initials = tool.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br ${categoryStyles[tool.categorySlug] ?? categoryStyles["ai-business"]} font-bold text-white shadow-sm ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  );
}
