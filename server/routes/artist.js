const router = require("express").Router();
const artist = require("../model/artist");

router.post("/save", async (req, res) => {
  const newArtist = new artist({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });

  try {
    const savedArtist = await newArtist.save();
    res.status(200).send({ success: true, artist: savedArtist });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await artist.findById(req.params.id);
    if (data) {
      res.status(200).send({ success: true, artist: data });
    } else {
      res.status(404).send({ success: false, msg: "Artist not found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const options = { sort: { createdAt: 1 } };
    const data = await artist.find({}, null, options).exec();
    if (data && data.length > 0) {
      res.status(200).send({ success: true, data: data });
    } else {
      res.status(404).send({ success: false, msg: "No artists found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});
router.put("/update/:id", async (req, res)=>{
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );
    res.status(200).send({ artist: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
})

router.delete("/delete/:id" ,async (req , res )=>{
  const filter ={_id :req.params.id}
  const data = await artist.deleteOne(filter)
    if (data) {
      res.status(200).send({ success: true, artist: data });
    } else {
      res.status(404).send({ success: false, msg: "Artist not found" });
    }
})



module.exports = router;
