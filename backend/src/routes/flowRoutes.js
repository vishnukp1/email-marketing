const express = require("express");
const router = express.Router();
const flowController = require("../controllers/flowController.js");
const authMiddleware = require("../middlewares/userAuth.js");
const tryCatch = require("../middlewares/tryCatch");

// Create a new Flow
router.post("/createflow", authMiddleware, tryCatch(flowController.createFlow));

// Create a new Flow or update
router.post("/Flow", authMiddleware, tryCatch(flowController.createOrUpdateFlow));

// Get all Flows for a user or by user ID
router.get("/flow/:id", authMiddleware, tryCatch(flowController.getFlows));

// Delete a Flow
router.delete("/flow/:id", authMiddleware, tryCatch(flowController.deleteFlow));

// Delete a Node by ID
router.delete("/flow/:userId/node/:nodeId", authMiddleware, tryCatch(flowController.deleteNodeById));

// Patch the label of a node
router.patch("/flow/:userId/node/:nodeId", authMiddleware, tryCatch(flowController.patchNodeLabel));

module.exports = router;
