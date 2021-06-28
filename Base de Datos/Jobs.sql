DELIMITER ;;

CREATE EVENT ClientesMorosos ON SCHEDULE EVERY 1 DAY DO 
BEGIN
	UPDATE Pago AS p
    INNER JOIN Clases_en_Jornada cej
    ON cej.id_clase_jornada = p.id_clase_jornada
    INNER JOIN Jornada j
    ON j.id_jornada = cej.id_jornada
    SET p.estado_pago = "MOROSO"
    WHERE p.estado_pago = "PENDIENTE" AND CURDATE() > j.dia;
END;;

DELIMITER ;