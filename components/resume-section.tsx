"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Resume, Experience, Skills } from "@/types/resume"

export default function ResumeForm({
  resume,
  setResume,
}: {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume>>;
}) {
  const handleInputChange = (
    section: keyof Resume,
    field: string,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value ?? "", // Prevent undefined values
      },
    }));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience_section.map((exp, i) =>
        i === index ? { ...exp, [field]: value ?? "" } : exp
      ),
    }));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience_section.map((exp, i) =>
        i === index
          ? { ...exp, responsibilities: value.split("\n") ?? [] }
          : exp
      ),
    }));
  };

  const handleSkillsChange = (category: keyof Skills, value: string) => {
    setResume((prev) => ({
      ...prev,
      skills: {
        ...prev.skills_section,
        [category]: value.split(",").map((skill) => skill.trim()) ?? [],
      },
    }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(resume.personal_section ?? {}).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input
                  id={key}
                  value={value ?? ""}
                  onChange={(e) => handleInputChange("personal_section", key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      {(resume.experience_section ?? []).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {(resume.experience_section ?? []).map((exp, index) => (
              <div key={index} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(exp ?? {}).map(([key, value]) =>
                    key !== "responsibilities" ? (
                      <div key={key}>
                        <Label htmlFor={`${key}-${index}`}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Label>
                        <Input
                          id={`${key}-${index}`}
                          value={value as string ?? ""}
                          onChange={(e) =>
                            handleExperienceChange(index, key as keyof Experience, e.target.value)
                          }
                        />
                      </div>
                    ) : null
                  )}
                </div>
                <div>
                  <Label htmlFor={`responsibilities-${index}`}>Responsibilities</Label>
                  <Textarea
                    id={`responsibilities-${index}`}
                    value={exp.responsibilities?.join("\n") ?? ""}
                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                    rows={4}
                  />
                </div>
                {index < resume.experience_section.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education */}
      {resume.education_section && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(resume.education_section ?? {}).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    id={key}
                    value={value ?? ""}
                    onChange={(e) => handleInputChange("education_section", key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(resume.skills_section ?? {}).map(([category, skills]) => (
            <div key={category}>
              <Label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</Label>
              <Input
                id={category}
                value={(skills as string[])?.join(", ") ?? ""}
                onChange={(e) => handleSkillsChange(category as keyof Skills, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>


      {/* Personal Info */}
      {/* Projects */}
      {(resume.projects_section ?? []).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resume.projects_section.map((project, index) => (
              <div key={index} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(project ?? {}).map(([key, value]) => (
                    <div key={key}>
                      <Label htmlFor={`${key}-${index}`}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                      <Input
                        id={`${key}-${index}`}
                        value={Array.isArray(value) ? value.join(", ") : value ?? ""}
                        onChange={(e) =>
                          handleInputChange("projects_section", key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

