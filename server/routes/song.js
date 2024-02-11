const router = require("express").Router();
const  song = require("../model/song")





router.post("/save", async (req, res) => {
    const newSong = new song({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      songUrl: req.body.songUrl,
      artist: req.body.artist,
      language: req.body.language,
      album: req.body.album,
      category: req.body.category,
    });
  
    try {
      const savedSong = await newSong.save();
      res.status(200).send({ success: true, song: savedSong });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  });


  router.get("/getOne/:id", async (req, res) => {
    try {
      const data = await song.findById(req.params.id);
      if (data) {
        res.status(200).send({ success: true, song: data });
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
      const data = await song.find({}, null, options).exec();
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
      const result = await song.findOneAndUpdate(
        filter,
        {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            songUrl: req.body.songUrl,
            artist: req.body.artist,
            language: req.body.language,
            album: req.body.album,
            category: req.body.category,
            imageUrl: req.body.imageUrl,
            imageUrl: req.body.imageUrl,
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
    const data = await song.deleteOne(filter)
      if (data) {
        res.status(200).send({ success: true, artist: data });
      } else {
        res.status(404).send({ success: false, msg: "Artist not found" });
      }
  })
  

module.exports = router