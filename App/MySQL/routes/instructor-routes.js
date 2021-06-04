const { Router } = require('express');
const path = require('path');
const router = Router();

const multer = require('multer');
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
      cb(null, 'user-uploads/user-photos/');
    }else{
      cb({error: 'File type not supported'});
    }

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: fileStorage
});

const instructorController = require("../controllers/instructor-controller.js")

router.post('/registroInstructor', upload.any(), instructorController.registroInstructor);

router.post('/modificarInstructor', upload.any(), instructorController.modificarInstructor);

router.post('/modificarContrasennaInstructor', upload.any(), instructorController.modificarContrasennaInstructor);

router.post('/agregarServicioAInstructor', upload.any(), instructorController.agregarServicioAInstructor);

router.post('/eliminarServicioAInstructor', upload.any(), instructorController.eliminarServicioAInstructor);