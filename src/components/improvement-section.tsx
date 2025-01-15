import { improvements } from "@/lib/improvements";
import { BadgeGroup } from "@/components/ui/badge-group";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = Array.from(new Set(improvements.map((imp) => imp.category)));
const priorities = Array.from(new Set(improvements.map((imp) => imp.priority)));

const priorityColors = {
  high: "text-red-500 dark:text-red-400",
  medium: "text-yellow-500 dark:text-yellow-400",
  low: "text-green-500 dark:text-green-400",
};

export function ImprovementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const filteredImprovements = useMemo(() => {
    return improvements.filter((imp) => {
      const categoryMatch =
        selectedCategory === "all" || imp.category === selectedCategory;
      const priorityMatch =
        selectedPriority === "all" || imp.priority === selectedPriority;
      return categoryMatch && priorityMatch;
    });
  }, [selectedCategory, selectedPriority]);

  return (
    <section className="w-full py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          Planned improvements
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Filter by category:
            </p>
            <BadgeGroup
              items={["all", ...categories]}
              selectedItem={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Filter by priority:
            </p>
            <BadgeGroup
              items={["all", ...priorities]}
              selectedItem={selectedPriority}
              onSelect={setSelectedPriority}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredImprovements.map((improvement) => (
            <motion.div
              key={improvement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{improvement.title}</h3>
                <Badge variant="outline" className="capitalize">
                  {improvement.category}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                {improvement.description}
              </p>
              <p
                className={`text-sm font-medium ${
                  priorityColors[improvement.priority]
                }`}
              >
                Priority:{" "}
                <span className="capitalize">{improvement.priority}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
