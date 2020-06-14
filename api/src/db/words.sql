/*
Navicat MySQL Data Transfer

Source Server         : 本机
Source Server Version : 80020
Source Host           : localhost:3306
Source Database       : japanese

Target Server Type    : MYSQL
Target Server Version : 80020
File Encoding         : 65001

Date: 2020-06-15 03:46:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for words
-- ----------------------------
DROP TABLE IF EXISTS `words`;
CREATE TABLE `words` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '单词名称',
  `excerpt` varchar(255) DEFAULT '' COMMENT '单词摘要',
  `pron` varchar(255) DEFAULT '' COMMENT '单词发音',
  `accent` varchar(255) DEFAULT '' COMMENT '音调、标音符号',
  `romaji` varchar(255) DEFAULT '' COMMENT '罗马字',
  `spell` varchar(255) DEFAULT '' COMMENT '拼写',
  `example` text COMMENT '例句',
  `label` text COMMENT '标签',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100000007 DEFAULT CHARSET=utf8;
