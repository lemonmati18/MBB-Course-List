import { useState } from "react";

const courses = {
  "Year 1": [
    { code: "CHEM 121", name: "General Chemistry and Laboratory I", credits: 4 },
    { code: "CHEM 122", name: "General Chemistry II", credits: 2 },
    { code: "CHEM 126", name: "General Chemistry Laboratory II", credits: 2 },
    { code: "MATH 152", name: "Calculus II", credits: 3 },
    { code: "BISC 101", name: "General Biology", credits: 4 },
    { code: "BISC 102", name: "General Biology", credits: 4 },
    { code: "MATH 150", name: "Calculus I with Review", credits: 4, electiveGroup: "Calculus" },
    { code: "MATH 151", name: "Calculus I", credits: 3, electiveGroup: "Calculus" },
  ],
  "Year 2": [
    { code: "CHEM 210", name: "Introduction to Analytical Chemistry", credits: 2 },
    { code: "CHEM 216", name: "Introduction to Analytical Chemistry Laboratory", credits: 2 },
    { code: "CHEM 260", name: "Atoms, Molecules, Spectroscopy", credits: 4 },
    { code: "BISC 202", name: "Genetics", credits: 3 },
    { code: "MBB 222", name: "Molecular Biology and Biochemistry", credits: 3 },
    { code: "MBB 231", name: "Cellular Biology and Biochemistry", credits: 3 },
    { code: "STAT 201", name: "Statistics for the Life Sciences", credits: 3, electiveGroup: "Statistics" },
    { code: "STAT 270", name: "Introduction to Probability and Statistics", credits: 3, electiveGroup: "Statistics" },
  ],
  "Year 3": [
    { code: "CHEM 316", name: "Introductory Instrumental Analysis", credits: 4 },
    { code: "CHEM 332", name: "The Chemistry of Transition Metals", credits: 3 },
    { code: "CHEM 380", name: "Chemical and Instrumental Methods of Identification of Organic Compounds", credits: 4 },
    { code: "MBB 309W", name: "Biochemistry Laboratory", credits: 4 },
  ],
  "Year 4": [
    { code: "MBB 321", name: "Intermediary Metabolism", credits: 3 },
    { code: "MBB 331", name: "Molecular Biology", credits: 4 },
    { code: "CHEM 360", name: "Thermodynamics and Chemical Kinetics", credits: 3, electiveGroup: "Advanced Chemistry" },
    { code: "MBB 323", name: "Introduction to Physical Biochemistry", credits: 3, electiveGroup: "Advanced Chemistry" },
  ],
};

export default function NotionChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [selectedElectives, setSelectedElectives] = useState<Record<string, string | null>>({});

  const toggleCheck = (code: string, electiveGroup?: string) => {
    if (electiveGroup) {
      setSelectedElectives(prev => ({
        ...prev,
        [electiveGroup]: prev[electiveGroup] === code ? null : code
      }));
    } else {
      setChecked(prev => ({
        ...prev,
        [code]: !prev[code]
      }));
    }
  };

  return (
    <div className="p-4 space-y-4">
      {Object.entries(courses).map(([year, subjects]) => (
        <div key={year} className="p-4 border rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">{year}</h2>
          {subjects.map(({ code, name, credits, electiveGroup }) => (
            <div key={code} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-medium">
                  {code} - {name} ({credits} credits) 
                  {electiveGroup && " (Choose one)"}
                </p>
              </div>
              <input
                type="checkbox"
                checked={electiveGroup 
                  ? selectedElectives[electiveGroup] === code 
                  : checked[code] ?? false}
                onChange={() => toggleCheck(code, electiveGroup)}
                className="w-5 h-5"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
