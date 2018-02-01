# CFS Decisions

CFS Decisions is a web app to search and consult all decisions from the Committee on World Food Security (CFS)

## Cleaning data with Excel

### Combining non-empty cells

This is the procedure to get a combined list of themes and targets in format ` theme1, theme2 ` and `target1, target2`.

In Excel this can be done with the following formula:

```
=E2&IF(F2<>"",", "&F2,"")&IF(G2<>"",", "&G2,"")

=F2&IF(G2<>"",", "&G2,"")&IF(H2<>"",", "&H2,"")

```

### Removing bullet points from text

This can be done with the forumula

```
=TRIM(RIGHT([@text], LEN([@text]) - 3))

```

where:
` TRIM() `: removes trailing spaces at the beginning 
`RIGHT([@text], LEN([@text]) - 3))`: removes the first three characters on the left (`[@text]` can be substituted with any cell number or column)

Some paragraphs have an additional `ont)` to be removed: use the native find and replace to remove all occurrences.

### Removing inconsistencies

Using find and replace:

1. Expand all acronyms, with special care for internal jargon and policy names (e.g. RoP, B/Ag, FFA)
2. Uniform language (e.g. States - Governments - Members)
3. Expand abbreviations (e.g. Org matters, Sustainable Ag)
4. All terms should have sentence case (e.g. Climate change, sustainable agriculture), title case is reserved for policy and workstream names (e.g. Framework for Action in Protracted Crises, Global Strategic Framework)

## Importing data into the app

Save the cleaned Excel file in a csv file and upload it into Cloud9 from **File > Upload Local Files**

To import the CSV into the MongoDB database, use the following command from the root folder: 

```
mongoimport -d decisions -c decisions --type csv --file data.csv --headerline

```