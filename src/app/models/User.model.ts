export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    picture: string;
};

export function initUser(user: User) {
    user.id = 0;
    user.firstName = '';
    user.lastName = '';
    user.email = '';
    user.password = '';
    user.role = '';
    user.picture = '';
}