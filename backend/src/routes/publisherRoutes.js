const express = require("express");

const router = express.Router();

const PublisherController = require("../controllers/publisherController");

router.get("/", PublisherController.getPublisher);
router.get("/:id", PublisherController.getPublisherById);
router.post("/", PublisherController.createPublisher);
router.put("/:id", PublisherController.updatePublisher);
router.delete("/:id", PublisherController.deletePublisher);

module.exports = router;