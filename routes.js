const { Router } = require('express');
const { Dojo, Ninja } = require('./db');
const { ValidationError } = require('sequelize');
const router = Router();

router.get("/", async (req, res) => {

  const dojos = await Dojo.findAll({ include: [Ninja] });

  let errores  = req.flash("error");

  res.render("index", { dojos, errores });

});

router.post("/dojo/new", async (req, res) => {

try{
    const dojo = await Dojo.create(req.body);

    console.log(dojo);
}
catch(err){

  console.log(err.message);
  req.flash("error", err.message);

}

  res.redirect("/");
});


router.post("/ninja/new", async (req, res) => {

  try {
        if(req.body.dojo == "")
          throw new Error("El dojo no debe venir vacio. Se debe seleccionar al menos 1.");
    
        const dojo = await Dojo.findByPk(req.body.dojo);
        await dojo.createNinja({ nombre: req.body.nombre });
    
  } catch (err) {
    console.log(err.message);
    req.flash("error", err.message);
  }

  res.redirect("/");
});




module.exports = router;