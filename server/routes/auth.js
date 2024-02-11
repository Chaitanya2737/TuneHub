const router = require("express").Router();
const admin = require("../confiq/firebase.confiq");
const user = require("../model/user");
const User = require("../model/user");
router.get("/login", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedValue = await admin.auth().verifyIdToken(token);
    
    if (!decodedValue) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    let existingUser = await User.findOne({ user_id: decodedValue.user_id });

    if (!existingUser) {
      existingUser = await createNewUser(decodedValue);
    } else {
      existingUser = await updateExistingUser(decodedValue);
    }

    res.status(200).json({ message: "Login successful", user: existingUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const createNewUser = async (decodedValue) => {
  const newUser = new User({
    name: decodedValue.name,
    email: decodedValue.email,
    imageUrl: decodedValue.picture,
    user_id: decodedValue.user_id,
    email_verified: decodedValue.email_verified,
    role: "member",
    auth_time: decodedValue.auth_time,
  });

  try {
    const saveUser = await newUser.save();
    return saveUser;
  } catch (error) {
    throw error;
  }
};

const updateExistingUser = async (decodedValue) => {
    const filter = { user_id: decodedValue.user_id };
    const options = { upsert: true, new: true };

    try {
        const result = await User.findOneAndUpdate(
            filter,
            { auth_time: decodedValue.auth_time },
            options
        );
        return result;
    } catch (error) {
        throw error;
    }
};

router.get("/getusers", async (req, res) => {
  try {
    const options = { sort: { createdAt: 1 } };
    const data = await User.find({}, null, options).exec();
    if (data && data.length > 0) {
      res.status(200).send({ success: true, data: data });
    } else {
      res.status(404).send({ success: false, msg: "No artists found" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.put("/update/:Id" , async(req , res )=>{
const filter ={
  _id :req.params.Id
};
const role =req.body.role;

try {
  const result = await user.findOneAndUpdate(filter ,{role:role}, )
  res.status(200).send({user:result})
} catch (error) {
  res.status(400).send({ success: false, msg: error });
}
})

router.delete("/deleteUser/:id", async (req, res) => {
  const filter = {
    _id: req.params.id
  };
  try {
    const result = await user.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "User removed" });
    } else {
      res.status(404).send({ success: false, msg: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
});



module.exports = router;
