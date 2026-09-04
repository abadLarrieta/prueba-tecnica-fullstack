SELECT
    l.id,
    l.nombre,
    l.editorial,
    p.fecha_prestamo,
    l.dias_limite_prestamo
FROM alumno a
         INNER JOIN prestamo p
                    ON p.id_alumno = a.id
         INNER JOIN libro l
                    ON l.id = p.id_libro
WHERE a.nombres = 'Sonia'
  AND p.entregado = false
  AND (
          p.fecha_prestamo + (l.dias_limite_prestamo * INTERVAL '1 day')
          ) < DATE '2021-07-30';