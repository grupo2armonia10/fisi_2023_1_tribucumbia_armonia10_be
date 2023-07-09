-- @block
SHOW PROCEDURE STATUS
WHERE Db = DATABASE()
    AND Type = 'PROCEDURE';
-- @block
delimiter / / CREATE PROCEDURE getReservasUsuario(IN id INT) BEGIN
SELECT *
FROM reserva
WHERE usuarioId = id;
END / / delimiter;
-- @block
delimiter / / CREATE PROCEDURE getReservasHabitacion(IN id INT) BEGIN
SELECT *
FROM reserva
WHERE habitacionId = id;
END / / delimiter;