#!/bin/bash

port=$1
shift
cmd="$@"

echo "Waiting for port $port to be ready..."

while ! nc -z localhost $port; do
  sleep 1
done

>&2 echo "Port $port is ready!"
exec $cmd
