-- Initialize Database
CREATE DATABASE sprint2;
CREATE USER sprint2_user WITH ENCRYPTED PASSWORD '2021-july-13';
GRANT ALL PRIVILEGES ON DATABASE sprint2 TO sprint2_user;
--
-- Set extension for uuid
-- enter the following in the psql command line or pgadmin query window (without single quotes)
--   'create extension if not exists "uuid-ossp";'
--
-- Create table to store user info
CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);
--
-- insert admin user
INSERT INTO users (user_name, user_email, user_password, rbac)
VALUES ('admin', 'admin@here.com', 'admin', 1);
--
-- create table for roles
CREATE TABLE user_roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(255),
  description VARCHAR(255),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP
);
-- Insert default user roles
INSERT INTO user_roles (role_id, role_name, description, last_updated)
VALUES (
    1,
    'Administrator',
    'Has access to all routes',
    CURRENT_TIMESTAMP
  ),
  (
    2,
    'Supervisor',
    'Has access to all end user routes',
    CURRENT_TIMESTAMP
  ),
  (
    3,
    'Customer',
    'Has access to just customer routes',
    CURRENT_TIMESTAMP
  );
--
-- Create table for site routes
CREATE TABLE site_routes (
  route_id SERIAL PRIMARY KEY,
  route_name VARCHAR(255),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP
);
--
-- create default routes
INSERT INTO site_routes (route_id, route_name, last_updated)
VALUES (1, '/profile', CURRENT_TIMESTAMP),
  (2, '/admin/newrole', CURRENT_TIMESTAMP),
  (3, '/example', CURRENT_TIMESTAMP),
  (4, '/example_two', CURRENT_TIMESTAMP),
  (5, '/secret', CURRENT_TIMESTAMP);
--
-- Create table for RBAC
CREATE TABLE rbac (
  rbac_id SERIAL PRIMARY KEY,
  role_id INT,
  route_id INT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_role_id FOREIGN KEY(role_id) REFERENCES user_roles(role_id),
  CONSTRAINT fk_route_id FOREIGN KEY(route_id) REFERENCES site_routes(route_id)
);
--
-- Create default access routes
INSERT INTO rbac (role_id, route_id)
VALUES (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (2, 1),
  (2, 3),
  (2, 4),
  (3, 1),
  (3, 2);
--
-- Create view for which roles have access to which ROUTINES
CREATE OR REPLACE VIEW roles_and_routes AS
SELECT ur.role_name,
  sr.route_name
FROM rbac
  JOIN user_roles ur USING (role_id)
  JOIN site_routes sr USING (route_id);
ALTER TABLE roles_and_routes OWNER TO sprint2_user;
--
-- Example query for routes access
SELECT *
FROM roles_and_routes
WHERE role_name = 'Supervisor';
--