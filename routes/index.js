//Express routers are a way to modularize and organize routes in Express applicatins.
//provide a mch. for defining groups of routes and middleware in separate folders or modules
//allowing for better code organization and maintainability, especaullt in larger applications

const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.send("Wrong Route!");
});

module.exports = router;
