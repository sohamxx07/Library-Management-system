const express = require("express");

const router = express.Router();

const MemberController = require("../controllers/memberController");

router.get("/", MemberController.getMember);
router.get("/:id", MemberController.getMemberById);
router.post("/", MemberController.createMember);
router.put("/:id", MemberController.updateMember);
router.delete("/:id", MemberController.deleteMember);

module.exports = router;