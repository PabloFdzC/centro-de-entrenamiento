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

const estadoPagoController = require("../controllers/estadopago-controller.js")

router.post('/crearEstadoPago', upload.any(), estadoPagoController.crearEstadoPago);

router.post('/eliminarEstadoPago/:id', upload.any(), estadoPagoController.eliminarEstadoPago);