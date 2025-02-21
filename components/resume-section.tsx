"use client"

import { Key, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Resume, Experience, Skills } from "@/types/resume"

export default function ResumeForm({resume, setResume}:{resume:any, setResume:any}) {

    const handleInputChange = (section: keyof Resume, field: string, value: string) => {
        setResume((prev: { [x: string]: any }) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        }))
      }
    
      const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
        setResume((prev: { experience: any[] }) => ({
          ...prev,
          experience: prev.experience.map((exp: any, i: number) => (i === index ? { ...exp, [field]: value } : exp)),
        }))
      }
    
      const handleResponsibilityChange = (index: number, value: string) => {
        setResume((prev: { experience: any[] }) => ({
          ...prev,
          experience: prev.experience.map((exp: any, i: number) =>
            i === index ? { ...exp, responsibilities: value.split("\n") } : exp,
          ),
        }))
      }
    
      const handleSkillsChange = (category: keyof Skills, value: string) => {
        setResume((prev: { skills: any }) => ({
          ...prev,
          skills: {
            ...prev.skills,
            [category]: value.split(",").map((skill) => skill.trim()),
          },
        }))
      }

  return (
    <div className="container mx-auto p-4 space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={resume.personal.name}
              onChange={(e) => handleInputChange("personal", "name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={resume.personal.email}
              onChange={(e) => handleInputChange("personal", "email", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={resume.personal.phone}
              onChange={(e) => handleInputChange("personal", "phone", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              type="url"
              value={resume.personal.github}
              onChange={(e) => handleInputChange("personal", "github", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              value={resume.personal.linkedin}
              onChange={(e) => handleInputChange("personal", "linkedin", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>

    {resume.experience.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {resume.experience.map((exp, index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`job-title-${index}`}>Job Title</Label>
                  <Input
                    id={`job-title-${index}`}
                    value={exp.job_title}
                    onChange={(e) => handleExperienceChange(index, "job_title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                  <Input
                    id={`start-date-${index}`}
                    type="month"
                    value={exp.start_date}
                    onChange={(e) => handleExperienceChange(index, "start_date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`end-date-${index}`}>End Date</Label>
                  <Input
                    id={`end-date-${index}`}
                    type="month"
                    value={exp.end_date || ""}
                    onChange={(e) => handleExperienceChange(index, "end_date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`job-type-${index}`}>Job Type</Label>
                  <Input
                    id={`job-type-${index}`}
                    value={exp.job_type}
                    onChange={(e) => handleExperienceChange(index, "job_type", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`responsibilities-${index}`}>Responsibilities</Label>
                <Textarea
                  id={`responsibilities-${index}`}
                  value={exp.responsibilities.join("\n")}
                  onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  rows={7}
                />
              </div>
              {index < resume.experience.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    )}

    {resume.education && (
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={resume.education.degree}
                onChange={(e) => handleInputChange("education", "degree", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={resume.education.institution}
                onChange={(e) => handleInputChange("education", "institution", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="graduation-date">Graduation Date</Label>
              <Input
                id="graduation-date"
                type="month"
                value={resume.education.graduation_date}
                onChange={(e) => handleInputChange("education", "graduation_date", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={resume.education.location}
                onChange={(e) => handleInputChange("education", "location", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )}

    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(resume.skills).map(([category, skills]) => (
          <div key={category}>
            <Label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</Label>
            <Input
              id={category}
              value={skills.join(", ")}
              onChange={(e) => handleSkillsChange(category as keyof Skills, e.target.value)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
)
}
