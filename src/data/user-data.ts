import seng from '@/assets/seng.png';
import pmp from '@/assets/pmp.png';
import sg from '@/assets/sg.png';

export const userInfo = {
    "name": "Thien Zhi KHOO",
    "contact": {
      "phone": "+852 44924712",
      "email": "tzkhoo@connect.ust.hk",
      "linkedin": "https://www.linkedin.com/in/thienzhi/",
      "CV": "/cv"
    },
    "summary_1": "Coding the future. Consulting and tech.",
    "summary_2": "\" The rearview mirrow is for glancing, not for staring. \"",
    "education": [
      {
        "university": "The Hong Kong University of Science and Technology",
        "degree": "Bachelors of Engineering",
        "major": "Computer Engineering",
        "graduation_date": "Sep 2022 - June 2026",
        "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Hong_Kong_University_of_Science_and_Technology_Logo.svg/1200px-Hong_Kong_University_of_Science_and_Technology_Logo.svg.png"
      },
      {
        "university": "Technical University of Denmark",
        "degree": "Exchange Program",
        "major": "Computer Science",
        "graduation_date": "Aug 2024 - Dec 2024",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Danmarks_Tekniske_Universitet_%28logo%29.svg"
      }
    ],
    "work_experience": [
      {
        "company": "Bindo Labs - Wonder",
        "role": "Data Engineering Analyst",
        "period": "Jun 2025 – Present",
        "responsibilities": [
          "AI Agent: Developed a WhatsApp AI agent utilizing RAG to deliver accurate agentic workflows and enhance user engagement.",
          "Chatbot: Created a chatbot for website and email inquiries, automating customer support and improving response times.",
          "Sales Leads: Generated business leads in multiple HK industries by leveraging Google Cloud APIs for automated data extraction and outreach ",
        ]
      },
      {
        "company": "Qualifly Education Limited",
        "role": "Business Development Analyst",
        "period": "Jun 2024 – Aug 2024",
        "responsibilities": [
          "Conduct market research and analysis for HK edtech industry, facilitated strategic proposals for market expansion into Asia, and generating business leads through B2B and B2C marketing",
        ]
      }],

    "co_curricular_activities": [
      {
        "title": "Head Student Ambassador",
        "role": "School of Engineering",
        "period": "June 2023 – June 2026",
        "description": "Chief student representative managing public relations and outreach initiatives for prospective students, parents, internal and external high profile figures.",
        "link": "https://seng.hkust.edu.hk/about/student-ambassadors/8702",
        "image": seng
      },
      {
        "title": "Engineering Peer Mentor",
        "role": "Mentor",
        "period": "Jan 2023 – Feb 2026",
        "description": "Building a community for engineering students and supporting them in navigating academics and social challenges in university life",
        "link": "https://seng.hkust.edu.hk/about/our-People/peer-mentors",
        "image": pmp
      },
      {
        "title": "HKUST Spark Global",
        "role": "Senior Leader",
        "period": "Sep 2023 – Present",
        "description": "Active organizer of university events hosting over 1000 students that promotes the culture, places and diversity of Hong Kong.",
        "link": "https://studyabroad.hkust.edu.hk/hkustsparkglobal",
        "image": sg
      }
    ],
    "certifications_achievements": [
      {
        "title": "AS Watson Scholarship",
        "issuer": "AS Watson",
        "date": "2025",
        "details": "Awared to ten students across HKUST for their academic excellence and leadership potential."
      },
      {
        "title": "HKIE Scholarship 2023/2024",
        "issuer": "Hong Kong Institution of Engineers",
        "date": "Dec 2023",
        "details": "Awarded to only three students annually; renewable scholarship of 20,000 HKD per year for up to 4 years."
      },
      {
        "title": "AWS Certified Cloud Practitioner",
        "issuer": "Amazon Web Services",
        "date": "Sep 2023",
        "details": "Validated knowledge of AWS services, security, networking, databases, and best architectural practices."
      },
      {
        "title": "Accenture Data Analytics and Visualization Virtual Experience",
        "issuer": "Accenture",
        "date": "Jan 2023"
      },
      {
        "title": "Dean's List & Full Tuition Scholarship",
        "issuer": "HKUST",
        "period": "2022 – 2026",
        "details": "Consistently on Dean's List; awarded full tuition scholarship for duration of degree."
      }
    ],
    "skills": {
      "programming": ["Python", "C++", "Java", "HTML", "Kotlin", "Tailwind"],
      "data_analysis_visualization": ["Python", "SQL", "Metabase", "Excel"],
      "tools_services": ["n8n", "MongoDB", "Vercel", "Google Cloud", "Render", "AWS"],
      "business_design": ["Powerpoint", "Figma", "Capcut", "Canva", "Photoshop"]
    },
    "languages": ["English (Native)", "Mandarin (Fluent)", "Cantonese (Conversational)", "Malay (Conversational)"],
    "resume_path": "/ThienZhi_CV.pdf",
    "email_template": {
        "subject_template": "Application for {job_title} position at {company}",
        "body_template": "Dear Hiring Manager,\n\nI am writing to express my interest in the {job_title} position at {company}. I am a {education.degree} student in {education.major} at {education.university}, expected to graduate in {education.graduation_date}.\n\nI believe my experience and skills make me a strong candidate for this role. [Add personalized content based on the job description]\n\nAttached, please find my resume for your consideration. I look forward to the opportunity to discuss how my background aligns with your needs.\n\nThank you for your time and consideration.\n\nSincerely,\n{name}\n{email}\n{phone}"
    }
} 
