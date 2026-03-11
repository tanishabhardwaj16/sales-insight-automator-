const XLSX = require("xlsx");
const fs = require("fs");

const generateSummary = require("../services/aiService");
const sendEmail = require("../services/emailService");

exports.uploadFile = async (req,res) => {

    try {

        const filePath = req.file.path;
        const email = req.body.email;

        const workbook = XLSX.readFile(filePath);

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        const data = XLSX.utils.sheet_to_json(sheet);

        const summary = await generateSummary(data);

        await sendEmail(email, summary);

        fs.unlinkSync(filePath);

        res.json({
            message: "Summary generated and sent successfully"
        });

    } catch(error){

    console.error("UPLOAD ERROR:", error);   // add this line

    res.status(500).json({
        error: error.message
    });

}

};