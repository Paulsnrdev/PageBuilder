import type { SpacerContent } from "@/lib/blocks/schema";

const heightRem = {
  sm: "1rem",
  md: "2.5rem",
  lg: "5rem",
  xl: "8rem",
};

export function Spacer({ content }: { content: SpacerContent }) {
  return <div style={{ height: heightRem[content.height] }} />;
}
