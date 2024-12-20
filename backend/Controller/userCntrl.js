import asyncHandler from "express-async-handler";
import { prisma } from "../Config/prismaConfig.js";

export const creatUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      // Create a new user
      const user = await prisma.user.create({
        data: {
          email,
        },
      });

      return res.status(201).send({
        message: "Register successfully",
        user: user,
      });
    } else {
      return res.status(200).send({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ message: "Server error", error });
  }
});

//To book a visit
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (alreadyBooked.bookedVisits.some((visit) => visit.data === id)) {
      res.status(400).json({ message: "Residency already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your visit is Booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

//To get all bookings
export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (error) {
    throw new Error(err.message);
  }
});

//Cancle Booking
export const cancelBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("Booking cancel successfully")
    }
  } catch (error) {
    throw new Error("Error canceling:", err.message);
  }
});

//Add to favouret
export const toFav = asyncHandler(async(req,res) => {
  const {email} = req.body;
  const {rid} = req.params

  try {
    const user = await prisma.user.findUnique({
      where: {email},
    })
    if(user.favResidenciesID.includes(rid)){
      const updatedUser = await prisma.user.update({
        where: {email},
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !==rid)
          }
        }
      })
      res.send({message:"Removed from favoret",user: updatedUser})
    }else{
      const updatedUser = await prisma.user.update({
        where: {email},
        data: {
          favResidenciesID: {
            push: rid
          }
        }
      })
      res.send({message:"Updated favouret", user: updatedUser})
    }
  } catch (error) {
    throw new Error(err.message);
    
  }
})

//To get all fav
export const getAllfav = asyncHandler(async(req,res) => {
  const {email} = req.body
  try {
    const favResd = await prisma.user.findUnique({
      where: {email},
      select: {favResidenciesID: true}
    })
    res.status(200).send(favResd)
  } catch (error) {
    throw new Error(err.message);
    
  }
})
