import express from 'express'

const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({
        code: 200,
        message: "Success APi",
        data: "Success Data API"
    })
});

export default router;