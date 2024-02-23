import { todos } from "@/app/_lib/mongo";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/todo:
 *  post:
 *   description: Create a new todo
 *   responses:
 *    200:
 *     description: Success
 *   500:
 *     description: Internal server error
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       description:
 *        type: string
 *       completed:
 *        type: boolean
 */
export async function POST(
    request: Request) {
    const todo = await request.json();
    if (!(todo.description)) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        todo.completed = false;
        const result = await todos.insertOne(todo);
        if (!result) {
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        }
        const insertedItem = await todos.findOne({ _id: result.insertedId });
        return NextResponse.json(insertedItem, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
/**
 * @swagger
 * /api/todo:
 *  get:
 *   description: Get all todos
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Internal server error
 */
export async function GET(
    request: Request) {
    try {
        const todo = await todos.find().toArray();
        if (!todo) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
        todo.forEach((item) => {
            item.id = item._id;
        });
        return NextResponse.json(todo, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}