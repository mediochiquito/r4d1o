-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:8889
-- Tiempo de generación: 01-04-2016 a las 22:55:33
-- Versión del servidor: 5.5.42
-- Versión de PHP: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `radiotata`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones`
--

CREATE TABLE `canciones` (
  `id` tinyint(2) unsigned NOT NULL,
  `artista` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cancion` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `canciones`
--

INSERT INTO `canciones` (`id`, `artista`, `cancion`) VALUES
(2, 'qYYYYY', 'cancion 222 2 2 2'),
(5, 'sdfsdf', 'asdsadfd'),
(7, 'fdgfdgfdg', 'sdfsd'),
(8, '3453', 'sdf45435345'),
(9, '2345435', '435435345'),
(21, 'WQEQWE', 'WQEWQ'),
(22, 'XCVCXV', 'XCV'),
(23, '23423', '423432'),
(24, 'ccccccccc', 'cccccccccc'),
(25, 'kkjkj', 'REWREWR'),
(26, 'dsfsdfdsf', 'zxcdsf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id` mediumint(9) unsigned NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mensaje` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id`, `nombre`, `email`, `mensaje`, `fecha_hora`) VALUES
(1, 'asdsad', 'asdsad2W@ASdasd.asd', 'dasdasdasd\nas\nd\nas\ndas\nd\nasd', '2016-04-01 20:12:58'),
(2, 'sdsad2W@ASdasd.asd', 'sdsad2W@ASdasd.asd', 'sdsad2W@ASdasd.asd', '2016-04-01 20:19:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` mediumint(9) unsigned NOT NULL,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sexo` enum('f','m') COLLATE utf8_unicode_ci NOT NULL,
  `edad` tinyint(3) NOT NULL,
  `tel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `sexo`, `edad`, `tel`, `fecha_hora`) VALUES
(3, 'ghfgh', 'fgh', 'dfgdfg@asd.asd', 'f', 127, '234324', '2016-04-01 15:10:00'),
(4, 'ghfghsdffsdf', 'fgh', 'dfgdfg@asd.asd', 'f', 127, '234324', '2016-04-01 15:10:20'),
(5, 'das', 'dasd', 'asdasdasd@asd.asd', 'm', 127, '4234', '2016-04-01 18:10:23'),
(6, 'fgfdg', 'dfgdf', 'gdfg@asd.asd', 'm', 127, 'gde34', '2016-04-01 18:10:43'),
(7, 'dsfdsf', 'QERWRQWR', 'ds@qawd.wae', 'f', 127, 'QW12312', '2016-04-01 18:11:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votos`
--

CREATE TABLE `votos` (
  `id` mediumint(9) NOT NULL,
  `cancion_id` tinyint(2) unsigned NOT NULL,
  `usuario_id` mediumint(9) unsigned NOT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `votos`
--

INSERT INTO `votos` (`id`, `cancion_id`, `usuario_id`, `fecha_hora`) VALUES
(26, 5, 7, '2016-04-01 20:19:29'),
(27, 9, 7, '2016-04-01 20:38:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `votos`
--
ALTER TABLE `votos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `top_id` (`cancion_id`,`usuario_id`),
  ADD KEY `votos_ibfk_2` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `canciones`
--
ALTER TABLE `canciones`
  MODIFY `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `votos`
--
ALTER TABLE `votos`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `votos`
--
ALTER TABLE `votos`
  ADD CONSTRAINT `votos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votos_ibfk_1` FOREIGN KEY (`cancion_id`) REFERENCES `canciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
