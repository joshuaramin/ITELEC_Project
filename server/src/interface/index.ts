

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
    createdAt: any
    updatedAt: any
}

export interface EnrollInterface {
    status: any
    Subject: SubjectInterface[] | SubjectInterface
}

export interface SubjectInterface {
    subject: string
    tags: string
    Lesson: LessonInterface[] | LessonInterface
}

export interface LessonInterface {
    lesson: string
    Assessmenet: AssessmentInterface[] | AssessmentInterface
}

export interface AssessmentInterface {
    assessment: string
}