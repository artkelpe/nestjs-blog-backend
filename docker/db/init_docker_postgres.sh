#!/bin/bash
DB_DUMP_LOCATION="/tmp/psql_data/exported_dump.sql"
DB_NAME="blog"


echo "*************************** CREATING DATABASE ***************************"
createdb -T template0 "$DB_NAME";

#psql -U postgres < "$DB_DUMP_LOCATION";
psql -d "$DB_NAME" -f "$DB_DUMP_LOCATION";
echo "*************************** DATABASE CREATED! ***************************"
