import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Resume } from "@/types/resume";
import ResumeForm from "./resume-section";


interface ResumePreviewProps {
    showResume: boolean;
    showPreview: boolean;
    setShowPreview: (value: boolean) => void;
    resume: Resume;
    setResume: React.Dispatch<React.SetStateAction<Resume>>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
    showResume,
    showPreview,
    setShowPreview,
    resume,
    setResume,
}) => {
    const resumeRef = useRef<HTMLDivElement>(null);

    const generatePDF = async () => {
        const element = resumeRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: "letter",
        });

        const imgWidth = 8.5;
        const pageHeight = 11;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save("resume.pdf");
    };

    return (
        <>
            {showResume && (
                <motion.div
                    className="w-2/3 h-dvh bg-muted overflow-y-scroll"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="sticky top-0 z-10 bg-muted p-4 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Resume</h2>
                        <Button onClick={() => setShowPreview(!showPreview)} className="">
                            {showPreview ? "Edit" : "Preview"}
                        </Button>
                    </div>
                    <AnimatePresence mode="wait">
                        {showPreview ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, rotateY: -180 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: 180 }}
                                transition={{ duration: 0.5 }}
                                className=""
                            >
                                <div className=" rounded shadow">
                                    <div
                                        ref={resumeRef}
                                        style={{
                                            width: "8.5in",
                                            fontFamily: "Arial, sans-serif",
                                            fontSize: "11pt",
                                            padding: "0.5in",
                                        }}
                                    >
                                        {/* Personal Section */}
                                        <h1
                                            style={{
                                                textAlign: "center",
                                                fontSize: "24pt",
                                                fontVariant: "small-caps",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {resume.personal_section?.name || "Unknown Name"}
                                        </h1>
                                        <div
                                            style={{
                                                textAlign: "center",
                                                fontSize: "10pt",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            {resume.personal_section?.phone || ""} |{" "}
                                            <a href={`mailto:${resume.personal_section?.email || ""}`}>
                                                {resume.personal_section?.email || ""}
                                            </a>{" "}
                                            |{" "}
                                            <a href={resume.personal_section?.linkedin || ""}>
                                                linkedin.com/in/RajuGangitla
                                            </a>{" "}
                                            | <a href={resume.personal_section?.github || ""}>
                                                github.com/RajuGangitla
                                            </a>
                                        </div>

                                        {/* Technical .skills_section */}
                                        <div style={{ marginBottom: "15px" }}>
                                            <h2
                                                style={{
                                                    fontSize: "14pt",
                                                    fontVariant: "small-caps",
                                                    borderBottom: "1px solid black",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                Technical Skills
                                            </h2>
                                            <ul style={{ listStyleType: "none", paddingLeft: "15px" }}>
                                                {Object.entries(resume.skills_section || {}).map(
                                                    ([category, items]) =>
                                                        items.length > 0 && (
                                                            <li key={category}>
                                                                <b>
                                                                    {(category.charAt(0).toUpperCase() +
                                                                        category.slice(1)) as string}
                                                                    :
                                                                </b>{" "}
                                                                {items.join(", ")}
                                                            </li>
                                                        )
                                                )}
                                            </ul>
                                        </div>

                                        {/* Experience */}
                                        <div style={{ marginBottom: "15px" }}>
                                            <h2
                                                style={{
                                                    fontSize: "14pt",
                                                    fontVariant: "small-caps",
                                                    borderBottom: "1px solid black",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                Experience
                                            </h2>
                                            {(resume.experience_section || []).map((exp, index) => (
                                                <div key={index} style={{ marginBottom: "10px" }}>
                                                    <b>{exp.job_title || "Unknown Title"}</b>,{" "}
                                                    {exp.company || "Unknown Company"}
                                                    <div
                                                        style={{
                                                            fontStyle: "italic",
                                                            fontSize: "9pt",
                                                            marginLeft: "20px",
                                                        }}
                                                    >
                                                        {(exp.start_date || "Unknown") +
                                                            " – " +
                                                            (exp.end_date || "Present")}{" "}
                                                        | {exp.job_type || "Not Specified"}
                                                    </div>
                                                    <ul
                                                        style={{
                                                            listStyleType: "disc",
                                                            paddingLeft: "40px",
                                                            fontSize: "10pt",
                                                        }}
                                                    >
                                                        {(exp.responsibilities || []).map((resp, i) => (
                                                            <li key={i}>{resp}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Education (Object) */}
                                        <div style={{ marginBottom: "15px" }}>
                                            <h2
                                                style={{
                                                    fontSize: "14pt",
                                                    fontVariant: "small-caps",
                                                    borderBottom: "1px solid black",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                Education
                                            </h2>
                                            {resume.education_section && (
                                                <div style={{ marginBottom: "10px" }}>
                                                    <b>
                                                        {resume.education_section.institution ||
                                                            "Unknown Institution"}
                                                    </b>
                                                    , {resume.education_section.location || ""}
                                                    <div
                                                        style={{
                                                            fontStyle: "italic",
                                                            fontSize: "9pt",
                                                            marginLeft: "20px",
                                                        }}
                                                    >
                                                        {resume.education_section.degree || "Unknown Degree"},{" "}
                                                        {resume.education_section.graduation_date || "Unknown Date"}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Projects */}
                                        <div style={{ marginBottom: "15px" }}>
                                            <h2
                                                style={{
                                                    fontSize: "14pt",
                                                    fontVariant: "small-caps",
                                                    borderBottom: "1px solid black",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                Projects
                                            </h2>
                                            {resume.projects_section?.[0]?.title && (
                                                <div>
                                                    <b>{resume.projects_section[0].title}</b> |{" "}
                                                    <i>{(resume.projects_section[0].tech_stack || []).join(", ")}</i>
                                                    <ul
                                                        style={{
                                                            listStyleType: "disc",
                                                            paddingLeft: "40px",
                                                            fontSize: "10pt",
                                                        }}
                                                    >
                                                        {(resume.projects_section[0].features || []).map(
                                                            (feature, i) => (
                                                                <li key={i}>{feature}</li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={generatePDF}
                                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
                                    >
                                        Download PDF
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, rotateY: -180 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -180 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ResumeForm resume={resume} setResume={setResume} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </>
    );
};

export default ResumePreview;