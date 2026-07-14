import type { AiTool } from "@/lib/ai-tools";
import Image from "next/image";

type ToolLogoProps = {
  tool: Pick<AiTool, "logo" | "logoAlt" | "name">;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-11 w-11 rounded-2xl p-2",
  md: "h-16 w-16 rounded-2xl p-3",
  lg: "h-20 w-20 rounded-3xl p-4"
};

export function ToolLogo({ tool, size = "md" }: ToolLogoProps) {
  return (
    <div className={`flex shrink-0 items-center justify-center border border-border bg-white shadow-sm ${sizeClasses[size]}`}>
      <Image
        alt={tool.logoAlt || `${tool.name} logo`}
        className="h-full w-full object-contain"
        height={64}
        src={tool.logo}
        width={64}
      />
    </div>
  );
}
