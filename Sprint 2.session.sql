SELECT users.*,
  user_roles.role_name
FROM users
  JOIN user_roles using (role_id)
WHERE user_email = 'admin@admin.com'
SELECT *
FROM roles_and_routes
WHERE role_name = 'Supervisor';
drop view if exists roles_and_routes;
CREATE OR REPLACE VIEW roles_and_routes AS
SELECT ur.role_id,
  ur.role_name,
  sr.route_name,
  sr.route_id
FROM rbac
  JOIN user_roles ur USING (role_id)
  JOIN site_routes sr USING (route_id);