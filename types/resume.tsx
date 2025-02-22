export interface Personal {
    name: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  }
  
  export interface Experience {
    job_title: string;
    company: string;
    start_date: string;
    end_date: string | null;
    job_type: string;
    responsibilities: string[];
  }
  
  export interface Education {
    degree: string;
    institution: string;
    graduation_date: string;
    location: string;
  }

  export interface Projects {
    title:string
    tech_stack:string[]
    features:string[]
    duration:string 
  }
  
  export interface Skills {
    languages: string[];
    frameworks: string[];
    developer_tools: string[];
    libraries: string[];
  }
  
  export interface Resume {
    personal_section: Personal;
    experience_section: Experience[] | [];
    education_section: Education | null
    skills_section: Skills;
    projects_section:Projects[]
  }