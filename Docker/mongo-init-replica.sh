#!/bin/bash
# This script is auto-run by MongoDB container on first start
# It initializes the replica set needed for Mongoose transactions

echo "Waiting for MongoDB to start..."
sleep 3

mongosh --eval "
try {
  rs.status();
  print('Replica set already initialized');
} catch(e) {
  rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: 'mongodb:27017' }] });
  print('Replica set initialized');
}
"
