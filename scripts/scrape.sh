#!/bin/bash
scripts=$(dirname $0)
out=$(dirname $scripts)/out
. $scripts/common.sh

set=$1

function to_csv() {
    jq -r '(first | keys_unsorted) as $cols
        | map(. as $row | $cols | map($row[.])) as $rows
        | $cols, $rows[]
        | @csv'
}

download $set $out \
    | xargs cat \
    | jq '.data.cards[] | {
        "Number": .number,
        "Name": .name,
        "Name (PT-BR)": .foreignData
            | map(select(.language == "Portuguese (Brazil)"))
            | first
            | .name,
        "Cor": (.colors | join("")),
        "Raridade": .rarity
    }' \
    | jq -s '.' \
    | to_csv \
    > $out/$set.csv