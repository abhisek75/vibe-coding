#!/bin/bash

# This script runs during building the sandbox template
# ping_server waits until the Next.js development server at http://localhost:3000 responds with HTTP 200, indicating it is running and the root page is compiled.
function ping_server() {
	counter=0
	response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	while [[ ${response} -ne 200 ]]; do
	  let counter++
	  if  (( counter % 20 == 0 )); then
        echo "Waiting for server to start..."
        sleep 0.1
      fi

	  response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
	done
}

ping_server &
cd /home/user && npx next dev --turbopack