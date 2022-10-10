import nextConnect from 'next-connect';
import multer from 'multer';

export const config = {
    api: {
        bodyParser: false,
    },
};
const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname.replaceAll(' ', '-'))
    }
})
let upload = multer({ storage: storage });




apiRoute.post(upload.array('files'), async (req, res) => {
    if (typeof (req.files) === "object") {
        req.files.forEach(ele => {
          console.log( "file link","http://localhost:8000/" + 'uploads/' + ele.filename.replace(/find/g, "found"))
        }
        )
        return res.status(200).send({ response: "Files uploaded succesfully" })
    }
    else {
        return res.status(400).send({ error: "No Data provided" })
    }
})

export default apiRoute