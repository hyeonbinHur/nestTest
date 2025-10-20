export declare class UsersService {
    private users;
    findAll(): {
        id: number;
        name: string;
    }[];
    create(user: {
        name: string;
    }): {
        id: number;
        name: string;
    };
}
