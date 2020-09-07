const mssql = require("mssql");

const createMachinery = (request, response, pool) => {
  const {
    code,
    name,
    brand,
    price,
    maintenanceCost,
    acquisitionDate,
    type,
    powerSource,
    displacement,
    operation,
    work,
  } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inCode", mssql.VarChar(254), code);
    request.input("inName", mssql.VarChar(254), name);
    request.input("inBrand", mssql.VarChar(254), brand);
    request.input("inPrice", mssql.Money, price);
    request.input("inMaintenanceCost", mssql.Money, maintenanceCost);
    request.input("inAcquisitionDate", mssql.Date, acquisitionDate);
    request.input("inType", mssql.UniqueIdentifier, type);
    request.input("inPowerSource", mssql.UniqueIdentifier, powerSource);
    request.input("inDisplacement", mssql.UniqueIdentifier, displacement);
    request.input("inOperation", mssql.UniqueIdentifier, operation);
    request.input("inWork", mssql.UniqueIdentifier, work);
    request.output("outCreated", mssql.Bit);
    request.output("outMessage", mssql.VarChar(254));
    request.output("outMachineryPK", mssql.UniqueIdentifier);
    request.execute("uspCreateMachinery", (error, results) => {
      if (error) {
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
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

const getDisplacementList = (request, response, pool) => {
  const { } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.execute("uspGetDisplacementList", (error, results) => {
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

const getMachinery = (request, response, pool) => {
  const { pk } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inMachineryPk", mssql.UniqueIdentifier, pk)
    request.execute("uspGetMachinery", (error, results) => {
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

const getMachineryProjectList = (request, response, pool) => {
  const { machineryPk } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inMachineryPk", mssql.UniqueIdentifier, machineryPk)
    request.execute("uspGetMachineryProyects", (error, results) => {
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

const getMachineryList = (request, response, pool) => {
  const { } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.execute("uspGetMachineryList", (error, results) => {
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

const getMachineryTypeList = (request, response, pool) => {
  const { } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.execute("uspGetMachineryTypeList", (error, results) => {
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

const getOperationList = (request, response, pool) => {
  const { } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.execute("uspGetOperationList", (error, results) => {
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

const getPowerSourceList = (request, response, pool) => {
  const { } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.execute("uspGetPowerSourceList", (error, results) => {
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

const getWorkList = (request, response, pool) => {
  const { } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.execute("uspGetWorkList", (error, results) => {
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

const updateMachinery = (request, response, pool) => {
  const {
    pk,
    code,
    name,
    brand,
    price,
    maintenanceCost,
    acquisitionDate,
    type,
    powerSource,
    displacement,
    operation,
    work,
  } = request.body;
  pool.then(pool => {
    const request = new mssql.Request(pool);
    request.input("inPK", mssql.UniqueIdentifier, pk);
    request.input("inCode", mssql.VarChar(254), code);
    request.input("inName", mssql.VarChar(254), name);
    request.input("inBrand", mssql.VarChar(254), brand);
    request.input("inPrice", mssql.Money, price);
    request.input("inMaintenanceCost", mssql.Money, maintenanceCost);
    request.input("inAcquisitionDate", mssql.Date, acquisitionDate);
    request.input("inType", mssql.UniqueIdentifier, type);
    request.input("inPowerSource", mssql.UniqueIdentifier, powerSource);
    request.input("inDisplacement", mssql.UniqueIdentifier, displacement);
    request.input("inOperation", mssql.UniqueIdentifier, operation);
    request.input("inWork", mssql.UniqueIdentifier, work);
    request.output("outUpdated", mssql.Bit);
    request.output("outMessage", mssql.VarChar(254));
    request.execute("uspUpdateMachinery", (error, results) => {
      if (error) {
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
    response
      .status(500)
      .json({
        "error": true,
        "message": error.message
      });
  });
}

module.exports = {
  createMachinery,
  getDisplacementList,
  getMachinery,
  getMachineryList,
  getMachineryProjectList,
  getMachineryTypeList,
  getOperationList,
  getPowerSourceList,
  getWorkList,
  updateMachinery
}
