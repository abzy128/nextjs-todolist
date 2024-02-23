import { todos } from "@/app/_lib/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
/**
 * @swagger
 * /api/todo/{id}:
 *  get:
 *   description: Get todo by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    500:
 *     description: Internal server error
 */
export async function GET(
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    const blog = await todos.findOne({ "_id": new ObjectId(id) });
    if (!blog) {
        return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
}
/**
 * @swagger
 * /api/todo/{id}:
 *  put:
 *   description: Update a todo by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not Found
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
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    const { description, completed} = await request.json();
    if (!(id && description && typeof completed === "boolean")) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        const dbblog = await todos.findOne({ "_id": new ObjectId(id) });
        if (!dbblog) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
    }
    catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

    try {
        await todos.updateOne({ "_id": new ObjectId(id) }, { $set: { description, completed } });
    } catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
}
/**
 * @swagger
 * /api/todo/{id}:
 *  delete:
 *   description: Delete a todo by id
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 *    404:
 *     description: Not Found
 */
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }) {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
    try {
        const dbblog = await todos.findOne({ "_id": new ObjectId(id) });
        if (!dbblog) {
            return NextResponse.json({ message: "Not Found" }, { status: 404 });
        }
        await todos.deleteOne({ "_id": new ObjectId(id) });
    }
    catch (e) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
}