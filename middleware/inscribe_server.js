require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const multer = require('multer');

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Home Router
app.get('/', (req, res, next) => {
    res.send(`<pre style="color:white; font-size:large; background-color:black;">
    Hello there, Welcome to Inscribe server                                                                                                            
    </pre>`
    );
});

let IMAGE_PATH = "";
let FILE_PATH = "";

if (process.env.IS_LOCAL === "true") {
    IMAGE_PATH = "uploads/images";
    FILE_PATH = "uploads/files";
} else {
    IMAGE_PATH = "home/waheed/LocalInscribe/images";
    FILE_PATH = "home/waheed/LocalInscribe/files";
}

// Multer image uploader
const storage = multer.diskStorage({
    // Set the destination folder where files will be saved
    destination: function (req, file, cb) {
        cb(null, `./${IMAGE_PATH}`);
    },
    // Set the filename of the uploaded file
    filename: function (req, file, cb) {
        const { rune } = req.body;
        const name = rune.split(".").join("_");
        const fileName = name + "." + file.originalname.split(".")[1];
        req.app.locals.fileName = fileName;
        req.app.locals.yamlName = name;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

const getIndentLevel = (key) => {
    const level_two = ["rune", "divisibility", "symbol", "premine", "supply", "terms", "file"];
    const level_three = ["cap", "offset", "amount"];

    if (level_two.includes(key)) {
        return 2;
    } else if (level_three.includes(key)) {
        return 3;
    } else {
        return 5;
    }
}

app.post(`/api/${process.env.APP_VERSION}/inscribe`, upload.single("file"), (req, res) => {

    const data = req.body;

    if (req.app.locals.fileName) {

        let string = "";
        // Add static lines at the beginning
        string += "mode: separate-outputs\n";
        string += "etching:\n";

        Object.entries(data).forEach((pair) => {

            if (pair[0] !== "number_of_days" && pair[0] !== "feeMode" && pair[0] !== "fee") {
                let [key, value] = pair;
                const level = getIndentLevel(key);
                const indent = ' '.repeat(level);

                if (key === "offset_end") {
                    key = "end";
                }

                string += `${indent}${key}: ${key === "symbol" ? `'${value}'` : `${value}`}\n`;

                if (key === "supply") {
                    string += `${indent}terms:\n`;
                } else if (key === "cap") {
                    string += `${indent}offset:\n`;
                }
            }
        })

        string += "\n";
        string += "inscriptions:\n";
        string += `  - file: /${FILE_PATH}/${req.app.locals.fileName}`

        // Write YAML string to file
        fs.writeFileSync(`./${FILE_PATH}/${req.app.locals.yamlName}.yaml`, string);
        console.log("Created successful");

        res.json({
            success: true,
            message: "Inscribed successfully"
        })
    } else {
        res.sendStatus(409);
        res.json({
            success: false,
            message: "Inscribe failed due to image uploader!"
        })
    }

});

// Error handler
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        success: false,
        status: err.status || 500,
        message: err.message
    })
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Running on PORT ${process.env.APP_PORT}`);
})