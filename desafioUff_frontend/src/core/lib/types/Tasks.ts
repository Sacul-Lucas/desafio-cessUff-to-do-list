export interface Tasks {
    _id: string
    title: string;
    description: string;
    deadline?: Date;
    status?: 'pending' | 'completed' | 'archived';
};
