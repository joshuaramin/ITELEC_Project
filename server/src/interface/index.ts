

export interface UserInterface {
    username: string
    email: string
    password: string
    role: any
    createdAt: any
    updatedAt: any
}


export interface Token {
    token: string
}

export interface ProfileInterface {
    fullname: string
    birthday: any
    phone: string
    bio: string
    createdAt: any
    updatedAt: any
}

export interface EnrollInterface {
    status: any
}

export interface SubjectInterface {
    subject: string
    language: string
    description: string
    image: string
}

export interface LessonInterface {
    lesson: string
}

export interface AssessmentInterface {
    assessment: string
}