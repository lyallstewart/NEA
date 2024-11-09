const createAllTables = `
CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER PRIMARY KEY NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"first_name" TEXT NOT NULL,
	"surname" TEXT NOT NULL,
	"password_hash" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_groups" (
	"id" INTEGER PRIMARY KEY NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"isAdmin" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "memberships" (
	"user_id" INTEGER NOT NULL,
	"group_id" INTEGER NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "users"("id"),
	FOREIGN KEY("group_id") REFERENCES "user_groups"("id")
);
`;

const runCreateAllTables = (db) => {
	db.exec(createAllTables, (err) => {
		if (err) {
			console.error('Error creating tables:', err.message);
		} else {
			console.log('Tables created successfully.');
		}
	});
}

module.exports = runCreateAllTables;
