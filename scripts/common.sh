#!/bin/bash

function download() {
    out=$2/$1.json
    if [ ! -f $out ]; then
        if [ ! -f "$out.gz" ]; then
            wget -q https://mtgjson.com/api/v5/$1.json.gz -O $out.gz
        fi
        gzip -d $out.gz
    fi

    echo $out
}
