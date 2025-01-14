const verifyAdminStatus = require("../middleware/verifyAdminStatus");
const verifyAuthStatus = require("../middleware/verifyAuthStatus");
module.exports = (router, db) => {
  router.addRoute(
    "POST",
    "/rooms/create",
    async (request) => {
      const {name, capacity, location} = request.body;
      if (!name || !capacity || !location) {
        return request.sendError({code: 400, message: "Room or Capacity Not Provided"})
      }
      
      try {
        await db.run(
          `INSERT INTO rooms(name, capacity, location)
           VALUES (?, ?, ?)`, [name, capacity, location])
        request.sendSuccessResponse({
          success: true,
        })
      } catch (error) {
        console.error(error)
        request.sendError({code: 500, message: "Internal Server Error"})
      }
    },
    [verifyAdminStatus],
  );
  
  router.addRoute(
    "GET",
    "/rooms/all",
    async (request) => {
      try {
        const rooms = await db.all(`SELECT * from rooms`);
        request.sendSuccessResponse({
          success: true,
          rooms
        });
      } catch (error) {
        console.error(error)
        request.sendError({code: 500, message: "Internal Server Error"})
      }
    },
    [verifyAuthStatus]
  )
  
  router.addRoute(
    "DELETE",
    "/rooms/room/:id",
    async (request) => {
      const [ id ] = request.params;
      try {
        await db.run(
          `DELETE FROM rooms WHERE id= ?`,
          [id]
        )
        
        request.sendSuccessResponse({
          success: true,
        })
      } catch (error) {
        console.error(error)
        request.sendError({code: 500, message: "Internal Server Error"})
      }
    },
    [ verifyAdminStatus ]
  )
  
  router.addRoute(
    "PUT",
    "/rooms/room/:id",
    async (request) => {
      const [ id ] = request.params;
      const { name, capacity, location } = request.body;
      
      try {
        await db.run(`UPDATE rooms SET name=?, capacity=?, location=? WHERE id= ?`, [name, capacity, location, id])
        request.sendSuccessResponse({
          success: true,
        })
      } catch (error) {
        console.error(error)
        request.sendError({code: 500, message: "Internal Server Error"})
      }
    },
    [ verifyAdminStatus ]
  )
  
  router.addRoute(
    "GET",
    "/slots/all",
    async (request) => {
      try {
        const slots = await db.all(`SELECT * FROM slots`);
        request.sendSuccessResponse({
          success: true,
          slots
        })
      } catch (error) {
        console.error(error)
        request.sendError({code: 500, message: "Internal Server Error"})
      }
    },
    [verifyAuthStatus]
  )
  
  router.addRoute(
    "GET",
    "/slots/bookings",
    async (request) => {
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
          bookings
        })
      } catch (error) {
        console.error(error)
        request.sendError({code: 500, message: "Internal Server Error"})
      }
    }
  )
};
