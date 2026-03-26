import type { Request, Response } from "express";
import mongoose from "mongoose";
import { eventModel } from "../models/eventModel.js";
import { yearGroupModel } from "../models/yearGroupModel.js";

/**
 * ADD EVENT (single)
 */
const addEvent = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { yearGroupId, eventName, eventInfo, eventDate } = req.body;
    if (!yearGroupId || !eventName || !eventInfo || !eventDate) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        ok: false,
        message: "yearGroupId, eventName, eventInfo, and eventDate are required",
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

    const event = await eventModel.create(
      [
        {
          eventName,
          eventInfo,
          eventDate,
          yearGroup: yearGroupId,
        },
      ],
      { session }
    );
    
    //@ts-ignore
    yearGroup.events.push(event[0]._id);
    await yearGroup.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      ok: true,
      message: "event added successfully",
      event: event[0],
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("addEvent error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

/**
 * EDIT EVENT
 * 
 */


const editEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await eventModel.findByIdAndUpdate(
      id,
      {
        eventName: req.body.eventName,
        eventInfo: req.body.eventInfo,
        eventDate: req.body.eventDate,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        ok: false,
        message: "event not found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "event updated successfully",
      event: updated,
    });
  } catch (err) {
    console.error("editEvent error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

/**
 * DELETE EVENT
*/



const deleteEvent = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const event = await eventModel.findById(id).session(session);
    if (!event) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        ok: false,
        message: "event not found",
      });
    }

    // remove event reference from year group
    await yearGroupModel.findByIdAndUpdate(
      event.yearGroup,
      { $pull: { events: event._id } },
      { session }
    );

    // delete event
    await eventModel.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      ok: true,
      message: "event deleted successfully",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("deleteEvent error:", err);
    return res.status(500).json({
      ok: false,
      message: "internal server error",
    });
  }
};

export { addEvent, editEvent, deleteEvent };


