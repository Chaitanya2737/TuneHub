const router = require("express").Router();
const album = require("../model/album");

router.post("/save", async (req, res) => {
    const newAlbum =  album({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
    });
  
    try {
      const savedAlbum = await newAlbum.save();
      res.status(200).send({ success: true, album: savedAlbum });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  });

  router.get("/getOne/:id", async (req, res) => {
    try {
      const data = await album.findById(req.params.id);
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
      const data = await album.find({}, null, options).exec();
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
      const result = await album.findOneAndUpdate(
        filter,
        {
          name: req.body.name,
          imageURL: req.body.imageURL
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
    const data = await album.deleteOne(filter)
      if (data) {
        res.status(200).send({ success: true, artist: data });
      } else {
        res.status(404).send({ success: false, msg: "Artist not found" });
      }
  })
  
module.exports = router