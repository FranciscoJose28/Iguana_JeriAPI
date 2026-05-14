-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(255) NOT NULL,
    `data_nascimento` VARCHAR(255) NOT NULL,
    `nivel_id` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `usuario_niveis_fk`(`nivel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(255) NOT NULL,
    `bairro` VARCHAR(255) NOT NULL,
    `cidade` VARCHAR(255) NOT NULL,
    `estado` VARCHAR(255) NOT NULL,
    `id_cliente` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `enderecos_fk5`(`id_cliente`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metodo` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `data_pagamento` VARCHAR(255) NOT NULL,
    `valor` FLOAT NOT NULL,
    `id_pedido` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `pagamento_fk5`(`id_pedido`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_pedido` DATETIME(0) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `valor` FLOAT NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `transportadora` VARCHAR(255) NOT NULL,
    `data_envio` DATETIME(0) NOT NULL,
    `data_entrega` DATETIME(0) NOT NULL,
    `desconto` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `pedido_fk4`(`id_cliente`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `descricao` VARCHAR(255) NOT NULL,
    `tamanho` VARCHAR(255) NOT NULL,
    `cor` VARCHAR(255) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `peso` DOUBLE NULL,
    `estoque` VARCHAR(255) NOT NULL,
    `id_categoria` INTEGER NOT NULL,
    `desconto` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `produto_fk7`(`id_categoria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto_imagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagem` TEXT NOT NULL,
    `id_produto` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `produto_imagem_fk2`(`id_produto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favoritos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `favoritos_cliente_fk`(`id_cliente`),
    INDEX `favoritos_produto_fk`(`id_produto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos_pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produto` INTEGER NOT NULL,
    `id_pedido` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `produtos_pedido_fk1`(`id_produto`),
    INDEX `produtos_pedido_fk2`(`id_pedido`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `niveis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `usuario_niveis_fk` FOREIGN KEY (`nivel_id`) REFERENCES `niveis`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `enderecos_fk5` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pagamento` ADD CONSTRAINT `pagamento_fk5` FOREIGN KEY (`id_pedido`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `pedido_fk4` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_fk7` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produto_imagem` ADD CONSTRAINT `produto_imagem_fk2` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_cliente_fk` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `favoritos` ADD CONSTRAINT `favoritos_produto_fk` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produtos_pedido` ADD CONSTRAINT `produtos_pedido_fk1` FOREIGN KEY (`id_produto`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `produtos_pedido` ADD CONSTRAINT `produtos_pedido_fk2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
