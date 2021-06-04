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

const claseController = require("../controllers/clase-controller.js")

router.post('/crearClase', upload.any(), claseController.crearClase);

router.post('/publicarClase/:id', upload.any(), claseController.publicarClase);

router.post('/deshabilitarClase/:id', upload.any(), claseController.deshabilitarClase);

router.post('/matricularClase', upload.any(), claseController.matricularClase);

router.post('/cancelarMatricula', upload.any(), claseController.cancelarMatricula);