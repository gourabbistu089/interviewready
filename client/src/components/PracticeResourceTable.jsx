import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionModule from "./QuestionModule";

const PracticeResourceTable = ({ filteredResources }) => {
  const [expandedTopics, setExpandedTopics] = useState(
    filteredResources[0] ? { [filteredResources[0]._id]: true } : {}
  );
  // const [completedQuestions, setCompletedQuestions] = useState([]);
  console.log("Expanded Topics:", expandedTopics);

  console.log(
    "Filter Resources in practice resource table:",
    filteredResources
  );

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="divide-y divide-gray-100">
            {filteredResources.map((topic, index) => (
              <QuestionModule
                key={topic._id}
                topicIndex={index}
                topicId={topic._id}
                topic={topic}
                expandedTopics={expandedTopics}
                setExpandedTopics={setExpandedTopics}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PracticeResourceTable;
