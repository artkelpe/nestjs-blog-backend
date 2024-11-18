FROM postgres:17

RUN mkdir -p /tmp/psql_data/

COPY docker/db/exported_dump.sql /tmp/psql_data/

#COPY docker/db/dump.sql /tmp/psql_data/
COPY docker/db/init_docker_postgres.sh /docker-entrypoint-initdb.d/
