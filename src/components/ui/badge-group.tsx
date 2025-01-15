import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeGroupProps {
  items: string[];
  selectedItem: string;
  onSelect: (item: string) => void;
}

export function BadgeGroup({ items, selectedItem, onSelect }: BadgeGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge
          key={item}
          variant={selectedItem === item ? "default" : "outline"}
          className={cn(
            "cursor-pointer capitalize hover:bg-primary/90",
            selectedItem === item ? "bg-primary" : "hover:bg-primary/10"
          )}
          onClick={() => onSelect(item)}
        >
          {item}
        </Badge>
      ))}
    </div>
  );
}
