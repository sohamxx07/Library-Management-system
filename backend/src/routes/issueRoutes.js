const express = require("express");

const router = express.Router();

const IssueController = require("../controllers/issueController");

router.get("/", IssueController.getIssue);
router.get("/:id", IssueController.getIssueById);
router.post("/", IssueController.createIssue);
router.put("/:id", IssueController.updateIssue);
router.delete("/:id", IssueController.deleteIssue);

module.exports = router;