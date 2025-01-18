const verifyAdminStatus = require("../middleware/verifyAdminStatus");
const verifyAuthStatus = require("../middleware/verifyAuthStatus");
module.exports = (router, db) => {
  router.addRoute(
    "POST",
    "/rooms/create",
    async (request) => {
      const { name, capacity, location } = request.body;
      if (!name || !capacity || !location) {
        return request.sendError({
          code: 400,
          message: "Room or Capacity Not Provided",
        });
      }

      try {
        await db.run(
          `INSERT INTO rooms(name, capacity, location)
           VALUES (?, ?, ?)`,
          [name, capacity, location],
        );
        const newRoom = await db.get(
          `SELECT *
           FROM rooms
           WHERE name = ?
             AND capacity = ?
             AND location = ?`,
          [name, capacity, location],
        );
        request.sendSuccessResponse({
          success: true,
          newRoom,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAdminStatus],
  );

  router.addRoute(
    "GET",
    "/rooms/all",
    async (request) => {
      try {
        const rooms = await db.all(`SELECT *
                                    from rooms`);
        request.sendSuccessResponse({
          success: true,
          rooms,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAuthStatus],
  );

  router.addRoute(
    "DELETE",
    "/rooms/room/:id",
    async (request) => {
      const [id] = request.params;
      try {
        await db.run(
          `DELETE
           FROM rooms
           WHERE id = ?`,
          [id],
        );

        request.sendSuccessResponse({
          success: true,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAdminStatus],
  );

  router.addRoute(
    "PUT",
    "/rooms/room/:id",
    async (request) => {
      const [id] = request.params;
      const { name, capacity, location } = request.body;

      try {
        await db.run(
          `UPDATE rooms
           SET name=?,
               capacity=?,
               location=?
           WHERE id = ?`,
          [name, capacity, location, id],
        );
        request.sendSuccessResponse({
          success: true,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAdminStatus],
  );

  router.addRoute(
    "GET",
    "/slots/all",
    async (request) => {
      try {
        const slots = await db.all(`SELECT *
                                    FROM slots`);
        request.sendSuccessResponse({
          success: true,
          slots,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAuthStatus],
  );

  router.addRoute("GET", "/bookings/all", async (request) => {
    try {
      const bookings = await db.all(`
          SELECT bookings.*, slots.name as slotName, slots.day, slots.startTime, slots.endTime, rooms.name as roomName
          FROM bookings
                   JOIN slots
                        ON bookings.slotDay = slots.day
                            AND bookings.slotName = slots.name
                   JOIN rooms
                        ON bookings.roomId = rooms.id;
      `);

      request.sendSuccessResponse({
        success: true,
        bookings,
      });
    } catch (error) {
      console.error(error);
      request.sendError({ code: 500, message: "Internal Server Error" });
    }
  });

  router.addRoute(
    "POST",
    "/bookings/create",
    async (request) => {
      const { room, slot, day } = request.body;
      try {
        await db.run(
          `INSERT INTO bookings(slotDay, slotName, roomId)
           VALUES (?, ?, ?)`,
          [day, slot, room],
        );
        const newBooking = await db.get(
          `SELECT *
           FROM bookings
           WHERE slotDay = ?
             AND slotName = ?
             AND roomId = ?`,
          [day, slot, room],
        );
        request.sendSuccessResponse({
          success: true,
          newBooking,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAdminStatus],
  );

  router.addRoute(
    "DELETE",
    "/bookings/delete",
    async (request) => {
      const { room, slot, day } = request.body;
      try {
        await db.run(
          `DELETE
           FROM bookings
           WHERE slotDay = ?
             AND slotName = ?
             and roomId = ?`,
          [day, slot, room],
        );
        request.sendSuccessResponse({
          success: true,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAdminStatus],
  );

  router.addRoute(
    "POST",
    "/ttevents/create",
    async (request) => {
      const { roomId, slotName, date, description, name } = request.body;
      try {
        const returned = await db.run(
          `INSERT INTO timetable_events(name, description, date, slotName, roomId)
           VALUES (?, ?, ?, ?, ?)`,
          [name, description, date, slotName, roomId],
        );
        const newTTEvent = await db.get(
          `SELECT *
           FROM timetable_events
           WHERE id = ?`,
          [returned.lastID],
        );

        request.sendSuccessResponse({
          success: true,
          newTTEvent,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAdminStatus],
  );

  router.addRoute(
    "DELETE",
    "/ttevents/event/:id",
    async (request) => {
      const [id] = request.params;
      try {
        await db.run(
          `DELETE
           FROM timetable_events
           WHERE id = ?`,
          [id],
        );
        request.sendSuccessResponse({
          success: true,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAdminStatus],
  );

  router.addRoute(
    "PUT",
    "/ttevents/event/:id",
    async (request) => {
      const [id] = request.params;
      const { name, description, date, slotName, roomId } = request.body;

      try {
        const returned = await db.run(
          `UPDATE timetable_events
           SET name=?,
               description=?,
               date=?,
               slotName=?,
               roomId=?
           WHERE id = ?`,
          [name, description, date, slotName, roomId, id],
        );
        request.sendSuccessResponse({
          success: true,
        });
      } catch (error) {
        console.error(error);
        request.sendError({ code: 500, message: "Internal Server Error" });
      }
    },
    [verifyAdminStatus],
  );

  router.addRoute("GET", "/ttevents/all", async (request) => {
    try {
      /* Select the event itself and the relevant room/timeslot information. Date is an actual date,
         while slots.day is an integer (1: Mon, 5: Fri) so map between these on join. */
      const events = await db.all(`
          SELECT timetable_events.*,
                 slots.name AS slotName,
                 slots.day,
                 slots.startTime,
                 slots.endTime,
                 rooms.name AS roomName
          FROM timetable_events
                   JOIN slots
                        ON strftime('%u', timetable_events.date) = slots.day
                            AND timetable_events.slotName = slots.name
                   JOIN rooms
                        ON timetable_events.roomId = rooms.id;
      `);

      request.sendSuccessResponse({
        success: true,
        events,
      });
    } catch (error) {
      console.error(error);
      request.sendError({ code: 500, message: "Internal Server Error" });
    }
  });
};
