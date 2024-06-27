
CREATE TABLE tbl_artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    note TEXT,
    company_id INT NOT NULL,
    user_id INT DEFAULT NULL,
    status ENUM('inactive', 'active') NOT NULL,
    FOREIGN KEY (company_id) REFERENCES tbl_companies(id),
    FOREIGN KEY (user_id) REFERENCES tbl_users(id)
);