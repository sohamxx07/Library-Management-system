const express = require("express");

const router = express.Router();

const SettingController = require("../controllers/settingController");

router.get("/", SettingController.getSetting);
router.get("/:id", SettingController.getSettingById);
router.post("/", SettingController.createSetting);
router.put("/:id", SettingController.updateSetting);
router.delete("/:id", SettingController.deleteSetting);

module.exports = router;