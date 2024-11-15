// Routes pertaining to User CRUD and authentication.
const bcrypt = require('bcrypt')
const crypto = require("crypto");

module.exports = (router, db) => {
  // --- GET CURRENT SESSION ---
  router.addRoute('GET', '/users/getCurrentUser', async (request) => {
    if(request.session) {
      request.sendSuccessResponse({
        isAuthenticated: true,
        user: request.session,
      });
    } else {
      request.sendSuccessResponse({
        isAuthenticated: false
      })
    }
  }, []);

  // ---SIGNUP---
  router.addRoute('POST', '/users/signup', async (request) => {
    // Check body is sent with proper values
    const { username, password } = request.body;
    if (!username || !password) {
      request.sendError({code: 400, message: 'Username and password are required'});
      return;
    }

    // Check the user doesn't already exist
    const user = await db.get('SELECT * FROM Users WHERE email = ?', [username]);
    if(user) {
      request.sendError({code: 403, message: 'User with this email already exists'})
      return;
    }

    // Create user is valid, proceed.
    bcrypt.genSalt(10, (err, salt) => {
      if(err) request.sendError({code: 500, message: 'Internal Server Error'});
      bcrypt.hash(password, salt, async (err, hash) => {
        if(err) request.sendError({code: 500, message: 'Internal Server Error'});
        try {
          await db.run(`INSERT INTO Users (email, password_hash) VALUES (?, ?)`, [username, hash]);
          request.sendSuccessResponse({
            message: 'User successfully registered',
          })
        } catch (e) {
          request.sendError({code: 500, message: 'Internal Server Error'});
        }
      })
    })
  }, [])

  // ---LOGIN---
  router.addRoute('POST', '/users/login', async (request) => {
    const { username, password } = request.body;
    try {
      const user = await db.get('SELECT * FROM Users WHERE email = ?', [username]);
      if(!user) {
        request.sendError({code: 403, message: 'User with this email does not exist.'})
        return;
      }
      bcrypt.compare(password, user.password_hash, async (err, result) => {
        if (result === true) { //As much as this annoys me, if (result) does not suffice as other truthy vals may be passed.
          const sessionUUID = crypto.randomUUID();
          await db.run(`INSERT INTO Sessions (sid, uemail) VALUES (?, ?)`, [sessionUUID, user.email]);
          request.setSession(sessionUUID)

          request.sendSuccessResponse({
            success: true,
            user: user
          })
        } else {
          request.sendError({code: 404, message: 'Incorrect Password'});
        }
      });
    } catch {
      request.sendError({code: 500, message: 'Internal Server Error'});
    }
  }, [])

  // ---LOGOUT---
  router.addRoute('POST', '/users/logout', async (request) => {
    await db.run(`DELETE FROM sessions WHERE sid = ?`, [request.session.id]);
    request.setSession(0);
    request.session = false;

    request.sendSuccessResponse({
      message: 'Session destroyed.'
    })
  }, [])
};