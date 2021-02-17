const { Router } = require('express');
const { Dojo, Ninja } = require('./db');
const router = Router();

router.get("/", async (req,res)=>{

  const dojos = await Dojo.findAll({ include:  [Ninja] });

  console.log(dojos);

  res.render("index", { dojos });

});

router.post("/dojo/new", async (req,res)=>{

  const dojo = await Dojo.create(req.body);

  console.log(dojo);

  res.redirect("/");
});


router.post("/ninja/new", async (req,res)=>{

  // buscar el dojo que se recibe.
  const dojo = await Dojo.findByPk(req.body.dojo);

  await dojo.createNinja({ nombre: req.body.nombre });

  // agregar el ninja
  //const ninja = Ninja.create({ nombre: req.body.nombre, DojoId: req.body.dojo  });

  // agregar la relacion. ninja pertenece al dojo.
  // await ninja.setDojo(dojo);

  res.redirect("/");
});




module.exports = router;