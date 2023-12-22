import sys
import js
import json
import pandas as pd
from sklearn.model_selection import train_test_split

csv = json.loads(js.csv)
rows = csv["rows"]
columns = csv["columns"]
selected = csv["selected"]
filtered_columns = [i for (i, v) in zip(columns, selected) if v]

if len(filtered_columns) < 1:
    filtered_columns = columns[-1]

csv_df = pd.DataFrame(rows)
X = csv_df.to_dict('records')
y = csv_df[filtered_columns].values.tolist()
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y)

X_train_pd = pd.DataFrame(X_train)
X_test_pd = pd.DataFrame(X_test)
X_train_csv = X_train_pd.to_csv(index=False)
X_test_csv = X_test_pd.to_csv(index=False)
