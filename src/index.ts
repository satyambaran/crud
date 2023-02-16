import express from "express";
import { Request, Response } from "express";
import mysql from "mysql";
// import bodyParser from "body-parser";
const app = express();
//bodyparser is depracted that's why using express.urlencoded instead of bodyParser.urlencoded
let obj = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: Number(process.env.DB_CONNECTION_LIMIT),
	multipleStatements: true,
};
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));
app.get("/id/:idx", async (req: Request, res: Response) => {
	let query = "select * from users where id=" + req.params.idx;
	var connect = mysql.createPool(obj);
	connect.getConnection((err: any, conn: any) => {
		if (err) {
			res.statusCode = 500;
			res.send({
				status: false,
				message: err,
			});
		} else {
			console.log("Connected");

			conn.query(query, (err: any, rows: any) => {
				console.log(err, rows);

				conn.release();
				if (err) {
					res.statusCode = 500;
					res.send({
						status: false,
						message: "Some error occured",
					});
				} else {
					if (rows && rows.length > 0 && rows[0].id) {
						res.send({
							status: true,
							message: "Data found",
							data: rows[0],
						});
					} else {
						res.send({
							status: true,
							message: "Can't find users data",
							data: rows,
						});
					}
				}
			});
		}
	});
});
app.get("/all", async (req: Request, res: Response) => {
	let query = "select * from users";
	var connect = mysql.createPool(obj);
	connect.getConnection((err: any, conn: any) => {
		if (err) {
			res.statusCode = 500;
			res.send({
				status: false,
				message: err,
			});
		} else {
			console.log("Connected");

			conn.query(query, (err: any, rows: any) => {
				console.log(err, rows);

				conn.release();
				if (err) {
					res.statusCode = 500;
					res.send({
						status: false,
						message: "Some error occured",
					});
				} else {
					if (rows && rows.length > 0 && rows[0].id) {
						res.send({
							status: true,
							message: "Data found",
							data: rows,
						});
					} else {
						res.send({
							status: true,
							message: "Can't find users data",
							data: rows,
						});
					}
				}
			});
		}
	});
});
app.post("/*", async (req: Request, res: Response) => {
	let body = req.body;
	if (body.mobile && body.name) {
		let query =
			"insert into users (name, mobile) values ('" +
			body.name +
			"', '" +
			body.mobile +
			"')";
		var connect = mysql.createPool(obj);
		connect.getConnection((err: any, conn: any) => {
			if (err) {
				res.statusCode = 500;
				res.send({
					status: false,
					message: err,
				});
			} else {
				console.log("Connected");

				conn.query(query, (err: any, rows: any) => {
					console.log(err, rows);

					conn.release();
					if (err) {
						if (
							String(err.sqlMessage).lastIndexOf(
								"Duplicate entry"
							) == 0
						) {
							res.send({
								status: false,
								message: "User is already added",
							});
						}
						res.statusCode = 500;
						res.send({
							status: false,
							message: "Some error occured",
						});
					} else if (rows.insertId) {
						res.send({
							status: true,
							message: "User added",
							data: rows.insertId,
						});
					} else {
						res.send({
							status: true,
							message: "Couldn't add data",
						});
					}
				});
			}
		});
	} else {
		res.send({
			status: false,
			message: "Incorrect data",
		});
	}
});
app.put("/*", async (req: Request, res: Response) => {
	if (
		req.body &&
		req.body.name &&
		(req.body.id || req.body.mobile)
	) {
		let query =
			"update users set name='" +
			req.body.name +
			"' where ";

		if (req.body.id) {
			query = query + " id =" + req.body.id;
		} else {
			query = query + " mobile =" + req.body.mobile;
		}
		var connect = mysql.createPool(obj);
		connect.getConnection((err: any, conn: any) => {
			if (err) {
				res.statusCode = 500;
				res.send({
					status: false,
					message: err,
				});
			} else {
				console.log("Connected");

				conn.query(query, (err: any, rows: any) => {
					console.log(err, rows);

					conn.release();
					if (err) {
						res.statusCode = 500;
						res.send({
							status: false,
							message: "Some error occured",
						});
					} else if (rows.message[15] == 0) {
						res.send({
							status: false,
							message: "Can't find the user",
						});
					} else if (rows.message[27] == 0) {
						res.send({
							status: true,
							message: "User entered same data",
						});
					} else if (rows.message[27] == 1) {
						res.send({
							status: true,
							message: "Data updated",
						});
					} else {
						res.send({
							status: false,
							message: "Couldn't update data",
						});
					}
				});
			}
		});
	} else {
		res.statusCode = 400;
		res.send({
			status: false,
			message: "Invalid request",
		});
	}
});
app.delete("/:id", async (req: Request, res: Response) => {
	let query = "delete from users where id = " + req.params.id;
	var connect = mysql.createPool(obj);
	connect.getConnection((err: any, conn: any) => {
		if (err) {
			res.statusCode = 500;
			res.send({
				status: false,
				message: err,
			});
		} else {
			console.log("Connected");

			conn.query(query, (err: any, rows: any) => {
				console.log(err, rows);

				conn.release();
				if (err) {
					res.statusCode = 500;
					res.send({
						status: false,
						message: "Some error occured",
					});
				} else if (rows.affectedRows == 1) {
					res.send({
						status: true,
						message: "User deleted",
					});
				} else {
					res.send({
						status: false,
						message: "User not exist",
					});
				}
			});
		}
	});
});
app.listen(Number(process.env.PORT), () => {
	console.log("The application is listening on port 3000!");
});
