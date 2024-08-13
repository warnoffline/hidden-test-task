

export type Session = {
    id: string;
    user_id: string;
    ip: string;
    is_active: boolean;
}
export type SessionsType = {
    sessions: Session[]
}

export type UserType = {
    success: boolean;
    result: User;
}

export type User = {
    phone: string | null;
    email: string | null;
    email_verified: boolean;
    phone_verified: boolean;
    role_id: 1 | 2 | 3 | null;
    deleted_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    id: string | null;
}

