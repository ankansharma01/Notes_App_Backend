const { Notes } = require("../Models/Notes_Model");

const Create = async (req, res) => {
  try {
    userId = req.userId;
    console.log("user", userId);
    const { title, description } = req.body;
    if (!title || !description) {
      res.json({ message: "title required" });
    }
    const Note = await Notes.create({
      title,
      description,
      userId,
    });
    res.status(200).json({ message: "notes created", notes: Note });
  } catch (error) {
    console.log("error");
  }
};



const Update = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;
    const { title, description } = req.body;

    // Find the note
    const findNoteId = await Notes.findById(noteId);
    if (!findNoteId) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if the user owns the note
    if (userId.toString() !== findNoteId.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update the note
    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Note updated", note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const Delete=async(req,res)=>{
    try {
        const userId=req.userId
        const NotesId=req.params.id
        const findNoteId=await Notes.findById(NotesId)

        if (userId.toString() !== findNoteId.userId.toString()) {
       return res.status(404).json({success:false,message:"Unauthorized user",})
            
        }
        const Delete=await Notes.findByIdAndDelete(NotesId)


              res.status(200).json({success:true,message:"Notes Deleted Successfully",Delete})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})
    }
}
const GetNotes=async(req,res)=>{
    try {
        const userId=req.userId
        
        const Note=await Notes.find({userId})


        return res.status(200).json({success:true,Note})
       
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error",})   
    }
}
module.exports ={Create,Update,Delete,GetNotes}
