import io
import csv
import js

csv_content = js.csvContent

reader = csv.DictReader(io.StringIO(csv_content))
headers = []
rows = []

headers = reader.fieldnames
for line in reader:
    rows.append(line)
