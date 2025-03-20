import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@shared/utils/globals.util";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium",
              activeTab === index
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-4"
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Tabs;
