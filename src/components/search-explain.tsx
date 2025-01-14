import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchExplain({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="!p-0 cursor-default hover:cursor-default h-5 w-5"
            >
              <InfoIcon className="h-5 w-5 text-gray-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs bg-black/70 text-white">
            <p>
              This is a friends search tool.
              <br /> Search anything related to friends.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
