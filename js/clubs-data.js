/**
 * Department-Wise Clubs & Wings Data
 * b1t Academics - Extracurricular Activities (ECA)
 *
 * Each department entry contains the primary student club and its subsidiary wings.
 * Wings are organized focus circles (e.g. CP, Dev, AI, Robotics) with descriptions and Drive links.
 */

const clubsData = {
    "CSE": {
        "dept_code": "CSE",
        "dept_name": "Computer Science & Engineering",
        "club_name": "CSE Club",
        "club_full_name": "UITS Computer Science & Engineering Club",
        "club_drive": "https://drive.google.com/drive/folders/1lHHxqZPx6cVX4PkyE0ywuiOG5iCf0NVk?usp=drive_link",
        "icon": "fa-laptop-code",
        "description": "The flagship tech hub fostering competitive programming, software development, AI, cyber security, and robotics.",
        "wings": [
            {
                "id": "cp",
                "name": "Competitive Programming (CP) Wing",
                "short_name": "CP Wing",
                "description": "Algorithmic problem solving, weekly contest practice, data structures, and ICPC/NCPC preparation.",
                "icon": "fa-code",
                "drive_link": ""
            },
            {
                "id": "dev",
                "name": "Software & Web Development Wing",
                "short_name": "Dev Wing",
                "description": "Full-stack web architecture, mobile apps, Git workflows, hackathons, and open source collaboration.",
                "icon": "fa-globe",
                "drive_link": ""
            },
            {
                "id": "ai-ds",
                "name": "AI, ML & Data Science Wing",
                "short_name": "AI/DS Wing",
                "description": "Machine learning, neural networks, computer vision, natural language processing, and dataset research.",
                "icon": "fa-brain",
                "drive_link": ""
            },
            {
                "id": "cyber",
                "name": "Cyber Security & Networks Wing",
                "short_name": "Cyber Wing",
                "description": "Ethical hacking, Capture The Flag (CTF) challenges, network security, and secure coding practices.",
                "icon": "fa-shield-halved",
                "drive_link": "https://drive.google.com/drive/folders/1bX4GuqkoAUiYTIljwqo2MyhqrwRrocRb?usp=drive_link"
            },
            {
                "id": "robotics",
                "name": "Robotics & IoT Wing",
                "short_name": "Robotics Wing",
                "description": "Microcontrollers (Arduino, ESP32), sensor interfacing, embedded systems, and hardware hacking.",
                "icon": "fa-robot",
                "drive_link": ""
            }
        ]
    },
    "CE": {
        "dept_code": "CE",
        "dept_name": "Civil Engineering",
        "club_name": "Civil Engineering Club",
        "club_full_name": "UITS Civil Engineering Club",
        "club_drive": "",
        "icon": "fa-trowel-bricks",
        "description": "Promotes hands-on civil engineering skills, CAD drafting, structural modeling, and site survey workshops.",
        "wings": [
            {
                "id": "structural-cad",
                "name": "Structural Analysis & CAD Wing",
                "short_name": "CAD & Design Wing",
                "description": "AutoCAD drafting, ETABS structural modeling, building codes, and architectural blueprints.",
                "icon": "fa-drafting-compass",
                "drive_link": ""
            },
            {
                "id": "geotech-survey",
                "name": "Surveying & Geotechnical Wing",
                "short_name": "Surveying Wing",
                "description": "Total station training, soil mechanics, GIS mapping, and field topography studies.",
                "icon": "fa-map-location-dot",
                "drive_link": ""
            },
            {
                "id": "environment-water",
                "name": "Environmental & Water Resources Wing",
                "short_name": "Enviro-Water Wing",
                "description": "Hydraulics, sustainable water treatment, drainage design, and environmental impact assessments.",
                "icon": "fa-water",
                "drive_link": ""
            },
            {
                "id": "materials-lab",
                "name": "Construction Materials & Testing Wing",
                "short_name": "Materials Wing",
                "description": "Concrete technology, tensile strength testing, mix design, and structural health monitoring.",
                "icon": "fa-cubes",
                "drive_link": ""
            }
        ]
    },
    "IT": {
        "dept_code": "IT",
        "dept_name": "Information Technology",
        "club_name": "IT Club",
        "club_full_name": "UITS Information Technology Club",
        "club_drive": "",
        "icon": "fa-server",
        "description": "Focuses on enterprise cloud systems, system administration, software quality assurance, and UI/UX.",
        "wings": [
            {
                "id": "cloud-devops",
                "name": "Cloud Computing & DevOps Wing",
                "short_name": "Cloud Wing",
                "description": "AWS, Google Cloud, Docker containerization, CI/CD pipelines, and serverless architectures.",
                "icon": "fa-cloud",
                "drive_link": ""
            },
            {
                "id": "sysadmin-networks",
                "name": "System & Network Administration Wing",
                "short_name": "SysAdmin Wing",
                "description": "Linux server management, network configuration, bash scripting, and IT infrastructure.",
                "icon": "fa-network-wired",
                "drive_link": ""
            },
            {
                "id": "ui-ux",
                "name": "UI/UX & Product Design Wing",
                "short_name": "UI/UX Wing",
                "description": "Figma prototyping, design systems, usability research, and modern human-computer interaction.",
                "icon": "fa-pen-ruler",
                "drive_link": ""
            },
            {
                "id": "sqa-testing",
                "name": "Software QA & Automation Wing",
                "short_name": "SQA Wing",
                "description": "Software quality assurance, unit testing, test suites, and automation tools (Selenium, Cypress).",
                "icon": "fa-check-double",
                "drive_link": ""
            }
        ]
    },
    "EEE": {
        "dept_code": "EEE",
        "dept_name": "Electrical & Electronic Engineering",
        "club_name": "EEE Club",
        "club_full_name": "UITS Electrical & Electronic Engineering Club",
        "club_drive": "",
        "icon": "fa-bolt",
        "description": "Dedicated to power system engineering, renewable energy, analog circuit design, and industrial automation.",
        "wings": [
            {
                "id": "power-energy",
                "name": "Power & Energy Systems Wing",
                "short_name": "Power Wing",
                "description": "Transmission systems, substation design, smart grids, and high-voltage power engineering.",
                "icon": "fa-tower-broadcast",
                "drive_link": ""
            },
            {
                "id": "circuits-embedded",
                "name": "Circuit Design & Embedded Systems Wing",
                "short_name": "Circuits Wing",
                "description": "PCB design, circuit prototyping, microcontrollers, MATLAB modeling, and analog filters.",
                "icon": "fa-microchip",
                "drive_link": ""
            },
            {
                "id": "renewable-green",
                "name": "Renewable & Green Energy Wing",
                "short_name": "Renewable Wing",
                "description": "Solar PV systems, wind turbines, energy storage solutions, and sustainability research.",
                "icon": "fa-solar-panel",
                "drive_link": ""
            }
        ]
    },
    "ECE": {
        "dept_code": "ECE",
        "dept_name": "Electrical & Computer Engineering",
        "club_name": "ECE Club",
        "club_full_name": "UITS Electrical & Computer Engineering Club",
        "club_drive": "",
        "icon": "fa-satellite-dish",
        "description": "Bridging computer architecture, VLSI, wireless telecommunications, and digital signal processing.",
        "wings": [
            {
                "id": "telecom-rf",
                "name": "Telecommunications & RF Wing",
                "short_name": "Telecom Wing",
                "description": "Wireless communication, 5G/6G protocols, antenna design, and RF engineering.",
                "icon": "fa-tower-cell",
                "drive_link": ""
            },
            {
                "id": "vlsi-chip",
                "name": "VLSI & Microelectronics Wing",
                "short_name": "VLSI Wing",
                "description": "Verilog/VHDL, FPGA programming, digital logic synthesis, and silicon chip design.",
                "icon": "fa-memory",
                "drive_link": ""
            },
            {
                "id": "dsp-signals",
                "name": "Digital Signal Processing (DSP) Wing",
                "short_name": "DSP Wing",
                "description": "Audio/image processing, wavelets, filtering algorithms, and real-time DSP systems.",
                "icon": "fa-wave-square",
                "drive_link": ""
            }
        ]
    },
    "BBA": {
        "dept_code": "BBA",
        "dept_name": "Business Administration",
        "club_name": "Business & Leadership Club",
        "club_full_name": "UITS Business & Leadership Club",
        "club_drive": "",
        "icon": "fa-briefcase",
        "description": "Nurturing future entrepreneurs, business analysts, marketing strategists, and corporate leaders.",
        "wings": [
            {
                "id": "entrepreneurship",
                "name": "Entrepreneurship & Startup Wing",
                "short_name": "Startup Wing",
                "description": "Pitch decks, business models, venture incubation, case competitions, and innovation.",
                "icon": "fa-rocket",
                "drive_link": ""
            },
            {
                "id": "finance-invest",
                "name": "Finance & Investment Wing",
                "short_name": "Finance Wing",
                "description": "Financial modeling, capital markets, corporate valuation, and fintech developments.",
                "icon": "fa-chart-line",
                "drive_link": ""
            },
            {
                "id": "marketing-branding",
                "name": "Marketing & Brand Strategy Wing",
                "short_name": "Marketing Wing",
                "description": "Digital marketing, consumer psychology, social media strategy, and brand campaigns.",
                "icon": "fa-bullhorn",
                "drive_link": ""
            }
        ]
    },
    "LAW": {
        "dept_code": "LAW",
        "dept_name": "Law",
        "club_name": "Moot Court & Law Society",
        "club_full_name": "UITS Moot Court & Law Society",
        "club_drive": "",
        "icon": "fa-scale-balanced",
        "description": "Advancing trial advocacy, legal writing, constitutional law research, and moot court tournaments.",
        "wings": [
            {
                "id": "moot-court",
                "name": "Moot Court & Advocacy Wing",
                "short_name": "Moot Wing",
                "description": "Oral arguments, memorial drafting, appellate practice, and national moot competitions.",
                "icon": "fa-gavel",
                "drive_link": ""
            },
            {
                "id": "legal-aid-rights",
                "name": "Human Rights & Legal Aid Wing",
                "short_name": "Legal Aid Wing",
                "description": "Pro bono awareness, public interest law, human rights advocacy, and clinical legal aid.",
                "icon": "fa-hands-holding-child",
                "drive_link": ""
            },
            {
                "id": "corporate-law",
                "name": "Corporate & Commercial Law Wing",
                "short_name": "Corporate Law Wing",
                "description": "Contract drafting, company law, intellectual property rights, and arbitration.",
                "icon": "fa-file-signature",
                "drive_link": ""
            }
        ]
    },
    "ENGLISH": {
        "dept_code": "ENGLISH",
        "dept_name": "English",
        "club_name": "Language & Literature Club",
        "club_full_name": "UITS Language & Literature Club",
        "club_drive": "",
        "icon": "fa-book-open-reader",
        "description": "Celebrating creative writing, debate, linguistic skills, theatrical arts, and literary appreciation.",
        "wings": [
            {
                "id": "debate-oratory",
                "name": "Debating & Public Speaking Wing",
                "short_name": "Debate Wing",
                "description": "Parliamentary debate, speech delivery, argumentation, and public communication mastery.",
                "icon": "fa-comments",
                "drive_link": ""
            },
            {
                "id": "creative-writing",
                "name": "Creative Writing & Publications Wing",
                "short_name": "Writing Wing",
                "description": "Poetry, essays, storytelling, departmental magazines, and literary newsletters.",
                "icon": "fa-feather-pointed",
                "drive_link": ""
            },
            {
                "id": "theatre-drama",
                "name": "Drama & Cultural Wing",
                "short_name": "Theatre Wing",
                "description": "Theatrical performances, stage plays, script readings, and cultural exhibitions.",
                "icon": "fa-masks-theater",
                "drive_link": ""
            }
        ]
    },
    "PHARMA": {
        "dept_code": "PHARMA",
        "dept_name": "Pharmacy",
        "club_name": "Pharma Club",
        "club_full_name": "UITS Pharmaceutical Science Club",
        "club_drive": "",
        "icon": "fa-prescription-bottle-medical",
        "description": "Advancing clinical pharmacy, drug formulation, pharmaceutical chemistry, and health education.",
        "wings": [
            {
                "id": "formulation-rd",
                "name": "Drug Formulation & Research Wing",
                "short_name": "Formulation Wing",
                "description": "Dosage forms, drug delivery systems, pharmacokinetics, and chemical synthesis.",
                "icon": "fa-flask-vial",
                "drive_link": ""
            },
            {
                "id": "clinical-health",
                "name": "Clinical Pharmacy & Healthcare Wing",
                "short_name": "Clinical Wing",
                "description": "Pharmacology, patient counseling, drug interaction analysis, and community health camps.",
                "icon": "fa-heart-pulse",
                "drive_link": ""
            }
        ]
    },
    "SOCIAL": {
        "dept_code": "SOCIAL",
        "dept_name": "Social Work",
        "club_name": "Social Welfare Club",
        "club_full_name": "UITS Social Welfare & Community Action Club",
        "club_drive": "",
        "icon": "fa-handshake-angle",
        "description": "Fostering community empowerment, disaster response, social policy analysis, and volunteer leadership.",
        "wings": [
            {
                "id": "community-relief",
                "name": "Community Outreach & Relief Wing",
                "short_name": "Outreach Wing",
                "description": "Winter cloth drives, flood relief, blood donation coordination, and grassroots volunteerism.",
                "icon": "fa-hand-holding-heart",
                "drive_link": ""
            },
            {
                "id": "policy-research",
                "name": "Social Policy & Development Wing",
                "short_name": "Policy Wing",
                "description": "Community needs assessment, child welfare advocacy, sustainable development goals (SDGs).",
                "icon": "fa-users-gear",
                "drive_link": ""
            }
        ]
    }
};
