#!/bin/bash
set -e

echo "Downloading set list..."
wget -q https://mtgjson.com/api/v5/SetList.json -O shared/src/generated/SetList.raw.json

echo "Filtering set list..."
jq -r '.data 
    | sort_by(.releaseDate) 
    | [.[] | select(.type == "expansion")] 
    | .[-5:] 
    | [.[] | del(.sealedProduct)]' \
    shared/src/generated/SetList.raw.json \
    > shared/src/generated/SetList.json

for set in $(jq -r '.[] | .code' shared/src/generated/SetList.json); do
    echo "Downloading set $set..."
    wget -q https://mtgjson.com/api/v5/$set.json.zip -O shared/src/generated/$set.zip
    unzip shared/src/generated/$set.zip -d shared/src/generated/
    mv shared/src/generated/$set.json shared/src/generated/$set.raw.json

    echo "Filtering set $set..."
    jq -r 'del(.data.booster, .data.tokens, .data.sealedProduct)' shared/src/generated/$set.raw.json > shared/src/generated/$set.json
done

echo "Cleaning up..."
rm shared/src/generated/*.zip shared/src/generated/*.raw.json