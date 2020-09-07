const mssql = require("mssql");

const createTask = (request, response, pool) => {
  const {
    projectPk,
    name,
    description,
    startDate,
    plannedEndDate,
  } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inProyectPk", mssql.UniqueIdentifier, projectPk);
    request.input("inName", mssql.VarChar(254), name);
    request.input("inDescription", mssql.VarChar(400), description);
    request.input("inStartDate", mssql.Date, startDate);
    request.input("inPlannedEndDate", mssql.Date, plannedEndDate);
    request.output("outCreated", mssql.Bit);
    request.output("outMessage", mssql.VarChar(254));
    request.output("outTaskPk", mssql.UniqueIdentifier);
    request.execute("uspCreateTask", (error, results) => {
      if (error) {
        console.error(`Error occurred in the database`);
        console.error(error);
        response
          .status(500)
          .json({
            "error": true,
            "message": error.message
          });
      }
      response.status(200).json(results.output);
    })
  }).catch(error => {
    console.error(`Error occurred before reaching the database`);
    console.error(error);
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

const deleteTask = (request, response, pool) => {
  const { taskPk } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inTaskPk", mssql.UniqueIdentifier, taskPk);
    request.execute("uspDeleteTask", (error, results) => {
      if (error) {
        response
          .status(500)
          .json({
            "error": true,
            "message": error.message
          });
      }
      response.status(200).json({
        "completed": true
      });
    })
  }).catch(error => {
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

const getTask = (request, response, pool) => {
  const { taskPk } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inTaskPk", mssql.UniqueIdentifier, taskPk);
    request.execute("uspGetTask", (error, results) => {
      if (error) {
        response
          .status(500)
          .json({
            "error": true,
            "message": error.message
          });
      }
      response.status(200).json(results.recordset);
    })
  }).catch(error => {
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

const getTaskList = (request, response, pool) => {
  const { projectPk } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inProjectPk", mssql.UniqueIdentifier, projectPk);
    request.execute("uspGetTaskList", (error, results) => {
      if (error) {
        response
          .status(500)
          .json({
            "error": true,
            "message": error.message
          });
      }
      response.status(200).json(results.recordset);
    })
  }).catch(error => {
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

const getTaskStatusList = (request, response, pool) => {
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.execute("uspGetTaskStatusList", (error, results) => {
      if (error) {
        response
          .status(500)
          .json({
            "error": true,
            "message": error.message
          });
      }
      response.status(200).json(results.recordset);
    })
  }).catch(error => {
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

const markTaskAsCompleted = (request, response, pool) => {
  const { taskPk } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inTaskPk", mssql.UniqueIdentifier, taskPk);
    request.execute("uspMarkTaskCompleted", (error, results) => {
      if (error) {
        response
          .status(500)
          .json({
            "error": true,
            "message": error.message
          });
      }
      response.status(200).json({
        "completed": true
      });
    })
  }).catch(error => {
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

const updateTask = (request, response, pool) => {
  const {
    taskPk,
    name,
    description,
    startDate,
    plannedEndDate,
  } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inTaskPk", mssql.UniqueIdentifier, taskPk);
    request.input("inName", mssql.VarChar(254), name);
    request.input("inDescription", mssql.VarChar(400), description);
    request.input("inStartDate", mssql.Date, startDate);
    request.input("inPlannedEndDate", mssql.Date, plannedEndDate);
    request.output("outUpdated", mssql.Bit);
    request.output("outMessage", mssql.VarChar(254));
    request.execute("uspUpdateTask", (error, results) => {
      if (error) {
        console.error(`Error occurred in the database`);
        console.error(error);
        response
          .status(500)
          .json({
            "error": true,
            "message": error.message
          });
      }
      response.status(200).json(results.output);
    })
  }).catch(error => {
    console.error(`Error occurred before reaching the database`);
    console.error(error);
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

module.exports = {
  createTask,
  deleteTask,
  getTask,
  getTaskList,
  getTaskStatusList,
  updateTask,
  markTaskAsCompleted
}
