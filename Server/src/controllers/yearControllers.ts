import type { Request, Response } from "express";
import mongoose from "mongoose";
import { yearGroupModel } from "../models/yearGroupModel.js";
import { eventModel } from "../models/eventModel.js";
import { memberModel } from "../models/memberModel.js";

// add year 
const addYearGroup = async (req: Request, res: Response) => {
    try {
      const { year } = req.body;
  
      if (!year) {
        return res.status(400).json({
          ok: false,
          message: "year is required",
        });
      }
  
      const existing = await yearGroupModel.findOne({ year });
      if (existing) {
        return res.status(409).json({
          ok: false,
          message: "year already exists",
        });
      }
  
      const yearGroup = await yearGroupModel.create({ year });
  
      return res.status(201).json({
        ok: true,
        message: "year group added successfully",
        yearGroup,
      });
    } catch (err) {
      console.error("addYearGroup error:", err);
      return res.status(500).json({
        ok: false,
        message: "internal server error",
      });
    }
}
  

// edit year
const editYearGroup = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { year } = req.body;
  
      if (!year) {
        return res.status(400).json({
          ok: false,
          message: "year is required",
        });
      }
  
      const updated = await yearGroupModel.findByIdAndUpdate(
        id,
        { year },
        { new: true, runValidators: true }
      );
  
      if (!updated) {
        return res.status(404).json({
          ok: false,
          message: "year group not found",
        });
      }
  
      return res.status(200).json({
        ok: true,
        message: "year group updated successfully",
        yearGroup: updated,
      });
    } catch (err) {
      console.error("editYearGroup error:", err);
      return res.status(500).json({
        ok: false,
        message: "internal server error",
      });
    }
}


// delete year

const deleteYearGroup = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { id } = req.params;
  
      const yearGroup = await yearGroupModel.findById(id).session(session);
      if (!yearGroup) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          ok: false,
          message: "year group not found",
        });
      }
  
      //  Delete all related events
      if (yearGroup.events.length > 0) {
        await eventModel.deleteMany({
          _id: { $in: yearGroup.events },
        }).session(session);
      }
  
      //  Delete all related members
      if (yearGroup.members.length > 0) {
        await memberModel.deleteMany({
          _id: { $in: yearGroup.members },
        }).session(session);
      }
  
      //  Delete year group itself
      await yearGroupModel.findByIdAndDelete(id).session(session);
  
      await session.commitTransaction();
      session.endSession();
  
      return res.status(200).json({
        ok: true,
        message: "year group, events, and members deleted successfully",
      });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
  
      console.error("deleteYearGroup error:", err);
      return res.status(500).json({
        ok: false,
        message: "internal server error",
      });
    }
}


export { addYearGroup, editYearGroup, deleteYearGroup };