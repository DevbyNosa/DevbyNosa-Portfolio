-- Valid Admin Table

CREATE TABLE admindetails(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  view_count INT DEFAULT 0,
  view_date DATE UNIQUE DEFAULT CURRENT_DATE
);

CREATE TABLE ip_logs(
  id SERIAL PRIMARY KEY,
  ip_address VARCHAR(45),
  country VARCHAR(100),
  region VARCHAR(100),
  city VARCHAR(100),
  log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  Header table

CREATE TABLE header (
  id INT PRIMARY KEY CHECK (id = 1),
  hero_subtitle VARCHAR(255),
  hero_title VARCHAR(255),
  hero_description TEXT,
  hero_button_text VARCHAR(255),
  hero_button_link VARCHAR(255),
  contact_button_text VARCHAR(255),
  contact_button_link VARCHAR(255),
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE about (
  id INT PRIMARY KEY CHECK (id = 1),
  title VARCHAR(255),
  description TEXT,
  image TEXT,
  stack VARCHAR(255)
);

ALTER TABLE about 
ADD COLUMN update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE services (
  id INT PRIMARY KEY CHECK (id = 1),
  title VARCHAR(255),
  description TEXT,
  service_types VARCHAR(255)
);

ALTER TABLE services 
ADD COLUMN update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE project_settings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  text_paragraph TEXT
);

INSERT INTO project_settings (title, text_paragraph) 
VALUES ('My Projects', 'Here is a showcase of my latest work.');

CREATE TABLE project (
  id SERIAL PRIMARY KEY,
  project_url VARCHAR(255),
  image TEXT,
  image_alt  VARCHAR(255),
  project_name VARCHAR(255),
  project_information TEXT,
  project_stack VARCHAR(255)
);


CREATE TABLE contact (
  id INT PRIMARY KEY,
  whatsapp_no VARCHAR(20),
  email VARCHAR(255),
  --- social links ---
  github VARCHAR(255),
  linkedin VARCHAR(255),
  x_twitter VARCHAR(255),
  tiktok VARCHAR(255)
);

INSERT INTO contact (id, whatsapp_no, email, github, linkedin, x_twitter, tiktok)
VALUES(1, '+2347031253649', 'judgesnigbinosa@gmail.com', 'https://github.com/devbynosa', 'www.linkedin.com/in/devbynosa', 'https://x.com/DevByNosa', 'https://tiktok.com/@devbynosa_');

CREATE TABLE experience (
  id SERIAL PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  start_date DATE,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  image_alt VARCHAR(255),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);