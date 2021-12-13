const { Router } = require("express");
const router = new Router();
const itemController = require("../controllers/ItemController");
const { authenticateToken } = require("../middlewares/Authentication");

router.post("/", authenticateToken, itemController.createItem);
// router.post('/', itemController.createItem);
router.get("/", itemController.getAll);
router.get("/categories", itemController.getUniqueCategories);
router.delete("/:id", authenticateToken, itemController.deleteItem);
router.get("/:id", authenticateToken, itemController.getItem);
router.put("/", authenticateToken, itemController.udpateItem);

module.exports = router;
