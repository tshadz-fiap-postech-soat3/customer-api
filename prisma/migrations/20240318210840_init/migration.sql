CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customer_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

DELETE FROM Customer;

INSERT INTO Customer (id, name, cpf) VALUES
('cust-1', 'Customer-1', '12345678901'),
('cust-2', 'Customer-2', '12345678902'),
('cust-3', 'Customer-3', '12345678903');
