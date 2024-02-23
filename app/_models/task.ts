export default class Task {
    public id: string;
    public description: string;
    public completed: boolean;

    constructor(id:string, description: string) {
        this.id = id;
        this.description = description;
        this.completed = false;
    }
}