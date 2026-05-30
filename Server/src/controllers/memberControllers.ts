import type { Request, Response } from "express";
import mongoose from "mongoose";
import { memberModel } from "../models/memberModel.js";
import { yearGroupModel } from "../models/yearGroupModel.js";

/**
 * ADD MULTIPLE MEMBERS
 */
const addMembers = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { yearGroupId, members } = req.body;

        if (!yearGroupId || !Array.isArray(members) || members?.length === 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                ok: false,
                message: "yearGroupId and members array required",
            });
        }

        const yearGroup = await yearGroupModel.findById(yearGroupId).session(session);
        if (!yearGroup) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                ok: false,
                message: "year group not found",
            });
        }

        // attach yearGroupId to each member
        const membersWithYear = members.map((m: any) => ({
            ...m,
            yearGroup: yearGroupId,
        }));

        const createdMembers = await memberModel.insertMany(membersWithYear, {
            session,
        });

        yearGroup.members.push(...createdMembers.map(m => m._id));
        await yearGroup.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            ok: true,
            message: "members added successfully",
            members: createdMembers,
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("addMembers error:", err);
        return res.status(500).json({
            ok: false,
            message: "internal server error",
        });
    }
};


/** Edit member */

const editMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updated = await memberModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                ok: false,
                message: "member not found",
            });
        }

        return res.status(200).json({
            ok: true,
            message: "member updated successfully",
            member: updated,
        });
    } catch (err) {
        console.error("editMember error:", err);
        return res.status(500).json({
            ok: false,
            message: "internal server error",
        });
    }
};


/** Delete memeber */


const deleteMember = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        const member = await memberModel.findById(id).session(session);
        if (!member) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                ok: false,
                message: "member not found",
            });
        }

        // remove member from its year group
        await yearGroupModel.findByIdAndUpdate(
            member.yearGroup,
            { $pull: { members: member._id } },
            { session }
        );

        // delete member
        await memberModel.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            ok: true,
            message: "member deleted successfully",
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("deleteMember error:", err);
        return res.status(500).json({
            ok: false,
            message: "internal server error",
        });
    }
};


export { addMembers, editMember, deleteMember };